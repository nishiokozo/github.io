"use strict";
//-----------------------------------------------------------------------------
function gra_create( cv )	//2021/06/01 window関数実装
//-----------------------------------------------------------------------------
{
	let gra={}
	gra.ctx=cv.getContext('2d');
	gra.x = 0;
	gra.y = 0;

	gra.sx = 0; 
	gra.sy = 0; 
	gra.ex = gra.ctx.canvas.width; 
	gra.ey = gra.ctx.canvas.height; 
	let ox = 0;
	let oy = 0;
	//-------------------------------------------------------------------------
	gra.window = function( _sx, _sy, _ex, _ey )
	//-------------------------------------------------------------------------
	{
		gra.sx = _sx;
		gra.sy = _sy;
		gra.ex = _ex;
		gra.ey = _ey;
		ox = -_sx;
		oy = -_sy;
	}

	function win_abs( x, y )
	{
		let w = gra.ex-gra.sx;
		let h = gra.ey-gra.sy;
		x = (x+ox)/w * gra.ctx.canvas.width;
		y = (y+oy)/h * gra.ctx.canvas.height;
		return [x,y];
	}
	function win_range( x, y )
	{
		let w = Math.abs(gra.ex-gra.sx);
		let h = Math.abs(gra.ey-gra.sy);
		x = (x)/w * gra.ctx.canvas.width;
		y = (y)/h * gra.ctx.canvas.height;
		return [x,y];
	}
	//-------------------------------------------------------------------------
	gra.line = function( x1, y1, x2, y2, mode="" )
	//-------------------------------------------------------------------------
	{
		function func( sx,sy, ex,ey, style =[1] )
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

		[x1,y1]=win_abs(x1,y1);
		[x2,y2]=win_abs(x2,y2);

		let style = [];
		switch( mode )
		{
			case "hasen": style = [2,4];
		}
	
		func( x1, y1, x2, y2, style );
	}
	//-------------------------------------------------------------------------
	gra.locate = function( x1, y1 )
	//-------------------------------------------------------------------------
	{
		gra.x=x1;
		gra.y=y1;
	}
	//-------------------------------------------------------------------------
	gra.print = function( str, x1=gra.x, y1=gra.y )
	//-------------------------------------------------------------------------
	{
		function func( str, tx, ty )
		{
			gra.ctx.font = "12px monospace";
			gra.ctx.fillStyle = "#000000";
			gra.ctx.fillText( str, tx+2, ty+16 );

		}

		[x1,y1]=win_abs(x1,y1);
		func( str, x1+2, y1-4 );

			gra.x = x1;
			gra.y = y1+16;
	}
	//-----------------------------------------------------------------------------
	gra.circle = function( x1,y1,r )
	//-----------------------------------------------------------------------------
	{
		let func = function( x,y,rw,rh )
		{
			gra.ctx.beginPath();
			gra.ctx.setLineDash([]);
			let rotation = 0;
			let startAngle = 0;
			let endAngle = Math.PI*2;
			gra.ctx.ellipse( x, y, rw, rh, rotation, startAngle, endAngle );
			gra.ctx.closePath();
			gra.ctx.stroke();
		};
		[x1,y1]=win_abs(x1,y1);
		let [rw,rh] = win_range(r,r);
		func( x1, y1,rw,rh );
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





//------------------------------------------------------------------------------
function vec2( x, y )	// 2021/05/28新規追加
//------------------------------------------------------------------------------
{
	return {x:x, y:y};
}
//------------------------------------------------------------------------------
function vsub2( a, b )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x - b.x,
		a.y - b.y 
	);
}
//------------------------------------------------------------------------------
function vadd2( a, b )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x + b.x,
		a.y + b.y 
	);
}
//------------------------------------------------------------------------------
function reflect2( I, N )
//------------------------------------------------------------------------------
{
	let d = 2*(I.x*N.x + I.y*N.y);
 	return vsub2( I , vec2( d*N.x, d*N.y ) );
}
//------------------------------------------------------------------------------
function vmul_scalar2( a, s )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x * s,
		a.y * s 
	);
}
//------------------------------------------------------------------------------
function vneg2( a )
//------------------------------------------------------------------------------
{
	return vec2( -a.x, -a.y );
}
//------------------------------------------------------------------------------
function dot2( a, b )
//------------------------------------------------------------------------------
{
	return a.x*b.x + a.y*b.y;
}

//------------------------------------------------------------------------------
function length2( v )	//	 as abs()
//------------------------------------------------------------------------------
{
	return Math.sqrt(v.x*v.x+v.y*v.y);
}
//------------------------------------------------------------------------------
function vcopy2( v )
//------------------------------------------------------------------------------
{
	return vec2(v.x,v.y);
}
//------------------------------------------------------------------------------
function normalize2( v )
//------------------------------------------------------------------------------
{
	if ( v.x == 0 && v.y == 0 ) return vec2(0,0);
	let s = 1/Math.sqrt( v.x*v.x + v.y*v.y );
	return vec2(
		v.x * s,
		v.y * s
	);
}

//-----------------------------------------------------------------------------
function kago_create()
//-----------------------------------------------------------------------------
{
	//-------------------------------------------------------------------------
	function ball_create( {x, y}, vel, r )
	//-------------------------------------------------------------------------
	{
		let ball={};
		
		ball.pos = {x,y};
		ball.vel = vel;
		ball.r = r;
		ball.m = 1;//r*r*Math.PI;	//	質量は面積にしておく
		
		//---------------------------------------------------------------------
		ball.update = function( ft, [sx,sy,ex,ey] )
		//---------------------------------------------------------------------
		{
			// move
			ball.pos.x += ball.vel.x * ft;
			ball.pos.y += ball.vel.y * ft;

			// collition
			let r = ball.r;

			if ( ball.pos.x < sx+r || ball.pos.x > ex-r )
			{
				ball.pos.x -=  ball.vel.x * ft;
	 			ball.vel.x = -ball.vel.x;
	 		}
			if ( ball.pos.y < sy+r || ball.pos.y > ey-r )
			{
				ball.pos.y -=  ball.vel.y * ft;
	 			ball.vel.y = -ball.vel.y;
	 		}
		}
		//---------------------------------------------------------------------
		ball.draw = function( gra )
		//---------------------------------------------------------------------
		{
			// draw
			gra.circle( ball.pos.x, ball.pos.y, ball.r );

			let v = vmul_scalar2( normalize2(ball.vel),ball.r);
			gra.line( ball.pos.x, ball.pos.y, ball.pos.x+v.x, ball.pos.y+v.y );
		}
		
		return ball;	
	}

	let kago = {};
	kago.balls=[];
	
	let s_max = 0;
	let s_min =9999999;
	//-------------------------------------------------------------------------
	kago.addBall = function( pos, vel, r )
	//-------------------------------------------------------------------------
	{
		kago.balls.push( ball_create( pos, vel, r ) )
	}
	let p0=0;
	let p1=0;
	let k0=0;
	let k1=0;
	//-------------------------------------------------------------------------
	kago.update = function( gra, ft )
	//-------------------------------------------------------------------------
	{
		let sz = 100;
		gra.window(-sz,-sz,sz,sz);
		// move
		for ( let ball of kago.balls )
		{
			ball.update( ft, [gra.sx,gra.sy,gra.ex,gra.ey] );
		}

		// collition
		let a = kago.balls[0];
		let b = kago.balls[1];

		if ( g_req == "info" )
		{
			g_req = "";
			console.log("a ",a.pos,a.vel);
			console.log("b ",b.pos,b.vel);
		}
		{
			
			let vlen = vsub2( b.pos, a.pos );
			if ( length2(vlen) < a.r+b.r )
			{
				// メモ＞
				// 時間:t(s)
				// 加速度:a(m/s^2)
				// 速度:v=at(m/s)
				// 距離:s=1/2vt(m)
				// 距離:s=1/2at^2(m)
				// 質量:m(kg)
				// 力:F=ma(N)
				// 運動エネルギー:K=Fs(J)
				// 運動エネルギー:K=1/2Fvt(J)
				// 運動エネルギー:K=1/2mv^2(J)
				// 運動量:p=mv(kgm/s)
				// 力積:I=p1-p0=∫(0～1)Fdt
				// 運動量保存則:m1v1+m2v2=m1v1'+m2v2'


				// 速度ベクトル→変換運動エネルギーベクトル
				function vel2Vk( v, m )
				{
					let V = normalize2( v );
					let k = 1/2*m*dot2( v, v );	//k=1/2mv^2
					return vmul_scalar2( V, k );
				}

				// 変換運動エネルギーベクトル→速度ベクトル
				function Vk2vel( Vk, m )
				{
					let V = normalize2( Vk );
					let k = length2(Vk);
					let v = Math.sqrt(2*k/m);	//v = sqrt(2k/m)
					return vmul_scalar2( V, v );
				}
				
				let Na = normalize2( vsub2( b.pos, a.pos ) );
				let Nb = normalize2( vsub2( a.pos, b.pos ) );
				function vinpact2( I, N ) // IをNに投影したベクトル
				{
					let d = (I.x*N.x + I.y*N.y);
				 	return vec2( d*N.x, d*N.y );
				}

				p0 = length2(vadd2(a.vel,b.vel)) 
				k0 = 1/2*a.m*dot2(a.vel,a.vel) + 1/2*b.m*dot2(b.vel,b.vel);
//			console.log("");
//			console.log("衝突前",);
				switch( g_calc )
				{
					case "v":	// 速度をそのまま運動エネルギーとした簡易モデル
						{
							let A0 = a.vel;
							let B0 = b.vel;

							//--

							// a,b:衝突後伝達運動エネルギーベクトル
							let A1 = vinpact2( A0, Na ); 
							let B1 = vinpact2( B0, Nb ); 

							// a,b:衝突後残留運動エネルギーベクトル
							let A2 = vsub2( A0, A1 );
							let B2 = vsub2( B0, B1 );

							// a,b:運動エネルギー伝達と合成
							A0 = vadd2( A2, B1 );
							B0 = vadd2( B2, A1 );

							//--

							a.vel = A0;
							b.vel = B0;
					
							// 単位時間当たりの移動
							a.pos = vadd2( a.pos, vmul_scalar2( a.vel, ft ) );
							b.pos = vadd2( b.pos, vmul_scalar2( b.vel, ft ) );
						}
						break;
					case "v^2": // 運動エネルギーに変換したモデル
						{
							// 変換：速度ベクトル→運動エネルギーベクトル

							let A0 = vel2Vk( a.vel, a.m );
							let B0 = vel2Vk( b.vel, b.m );

							//--

							// a,b:衝突後伝達運動エネルギーベクトル
							let A1 = vinpact2( A0, Na );
							let B1 = vinpact2( B0, Nb );

							// a,b:衝突後残留運動エネルギーベクトル
							let A2 = vsub2( A0, A1 );
							let B2 = vsub2( B0, B1 );

							// a,b:運動エネルギー伝達と合成
							A0 = vadd2( A2, B1 );
							B0 = vadd2( B2, A1 );

							//--

							// 変換：運動エネルギーベクトル→速度ベクトル
							a.vel = Vk2vel( A0, a.m );
							b.vel = Vk2vel( B0, b.m );


							// 単位時間当たりの移動
							a.pos = vadd2( a.pos, vmul_scalar2( a.vel, ft ) );
							b.pos = vadd2( b.pos, vmul_scalar2( b.vel, ft ) );

						}
						break;

					default:
						alert( "error:g_calc"+g_calc);
						break;
				}
				p1 = length2(vadd2(a.vel,b.vel)) 
				k1 = 1/2*a.m*dot2(a.vel,a.vel) + 1/2*b.m*dot2(b.vel,b.vel);
//			console.log("衝突後",length2(vadd2(a.vel,b.vel)) );


			}
			gra.print( "a", a.pos.x, a.pos.y ); 
			gra.print( "b", b.pos.x, b.pos.y ); 
		}


		// draw
		for ( let ball of kago.balls )
		{
			ball.draw( gra )
		}

		gra.window(0,0,html_canvas.width,html_canvas.height);
		gra.locate( 0,0 );
		gra.print( "衝突前運動量 p0 = "+ p0 );
		gra.print( "衝突後運動量 p1 = "+ p1 );
		gra.print( "衝突前運動エネルギー k0 = "+ k0 );
		gra.print( "衝突後運動エネルギー k1 = "+ k1 );


	}
	return kago;
}

let gra;
let first;
let g_reqId2;
let g_flgPause;
let g_req;
let g_calc="v^2";

//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	g_req="";
	g_flgPause = false;
	if ( g_reqId2 ) clearTimeout( g_reqId2 );				 // main呼び出しで多重化を防ぐ
	g_reqId2=null;

	gra = gra_create( html_canvas );
	first = 1;

	let kago = kago_create();
	switch(1)
	{
		case 0:
			{
				let as = 0.0;
				let bs = 120.0;
				let r = 20;
				let w = r*Math.sin(radians(45))*1;
				let ath=radians(45);
				let bth=radians(180);
				let ax = Math.cos(ath);
				let ay = Math.sin(ath);
				let bx = Math.cos(bth);
				let by = Math.sin(bth);
				kago.addBall( vec2(-30, -w)	, vmul_scalar2(vec2( ax,ay),as), r );
				kago.addBall( vec2( 30, w)	, vmul_scalar2(vec2( bx,by),bs), r );
			}
			break;
		case 1:
			{
				let as = 20+70.0;
				let bs = 20+30.0;
				let r = 20;
				let w = r*Math.sin(radians(1));
				let ath=radians(0);
				let bth=radians(180);
				let ax = Math.cos(ath);
				let ay = Math.sin(ath);
				let bx = Math.cos(bth);
				let by = Math.sin(bth);
				kago.addBall( vec2(-30, -w)	, vmul_scalar2(vec2( ax,ay),as), r );
				kago.addBall( vec2( 30, w)	, vmul_scalar2(vec2( bx,by),bs), r );
			}
			break;
		case 2:
			{
				let as = 120.0;
				let bs = 0.0;
				let r = 20;
				let ath=radians(0);
				let bth=radians(10);
				let va = vec2( Math.cos(ath), Math.sin(ath) );
				let vb = vec2( Math.cos(bth), Math.sin(bth) );
				let x = 45;
				let y = 19;
				kago.addBall( vec2(-x, -y)	, vmul_scalar2(va,as), r );
				kago.addBall( vec2( x,  y)	, vmul_scalar2(vb,bs), r );
			}
			break;
		case 3:
			{
				//a  {x: -20.007199347797517, y: 59.849547157695284} {x: 77.74312105929913, y: -76.48678580513796}
				//b  {x: -36.48478106256747, y: -37.91350508890771} {x: 38.46971493203771, y: 81.46896712616653}
				let a_pos = {x: -20.007199347797517, y: 59.849547157695284};	let a_vel = {x: 77.74312105929913, y: -76.48678580513796};
				let b_pos = {x: -36.48478106256747, y: -37.91350508890771};	let b_vel = {x: 38.46971493203771, y: 81.46896712616653};
				let r = 20;
				kago.addBall( a_pos	, a_vel, r );
				kago.addBall( b_pos	, b_vel, r );
			}
			break;
	}


	//-------------------------------------------------------------------------
	function frame_update( ft )
	//-------------------------------------------------------------------------
	{
		gra.cls();
		if ( g_flgPause ) ft = 0;
		kago.update( gra, ft  );
	
	}
	//-------------------------------------------------------------------------
	function update( time )
	//-------------------------------------------------------------------------
	{
		let ft = 1/60;
		frame_update( ft);
		g_reqId2 = setTimeout( update, ft*1000 );
	}
	update(0);
}

main();

//-----------------------------------------------------------------------------
function html_onchange( req )
//-----------------------------------------------------------------------------
{
	if ( req == "play/stop" ) 
	{
		g_flgPause = !g_flgPause;
	}
	else
	if ( req == "v^2" ) 
	{
		g_calc=req;
	}
	else
	if ( req == "v" ) 
	{
		g_calc=req;
	}
	else
	{
		g_req = req;
	}

}
