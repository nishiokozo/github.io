"use strict";

let canvas_dbg	= document.getElementById( "html_canvas_dbg" );		// 2D画面(debug用)
let canvas_out	= window.document.getElementById( "html_canvas" );		// 出力画面
let canvas_gl	= window.document.getElementById( "html_canvas_gl" );	// g用l画面
let fnt = { font:null, filename:"font.bmp", W:8, H:8, getUV:getUV_ascii };

let gl = canvas_gl.getContext( "webgl", { antialias: false } );			// gl

let pad = pad_create();

   	let C0 =  vec3(0.32,0.32,0.32);
   	let C1 =  vec3(0.32,0.32,0.90) ;
   	let C2 =  vec3(0.90,0.32,0.32) ;
   	let C3 =  vec3(0.90,0.32,0.90) ;
   	let C4 =  vec3(0.32,0.90,0.32) ;
   	let C5 =  vec3(0.32,0.72,0.72);
   	let C6 =  vec3(0.9,0.9,0.0) ;
   	let C7 =  vec3(1,1,1);
   	let C8 =  vec3(0.75,0.75,0.75);
   	let C9 =  vec3(0.5,0.5,0.5);
   	
let jiki_json = 
[
	{
		name:"self",
		type:"PCIWF",
		xyzOfs:[0,0,0],
		xyzPos: 
		[
			[ 0,-16, 0],
			[ 0,  3, 0],
			[-6,  0, 0],

			[ 0,-16, 0],
			[ 0,  3, 0],
			[ 6,  0, 0],
		],
		rgbCol: 
		[
			[ 1,0,0],
			[ 0,1,1],
			[ 0,1,1],

			[ 1,0,0],
			[ 0,1,1],
			[ 0,1,1],

		],
		index_wire:[],
		index_flat:[1,0,2,	3,4,5],
	},
	[
		{
			name:"left",
			type:"PCIWF",
			xyzOfs:[-4,-4,0],
			xyzPos: 
			[
				[ 0, -8, 0],
				[ 0, 10, 0],
				[-8,  8, 0],
			],
			rgbCol: 
			[
				[ 0.8, 0.8, 0.0],
				[ 0.0, 0.8, 1.0],
				[ 1.0, 0.8, 0.0],
			],
			index_wire:[],
			index_flat:[0,2,1],
		},
		{
			name:"right",
			type:"PCIWF",
			xyzOfs:[ 4,-4,0],
			xyzPos: 
			[
				[ 0, -8, 0],
				[ 0, 10, 0],
				[ 8,  8, 0],
			],
			rgbCol: 
			[
				[ 0.8, 0.8, 0.0],
				[ 0.0, 0.8, 1.0],
				[ 1.0, 0.8, 0.0],
			],
			index_wire:[],
			index_flat:[0,1,2],
		},
	]
];

let missile_json = 
[
	{
		name:"missile",
		type:"PCIWF",
		xyzOfs:[0,0,0],
		xyzPos: 
		[
			[ 0,-5, 0],
			[-3, 5, 0],
			[ 3, 5, 0],
		],
		rgbCol: 
		[
			[ 0.1, 0.8, 1.0],
			[ 0.1, 0.8, 1.0],
			[ 0.1, 0.8, 1.0],
		],
		index_wire:[],
		index_flat:[0,1,2],
	},
];


//-----------------------------------------------------------------------------
let tree_comvert = function( tree )	
//-----------------------------------------------------------------------------
{
	let tbl = [];
	for ( let t of tree )
	{
		if ( t instanceof Array == true ) 
		{
			tbl.push( tree_comvert(t) );
		}
		else
		{
			let dat = model_comvert_single( t );
			tbl.push( dat );
		}
	}
	return tbl;
}
//---------------------------------------------------------------------
let tree_draw = function( gl, tree, P, V )	
//---------------------------------------------------------------------
{
	let model = null;
	for ( let t of tree )
	{
		if ( t instanceof Array == true ) 
		{
			tree_draw( gl, t, P, V);
		}
		else
		{
			model = t;
			{
				// 描画部
				let M = mmul( mtrans(model.global_qp.P), mq(model.global_qp.Q) );	//cul:64
				orgmesh_drawModel( gl, P, V, M, model, model.shader,model.orgmesh );
			}
		}
		
	}
}
//---------------------------------------------------------------------
let tree_reload = function( gl, tree )	
//---------------------------------------------------------------------
{
	for ( let t of tree )
	{
		if ( t instanceof Array == true ) 
		{
			tree_reload(gl, t);
		}
		else
		{
			let model = t;
			
			shader_draw( gl, model.shader,model.orgmesh );
			model.orgmesh.m_tblDisp = [];

		}
		
	}
}
let fdata= [ 
	0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b00111100,0b11111100,0b00111100,0b11111000,0b11111110,0b11111100,0b00111100,0b11000110,0b01111000,0b01111000,0b11000110,0b11000000,0b11000110,0b11000110,0b00111000,0b00000000,
	0b11000110,0b11000110,0b01100110,0b11001100,0b11000000,0b11000000,0b01100100,0b11000110,0b00110000,0b00110000,0b11001100,0b11000000,0b11101110,0b11100110,0b01101100,0b00000000,
	0b11000110,0b11000110,0b11000010,0b11000110,0b11000000,0b11000000,0b11000010,0b11000110,0b00110000,0b00110000,0b11011000,0b11000000,0b11101110,0b11100110,0b11000110,0b00000000,
	0b11111110,0b11111100,0b11000000,0b11000110,0b11111100,0b11110000,0b11000000,0b11111110,0b00110000,0b00110000,0b11110000,0b11000000,0b11010110,0b11010110,0b11000110,0b00000000,
	0b11000110,0b11000110,0b11000010,0b11000110,0b11000000,0b11000000,0b11011110,0b11000110,0b00110000,0b00110000,0b11111000,0b11000000,0b11010110,0b11010110,0b11000110,0b00000000,
	0b11000110,0b11000110,0b01100110,0b11001100,0b11000000,0b11000000,0b01100110,0b11000110,0b00110000,0b01110000,0b11001100,0b11000000,0b11000110,0b11001110,0b01101100,0b00000000,
	0b11000110,0b11111100,0b00111100,0b11111000,0b11111110,0b11000000,0b00111010,0b11000110,0b01111000,0b01100000,0b11000110,0b11111110,0b11000110,0b11000110,0b00111000,0b00000000,
	//	
	0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11111100,0b01111100,0b11111100,0b01111100,0b11111111,0b11000110,0b11000110,0b11000011,0b11000110,0b11000011,0b01111110,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11000110,0b11000110,0b11000110,0b11000110,0b00011000,0b11000110,0b11000110,0b11000011,0b01101100,0b01100110,0b00000110,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11000110,0b11000110,0b11000110,0b11000000,0b00011000,0b11000110,0b11000110,0b11000011,0b00101000,0b01101110,0b00001100,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11000110,0b11000110,0b11111100,0b01111100,0b00011000,0b11000110,0b01101100,0b11011011,0b00110000,0b00111100,0b00011000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11111100,0b11011110,0b11011000,0b00000110,0b00011000,0b11000110,0b01101100,0b11011011,0b00111000,0b00011000,0b00110000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11000000,0b01100110,0b11001100,0b11000110,0b00011000,0b11000110,0b00111000,0b01101110,0b01001100,0b00011000,0b01100000,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
	0b11000000,0b00111011,0b11001100,0b01111100,0b00011000,0b01111100,0b00010000,0b01100110,0b11000110,0b00011000,0b01111110,0b00000000,0b00000000,0b00000000,0b00000000,0b00000000,
];


let g_flgFirst = true;
//-----------------------------------------------------------------------------
window.onload = function( e )	// コンテンツがロード
//-----------------------------------------------------------------------------
{
let img = window.document.getElementById( "html_fontid" );
	console.log( img.src );


	gl.enable( gl.DEPTH_TEST );
	gl.depthFunc( gl.LEQUAL );	// gl.LESS;	最も奥が1.0、最も手前が0.0

	let SW= 2.0/canvas_gl.width;	// 移動空間(vs)のドット幅
	let SH= 2.0/canvas_gl.height;

	let shader	= gl_createShader( gl, gl_vs_P3C, gl_fs_color	, ["Pos3","Col3"],[] );
	if ( 1 )
	{
		let gl_vs_P3C_scale = // 1ドットサイズが1.0になる空間
			 "attribute vec3 Pos3;"
			+"attribute vec3 Col3;"
			+"uniform vec2 Scl;"
			+"varying vec3 vColor;"
			+"void main( void )"
			+"{"
			+"	vec3 v3 = Pos3 * vec3(Scl,1);"
			+	"gl_Position = vec4( v3, 1.0 );"
			+   "vColor = Col3;"
			+"}"
		;
		SW = 1;
		SH = 1;
		shader	= gl_createShader( gl, gl_vs_P3C_scale, gl_fs_color	, ["Pos3","Col3"],["Scl"] );
	}

	//--
	
	{
		html.entry( "html_edit"			,"checkbox"	,	false	);	//
		html.entry( "html_ik"			,"checkbox"	,	false	);	//
		html.entry( "html_textarea"		,"textbox"	,	""	);
		html.entry( "html_textarea2"	,"textbox"	,	"sub"	);	// 
	}
	html.request = function( req )	// window.onload()の前に完了していないので、この定義までにボタンが押される可能性があり僅かに問題がある。
	{
		// ブラウザからのクリックを反映させる為の処理。
		if ( req=="(edit)" ) html.read("html_edit") ;	// htmlの設定がhtml.paramに反映される
		if ( req=="(ik)" ) html.read("html_ik") ;	// htmlの設定がhtml.paramに反映される

		console.log(req);
	}
	html.write_all();	// html.paramの設定値がhtmlに反映される

	html.set("html_edit",true );

	/////////////////////////////
	// 初期設定

	const dw =2.0/canvas_gl.width;
	const dh =2.0/canvas_gl.height;

	let bloom = bloom_create( gl );

	let jx = 0;
	let jy = 0;
	let prev_time = 0;
	let sum_dt = 0;
	let fps=1;
	let tblDt=[];

//	gl_cls( gl, vec3(0.2,0.2,0.2) );

if(0)
	{
		fnt.image = requestLoadImagefile( fnt.filename );
	}
	else
	{
		fnt.image = new ImageData(128,128);	// Image / ImageData / canvas 等もＯＫ 
		let img = fnt.image;
		let st = 128*8*4;
		let en = 128*8*8;
		for ( let y = 0 ; y < 16 ; y++ )
		{
			for ( let x = 0 ; x < 16 ; x++ )
			{
				for ( let v = 0 ; v < 8 ; v++ )
				{
					let fm = fdata[((y-4)*8+v)*16+x];
					for ( let u = 0 ; u < 8 ; u++ )
					{
//						let b = (fm >> (8-1-u)) & 0x1;
						let b = (fm & (0x80>>u))?1:0;
						let to = ((y*8+v)*128+(x*8+u));
						if ( y == 4  )
						{
							img.data[ to*4 +0 ] = 0x000;
							img.data[ to*4 +1 ] = 0xff*b;
							img.data[ to*4 +2 ] = 0x00;
							img.data[ to*4 +3 ] = 0xff*b;
						}
						if ( y ==5 )
						{
							img.data[ to*4 +0 ] = 0xff*b;
							img.data[ to*4 +1 ] = 0x000;
							img.data[ to*4 +2 ] = 0x00;
							img.data[ to*4 +3 ] = 0xff*b;
						}
					}
				}		
			
			}
		}
/*		for ( let i = st ; i < en ; i++ )
		{
			img.data[ i*4 +0 ] = 0x000;
			img.data[ i*4 +1 ] = 0x100;
			img.data[ i*4 +2 ] = 0x00;
			img.data[ i*4 +3 ] = 0xff;
		}
*/
	}


	//---------------------------------------------------------------------
	function	main_update( time )
	//---------------------------------------------------------------------
	{

		if ( fnt.image.height>0 && fnt.font == null )
		{
			// フォントファイルの読み込みが終わったら、ＧＬテクスチャ化して、フォント管理
			let tex = gl_createTexFromImage( fnt.image );
			fnt.font = gl_createFontFromTex( gl, tex, fnt.W,fnt.H, fnt.getUV, 256 );
		}


		pad.update();

		let p1 = pad.p1;

		if ( p1.now.LL ) jx -= 1*SW;
		if ( p1.now.LR ) jx += 1*SW;
		if ( p1.now.LU ) jy -= 1*SH;
		if ( p1.now.LD ) jy += 1*SH;
//jx = g_mouse_x;
//jy = g_mouse_y;
jx = Math.floor((g_mouse_x-0.5)*canvas_gl.width);
jy = Math.floor((g_mouse_y-0.5)*canvas_gl.height);

		let tx = 0;
		let ty = 0;

		// draw 
		//------------------------------
		function drawScene()
		//------------------------------
		{
			//------------------------------
			function stage_makeMdl( gl )
			//------------------------------
			{	// 背景黒
				let x = 0;
				let y = 0;
				let W = 90*SW;
				let H = 90*SH;
				return gl_MDL( 
					gl_createMesh( 
						gl,
						{
							drawtype	:	gl.TRIANGLE_STRIP,
							tblPos		:	new Float32Array([	x-W,y-H,0,		x+W,y-H,0,		 x-W,y+H,0,		 x+W,y+H,0,	]),
							sizePos		:	3,
							tblUv		:	null,
							tblCol		:	new Float32Array([	0,0,0,	0,0,0,	0,0,0,	0,0,0,	]),
							tblIndex	:	new Uint16Array([0,1,2,3]),
						}
					), 
					shader, 
					null 
				);
			}
			//------------------------------
			function jiki_makeMdl( gl, x, y )
			//------------------------------
			{	// 自機
				let W = 4*SW;
				let H = 4*SH;
				return gl_MDL( 
					gl_createMesh( 
						gl,
						{
							drawtype	:	gl.TRIANGLES,
							tblPos		:	new Float32Array([	x-W,y-H,0,		x,y+H,0,		 x+W,y-H,0,	]),
							sizePos		:	3,
							tblUv		:	null,
							tblCol		:	new Float32Array([	1,1,0,	0,1,0,	1,0,1,		]),
							tblIndex	:	null,
						}
					), 
					shader, 
					null 
				);
			}
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR );
gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);				//  color(RGBA) = (sourceColor * sfactor) + (destinationColor * dfactor).
			// 描画 play
			gl_cls( gl, vec3(0.2,0.2,0.3) );

			gl_drawmMdl( gl, stage_makeMdl( gl ) );				//	背景

			gl_drawmMdl( gl, jiki_makeMdl( gl, jx, -jy ) );		//	プレイヤー

			let font = fnt.font;

			if(1)
			{	// フォント表示
				fnt.font.premesh.cntVertex=0;
				//
				{
					ty = 0;
					for ( let y = 0 ; y < 16 ; y++ )
					{
						for ( let x = 0 ; x < 16 ; x++ )
						{ 
							let c = y*16+x;
							let s = String.fromCharCode(c);

							fnt.font.premesh = font_prints( fnt.font, fnt.font.premesh, tx+x*fnt.W,ty*fnt.H, s, dw,dh );

						}
						ty++;
					}
				}
				//
				gl_reloadMesh( gl, fnt.font.mesh, fnt.font.premesh, gl.DYNAMIC_DRAW  );
				let font_mdl =  gl_MDL( font.mesh, font.shader, [font.tex.hdl] );
				gl_drawmMdl( gl, font_mdl );
			}

		}

		if ( fnt.font )
		{
			drawScene()
//			bloom.renderer( drawScene, "1x1", 1.5, 0.5 );	
			// 合成・引き延ばし
			{
				const ctx = canvas_out.getContext("2d");
				ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = 0; // スムージングOFF
				ctx.clearRect(0, 0, canvas_out.width, canvas_out.height);
				ctx.drawImage(canvas_gl, 0, 0, canvas_out.width, canvas_out.height);	// canvasにはimageが継承されている
			}
		}
		{
			let dt = time-prev_time;
			tblDt.push(dt);
			sum_dt += dt;
			if ( tblDt.length >= 60 || sum_dt > 1500 ) 
			{
				let maxDt = 1;
				for ( let t of tblDt ) if ( maxDt < t ) maxDt = t;
				if ( sum_dt > 1500 )
				{
					fps = sum_dt/maxDt; 
				}
				else
				{
					fps = 1000.0/maxDt; 
				}
				let str = strfloat( fps, 2,1)+"fps("+strfloat(dt,2,2)+"ms/frame a)"+tblDt.length + ":"+strfloat(sum_dt);
				html.setById_innerHTML("html_fps", str );
				sum_dt = 0;
				tblDt = [];
			}

		}
		prev_time = time;
		window.requestAnimationFrame( main_update );
	}


	main_update(0);



}
let g_mouse_x = 0;
let g_mouse_y = 0;
//-----------------------------------------------------------------------------
var draw = function( e )
//-----------------------------------------------------------------------------
{
	if ( e.buttons==1 )
	{
	}
	    var rect = canvas_out.getBoundingClientRect();
        let px = (e.clientX - rect.left)
        let py = (e.clientY - rect.top )


function isFullScreen() {
    if ((document.fullscreenElement !== undefined && document.fullscreenElement !== null) || // HTML5 標準
        (document.mozFullScreenElement !== undefined && document.mozFullScreenElement !== null) || // Firefox
        (document.webkitFullscreenElement !== undefined && document.webkitFullscreenElement !== null) || // Chrome・Safari
        (document.webkitCurrentFullScreenElement !== undefined && document.webkitCurrentFullScreenElement !== null) || // Chrome・Safari (old)
        (document.msFullscreenElement !== undefined && document.msFullscreenElement !== null)){ // IE・Edge Legacy
        return true; // fullscreenElement に何か入ってる = フルスクリーン中
    } else {
        return false; // フルスクリーンではない or フルスクリーン非対応の環境（iOS Safari など）
    }
}
	    if (document.fullscreenElement )
		{
			let sw = window.screen.availWidth;
			let sh = window.screen.availHeight;
sw = sh*2560/1440;
		console.log(sw,sh);
	        let x= px / sw  ;
	        let y= py / sh ;
			g_mouse_x = x;
			g_mouse_y = y;
		}
		else
		{
	        let x= px / canvas_out.width  ;
	        let y= py / canvas_out.height ;
			g_mouse_x = x;
			g_mouse_y = y;
		}

//console.log( g_mouse_x, g_mouse_y, "canvas_out ", canvas_out.width, canvas_out.height , "canvas_gl ", canvas_gl.width, canvas_gl.height );

}
window.document.body.addEventListener( "mousemove", draw ) ;
//window.addEventListener( "mouseup", draw ) ;
//window.addEventListener( "mousedown", draw ) ;
//window.addEventListener( "mousemove", draw ) ;

