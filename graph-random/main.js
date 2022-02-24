"use strict";

let gra = gra_create( html_canvas );

let g_tbl = new Array(1000);
g_tbl.fill(0);


//-----------------------------------------------------------------------------
function update()
//-----------------------------------------------------------------------------
{
	gra.cls();


	let 	g_algo = html.get("html_foo");

	{

		let r_qnum	= 32;		// 量子化数
		let r_smp	= 100000;	// 振る回数
		let r_dice	= 3;		// 0～1のアナログさいころの数



		for ( let i = 0 ; i < r_qnum ; i++ ) g_tbl[i] = 0;

		function rnd2( n ) // n=3以上が正規分布
		{
			let r = 0;
			for ( let j = 0 ; j < n ; j++ ) r += Math.random();
			return r/n;
		}

		for ( let i = 0 ; i < r_smp ; i++ )
		{
			let r = 0;

			switch( g_algo )
			{
				case "r"		:r = rnd2( 1 );	break;
				case "(r+r)/2"	:r = rnd2( 2 );	break;
				case "(r+r+r)/3":r = rnd2( 3 );	break;
				case "(A+B)/2"	:r = (rnd2( 1 )+rnd2( 2 ))/2;	break;
				case "(A+C)/2"	:r = (rnd2( 1 )+rnd2( 3 ))/2;	break;
				case "(B+C)/2"	:r = (rnd2( 2 )+rnd2( 3 ))/2;	break;
				case "A*B"		:r = (rnd2( 1 )*rnd2( 2 ));		break;
				case "A*C"		:r = (rnd2( 1 )*rnd2( 3 ));		break;
				case "B*C"		:r = (rnd2( 2 )*rnd2( 3 ));		break;
			}

			let n = Math.floor( r*r_qnum );	// 量子化
			g_tbl[n]++;
		}	

		{	// グラフ表示
			gra.window( 0,0,512,384 );
			gra.print( "量子化数　　　:"+r_qnum.toString(), 10,16*1 );
			gra.print( "サンプリング数:"+r_smp,10,16*2, );
			gra.print( "アルゴリズム　:"+g_algo,10,16*3 );

			let d_wide = 16;
			let d_sc = 1/40;
			let d_y = html_canvas.height -32;

			for ( let i = 0 ; i < r_qnum ; i++ ) 
			{
				let v = g_tbl[i];
				let x = i * d_wide;

				gra.window( 0,14000,512,-1400 );
				gra.dot( x,v, 3 );
				gra.print( i, x, 0 );
			}
		}
		
	}
	

	
	requestAnimationFrame( update );

}


//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
	html.write_all();
	html.request();
	requestAnimationFrame( update );
}


html.param =  
{

	"html_foo"	:{val:"(r+r+r)/3"	,type:"radiobutton"	,req:true},
};

//-----------------------------------------------------------------------------
html.request = function( name )
//-----------------------------------------------------------------------------
{
	html.read_all( name );

}
