"use strict";

let html =
{
	//---------------------------------------------------------------------
	"getById_textbox":function( name )
	//---------------------------------------------------------------------
	{
		let val = "";
		if ( document.getElementById( name ) )
		{
			val = document.getElementById( name ).value;
		}
		return val;
	},
	//---------------------------------------------------------------------
	"setById_textbox":function( name, val  )
	//---------------------------------------------------------------------
	{
		if ( document.getElementById( name ) )
		{
			document.getElementById( name ).value = val;
		}
	},
	//---------------------------------------------------------------------
	"getById_innerHTML":function( name )
	//---------------------------------------------------------------------
	{
		let val = "";
		if ( document.getElementById( name ) )
		{
			let val = document.getElementById( name ).innerHTML;
		}
		return val;
	},
	//---------------------------------------------------------------------
	"setById_innerHTML":function( name, val  )
	//---------------------------------------------------------------------
	{
		if ( document.getElementById( name ) )
		{
			document.getElementById( name ).innerHTML = val;
		}
	},
	//---------------------------------------------------------------------
	"getByName_radio":function( name )
	//---------------------------------------------------------------------
	{
		let val = false;
		let list = document.getElementsByName( name ) ;
		for ( let l of list )
		{
			if ( l.checked ) 
			{
				val = l.value;
				break;
			}
		}
		return val;
	},
	//---------------------------------------------------------------------
	"setByName_radiobuton":function( name, val )
	//---------------------------------------------------------------------
	{
		let list = document.getElementsByName( name ) ;
		for ( let l of list )
		{
			if ( l.value == val )
			{
				l.checked = true;
				break;
			}
		}
		return val;
	},
	//---------------------------------------------------------------------
	"getByName_checkbox":function( name )
	//---------------------------------------------------------------------
	{
		let val = false;
		if ( document.getElementsByName( name ).length > 0 ) 
		{
			if ( document.getElementsByName( name )[0] ) 
			{
				val = document.getElementsByName( name )[0].checked;
			}
		}
		return val;
	},
	//---------------------------------------------------------------------
	"setByName_checkbox":function( name, val )
	//---------------------------------------------------------------------
	{
		if ( document.getElementsByName( name ).length > 0 ) 
		{
			if ( document.getElementsByName( name )[0] ) 
			{
				document.getElementsByName( name )[0].checked = val;
			}
		}
	},
	//---------------------------------------------------------------------
	"getById_selectbox":function( name )
	//---------------------------------------------------------------------
	{
		let val = false;
		let select = document.getElementById( name );
		if ( select)
		{
			val = select.value;
		}
		return val;
	},
	//---------------------------------------------------------------------
	"setById_selectbox":function( name, val )
	//---------------------------------------------------------------------
	{
		let select = document.getElementById(name);
		if ( select )
		{
			for ( let o of select.options )
			{
				if ( o.value == val )
				{
					o.selected = true;
				}
			}
		}
	},
};
//-----------------------------------------------------------------------------
function gra_create( cv )	//2021/06/01 window関数実装
//-----------------------------------------------------------------------------
{
	let gra={}
	gra.x = 0;
	gra.y = 0;
	gra.ctx=cv.getContext('2d');
	gra.ctx.font = "14px Courier";	// iOSでも使えるモノスペースフォントただし漢字はモノスペースにはならない 16pxより綺麗に見える
	gra.ctx.fillStyle = "#000";
	gra.ctx.strokeStyle = "#000";
	gra.ctx.textAlign = "left";
	gra.ctx.textBaseline = "alphabetic";

	let sx = 0; 
	let sy = 0; 
	let ex = gra.ctx.canvas.width; 
	let ey = gra.ctx.canvas.height; 
	let ox = 0;
	let oy = 0;
	//-------------------------------------------------------------------------
	gra.window = function( _sx, _sy, _ex, _ey )
	//-------------------------------------------------------------------------
	{
		sx = _sx;
		sy = _sy;
		ex = _ex;
		ey = _ey;
		ox = -_sx;
		oy = -_sy;
	}

	function cvabs( x, y )
	{
		let w = ex-sx;
		let h = ey-sy;
		x = (x+ox)/w * gra.ctx.canvas.width;
		y = (y+oy)/h * gra.ctx.canvas.height;
		return [x,y];
	}
	function cvrange( x, y )
	{
		let w = Math.abs(ex-sx);
		let h = Math.abs(ey-sy);
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
			gra.ctx.lineWidth = 1.0;
			gra.ctx.moveTo( sx, sy );
			gra.ctx.lineTo( ex, ey );
			gra.ctx.closePath();
			gra.ctx.stroke();
		}

		[x1,y1]=cvabs(x1,y1);
		[x2,y2]=cvabs(x2,y2);

		let style = [];
		switch( mode )
		{
			case "hasen": style = [2,4];
		}
	
		func( x1, y1, x2, y2, style );
	}
	//-------------------------------------------------------------------------
	gra.font = function( font )
	//-------------------------------------------------------------------------
	{
		gra.ctx.font = font;
	}
	//-------------------------------------------------------------------------
	gra.color = function( col )
	//-------------------------------------------------------------------------
	{
		gra.ctx.fillStyle = col;
		gra.ctx.strokeStyle = col;
	}
	//-------------------------------------------------------------------------
	gra.print = function( str, x1, y1 )
	//-------------------------------------------------------------------------
	{
		function func( str, tx=gra.x, ty=gra.y )
		{
			gra.ctx.textAlign = "left";
			gra.ctx.textBaseline = "alphabetic";
			gra.ctx.fillText( str, tx+2, ty );
			gra.x = tx;
			gra.y = ty+12;
		}

		[x1,y1]=cvabs(x1,y1);
		func( str, x1+2, y1-4 );
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
			rw = Math.max(rw,0.5);
			rh = Math.max(rh,0.5);
			gra.ctx.ellipse( x, y, rw, rh, rotation, startAngle, endAngle );
			gra.ctx.closePath();
			gra.ctx.stroke();
		};
		[x1,y1]=cvabs(x1,y1);
		let [rw,rh] = cvrange(r,r);
		func( x1, y1,rw,rh );
	}
	//-----------------------------------------------------------------------------
	gra.dotty  = function( x1,y1,r=1 )	//ポチマーク
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
			gra.ctx.fill();
		};
		[x1,y1]=cvabs(x1,y1);
		func( x1, y1,r,r );
	}

	//-----------------------------------------------------------------------------
	gra.cls = function()
	//-----------------------------------------------------------------------------
	{
		gra.ctx.clearRect(0, 0, gra.ctx.canvas.width, gra.ctx.canvas.height );	// 合成できる fillRectだと合成できない
		gra.x=0;
		gra.y=0;
	}
	return gra;
};

let gra1 = gra_create( html_canvas1 );
let gra2 = gra_create( html_canvas2 );

//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	const Au = 1.496e+8;
	let param_size = 20;
	let param_center = "Sun";
	let param_tblStellar =
	{
	//			  				,半径(km)		,軌道長半径(km)				,公転周期(年)			
		"Sun"	:{name:"太陽"	,radius:695700	,semi_major_axis:Au*0		,orbital_period:0			,x:0,y:0,rad:0,visible:true},
		"Mer"	:{name:"水星"	,radius:2439	,semi_major_axis:Au*0.387	,orbital_period:0.241		,x:0,y:0,rad:0,visible:true},
		"Ven"	:{name:"金星"	,radius:6051	,semi_major_axis:Au*0.723	,orbital_period:0.615		,x:0,y:0,rad:0,visible:true},
		"Ear"	:{name:"地球"	,radius:6378	,semi_major_axis:Au*1.0000	,orbital_period:1.000		,x:0,y:0,rad:0,visible:true},
		"Moo"	:{name:"月"		,radius:1737	,semi_major_axis:384748		,orbital_period:1/(29.5*12)	,x:0,y:0,rad:0,visible:false},
		"Mar"	:{name:"火星"	,radius:3396	,semi_major_axis:Au*1.524	,orbital_period:1.881		,x:0,y:0,rad:0,visible:true},
		"Jup"	:{name:"木星"	,radius:71492	,semi_major_axis:Au*5.204	,orbital_period:11.862		,x:0,y:0,rad:0,visible:true},
		"Sat"	:{name:"土星"	,radius:60268	,semi_major_axis:Au*9.582	,orbital_period:29.457		,x:0,y:0,rad:0,visible:true},
		"Ura"	:{name:"天王星"	,radius:25559	,semi_major_axis:Au*19.201	,orbital_period:84.011		,x:0,y:0,rad:0,visible:true},
		"Nep"	:{name:"海王星"	,radius:24764	,semi_major_axis:Au*30.047	,orbital_period:164.79		,x:0,y:0,rad:0,visible:true},
	}
	let	treeStellar = 
	[
		{stellar:param_tblStellar["Sun"],child:
		[
			{stellar:param_tblStellar["Mer"],child:[]},
			{stellar:param_tblStellar["Ven"],child:[]},
			{stellar:param_tblStellar["Ear"],child:[
				{stellar:param_tblStellar["Moo"],child:[]},
			]},
			{stellar:param_tblStellar["Mar"],child:[]},
			{stellar:param_tblStellar["Jup"],child:[]},
			{stellar:param_tblStellar["Sat"],child:[]},
			{stellar:param_tblStellar["Ura"],child:[]},
			{stellar:param_tblStellar["Nep"],child:[]},
		]}
	];

	let year = 0;
	let date = 1;
	let cx = 0;
	let cy = 0;
	//-------------------------------------------------------------------------
	function frame_update( time )
	//-------------------------------------------------------------------------
	{
		let step = 1;//(日)

		//calc

		date += step;

		//-------------------------------------------------------------------------
		function calcTree( ox,oy,tree )
		//-------------------------------------------------------------------------
		{
			for ( let i = 0 ; i < tree.length ; i++ )
			{
				let s = tree[i].stellar;
				if ( s.orbital_period > 0 ) s.rad += (2*Math.PI/365) * (step/s.orbital_period);
				s.x = s.semi_major_axis*Math.cos(s.rad)+ox;
				s.y = s.semi_major_axis*Math.sin(s.rad)+oy;
				if ( tree[i].child.length > 0 ) calcTree( s.x,s.y,tree[i].child );
			}
		}
		calcTree( 0,0,treeStellar);

		{
			cx = param_tblStellar[param_center].x;
			cy = param_tblStellar[param_center].y;
		}

		// draw
		gra2.cls();
		{
			{
				let sz_y = html_canvas2.height;
				let sz_x = html_canvas2.width;
				gra2.window( 0,0, sz_x, sz_y );
				gra2.print( "date="+date.toString()+"/365", 0,sz_y );
				gra2.print( "year="+year.toString(), 128,sz_y );
				date++;
				if ( date>365 )
				{
					date = 1;
					year++;
				}

				let y = 0 ;
				//-------------------------------------------------------------------------
				function foo( tree )
				//-------------------------------------------------------------------------
				{
					for ( let i = 0 ; i < tree.length ; i++ )
					{
//						gra2.print( tree[i].stellar.name, 0,y+=16 );
						if ( tree[i].child.length > 0 ) foo( tree[i].child );
					}
				}
				foo( treeStellar );
			}
			{
				let sz_y = Au*param_size;
				let sz_x = Math.floor(html_canvas2.width/html_canvas2.height*sz_y);
				gra1.window( -sz_x+cx, sz_y+cy, sz_x+cx, -sz_y+cy );
				gra2.window( -sz_x+cx, sz_y+cy, sz_x+cx, -sz_y+cy );
			}
		}

		gra1.color("#000");
		gra2.color("#000");gra2.font("16px");


		//-------------------------------------------------------------------------
		function drawTree( tree )
		//-------------------------------------------------------------------------
		{
			for ( let i = 0 ; i < tree.length ; i++ )
			{
				let s = tree[i].stellar;
				if ( s.visible == true )
				{
					gra1.dotty( s.x,s.y,0.5 );
					gra2.circle( s.x,s.y,s.radius );
					gra2.dotty( s.x,s.y,3 );
					gra2.print( s.name, s.x,s.y );
				}
				if ( tree[i].child.length > 0 ) drawTree( tree[i].child );
			}
		}
		drawTree( treeStellar);
	}
	
	let prev = 0;
	//-------------------------------------------------------------------------
	function main_update( time )
	//-------------------------------------------------------------------------
	{
		if ( g_req_stat != null )
		{
			param_tblStellar["Sun"].visible=g_req_stat["Sun"].visible;
			param_tblStellar["Mer"].visible=g_req_stat["Mer"].visible;
			param_tblStellar["Ven"].visible=g_req_stat["Ven"].visible;
			param_tblStellar["Ear"].visible=g_req_stat["Ear"].visible;
			param_tblStellar["Moo"].visible=g_req_stat["Moo"].visible;
			param_tblStellar["Mar"].visible=g_req_stat["Mar"].visible;
			param_tblStellar["Jup"].visible=g_req_stat["Jup"].visible;
			param_tblStellar["Sat"].visible=g_req_stat["Sat"].visible;
			param_tblStellar["Ura"].visible=g_req_stat["Ura"].visible;
			param_tblStellar["Nep"].visible=g_req_stat["Nep"].visible;
			param_center = g_req_stat["Center"].id;
			param_size = g_req_stat["Size"].size*1.0;
			gra1.cls();

			g_req_stat = null;
		}

		frame_update( time );

		// キャンバス3合成
		{
			const ctx = html_canvas3.getContext("2d");
			ctx.clearRect(0, 0, html_canvas3.width, html_canvas3.height);
			ctx.drawImage(html_canvas1, 0, 0, html_canvas3.width, html_canvas3.height);
			ctx.drawImage(html_canvas2, 0, 0, html_canvas3.width, html_canvas3.height);
		}
		g_req_requestAnimationFrame =  window.requestAnimationFrame( main_update );
	}

	main_update(0);
}

//-----------------------------------------------------------------------------
window.onload = function(e)
//-----------------------------------------------------------------------------
{
	html_request();
	main();
}
let g_req_requestAnimationFrame = null;
let g_req_stat = null;
//-----------------------------------------------------------------------------
function html_request()
//-----------------------------------------------------------------------------
{
	let new_stat = 
	{
		"Sun"	:{visible:html.getByName_checkbox("html_checkbox_Sun")},
		"Mer"	:{visible:html.getByName_checkbox("html_checkbox_Mer")},
		"Ven"	:{visible:html.getByName_checkbox("html_checkbox_Ven")},
		"Ear"	:{visible:html.getByName_checkbox("html_checkbox_Ear")},
		"Moo"	:{visible:html.getByName_checkbox("html_checkbox_Moo")},
		"Mar"	:{visible:html.getByName_checkbox("html_checkbox_Mar")},
		"Jup"	:{visible:html.getByName_checkbox("html_checkbox_Jup")},
		"Sat"	:{visible:html.getByName_checkbox("html_checkbox_Sat")},
		"Ura"	:{visible:html.getByName_checkbox("html_checkbox_Ura")},
		"Nep"	:{visible:html.getByName_checkbox("html_checkbox_Nep")},
		"Center":{id:html.getByName_radio("html_radio")},
		"Size"	:{size:html.getById_textbox("html_size")},
	}

	g_req_stat = new_stat;

}