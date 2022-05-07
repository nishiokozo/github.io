	"use strict";

let kif = kif_create();

//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
if(0)
{
	function foo()
	{
		let self = {};
		self.v = 123;
		
		self.f1 = function()
		{
			self.v = 456;
		}
		self.f2 = function()
		{
			this.v = 789;
		}
		
		return self;
	}
	let a = foo();
	let b = foo();

	b.f1();
	b.f2();

	console.log( a.v );
	a.f1();
	b.f2();
	console.log( a.v );
	a.f2();
	b.f1();
	console.log( a.v );
}


//console.log(a,a.style);
/*
	let tmp ={
		"html_deep_BLACK"	:{val:2		,type:"textbox"		,req:false},
		"html_deep_WHITE"	:{val:2		,type:"textbox"		,req:false},
		"get":function( name ) {},
	};

	for ( let key of Object.keys( tmp ) )
	{
		console.log(key);
		let a = tmp[key];
console.log( typeof(a) );
console.log( a instanceof Array );
console.log( a instanceof Object && !(a instanceof Array) );
	}

let a=[1,2];
let b={a:1,b:2};
let c=function(){};
let d=function(){};
console.log( Array.prototype );
console.log('a');
console.log( typeof(a) );
console.log( a instanceof Array );
console.log( a instanceof Object );
console.log( a instanceof Object && !(a instanceof Array) );
console.log( a instanceof Function );
console.log('b');
console.log( typeof(b) );
console.log( b instanceof Array );
console.log( b instanceof Object );
console.log( b instanceof Object && !(b instanceof Array) );
console.log( b instanceof Function );
console.log('c');
console.log( typeof(c) );
console.log( c instanceof Array );
console.log( c instanceof Object );
console.log( c instanceof Object && !(c instanceof Array) );
console.log( c instanceof Function );
console.log('d');
console.log( typeof(d) );
console.log( d instanceof Array );
console.log( d instanceof Object );
console.log( d instanceof Object && !(d instanceof Array) );
console.log( d instanceof Number );
*/
	
	html.write_all();
	kif.request("(game.reset)");	// 初期パラメータの読み込み
	kif.update();					// 更新開始。二回目以降は内部で呼び出す

}
/*
//-----------------------------------------------------------------------------
function html_req( num )
//-----------------------------------------------------------------------------
{
	console.log( "req=",num );

	let tmp = kif.base.ban_copy();
	kif.tree_play( tmp, kif.tree, num );

}
*/



/*
//-----------------------------------------------------------------------------
function kif.request( cmd )
//-----------------------------------------------------------------------------
{
	html.read();
	kif.request(cmd);
}
*/


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
/*
	if ( g_key[KEY_D] )		
	{
		let item = document.getElementsByName( "html_debug_d" )[0];
		if ( item ) item.checked = !item.checked;
		kif.request();
	}
	if ( g_key[KEY_F] )		
	{
		let item = document.getElementsByName( "html_debug_f" )[0];
		if ( item ) item.checked = !item.checked;
		kif.request();
	}
	if ( g_key[KEY_G] )		
	{
		let item = document.getElementsByName( "html_debug_g" )[0];
		if ( item ) item.checked = !item.checked;
		kif.request();
	}
	if ( g_key[KEY_H] )		
	{
		let item = document.getElementsByName( "html_debug_h" )[0];
		if ( item ) item.checked = !item.checked;
		kif.request();
	}
	if ( g_key[KEY_R] 		)	kif.request('(game.reset)');
	if ( g_key[KEY_LEFT] 	)	kif.request('(前)');
	if ( g_key[KEY_RIGHT]	)	kif.request('(次)');
	if ( g_key[KEY_CR] 		)	kif.request('(再生)');
	if ( g_key[KEY_SPC] ) return false; // falseを返すことでスペースバーでのスクロールを抑制
*/
}

//マウス入力
let g_mouse = {req:false,x:0,y:0,l:false,r:false,hl:false,hr:false};
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
	if ( e.button==0 && g_mouse.l == false )	g_mouse.hl = true;
	if ( e.button==2 && g_mouse.r == false )	g_mouse.hr = true;

	if ( e.button==0 )	g_mouse.l = true;
	if ( e.button==2 )	g_mouse.r = true;
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
