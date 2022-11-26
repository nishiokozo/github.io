"use strict";

let canvas_out	= window.document.getElementById( "html_canvas" );		// 出力画面
const ctx = canvas_out.getContext("2d");


let g_bufA=[];

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

			let r = 0;
			let g = 0;
			let b = 0;
			if ( v == 1 ) {r = 1;g = 1;b = 1;} 
			if ( v == 2 ) {r = 0;g = 0;b = 0;} 

			if ( v > 0 )
			{
				gra.pset_rgb( x, y, [r,g,b]);
			}
		}
	}
}

//-----------------------------------------------------------------------------
function update_paint()
//-----------------------------------------------------------------------------
{

	function drawCanvas( canvas, buf, str=null )
	{
		// 画面作成
		let gra = retrogra_create( ctx, g_reso_W, g_reso_H );

		// 画面クリア
		gra.cls();

		// 画面描画
		draw_buf( gra, buf );

		// 画面をキャンバスへ転送
		gra.streach();

		// canvasのID表示
		if ( str == null ) str = canvas.id;
	}

	//--

	drawCanvas( html_canvas, g_bufA, "" );


	window.requestAnimationFrame( update_paint );

}

let g_reso_W;	
let g_reso_H;	
//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	g_reso_H =  document.getElementById( "html_reso" ).value * 1.0;
	g_reso_W = g_reso_H*(html_canvas.width/html_canvas.height);

	g_bufA = Array( g_reso_H*g_reso_W).fill(0);

	window.requestAnimationFrame( update_paint );

}

// HTML制御
//-----------------------------------------------------------------------------
function html_updateSize()
//-----------------------------------------------------------------------------
{
	g_reso_H =  document.getElementById( "html_reso" ).value * 1.0;
	g_reso_W = g_reso_H*(html_canvas.width/html_canvas.height);
	update_paint();
}
//-----------------------------------------------------------------------------
function html_updateReset()
//-----------------------------------------------------------------------------
{
}
//-----------------------------------------------------------------------------
function html_getValue_radioname( name ) // ラジオボタン用
//-----------------------------------------------------------------------------
{

	let list = document.getElementsByName( name ); // listを得るときに使うのが name
	for ( let l of list ) 
	{
		if ( l.checked ) return l.value;	
	}
	return undefined;
}


//-----------------------------------------------------------------------------
function putdot( ex, ey )
//-----------------------------------------------------------------------------
{	
    let rect = html_canvas.getBoundingClientRect();

    let x= Math.floor((ex - rect.left) / html_canvas.width  * g_reso_W);
    let y= Math.floor((ey - rect.top ) / html_canvas.height * g_reso_H);


	if ( x >= 0 && x < g_reso_W && y >= 0 && y < g_reso_H )
	{
		g_bufA[ g_reso_W*y+x ] = 1;
	}

}

let g_prevButtons = 0;
//-----------------------------------------------------------------------------
function mousemovedown(e)
//-----------------------------------------------------------------------------
{
	
	if ( e.buttons==1 )
	{
	    let rect = html_canvas.getBoundingClientRect();

		putdot( e.clientX, e.clientY );

	}

	g_prevButtons = e.buttons;
}

//-----------------------------------------------------------------------------
function touchstart(event) 
//-----------------------------------------------------------------------------
{
	let touch = event.changedTouches[0];
	putdot( touch.clientX, touch.clientY );
}

//-----------------------------------------------------------------------------
function touchmove(event) 
//-----------------------------------------------------------------------------
{
	event.preventDefault(); // タッチによる画面スクロールを止める

	let touch = event.changedTouches[0];
	putdot( touch.clientX, touch.clientY );


}

//-----------------------------------------------------------------------------
function touchend(event) 
//-----------------------------------------------------------------------------
{
}
html_canvas.addEventListener('mousedown', mousemovedown, false );
html_canvas.addEventListener('mousemove', mousemovedown, false );
html_canvas.addEventListener('touchstart', touchstart, false );
html_canvas.addEventListener('touchmove', touchmove, false );
html_canvas.addEventListener('touchend', touchend, false ); 
