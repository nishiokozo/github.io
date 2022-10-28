"use strict";

let canvas_out	= document.getElementById( "html_canvas" );				// 出力画面
let canvas_gl	= document.getElementById( "html_canvas_gl" );			// g用l画面
let gl = canvas_gl.getContext( "webgl", { antialias: false } );			// gl
let font1 = gl_createFont_ascii( "font.bmp", 8, 8 );					// X1フォント ascii配列
let font2 = gl_createFont_sjis( "k8x12_jisx0208R.png", 8, 12 )			// 美咲フォント sjis配列
let tvram = gl_createTvram( gl, gl.canvas.width, gl.canvas.height );	// テキスト画面

//-----------------------------------------------------------------------------
window.onload = function( e )	// コンテンツがロード
//-----------------------------------------------------------------------------
{
	let bloom = bloom_create( gl );

	const dw =2.0/tvram.width;
	const dh =2.0/tvram.height;

	font_begin( font1 );
	font_begin( font2 );
	let x = 0;
	let y = 2;
	font_print( font1, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
	font_print( font2, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
	font_print( font1, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
	font_print( font2, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
	y++;
	font_end( font2 );
	font_end( font1 );

	tvram_draw_begin( tvram );
	gl_drawmShader( gl, font1.mesh, font1.shader, [font1.hdlTexture], null );
	gl_drawmShader( gl, font2.mesh, font2.shader, [font2.hdlTexture], null );
	tvram_draw_end( tvram );

	html_setMessage();

	//---------------------------------------------------------------------
	function	main_update( now )
	//---------------------------------------------------------------------
	{
		//------------------------------
		function drawScene()
		//------------------------------
		{


			font_begin( font1 );
			font_begin( font2 );

			let x = 0;
			let y = 0;
			font_print( font1, x,(y++)*12, "X1 Font8x8 "+strfloat(now,5,0), dw,dh );
			font_print( font2, x,(y++)*12, "美咲フォント12ｘ8 "+strfloat(now,5,0), dw,dh );
			y++;

			font_end( font2 );
			font_end( font1 );


			tvram_draw_begin( tvram );
			gl_drawmShader( gl, font1.mesh, font1.shader, [font1.hdlTexture], null );
			gl_drawmShader( gl, font2.mesh, font2.shader, [font2.hdlTexture], null );
			tvram_draw_end( tvram );

		}

		if ( font1.loaded  )
		if ( font2.loaded  )
		{
			drawScene()
			//bloom.renderer( drawScene, "4x4", 1.5, 1.2 );
	
			// 合成・引き延ばし
			{
				const ctx = canvas_gl.getContext("webgl");
				ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = 0; // スムージングOFF
			}
			{
				const ctx = canvas_out.getContext("2d");
				ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = 0; // スムージングOFF
				ctx.clearRect(0, 0, canvas_out.width, canvas_out.height);
				ctx.drawImage(canvas_gl, 0, 0, canvas_out.width, canvas_out.height);	// canvasにはimageが継承されている

			}
//			document.getElementById( "html_now" ).innerHTML = Math.floor(now);
		}

		window.requestAnimationFrame( main_update );
	}

	main_update(0);



}

//-----------------------------------------------------------------
function html_setFullscreen()
//-----------------------------------------------------------------
{
	const obj = document.querySelector("#html_canvas"); 

	if( document.fullscreenEnabled )
	{
		obj.requestFullscreen.call(obj);
	}
	else
	{
		alert("フルスクリーンに対応していません");
	}
}
//-----------------------------------------------------------------
function html_setMessage()
//-----------------------------------------------------------------
{

	const dw =2.0/tvram.width;
	const dh =2.0/tvram.height;
	
	let strlong = document.getElementById( "html_textarea" ).value;

	let tblStr = strlong.split("\n");


	font_begin( font2 );
	let x = 0;
	let y = 7;
	for ( let str of tblStr )
	{
		while ( str.length > 40 )
		{
			let s1 = str.substr(0,40);
			let s2 = str.substr(40);
			font_print( font2, x,(y)*12, "                                        ", dw,dh );
			font_print( font2, x,(y++)*12, s1, dw,dh );
			str = s2;
		}
			font_print( font2, x,(y)*12, "                                        ", dw,dh );
			font_print( font2, x,(y++)*12, str, dw,dh );
	}

	font_end( font2 );

	tvram_draw_begin( tvram );
	gl_drawmShader( gl, font1.mesh, font1.shader, [font1.hdlTexture], null );
	gl_drawmShader( gl, font2.mesh, font2.shader, [font2.hdlTexture], null );
	tvram_draw_end( tvram );

}
