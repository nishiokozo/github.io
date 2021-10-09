"use strict";
// ばねの表示
	// メモ＞
	// 時間:t(s)
	// 質量:m(kg)
	// ばね係数:k(N/m)
	// 加速度:a(m/s^2)
	// 速度:v=at(m/s)
	// 距離:x=1/2vt(m)
	// 距離:x=1/2at^2(m)
	// 重力加速度:g=9.8(m/s^2)
	// 力:F=ma(N)
	// 力:F=-kx(N)
	// 運動量:p=mv(kgm/s=N・s)
	// 力積:I=mv'– mv
	// 力積:I=Ft(N・s)
	// エネルギー:K=mgh(J)
	// エネルギー:K=Fx(J)
	// エネルギー:K=1/2Fvt(J)
	// エネルギー:K=1/2mv^2(J)
	// 仕事:W=Fs(J,kgm/s/s)
	// 仕事:W=mg(x2-x1)
	// 仕事率:P=Fv P=W/t=Fx/t=Fv(W)
	// 運動量保存の式:m1v1+m2v2=m1v1'+m2v2'
	// 力学的エネルギー保存の式:1/2mv^2-Fx=1/2mv'^2
	// 反発係数の式:e=-(vb'-va')/(vb-va)	※ -衝突後の速度/衝突前の速度
	// 換算質量:1/μ=1/m1+1/m2, μ=,1m2/(m1+m2)
	// 重心位置:rg=(m1r1+m2r2)
	// 相対位置:r=r2-r1;
	// ばね係数:k=F/x
	// 力積=運動量の変化量
	// 速度v=rw
	// 加速度a=rω^2
	// 加速度a=v^2/r
	// 向心力F=mrω^2=mv^2/r
	// 角速度ω=2π/t	※距離÷時間
	// 角速度ω=√(a/r)
//-----------------------------------------------------------------------------
function lab_create()
//-----------------------------------------------------------------------------
{
	// 初期化
	let gra = gra_create( html_canvas );
//	let ene = ene_create( html_canvas2, 3 );

	gra.color(1,1,1);

	function calc_r( m, r0 = 10, m0 = 1 ) // 質量1の時半径10
	{
		let range = r0*r0*Math.PI / m0;	// 質量比率
		return Math.sqrt(range * m/Math.PI);
	}
	function drawdir2( x, y, r, o )
	{
		gra.circle( x, y, r);
		let x1=x+r*Math.cos(o);
		let y1=y+r*Math.sin(o);
		gra.line( x,y,x1,y1);
	}
	function drawvec2( x, y, r, v )
	{
		let V = normalize2(v);
		let o = Math.atan2( V.y, V.x );
		gra.circle( x, y, r);
		let x1=x+r*Math.cos(o);
		let y1=y+r*Math.sin(o);
		gra.line( x,y,x1,y1);
	}

	function drawdirv2( p, r, o )
	{
		gra.circle( p.x, p.y, r);
		let x1=p.x+r*Math.cos(o);
		let y1=p.y+r*Math.sin(o);
		gra.line( p.x,p.y,x1,y1);
	}
	function drawvecv2( p, r, v )
	{
		let V = normalize2(v);
		let o = Math.atan2( V.y, V.x );
		gra.circle( p.x, p.y, r);
		let x1=p.x+r*Math.cos(o);
		let y1=p.y+r*Math.sin(o);
		gra.line( p.x,p.y,x1,y1);

		gra.symbol_row( strfloat(length2(v),3,2), p.x, p.y-r-0.1, 14, "CM");
	}

	
	let lab = {}
	lab.hdlTimeout = null;
	lab.mode = '';
	lab.req = '';
	lab.flgdebug = false;
	//
	let flgPause = false;
	let flgStep;
	//
	lab.o = 0;
	let balls=[];
	lab.m = 0;
	lab.h = 0;
	lab.l = 0;
	lab.k = 0;
	lab.dt = 0;
	lab.s = 0;

	//-------------------------------------------------------------------------
	function reset()
	//-------------------------------------------------------------------------
	{
		console.log('reset:',lab.mode);
		flgStep = false;
		balls=[];
		let l = lab.l/2;
		{
			let m	= lab.am;
			let x   = lab.ax;
			let y   = lab.ay;
			let br	= calc_r(m)/60;
			balls.push({name:"a",p:vec2(  -l, 0)	,v:vec2(x,y)	 ,a:vec2(0.0,0.0),m:m	,r:br});
		}
		{
			let m	= lab.bm;
			let x   = lab.bx;
			let y   = lab.by;
			let br	= calc_r(m)/60;
			balls.push({name:"b",p:vec2( l, 0)	,v:vec2(x,y)	 ,a:vec2(0.0,0.0),m:m	,r:br});
		}
		{
			let m	= 1;//lab.m;
			let br	= calc_r(m)/60;
//			balls.push({name:"c",p:vec2(-1.8, 1.2)	,v:vec2( 1.2, 0) ,a:vec2(0.0,0.0),m:m	,r:br});

		}
		let emax = 0;
		for ( let ba of balls )
		{
			emax	+= 1/2*ba.m*dot2(ba.v,ba.v);		//	運動エネルギー
		}
//		ene.reset( emax*1 );

		g_tbl=[];
		vG=vec2(0,0);
	}
	//-------------------------------------------------------------------------
	lab.update = function()
	//-------------------------------------------------------------------------
	{
		{
			gra.backcolor(0.5,0.5,0.5);
			gra.cls();
			let cx = 0;
			let cy = 0.0;
			let sh = 2.0;
			let sw = sh*(gra.ctx.canvas.width/gra.ctx.canvas.height);
			gra.window( cx-sw,cy+sh,cx+sw,cy-sh );
			gra.setAspect(1,0);
		}

		// 入力処理
		flgStep = false;
		if ( lab.req != '' ) 
		{
			input_Laboratory( lab.req );
			lab.req ='';
		}

		update_Laboratory( lab.dt );
		gra.color(1,1,1);
		if ( flgPause ) gra.print('PAUSE');
		if ( (flgPause == false || flgStep ) ) 
		{
			//ene.drawK();
		}
		lab.hdlTimeout = setTimeout( lab.update, lab.dt*1000 );

	}
	//-------------------------------------------------------------------------
	function input_Laboratory( req )
	//-------------------------------------------------------------------------
	{
		switch( lab.req )
		{
			case 'pause': flgPause = !flgPause; break;
			case 'step': flgStep = true; break;
			case 'reset': reset(); break;
			default:console.error("error req ",lab.req );
				break;
		}
	}


	let g_st = {x:0, y:0 };
	let g_pos = {x:-0.5, y:1.5 };
	let g_tbl=[];
	let flgpendulum = false;
	let vG = vec2(0,0);
	//-------------------------------------------------------------------------
	function update_Laboratory( dt )
	//-------------------------------------------------------------------------
	{
/*
		if( g_mouse.l )
		{
			let mv = vec2((g_mouse.x-g_st.x)*gra.size_w, (g_mouse.y-g_st.y)*gra.size_h );
			g_pos = vadd2( g_pos, mv );
			gra.color(1,1,0);gra.circle( g_pos.x, g_pos.y, 0.1);
		}
*/

		g_st = vec2(g_mouse.x,g_mouse.y);
		gra.color(1,1,1);

		// 実験室
		{
			// 動的なパラメータを計算
			function ball_calc1( ba )
			{
				let p0 = ba.p0;
				let p1 = ba.p;

				let	R = vsub2(p1,p0);
				let	r = length2(R);
				let	g = lab.g;

				let	o = Math.atan2(R.y,R.x);			//	位置→角度
				let w = cross2(R,ba.v)/r/r;				//	速度→角速度
				//--
				{
					let n = lab.lp;
					let t = dt/n;
					let a = 0;
					for ( let i = 0 ; i < n ; i++ )
					{
						o	+= w*t;						// 角度			θ= vt +θ0
						a	 =-(g/r)*Math.cos(o);		// 角加速度		a = -(g/r)sinθ
						w	+= a*t;						// 角速度		w = at +v0
					}
				}

				ba.p.x = r*Math.cos(o) + p0.x;			// 角度→位置
				ba.p.y = r*Math.sin(o) + p0.y;

				ba.v.x = r*w*Math.cos(o+radians(90));	// 角速度→速度
				ba.v.y = r*w*Math.sin(o+radians(90));

			}
			function ball_calc2( ba )
			{
				ba.p = vadd2( ba.p, vmuls2( ba.v, dt ) );	// 位置
				ba.a = vec2(0,0);							// 加速度
				ba.v = vadd2( ba.v, vmuls2( ba.a, dt ) );	// 速度

			}

			if ( (flgPause == false || flgStep ) )
			{// 移動
				if ( flgpendulum )
				{
				}
				else
				{
					let b0 = balls[0];
					let b1 = balls[1];
					
					let R = vsub2( b1.p, b0.p );
					let r = length2(R);
					let o = Math.atan2( R.y, R.x );
					let m0 = b0.m/(b0.m+b1.m);
					let m1 = b1.m/(b0.m+b1.m);
					let l = lab.l-r;
					let x = l*Math.cos(o);
					let y = l*Math.sin(o);

					if ( (flgPause == false || flgStep ) )
					{// 移動
						b0.p = vadd2( b0.p, vmuls2( vec2(-x,-y), m0 ) );
						b1.p = vadd2( b1.p, vmuls2( vec2( x, y), m1 ) );
						b0.p = vadd2( b0.p, vmuls2( vG, dt ) );
						b1.p = vadd2( b1.p, vmuls2( vG, dt ) );
					}
				}
				for ( let ba of balls )
				{
					if ( flgpendulum )
					{
						ball_calc1( ba );
					}
					else
					{
						ball_calc2( ba );
					}
				}
			}

			// collition
			if ( flgpendulum )
			{
			}
			else
			{
				//collition to balls
				for ( let i = 0 ; i < balls.length ; i++ )
				for ( let j = i+1 ; j < balls.length ; j++ )
				{
					let a = balls[i];
					let b = balls[j];
					let l = length2(vsub2(a.p,b.p))-(a.r+b.r);
					if ( l < 0 )
					{
						function vinpact2( I, dir )
						{
							let N = normalize2( dir );	 
							let d = dot2( I, N );
							return vec2( N.x*d, N.y*d );
						}
						
						// 衝突ベクトル
						let a1 = vinpact2( a.v, vsub2( b.p, a.p ) );		// a -> b ベクトル
						let b1 = vinpact2( b.v, vsub2( a.p, b.p ) );		// b -> a ベクトル

						// 残留ベクトル
						let a2 = vsub2( a.v, a1 );
						let b2 = vsub2( b.v, b1 );

						// 速度交換
						// m1v1+m2v2=m1v1'+m2v2'
						// a1-b1=-v1'+v2'
						let a3 = vec2(
							(a.m*a1.x +b.m*(-a1.x+2*b1.x))/(a.m+b.m),
							(a.m*a1.y +b.m*(-a1.y+2*b1.y))/(a.m+b.m)
						);
						let b3 = vec2(
							a1.x-b1.x+a3.x,
							a1.y-b1.y+a3.y
						);

						// a,b:運動量伝達と合成
						a.v = vadd2( a2, a3 );
						b.v = vadd2( b2, b3 );

						// 埋まりを矯正
						{
							let n = normalize2( vsub2(a.p,b.p) );
							let v = vmul_scalar2(n,l);
							a.p = vsub2( a.p, v );
							b.p = vadd2( b.p, v );
						}
					}
				}
				// collition to wall
				for ( let ba of balls )
				{
					let wl = gra.sx+ba.r;
					let wr = gra.ex-ba.r;
					let wt = gra.sy-ba.r;
					let wb = gra.ey+ba.r;
//					let wb = 0+ba.r;
					let px = ba.p.x;
					let py = ba.p.y;

					if ( px < wl )
					{
						ba.p.x += (wl-px)*2;
			 			ba.v.x = -ba.v.x;

							//vG.x =  -vG.x;
			 		}
					if ( px > wr )
					{
						ba.p.x += (wr-px)*2;
			 			ba.v.x = -ba.v.x;

							//vG.x =  -vG.x;
			 		}
					if ( py > wt )
					{
						ba.p.y += (wt-py)*2;
			 			ba.v.y = -ba.v.y;

							//vG.y =  -vG.y;
			 		}
					if ( py < wb )
					{
						ba.p.y += (wb-py)*2;
			 			ba.v.y = -ba.v.y;
						{
							let M = balls[0].m + balls[1].m;
							let y = (ba.v.y*ba.m)/M;
							//vG.y -= y;
						}
			 		}
				}

				for ( let ba of balls )
				{
				}
				// collition bitween ridge balls
				{
					let b0 = balls[0];
					let b1 = balls[1];
					
					let R = vsub2( b1.p, b0.p );
					let r = length2(R);
					let o = Math.atan2( R.y, R.x );
					let N = normalize2(R);
					let T = normalize2(vrot2(R,radians(90)));
					let m0 = b0.m/(b0.m+b1.m);
					let m1 = b1.m/(b0.m+b1.m);
					let vn0 = vmuls2( N, dot2( N, b0.v ) );
					let vt0 = vmuls2( T, dot2( T, b0.v ) );
					let vn1 = vmuls2( N, dot2( N, b1.v ) );
					let vt1 = vmuls2( T, dot2( T, b1.v ) );

					if ( (flgPause == false || flgStep ) )
					{// 計算
						vG.x += (b0.v.x*b0.m +b1.v.x*b1.m)/(b0.m+b1.m);
						vG.y += (b0.v.y*b0.m +b1.v.y*b1.m)/(b0.m+b1.m);
//console.log(vG,b0.v);
						b0.v.x =  vt0.x*m1 -vt1.x*m1;
						b0.v.y =  vt0.y*m1 -vt1.y*m1;
						b1.v.x = -vt0.x*m0 +vt1.x*m0;
						b1.v.y = -vt0.y*m0 +vt1.y*m0;

					}

					{ // 速度T/N描画
						gra.color(0,0,1);
						gra.line(b0.p.x,b0.p.y, b0.p.x+vt0.x ,b0.p.y+vt0.y);
						gra.line(b0.p.x,b0.p.y, b0.p.x+vn0.x ,b0.p.y+vn0.y);
						gra.line(b1.p.x,b1.p.y, b1.p.x+vt1.x ,b1.p.y+vt1.y);
						gra.line(b1.p.x,b1.p.y, b1.p.x+vn1.x ,b1.p.y+vn1.y);
					}

					{// 速度描画
						let s = -1;
						gra.color(1,0,0);
						gra.line(b0.p.x,b0.p.y, b0.p.x-b0.v.x*s, b0.p.y-b0.v.y*s );	
						gra.line(b1.p.x,b1.p.y, b1.p.x-b1.v.x*s, b1.p.y-b1.v.y*s );	
						gra.color(1,1,1);
					}

					// 重心描画
					{
						let G = vadd2( vmuls2( vsub2(b1.p, b0.p), m1 ), b0.p );
						gra.circle(G.x,G.y,0.1/2);
						g_tbl.push({x:G.x, y:G.y});
					}

					// 方向メータ描画
				//	drawvecv2( vec2(-0.5,-0.3), 0.1, b0.v );
				//	drawvecv2( vec2( 0,-0.3), 0.1, b1.v );
				//	drawvecv2( vec2(0.5,-0.3), 0.2, vG );


				}
			}
			
		}

		if ( (flgPause == false || flgStep ) )
		{
			for ( let ba of balls )
			{
				// エネルギー登録
				//ene.prot_entry( ba.p.x, 0,ba.p.y , ba.v.x , 0, ba.v.y, ba.m );
			}
			// エネルギー計算
			//ene.calc( lab.dt, lab.g );
		}

		{
			// グラウンド
//			gra.line( gra.sx,0,gra.ex,0 );
		}


		// 描画
		for ( let ba of balls )
		{		
			gra.circle( ba.p.x, ba.p.y, ba.r );
			gra.symbol_row( ba.name, ba.p.x, ba.p.y);
		}

		// 描画紐
		if( flgpendulum )
		{
			for ( let ba of balls )
			{		
				// 描画紐振り子
				gra.line( ba.p.x, ba.p.y, ba.p0.x, ba.p0.y );
			}
		}
		else
		{
			// バー
			gra.line( balls[0].p.x, balls[0].p.y, balls[1].p.x, balls[1].p.y );

			gra.color(1,1,0);
			// 描画重心
			{
				for ( let p of g_tbl )
				{
					gra.pset( p.x,p.y );
				}
				if ( g_tbl.length > 1000 )
				{
					g_tbl.shift();
				}
				
			}

		}

		// 情報表示
		if(0)
		{
			let K=0;
			let x = 0;
			let y = 0;

			gra.locate(x,y++);
			gra.color(0,0,1);	gra.print( "ボールの位置エネルギーU=" + strfloat(ene.U	,5,7) );
			gra.color(1,0,0);	gra.print( "ボールの運動エネルギーK=" + strfloat(ene.K	,5,7) );
			gra.color(0,0,0);	gra.print( "力学的エネルギー　　　E=" + strfloat(ene.U+ene.K	,5,7) );
			gra.color(1,1,1);
			{
				let a = ene.U+ene.K;
				let b = ene.valmax;
				gra.print( "精度(計算値E/理論値E)=" + strfloat(100*a/b,4,2)	 +"%");
			}
		}

	}
	
	return lab;
}

let lab = lab_create();
//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
	// onloadになってからhtmlの設定を読み込んでからリセット
	html_onchange('reset');
	lab.update();
}

//-----------------------------------------------------------------------------
function html_onchange( cmd )
//-----------------------------------------------------------------------------
{
	// 状態切り替え
	if ( cmd == 'debug' )
	{
		// UIの描画が変わるものは個々で変えてその後読み直す
		document.getElementsByName( "html_debug" )[0].checked = !document.getElementsByName( "html_debug" )[0].checked;
	}
	else
	if ( cmd != undefined )
	{
		lab.req = cmd;
	}

	// HTMLからの設定を取得
		
	// type='checkbox'
	if ( document.getElementsByName( "html_debug" ) > 0 ) 
	{
		if ( document.getElementsByName( "html_debug" )[0] ) 
		{
			lab.flgdebug = document.getElementsByName( "html_debug" )[0].checked;
		}
	}

	// type='radio'
	if ( document.getElementsByName( "html_mode" ).length > 0 )
	{
		let list = document.getElementsByName( "html_mode" ) ;
		for ( let l of list ) if ( l.checked ) lab.mode = l.value;
	}

	// type='text'
	if ( document.getElementById( "html_dt" ) )
	{
		lab.dt = document.getElementById( "html_dt" ).value*1;
	}
	if ( document.getElementById( "html_k" ) )
	{
		lab.k = document.getElementById( "html_k" ).value*1;
	}
	if ( document.getElementById( "html_m" ) )
	{
		lab.m = document.getElementById( "html_m" ).value*1;
	}
	if ( document.getElementById( "html_h" ) )
	{
		lab.h = document.getElementById( "html_h" ).value*1;
	}
	if ( document.getElementById( "html_g" ) )
	{
		lab.g = document.getElementById( "html_g" ).value*1;
	}
	if ( document.getElementById( "html_l" ) )
	{
		lab.l = document.getElementById( "html_l" ).value*1;
	}
	if ( document.getElementById( "html_lp" ) )
	{
		lab.lp = document.getElementById( "html_lp" ).value*1;
	}
	//
	if ( document.getElementById( "html_am" ) )
	{
		lab.am = document.getElementById( "html_am" ).value*1;
	}
	if ( document.getElementById( "html_ax" ) )
	{
		lab.ax = document.getElementById( "html_ax" ).value*1;
	}
	if ( document.getElementById( "html_ay" ) )
	{
		lab.ay = document.getElementById( "html_ay" ).value*1;
	}

	if ( document.getElementById( "html_bm" ) )
	{
		lab.bm = document.getElementById( "html_bm" ).value*1;
	}
	if ( document.getElementById( "html_bx" ) )
	{
		lab.bx = document.getElementById( "html_bx" ).value*1;
	}
	if ( document.getElementById( "html_by" ) )
	{
		lab.by = document.getElementById( "html_by" ).value*1;
	}

}
// キー入力
let g_key=Array(256);
//-----------------------------------------------------------------------------
window.onkeyup = function( ev )
//-----------------------------------------------------------------------------
{
	g_key[ev.keyCode]=false;
}
//-----------------------------------------------------------------------------
window.onkeydown = function( ev )
//-----------------------------------------------------------------------------
{
	g_key[ev.keyCode]=true;
	if ( g_key[KEY_D] )		html_onchange('debug');
	if ( g_key[KEY_R] )		html_onchange('reset');
	if ( g_key[KEY_SPC] )	html_onchange('step');
	if ( g_key[KEY_P] )		html_onchange('pause')
	//;
//	if ( g_key[KEY_LEFT] )		html_onchange('shrink');
//	if ( g_key[KEY_RIGHT] )		html_onchange('streach');
//	if ( g_key[KEY_CR] )		html_onchange('release');
	//
	if ( g_key[KEY_SPC] ) return false; // falseを返すことでスペースバーでのスクロールを抑制
}

//マウス入力
let g_mouse = {x:0,y:0,l:false,r:false};
document.onmousedown = mousemovedown;
document.onmouseup = mousemoveup;
document.onmousemove = onmousemove;
//-----------------------------------------------------------------------------
function mousemoveup(e)
//-----------------------------------------------------------------------------
{
	if ( e.button==0 )	g_mouse.l=false;
	if ( e.button==2 )	g_mouse.r=false;
}
//-----------------------------------------------------------------------------
function mousemovedown(e)
//-----------------------------------------------------------------------------
{
	if ( e.button==0 )	g_mouse.l=true;
	if ( e.button==2 )	g_mouse.r=true;
}
//-----------------------------------------------------------------------------
function onmousemove(e)
//-----------------------------------------------------------------------------
{
	//test
    let rect = html_canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left)/ html_canvas.width;
    let y = (e.clientY - rect.top )/ html_canvas.height;
	g_mouse.x = x;
	g_mouse.y = y;
}
// 右クリックでのコンテキストメニューを抑制
document.addEventListener('contextmenu', contextmenu);
function contextmenu(e) 
{
  e.preventDefault();
}

