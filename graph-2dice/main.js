"use strict";
let gras =
[
	gra_create( html_canvas1 ),
	gra_create( html_canvas2 ),
	gra_create( html_canvas3 ),
	gra_create( html_canvas4 ),
	gra_create( html_canvas5 ),
	gra_create( html_canvas6 ),
	gra_create( html_canvas7 ),
	gra_create( html_canvas8 ),
	gra_create( html_canvas9 ),
	gra_create( html_canvasA ),
];

let rnd0= rand_create( "Math" );
let rnd1 = rand_create( "xorshift32-seed" );
let rnd = rnd0

//-----------------------------------------------------------------------------
function drawGraph( gra, tblDice,  r_smp, scale )
//-----------------------------------------------------------------------------
{
	gra.cls();

	{	// グラフ表示
		gra.window( 0,0,gra.ctx.canvas.width,gra.ctx.canvas.height );
		gra.print( ""+r_smp,0,16*0, );

		gra.window( 0,gra.ctx.canvas.height,gra.ctx.canvas.width,-16 );

		let d_wide = 16;
		let b_wide = 15;

		let x = 0;
		for ( let i = 2 ; i < tblDice.length ; i++ ) 
		{
			let v = tblDice[i] * scale;
	
			gra.fill(x,v,x+b_wide,0);
			gra.print12( i, x, 3 );
			x += d_wide;
		}
	}
	
}
//-----------------------------------------------------------------------------
function update()
//-----------------------------------------------------------------------------
{
	{
		let name = "html_rnd";
		var list = document.getElementsByName( name ) ;
		for ( let l of list )
		{
			if ( l.checked ) 
			{	
				if ( l.value == "Math.random" ) rnd = rnd0;
				if ( l.value == "XorShift32"  ) rnd = rnd1;
				break;
			}
		}
	}
	let samples = document.getElementById( "html_sampling" ).value;

	let tblRes = [];
	for ( let i = 0 ; i < gras.length ; i++ )
	{
		let tblDice = new Array(6+6+1);
		tblDice.fill(0);
		tblRes.push({tblDice:tblDice,smp:0});
	}
	let scale = 1.0;
	
	{
		let cnt1 = 0;
		let cnt2 = 0;
		let div = samples/gras.length;
		let tblDice = new Array(6+6+1);
		tblDice.fill(0);
		let ceil = div;
		for ( let i = 0 ; i < samples ; i++ )
		{
			let r = 0;
			r += Math.floor(rnd()*6)+1;
			r += Math.floor(rnd()*6)+1;
			tblDice[r]++;

			cnt1++;
			if ( cnt1 >= Math.floor(ceil) )
			{
				for ( let j = 0 ; j < tblDice.length ; j++ )
				{
					tblRes[cnt2].tblDice[j] = tblDice[j];
				}
					tblRes[cnt2].smp = cnt1;
				ceil += div;
				cnt2++;
				// 端数は最後に織り込む
				if ( ceil >= samples ) ceil = samples;
				if ( cnt2 >= tblRes.length-1 ) ceil = samples;

			}
		}
	}
	scale = 600/samples;
	for ( let i = 0 ; i < gras.length ; i++ )
	{
		drawGraph( gras[i], tblRes[i].tblDice, tblRes[i].smp, scale );

	}
	
	
//	requestAnimationFrame( update );

}


//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
	requestAnimationFrame( update );
}

