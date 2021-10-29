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
	let ene = ene_create( html_canvas2 );

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
	lab.debug_d = false;
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

	let wall_sz = 1.1;
	let walls = 
	[
		{st:vec2(-wall_sz,-wall_sz), en:vec2(-wall_sz,wall_sz) },	// 左の壁
		{st:vec2(-wall_sz, wall_sz), en:vec2( wall_sz, wall_sz) },	// 上の壁
		{en:vec2(-wall_sz,-wall_sz), st:vec2( wall_sz,-wall_sz) },	// 下の壁
		{en:vec2( wall_sz,-wall_sz), st:vec2( wall_sz,wall_sz) },	// 右の壁
	];

	let cntreset = 0;
	//-------------------------------------------------------------------------
	function reset()
	//-------------------------------------------------------------------------
	{
		console.log('reset:',++cntreset);

		flgStep = false;
		balls=[];
		let l = lab.l/2;
		let o = lab.o;
		let px  = l*Math.cos(o);
		let py  = l*Math.sin(o);
		{
			let m	= lab.am;
			let v	= lab.av;
			let x   = v*Math.cos(lab.ao) +lab.v;
			let y   = v*Math.sin(lab.ao);
			let br	= calc_r(m)/60;
			balls.push({to:1, name:"a",p:vec2( -px+lab.x,-py)	,v:vec2(x,y)	 ,a:vec2(0.0,0.0),m:m	,r:br,	next_p:vec2(0,0)});
		}
		{
			let m	= lab.bm;
			let v	= lab.bv;
			let x   = v*Math.cos(lab.bo) +lab.v;
			let y   = v*Math.sin(lab.bo);
			let br	= calc_r(m)/60;
			balls.push({to:0, name:"b",p:vec2( px+lab.x,py)	,v:vec2(x,y)	 ,a:vec2(0.0,0.0),m:m	,r:br,	next_p:vec2(0,0)});
		}
		if(0)
		{
			let m	= lab.cm;
			let v	= lab.cv;
			let h	= lab.ch;
			let br	= calc_r(m)/60;
			balls.push({to:-1, name:"c",p:vec2(1.5, h)	,v:vec2( v, 0) ,a:vec2(0.0,0.0),m:m	,r:br,	next_p:vec2(0,0)});

		}

		{// エネルギー計算初期化
			let emax = 0;
			for ( let ba of balls )
			{
				emax	+= 1/2*ba.m*dot2(ba.v,ba.v);		//	運動エネルギー
			}
			ene.reset( emax*1,2 );
			for ( let ba of balls )
			{
				// エネルギー登録
//				ene.prot_entry( ba.p.x, 0,ba.p.y , ba.v.x , 0, ba.v.y, ba.m );
				ene.prot_entry2( ba.name, ba.p.x, 0,ba.p.y , ba.v.x , 0, ba.v.y, ba.m );
			}
			// エネルギー計算
			ene.calc( lab.dt, lab.g );
		}

		g_tbl=[];
		vG=vec2(0,0);
		g_pvc = [];
		g_line = [];
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
		if ( !(flgPause == false || flgStep ) ) {gra.locate(30,0);gra.print('PAUSE');}
		if ( (flgPause == false || flgStep ) ) 
		{
			ene.drawK();
		}
		let dt = lab.dt*1000;
		if ( dt < 0.01 ) dt = 0.01;

		lab.hdlTimeout = setTimeout( lab.update, dt );

	}
	//-------------------------------------------------------------------------
	function input_Laboratory( req )
	//-------------------------------------------------------------------------
	{
		switch( lab.req )
		{
			case 'pause': flgPause = !flgPause; break;
			case 'step': {flgPause = true;flgStep = true;} break;
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
	let g_pvc = [];
	let g_line = [];

	
	//-------------------------------------------------------------------------
	function update_Laboratory( dt )
	//-------------------------------------------------------------------------
	{

		gra.color(1,1,1);



		// 実験室
		if ( (flgPause == false || flgStep ) )
		{

			// 移動計算
			if ( (flgPause == false || flgStep ) )
			{// 移動
				function ball_calc2( ba )
				{
					ba.p = vadd2( ba.p, vmuls2( ba.v, dt ) );		// 位置
					ba.a = vec2(0,0);								// 加速度
					ba.v = vadd2( ba.v, vmuls2( ba.a, dt ) );		// 速度
					ba.next_p = vadd2( ba.p, vmuls2( ba.v, dt ) );	// 次の位置・衝突判定用

				}
				for ( let ba of balls )
				{
					ball_calc2( ba );
				}
			}

			// collition ボール同士
			if(0)
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

						// 運動量mv交換
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
			}


			{	// collition ボール to 壁
				for ( let ba of balls )
				{
					let P = ba.next_p;
					for ( let w of walls )
					{
						let Sw = w.st;							// 壁の開始
						let Ew = w.en;							// 壁の終了
						let Vw = normalize2( vsub2(Ew,Sw) );	// 壁ベクトル
						let W = vec2(Vw.y,-Vw.x);				// 壁法線ベクトル
						let dw = dot2( vsub2( P, Sw ), W );	// 壁との距離 dw=(P-S)・N
						if ( dw >= ba.r )
						{// 壁の内
						}
						else
						{// 壁の外（壁に衝突）
							g_pvc=[];

							if ( ba.to >= 0 )
							{
								let b0 = ba;
								let b1 = balls[ba.to];

								let foo1 = function()
								{
									let R = normalize2(vsub2( b1.p, b0.p ));	// 軸法線
									let V = normalize2(b1.v);
									let d = dot2(V,R)*dot2(V,W)*Math.sign(cross2(R,V));	// d=cosθ, d=1.0:0°～0.0:90°
									let o = Math.acos(d);
									let Nv = normalize2(vrot2(V,o));
									let Tn = vec2(Nv.y,-Nv.x);
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,W)	, r:0,g:0,b:0, name:"W"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,Nv)	, r:0,g:0,b:0, name:"N"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,R)	, r:0,g:0,b:0, name:"R"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,Tn)	, r:0,g:0,b:0, name:"T"	, pt:""} );
									return Nv;
								}
								let foo2 = function()
								{
									let R = normalize2(vsub2( b1.p, b0.p ));	// 軸法線
									let V = normalize2(b1.v);
									let sn = -(cross2(R,V)>0?1:-1); // 右か左かを判定
									let d = dot2(V,R)*dot2(R,W)*sn;	// d=cosθ, d=1.0:0°～0.0:90°
									let o = Math.acos(d);
									let Nv = normalize2(vrot2(V,o));
									let Tn = vec2(Nv.y,-Nv.x);
				/*
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,W)	, r:0,g:0,b:0, name:"W"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,Nv)	, r:0,g:0,b:0, name:"N"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,R)	, r:0,g:0,b:0, name:"R"	, pt:""} );
									g_pvc.push({p:vcopy2(b1.p)	, q:vadd2(b1.p,Tn)	, r:0,g:0,b:0, name:"T"	, pt:""} );
				*/
									return Nv;
								}
								{
									let mv = 0;
									for ( let ba of balls )
									{
										mv += ba.m * length2(ba.v);
									}
					//				console.log( "1 MV=",mv );
								}
								if ( lab.debug_h ) lab.req = 'pause';


								let c0 = {r:0 ,g:0 ,b:0};
								let c1 = {r:0 ,g:.4,b:1};
								let c3 = {r:.9,g:.5,b:0};
								let c4 = {r:0 ,g:1 ,b:0};
								let c5 = {r:0 ,g:.9,b:0.9};
								let c6 = {r:.9,g:.9,b:0};
								let c7 = {r:1,g:1,b:1};
								
								let mode = 'v5';

 								if ( mode == 'v5' )
 								{//v5 ②重心系モデルとして球２つと連結軸を１つの物体と考え、壁との衝突の２体問題として求める。
									//③バネモデルで近似する。
/*									let L = vsub2( b0.p, b1.p );
									let T = vec2( N.y, -N.x );
									let v = reflect2( I0, W );
									let n0 = vmuls2( N, dot2( v, N ) );
									let t0 = vmuls2( T, dot2( v, T ) );

									let n1 = vmuls2( N, dot2( I1, N ) );
									let t1 = vmuls2( T, dot2( I1, T ) );

									let n2 = vmuls2( n0, 1.0/b1.m*b0.m );
									let n3 = vmuls2( n1, 1.0/b0.m*b1.m );
									let O0 = vadd2( t0, n3 );
									let O1 = vadd2( t1, n2 );
*/
									let I0 = vmuls2( vcopy2( b0.v ), b0.m );
									let I1 = vmuls2( vcopy2( b1.v ), b1.m );

									let P0 = vcopy2(b0.p);
									let P1 = vcopy2(b1.p);
									let m0 = b0.m/(b0.m+b1.m);
									let m1 = b1.m/(b0.m+b1.m);
									let G = vadd2( vmuls2( vsub2(P1, P0), m1 ), P0 );
									
									let R = vadd2( vsub2(P0,G) , vmuls2( W, -b0.r ));
									let r = length2(R);
									let Q = vadd2(G,R);
									
									g_pvc.push({type:"(dot)"	,	p:Q	, r:0.03	, c:c5, name:""	, pt:""} );
									g_pvc.push({type:"(dot)"	,	p:G	, r:0.03	, c:c5, name:""	, pt:""} );
									g_pvc.push({type:"(circle)"	,	p:G	, r:r		, c:c5, name:""	, pt:""} );
									g_pvc.push({type:"(line)"	,	p:G , q:Q		, c:c5, name:""	, pt:""} );

									let I = vadd2(I0,I1);
									g_pvc.push({o:G	, p:vec2(0,0)	, q:I	, c:c4, name:"I"	, pt:""} );
									g_pvc.push({o:Q	, p:vec2(0,0)	, q:I	, c:c4, name:"I'"	, pt:""} );
									let v = reflect2( I, W );
									g_pvc.push({o:Q	, p:vec2(0,0)	, q:v	, c:c3, name:"v"	, pt:""} );
									g_pvc.push({o:Q, p:I			, q: v	, c:c0, name:""	, pt:"hasen1"} );

									let N = normalize2(vsub2( Q, G ));
									let T = vec2( N.y, -N.x );
									let n = vmuls2( N, dot2( v, N ) );
									let t = vmuls2( T, dot2( v, T ) );
									g_pvc.push({o:Q, p:vec2(0,0)	, q:t	, c:c6, name:"t"	, pt:""} );
									g_pvc.push({o:Q, p:vec2(0,0)	, q:n	, c:c1, name:"n"	, pt:""} );

//									g_pvc.push({o:Q, p:vec2(0,0)	, q:W	, c:c3, name:"W"	, pt:""} );

									b0.v = vmuls2(n,0.5);
									b1.v = vmuls2(n,0.5);
									b0.v = vadd2( b0.v,vmuls2(t,0.5 ) );
									b1.v = vadd2( b0.v,vmuls2(t,-0.5) );

//									let r = 1;

//									g_pvc.push({p:G, r:0.03					, c:c7, name:"(dot)"	, pt:""} );
//									g_pvc.push({p:G, r:r					, c:c5, name:"(circle)"	, pt:""} );
									

/*
									g_pvc.push({o:P0, p:vec2(0,0)	, q:I0	, c:c5, name:"I0"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q: v	, c:c3, name:"v"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q:t0	, c:c6, name:"t0"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q:n0	, c:c1, name:"n0"	, pt:""} );
									g_pvc.push({o:P0, p:v			, q:n0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P0, p:v			, q:t0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P1, p:vec2(0,0)	, q:vneg2(t0)	, c:c6, name:"-t0"	, pt:""} );
*/
//									g_pvc.push({o:P1, p:vec2(0,0)	, q:I1	, c:c5, name:"I1"	, pt:""} );

/*
									g_pvc.push({o:P0, p:vec2(0,0)	, q: v	, c:c3, name:"v"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q:n0	, c:c1, name:"n0"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q:t0	, c:c6, name:"t0"	, pt:""} );
									g_pvc.push({o:P0, p:v			, q:n0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P0, p:t0		, q: v	, c:c0, name:""	, pt:"hasen1"} );

									g_pvc.push({o:P1, p:t1		, q:I1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P1, p:vec2(0,0)	, q:t1	, c:c6, name:"t1"	, pt:""} );
									g_pvc.push({o:P1, p:vec2(0,0)	, q:n1	, c:c1, name:"n1"	, pt:""} );
									g_pvc.push({o:P1, p:I1		, q:n1	, c:c0, name:""	, pt:"hasen1"} );

									g_pvc.push({o:P0, p:vec2(0,0)	, q:O0	, c:c4, name:"O0"	, pt:""} );
									g_pvc.push({o:P1, p:vec2(0,0)	, q:O1	, c:c4, name:"O1"	, pt:""} );
									g_pvc.push({o:P1, p:vec2(0,0)	, q:n2	, c:c1, name:"n2"	, pt:""} );
									g_pvc.push({o:P0, p:vec2(0,0)	, q:n3	, c:c1, name:"n3"	, pt:""} );

									g_pvc.push({o:P0, p:n3		, q:O0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P0, p:t0		, q:O0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P1, p:t1		, q:O1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:P1, p:n2		, q:O1	, c:c0, name:""	, pt:"hasen1"} );

*/
									console.log( "I0+I1=",length2(I0)+length2(I1));
//									console.log( "O0+O1=",length2(O0)+length2(O1));

//									b0.v = vcopy2(O0);
//									b1.v = vcopy2(O1);
 								}
 								if ( mode == 'v4' )
 								{//v4 2球の衝突モデル
									let N = normalize2(vsub2( b0.p, b1.p ));
									let T = vec2( N.y, -N.x );
									let I0 = vmuls2( vcopy2( b0.v ), b0.m );
									let v = reflect2( I0, W );
									let n0 = vmuls2( N, dot2( v, N ) );
									let t0 = vmuls2( T, dot2( v, T ) );

									let I1 = vmuls2( vcopy2( b1.v ), b1.m );
									let n1 = vmuls2( N, dot2( I1, N ) );
									let t1 = vmuls2( T, dot2( I1, T ) );

									let n2 = vmuls2( n0, 1.0/b1.m*b0.m );
									let n3 = vmuls2( n1, 1.0/b0.m*b1.m );
									let O0 = vadd2( t0, n3 );
									let O1 = vadd2( t1, n2 );

									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:I0	, c:c5, name:"I0"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q: v	, c:c3, name:"v"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:n0	, c:c1, name:"n0"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:t0	, c:c6, name:"t0"	, pt:""} );
									g_pvc.push({o:b0.p, p:v			, q:n0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:t0		, q: v	, c:c0, name:""	, pt:"hasen1"} );

									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:I1	, c:c5, name:"I1"	, pt:""} );
									g_pvc.push({o:b1.p, p:t1		, q:I1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:t1	, c:c6, name:"t1"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:n1	, c:c1, name:"n1"	, pt:""} );
									g_pvc.push({o:b1.p, p:I1		, q:n1	, c:c0, name:""	, pt:"hasen1"} );
//									g_pvc.push({o:b1.p, p:I1		, q:t1	, c:c0, name:""	, pt:"hasen1"} );

									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:O0	, c:c4, name:"O0"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:O1	, c:c4, name:"O1"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:n2	, c:c1, name:"n2"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:n3	, c:c1, name:"n3"	, pt:""} );

									g_pvc.push({o:b0.p, p:n3		, q:O0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:t0		, q:O0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:t1		, q:O1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:n2		, q:O1	, c:c0, name:""	, pt:"hasen1"} );
//console.log( length2(n0), length2(n3), b0.m,b1.m, b0.name,b1.name );
									console.log( "I0+I1=",length2(I0)+length2(I1));
									console.log( "O0+O1=",length2(O0)+length2(O1));

									b0.v = vcopy2(O0);
									b1.v = vcopy2(O1);
 								} 

 								if ( mode == 'v3' )
								{//v3
									let M = (b0.m+b1.m);
									let N = normalize2(vsub2( b0.p, b1.p ));
									let T = vec2( N.y, -N.x );
									let I0 = vmuls2( vcopy2( b0.v ), b0.m );
									let I1 = vmuls2( vcopy2( b1.v ), b1.m );

									let t1 = vmuls2( T, dot2( I1, T ) );
									let nx = vsub2( I1, t1 );
									let I2 = vadd2( I0, nx );

									let v = reflect2( I2, W );
									let t0 = vmuls2( T, dot2( v, T ) );

									let nv = vsub2( v, t0 );
//									let nn  = vmuls2( nv, 0.5);
									let n0  = vmuls2( nv, b0.m/M);
									let n1  = vmuls2( nv, b1.m/M);

									if(1)
									{	//①運動量保存則から軸上の運動量を求める。
										// t0^2+n0^2 + t1^2+n1^2 = I0^2 +I1^2
										// n0^2 + n1^2 = I0^2 +I1^2 -(t0^2 + t1^2)

										// |t0+n0|+|t1+n1| = |I0| + |I1|
										// |t0|+|n0|+|t1|+|n1| = |I0| + |I1|
										
										// |I0| + |I1| = |O0| + |O1|
										// |I0| + |I1| = |t0+n0| + |t1+n1|
										// I0^2 + I1^2 = (t0+n0)^2 + (t1+n1)^2
										// I0^2 + I1^2 = (t0+n0)^2 + (t1+n1)^2
										// I0^2 + I1^2 = (t0^2+2t0n0+n0^2) + (t1^2+2t1n1+n1^2)
										// I0^2 + I1^2 = (t0^2+2t0 n0+n0^2) + (t1^2+2t1n1+n1^2)

										// |I0| + |I1| = |t0| + |n0| + |t1|+|n1|
										// I0^2 + I1^2 = t0^2 + n0^2 + t1^2 + n1^2
										// I0^2 + I1^2 - (t0^2 + t1^2) =  n0^2 + n1^2

										let u0 = length2(t0);
										let u1 = length2(t1);
										let i0 = length2(I0);
										let i1 = length2(I1);
										let n = Math.sqrt( Math.abs( i0*i0 + i1*i1 - (u0*u0 + u1*u1) ))/2;
										n0 = vmuls2( N, -n*b0.m/M );
										n1 = vmuls2( N, -n*b1.m/M );

{
	let a = length2(t0);
	let b = length2(t1);
	let c = length2(I0)+length2(I1);
	//  x=       √(a^4     -2a^2b^2   -2a^2c^2   +b^4     -2b^2c^2     +c^4    )/2c
	let x=Math.sqrt(a*a*a*a -2*a*a*b*b -2*a*a*c*c +b*b*b*b -2*b*b*2*c*c +c*c*c*c)/2/c;
console.log(a,b,c,x);
console.log(a*a*a*a -2*a*a*b*b -2*a*a*c*c +b*b*b*b - 2*b*b*2*c*c + c*c*c*c);
	n0 = vmuls2( N, x );
	n1 = vmuls2( N, x );
}

									}
									let O0 = vadd2( n0, t0 );
									let O1 = vadd2( n1, t1 );

									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:I0	, c:c5, name:"I0"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:I2	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:I0		, q:I2	, c:c3, name:"nx"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q: v	, c:c3, name:"v"	, pt:""} );
									g_pvc.push({o:b0.p, p:I2		, q: v	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:nv	, c:c3, name:"nv"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:n0	, c:c1, name:"n0"	, pt:""} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:t0	, c:c6, name:"t0"	, pt:""} );
									g_pvc.push({o:b0.p, p:t0		, q: v	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:vec2(0,0)	, q:O0	, c:c4, name:"O0"	, pt:""} );
									g_pvc.push({o:b0.p, p:n0		, q:O0	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b0.p, p:nv		, q: v	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:nx		, q:I1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:nx		, q:I1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:t1		, q:I1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:I1	, c:c5, name:"I1"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:nx	, c:c3, name:"nx"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:t1	, c:c6, name:"t1"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:n1	, c:c1, name:"n1"	, pt:""} );
									g_pvc.push({o:b1.p, p:vec2(0,0)	, q:O1	, c:c4, name:"O1"	, pt:""} );
									g_pvc.push({o:b1.p, p:n1		, q:O1	, c:c0, name:""	, pt:"hasen1"} );
									g_pvc.push({o:b1.p, p:t1		, q:O1	, c:c0, name:""	, pt:"hasen1"} );

									g_pvc.push({o:vec2(0,0.2), p:vec2(0,0) , q:vec2(0,0)	, c:c0, name:"|I0|+|I1|="+strfloat((length2(I0)+length2(I1)),2,2)	, pt:""} );
									g_pvc.push({o:vec2(0,0.1), p:vec2(0,0) , q:vec2(0,0)	, c:c0, name:"|O0|+|O1|="+strfloat((length2(O0)+length2(O1)),2,2)	, pt:""} );
									console.log( "I0+I1=",length2(I0)+length2(I1));
//									console.log( "t0,t1=",length2(t0),length2(t1));
//									console.log( "t0+t1=",length2(vadd2(t0,t1)));
									console.log( "O0+O1=",length2(O0)+length2(O1));
									
									b0.v = O0;
									b1.v = O1;
								}
								{
									let mv = 0;
									for ( let ba of balls )
									{
										mv += ba.m * length2(ba.v);
									}
//									console.log( "2 MV=",mv );
								}


							}
						}

					}
				}
			}
			
			if(0)
			{	// 距離拘束
				let b0 = balls[0];
				let b1 = balls[1];
				
				let R = vsub2( b1.p, b0.p );
				let r = length2(R);
				let o = Math.atan2( R.y, R.x );
				let N = normalize2(R);
				let T = normalize2(vrot2(R,radians(90)));
				let m0 = b0.m/(b0.m+b1.m);
				let m1 = b1.m/(b0.m+b1.m);
				let n0 = vmuls2( N, dot2( N, b0.v ) );
				let t0 = vmuls2( T, dot2( T, b0.v ) );
				let n1 = vmuls2( N, dot2( N, b1.v ) );
				let t1 = vmuls2( T, dot2( T, b1.v ) );


				let d = length2(R)-lab.l;
//			if ( (flgPause == false || flgStep ) ) console.log(R,d, lab.l,length2(R),r);
				let s = 0.25;
				b0.v.x += d*N.x*m1;
				b0.v.y += d*N.y*m1;
				b1.v.x -= d*N.x*m0;
				b1.v.y -= d*N.y*m0;
				b0.p.x += d*N.x*m1*s;
				b0.p.y += d*N.y*m1*s;
				b1.p.x -= d*N.x*m0*s;
				b1.p.y -= d*N.y*m0*s;
			}
			else
			{
				
			}

			if(0) // 慣性系
			{// collition bitween ridge balls
				let b0 = balls[0];
				let b1 = balls[1];

				let p0 = b0.p;
				let v0 = b0.v;
				let p1 = b1.p;
				let v1 = b1.v;
				let N0 = normalize2(vsub2( b1.p, b0.p ));
				let N1 = normalize2(vsub2( b0.p, b1.p ));
				{
					// 衝突ベクトル
					let n0 = vmuls2( N0, dot2( b0.v, N0 ) );		// b0 -> b1 ベクトル
					let n1 = vmuls2( N1, dot2( b1.v, N1 ) );		//  b1 -> b0 ベクトル

					// 残留ベクトル
					let t0 = vsub2( b0.v, n0 );
					let t1 = vsub2( b1.v, n1 );

					//g_line.push({p:vcopy2(p0), q:vadd2(p0,n0), r:0,g:1,b:0, name:""	, pt:""} );
					//g_line.push({p:vcopy2(p0), q:vadd2(p0,t0), r:0,g:1,b:0, name:""	, pt:""} );
					//g_line.push({p:vcopy2(p1), q:vadd2(p1,n1), r:0,g:1,b:0, name:""	, pt:""} );
					//g_line.push({p:vcopy2(p1), q:vadd2(p1,t1), r:0,g:1,b:0, name:""	, pt:""} );

//b0.v = t0;
//b1.v = n0;

					let l = length2(vsub2(b0.p,b1.p))-(b0.r+b1.r);
if(0)
					if ( l < 0 )
					{
						

						// 運動量mv交換
						// m1v1+m2v2=m1v1'+m2v2'
						// n0-n1=-v1'+v2'
						let v0 = vec2(
							(b0.m*n0.x +b1.m*(-n0.x+2*n1.x))/(b0.m+b1.m),
							(b0.m*n0.y +b1.m*(-n0.y+2*n1.y))/(b0.m+b1.m)
						);
						let v1 = vec2(
							n0.x-n1.x+v0.x,
							n0.y-n1.y+v0.y
						);

						// b0,b1:運動量伝達と合成
						b0.v = vadd2( t0, v0 );
						b1.v = vadd2( t1, v1 );

						// 埋まりを矯正
						{
							let n = normalize2( vsub2(b0.p,b1.p) );
							let v = vmul_scalar2(n,l);
							b0.p = vsub2( b0.p, v );
							b1.p = vadd2( b1.p, v );
						}
					}
				}
				

			}
			else
			if(1) // 重心系回転
			{// collition bitween ridge balls
				let b0 = balls[0];
				let b1 = balls[1];
				
				let R = vsub2( b1.p, b0.p );
				let r = length2(R);
				let o = Math.atan2( R.y, R.x );
				let N = normalize2(R);
				let T = normalize2(vrot2(R,radians(90)));
				let m0 = b0.m/(b0.m+b1.m);
				let m1 = b1.m/(b0.m+b1.m);
				let n0 = vmuls2( N, dot2( N, b0.v ) );
				let t0 = vmuls2( T, dot2( T, b0.v ) );
				let n1 = vmuls2( N, dot2( N, b1.v ) );
				let t1 = vmuls2( T, dot2( T, b1.v ) );

				if ( (flgPause == false || flgStep ) )
				{// 計算

					// 重心運動
					let gx = (b0.v.x*b0.m +b1.v.x*b1.m)/(b0.m+b1.m) ;
					let gy = (b0.v.y*b0.m +b1.v.y*b1.m)/(b0.m+b1.m);

					// 重心系での運動
					let x0 =  t0.x*m1 -t1.x*m1;
					let y0 =  t0.y*m1 -t1.y*m1;
					let x1 = -t0.x*m0 +t1.x*m0;
					let y1 = -t0.y*m0 +t1.y*m0;

{
					let nx0 =  n0.x*m1 -n1.x*m1;
					let ny0 =  n0.y*m1 -n1.y*m1;
					let nx1 = -n0.x*m0 +n1.x*m0;
					let ny1 = -n0.y*m0 +n1.y*m0;
//console.log("n0n1",length2(n0), length2(n1) );	// エネルギー損失
}

					// 相対移動+重心運動
					b0.v.x = x0 +gx;
					b0.v.y = y0 +gy;
					b1.v.x = x1 +gx;
					b1.v.y = y1 +gy;

if(lab.req=='pause')
			{
				let mv = 0;
				for ( let ba of balls )
				{
					mv += ba.m * length2(ba.v);
				}
//				console.log( "3 MV=",mv );
			}
				}
			}


			{
				let b0 = balls[0];
				let b1 = balls[1];
				
				let m0 = b0.m/(b0.m+b1.m);
				let m1 = b1.m/(b0.m+b1.m);

				// 重心記憶
				if ( (flgPause == false || flgStep ) )
				{
					let G = vadd2( vmuls2( vsub2(b1.p, b0.p), m1 ), b0.p );
					g_tbl.push({x:G.x, y:G.y});
					if ( g_tbl.length > 2000 ) g_tbl.shift();
				}

			}


		}


		/// 描画


		{//壁描画
			for ( let w of walls )
			{
				gra.line( w.st.x,w.st.y, w.en.x,w.en.y );
			}
		}
		
		{//剛体描画

			// バー描画
			gra.line( balls[0].p.x, balls[0].p.y, balls[1].p.x, balls[1].p.y );

			// ボール描画
			for ( let ba of balls )
			{		
				gra.circle( ba.p.x, ba.p.y, ba.r );
				gra.symbol_row( ba.name, ba.p.x, ba.p.y);
			}

if(0)
			{
				let b0 = balls[0];
				let b1 = balls[1];
				let m0 = b0.m/(b0.m+b1.m);
				let m1 = b1.m/(b0.m+b1.m);
				let G = vadd2( vmuls2( vsub2(b1.p, b0.p), m1 ), b0.p );
				gra.circlefill(G.x,G.y,0.025);
			}
		}
		
		if ( lab.debug_d ) 
		{
			g_line = [];
			{//運動量ベクトル表示
				function line_drawVec( p, v, R )
				{
					let n = vmuls2(R,dot2(R,v));
					let t = vsub2( v, n );

					g_line.push({o:p,	p:vec2(0,0), q:v, r:1,g:0,b:0, name:""	, pt:""} );
					g_line.push({o:p	,p:vec2(0,0), q:n, r:0,g:0,b:1, name:""	, pt:""} );
					g_line.push({o:p	,p:vec2(0,0), q:t, r:0,g:0,b:1, name:""	, pt:""} );
					g_line.push({o:p	,p:v		, q:n, r:0,g:0,b:0, name:""	, pt:"hasen1"} );
					g_line.push({o:p	,p:v		, q:t, r:0,g:0,b:0, name:""	, pt:"hasen1"} );

				}

				let b0 = balls[0];
				let b1 = balls[1];
				
				let R = normalize2(vsub2( b1.p, b0.p ));	//	重心系空間ベクトル
				let W = vec2(1,0);							//	慣性系空間ベクトル

				line_drawVec(b1.p,b1.v, W );
				line_drawVec(b0.p,b0.v, W );



			}
			for ( let a of g_line )
			{
				gra.color(a.r,a.g,a.b);
				gra.pattern(a.pt);
				let x0 = a.p.x * lab.scale + a.o.x;
				let y0 = a.p.y * lab.scale + a.o.y;
				let x1 = a.q.x * lab.scale + a.o.x;
				let y1 = a.q.y * lab.scale + a.o.y;

				gra.line( x0,y0,x1,y1 );
				gra.symbol_row( a.name, x1,y1 );

			}
			gra.color(1,1,1);
			gra.pattern("");
		}



		if ( lab.debug_g ) 
		{
			gra.color(1,1,1);


			// 描画重心
			if ( g_tbl.length > 0 )
			{
				gra.circle(g_tbl[g_tbl.length-1].x, g_tbl[g_tbl.length-1].y,0.1/3);
				gra.color(1,1,0);
				for ( let p of g_tbl )
				{
					gra.pset( p.x,p.y );
				}
				gra.color(1,1,1);
			}
		}



		if ( lab.debug_f )
		{
			for ( let a of g_pvc )
			{
				gra.rgb(a.c);
				gra.pattern(a.pt);
				if ( a.type =='(dot)'  )
				{
					gra.circlefill(a.p.x,a.p.y,a.r);
				}
				else
				if ( a.type =='(circle)' )
				{
					gra.circle(a.p.x,a.p.y,a.r);
				}
				else
				if ( a.type=='(line)' )
				{

					let x0 = a.p.x ;
					let y0 = a.p.y ;
					let x1 = a.q.x ;
					let y1 = a.q.y ;

					gra.line( x0,y0,x1,y1 );
					gra.symbol_row( a.name, x1,y1 );
				}
				else	// 相対座標
				{
					let x0 = a.p.x * lab.scale + a.o.x;
					let y0 = a.p.y * lab.scale + a.o.y;
					let x1 = a.q.x * lab.scale + a.o.x;
					let y1 = a.q.y * lab.scale + a.o.y;

					gra.line( x0,y0,x1,y1 );
					gra.symbol_row( a.name, x1,y1 );
				}

			}
			gra.color(1,1,1);
			gra.pattern("");
			
		}

		if ( (flgPause == false || flgStep ) )
		{
			for ( let ba of balls )
			{
				// エネルギー登録
				ene.prot_entry2( ba.name, ba.p.x, 0,ba.p.y , ba.v.x , 0, ba.v.y, ba.m );
			}
			// エネルギー計算
			ene.calc( lab.dt, lab.g );
		}



		// 情報表示
		if(1)
		{
					
					for ( let k of ene.tbl_k )
					{
						gra.color(1,1,1);	gra.print( "K"+k.name+"=" + strfloat(k.val	,2,7) );
					}
					gra.color(1,1,1);	gra.print( "K =" + strfloat(ene.K	,2,7) );
					
		}
		else
		if ( lab.debug_d ) 
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
	if ( cmd != undefined )
	{
		lab.req = cmd;
	}

	// HTMLからの設定を取得

	// type='checkbox'
	if ( document.getElementsByName( "html_debug_d" ).length > 0 ) 
	{
		if ( document.getElementsByName( "html_debug_d" )[0] ) 
		{
			lab.debug_d = document.getElementsByName( "html_debug_d" )[0].checked;
		}
	}
	if ( document.getElementsByName( "html_debug_g" ).length > 0 ) 
	{
		if ( document.getElementsByName( "html_debug_g" )[0] ) 
		{
			lab.debug_g = document.getElementsByName( "html_debug_g" )[0].checked;
		}
	}
	if ( document.getElementsByName( "html_debug_h" ).length > 0 ) 
	{
		if ( document.getElementsByName( "html_debug_h" )[0] ) 
		{
			lab.debug_h = document.getElementsByName( "html_debug_h" )[0].checked;
		}
	}
	if ( document.getElementsByName( "html_debug_f" ).length > 0 ) 
	{
		if ( document.getElementsByName( "html_debug_f" )[0] ) 
		{
			lab.debug_f = document.getElementsByName( "html_debug_f" )[0].checked;
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
	if ( document.getElementById( "html_x" ) )
	{
		lab.x = document.getElementById( "html_x" ).value*1;
	}
	if ( document.getElementById( "html_v" ) )
	{
		lab.v = document.getElementById( "html_v" ).value*1;
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
	if ( document.getElementById( "html_aF" ) )
	{
		lab.aF = document.getElementById( "html_aF" ).value*1;
	}
	if ( document.getElementById( "html_av" ) )
	{
		lab.av = document.getElementById( "html_av" ).value*1;
	}
	if ( document.getElementById( "html_ao" ) )
	{
		lab.ao = document.getElementById( "html_ao" ).value*1;
		lab.ao = radians(lab.ao);
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
	if ( document.getElementById( "html_bv" ) )
	{
		lab.bv = document.getElementById( "html_bv" ).value*1;
	}
	if ( document.getElementById( "html_bo" ) )
	{
		lab.bo = document.getElementById( "html_bo" ).value*1;
		lab.bo = radians(lab.bo);
	}

	if ( document.getElementById( "html_cm" ) )
	{
		lab.cm = document.getElementById( "html_cm" ).value*1;
	}
	if ( document.getElementById( "html_cv" ) )
	{
		lab.cv = document.getElementById( "html_cv" ).value*1;
	}
	if ( document.getElementById( "html_ch" ) )
	{
		lab.ch = document.getElementById( "html_ch" ).value*1;
	}
	if ( document.getElementById( "html_o" ) )
	{
		lab.o = document.getElementById( "html_o" ).value*1;
		lab.o = radians(lab.o);
	}

	if ( document.getElementById( "html_scale" ) )
	{
		lab.scale = document.getElementById( "html_scale" ).value*1;
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
	if ( g_key[KEY_D] )		
	{
		document.getElementsByName( "html_debug_d" )[0].checked = !document.getElementsByName( "html_debug_d" )[0].checked;
		html_onchange();
	}
	if ( g_key[KEY_F] )		
	{
		document.getElementsByName( "html_debug_f" )[0].checked = !document.getElementsByName( "html_debug_f" )[0].checked;
		html_onchange();
	}
	if ( g_key[KEY_G] )		
	{
		document.getElementsByName( "html_debug_g" )[0].checked = !document.getElementsByName( "html_debug_g" )[0].checked;
		html_onchange();
	}
	if ( g_key[KEY_H] )		
	{
		document.getElementsByName( "html_debug_h" )[0].checked = !document.getElementsByName( "html_debug_h" )[0].checked;
		html_onchange();
	}
	if ( g_key[KEY_R] )	html_onchange('reset');
	if ( g_key[KEY_S] )	html_onchange('step');
	if ( g_key[KEY_P] )	html_onchange('pause')
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

