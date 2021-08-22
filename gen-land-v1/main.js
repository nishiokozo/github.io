let g=html_canvas.getContext('2d');

//-----------------------------------------------------------------------------
function rand( n ) // n=3以上が正規分布
//-----------------------------------------------------------------------------
{
	let r = 0;
	for ( j = 0 ; j < n ; j++ ) r += Math.random();
	return r/n;
}

class Gra
{
	//-----------------------------------------------------------------------------
	constructor( w, h)
	//-----------------------------------------------------------------------------
	{
		this.img = g.createImageData( w, h );
	}
	//-----------------------------------------------------------------------------
	cls( val )
	//-----------------------------------------------------------------------------
	{
		for (let x=0; x<this.img.width ; x++ )
		for (let y=0; y<this.img.height ; y++ )
		{
			let adr = (y*this.img.width+x)*4;
			this.img.data[ adr +0 ] = 0x00;
			this.img.data[ adr +1 ] = 0x00;
			this.img.data[ adr +2 ] = 0x00;
			this.img.data[ adr +3 ] = val?0:0xff;
		}
	}
/*
	//-----------------------------------------------------------------------------
	pset( x, y, val )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*this.img.width+x)*4;
		this.img.data[ adr+3 ] = val?0:0xff;
	}
	//-----------------------------------------------------------------------------
	point( x, y )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*this.img.width+x)*4;
		return this.img.data[ adr+3 ]?0:1;
	}
*/
	//-----------------------------------------------------------------------------
	pseta( x, y, val )
	//-----------------------------------------------------------------------------
	{
		if ( val > 1 ) val = 1;
		if ( val < 0 ) val = 0;
		val = ((1-val)*255)&0xff;
		let adr = (y*this.img.width+x)*4;
		this.img.data[ adr+3 ] = val;
	}
/*
	//-----------------------------------------------------------------------------
	pointa( x, y )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*this.img.width+x)*4;
		return this.img.data[ adr+3 ];
	}
*/
	//-----------------------------------------------------------------------------
	streach()
	//-----------------------------------------------------------------------------
	{
		// -----------------------------------------
		// ImageDataをcanvasに合成
		// -----------------------------------------
		// g   : html_canvas.getContext('2d')
		// img : g.createImageData( width, height )

		g.imageSmoothingEnabled = g.msImageSmoothingEnabled = 0; // スムージングOFF

		{
		// 引き伸ばして表示
		    let cv=document.createElement('canvas');				// 新たに<canvas>タグを生成
		    cv.width = this.img.width;
		    cv.height = this.img.height;
			cv.getContext("2d").putImageData( this.img,0,0);				// 作成したcanvasにImageDataをコピー
			{
				let sx = 0;
				let sy = 0;
				let sw = this.img.width;
				let sh = this.img.height;
				let dx = 0;
				let dy = 0;
				let dw = html_canvas.width;
				let dh = html_canvas.height;
				g.drawImage( cv,sx,sy,sw,sh,dx,dy,dw,dh);	// ImageDataは引き延ばせないけど、Imageは引き延ばせる
			}
			
		}
	}
}

//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	//-----------------------------------------------------------------------------
	function pat_normalize( pat )
	//-----------------------------------------------------------------------------
	{
		let amt = 0;
		for ( let m = 0 ; m < pat.length ; m++ )
		{
			for ( let n = 0 ; n < pat[m].length ; n++ )
			{
				amt += pat[m][n];
			}
		}
		for ( let m = 0 ; m < pat.length ; m++ )
		{
			for ( let n = 0 ; n < pat[m].length ; n++ )
			{
				pat[m][n] /= amt;
			}
		}
		return pat;
	}

	//-----------------------------------------------------------------------------
	function pat_calc( buf1, pat, w, h )
	//-----------------------------------------------------------------------------
	{
		let buf2 = new Array( buf1.length );
		let edge = Math.floor(pat.length/2);

		for ( let y = 0 ; y < h ; y++ )
		{
			for ( let x = 0 ; x < w ; x++ )
			{
				let adr = (w*y + x); 

				let v = 0;
				for ( let m = 0 ; m < pat.length ; m++ )
				{
					for ( let n = 0 ; n < pat[m].length ; n++ )
					{
						// ラウンドする
						let px = x+(m-edge);
						let py = y+(n-edge);
			
						if ( px < 0   ) px = w-1;
						else
						if ( px >= w ) px = 0;

						if ( py < 0   ) py = h-1;
						else
						if ( py >= h ) py = 0;

						let a = (w*py + px); 

						v += buf1[ a ] * pat[m][n];
					}
				}
				buf2[ adr ] = v;
			}
		}
		return buf2;
	}
	//-----------------------------------------------------------------------------
	function draw_buf( gra, buf )
	//-----------------------------------------------------------------------------
	{
		let h = gra.img.height;
		let w = gra.img.width
		for ( let y = 0 ; y < h ; y++ )
		{
			for ( let x = 0 ; x < w ; x++ )
			{
				let v = buf[ w*y + x ];
				gra.pseta( x, y, v );
			}
		}
	}
	//-----------------------------------------------------------------------------
	function pat_gauss2d( size, sigma )
	//-----------------------------------------------------------------------------
	{
		//-----------------------------------------------------------------------------
		function gauss( x,s )
		//-----------------------------------------------------------------------------
		{
			let u = 0; 
			// u: μミュー	平均
			// s: σシグマ	標準偏差
			return 	1/(Math.sqrt(2*Math.PI*s))*Math.exp( -((x-u)*(x-u)) / (2*s*s) );
		}
		// size  :マトリクスの一辺の大きさ
		// sigma :
		const c = Math.floor(size/2);
		let pat = new Array(size);
		for ( let i = 0 ; i < pat.length ; i++ ) pat[i] = new Array(size);
		for ( let m = 0 ; m < pat.length ; m++ )
		{
			for ( let n = 0 ; n < pat[m].length ; n++ )
			{
				let x = (m-c);
				let y = (n-c);
				let l = Math.sqrt(x*x+y*y);
				pat[m][n] = gauss( l, sigma );
			}
		}
		return pat;

	}	

	
	{
		const SZ = 64;
		let buf = new Array( SZ*SZ );

		// ランダムの種作成
		for ( let i = 0 ; i < SZ*SZ ; i++ )
		{
			buf[i] = rand(1);
		}


		// 3x3ブラーフィルタ作成
		let pat33 = pat_normalize(
		[
			[1,2,1],
			[2,4,2],
			[1,2,1],
		]);

		// 5x5ガウスブラーフィルタ作成
		let pat55 = pat_normalize( pat_gauss2d( 5, 1 ) );

		// 9x9ガウスブラーフィルタ作成
		let pat99 = pat_normalize(pat_gauss2d( 9, 2 ) );

		// ブラーフィルタ適用
		let buf2 = pat_calc( buf, pat99, SZ, SZ );

		for ( let i = 0 ; i < SZ*SZ ; i++ )
		{
//			buf2[i] = buf2[i]*buf2[i]*3;
			 buf2[i] -= 0.5;
			 buf2[i] *= 5;
			if ( buf2[i] < 0.5 )
			{
//				 buf2[i] = 0.5;
			}
		}

		{
			// 画面作成
			let gra = new Gra( SZ, SZ );
			// 画面クリア
			gra.cls(0);
			// 画面描画
			draw_buf( gra, buf2 );
			// 画面をキャンバスへ転送
			gra.streach();
		}
	}
}

//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
	main();
}

