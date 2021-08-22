"use strict";
let g=html_canvas.getContext('2d');

//-----------------------------------------------------------------------------
function rad( deg )
//-----------------------------------------------------------------------------
{
	return deg/180*Math.PI;
}

//-----------------------------------------------------------------------------
let line = function( sx,sy, ex,ey )
//-----------------------------------------------------------------------------
{
	g.beginPath();
	g.strokeStyle = "#000000";
	g.lineWidth = 1.0;
	g.moveTo( sx, sy );
	g.lineTo( ex, ey );
	g.closePath();
	g.stroke();
}

//-----------------------------------------------------------------------------
function cls()
//-----------------------------------------------------------------------------
{
	g.fillStyle = "#ffffff";
	g.fillRect( 0, 0, html_canvas.width, html_canvas.height );
}

class vec3
{
	constructor( x, y, z )
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
};

//------------------------------------------------------------------------------
function vroty( v, th )
//------------------------------------------------------------------------------
{
   	let s = Math.sin(th);
	let c = Math.cos(th);
	// c,  0, -s,
	// 0,  1,  0,
    // s,  0,  c
	let nx = v.x*c			- v.z*s;
	let ny =		 v.y;
	let nz = v.x*s			+ v.z*c;

	return new vec3( 
		v.x*c			- v.z*s	,
				v.y				,
		v.x*s			+ v.z*c	
	);
}
//------------------------------------------------------------------------------
function vrotx( v, th )
//------------------------------------------------------------------------------
{
	let s = Math.sin(th);
	let c = Math.cos(th);
	// 1,  0,  0,
	// 0,  c,  s,
	// 0, -s,  c
	let nx = v.x;
	let ny =	 v.y*c + v.z*s;
	let nz =	-v.y*s + v.z*c;

	return new vec3( nx, ny, nz );
}
//------------------------------------------------------------------------------
function vrotz( v, th )
//------------------------------------------------------------------------------
{
	let s = Math.sin(th);
	let c = Math.cos(th);
	// c,  s,  0,
	//-s,  c,  0,
	// 0,  0,  1
	let nx = v.x*c + v.y*s;
	let ny =-v.x*s + v.y*c;
	let nz = 				v.z;

	return new vec3( nx, ny, nz );
}
//------------------------------------------------------------------------------
function vscale( a, s )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x *s,
		a.y *s,
		a.z *s
	);
}
//------------------------------------------------------------------------------
function vadd( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x +b.x,
		a.y +b.y,
		a.z +b.z
	);
}

let vert = 
[
	new vec3(-1,-1,-1),
	new vec3( 1,-1,-1),
	new vec3( 1, 1,-1),
	new vec3(-1, 1,-1),

	new vec3(-1,-1,1),
	new vec3( 1,-1,1),
	new vec3( 1, 1,1),
	new vec3(-1, 1,1),

]

let edge =
[
	[0,1],
	[1,2],
	[2,3],
	[3,0],

	[4,5],
	[5,6],
	[6,7],
	[7,4],

	[0,4],
	[1,5],
	[2,6],
	[3,7],
]

let rot = rad(0);

//-----------------------------------------------------------------------------
function update_paint()
//-----------------------------------------------------------------------------
{

	cls();

	// 回転・移動
	let tmp1 = [];
	{
		for ( let v of vert )
		{
			v = vroty( v, rot );
			v = vrotx( v, -rot/2 );
			v = vrotz( v, -rot/3 );
			v = vadd( v, new vec3(0,0,8) );
			tmp1.push(v);
		}
		rot += rad(0.5);
	}

	// 投影変換
	let tmp2 = [];
	{
		let pers = rad(30);
		let nz = 1; 
		let s = nz * Math.tan( pers/2 );
		for ( let v of tmp1 )
		{

			v.x = v.x/s / (v.z+nz);
			v.y = v.y/s / (v.z+nz);

			tmp2.push(v);
		}
	}


	// 描画
	{
		let sx = html_canvas.width/2;
		let sy = html_canvas.height/2;
		for ( let e of edge )
		{
			let v = tmp2[e[0]];
			let w = tmp2[e[1]];

			let x1 = v.x*sx+sx;
			let y1 = v.y*sy+sy;
			let x2 = w.x*sx+sx;
			let y2 = w.y*sy+sy;

			line( x1, y1,x2, y2 );
		}
	}

	requestAnimationFrame( update_paint );
}

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{

	requestAnimationFrame( update_paint );
}

