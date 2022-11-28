"use strict";

let canvas_out	= window.document.getElementById( "html_canvas" );		// 出力画面
let canvas_gl	= window.document.getElementById( "html_canvas_gl" );	// g用l画面
let gl = canvas_gl.getContext( "webgl", { antialias: false } );			// gl

let fontdata1 = { font:null, filename:"font.bmp", W:8, H:8, getUV:getUV_ascii };
let fontdata2 = { font:null, filename:"k8x12_jisx0208R.png", W:8, H:12, getUV:getUV_sjis };
fontdata1.image = cv_requestLoadImagefile( fontdata1.filename );
fontdata2.image = cv_requestLoadImagefile( fontdata2.filename );

let tvram = gl_createTvram( gl, gl.canvas.width, gl.canvas.height );	// テキスト画面

//-----------------------------------------------------------------------------
window.onload = function( e )	// コンテンツがロード
//-----------------------------------------------------------------------------
{
	let bloom = bloom_create( gl );

	const dw =2.0/canvas_gl.width;
	const dh =2.0/canvas_gl.height;

	let x = 0;
	let y = 2;
	
	let flgFirst = false;
	//---------------------------------------------------------------------
	function	main_update( now )
	//---------------------------------------------------------------------
	{
		//------------------------------
		function drawScene()
		//------------------------------
		{
			let mdlTbl = [];

			let x = 0;
			let y = 0;
			fontdata1.font.premesh.cntVertex=0;
			fontdata2.font.premesh.cntVertex=0;
			mdlTbl.push( gl_font_prints( gl,fontdata1.font, x,y, "SHARP X1 Font8x8 "+strfloat(now,5,0), dw,dh ));
			y+=fontdata1.H;
			mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,y, "美咲フォント12ｘ8 "+strfloat(now,5,0), dw,dh ) );
			y+=fontdata2.H;
			y++;

			tvram_draw_begin( tvram );
			for ( let mdl of mdlTbl )
			{
				gl_drawmMdl( gl, mdl );
			}
			tvram_draw_end( tvram );

			if ( flgFirst == false )
			{
				flgFirst = true;
				let x = 0;
				let y = 2;
				fontdata1.font.premesh.cntVertex=0;
				fontdata2.font.premesh.cntVertex=0;
				mdlTbl.push( gl_font_prints( gl,fontdata1.font, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh ) );
				mdlTbl.push( gl_font_prints( gl,fontdata1.font, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh ) );
				mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh ) );
				mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh ) );
				y++;

				tvram_draw_begin( tvram );
				for ( let mdl of mdlTbl )
				{
					gl_drawmMdl( gl, mdl );
				}
				tvram_draw_end( tvram );
			}

		}

		if ( fontdata1.image.height>0 && fontdata1.font == null )
		{
			// フォントファイルの読み込みが終わったら、ＧＬテクスチャ化して、フォント管理
			let tex = gl_createTexFromImage( fontdata1.image );
			fontdata1.font = font_createPremeshFromTex( gl, tex, fontdata1.W,fontdata1.H, fontdata1.getUV, 2048 );
		}
		if ( fontdata2.image.height>0 && fontdata2.font == null )
		{
			// フォントファイルの読み込みが終わったら、ＧＬテクスチャ化して、フォント管理
			let tex = gl_createTexFromImage( fontdata2.image );
			fontdata2.font = font_createPremeshFromTex( gl, tex, fontdata2.W,fontdata2.H, fontdata2.getUV, 2048 );
			html_setMessage();
		}

		if ( fontdata1.font )
		if ( fontdata2.font )
		{
//			drawScene()
			bloom.renderer( drawScene, "8x8", 1.0, 1.0 );
	
			// 合成・引き延ばし
			{
				const ctx = canvas_out.getContext("2d");
				ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = 0; // スムージングOFF
				ctx.clearRect(0, 0, canvas_out.width, canvas_out.height);
				ctx.drawImage(canvas_gl, 0, 0, canvas_out.width, canvas_out.height);	// canvasにはimageが継承されている
			}
		}

		window.requestAnimationFrame( main_update );
	}

	main_update(0);

}

//-----------------------------------------------------------------
function html_setMessage()
//-----------------------------------------------------------------
{

	const dw =2.0/tvram.width;
	const dh =2.0/tvram.height;
	
	let strlong = document.getElementById( "html_textarea" ).value;

	let tblStr = strlong.split("\n");


	let mdlTbl = [];
	
				fontdata2.font.premesh.cntVertex=0;
	let x = 0;
	let y = 7;
	for ( let str of tblStr )
	{
		while ( str.length > 40 )
		{
			let s1 = str.substr(0,40);
			let s2 = str.substr(40);
			mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y  )*fontdata2.H, "                                        ", dw,dh ) );
			mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y++)*fontdata2.H, s1, dw,dh ) );
			str = s2;
		}
			mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y  )*fontdata2.H, "                                        ", dw,dh ) );
			mdlTbl.push( gl_font_prints( gl,fontdata2.font, x,(y++)*fontdata2.H, str, dw,dh ) );
	}

	tvram_draw_begin( tvram );
	for ( let mdl of mdlTbl )
	{
		gl_drawmMdl( gl, mdl );
	}
	tvram_draw_end( tvram );


}

/*
//-----------------------------------------------------------------
function html_setFullscreen()
//-----------------------------------------------------------------
{
	let cv = window.document.getElementById( "html_canvas" );

	let req = 
		cv.requestFullScreen ||			//for chrome/edge/opera/firefox
		cv.webkitRequestFullscreen ||	//for chrome/edge/opera
		cv.webkitRequestFullScreen ||	//for chrome/edge/opera
		cv.mozRequestFullScreen ||		//for firefox
		cv.msRequestFullscreen;			//for IE

    if( req ) 
    {
		function callback()
		{
			if ( window.document.fullscreenElement ||	window.document.webkitFullscreenElement )
			{
				// 入るとき
				let W1 = window.outerWidth;		//モニタ画面サイズ
				let H1 = window.outerHeight;	
				//let W1 = window.screen.width;		//スクリーンサイズ
				//let H1 = window.screen.height;	
				let W0 = original_width;			//canvas初期設定サイズ
				let H0 = original_height;		
				let w = W0;
				let h = H0;
				while( w<W1-W0 && h <H1-H0 )		//整数倍で最も大きくとれるサイズを求める
				{
					w += W0;
					h += H0;
				}
				cv.width = w;
				cv.height = h;
			}
			else
			{
				// 戻るとき
				cv.width = original_width;
				cv.height = original_height;
			}
		}
		window.document.addEventListener("fullscreenchange", callback, false);			// for firefox
		window.document.addEventListener("webkitfullscreenchange", callback, false);	// for chrome/edge/opera
		req.apply( cv );
    }
    else
    {
		alert("このブラウザはフルスクリーンに対応していません");
    }
}
*/