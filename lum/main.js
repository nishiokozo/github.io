// 2020/12/26 ステンシルバッファでペイント判定

'use strict';
let g_context = html_canvas.getContext('2d');

//ゆっくり描画のための処理
let g_flgSleep = false;
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

class GRA
{
	constructor( context, width, height )
	{
		this.img = context.createImageData( width, height );
		this.stencil = new Array( width*height );

		//-----------------------------------------------------------------------------
		this.window = function( x0,y0,x1,y1, x2,y2,x3,y3 )
		//-----------------------------------------------------------------------------
		{
			this.x0 = x0;
			this.y0 = y0;
			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;
			this.x3 = x3;
			this.y3 = y3;

			this.sw = (this.x1-this.x0+1)/(this.x3-this.x2+1);
			this.sh = (this.y1-this.y0+1)/(this.y3-this.y2+1);
			
//			if ( g_sc == 2.0 ) this.sh*=0.99;
		}

		this.window( 
			0,
			0,
			width-1,
			height-1,
			0,
			0,
			width-1,
			height-1
		);

		//-----------------------------------------------------------------------------
		this.window_conv = function( _ox, _oy )
		//-----------------------------------------------------------------------------
		{
			let ox = (_ox-this.x2)*this.sw;	// window対応
			let	oy = (_oy-this.y2)*this.sh;	// window対応
			ox=Math.round(ox);
			oy=Math.round(oy);
			return [ox,oy];
		}
		//-----------------------------------------------------------------------------
		this.window_revconv = function( _ox, _oy )
		//-----------------------------------------------------------------------------
		{
			let ox = _ox/this.sw +this.x2;	// window対応
			let oy = _oy/this.sh +this.y2;	// window対応
			ox=Math.round(ox);
			oy=Math.round(oy);
			return [ox,oy];
		}



		//-----------------------------------------------------------------------------
		this.cls = function( col, a =0xff )
		//-----------------------------------------------------------------------------
		{
			for (let x=0; x<this.img.width ; x++ )
			for (let y=0; y<this.img.height ; y++ )
			{
				let adr = (y*this.img.width+x)*4;
				this.img.data[ adr +0 ] = (col>>16)&0xff;
				this.img.data[ adr +1 ] = (col>> 8)&0xff;
				this.img.data[ adr +2 ] = (col>> 0)&0xff;
				this.img.data[ adr +3 ] = a;
			}
		}
		//-----------------------------------------------------------------------------
		this.rgb = function( r,g,b )	// xRGB 8:8:8:8 
		//-----------------------------------------------------------------------------
		{
			return (r<<16)|(g<<8)|b;
		}
		//-----------------------------------------------------------------------------
		this.point = function( x, y )
		//-----------------------------------------------------------------------------
		{
			let adr = (y*this.img.width+x)*4;
			let r = this.img.data[ adr +0 ];
			let g = this.img.data[ adr +1 ];
			let b = this.img.data[ adr +2 ];
		//	let a = this.img.data[ adr +3 ];
			return this.rgb(r,g,b);
		}
		//-----------------------------------------------------------------------------
		this.pset0 = function( _ox, _oy, col, a=0xff )
		//-----------------------------------------------------------------------------
		{
			let x = Math.floor(_ox);
			let y = Math.floor(_oy);
			if ( x < 0 ) return;
			if ( y < 0 ) return;
			if ( x >= this.img.width ) return;
			if ( y >= this.img.height ) return;

			let adr = (y*this.img.width+x)*4;
			this.img.data[ adr +0 ] = (col>>16)&0xff;
			this.img.data[ adr +1 ] = (col>> 8)&0xff;
			this.img.data[ adr +2 ] = (col>> 0)&0xff;
			this.img.data[ adr +3 ] = a&0xff;
		}
		//-----------------------------------------------------------------------------
		this.pset = function( _px, _py, col )
		//-----------------------------------------------------------------------------
		{
			let [px,py] = this.window_conv( _px, _py );
			this.pset0( px, py, col );
		}

		//-----------------------------------------------------------------------------
		this.stencil_point = function( x, y )
		//-----------------------------------------------------------------------------
		{
			let adr = (y*this.img.width+x);
			let r = this.stencil[ adr ];
			return r;
		}
		//-----------------------------------------------------------------------------
		this.stencil_pset = function( x, y, a )
		//-----------------------------------------------------------------------------
		{
			let adr = (y*this.img.width+x);
			this.stencil[ adr ] = a;
		}

		//-----------------------------------------------------------------------------
		this.line = function( _x1, _y1, _x2, _y2, col ) 
		//-----------------------------------------------------------------------------
		{
			let [x1,y1] = this.window_conv( _x1, _y1 );
			let [x2,y2] = this.window_conv( _x2, _y2 );


			//ブレセンハムの線分発生アルゴリズム

			// 二点間の距離
			let dx = ( x2 > x1 ) ? x2 - x1 : x1 - x2;
			let dy = ( y2 > y1 ) ? y2 - y1 : y1 - y2;

			// 二点の方向
			let sx = ( x2 > x1 ) ? 1 : -1;
			let sy = ( y2 > y1 ) ? 1 : -1;

			if ( dx > dy ) 
			{
				// 傾きが1より小さい場合
				let E = -dx;
				for ( let i = 0 ; i <= dx ; i++ ) 
				{
					this.pset0( x1,y1, col );
					x1 += sx;
					E += 2 * dy;
					if ( E >= 0 ) 
					{
						y1 += sy;
						E -= 2 * dx;
					}
				}
			}
			else
			{
				// 傾きが1以上の場合
				let E = -dy;
				for ( let i = 0 ; i <= dy ; i++ )
				{
					this.pset0( x1, y1, col );
					y1 += sy;
					E += 2 * dx;
					if ( E >= 0 )
					{
						x1 += sx;
						E -= 2 * dy;
					}
				}
			}

		}
		//-----------------------------------------------------------------------------
		this.box = function( x1,y1, x2,y2, col )
		//-----------------------------------------------------------------------------
		{

			this.line( x1,y1,x2,y1, col);
			this.line( x1,y2,x2,y2, col);
			this.line( x1,y1,x1,y2, col);
			this.line( x2,y1,x2,y2, col);
		}

		//-----------------------------------------------------------------------------
		this.circle = function( x,y,r,col, scy=1 )
		//-----------------------------------------------------------------------------
		{
			const scx=2;

			let rad = function( deg )
			//-----------------------------------------------------------------------------
			{
				return deg*Math.PI/180;
			}
			{
				let st = rad(1);
				let x0,y0;
				for (  let i = 0 ; i <= Math.PI*2 ; i+=st  )
				{
					let x1 = r * Math.cos(i)*scx + x;
					let y1 = r * Math.sin(i)*scy + y;

					if ( i > 0 ) this.line( x0, y0, x1, y1, col );
					x0 = x1;
					y0 = y1;
				}
			}
		}

		//-----------------------------------------------------------------------------
		this.paint = async function(  _x0, _y0, colsPat, colsRej  ) 
		//-----------------------------------------------------------------------------
		{
		//	呼び出しサンプル
		//	gra.circle(100,100, 20,0xff0000);
		//	gra.paint( 100,100, [[0xffff00]],[0xff0000] );


			let [x0,y0] = this.window_conv( _x0, _y0 );
			let cntlines = 0;

			{
				let c = this.point(x0,y0);
				if ( colsRej.indexOf(c) != -1 ) return cntlines;
			}

			this.stencil.fill(0);

			let seed=[];
			seed.push([x0,y0,0,0,0]); // x,y,dir,lx,rx
			while( seed.length > 0 )
			{
				// 先頭のシードを取り出す
				let sx	= seed[0][0];
				let sy	= seed[0][1];
				let pdi	= seed[0][2];
				let plx	= seed[0][3];
				let prx	= seed[0][4];
				seed.shift();

				// シードから左端を探す
				let lx=sx;
				while( lx >= 0 )
				{
					let c = this.point(lx,sy);
					if ( colsRej.indexOf(c) != -1 ) break;
					let s = this.stencil_point(lx,sy);
					if ( s != 0 ) break;
					lx--;
				}
				lx++;

				// シードから右端探す
				let rx=sx;
				while( rx < this.img.width )
				{
					let c = this.point(rx,sy);
					if ( colsRej.indexOf(c) != -1 ) break;
					let s = this.stencil_point(rx,sy);
					if ( s != 0 ) break;
					rx++;
				}
				rx--;

				// 1ライン塗り
				{
					let iy = Math.floor( sy % colsPat.length );
					let ay = sy*this.img.width;
					for ( let x = lx ; x <=rx ; x++ )
					{
						let ix = Math.floor(  x % colsPat[0].length );
						let col = colsPat[iy][ix];
						let adr = (ay+x);
						this.img.data[ adr*4 +0 ] = (col>>16)&0xff;
						this.img.data[ adr*4 +1 ] = (col>> 8)&0xff;
						this.img.data[ adr*4 +2 ] = (col>> 0)&0xff;
						this.img.data[ adr*4 +3 ] = 0xff;
					
						this.stencil[ adr ] = 1;
					}
					
					if ( cntlines %3 == 1 )
					{
						g_flgSleep = true;
						await sleep(1); // 1msecスリープ
						g_flgSleep = false;
					}
					cntlines++;
				}

// kozo
//console.log(">",seed.length);
if ( seed.length > 9 ) 
{
	console.log("err",seed.length);
	break;
}				for( let dir of [-1,1] )
				{// 一ライン上（下）のライン内でのペイント領域の右端をすべてシードに加える
					let y=sy+dir;
					if ( dir ==-1 && y < 0 ) continue;
					if ( dir == 1 && y >= this.img.height ) continue;
					let flgBegin = false;
					for ( let x = lx ; x <=rx ; x++ )
					{
						let c = this.point(x,y);
						let s = this.stencil_point(x,y);
//						let s =0;						
//						if ( dir != pdi && x >= plx && x <= prx ) s=1; else s=0; // ひとつ前のペイント判定
						if ( flgBegin == false )
						{
							if ( s == 0 && colsRej.indexOf(c) == -1 )
							{
								flgBegin = true;
							}
						}
						else
						{
							if ( s == 0 && colsRej.indexOf(c) == -1 )
							{}
							else
							{
//	console.log(seed.length,":",[x-1,y,dir,lx,rx]);
								seed.push([x-1,y,dir,lx,rx]);
								flgBegin = false;
							}
						}
					}
					if ( flgBegin == true )
					{
//	console.log(seed.length,":",[rx,y,dir,lx,rx]);
								seed.push([rx,y,dir,lx,rx]);
					}
				}
			}
			
//console.log("paint2:",seed[0][0],seed[0][1]);			
			return cntlines;
		}
		//-----------------------------------------------------------------------------
		this.paintX = function(  _x0, _y0, colsPat, colsRej  ) 
		//-----------------------------------------------------------------------------
		{
		//	呼び出しサンプル
		//	gra.circle(100,100, 20,0xff0000);
		//	gra.paint( 100,100, [[0xffff00]],[0xff0000] );

			let [x0,y0] = this.window_conv( _x0, _y0 );

			{// 一ドットも塗る所がなかった場合はfalseを返す
				if ( x0 < 0 || x0 > this.img.width ) return false;
				if ( y0 < 0 || y0 > this.img.height ) return false;
				{
					let c = this.point(x0,y0);
					if ( colsRej.indexOf(c) != -1 ) return false;
				}
			}

			let thisclass = this;

			class Painted
			{
				constructor()
				{
					this.sx = 0;
					this.ex = 0;
					this.y = 0;
				}
			};
			const l_MAXPAINTBUF = 2000;
			let l_cntPaintBuf = 0;
			let painted = new Array(l_MAXPAINTBUF);
			for ( let i = 0 ; i < l_MAXPAINTBUF ; i++ )
			{
				painted[i] = new Painted();
			}

			class Buff
			{
				constructor()
				{
					this.x = 0;
					this.y = 0;
					this.fLower = true;	// false:空き true:壁がある
					this.fUpper = true;	// false:空き true:壁がある
				}
			}
			const l_MAXBUF = 1000;
			let l_cntBuf = 0;
			let l_fPrevLower = false;
			let l_fPrevUpper = false;
			let buff = new Array(l_MAXBUF);
			for ( let i = 0 ; i < l_MAXBUF ; i++ )
			{
				buff[i] = new Buff();
			}


			//-----------------------------------------------------------------------------
			function isPainted( x0, y0 )
			//-----------------------------------------------------------------------------
			{
				for ( let i = 0 ; i < l_cntPaintBuf ; i++ )
				{
					if ( painted[i].y == y0 )
					{
						if ( painted[i].sx <= x0 && x0 <= painted[i].ex )
						{
							return true; //既にペイント済み
						}
					}
				}
				return false;
			}

			//-----------------------------------------------------------------------------
			function addPos( x0, y0, colsRej )
			//-----------------------------------------------------------------------------
			{
				if ( l_cntBuf >= l_MAXBUF ) return;

				let fLower = false;
				let fUpper = false;
				
				if ( y0+1 < thisclass.img.height )
				{
					let c = thisclass.point( x0, y0+1 );
					if ( colsRej.indexOf(c) != -1 )  fLower = true;	// 塗り不可
					if ( isPainted( x0, y0+1 ) ) fLower = true;		// 塗り不可

				}
				else
				{
					fLower = true;									// 塗り不可
				}

				if ( y0-1 >= 0 )
				{
					let c = thisclass.point( x0, y0-1 );
					if ( colsRej.indexOf(c) != -1 )  fUpper = true;	// 塗り不可
					if ( isPainted( x0, y0-1 ) ) fUpper = true;		// 塗り不可
				}
				else
				{
					fUpper = true;									// 塗り不可
				}

				if (( fLower == false && fLower != l_fPrevLower ) 
				||	( fUpper == false && fUpper != l_fPrevUpper ) 
				)	
				{
					buff[l_cntBuf].x = x0;
					buff[l_cntBuf].y = y0;
					buff[l_cntBuf].fLower = fLower;
					buff[l_cntBuf].fUpper = fUpper;

					l_cntBuf++;
				}

				l_fPrevLower = fLower;
				l_fPrevUpper = fUpper;
				

			}

			//-----------------------------------------------------------------------------
			function linepaint( x0, y0, colsPat, colsRej )
			//-----------------------------------------------------------------------------
			{
				if ( isPainted( x0, y0 ) ) return; //既にペイント済み
				if ( l_cntPaintBuf >= l_MAXPAINTBUF ) 
				{
					console.log( "ペイントバッファオーバー");
					return;
				}

				let y = y0;
				l_fPrevLower = true;
				l_fPrevUpper = true;


				// 左端検出
				let x = x0;
				for ( ; x > 0 ; x-- )
				{
					let c = thisclass.point(x-1,y);
					if ( colsRej.indexOf(c) != -1 )  break;	// 左境界検出
				}
				painted[l_cntPaintBuf].sx = x;

				// 右端までペイント
				for ( ; x < thisclass.img.width ; x++ )
				{
					let c = thisclass.point( x, y );
					if ( colsRej.indexOf(c) != -1 )  break;	// 右境界検出
					addPos( x, y, colsRej );

					{
						let ix = Math.floor( x % colsPat[0].length );
						let iy = Math.floor( y % colsPat.length );
						thisclass.pset0( x, y , colsPat[iy][ix] );
					}
				}
				painted[l_cntPaintBuf].ex = x-1;
				painted[l_cntPaintBuf].y = y;
				
				l_cntPaintBuf++;

			}

			{
				l_cntPaintBuf = 0;
				// 最初の一本
				linepaint( x0, y0, colsPat, colsRej );
			}

			{
				let st = 0;
				while( st < l_cntBuf )
				{
					let en = l_cntBuf-1;
//console.log(st,en);
					for ( let i = st ; i <= en ; i++ )
					{
						if ( buff[i].fLower == false )
						{
							linepaint(  buff[i].x, buff[i].y+1, colsPat, colsRej );
						}
						if ( buff[i].fUpper == false )
						{
							linepaint(  buff[i].x, buff[i].y-1, colsPat, colsRej );
						}
					}
					st = en+1;

				}
			}
		//	console.log( "use paint buffer " + l_cntPaintBuf );
			return true;
		}
	}

};

//let gra = g_context.createImageData( 640, 200 );
g_context.imageSmoothingEnabled = g_context.msImageSmoothingEnabled = 0; // スムージングOFF
let gra = new GRA( g_context, 640, 200 );


let g_tblVect = 
[
/* 240*/0,
/* 250*/202,52,202,55,203,62,204,63,205,68,207,70,208,73,210,75,225,82,233,87,237,91,239,95,245,101,254,105,263,108,275,111,291,114,322,109,339,105,355,101,0,0,
/* 260*/203,54,206,57,207,59,214,63,222,64,222,61,221,60,221,54,222,49,224,46,227,40,224,46,228,51,234,57,241,61,244,61,237,53,235,43,236,40,237,36,240,32,237,36,236,40,246,49,
/* 270*/257,55,268,58,282,59,297,58,298,57,297,56,291,54,284,50,276,42,276,37,278,38,282,42,291,47,304,51,316,52,338,54,339,55,349,56,362,60,369,63,376,67,369,63,368,69,370,76,374,81,377,85,0,0,
/* 280*/236,90,228,91,216,90,205,87,191,81,179,74,170,67,165,62,164,54,163,49,164,42,166,39,176,29,185,22,198,16,214,13,227,14,233,16,
/* 290*/235,16,243,13,254,9,265,7,279,6,302,7,333,13,350,18,367,24,373,28,380,34,379,42,383,46,389,48,390,50,393,51,394,61,385,64,378,70,377,85,0,0,
/* 300*/199,85,194,89,181,92,140,100,120,105,105,111,90,118,84,122,77,129,74,134,72,143,76,149,85,155,89,156,89,154,87,151,86,145,89,139,99,132,117,125,121,124,122,125,108,132,
/* 310*/100,138,93,145,91,156,92,163,101,173,112,180,122,184,131,185,131,184,125,181,121,176,120,172,125,161,127,159,129,159,129,162,127,169,129,177,131,181,139,187,152,192,169,195,0,0,
/* 320*/227,14,239,11,254,9,0,0,
/* 330*/288,5,300,4,313,3,324,3,358,4,381,7,400,12,408,15,421,22,435,32,448,45,457,56,466,71,472,83,475,96,477,107,476,117,473,126,469,131,0,0,
/* 340*/298,114,299,123,298,130,295,133,286,134,272,135,268,135,242,138,225,143,211,149,202,155,189,167,179,179,171,191,167,199,0,0,
/* 350*/377,85,376,88,376,88,375,99,376,100,376,103,377,110,380,116,383,120,388,123,418,126,425,126,452,128,462,130,475,134,484,139,494,146,505,156,511,164,520,172,530,182,540,190,547,199,0,0,
/* 360*/472,199,470,196,459,187,451,180,442,173,430,165,429,166,429,171,428,178,424,185,417,192,407,199,0,0,
/* 370*/256,136,248,144,236,154,227,157,215,164,202,170,195,177,195,180,198,186,206,193,215,199,0,0,
/* 380*/268,135,263,141,254,149,250,156,237,154,250,156,263,158,284,160,314,156,340,151,357,150,379,153,381,156,378,162,373,161,366,167,359,176,358,179,360,186,366,193,375,200,
/* 390*/352,200,344,191,340,185,338,179,340,173,343,167,355,159,373,161,355,159,310,164,275,169,272,169,250,165,229,162,216,163,0,0,
/* 400*/401,125,393,130,384,138,377,136,373,139,375,148,379,153,383,153,384,149,388,145,390,150,388,145,384,149,383,153,391,153,389,156,381,156,378,162,377,173,392,175,395,167,
/* 410*/390,168,385,165,381,156,385,156,391,165,394,167,398,167,401,174,415,173,410,170,409,168,416,169,428,176,429,174,420,167,414,163,407,166,409,168,407,166,398,167,407,166,414,163,422,160,
/* 420*/422,158,399,152,391,154,399,152,404,149,406,141,385,138,403,141,406,134,411,126,0,0,
/* 430*/393,159,397,163,400,160,400,158,398,156,0,0,
/* 440*/339,14,356,11,360,13,362,15,362,16,357,15,353,14,357,15,362,16,363,20,357,18,349,15,357,18,363,20,365,23,0,0,
/* 450*/380,34,382,30,386,27,393,28,398,30,418,28,419,29,415,40,408,46,396,49,395,48,396,42,399,41,404,44,399,41,396,42,395,48,389,48,390,50,393,51,402,63,396,64,399,64,407,71,
/* 460*/421,68,418,65,417,61,405,64,402,63,405,64,417,61,427,58,416,53,407,50,410,48,408,46,410,48,407,50,400,51,403,55,408,56,410,55,408,56,403,55,400,51,393,51,0,0,
/* 470*/383,34,384,42,388,46,0,0,
/* 480*/387,66,390,68,386,74,383,71,381,72,383,71,386,74,382,77,378,78,378,83,384,82,391,77,395,72,396,64,394,60,0,0,
/* 490*/229,23,220,21,210,20,198,22,184,29,178,34,179,36,185,32,187,32,182,42,178,40,175,46,174,53,179,65,187,73,199,80,218,86,215,83,202,76,198,71,190,61,184,50,185,47,193,55,194,54,193,37,199,32,206,26,220,22,0,0,
/* 500*/379,40,368,32,359,29,345,20,344,22,345,26,342,26,336,22,330,20,304,13,284,11,266,13,255,17,250,20,247,23,250,20,260,20,289,25,324,37,339,44,343,44,343,43,333,34,327,30,329,29,343,35,355,41,370,48,383,56,387,63,0,0,
/* 510*/210,89,205,93,188,97,160,101,159,101,163,104,157,107,142,111,138,110,139,105,128,108,114,114,95,126,82,137,80,141,83,142,89,135,103,125,129,120,143,119,156,115,156,117,138,128,122,137,117,141,115,140,120,133,117,131,104,142,99,150,
/* 520*/98,156,100,164,108,172,112,173,115,160,123,152,139,145,159,140,167,136,167,139,152,145,142,151,137,156,137,158,140,159,139,162,142,164,143,167,149,166,154,176,150,177,142,175,135,172,132,174,142,182,152,187,170,193,0,0,
/* 530*/307,7,347,8,360,10,380,17,389,23,392,23,389,18,391,17,405,22,415,27,418,28,424,32,433,41,440,52,448,64,455,81,456,93,453,96,450,90,446,93,445,100,439,96,437,105,428,102,422,114,426,119,435,116,440,120,455,112,456,121,453,127,0,0,
/* 540*/320,10,330,10,341,12,0,0,
/* 550*/364,19,375,24,382,30,0,0,

// 右目
/* 560*/220,69,220,68,222,66,223,66,224,65,234,65,235,66,239,66,240,67,245,67,246,68,254,70,0,0,
/* 570*/224,73,223,72,223,69,224,68,226,68,227,67,233,67,234,68,239,68,240,69,244,69,245,70,256,72,257,73,260,74,0,0,
/* 580*/247,86,250,87,257,88,264,87,265,86,266,86,0,0,
/* 590*/250,72,247,72,246,73,246,73,246,75,247,76,247,77,251,81,258,84,262,84,264,82,264,79,260,75,0,0,
/* 600*/251,73,251,74,250,75,248,75,250,75,251,76,251,77,254,80,257,81,259,81,260,80,260,79,256,75,253,74,251,74,0,0,

// 左目
/* 610*/306,60,310,56,313,55,316,54,328,54,329,55,334,55,335,56,338,56,339,57,344,58,345,59,0,0,
/* 620*/307,65,309,60,310,59,311,59,313,57,318,56,329,56,330,57,335,57,336,58,342,59,343,60,352,64,0,0,
/* 630*/321,78,332,79,337,79,338,78,342,78,343,77,345,77,350,75,0,0,
/* 640*/339,59,337,59,336,60,335,60,334,61,333,66,334,67,334,68,336,70,338,72,340,72,341,73,345,73,346,72,348,72,349,71,350,68,349,65,347,63,0,0,
/* 650*/338,60,339,61,339,62,337,64,335,64,338,64,338,66,342,70,344,70,345,69,345,68,344,65,343,64,342,63,340,63,0,0,

//鼻
/* 660*/273,86,271,86,270,87,269,87,268,88,270,90,273,91,276,94,0,0,
// 口
/* 670*/280,99,283,100,0,0,
/* 680*/288,100,291,99,294,98,295,98,298,97,0,0,
/* 690*/287,103,292,103,0,0,
/* 700*/221,60,224,60,225,59,234,61,0,0,
/* 710*/308,52,311,49,320,50,0,0,
/* 720*/215,68,220,70,0,0,
/* 730*/216,71,221,72,0,0,
/* 740*/217,73,220,74,223,74,0,0,
/* 750*/349,58,348,61,0,0,
/* 760*/353,59,349,62,0,0,
/* 770*/355,61,350,63,0,0,
/* 780*/233,151,234,154,0,0,
/* 790*/260,147,267,147,268,148,282,148,0,0,
/* 800*/341,144,359,142,370,140,0,0,
/* 810*/293,155,290,159,-1,-1,
/* 820*/5,
/* 830*/220,73,224,73,0,0,
/* 840*/220,71,223,71,222,69,221,69,221,68,223,68,222,67,226,67,224,66,234,66,234,67,235,67,239,67,240,68,243,68,244,69,245,69,249,69,248,70,254,70,0,0,
/* 850*/307,63,307,60,308,61,308,59,309,59,309,58,311,58,310,57,312,57,312,56,315,56,315,55,328,55,330,56,334,56,337,57,338,57,340,58,346,60,-1,-1,
/* 860*/3,
/* 870*/222,54,233,57,0,0,
/* 880*/238,53,255,58,268,59,0,0,
/* 890*/299,58,306,60,0,0,
/* 900*/349,77,362,82,363,89,355,101,344,114,350,123,370,130,389,133,0,0,
/* 910*/391,133,405,134,0,0,
/* 920*/407,134,434,133,454,130,0,0,
/* 930*/423,160,425,159,430,154,444,157,459,170,488,199,0,0,
/* 940*/373,137,367,139,0,0,
/* 950*/365,142,373,151,0,0,
/* 960*/194,180,182,199,0,0,
/* 970*/374,153,373,160,0,0,
/* 980*/224,74,229,79,246,86,0,0,
/* 990*/265,80,267,82,267,85,0,0,
/*1000*/307,66,308,70,314,75,320,78,0,0,
/*1010*/353,65,353,71,351,74,0,0,
/*1020*/270,89,279,89,278,90,277,93,999,999,

/*1030*/ [[4]], [0,3,4,5],								// 髪明
/*1040*/250,30,200,90,232,14,300,6,-1,-1,

/*1050*/ [[4,0],[0,4]],[0],			// 髪陰
/*1060*/190,30,280,15,220,95,320,8,370,19,420,40,-1,-1,

/*1070*/ [[6,0],[0,6]],[0,3],					// 角
/*1080*/348,14,-1,-1,

/*1090*/[[3]],[0,3,4,5],	//境界色潰しのための紫塗り
/*1100*/224,48,238,45,290,50,330,54,336,55,343,57,360,110,420,130,390,65,430,162,370,144,379,156,414,166,200,199,329,11,370,24,400,35,408,48,410,60,398,62,410,65,275,91,-1,-1,

/*1110*/[[7,0],[0,7]],[0,4,7],	//リボン
/*1120*/329,11,370,24,400,35,408,48,410,60,398,62,410,65,412,167,379,156,-1,-1,

/*1130*/[	[6,7,7,6,7,7,6,7],
			[7,7,6,7,7,6,7,7],
			[7,6,7,7,6,7,7,6]],[0,3,4,5],	//肌明
/*1140*/270,65,320,120,240,145,430,150,-1,-1,

/*1150*/[	[6,6,6,7,6,6,6,7],[6,7,6,6,6,7,6,6]],[0,4,5,6,7],	//肌影
/*1160*/224,48,238,45,290,50,330,54,336,55,343,57,360,110,410,130,390,65,430,162,370,144,200,199,275,91,-1,-1,

/*1170*/[[1,0],[0,1]],[0,3],	//	服影
/*1180*/400,130,370,180,-1,-1,
/*1190*/[[1]],[0],				// 服
/*1200*/270,175,250,146,390,137,-1,-1,

/*1210*/[[7,2],[2,7]],[0],				// リボン
/*1220*/380,145,383,155,410,160,388,164,380,170,403,172,-1,-1,

/*1230*/[[6]],[0],	//	服ライン
/*1240*/370,199,0,0,

/*1250*/7,
/*1260*/224,74,229,79,246,86,0,0,
/*1270*/265,80,267,82,267,85,0,0,
/*1280*/307,66,308,70,314,75,320,78,999,999,

/*1290*/[[4,5],[5,4]],[0],	// 瞳孔淵
/*1300*/260,82,340,71,-1,-1,

/*1310*/[[0]],[0],		// 瞳孔中心
/*1320*/253,77,340,65,-1,-1,

///*1330*/2 ,0x11,0xff,0x11, 0x44,0xff,0x44, 0,0,0,0,0,
/*1330*/[[2,2,2,7],[2,7,2,2]],[0],	// 背景
/*1340*/639,0,123,175,430,199,999,999,
];





//-----------------------------------------------------------------------------
let circle = function( context, x,y,r )
//-----------------------------------------------------------------------------
{
	{
		context.beginPath();
		context.arc(x, y, r, 0, Math.PI * 2, true);
		context.closePath();
		context.stroke();
	}
}
//	let cr1,cg1,cb1;
//	let cr2,cg2,cb2;
	let ccnt = 0;
	let cpr = new Array(3);
	let cpg = new Array(3);
	let cpb = new Array(3);
	let c1,c2,c3,c4,c5;


	let coltbl8 =
	[

		0x000000,
		0x0000ff,
		0xff0000,
		0xff00ff,
		0x00ff00,
		0x00ffff,
		0xffff00,
		0xffffff,
	]

	let	g_stat = 0;
	let g_idxVect = 0;
	let g_col;
	let g_sx,g_sy
	let g_pat;
	let g_rej;
//let g_cnt = 0;
//-----------------------------------------------------------------------------
function drawVector( gra )
//-----------------------------------------------------------------------------
{
	let ex,ey;


	{
		switch( g_stat )
		{
		case 0: // color
			g_col = coltbl8[ g_tblVect[g_idxVect++] ]; 
			g_stat++;
			break

		case 1: // g_sx g_sy
			g_sx = g_tblVect[g_idxVect++];	
			g_sy = g_tblVect[g_idxVect++];	
			g_stat++;
			break;
		
		case 2: // ex ey , line
			ex = g_tblVect[g_idxVect++];	
			ey = g_tblVect[g_idxVect++];	

			if ( ex == -1 )		{g_stat = 0;break;} 
			if ( ex == 0 )		{g_stat = 1;break;} 
			if ( ex == 999 )	{g_stat = 3;break;}
			gra.line( g_sx,g_sy,ex,ey, g_col );

			g_sx = ex;
			g_sy = ey;
			break

		case 3: // color g_pattern
			g_pat = g_tblVect[g_idxVect++];
			g_rej = g_tblVect[g_idxVect++];

			for ( let g_idxVect=0 ; g_idxVect < g_pat.length ; g_idxVect++ )
			{
				for ( let j=0 ; j < g_pat[g_idxVect].length ; j++ )
				{
					g_pat[g_idxVect][j] = coltbl8[ g_pat[g_idxVect][j] ];
				}
			}
			for ( let g_idxVect=0 ; g_idxVect < g_rej.length ; g_idxVect++ )
			{
					g_rej[g_idxVect] = coltbl8[ g_rej[g_idxVect] ] ;
			}
			g_stat++;
			break

		case 4: // paint
			if ( g_flgSleep ) break;
			g_sx = g_tblVect[g_idxVect++];	
			g_sy = g_tblVect[g_idxVect++];	

			if ( g_sx == -1 )		{g_stat = 3;break;} 
			if ( g_sx == 0 )		{g_stat = 0;break;} 
			if ( g_sx == 999 )	{g_stat = 9;break;}


//			if ( g_cnt++ < 30+10+10 )
//			if ( g_cnt++ < 40+3 )
//			if ( g_cnt < 42 )
			gra.paint( g_sx,g_sy, g_pat,g_rej );
//console.log(g_cnt, g_sx,g_sy,g_pat,g_rej);
//g_cnt++;
			break;		

//		case 9:	// end
//			return;
		}
	}
}

//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	gra.cls( 0xffffff );			
//	while( g_idxVect < g_tblVect.length && g_stat !=9)
//		drawVector( gra );
//
	update();
}

main();

function update()
{
	for ( let i = 0 ; i < 10 ; i ++ )
	{
		if ( g_idxVect < g_tblVect.length && g_stat != 9 )
		{
			drawVector( gra );
		}
	}

	// 引き伸ばして表示
	{
	    let cv=document.createElement('canvas');				// 新たに<canvas>タグを生成
	    cv.width=640;
	    cv.height=200;
		cv.getContext("2d").putImageData(gra.img,0,0);				// 作成したcanvasにImageDataをコピー
		{
			let sx = 0;
			let sy = 0;
			let sw = 640;
			let sh = 200;
			let dx = 0;
			let dy = 0;
			let dw = 640;
			let dh = 400;
			g_context.drawImage( cv,sx,sy,sw,sh,dx,dy,dw,dh);	// ImageDataは引き延ばせないけど、Imageは引き延ばせる
		}
		
	}
	requestAnimationFrame( update );
}
