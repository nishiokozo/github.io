"use strict";

//-----------------------------------------------------------------------------
function gra_create( cv )
//-----------------------------------------------------------------------------
{
	let gra={}
	gra.ctx=cv.getContext('2d');
	gra.x = 0;
	gra.y = 0;
	//-----------------------------------------------------------------------------
	gra.print = function( str, tx=gra.x, ty=gra.y )
	//-----------------------------------------------------------------------------
	{
		gra.ctx.font = "12px monospace";
		gra.ctx.fillStyle = "#000000";
		gra.ctx.fillText( str, tx+2, ty );

		gra.x = tx;
		gra.y = ty+12;
	}

	//-----------------------------------------------------------------------------
	gra.circle = function( x,y,r )
	//-----------------------------------------------------------------------------
	{
		gra.ctx.beginPath();
		gra.ctx.arc( x, y, r, 0, Math.PI * 2, true );
		gra.ctx.closePath();
		gra.ctx.stroke();
	}

	// window(x1,y1,x2,y2)が欲しい
	
	//-----------------------------------------------------------------------------
	gra.line = function( sx,sy, ex,ey, style =[1] )
	//-----------------------------------------------------------------------------
	{
		gra.ctx.beginPath();
		gra.ctx.setLineDash(style);
		gra.ctx.strokeStyle = "#000000";
		gra.ctx.lineWidth = 1.0;
		gra.ctx.moveTo( sx, sy );
		gra.ctx.lineTo( ex, ey );
		gra.ctx.closePath();
		gra.ctx.stroke();
	}

	//-----------------------------------------------------------------------------
	gra.cls = function()
	//-----------------------------------------------------------------------------
	{
		gra.ctx.fillStyle = "#ffffff";
		gra.ctx.fillRect( 0, 0, gra.ctx.canvas.width, gra.ctx.canvas.height );
		gra.x=0;
		gra.y=0;
	}
	return gra;
};

let gra = gra_create( html_canvas );


let first = 1;
//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	let prev = 0;
	//-------------------------------------------------------------------------
	function update( time )
	//-------------------------------------------------------------------------
	{
		if (0)
		{
				// 描画同期
			let ft = (time-prev)/1000;
			frame_update( ft );
			prev = time;
			requestAnimationFrame( update );
		}
		else
		{
				// タイマー指定
			let ft = 1000/10;
			frame_update( ft );
			setTimeout( update, ft );
		}
	}

	let sx = 0; 
	let sy = 0; 
	let ex = html_canvas.width; 
	let ey = html_canvas.height; 
	let cx = (ex-sx)/2;
	let cy = (ey-sy)/2;
	let ox = 0;
	let oy = 0;
	//-------------------------------------------------------------------------
	function window( _sx, _sy, _ex, _ey )
	//-------------------------------------------------------------------------
	{
		sx = _sx;
		sy = _sy;
		ex = _ex;
		ey = _ey;
		ox = -_sx;
		oy = -_sy;
	}
	//-------------------------------------------------------------------------
	function win_line( x1, y1, x2, y2, mode="" )
	//-------------------------------------------------------------------------
	{
		let w = ex-sx;
		let h = ey-sy;
		x1 = (x1+ox)/w * html_canvas.width	;
		y1 = (y1+oy)/h * html_canvas.height	;
		x2 = (x2+ox)/w * html_canvas.width	;
		y2 = (y2+oy)/h * html_canvas.height	;

		let style = [];
		switch( mode )
		{
			case "hasen": style = [2,4];
		}
		
		gra.line( x1, y1, x2, y2, style );
	}
	//-------------------------------------------------------------------------
	function win_print( str, x1, y1 )
	//-------------------------------------------------------------------------
	{
		let w = ex-sx;
		let h = ey-sy;
		x1 = (x1+ox)/w * html_canvas.width	;
		y1 = (y1+oy)/h * html_canvas.height	;;
		gra.print( str, x1, y1 );
	}
	
	let deg = 50;
	let siz = 5;
	window( -siz, siz, siz, -siz );

	//-------------------------------------------------------------------------
	function frame_update( ft )
	//-------------------------------------------------------------------------
	{
		// ベクトル値計算
		deg += 1;
		if ( deg > 360 ) deg-=360;

		let ax = 3;
		let ay = 1;
		let len = Math.sqrt(ax*ax+ay*ay);
		let bx = len*Math.cos(deg/180*Math.PI);
		let by = len*Math.sin(deg/180*Math.PI);
		let cx = ax*bx - ay*by;
		let cy = ax*by + ay*bx;
		let dx = cx/len;
		let dy = cy/len;

		// draw

		gra.cls();

		// 罫線
		win_line(sx,0,ex,0);
		win_line(0,sy,0,ey);
		{
			let w = 0.15;
			for ( let x = Math.min(sx,ex) ; x <= Math.max(sx,ex) ; x++ ) win_line(x,w,x,-w);
			for ( let y = Math.min(sy,ey) ; y <= Math.max(sy,ey) ; y++ ) win_line(w,y,-w,y);
		}	

		// ベクトル
		function drawvec( x,y,str )
		{
			win_line( 0,0,x,y);
			win_line( x,0,x,y, "hasen");
			win_line( 0,y,x,y, "hasen");
			
			// 小数点以下二桁
			x = Math.round(x*100)/100;
			y = Math.round(y*100)/100;
			win_print( str+"("+x+","+y+")", x,y);
		}
		drawvec( ax, ay,"A");
		drawvec( bx, by,"B");
//		drawvec( cx, cy,"C");
		drawvec( dx, dy,"D");

			win_print( "角度:"+Math.round(deg), sx,sy-1);
	}
	update(0);
}

main();
