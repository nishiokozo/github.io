"use strict";

let gra = gra_create( html_canvas );
gra.window( -2,-2,2,2 );

//-----------------------------------------------------------------------------
function draw( n )
//-----------------------------------------------------------------------------
{
	gra.cls();
	
	html.setById_textarea( "html_textarea", "" );

	let step = 360.0/n;

	let x0,y0=-1;
	let deg = 0;
	let cnt = 0;
	while(  Math.abs(deg) < 360 )
	{
		let a = html.getById_textarea( "html_textarea" );
		html.setById_textarea( "html_textarea", a+(cnt+1)+")"+deg+"\n" );
	
		let x = Math.cos( radians(deg) );
		let y = Math.sin( radians(deg) );

		if ( cnt > 0 )gra.line(x0,y0,x,y);
		x0 = x;
		y0 = y;
		deg+=step;
		cnt++;
	}
	gra.line(x0,y0,1,0);

		let a = html.getById_textarea( "html_textarea" );
		html.setById_textarea( "html_textarea", a+deg+"\n" );
	
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

	let	val = html.getById_textbox( "html_n",0 );
	draw(val);
}