"use strict";

let html =
{
	//---------------------------------------------------------------------
	"getById_textbox":function( name, val )
	//---------------------------------------------------------------------
	{
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
	"getById_innerHTML":function( name, val )
	//---------------------------------------------------------------------
	{
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
	"getByName_radio":function( name, val )
	//---------------------------------------------------------------------
	{
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
	"getByName_checkbox":function( name, val )	// bool
	//---------------------------------------------------------------------
	{
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
	"getById_selectbox":function( name, val )
	//---------------------------------------------------------------------
	{
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
	}
};

//-----------------------------------------------------------------------------
function strfloat( v, r=4, f=2 ) // r指数部桁、f小数部桁
//-----------------------------------------------------------------------------
{
	// 小数点以下 f 桁で固定小数点表記に変換
	const fixed = v.toFixed(f);

	// 必要に応じてスペースで埋める
	return fixed.padStart(r + f + 1, ' '); // `+1` は小数点分
}
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
	let param_flgDeferent = false;
	let param_flgEpicycle = false;
	let param_speed = 1;
	let param_size = 20;
	let param_center = "Sun";
	let param_tblStellar =
	{
	//			  				,半径(km)		,軌道長半径(km)				,公転周期(年)			
		"Sun"	:{name:"太陽"	,radius:695700	,semi_major_axis:Au*0		,orbital_period:0			,x:0,y:0,rad:0,visible:true},
		"Mer"	:{name:"水星"	,radius:2439	,semi_major_axis:Au*0.387	,orbital_period:0.241		,x:0,y:0,rad:0,visible:true},
		"Ven"	:{name:"金星"	,radius:6051	,semi_major_axis:Au*0.723	,orbital_period:0.615		,x:0,y:0,rad:0,visible:true},
		"Ear"	:{name:"地球"	,radius:6378	,semi_major_axis:Au*1.0000	,orbital_period:1.000		,x:0,y:0,rad:0,visible:true},
		"Moo"	:{name:"月"		,radius:1737	,semi_major_axis:384748		,orbital_period:(29.5*12)/365	,x:0,y:0,rad:0,visible:false},
		"Mar"	:{name:"火星"	,radius:3396	,semi_major_axis:Au*1.524	,orbital_period:1.881		,x:0,y:0,rad:0,visible:true},
		"Jup"	:{name:"木星"	,radius:71492	,semi_major_axis:Au*5.204	,orbital_period:11.862		,x:0,y:0,rad:0,visible:true},
		"Sat"	:{name:"土星"	,radius:60268	,semi_major_axis:Au*9.582	,orbital_period:29.457		,x:0,y:0,rad:0,visible:true},
		"Ura"	:{name:"天王星"	,radius:25559	,semi_major_axis:Au*19.201	,orbital_period:84.011		,x:0,y:0,rad:0,visible:true},
		"Nep"	:{name:"海王星"	,radius:24764	,semi_major_axis:Au*30.047	,orbital_period:164.79		,x:0,y:0,rad:0,visible:true},
	}
	let	treeStellar = 
	[
		{body:param_tblStellar["Sun"],child:
		[
			{body:param_tblStellar["Mer"],child:[]},
			{body:param_tblStellar["Ven"],child:[]},
			{body:param_tblStellar["Ear"],child:[
				{body:param_tblStellar["Moo"],child:[]},
			]},
			{body:param_tblStellar["Mar"],child:[]},
			{body:param_tblStellar["Jup"],child:[]},
			{body:param_tblStellar["Sat"],child:[]},
			{body:param_tblStellar["Ura"],child:[]},
			{body:param_tblStellar["Nep"],child:[]},
		]}
	];

	let year = 0;
	let date = 1;
	let cx = 0;
	let cy = 0;
	
	//-------------------------------------------------------------------------
	function treesearch( tree, param, func )
	//-------------------------------------------------------------------------
	{
		for ( let i = 0 ; i < tree.length ; i++ )
		{
			let ret = func(tree[i].body,param);
			if ( tree[i].child.length > 0 ) treesearch( tree[i].child, ret, func );
		}
	}
	//-------------------------------------------------------------------------
	function frame_update( time )
	//-------------------------------------------------------------------------
	{
		let step = param_speed;//(日)

		//calc

		date += step;

		treesearch( treeStellar,null, function(s,p)
		{
			if ( s.orbital_period > 0 ) s.rad += (2*Math.PI/365) * (step/s.orbital_period);
			s.x = s.semi_major_axis*Math.cos(s.rad);
			s.y = s.semi_major_axis*Math.sin(s.rad);
			if ( p != null )
			{
				s.x += p.x;
				s.y += p.y;
			}
			return s;
		});

		{
			cx = param_tblStellar[param_center].x;
			cy = param_tblStellar[param_center].y;
		}

		// draw 情報 
		gra1.color("#000");
		gra2.color("#000");gra2.font("16px");
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

				treesearch( treeStellar,null, function(s,p)
				{
					let str = "公転周期="+strfloat(s.orbital_period,3,2)+"(年)";
					gra2.print( s.name, 0,y );
					gra2.print( str, 60,y );
					y+=20;
				});
			}


		}

		// draw 天体 
		{
			let sz_y = Au*param_size;
			let sz_x = Math.floor(html_canvas2.width/html_canvas2.height*sz_y);
			gra1.window( -sz_x+cx, sz_y+cy, sz_x+cx, -sz_y+cy );
			gra2.window( -sz_x+cx, sz_y+cy, sz_x+cx, -sz_y+cy );
		}

		treesearch( treeStellar, 0, function(s,p)
		{
			if ( s.visible == true )
			{
				gra1.dotty( s.x,s.y,1 );
				gra2.circle( s.x,s.y,s.radius );
				gra2.dotty( s.x,s.y,3 );
				gra2.print( s.name, s.x,s.y );
			}
		});

		// 周転円の描画
		{
			{
				let sz_y = Au*param_size;
				let sz_x = Math.floor(html_canvas2.width/html_canvas2.height*sz_y);
				gra1.window( -sz_x, sz_y, sz_x, -sz_y );
				gra2.window( -sz_x, sz_y, sz_x, -sz_y );
			}
			gra2.color("#00F");
			gra1.color("#F00");
			treesearch( treeStellar, 0, function(s,p)
			{
				if ( s.visible == true )
				{
					let c = param_tblStellar[param_center];
					if ( c != s )
					{
						let min = s.semi_major_axis-c.semi_major_axis;
						let max = s.semi_major_axis+c.semi_major_axis;
						let epir=(max-min)/2;
						let r = (max+min)/2;

						let x = r*Math.cos(s.rad);
						let y = r*Math.sin(s.rad);

console.log(param_flgDeferent,param_flgEpicycle);
						if ( param_flgDeferent ) gra1.dotty( x,y, 1 );
						if ( param_flgEpicycle ) gra2.circle( x,y,epir );
					}
				}
			});
		}
	}
	
	let prev = 0;
	//-------------------------------------------------------------------------
	function main_update( time )
	//-------------------------------------------------------------------------
	{
		if ( g_req_stat != null )
		{
			param_tblStellar["Sun"].visible=g_req_stat["Sun"];
			param_tblStellar["Mer"].visible=g_req_stat["Mer"];
			param_tblStellar["Ven"].visible=g_req_stat["Ven"];
			param_tblStellar["Ear"].visible=g_req_stat["Ear"];
			param_tblStellar["Moo"].visible=g_req_stat["Moo"];
			param_tblStellar["Mar"].visible=g_req_stat["Mar"];
			param_tblStellar["Jup"].visible=g_req_stat["Jup"];
			param_tblStellar["Sat"].visible=g_req_stat["Sat"];
			param_tblStellar["Ura"].visible=g_req_stat["Ura"];
			param_tblStellar["Nep"].visible=g_req_stat["Nep"];
			param_center		= g_req_stat["Center"];
			param_size			= g_req_stat["Size"];
			param_speed			= g_req_stat["Speed"];
			param_flgDeferent	= g_req_stat["Deferent"];
			param_flgEpicycle	= g_req_stat["Epicycle"];

			gra1.cls();
			year=0;
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
	html_request('');
	main();
}
let g_req_requestAnimationFrame = null;
let g_req_stat = null;
//-----------------------------------------------------------------------------
function html_request( cmd )	// 正規化もここで行うと、入力エラーがあってもmainに被害が無いので都合がいい
//-----------------------------------------------------------------------------
{
	let new_stat = 
	{
		"Sun"		:html.getByName_checkbox("html_checkbox_Sun",false),
		"Mer"		:html.getByName_checkbox("html_checkbox_Mer",false),
		"Ven"		:html.getByName_checkbox("html_checkbox_Ven",false),
		"Ear"		:html.getByName_checkbox("html_checkbox_Ear",false),
		"Moo"		:html.getByName_checkbox("html_checkbox_Moo",false),
		"Mar"		:html.getByName_checkbox("html_checkbox_Mar",false),
		"Jup"		:html.getByName_checkbox("html_checkbox_Jup",false),
		"Sat"		:html.getByName_checkbox("html_checkbox_Sat",false),
		"Ura"		:html.getByName_checkbox("html_checkbox_Ura",false),
		"Nep"		:html.getByName_checkbox("html_checkbox_Nep",false),
		"Center"	:html.getByName_radio("html_radio","Sun")+"",
		"Size"		:html.getById_textbox("html_size","1")*1.0,
		"Speed"		:html.getById_textbox("html_speed","1")*1.0,
		"Deferent"	:html.getByName_checkbox("html_checkbox_Deferent",false),
		"Epicycle"	:html.getByName_checkbox("html_checkbox_Epicycle",false),
		//
		"cmd"		:cmd,
	}

	g_req_stat = new_stat;

}