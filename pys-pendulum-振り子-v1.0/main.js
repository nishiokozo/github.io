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
function create_lab()
//-----------------------------------------------------------------------------
{
	// 初期化
	let gra = gra_create( html_canvas );
	let ene = ene_create( html_canvas2, 3 );

	function calc_r( m, r0 = 10, m0 = 1 ) // 質量1の時半径10
	{
		let range = r0*r0*Math.PI / m0;	// 質量比率
		return Math.sqrt(range * m/Math.PI);
	}

	
	let lab = {}
	lab.hdlTimeout = null;
	lab.mode = '';
	lab.req = '';
	lab.flgdebug = false;
	//
	let flgPause;
	let flgStep;
	let flgUpdated;
	let count;
	//
	lab.th = 0;
	let hook;
	let balls=[];
	lab.m = 0;
	lab.h = 0;
	lab.l = 0;
	lab.k = 0;
	lab.dt = 0;
	lab.s = 0;
	let min_E;
	let max_E;

	//-------------------------------------------------------------------------
	function reset()
	//-------------------------------------------------------------------------
	{
		console.log('reset:',lab.mode);
		flgStep = false;
		flgPause = false;
		count = 0;
		balls=[];
		//
	
		{
			let h	= lab.h;
			let m	= lab.m;
			let l	= lab.l;
			let r	= calc_r(m)/60;
			let p0	= vec2(0, h);
			let p1	= vec2(l ,h);
			let K	= 0;
			let U	= lab.g * m * p1.y;
			hook	= {p:p0 ,w:0.1,h:0.2}
			balls.push( {p:p1 ,v:vec2(0,0) ,r:r, m:m, K:K,U:U } );
		}

		min_E = 999999;
		max_E = 0;

		flgUpdated = true;
		calc_Laboratory(); // 静的パラメータを再計算

		let emax = 0;
		for ( let ba of balls )
		{
			emax	= Math.abs(lab.g) * ba.m * ba.p.y;
		}
		ene.reset( emax );
	}
	//-------------------------------------------------------------------------
	lab.update = function()
	//-------------------------------------------------------------------------
	{
		{
			gra.cls();
			let cx = 0;
			let cy = 1.8;//lab.h;
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

		// 実験室
		exec_Laboratory( lab.dt );

		// 静的パラメータの再計算
		calc_Laboratory();

		// 描画
		draw_Laboratory();
		if ( flgPause ) gra.print('PAUSE');


		if ( balls.length >=1 ) 
		{
			let s = balls[0].v;			//		1/2*at^2の値
			let v = vmuls2(s,2/lab.dt);	//		微分して速度を逆算出す
			
			ene.prot_pos2( 0, balls[0].p, v, balls[0].m );
		}
//		if ( balls.length >=1 ) ene.prot_pos2( 0, balls[0].p, balls[0].v, balls[0].m );
		ene.update( lab.dt, lab.g );
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

	//-------------------------------------------------------------------------
	function calc_Laboratory()
	//-------------------------------------------------------------------------
	{
		// 静的なパラメータを計算
		for ( let ba of balls )
		{
			ba.U = ba.m * Math.abs(lab.g) * ba.p.y;
		}
	}


	//-------------------------------------------------------------------------
	function exec_Laboratory( dt )
	//-------------------------------------------------------------------------
	{
		// 動的なパラメータを計算

		if ( (flgPause == false || flgStep ) )
		{
			for ( let ba of balls )
			{
				function calc_s_v( g,t,v0 )
				{	// 相対距離と最終速度を計算
					let s = 1/2*g*t*t+v0*t;
					let v = 2*(s-v0*t)/t+v0;
					return [s,v]
				}
			
if(0)
				{	// 簡易な衝突計算
					let v0 = ba.v.y;
					let [s,v]=calc_s_v(lab.g,dt,v0);

					if ( ba.p.y +s < ba.r ) 
					{
						v = -ba.v.y;
						s = 0;
					}
					ba.v.y = v;
					ba.p.y += s;
				}
else if (1)
				{	//昔のやり方
					let vg = vec2( 0, lab.g * dt);
					let v0 = vsub2( ba.p, hook.p );
					let v1 = vadd2( v0, vg );
					let v2 = vmul_scalar2( normalize2( v1 ), lab.l );
					let v3 = vsub2( v2, v0 );
					let v4 = vmul_scalar2( v3, dt );
					ba.v = vadd2( ba.v, v4 );
					ba.p = vadd2( ba.p, ba.v );
				}
else
				{
					let r = vsub2( ba.p, hook.p );
					let g = vec2(0,lab.g);
					let t = dt;
					let f = cross2( r, ba.v )>0?1:-1;		// +左回転 -右回転
					let w0 = f*length2(ba.v);				// 角初速度

					// nr=abs(r)	// 半径の単位ベクトル
					// T=abs(r)・g	// 半径の単位ベクトルnrと重力ベクトルgの内積に、が、張力Ｔベクトル
					// a=g-T		// 重力ベクトルgから張力ベクトルTを引いたものが、加速度の接線ベクトルv

					let nr = normalize2(r);				// -張力の単位ベクトル
					let T = vmuls2( nr, dot2(nr,g) );	// 張力ベクトル
					let a = vsub2(g,T);					// 加速度接線ベクトル
					let wa = f*length2(a);				// 角加速度

					// s = 1/2*wa*t*t+w0*t		等加速度運動による移動量
	
//					let s1 = 1/2*wa*t*t;
//					let s2 =  w0 * t; 
					let ws = 1/2*wa*t*t + w0*t; //角移動量
	
					// wv = (s-w0*t)*2/t+w0;		角速度

					let w = ( ( ws - w0*t )* 2/t ) + w0;	// 角速度

					ba.v = vmuls2( normalize2(a), Math.abs(w) );
					ba.p = vadd2( ba.p, vmuls2( normalize2(a), Math.abs(ws) ) );

console.log({r:r,g:g,t:t,w0:w0,nr:nr,T:T,a:a});
/*					let vr = vsub2( ba.p, hook.p );
					let vg = vec2( 0, lab.g * dt);
					let v1 = vadd2( vr, vg );
					let v2 = vmul_scalar2( normalize2( v1 ), lab.l );
					let v3 = vsub2( v2, vr );
					let v4 = vmul_scalar2( v3, dt );
					ba.v = vadd2( ba.v, v4 );
					ba.p = vadd2( ba.p, ba.v );
*/
				}
			}

//if ( count < 4 ) console.log( count, balls[0].m, lab.g, balls[0].p.y,dot2(balls[0].v,balls[0].v),Math.pow(length2(balls[0].v),2) );


			for ( let ba of balls )
			{
				ba.K = 1/2*ba.m*dot2(ba.v,ba.v);

				min_E = Math.min(ba.U+ba.K,min_E);
				max_E = Math.max(ba.U+ba.K,max_E);
			}

			flgUpdated = true;

			count++;
		}

	}

	
	//-------------------------------------------------------------------------
	function draw_Laboratory()
	//-------------------------------------------------------------------------
	{
		// navi
		function drawdir2( x, y, r, th )
		{
			gra.circle( x, y, r);
			let x1=x+r*Math.cos(lab.th);
			let y1=y+r*Math.sin(lab.th);
			gra.line( x,y,x1,y1);
		}
	//	drawdir2( -100,100,18,radians(90) );

		// draw 天井に固定されたフック
		{
			let x0 = hook.p.x-hook.w;
			let y0 = hook.p.y+hook.h;
			let y1 = hook.p.y;
			let x1 = hook.p.x+hook.w;
			gra.line( x0,y0,x0,y1 );
			gra.line( x1,y0,x1,y1 );
			gra.line( x0,y1,x1,y1 );
			gra.line( gra.sx,y0,x0,y0 );
			gra.line( gra.ex,y0,x1,y0 );
			// グラウンド
			gra.line( gra.sx,0,gra.ex,0 );
		}

		// draw ball
		gra.circle( balls[0].p.x, balls[0].p.y, balls[0].r );

		// draw bane
		{
			let p0 = hook.p;
			let p1 = balls[0].p;
			gra.setMode('no-range');
			gra.circlefill( p0.x,p0.y, 2 );
			gra.circlefill( p1.x,p1.y, 2 );
			gra.setMode('');
			gra.line2( p0, p1 );
		}
		{
		
			let fs=14;

			// 補助線:質量
			gra.setMode('no-range');
			for ( let ba of balls )
			{
				let s = 0.2;
				gra.symbol( "y="+strfloat(ba.p.y-ba.r,2,2)		+"m  "	,ba.p.x+ba.r,ba.p.y+s*0, fs,"left" );
				gra.symbol( "v="+strfloat(length2(ba.v),2,2)	+"m/s"	,ba.p.x+ba.r,ba.p.y+s*1, fs,"left" );
				gra.symbol( "m="+strfloat(ba.m,2,2)				+"Kg "	,ba.p.x+ba.r,ba.p.y+s*2, fs,"left" );

			}
			gra.setMode('');
			
		}

		// 情報表示
		{
			let K=0;
			let x = 0;
			let y = 0;

			function strFloatround( v, r=3, f=2 ) // 指数部3桁、小数部2桁
			{
				if ( v < Math.pow(10,r) )
				{
					let a = Math.pow(10,f);
					
					let b = Math.floor( v * a )/a;
				
					let s = ("            "+b.toString()).substr(-(r+f));
					return  s;
				}
				else
				{
					return  "over";
				}
			}

			gra.locate(x,y++);
			gra.color(0,0,1);
			gra.print( "ボールの位置エネルギーU=" + strfloat(ene.U	,5,2) );
			gra.color(1,0,0);
			gra.print( "ボールの運動エネルギーK=" + strfloat(ene.K	,5,2) );
			gra.color(1,0,1);
			gra.print( "力学的エネルギー　　　E=" + strfloat(ene.U+ene.K	,5,2) );
			gra.color(0,0,0);
//			gra.print( "最小～最大　　　　　　E=" + strfloat(min_E	,5,2) + " ~"  + strfloat(max_E	,5,2) );
				{
					let a = ene.U+ene.K;
					let b = ene.valmax;
					gra.print( "精度(計算値E/理論値E)=" + strfloat(100*a/b,4,2)	 +"%");
				}

//			gra.print( info_stat );
		}

	}
	
	return lab;
}

let lab = create_lab();
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

