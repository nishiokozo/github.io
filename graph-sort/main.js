"use strict";
var g1=html_canvas1.getContext('2d');
var g2=html_canvas2.getContext('2d');
var g3=html_canvas3.getContext('2d');
var g4=html_canvas4.getContext('2d');
var g5=html_canvas5.getContext('2d');
var g6=html_canvas6.getContext('2d');
//var g7=html_canvas7.getContext('2d');
//var g8=html_canvas8.getContext('2d');
function rad(d){return d/360*Math.PI*2;}
function clamp(v){return (v<0)?0:(v>255)?255:v;}

//-----------------------------------------------------------------------------
function drawtitle( g, top, bottom )
//-----------------------------------------------------------------------------
{
}
//-----------------------------------------------------------------------------
function drawcircle( g, tbl, strtop, strbottom )
//-----------------------------------------------------------------------------
{
//g.clearRect();
g.clearRect(0, 0, g.canvas.width, g.canvas.height);

	let cx = g.canvas.width/2;
	let cy = g.canvas.height/2;
	let cs = g.canvas.width*4/5/2;
	//-----------------------------------------------------------------------------
	function conv( th )
	//-----------------------------------------------------------------------------
	{
		let cr=0;
		let cg=0;
		let cb=0;
		if ( th >= rad(240) && th <= rad(360) ) cr = clamp(255*(th-rad(240))/rad(120));
		if ( th >= rad(0)   && th <= rad(120) ) cr = clamp(255*(rad(120)-th)/rad(120));
		if ( th >= rad(0)   && th <= rad(120) ) cg = clamp(255*(         th)/rad(120));
		if ( th >= rad(120) && th <= rad(240) ) cg = clamp(255*(rad(240)-th)/rad(120));
		if ( th >= rad(120) && th <= rad(240) ) cb = clamp(255*(th-rad(120))/rad(120));
		if ( th >= rad(240) && th <= rad(360) ) cb = clamp(255*(rad(360)-th)/rad(120));
		return  'rgb('+cr+','+cg+','+cb+')';
	}
	const st = rad(360)/tbl.length;
	for ( let i = 0 ; i < tbl.length ; i++ )
	{
		let th = i/tbl.length*rad(360); 

		let x1 = cs*Math.cos(th+st/2-rad(90))+cx; 
		let y1 = cs*Math.sin(th+st/2-rad(90))+cy; 
		let x2 = cs*Math.cos(th-st/2-rad(90))+cx; 
		let y2 = cs*Math.sin(th-st/2-rad(90))+cy; 
		g.beginPath();
		g.lineTo(cx,cy);
		g.lineTo(x1,y1);
		g.lineTo(x2,y2);
		g.closePath();

		let  c = conv( tbl[i]/tbl.length*rad(360) );

		g.strokeStyle = c;
		g.fillStyle = c;
		g.fill();
		g.stroke();
	}

	{
		let cy = 0;
		let str = ""+strtop;
		g.font = "24px monospace";
		g.fillStyle = "#000";
		g.textAlign = "center";
		g.textBaseline = "top";
		g.fillText( str, cx, cy+8);
	}
	{
		let cy = g.canvas.height;
		let str = ""+strbottom;
		g.font = "20 monospace";
		g.fillStyle = "#000";
		g.textAlign = "center";
		g.textBaseline = "bottom";
		g.fillText( str, cx, cy-8);
	}

}
//-----------------------------------------------------------------------------
function shuffle( src )	// すべてをシャッフル
//-----------------------------------------------------------------------------
{
	let dst = [];

	while( src.length > 0 )
	{
		let k = Math.floor( Math.random() * src.length );

		dst.push( src[k] );
		src.splice( k, 1 );
	}
	return dst;
}
//-----------------------------------------------------------------------------
function shuffle_num( src, num ) // 必ずnum 個だけシャッフルする
//-----------------------------------------------------------------------------
{
	if ( num < 2 ) return src ;

	//-----------------------------------------------------------------------------
	function shuffle_n( src, n ) // n 個だけシャッフルする
	//-----------------------------------------------------------------------------
	{
		// ①リストaから無作為にn個抜き出す->list_b
		let list_a=[];
		for ( let i = 0 ; i < src.length ; i++ )
		{
			list_a[i] = { rnd:Math.random(), idx:i, flg:false };
		}
		list_a.sort( function(a,b){return ( a.rnd>b.rnd )?1:-1;} );
		for ( let i = 0 ; i < src.length ; i++ )
		{
			if ( i < n ) list_a[i].flg = true;	// シャッフル対象
		}
		let list_b = [];
		for ( let a of list_a )
		{
			if ( a.flg )
			{
				list_b.push( { rnd:a.rnd, idx:a.idx, flg:a.flg } );
			}
		}
		list_a.sort( function(a,b){return ( a.idx>b.idx )?1:-1;} );

	//console.table(list_a);
	//console.table(list_b);

		// ②混ぜたリストを空いている所に順に戻してゆく
		let s = 0;
		for ( let i = 0 ; i < list_a.length ; i++ )
		{
			if ( list_a[i].flg )
			{
				list_a[i].idx = list_b[s++].idx;
			}
		}

		// ③出力
		let dst = [];
		for ( let a of list_a ) 
		{
			dst.push( src[ a.idx ] );
		}
		return dst;
	}

	// main

	let cnt = 0;
	let dst=[];
	while( cnt != num )
	{
		cnt = 0;
		dst = shuffle_n(src,num);
		for ( let i = 0 ; i < src.length ; i++ )
		{
			if ( src[i] != dst[i] ) cnt++;
		}
	}
	return dst
}
//-----------------------------------------------------------------------------
function mergesort_full( _tbl )	// マージソート
//-----------------------------------------------------------------------------
{
	let tbl = _tbl.concat();
	let wrk = new Array( tbl.length );
	function mergesort( first , last )
	{
		if ( first < last )	
		{
			let m = Math.floor((first+last)/2);
		console.log(first,last);
			mergesort( first, m );
			mergesort( m+1, last );
			let p = 0;
			let q = 0;
			for ( let f = first ; f <= m ; f++ ) wrk[q++] = tbl[f];
			let l = m +1;
			let f = first;
			while ( l <= last && p < q )
			{
				if ( wrk[p] < tbl[l] ) tbl[f++] = wrk[p++];
				else				   tbl[f++] = tbl[l++];
			}
			while( p < q )			   tbl[f++] = wrk[p++];
		}
		return tbl;
	}
	return mergesort( 0, tbl.length-1 );
}

//再起呼び出しを使うクイックソート
//-----------------------------------------------------------------------------
function qsort1( tbl )
//-----------------------------------------------------------------------------
{
	func( 0,tbl.length-1 );

	function func( first, last )
	{
		let x  = tbl[Math.floor((first+last)/2)];
		let i = first; 
		let j = last;
		while(1)
		{
			while( tbl[i] < x ) i++;
			while( x < tbl[j] ) j--;
			if ( i >= j ) break;
			let t = tbl[i]; 
			tbl[i] = tbl[j]; 
			tbl[j] = t;
			i++; 
			j--;
		}
		if ( first < i-1  ) func( first, i-1 );
		if ( j+1   < last ) func( j+1, last );
	}
}

//スタック式のクイックソート
//-----------------------------------------------------------------------------
function qsort2( tbl )
//-----------------------------------------------------------------------------
{
	let st = [];
	st.push([0,tbl.length-1]);

	while( st.length > 0 )
	{
		let [first,last] = st.pop([0,tbl.length-1]);
		
		let x  = tbl[Math.floor((first+last)/2)];
		let i = first; 
		let j = last;
		while(1)
		{
			while( tbl[i] < x ) i++;
			while( x < tbl[j] ) j--;
			if ( i >= j ) break;
			let t = tbl[i]; 
			tbl[i] = tbl[j]; 
			tbl[j] = t;
			i++; 
			j--;
		}
		if ( first < i-1  ) st.push([first,i-1]);
		if ( j+1   < last ) st.push([j+1,last]);
	}
}

//-----------------------------------------------------------------------------
function testsort_create( _tbl )
//-----------------------------------------------------------------------------
{

	let i = 0;
	let j = 0;
	let tbl = _tbl.concat();
	function stepSort()
	{
		this.flgUpdate = false;
		if ( i < tbl.length )
		{
			let a = tbl[i];
			if ( j < tbl.length )
			{
				let b = tbl[j];
				if ( a < b )
				{
					tbl[i] = b;
					tbl[j] = a;
					a = b;
					this.flgUpdate = true;
					this.cntUpdate++;
				}
				j++
			}
			else
			{
				j = 0;
				i++;
			}
		}
		return ( i < tbl.length );
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	

}
//-----------------------------------------------------------------------------
function heapsort_create( _tbl )
//-----------------------------------------------------------------------------
{

	let tbl = new Array( _tbl.length+1 );
	for ( let i = 0 ; i < _tbl.length ; i++ )
	{
		tbl[i+1]=_tbl[i];
	}
	let b = new Array( _tbl.length );
	let n = _tbl.length;
//	let i = 0;
	let j = 0;
	let k = 0;
//	let x = 0;

	function stepSort()
	{
		this.flgUpdate = false;
		//for ( let k = Math.floor(n/2) ; k >= 1 ; k-- )
		k = Math.floor(n/2); 
		while( k >= 1)
		{
			let i = k; 
			let x = tbl[i];
			while( ( j = 2 * i ) <= n )
			{
				if ( j < n && tbl[j] < tbl[j+1] ) j++;
				if ( x >= tbl[j] ) break;
				tbl[i] = tbl[j];
				i = j;
			}
			tbl[i] = x;
			k--;
		}
		while( n > 1 ) 
		{
			let x = tbl[n];
			tbl[n] = tbl[1];
			n--;
			let i = 1;
			while( ( j = 2 * i ) <= n ) 
			{
				if ( j < n && tbl[j] < tbl[j+1] ) j++;
				if ( x >= tbl[j] ) break;
				tbl[i] = tbl[j]; 
				i = j;
			}
			tbl[i] = x;
		}
		for ( let i = 0 ; i <n ; i++ )
		{
			tbl[i]=tbl[i+1];
		}
		this.flgUpdate=true;
		this.cntUpdate++;
		return false;
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	

}
//-----------------------------------------------------------------------------
function bubblesort_create( _tbl )
//-----------------------------------------------------------------------------
{
	let tbl = _tbl.concat();
	let i=1;
	let j;
	let n = tbl.length;
	let k;
	let flgCont = false;
	k=n-1;
	function stepSort()
	{
		this.flgUpdate = false;
		if ( flgCont == false && k >=0 )
		{
			j = -1;
		}
		{			
			if ( i <= k )
			{
				if ( tbl[i-1] > tbl[i] )
				{
					j = i - 1;
					let x = tbl[j];
					tbl[j] = tbl[i];
					tbl[i] = x;
					
					this.flgUpdate=true;
					this.cntUpdate++;
				}
				i++;
				flgCont = true;
			}
			else
			{
				i = 1;
				flgCont = false;
			k=j;
			}
			
			
		}
		return (k >=0 );
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	

/*
	let i = 0;
//	let j = _tbl.length-1;
	let j = 0;
	let tbl = _tbl.concat();
	function stepSort()
	{
		this.flgUpdate = false;
		if ( i < tbl.length )
		{
			let a = tbl[i];
			if ( j < tbl.length )
//			if ( j >= i )
			{
				let b = tbl[j];
				if ( a < b )
				{
					tbl[i] = b;
					tbl[j] = a;
					a = b;
					this.flgUpdate = true;
					this.cntUpdate++;
				}
				j++
			}
			else
			{
//				j = tbl.length-1;
				j = 0;
				i++;
			}
		}
		return ( i < tbl.length );
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	

*/
	

}
//-----------------------------------------------------------------------------
function unknown_create( _tbl )
//-----------------------------------------------------------------------------
{
	let i = 0;
	let j = _tbl.length-1;
	let tbl = _tbl.concat();
	function stepSort()
	{
		this.flgUpdate = false;
		if ( i < tbl.length )
		{
			let a = tbl[i];
			if ( j >= i )
			{
				let b = tbl[j];
				if ( a > b )
				{
					tbl[i] = b;
					tbl[j] = a;
					a = b;
					this.flgUpdate = true;
					this.cntUpdate++;
				}
				j--;
			}
			else
			{
				j = tbl.length-1;
				i++;
			}
		}
		return ( i < tbl.length );
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	
}


//-----------------------------------------------------------------------------
let imapsort_create = function( _tbl )
//-----------------------------------------------------------------------------
{	
	// 整数ソートのみ	値の幅分のバッファを確保する
	// 上書き版

	let tbl = _tbl.concat();
	let n = _tbl.length;
	let MIN = _tbl[0];
	let MAX = _tbl[0];
	for ( let i = 1 ; i < _tbl.length ; i++ )
	{
		MIN = Math.min(MIN,_tbl[i]);
		MAX = Math.max(MAX,_tbl[i]);
	}
	
	let b		= new Array( _tbl.length );
	let next	= new Array( _tbl.length );
	let index	= new Array( MAX - MIN +1 );

	for ( let x = 0 ; x <= MAX- MIN ;x++ ) index[x] = -1;
	for ( let i = n-1 ; i >= 0 ; i-- ) 
	{
		let x = _tbl[i] - MIN;
		next[i] = index[x];
		index[x] = i;
	}
	let j = 0;
	let x = 0;
	let i = n-1;
	let step = 0;
	//-----------------------------------------------------------------------------
	function stepSort()
	//-----------------------------------------------------------------------------
	{
		this.flgUpdate = false;
		if ( step == 0 )
		{
			if ( x <= MAX-MIN ) 
			{
				i = index[x];
				step = 1;
				x++;
			}
			else
			{
				return false;
			}
		}
		if ( step == 1 )
		{
			if ( i >= 0 )
			{
//				b[j++] = tbl[i];	i = next[i];
				this.tbl[j++] = x+MIN;						// 上書き版
				step = 0;
				this.flgUpdate = true;
				this.cntUpdate++;
			}
		}
		return true;
	}
	
	return {
//		tbl:b,
		tbl:tbl,//_tbl.concat(),// 上書き版	重複不可
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}
}


//-----------------------------------------------------------------------------
function quicksort_create( _tbl )
//-----------------------------------------------------------------------------
{
	let tbl = _tbl.concat();
	let f = 0;
	let l = 0;
	let st = [];
	st.push([0,tbl.length-1]);
	let first = 0;
	let last = 0;
	let m = 0 ;
	let flgCont = false;

	function stepSort()
	{
		this.flgUpdate = false;
		if ( flgCont == false && st.length > 0 )
		{
			[first,last] = st.pop([0,tbl.length-1]);
			m  = tbl[Math.floor((first+last)/2)];
			f = first; 
			l = last;
		}
		while( tbl[f] < m ) f++;
		while( m < tbl[l] ) l--;
		if ( f >= l )
		{
			if ( l+1   < last ) st.push( [l+1,last] );
			if ( first < f-1  ) st.push( [first,f-1] );
			flgCont = false;
		}
		else
		{
			let a = tbl[f]; 
			tbl[f] = tbl[l]; 
			tbl[l] = a;
			f++; 
			l--;
			flgCont = true;
			this.flgUpdate = true;
			this.cntUpdate++;
		}
		return (flgCont == true || st.length > 0);
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}
}

//-----------------------------------------------------------------------------
function mergesort_create( _tbl )
//-----------------------------------------------------------------------------
{
	let tbl = _tbl.concat();
	let st = [];
	let wrk = new Array( tbl.length );
	let idx = 0;	
	st.push( [0, tbl.length-1] );
	while( idx < st.length )
	{	
		let [first,last] = st[idx++];
		if ( first < last )	
		{
			let m = Math.floor((first+last)/2);
			st.push( [first, m] );
			st.push( [m+1, last] );
		}
		else
		{
			break;
		}
	}
	let flgCont = false;
	let first = 0;
	let last = 0;
	let m = 0;
	let p = 0;
	let q = 0;
	let l = 0;
	let f = 0;
	function stepSort()
	{
		this.flgUpdate = false;
		if ( flgCont == false && st.length > 0 )
		{
			[first,last] = st.pop();
			m = Math.floor((first+last)/2);
			p = 0;
			q = 0;
			for ( let f = first ; f <= m ; f++ ) wrk[q++] = tbl[f];
			l = m +1;
			f = first;
		}
		if ( p < q )
		{
			if ( l <= last )
			{
				if ( wrk[p] < tbl[l] ) 
				{
					tbl[f++] = wrk[p++];
				}
				else
				{
				   tbl[f++] = tbl[l++];
				}
			}
			else
			{
					tbl[f++] = wrk[p++];
			}
			this.flgUpdate = true;
			this.cntUpdate++;
		}
		if ( p < q ) flgCont = true; else flgCont = false;
		return (flgCont == true || st.length > 0);
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}
}
//-----------------------------------------------------------------------------
function insertsort_create( _tbl )	
//-----------------------------------------------------------------------------
{
	let tbl = _tbl.concat();
	let flgCont = false;
	let x = 0;
	let i = 1;
	let j = 0;
	function stepSort()
	{
		this.flgUpdate = false;
		if (flgCont == false && i >= tbl.length) return false;

		if ( flgCont == false && i < tbl.length )
		{
			x = tbl[i];
			j = i-1;
		}
		if( j >= 0 && tbl[j] > x )
		{
			tbl[j+1]=tbl[j];
			j--;
			flgCont = true;
		}
		else
		{
			flgCont = false;
			tbl[j+1]=x;
			i++;
		}
		this.flgUpdate=true;
		this.cntUpdate++;
		return true;
	}
	return {
		tbl:tbl,
		stepSort:stepSort,
		flgUpdate:false,
		cntUpdate:0,
	}	
}

let	bubblesort;
let	unknown;
//let	testsort;
//let	heapsort;
let	imapsort;
let	quicksort;
let	mergesort;
let	insertsort;
let g_flgUpdate = false;
//-----------------------------------------------------------------------------
function setup()
//-----------------------------------------------------------------------------
{
	let num = document.getElementById( "html_num" ).value*1;
	let ran = document.getElementById( "html_ran" ).value*1;
	if ( ran > 100 ) ran=100;
	if ( ran < 0) ran=0;
	document.getElementById( "html_ran" ).value = ran;
	let flgRev = document.getElementsByName( "html_reverce" )[0].checked ;


	let tbl = [];

	if ( flgRev )
	{
		for ( let i = 0 ; i < num ; i++ ) tbl[i]=Math.floor(num-1-i);
	}	
	else
	{
		for ( let i = 0 ; i < num ; i++ ) tbl[i]=i;
	}

//	tbl = shuffle( tbl );
	tbl = shuffle_num( tbl, Math.floor(num*ran/100) );
	bubblesort = bubblesort_create( tbl );
	unknown = unknown_create( tbl );
//	testsort = testsort_create( tbl );
//	heapsort = heapsort_create( tbl );
	imapsort = imapsort_create( tbl );
	quicksort = quicksort_create( tbl );
	mergesort = mergesort_create( tbl );
	insertsort = insertsort_create( tbl );


//	while( heapsort.stepSort() );
	}

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	g_flgUpdate = true;
	setup();
	
	drawscene();

}
//-----------------------------------------------------------------------------
function drawscene()
//-----------------------------------------------------------------------------
{ 
	while( bubblesort.stepSort() ) if ( bubblesort.flgUpdate ) break;
	while( unknown.stepSort() ) if ( unknown.flgUpdate ) break;
//	while( testsort.stepSort() ) if ( testsort.flgUpdate ) break;
	while( imapsort.stepSort() ) if ( imapsort.flgUpdate ) break;
	while( quicksort.stepSort() ) if ( quicksort.flgUpdate ) break;
	while( mergesort.stepSort() ) if ( mergesort.flgUpdate ) break;
	while( insertsort.stepSort() ) if ( insertsort.flgUpdate ) break;
	draw();

	if( g_flgUpdate ) window.requestAnimationFrame( drawscene );
}
//-----------------------------------------------------------------------------
function draw()
//-----------------------------------------------------------------------------
{
	drawcircle( g1, imapsort.tbl,"inverse mapping sort",""+imapsort.cntUpdate );
	drawcircle( g2, quicksort.tbl, "quick sort" ,""+quicksort.cntUpdate);
	drawcircle( g3, mergesort.tbl, "merge sort",""+mergesort.cntUpdate );
	drawcircle( g4, unknown.tbl,"unknown sort",""+unknown.cntUpdate);
	drawcircle( g5, bubblesort.tbl,"bubble sort",""+bubblesort.cntUpdate);
	drawcircle( g6, insertsort.tbl,"insert sort",""+insertsort.cntUpdate);
//	drawcircle( g7, heapsort.tbl,"heap sort",""+heapsort.cntUpdate);
//	drawcircle( g8, testsort.tbl,"test sort",""+testsort.cntUpdate);
}

//-----------------------------------------------------------------------------
function html_sort()
//-----------------------------------------------------------------------------
{
	g_flgUpdate = true;
	drawscene();
}

//-----------------------------------------------------------------------------
function html_shuffle()
//-----------------------------------------------------------------------------
{
	g_flgUpdate = false;
	setup();
	draw();
}
