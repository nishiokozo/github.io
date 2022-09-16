"use strict";

let canvas3d = document.getElementById( "html_canvas" );
let canvas2d = document.getElementById( "html_canvas2" );
let canvasOut = document.getElementById( "html_canvas3" );



//-----------------------------------------------------------------------------
function html_error( str )
//-----------------------------------------------------------------------------
{
	document.getElementById("html_error").innerHTML = str;
}

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	let peri = pad_create();
	let ey = 2;
	let edit_cam = cam_create( vec3(  0, ey, 12 ), vec3( 0, ey ,0 ), 28, 1.0,1000.0  );
	let play_cam = cam_create( vec3( -12, ey, 0 ), vec3( 0, ey ,0 ), 28, 1.0,1000.0  );
	let gra3d = gra3d_create( canvas3d );
	let gra = gra_create( canvas2d );

   	let C0 =  vec3(0.32,0.32,0.32);
   	let C1 =  vec3(0.32,0.32,0.90) ;
   	let C2 =  vec3(0.90,0.32,0.32) ;
   	let C3 =  vec3(0.90,0.32,0.90) ;
   	let C4 =  vec3(0.32,0.90,0.32) ;
   	let C5 =  vec3(0.32,0.72,0.72);
   	let C6 =  vec3(0.9,0.9,0.0) ;
   	let C7 =  vec3(1,1,1);

	let g_flgStop = false;
	//---------------------------------------------------------------------
	function	update_paint( now )
	//---------------------------------------------------------------------
	{
		gra.backcolor([1,0,0]);
		gra.cls();

		// ビュー計算
		peri.setCont(13,2);

		let pad = peri.getinfo( 0.01 );

	   	document.getElementById("html_padinfo").innerHTML		= "pad:undefined";
		 if (pad.inf != undefined )
		 {	
		   	document.getElementById("html_padinfo").innerHTML		= pad.inf.id;

			if(0) // pad キーリスト表示
			{
				let y = 1;
				for ( let i = 0 ; i < pad.inf.buttons.length ; i++ )
				{
					let b = pad.inf.buttons[i];
					gra.symbol( i+":"+b.pressed+","+b.value , 4,16*(y++), 16 , "LT", 0 );
				}
				for ( let i = 0 ; i < pad.inf.axes.length ; i++ )
				{
					gra.symbol( "a"+i+":"+pad.inf.axes[i] , 4,16*(y++), 16 , "LT", 0 );
				}
			}
			//return;
		}
	const cx = gra.ctx.canvas.width/2;
	const cy = gra.ctx.canvas.height/2;
	const W = gra.ctx.canvas.width;
	const H = gra.ctx.canvas.height;
	let cr = 8;
		if(0)
		{
			// pad データひょうじ
			let y= 1;
			let x =414
					gra.symbol( "lu>"+pad.now.LU, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "ld>"+pad.now.LD, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "lr>"+pad.now.LR, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "ll>"+pad.now.LL, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "lx>"+pad.now.LX, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "ly>"+pad.now.LY, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "l1>"+pad.now.L1, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "l2>"+pad.now.L2, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "l3>"+pad.now.L3, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "ru>"+pad.now.RU, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "rd>"+pad.now.RD, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "rr>"+pad.now.RR, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "rl>"+pad.now.RL, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "rx>"+pad.now.RX, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "ry>"+pad.now.RY, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "r1>"+pad.now.R1, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "r2>"+pad.now.R2, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "r3>"+pad.now.R3, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "se>"+pad.now.SE, x,16*(y++), 16 , "LT", 0 );
					gra.symbol( "st>"+pad.now.ST, x,16*(y++), 16 , "LT", 0 );

	
		}

{
			let a = 220;
			let b = 160;
			{
				if ( pad.now.LU ) gra.circlefill(cx-a   ,cy+b-20,cr);else gra.circle(cx-a   ,cy+b-20,cr);
				if ( pad.now.LD ) gra.circlefill(cx-a   ,cy+b+20,cr);else gra.circle(cx-a   ,cy+b+20,cr);
				if ( pad.now.LR ) gra.circlefill(cx-a+20,cy+b   ,cr);else gra.circle(cx-a+20,cy+b   ,cr);
				if ( pad.now.LL ) gra.circlefill(cx-a-20,cy+b   ,cr);else gra.circle(cx-a-20,cy+b   ,cr);
				if ( pad.now.SE ) gra.circlefill(cx-a+60,cy+b	,cr);else gra.circle(cx-a+60,cy+b   ,cr);
				if ( pad.now.L1 ) gra.circlefill(cx-a-40,cy+b-40,cr);else gra.circle(cx-a-40,cy+b-40,cr);
			}
			{
				if ( pad.now.RU ) gra.circlefill(cx+a   ,cy+b-20,cr);else gra.circle(cx+a   ,cy+b-20,cr);
				if ( pad.now.RD ) gra.circlefill(cx+a   ,cy+b+20,cr);else gra.circle(cx+a   ,cy+b+20,cr);
				if ( pad.now.RR ) gra.circlefill(cx+a+20,cy+b   ,cr);else gra.circle(cx+a+20,cy+b   ,cr);
				if ( pad.now.RL ) gra.circlefill(cx+a-20,cy+b   ,cr);else gra.circle(cx+a-20,cy+b   ,cr);
				if ( pad.now.ST ) gra.circlefill(cx+a-60,cy+b	,cr);else gra.circle(cx+a-60,cy+b     ,cr);
				if ( pad.now.R1 ) gra.circlefill(cx+a+40,cy+b-40,cr);else gra.circle(cx+a+40,cy+b-40,cr);
			}
}

{
	const ar = gra.ctx.canvas.height/2-16;
		gra.circlev2( vec2(cx,cy), ar );
		{
			let s = cr*2;
			gra.linev2( vec2(cx-s  ,cy+0.5), vec2(cx+s  ,cy+0.5) );
			gra.linev2( vec2(cx+0.5,cy-s  ), vec2(cx+0.5,cy+s  ) );
		}

	let aL2 = pad.now.L2;
	let aLX = pad.now.LX;
	let aLY = pad.now.LY;
	let aR2 = pad.now.R2;
	let aRX = pad.now.RX;
	let aRY = pad.now.RY;

	function foo( x0, y0 )
	{
		let x = x0*ar+cx;
		let y = y0*ar+cy;
		return vec2(x,y);
	}
	function foo_circle( x0, y0 )
	{
		{

		}

		let th = Math.atan2(y0,x0);
		let ln = Math.sqrt(x0*x0+y0*y0);
		let ax = Math.cos(th);
		let ay = Math.sin(th);
		ln*=Math.max(Math.abs(ay),Math.abs(ax));;
		let x = ln*ax*ar+cx;
		let y = ln*ay*ar+cy;
		return vec2(x,y);
	}
	{
		let x = (aLX+pad.prev.LX)/2.0;
		let y = (aLY+pad.prev.LY)/2.0;
		let p  = foo( aLX, aLY );
		let pp  = foo( pad.prev.LX, pad.prev.LY );
		let pc  = foo_circle( aLX, aLY );
//		let p = foo( x,y );
		gra.colorv(C2);
//		gra.circlefillv2( pp,  5 );
		gra.colorv(C5);
//		gra.circlefillv2( pc,  5 );
		gra.colorv(C0);
		gra.circlefillv2( p,  cr );
	}
	{
		let x = aRX*ar+cx;
		let y = aRY*ar+cy;
		gra.circlefillv2( vec2(x,y), cr );
	}
	{
		let rx = cx+W/2*0.9;
		let lx = cx-W/2*0.9;
		let ry = -aR2*H+H;
		let ly = -aL2*H+H;
		gra.circlefillv2( vec2(rx,ry), cr );
		gra.circlefillv2( vec2(lx,ly), cr );
	}
	gra.symbol( ""+strfloat(aL2*100,3,1)+"%",  cx-W*0.45	,0, 16 , "CT", 0 );
	gra.symbol( ""+strfloat(aLX*100,4,1)+"%",  cx-W*0.3		,0, 16 , "CT", 0 );
	gra.symbol( ""+strfloat(aLY*100,4,1)+"%",  cx-W*0.3		,16, 16 , "CT", 0 );

	gra.symbol( ""+strfloat(aR2*100,4,1)+"%",  cx+W*0.45	,0, 16 , "CT", 0 );
	gra.symbol( ""+strfloat(aRX*100,4,1)+"%",  cx+W*0.3		,0, 16 , "CT", 0 );
	gra.symbol( ""+strfloat(aRY*100,4,1)+"%",  cx+W*0.3		,16, 16 , "CT", 0 );
//	gra.symbol( ""+strfloat(aR2*100,3,1)+"%", 600-16,0, 16 , "LT", 0 );
//	gra.symbol( ""+strfloat(aRX*100,3,1)+"%",   100	,0, 16 , "LT", 0 );
//	gra.symbol( ""+strfloat(aRY*100,3,1)+"%",   200	,0, 16 , "LT", 0 );
}

		// キャンバス2D 
		//gra.symbol( ""+now, 320,0,  16, "LT", 0 );

		// 合成
		{
			const ctx = canvasOut.getContext("2d");
			ctx.clearRect(0, 0, canvasOut.width, canvasOut.height);
			ctx.drawImage(canvas3d, 0, 0, canvasOut.width, canvasOut.height);
			ctx.drawImage(canvas2d, 0, 0, canvasOut.width, canvasOut.height);
		}
		if( g_flgStop == false  ) window.requestAnimationFrame( update_paint );
	}


	update_paint(0);



}



