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

	//---------------------------------------------------------------------
	function	main_update( now )
	//---------------------------------------------------------------------
	{
		//------------------------------
		function drawScene()
		//------------------------------
		{
			gl_cls( gl, vec3(0,0,0) );

			const dw =2.0/tvram.width;
			const dh =2.0/tvram.height;

			font_begin( font1 );
			font_begin( font2 );

			let x = 4;
			let y = 1;
			font_print( font1, x,(y++)*12, "X1 Font8x8 "+strfloat(now,5,0), dw,dh );
			font_print( font2, x,(y++)*12, "美咲フォント12ｘ8 "+strfloat(now,5,0), dw,dh );
			y++;
			font_print( font1, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
			font_print( font2, x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
			font_print( font1, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
			font_print( font2, x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
			y++;
			font_print( font2, x,(y++)*12, "オミクロン株の新たな変異ウイルス「XBB」東京都内で初確認", dw,dh );
			font_print( font2, x,(y++)*12, "政府 米巡航ミサイル「トマホーク」購入を検討 防衛力抜本強化", dw,dh );
			font_print( font2, x,(y++)*12, "習主席 毛沢東ゆかりの地を訪問 権威さらに高めるねらいか", dw,dh );
			font_print( font2, x,(y++)*12, "汚い爆弾、ロシアの「根拠」は煙感知器だった？　スロベニアが指摘", dw,dh );
			font_print( font2, x,(y++)*12, "地震情報 2022年10月28日(金) /北日本は強雨や落雷に注意", dw,dh );
			font_print( font2, x,(y++)*12, "ポーランド外務副大臣「ロシアが完全撤退しない停戦合意では平和は続かない」", dw,dh );
			font_print( font2, x,(y++)*12, "Intel第13世代「Raptor Lake-S」が発売", dw,dh );


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
			bloom.renderer( drawScene, "none4x4", 1.5, 1.2 );
	
			// 合成・引き延ばし
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

