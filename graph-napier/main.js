"use strict";

let gra = gra_create( html_canvas );

let g_tbl = new Array(1000);
g_tbl.fill(0);

let once = true;
//-----------------------------------------------------------------------------
function update()
//-----------------------------------------------------------------------------
{
	gra.cls();


	let 	g_algo = "(r+r+r)/3";

	{

		let r_qnum	= 64;		// 量子化数
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

			let r = rnd2( 3 );

			let n = Math.floor( r*r_qnum );	// 量子化
			g_tbl[n]++;
		}	

		{	// グラフ表示
			gra.window( 0,0,512,384 );
			gra.print( "サイコロ　　 　 :r="+r_qnum.toString(), 10,16*1 );
			gra.print( "振る回数　　 　 :"+r_smp,10,16*2, );
			gra.print( "アルゴリズム(青):"+"y=r+r+r",10,16*3 );
			gra.print( "アルゴリズム(赤):"+"y=e^-x²",10,16*4 );

			let d_wide = 16;
			let d_sc = 1/40;
			let d_y = html_canvas.height;

			for ( let i = 0 ; i < r_qnum ; i++ ) 
			{
				let v = g_tbl[i];
				let x = i * d_wide;

				gra.window( 0,22*14000/r_qnum,512*2,0 );

				gra.color([0,0,1]);
				gra.dot( x,v, 2 );

				let a = (i-r_qnum/2)/r_qnum*4;
				let y = Math.pow( Math.E, -a*a )*14000*16/r_qnum;
				gra.color([1,0,0]);gra.dot( x, y, 2 );
				gra.color([0.2,0.2,0.2]);
			}
		}
		
	}
	once = false;

	
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
