"use strict";

let gra = gra_create( html_canvas );
const sz=1.6;
gra.window( -sz,-sz, sz, sz );

let g_i = 0;
let g_id = -1;

let cnt = 0;
let po0 = 0;
let sp0 = 0;
let ac0 = 0;
//-----------------------------------------------------------------------------
function draw( v0,v1,v2, div, time )
//-----------------------------------------------------------------------------
{
		gra.setFontsize( 14 );

	function draw0()
	{
		gra.cls();

		let left    = Math.min(v0.x,Math.min(v1.x,v2.x));
		let right   = Math.max(v0.x,Math.max(v1.x,v2.x));
		let top     = Math.min(v0.y,Math.min(v1.y,v2.y));
		let bottom 	= Math.max(v0.y,Math.max(v1.y,v2.y));

		gra.colorv(vec3(0,0,0));
		gra.linev2( v0, v1 );
		gra.linev2( v0, v2 );
		gra.psetv2( v0, 2);
		gra.psetv2( v1, 2);
		gra.psetv2( v2, 2);
		gra.locatev( v0 );gra.print( "V0" );
		gra.locatev( v1 );gra.print( "V1" );
		gra.locatev( v2 );gra.print( "V2" );
		let py = 0;
		for ( let i = 0 ; i < div ; i++ )
		{
			let t = i/div;
			let a1 = vadd2( vscale2( vsub2( v0,v1 ), t ), v1 );
			let a2 = vadd2( vscale2( vsub2( v2,v0 ), t ), v0 );
			let c1 = vadd2( vscale2( vsub2( a2,a1 ), t ), a1 );
			let d1 = vec2( left, c1.y );
			let d2 = vec2( right, c1.y );
			let e1 = vec2( c1.x,  top );
			let e2 = vec2( c1.x,  bottom );

			if ( i == g_i ) //カーソル
			{
				gra.colorv( vec3(1,0,0) ); 
				gra.psetv2( a1, 3 );
				gra.psetv2( a2, 3 );
				gra.linev2( a1, a2 );

				gra.colorv( vec3(0,0,1) );
				gra.psetv2( c1, 5);
				py = c1.y;
				gra.linev2( d1, d2 );	// 横線
				gra.linev2( e1, e2 );	// 縦線
			}
			else
			{
				gra.colorv(vec3(0,0,0));
				gra.psetv2( a1, 1.5);
				gra.psetv2( a2, 1.5);
				gra.psetv2( c1, 1.5);
				gra.psetv2( d1, 1.5);
				gra.psetv2( e2, 1.5);
			} 

		}


		let po1 = py;

		let p = po1-po0;
		ac0 = p-sp0;
		sp0 = p;
		po0 = po1;

		gra.colorv(vec3(0,0,0));
		if ( cnt >= 0 )	{gra.locatev( vec2(0.7,-0.6-0.6) );gra.print( "　位置y:"+strfloat(  po0,3,4) );}
		if ( cnt >= 1 )	{gra.locatev( vec2(0.7,-0.7-0.6) );gra.print( "　速度y:"+strfloat(  sp0,3,4) );}
		if ( cnt >= 2 )	{gra.locatev( vec2(0.7,-0.8-0.6) );gra.print( "加速度y:"+strfloat(2*ac0,3,4) );}
		cnt++

		g_i++;
		if ( g_i >= div ) 
		{
			g_i = 0;
			cnt = 0; // 正しい加速度が求まるのに3フレーム掛かる
		}
		


		g_id = setTimeout( draw0, time/div );
	}
	po0=0;
	sp0=0;
	ac0=0;
	draw0();
	
}

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	html_onchange();
}

//-----------------------------------------------------------------------------
function html_onchange()
//-----------------------------------------------------------------------------
{

	let	x0		= html.getById_textbox( "html_x0",0 )*1;
	let	y0		= html.getById_textbox( "html_y0",0 )*1;
	let	x1		= html.getById_textbox( "html_x1",0 )*1;
	let	y1		= html.getById_textbox( "html_y1",0 )*1;
	let	x2		= html.getById_textbox( "html_x2",0 )*1;
	let	y2		= html.getById_textbox( "html_y2",0 )*1;

	let	div			= html.getById_textbox( "html_div",0 )*1;
	let	time		= html.getById_textbox( "html_time",0 )*1000;
	if ( g_id != -1 ) clearTimeout( g_id );
	draw(vec2(x0,y0),vec2(x1,y1),vec2(x2,y2),div,time);
}