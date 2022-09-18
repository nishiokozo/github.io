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
   	let C8 =  vec3(0.5,0.5,0.5);
   	let C9 =  vec3(0.75,0.75,0.75);

	{
		html.entry( "html_detail"			,"checkbox"	,	false	);	
		html.entry( "html_graph"			,"checkbox"	,	true	);	
		html.request = function( req )	// window.onload()の前に完了していないので、この定義までにボタンが押される可能性があり僅かに問題がある。
		{
			// ブラウザからのクリックを反映させる為の処理。index.htmlにこの関数の呼び出しを書いておく必要がある。
			if ( req=="(detail)" ) html.read("html_detail") ;	// htmlの設定がhtml.paramに反映される
			else
			if ( req=="(graph)" ) html.read("html_graph") ;	// htmlの設定がhtml.paramに反映される
			else
			html_error("unknown:",req);
			console.log(req);
		}
		html.write_all();	// html.paramの設定値がhtmlに反映される
	}

	let g_log_long = [];
//	let g_log_short = [];

	let g_flgStop = false;
	//---------------------------------------------------------------------
	function	update_paint( now )
	//---------------------------------------------------------------------
	{
		gra.backcolor([1,0,0]);
		gra.cls();

		const cx = gra.ctx.canvas.width/2;
		const cy = gra.ctx.canvas.height/2;
		const W = gra.ctx.canvas.width;
		const H = gra.ctx.canvas.height;
		let cr = 8;

		// ビュー計算
		peri.setCont(13,2);

		let pad = peri.getinfo( 0.01 );


//	   	document.getElementById("html_padinfo").innerHTML		= "pad:undefined";
		 if (pad.inf != undefined )
		 {	
//		   	document.getElementById("html_padinfo").innerHTML		= pad.inf.id;
			gra.symbol( "pad:" +pad.inf.id, cx,H-16, 16 , "CT", 0 );

			if ( html.get("html_detail") == true )	//pad キーリスト表示
			{
					let x = 4;
				{
					let y = 3;
					let list = navigator.getGamepads();
							gra.symbol( "///// pad /////" , x,16*(y++), 16 , "LT", 0 );
					for ( let i = 0 ; i < list.length ; i++ )
					{
						let inf = list[i];
							gra.symbol( "["+i+"]"+inf , x,16*(y++), 16 , "LT", 0 );
					}
				}
				x+=200;
				{
					let y = 3;
							gra.symbol( "///// digital /////" , x,16*(y++), 16 , "LT", 0 );
					for ( let i = 0 ; i < pad.inf.buttons.length ; i++ )
					{
						let b = pad.inf.buttons[i];
						gra.symbol( "["+i+"]"+b.value , x,16*(y++), 16 , "LT", 0 );
					}
				}
				x+=200
				{
					let y = 3;
							gra.symbol( "///// analog /////" , x,16*(y++), 16 , "LT", 0 );
					for ( let i = 0 ; i < pad.inf.axes.length ; i++ )
					{
						gra.symbol( "["+i+"]"+pad.inf.axes[i] , x,16*(y++), 16 , "LT", 0 );
					}
				}

			//return;
			}
		}

		if(0)
		{
			// pad データひょうじ
			let y= 1;
			let x =414;
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

		{// デジタルパッド表示
			let a = 240;
			let b = 160-16;
			{
				if ( pad.now.LU ) gra.circlefill(cx-a    ,cy+b-25,cr);else gra.circle(cx-a    ,cy+b-20,cr);
				if ( pad.now.LD ) gra.circlefill(cx-a    ,cy+b+25,cr);else gra.circle(cx-a    ,cy+b+20,cr);
				if ( pad.now.LR ) gra.circlefill(cx-a+ 20,cy+b   ,cr);else gra.circle(cx-a+ 20,cy+b   ,cr);
				if ( pad.now.LL ) gra.circlefill(cx-a- 20,cy+b   ,cr);else gra.circle(cx-a- 20,cy+b   ,cr);
				if ( pad.now.SE ) gra.circlefill(cx-a+100,cy+b+25,cr);else gra.circle(cx-a+100,cy+b+25,cr);
				if ( pad.now.L1 ) gra.circlefill(cx-a+ 70,cy+b+25,cr);else gra.circle(cx-a+ 70,cy+b+25,cr);
				if ( pad.now.L3 ) gra.circlefill(cx-a+ 40,cy+b+25,cr);else gra.circle(cx-a+ 40,cy+b+25,cr);
			}
			{
				if ( pad.now.RU ) gra.circlefill(cx+a    ,cy+b-20,cr);else gra.circle(cx+a    ,cy+b-20,cr);
				if ( pad.now.RD ) gra.circlefill(cx+a    ,cy+b+20,cr);else gra.circle(cx+a    ,cy+b+20,cr);
				if ( pad.now.RR ) gra.circlefill(cx+a+ 20,cy+b   ,cr);else gra.circle(cx+a+ 20,cy+b   ,cr);
				if ( pad.now.RL ) gra.circlefill(cx+a- 20,cy+b   ,cr);else gra.circle(cx+a- 20,cy+b   ,cr);
				if ( pad.now.ST ) gra.circlefill(cx+a-100,cy+b+25,cr);else gra.circle(cx+a-100,cy+b+25,cr);
				if ( pad.now.R1 ) gra.circlefill(cx+a- 70,cy+b+25,cr);else gra.circle(cx+a- 70,cy+b+25,cr);
				if ( pad.now.R3 ) gra.circlefill(cx+a- 40,cy+b+25,cr);else gra.circle(cx+a- 40,cy+b+25,cr);
			}
		}

		{
			const ar = gra.ctx.canvas.height/2-cr*2;
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
			g_log_long.push( {rx:aRX,ry:aRY,lx:aLX,ly:aLY,r2:aR2,l2:aL2});
//			g_log_short.push({rx:aRX,ry:aRY,lx:aLX,ly:aLY,r2:aR2,l2:aL2});

//			if ( html.get("html_graph") == true )
			{	// グラフ：アナログレバー
				let len = Math.min( g_log_long.length, ar );
				for ( let i = 0 ; i < len ; i++ )
				{
					let v=g_log_long[i];

					if ( html.get("html_graph") == true )
					{
						
						gra.colorv(C0);gra.pset( i+cx-len   , v.ly*len+cy );
						gra.colorv(C9);gra.pset( cx+v.lx*len, i+cy-len );

						gra.colorv(C0);gra.pset( len-i+cx   , v.ry*len+cy );
						gra.colorv(C9);gra.pset( cx+v.rx*len, cy+len-i );
					}

					gra.colorv(C0);

					if ( i < 120 && len-1 > i  )
					{
						let v=g_log_long[len-1-i];

						{//左トリガー
							let lx = cx-W/2+cr;
							let ly = -v.l2*(H-cr*2)+H-cr;
							gra.psetv2( vec2(lx+i,ly) );
						}
						{//右トリガー
							let rx = cx+W/2-cr;
							let ry = -v.r2*(H-cr*2)+H-cr;
							gra.psetv2( vec2(rx-i,ry) );
						}
					}

					if ( i < 20 && len-1 > i  )
					{
						function foo( x ,y ) {return vec2(cx+x*ar, cy+y*ar); }
						let v=g_log_long[len-1-i];
						let p=g_log_long[len-1-i-1];
						{//右レバー
							let p1 = foo(v.rx,v.ry);
							let p2 = foo(p.rx,p.ry);
							gra.linev2( p1,p2);
						}
						{//左レバー
							let p1 = foo(v.lx,v.ly);
							let p2 = foo(p.lx,p.ly);
							gra.linev2( p1,p2);
						}
					}


				}
				if ( g_log_long.length > ar ) g_log_long.shift();
			}
if(0)
			{	// グラフ：アナログトリガー
				gra.colorv(C0);
				let len = Math.min( g_log_long.length, ar );
				for ( let i = 0 ; i < len/2 ; i++ )
				{
					let v=g_log_long[len-1-i];


					{
						let rx = cx+W/2-cr;
						let ry = -v.r2*(H-cr*2)+H-cr;
						gra.psetv2( vec2(rx-i,ry) );
					}

				}
				if ( g_log_long.length > ar ) g_log_long.shift();
			}
if(0)
			{	//軌跡
				gra.colorv(C0);
				let w = 12;
				for ( let i = 1 ; i < g_log_short.length ; i++ )
				{
					function foo( x ,y ) {return vec2(cx+x*ar, cy+y*ar); }
					let v=g_log_short[i];
					let p=g_log_short[i-1];
					{//右レバー
						let p1 = foo(v.rx,v.ry);
						let p2 = foo(p.rx,p.ry);
						gra.linev2( p1,p2);
					}
					{//左レバー
						let p1 = foo(v.lx,v.ly);
						let p2 = foo(p.lx,p.ly);
						gra.linev2( p1,p2);
					}

				}
				if ( g_log_short.length > w ) g_log_short.shift();
			}
			gra.colorv(C0);
			function foo( x0, y0 )
			{
				let x = x0*ar+cx;
				let y = y0*ar+cy;
				return vec2(x,y);
			}
			function foo_circle( x0, y0 )	// 矩形を円に補正
			{
				let th = Math.atan2(y0,x0);
				let ln = Math.sqrt(x0*x0+y0*y0);
				let ax = Math.cos(th);
				let ay = Math.sin(th);
				ln*=Math.max(Math.abs(ay),Math.abs(ax));;
				let x = ln*ax*ar+cx;
				let y = ln*ay*ar+cy;
				return vec2(x,y);
			}
			{//アナログレバー左
				let x = (aLX+pad.prev.LX)/2.0;
				let y = (aLY+pad.prev.LY)/2.0;
				let p  = foo( aLX, aLY );
				gra.circlefillv2( p,  cr );
			}
			{//アナログレバー右
				let x = aRX*ar+cx;
				let y = aRY*ar+cy;
				gra.circlefillv2( vec2(x,y), cr );
			}
			{//アナログトリガー左
				let lx = cx-W/2+cr;
				let ly = -aL2*(H-cr*2)+H-cr;
				gra.circlefillv2( vec2(lx,ly), cr );
			}
			{//アナログトリガー右
				let rx = cx+W/2-cr;
				let ry = -aR2*(H-cr*2)+H-cr;
				gra.circlefillv2( vec2(rx,ry), cr );
			}
			gra.symbol( ""+strfloat(aL2*100,3,1)+"%",  cx-W*0.42		,0, 16 , "CT", 0 );
			gra.symbol( ""+strfloat(aLX*100,4,1)+"%",  cx-W*0.26		,0, 16 , "CT", 0 );
			gra.symbol( ""+strfloat(aLY*100,4,1)+"%",  cx-W*0.26		,16, 16 , "CT", 0 );

			gra.symbol( ""+strfloat(aR2*100,4,1)+"%",  cx+W*0.42		,0, 16 , "CT", 0 );
			gra.symbol( ""+strfloat(aRX*100,4,1)+"%",  cx+W*0.26		,0, 16 , "CT", 0 );
			gra.symbol( ""+strfloat(aRY*100,4,1)+"%",  cx+W*0.26		,16, 16 , "CT", 0 );
		}

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

