"use strict";

let canvas_out	= window.document.getElementById( "html_canvas" );		// 出力画面
let canvas_gl	= window.document.getElementById( "html_canvas_gl" );	// g用l画面
let gl = canvas_gl.getContext( "webgl", { antialias: false } );			// gl
let FNTm = create_FNT( "k8x12_jisx0208R.png", 8,12, getUV_sjis );
let FNTx = create_FNT( "font.png", 8,8, getUV_ascii );

//let tvram = gl_createTvram( gl, gl.canvas.width, gl.canvas.height );	// テキスト画面
//let g_flgOnce = true;
//let g_flgTest = false;
let flgBloom = html.getByName_checkbox( "html_bloom", false );

//-----------------------------------------------------------------------------
window.onload = function( e )	// コンテンツがロード
//-----------------------------------------------------------------------------
{
	let bloom = bloom_create( gl );

	const dw =2.0/canvas_gl.width;
	const dh =2.0/canvas_gl.height;

	let x = 0;
	let y = 2;

	FNT_loadImagefile( FNTx );
	FNT_loadImagefile( FNTm );

	g_reqs = [REQ("(abcd)",[]),REQ("(message)",[])];
//	g_reqs = ["(message)"];

	//-----------------------------------------------------------------
	function put_message()
	//-----------------------------------------------------------------
	{
		const dw =2.0/tvram.width;
		const dh =2.0/tvram.height;
		
		let strlong = document.getElementById( "html_textarea" ).value;

		let tblStr = strlong.split("\n");


		let mdlTbl = [];

		let x = 0;
		let y = 6;
		for ( let str of tblStr )
		{
			while ( str.length > 40 )
			{
				let s1 = str.substr(0,40);
				let s2 = str.substr(40);
				FNT_print( FNTm,  x,(y  )*FNTm.H, "                                        ", dw,dh ) ;
				FNT_print( FNTm,  x,(y++)*FNTm.H, s1, dw,dh );
				str = s2;
			}
				FNT_print( FNTm,  x,(y  )*FNTm.H, "                                        ", dw,dh );
				FNT_print( FNTm,  x,(y++)*FNTm.H, str, dw,dh );
		}



	}
	gl_cls( gl, vec3(0,0,0));
	//---------------------------------------------------------------------
	function	main_update( time )
	//---------------------------------------------------------------------
	{
		//------------------------------
		function put_abcd()
		//------------------------------
		{
			let x = 0;
			let y = 2;
			FNT_print( FNTx,  x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
			FNT_print( FNTx,  x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
			FNT_print( FNTm,  x,(y++)*12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", dw,dh );
			FNT_print( FNTm,  x,(y++)*12, "abcdefghijklmnopqrstuvwxyz", dw,dh );
			y++;
		}
		//------------------------------
		function drawScene()
		//------------------------------
		{
			while( g_reqs.length )
			{
				let req = g_reqs.shift();
				switch( req.cmd )
				{
					case "(message)":		put_message();	break;
					case "(fullscreen)":	cv_execFullscreen('html_canvas');	break;
					case "(abcd)":			put_abcd();	break;
					case "(bloom)":			flgBloom = req.params[0]; break;
					default:console.log("err req:"+req.cmd, req.params );
				}
			}

			let x = 0;
			let y = 0;
			FNT_print( FNTx,  x,y, "X1 Font8x8 "+strfloat(time,5,0), dw,dh );
			y+=FNTx.H;
			FNT_print( FNTm,  x,y, "美咲フォント12ｘ8 "+strfloat(time,5,0), dw,dh );
			y+=FNTm.H;
//			gl_tvram_draw_begin( gl, tvram );
			gl_FNT_draw( gl, FNTx );
			gl_FNT_draw( gl, FNTm );
//			gl_tvram_draw_end( gl,tvram );

		}
		if ( FNT_isOK( FNTm ) && FNT_isOK( FNTx ) )
		{
			if ( flgBloom )
			{
				bloom.renderer( drawScene, "8x8", 1.0, 1.0 );
			}
			else
			{
				drawScene();
			}
	
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

let	g_reqs = [];
//-----------------------------------------------------------------
function html_request( req )
//-----------------------------------------------------------------
{
	console.log(req);
//	if ( req == "(test)" ) g_flgTest = true;
	let params = [];
	if ( req == "(bloom)" ) 
	{
		let val = html.getByName_checkbox( "html_bloom", false   );
		params.push( val );
	}
	g_reqs.push( REQ(req, params) );
}