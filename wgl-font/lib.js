// 2022/12/03	上位ライブラリFNT追加
// 2022/11/28	gl_font_prints 追加
// 2022/11/25	retrogra_create	追加
// 2022/11/10	font実装用にcv_関数などと追加
// 2022/11/03	html_系追加。<table>用
// 2022/10/30	gra3dをgl_drawmMdlに対応、tvram,bloomが動かなくなっていたので修正。fontの表示座標を上下反転
// 2022/10/29	font表示
// 2022/10/27	tvramを追加
// 2022/10/27	gl_???? webglを簡易に使うための、低次元関数群の追加
// 2022/10/20	create_model
// 2022/09/14	pad のボタンンお名前を大文字2字に変更、Xinputに変更
// 2022/07/19	vmul_Qv追加
// 2022/06/30	Quaternion functionsを追加
// 2022/06/26	invertsの誤字をinverseに直す
// 2022/06/26	pad:repQの追加
// 2022/06/15	pad_create にrepeat入力を追加。nowに仕様変更
// 2022/06/15	gra.backcolorの仕様変更（合成できるように）
// 2022/06/13	pad の仕様変更a b x y ⇨ rd rr rr ru
// 2022/06/10	ggra3d追加 
// 2022/06/10	cam追加 
// 2022/06/09	rand追加
// 2022/02/24	gra.printの座標をwindow座標に変更
// 2022/02/22	html関数群追加
// 2022/02/18	html _...関連を一旦全廃
// 2022/01/24	html _...関連の廃止＆リネーム
// 2022/01/20	..._rgbなど廃止名前変更
// 2022/01/18	html _radio_set htmlアクセス関係関数を追加
// 2021/12/26	gra.color_rgb,gra.backcolor_rgb
// 2021/12/26	graアスペクト、アジャストのデフォルトを変更gra.asp,gra.adj
// 2021/11/29	strfloatで-0.2などを入れると正常動作しないバグを修正
// 2021/11/16	refract2( I, N, eta ) 追加
// 2021/11/01	gra.color_row追加
// 2021/10/31	gra.line_pictgram 追加
// 2021/10/31	strfloatで0.99999999などを入れると正常動作しないバグを修正
// 2021/10/17	gra.line_spring 追加 drawbane2d廃止
// 2021/10/15	ene_create 引数変更
// 2021/10/12	strfloatで1e-33などを入れると正常動作しないバグを修正
// 2021/10/03	ene.prot_entry を追加
// 2021/10/01	ene reset、最大最小設定を止める
// 2021/10/01	ene reset、最大最小設定、サンプリング時間を設定できるように
// 2021/09/20	symbolも文字設定
// 2021/08/16	ene 追加 oscillo 削除
// 2021/08/15	oscillo timemax 追加
// 2021/08/15	oscillo_create オシロスコープのように波形を描画
// 2021/08/15	gra アスペクト周りバグ取り
// 2021/08/13	gra.pset() 追加/ gra.setAspect()追加
// 2021/08/08	gra.drawmesure_line追加 strfloat追加
// 2021/08/06	gra.drawbane2d drawarrow2d drawarrow2d_line追加
// 2021/08/05	gra.fill の修正
// 2021/08/03	vec2 vrot2 二次元回転関数 追加
// 2021/07/30	gra.drawpictgrambone ピクトグラム風、円が二つ連なった図形の描画
// 2021/07/29	gra.bezier_n 追加
// 2021/07/29	gra windowとcanvasのアスペクト比を反映
// 2021/07/26	se 効果音ライブラリ
// 2021/07/24	KEY追加
// 2021/07/23	半直線と点との距離,	線分と点との距離,直線と直線の距離,半直線と線分の距離,線分と線分の距離 関数追加
// 2021/07/23	pad_create ゲームパッド入力ライブラリ追加
// 2021/07/22	gra フルスクリーン用にアスペクト機能を追加
// 2021/07/19	ver1.12 gra backcolor()追加
// 2021/07/10	ver1.11 フォント送りサイズ変更
// 2021/07/10	ver1.10 gra.alpha追加
// 2021/07/02	ver1.09 geom 2021/07/02 vec2追加 gra_create 追加
// 2021/05/28	ver1.08	行列式のコメント追加
// 2021/05/26	ver1.07	minverse再びアルゴリズム交換
// 2021/05/25	ver1.06	minverse別のアルゴリズムに交換
// 2021/05/24	ver1.05	行列のコメントを修正
// 2021/05/23	ver1.04	列優先バグ修正vec4->vec3
// 2021/05/17	ver1.03	mrotx / vrotx 等、名称変更
// 2021/05/09	ver1.02	minverts追加、mlookat変更
// 2021/05/07	ver1.01	デバッグ、vec3対応
// 2021/05/06	ver1.00	分離
//
//	行列ライブラリコンセプト
//	GLSLと同じ数式同じ行列がメインプログラムでも同様に機能する
//
// OpenGL® Programming Guide: The Official Guide 
// https://www.cs.utexas.edu/users/fussell/courses/cs354/handouts/Addison.Wesley.OpenGL.Programming.Guide.8th.Edition.Mar.2013.ISBN.0321773039.pdf
"use strict";

function pad_create2( rep1=8, rep2=2 )	// 2021/07/23 追加	2022/06/16大幅変更
{
}
function VertPC( p, c )	// 頂点型
{
	return {"pos":p, "col":c};	// vec4 pos , vec3 col;
}




	//-----------------------------------------------------------------------------
	let gra3d_pers = function( P, V, v )	// vec3 v
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let s2 = vec4( v.x, v.y, v.z, 1 );
		s2 = vec4_vmul_Mv( V ,s2 );
		s2 = vec4_vmul_Mv( P ,s2 );
		return s2;
	}
	//-----------------------------------------------------------------------------
	let gra3d_pers2d = function( P, V, vt )	// vec3 v 2Dcanvasの座標系に変換
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let v = gra3d_pers( P, V, vt );

		let W	= gl.canvas.width/2;
		let H	= gl.canvas.height/2;
		let px	=  (v.x/v.w)*W+W;	
		let py	= -(v.y/v.w)*H+H;	
		return vec2(px,py);
	}
	//-----------------------------------------------------------------------------
	let gra3d_persScreen = function( P, V,vt )	// vec3 v 2Dcanvasの座標系に変換
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let v = gra3d_pers( P, V, vt );

		let px	=  (v.x/v.w);	
		let py	=  (v.y/v.w);	
		let pz	=  (v.z);	
		return vec3(px,py,pz);
	}
	//-----------------------------------------------------------------------------
	let gra3d_line = function( gl, orgmesh, s, e, col, P, V )	// vec3 s, vec3 e, [n,n,n] col
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let s3 = {"pos":gra3d_pers(P, V,s), "col":col};
		let e3 = {"pos":gra3d_pers(P, V,e), "col":col};
		orgmesh_entry_LINE( gl, orgmesh, s3, e3 );
	}

	//-----------------------------------------------------------------------------
	let gra3d_getScreenPos_vec2 = function( P, V, vt )	//  vec4 v return vec2
	//-----------------------------------------------------------------------------
	{
		let v = vcopy4(vr);
		// 透視変換	//pos = PVMv;
		v = vec4_vmul_Mv( V ,v );
		v = vec4_vmul_Mv( P ,v );

		let W	= gl.canvas.width/2;
		let H	= gl.canvas.height/2;
		let px	=  (v.x/v.w)*W+W;	
		let py	= -(v.y/v.w)*H+H;	
		return vec2(px,py);
	}

//-----------------------------------------------------------------------------
function cam_create( pos, at, fovy, near=1.0, far=1000.0 )
//-----------------------------------------------------------------------------
{
	let body = {};
	body.pos	= pos;		// vec3
	body.at		= at;		// vec3
	body.fovy	= fovy;		// 単位は弧度
	body.near	= near;
	body.far	= far;
	//

	return body;

	// サンプル
	// 	let cam = cam_create( vec3(  0, 2.5, 10 ), vec3( 0, 2.5,0 ), 28, 1.0,1000.0  );
	// プロジェクション計算
	//	let P = mperspective( cam.fovy,  gl.canvas.width/ gl.canvas.height, cam.near, cam.far );
	// ビュー計算
	//	let V= mlookat( cam.pos, cam.at );
}

//-----------------------------------------------------------------------------
function rand_create( type = "xorshift32" ) //2022/06/09
//-----------------------------------------------------------------------------
{
	let body = {};
	switch( type )
	{
	case "xorshift32":			//xorshift32 再現性のあるランダム
		body.y = 2463534242;
		body.random = function()
		{
			body.y = body.y ^ (body.y << 13); 
			body.y = body.y ^ (body.y >> 17);
			body.y = body.y ^ (body.y << 5);
			return Math.abs(body.y/((1<<31)));
		}
		break;

	case "Math":				// javascript Math
		body.random = function()
		{
			return Math.random();
		}
		break;

	default:					
		alert("rand_create ERROR : "+ type );

	}
	return body.random;
}

//-----------------------------------------------------------------------------
// html への書き換えタイミングを管理したり、読込タイミングを管理したり
//-----------------------------------------------------------------------------

function REQ( cmd, params )
{
	return {cmd:cmd, params:params};
}
//-----------------------------------------------------------------------------
function html_addTable( idname )
//-----------------------------------------------------------------------------
{
	let table = document.createElement("table");
	document.getElementById( idname ).appendChild( table );
	return table;  
}
//-----------------------------------------------------------------------------
function html_addRow( table )
//-----------------------------------------------------------------------------
{
	let row = table.insertRow(-1);  // -1 は後ろに追加
	return row;
}
//-----------------------------------------------------------------------------
function html_addCell( row, str, col="#ddd" )
//-----------------------------------------------------------------------------
{
	let cell = row.insertCell(-1); // -1 は後ろに追加
	cell.appendChild( document.createTextNode( str ) );
	cell.style.backgroundColor = col; // ヘッダ列
	return cell;
}
//-----------------------------------------------------------------------------
function html_addCells( table, strs, cols )
//-----------------------------------------------------------------------------
{
	let row = html_addRow( table );
	let col0 = "#fff";
	for ( let i = 0 ; i < strs.length ; i++ )
	{
		let str = strs[i];
		let col = cols[i];
		if ( !col ) col = col0;
		html_addCell( row, str ,col );
		col0 = col;
	}
}

let html =
{
	/*sample
		html.param =  
		{
		//  name                  default	    種類                書き換えリクエスト
			"html_deep_BLACK"	:{val:2			,type:"textbox"		,reqWrite:true},
			"html_deep_WHITE"	:{val:2			,type:"textbox"		,reqWrite:true},
	
			"html_canput"		:{val:false		,type:"checkbox"	,reqWrite:true},
			"html_untakable"	:{val:true		,type:"checkbox"	,reqWrite:true},
			"html_showeva"		:{val:true		,type:"checkbox"	,reqWrite:true},
			"html_debug_d"		:{val:true		,type:"checkbox"	,reqWrite:true},
			"html_quick"		:{val:true		,type:"checkbox"	,reqWrite:true},
			"html_one"			:{val:true		,type:"checkbox"	,reqWrite:true},

			"html_BLACK"		:{val:"hum"		,type:"selectbox"	,reqWrite:true},
			"html_WHITE"		:{val:"hum"		,type:"selectbox"	,reqWrite:true},
			"html_HELP"			:{val:"com-L3"	,type:"selectbox"	,reqWrite:true},
			
			"html_delay"		:{val:""		,type:"innerHTML"	,reqWrite:true},
			"html_cnt"			:{val:""		,type:"innerHTML"	,reqWrite:true},
			"html_error"		:{val:""		,type:"innerHTML"	,reqWrite:true},
			"html_eva"			:{val:""		,type:"innerHTML"	,reqWrite:true},
			"html_textarea"		:{val:"白d2白c3黒d3白e3白b4白c4白d4白e4白f4黒d5黒e5黒f5黒g5黒h5黒e6白f6黒g6白e7白f7白f8:黒"	,type:"textbox"		,reqWrite:true},
			"html_innerhtml"	:{val:""		,type:"innerHTML"	,reqWrite:true},

		};
	*/
	"param":{},

	//---------------------------------------------------------------------
	"entry":function( name, type, val ) 		
	//---------------------------------------------------------------------
	{
		html.param[ name ] = {type:type, val:val};

		// HTMLと連動しているかどうかのチェック
		{
			html.param[ name ].isHtml = false;


			switch( html.param[name].type )
			{
				case "textbox":		//<input type=="text">	
				case "innerHTML":	//<a id="????" value="???"></a>
				case "selectbox":	//<select id="????"><option value="?????">...</select>
					// HTML内にIDが存在するか
					if ( document.getElementById( name ) ) html.param[ name ].isHtml = true;
					break;

				case "radiobutton":	//<input type=="radio">
				case "checkbox":	//<input type=="checkbox">
					// HTML内にNameが存在するか
					if ( document.getElementsByName( name ).length > 0  ) html.param[ name ].isHtml = true;
					break;

				default:
					console.error("未宣言のHTML部品:"+name+","+type);
			}
		}

	},
	//---------------------------------------------------------------------
	"get":function( name ) 		
	//---------------------------------------------------------------------
	{
		return html.param[name].val;
	},
	//---------------------------------------------------------------------
	"set":function( name, val ) 
	//---------------------------------------------------------------------
	{
		html.param[name].val = val;
		if ( this.param[ name ].isHtml == true ) html.write( name );
	},
	//---------------------------------------------------------------------
	"add":function( name, val ) 
	//---------------------------------------------------------------------
	{
		html.param[name].val += val;
	},
	//---------------------------------------------------------------------
	"read":function( name ) // HTML(あれば）から取得
	//---------------------------------------------------------------------
	{
		if ( html.param[ name ].isHtml == true )
		{
			let val = html.param[name].val;
			switch( html.param[name].type )
			{
				case "textbox":		val = html.getById_textbox( name, val );		break;
				case "innerHTML":	val = html.getById_innerHTML( name, val );		break;
				case "radiobutton":	val = html.getByName_radiobuton( name, val );	break;
				case "checkbox":	val = html.getByName_checkbox( name, val );		break;
				case "selectbox":	val = html.getById_selectbox( name, val );		break;
				default:
					console.error("error 未宣言のHTML部品が使われた:"+html.param[name].type );
			}

			html.param[name].val = val;
		}
	
	},
	//---------------------------------------------------------------------
	"write":function( name ) // HTML(あれば） に反映
	//---------------------------------------------------------------------
	{
		if ( this.param[ name ].isHtml == true )
		{
			
			let val = html.param[name].val;
			switch( html.param[name].type )
			{
				case "textbox":		html.setById_textbox( name, val );			break;
				case "innerHTML":	html.setById_innerHTML( name, val );		break;
				case "radiobutton":	html.setByName_radiobuton( name, val );		break;
				case "checkbox":	html.setByName_checkbox( name, val );		break;
				case "selectbox":	html.setById_selectbox( name, val );		break;
				default:
					console.error("error 未宣言のHTML部品が使われた:"+name+","+html.param[name].type );
			}
		}
	
	},
	//---------------------------------------------------------------------
	"read_all":function( name )
	//---------------------------------------------------------------------
	{
		if ( name )
		{
				html.read( name );
		}
		else
		{
			for ( let name of Object.keys(html.param) )
			{
				html.read( name );
			}
		}
	},
	//---------------------------------------------------------------------
	"write_all":function()		// init() か update()に改名を検討
	//---------------------------------------------------------------------
	{
		for ( let name of Object.keys(html.param) )
		{
			html.write( name );
		}

	},
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
	"getByName_radiobuton":function( name, val )
	//---------------------------------------------------------------------
	{
		var list = document.getElementsByName( name ) ;
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
		var list = document.getElementsByName( name ) ;
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
	"getByName_checkbox":function( name, val )
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
		var select = document.getElementById(name);
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

let original_width = null;
let original_height = null;
//-----------------------------------------------------------------
function cv_execFullscreen( name_canvas )
//-----------------------------------------------------------------
{
	let cv = window.document.getElementById( name_canvas );

	if ( original_width == null ) original_width = cv.width;		// 最初にフルスクスクリーンが起動するときの値を覚えておく
	if ( original_height == null ) original_height = cv.height;

	let req = 
		cv.requestFullScreen ||			//for chrome/edge/opera/firefox
		cv.webkitRequestFullscreen ||	//for chrome/edge/opera
		cv.webkitRequestFullScreen ||	//for chrome/edge/opera
		cv.mozRequestFullScreen ||		//for firefox
		cv.msRequestFullscreen;			//for IE

    if( req ) 
    {
		function callback()
		{
			if ( window.document.fullscreenElement ||	window.document.webkitFullscreenElement )
			{
				// 入るとき
				let W1 = window.screen.width;		//スクリーンサイズ(インスペクターが開いている場合等、画面サイズとは限らない）
				let H1 = window.screen.height;	
//				let W1 = window.outerWidth;		//スクリーンサイズ(インスペクターが開いている場合等、画面サイズとは限らない）
//				let H1 = window.outerHieght;	
				let W0 = original_width;			//canvas初期設定サイズ
				let H0 = original_height;		
				let w = W0;
				let h = H0;
				while( w<W1-W0 && h <H1-H0 )		//整数倍で最も大きくとれるサイズを求める
				{
					w += W0;
					h += H0;
				}
				cv.width = w;
				cv.height = h;
			}
			else
			{
				// 戻るとき
				cv.width = original_width;
				cv.height = original_height;
			}
		}
		window.document.addEventListener("fullscreenchange", callback, false);			// for firefox
		window.document.addEventListener("webkitfullscreenchange", callback, false);	// for chrome/edge/opera
		req.apply( cv );
    }
    else
    {
		alert("このブラウザはフルスクリーンに対応していません");
    }
}

//-----------------------------------------------------------------------------
function strfloat( v, r=7, f=2 ) // v値、r指数部桁、f小数部桁
//-----------------------------------------------------------------------------
{
	let a = Number.parseFloat(v).toFixed(f);
	let b = r+f+1 - a.length;
	if ( b > 0 )
	{
		a = ' '.repeat(b)+a;
	}
	return a;
}

//-----------------------------------------------------------------------------
function se_create()	// 2021/07/26 効果音ライブラリ
//-----------------------------------------------------------------------------
{
	let se = {};
	let	audioctx
	let analyser;

	//-----------------------------------------------------------------------------
	se.play = function( freq1,len1,freq2,len2, type = 'square', vol=0.5) 
	//-----------------------------------------------------------------------------
	{
		// 二つの周波数の音を繋げて鳴らす、簡易効果音再生
		// 音程周波数1(Hz),長さ1(s),音程周波数2(Hz),長さ2(s),音色タイプ,ボリューム

		//type = "triangle";
		//type = "sawtooth";
		//type = "sine";
		//type = "square";
		// 最初の初期化。起動時に同時に行うとwarnningが出るため、最初に鳴らすときに行う
		if ( audioctx == undefined )
		{
			let	func = window.AudioContext || window.webkitAudioContext;
			audioctx = new func();
		}
		if ( analyser == undefined )
		{
			analyser = audioctx.createAnalyser();
			analyser.connect( audioctx.destination );
		}
		//--

		let t0 = audioctx.currentTime;			// コンテクストが作られてからの経過時間(s)
		let t1 = t0 + len1;
		let t2 = t1 + len2;

		let oscillator = audioctx.createOscillator();
		let gain = audioctx.createGain();

		oscillator.type = type;
		oscillator.frequency.setValueAtTime( freq1, t0 );
		oscillator.frequency.setValueAtTime( freq2, t1 );
		oscillator.start( t0 );
		oscillator.stop( t2 );
		oscillator.connect( gain );

		gain.gain.setValueAtTime( vol, t0 );
		gain.gain.setValueAtTime( vol, t1 );
		gain.gain.linearRampToValueAtTime( 0, t2 );	//前にスケジュールされているパラメーター値から指定された値まで、直線的に連続して値を変化させる
		gain.connect( analyser );
	}

	return se;
}

//------------------------------------------------------------------------------
function func_intersect_Line_Point2( P0, I0, P1 )	// 直線と点との距離
//------------------------------------------------------------------------------
{
	// P0:始点
	// I0:方向（単位ベクトル）
	// P1:点
	// Q :衝突点
	// t :P0からQまでの距離

	let I1 = vsub2(P1 , P0);
	let t = dot2(I0,I1);	// P0からQまでのQ距離
	let Q = vadd2( P0, vmul_scalar2(I0,t));
	let	d =  length2(vsub2(Q , P1));
	return [true,d,Q,t];
}

//------------------------------------------------------------------------------
function func_intersect_HarfLine_Point2( P0, I0, P1 )	// 半直線と点との距離 2021/07/23
//------------------------------------------------------------------------------
{
	let [flg,d,Q,t] = func_intersect_Line_Point2( P0, I0, P1 );

	if ( t <= 0 ) flg = false; 			// 始点トリミング：範囲外でも使える衝突点等の値が返る

	return [flg,d,Q,t];
}

//------------------------------------------------------------------------------
function func_intersect_SegLine_Point2( P0, Q0, P1 )	// 線分と点との距離 2021/07/23
//------------------------------------------------------------------------------
{
	// P0:始点
	// Q0:終点
	// P1:点
 	let L = vsub2(Q0 , P0)
 	let I0 = normalize2(L)

	let [flg,d,Q,t] = func_intersect_Line_Point2( P0, I0, P1 );
	if ( t <= 0 ) flg = false; 			// 始点トリミング：範囲外でも使える衝突点等の値が返る
	if ( t >= length2(L) ) flg = false;	// 終点トリミング：範囲外でも使える衝突点等の値が返る

	return [flg,d,Q,t];
}


//------------------------------------------------------------------------------
function func_intersect_Line_Line2( P0, I0, P1, I1 ) // 直線と直線の距離 2021/07/23
//------------------------------------------------------------------------------
{
	if ( (I0.x==0 && I0.y==0) || (I1.x==0 && I1.y==0) ) return [false,0,vec2(0,0),vec2(0,0),0,0];

	//    P0       P1
	//    |        |
	//    |}t0     |}t1(時間:Iベクトル方向、負の数ならP1より前)
	//    |        |
	// Q0 +--------+ Q1(衝突位置)
	//    |        |
	//    v        v
	//    I0       I1 (I0,I1は単位ベクトル)
	//
	//	交点ができたときは、Q0=Q1 , d=0 になる

	if (  cross2( I0, I1 ) == 0 ) // 平行だった時
	{
		let Q0 = vec2(0.0);
		let Q1 = vec2(0.0);
		let d = Math.abs( cross2( vsub2(P1 , P0), I0 ) );	// func_intersect_Line_Point2():点と線との距離
		return [false,d,Q0,Q1,0,0];
	}

	let d0 = dot2( vsub2(P1 , P0), I0 );
	let d1 = dot2( vsub2(P1 , P0), I1 );
	let d2 = dot2( I0, I1 );

	let t0 = ( d0 - d1 * d2 ) / ( 1.0 - d2 * d2 );
	let t1 = ( d1 - d0 * d2 ) / ( d2 * d2 - 1.0 );

	let	Q0 = vadd2(P0 , vmul_scalar2(I0,t0));
	let	Q1 = vadd2(P1 , vmul_scalar2(I1,t1));
	let	d =  length2(vsub2(Q1 , Q0));

	return [true,d,Q0,Q1,t0,t1];
}
//------------------------------------------------------------------------------
function func_intersect_HarfLine_HarfLine2( P0, I0, P1, I1 )	//2021/07/23 半直線と線分の距離
//------------------------------------------------------------------------------
{
	if ( (I0.x==0 && I0.y==0) || (I1.x==0 && I1.y==0) ) return [false,0,vec2(0,0),vec2(0,0),0,0];

	// 半直線と線分の距離
	// 半直線   : P0+I0
	// 半直線   : p1+I1
	// 距離     : d = |Q1-Q0|
	// 戻り値   : d距離 Q0,Q1	※false でもdだけは取得できる
	
	let [flg,d,Q0,Q1,t0,t1] = func_intersect_Line_Line2( P0, I0, P1, I1 );

	if ( flg )
	{
		// 半直線
		if ( t0 < 0 ) flg = false;
		if ( t1 < 0 ) flg = false;
	}

	return [flg,d,Q0,Q1,t0,t1];
}
//------------------------------------------------------------------------------
function func_intersect_SegLine_SegLine2( p0, q0, p1, q1 )	//2021/07/23 線分と線分の距離
//------------------------------------------------------------------------------
{
	if ( q0.x == p0.x && q0.y == p0.y || q1.x == p1.x && q1.y == p1.y ) return [false,0,vec2(0,0),vec2(0,0),0,0];

	// 線分と線分の距離
	// 線分0開始: p0
	// 線分0終了: q0
	// 線分1開始: p1
	// 線分1終了: q1
	// 距離     : d = |Q1-Q0|
	// 戻り値   : d距離 Q0,Q1	※false でもdだけは取得できる
	
	let	P0 = p0;
	let	I0 = normalize2( vsub2(q0,p0) );
	let	P1 = p1;
	let	I1 = normalize2( vsub2(q1,p1) );

	let [flg,d,Q0,Q1,t0,t1] = func_intersect_Line_Line2( P0, I0, P1, I1 );

	if ( flg )
	{
		// 線分処理
		if ( t1 < 0 ) flg = false;
		if ( t1 > length2(vsub2(q1,p1)) ) flg = false;

		// 線分処理
		if ( t0 < 0 ) flg = false;
		if ( t0 > length2(vsub2(q0,p0)) ) flg = false;

	}

	return [flg,d,Q0,Q1,t0,t1];
}

//-----------------------------------------------------------------------------
function pad_create( rep1=8, rep2=2 )	// 2021/07/23 追加	2022/06/16大幅変更
//-----------------------------------------------------------------------------
{
	// PS4パッド、XBOX one パッド、switchパッドでは同じように使える様子
	// 電源ボタン,L3R3アナログボタン押し込み、メニューボタンのようなものは使えず。button[16]もバッファはあるけどアサインは不明

	function buttons_create()
	{
		let data =
		{
			keyFirstKey	: 7,
			keySecoundKey	: 1,
			now:
			{
				LX:0,
				LY:0,
				RX:0,
				RY:0,
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:0,
				R2:0,
				L3:0,
				R3:0,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			prev:
			{
				LX:0,
				LY:0,
				RX:0,
				RY:0,
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:0,
				R2:0,
				L3:0,
				R3:0,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			trig:
			{
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:false,
				R2:false,
				L3:false,
				R3:false,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			release:
			{
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:false,
				R2:false,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			rep:	//	リピートからは設定値
			{
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:false,
				R2:false,
				L3:false,
				R3:false,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			lim:
			{
				RD:0,
				RR:0,
				RL:0,
				RU:0,
				L1:0,
				R1:0,
				L2:0,
				R2:0,
				L3:0,
				R3:0,
				SE:0,
				ST:0,
				LU:0,
				LD:0,
				LL:0,
				LR:0,
			},
			repQ:	// リピートからは最短
			{
				RD:false,
				RR:false,
				RL:false,
				RU:false,
				L1:false,
				R1:false,
				L2:false,
				R2:false,
				L3:false,
				R3:false,
				SE:false,
				ST:false,
				LU:false,
				LD:false,
				LL:false,
				LR:false,
				count:0,
			},
			limQ:
			{
				RD:0,
				RR:0,
				RL:0,
				RU:0,
				L1:0,
				R1:0,
				L2:0,
				R2:0,
				L3:0,
				R3:0,
				SE:0,
				ST:0,
				LU:0,
				LD:0,
				LL:0,
				LR:0,
			}
		}
		return data;		
	}
	function	buttons_assign_common( data, border )
	{

		data.trig.RD = (data.now.RD == true ) && ( data.prev.RD == false );
		data.trig.RR = (data.now.RR == true ) && ( data.prev.RR == false );
		data.trig.RL = (data.now.RL == true ) && ( data.prev.RL == false );
		data.trig.RU = (data.now.RU == true ) && ( data.prev.RU == false );
		data.trig.L1 = (data.now.L1 == true ) && ( data.prev.L1 == false );
		data.trig.R1 = (data.now.R1 == true ) && ( data.prev.R1 == false );
		data.trig.L2 = (data.now.L2 >= 1.0 ) && ( data.prev.L2 < 1.0 );
		data.trig.R2 = (data.now.R2 >= 1.0 ) && ( data.prev.R2 < 1.0 );
		data.trig.L3 = (data.now.L3 == true ) && ( data.prev.L3 == false );
		data.trig.R3 = (data.now.R3 == true ) && ( data.prev.R3 == false );
		data.trig.SE = (data.now.SE == true ) && ( data.prev.SE == false );
		data.trig.ST = (data.now.ST == true ) && ( data.prev.ST == false );
		data.trig.LU  = (data.now.LU  == true ) && ( data.prev.LU  == false );
		data.trig.LD  = (data.now.LD  == true ) && ( data.prev.LD  == false );
		data.trig.LL  = (data.now.LL  == true ) && ( data.prev.LL  == false );
		data.trig.LR  = (data.now.LR  == true ) && ( data.prev.LR  == false );

		data.release.ud = (data.now.ud == false ) && ( data.prev.ud == true );
		data.release.RR = (data.now.RR == false ) && ( data.prev.RR == true );
		data.release.RL = (data.now.RL == false ) && ( data.prev.RL == true );
		data.release.RU = (data.now.RU == false ) && ( data.prev.RU == true );
		data.release.L1 = (data.now.L1 == false ) && ( data.prev.L1 == true );
		data.release.R1 = (data.now.R1 == false ) && ( data.prev.R1 == true );
		data.release.SE = (data.now.SE == false ) && ( data.prev.SE == true );
		data.release.ST = (data.now.ST == false ) && ( data.prev.ST == true );
		data.release.LU  = (data.now.LU  == false ) && ( data.prev.LU  == true );
		data.release.LD  = (data.now.LD  == false ) && ( data.prev.LD  == true );
		data.release.LL  = (data.now.LL  == false ) && ( data.prev.LL  == true );
		data.release.LR  = (data.now.LR  == false ) && ( data.prev.LR  == true );

		{//repeat trx
			data.rep.RD = data.trig.RD;
			data.rep.RR = data.trig.RR;
			data.rep.RL = data.trig.RL;
			data.rep.RU = data.trig.RU;
			data.rep.L1 = data.trig.L1;
			data.rep.R1 = data.trig.R1;
			data.rep.L2 = data.trig.L2;
			data.rep.R2 = data.trig.R2;
			data.rep.L3 = data.trig.L3;
			data.rep.R3 = data.trig.R3;
			data.rep.SE = data.trig.SE;
			data.rep.ST = data.trig.ST;
			data.rep.LU  = data.trig.LU;
			data.rep.LD  = data.trig.LD;
			data.rep.LL  = data.trig.LL;
			data.rep.LR  = data.trig.LR;

			if( data.lim.RD > 0 ) if ( --data.lim.RD <= 0 ) if ( data.now.RD ) {data.lim.RD=data.keySecoundKey; data.rep.RD = true;}
			if( data.lim.RR > 0 ) if ( --data.lim.RR <= 0 ) if ( data.now.RR ) {data.lim.RR=data.keySecoundKey; data.rep.RR = true;}
			if( data.lim.RL > 0 ) if ( --data.lim.RL <= 0 ) if ( data.now.RL ) {data.lim.RL=data.keySecoundKey; data.rep.RL = true;}
			if( data.lim.RU > 0 ) if ( --data.lim.RU <= 0 ) if ( data.now.RU ) {data.lim.RU=data.keySecoundKey; data.rep.RU = true;}
			if( data.lim.L1 > 0 ) if ( --data.lim.L1 <= 0 ) if ( data.now.L1 ) {data.lim.L1=data.keySecoundKey; data.rep.L1 = true;}
			if( data.lim.R1 > 0 ) if ( --data.lim.R1 <= 0 ) if ( data.now.R1 ) {data.lim.R1=data.keySecoundKey; data.rep.R1 = true;}
			if( data.lim.L2 > 0 ) if ( --data.lim.L2 <= 0 ) if ( data.now.L2 >0.0 ) {data.lim.L2=data.keySecoundKey; data.rep.L2 = true;}
			if( data.lim.R2 > 0 ) if ( --data.lim.R2 <= 0 ) if ( data.now.R2 >0.0 ) {data.lim.R2=data.keySecoundKey; data.rep.R2 = true;}
			if( data.lim.L3 > 0 ) if ( --data.lim.L3 <= 0 ) if ( data.now.L3 ) {data.lim.L3=data.keySecoundKey; data.rep.L3 = true;}
			if( data.lim.R3 > 0 ) if ( --data.lim.R3 <= 0 ) if ( data.now.R3 ) {data.lim.R3=data.keySecoundKey; data.rep.R3 = true;}
			if( data.lim.SE > 0 ) if ( --data.lim.SE <= 0 ) if ( data.now.SE ) {data.lim.SE=data.keySecoundKey; data.rep.SE = true;}
			if( data.lim.ST > 0 ) if ( --data.lim.ST <= 0 ) if ( data.now.ST ) {data.lim.ST=data.keySecoundKey; data.rep.ST = true;}
			if( data.lim.LU >= 0 ) if ( --data.lim.LU  <= 0 ) if ( data.now.LU  ) {data.lim.LU =data.keySecoundKey; data.rep.LU  = true;}
			if( data.lim.LD >= 0 ) if ( --data.lim.LD  <= 0 ) if ( data.now.LD  ) {data.lim.LD =data.keySecoundKey; data.rep.LD  = true;}
			if( data.lim.LL >= 0 ) if ( --data.lim.LL  <= 0 ) if ( data.now.LL  ) {data.lim.LL =data.keySecoundKey; data.rep.LL  = true;}
			if( data.lim.LR >= 0 ) if ( --data.lim.LR  <= 0 ) if ( data.now.LR  ) {data.lim.LR =data.keySecoundKey; data.rep.LR  = true;}

			if ( data.trig.RD ) {data.lim.RD=data.keyFirstKey;};
			if ( data.trig.RR ) {data.lim.RR=data.keyFirstKey;};
			if ( data.trig.RL ) {data.lim.RL=data.keyFirstKey;};
			if ( data.trig.RU ) {data.lim.RU=data.keyFirstKey;};
			if ( data.trig.L1 ) {data.lim.L1=data.keyFirstKey;};
			if ( data.trig.R1 ) {data.lim.R1=data.keyFirstKey;};
			if ( data.trig.L2 ) {data.lim.L2=data.keyFirstKey;};
			if ( data.trig.R2 ) {data.lim.R2=data.keyFirstKey;};
			if ( data.trig.L3 ) {data.lim.L3=data.keyFirstKey;};
			if ( data.trig.R3 ) {data.lim.R3=data.keyFirstKey;};
			if ( data.trig.SE ) {data.lim.SE=data.keyFirstKey;};
			if ( data.trig.ST ) {data.lim.ST=data.keyFirstKey;};
			if ( data.trig.LU  ) {data.lim.LU =data.keyFirstKey;};
			if ( data.trig.LD  ) {data.lim.LD =data.keyFirstKey;};
			if ( data.trig.LL  ) {data.lim.LL =data.keyFirstKey;};
			if ( data.trig.LR  ) {data.lim.LR =data.keyFirstKey;};
		}
		{//repeat trx
			data.repQ.RD = data.trig.RD;
			data.repQ.RR = data.trig.RR;
			data.repQ.RL = data.trig.RL;
			data.repQ.RU = data.trig.RU;
			data.repQ.L1 = data.trig.L1;
			data.repQ.R1 = data.trig.R1;
			data.repQ.L2 = data.trig.L2;
			data.repQ.R2 = data.trig.R2;
			data.repQ.L3 = data.trig.L3;
			data.repQ.R3 = data.trig.R3;
			data.repQ.SE = data.trig.SE;
			data.repQ.ST = data.trig.ST;
			data.repQ.LU  = data.trig.LU;
			data.repQ.LD  = data.trig.LD;
			data.repQ.LL  = data.trig.LL;
			data.repQ.LR  = data.trig.LR;
 
			if( data.limQ.RD > 0 ) if ( --data.limQ.RD <= 0 ) if ( data.now.RD ) {data.limQ.RD=1; data.repQ.RD = true;}
			if( data.limQ.RR > 0 ) if ( --data.limQ.RR <= 0 ) if ( data.now.RR ) {data.limQ.RR=1; data.repQ.RR = true;}
			if( data.limQ.RL > 0 ) if ( --data.limQ.RL <= 0 ) if ( data.now.RL ) {data.limQ.RL=1; data.repQ.RL = true;}
			if( data.limQ.RU > 0 ) if ( --data.limQ.RU <= 0 ) if ( data.now.RU ) {data.limQ.RU=1; data.repQ.RU = true;}
			if( data.limQ.L1 > 0 ) if ( --data.limQ.L1 <= 0 ) if ( data.now.L1 ) {data.limQ.L1=1; data.repQ.L1 = true;}
			if( data.limQ.R1 > 0 ) if ( --data.limQ.R1 <= 0 ) if ( data.now.R1 ) {data.limQ.R1=1; data.repQ.R1 = true;}
			if( data.limQ.L2 > 0 ) if ( --data.limQ.L2 <= 0 ) if ( data.now.L2 >0.0) {data.limQ.L2=1; data.repQ.L2 = true;}
			if( data.limQ.R2 > 0 ) if ( --data.limQ.R2 <= 0 ) if ( data.now.R2 >0.0) {data.limQ.R2=1; data.repQ.R2 = true;}
			if( data.limQ.L3 > 0 ) if ( --data.limQ.L3 <= 0 ) if ( data.now.L3 ) {data.limQ.L3=1; data.repQ.L3 = true;}
			if( data.limQ.R3 > 0 ) if ( --data.limQ.R3 <= 0 ) if ( data.now.R3 ) {data.limQ.R3=1; data.repQ.R3 = true;}
			if( data.limQ.SE > 0 ) if ( --data.limQ.SE <= 0 ) if ( data.now.SE ) {data.limQ.SE=1; data.repQ.SE = true;}
			if( data.limQ.ST > 0 ) if ( --data.limQ.ST <= 0 ) if ( data.now.ST ) {data.limQ.ST=1; data.repQ.ST = true;}
			if( data.limQ.LU >= 0 ) if ( --data.limQ.LU  <= 0 ) if ( data.now.LU  ) {data.limQ.LU =1; data.repQ.LU  = true;}
			if( data.limQ.LD >= 0 ) if ( --data.limQ.LD  <= 0 ) if ( data.now.LD  ) {data.limQ.LD =1; data.repQ.LD  = true;}
			if( data.limQ.LL >= 0 ) if ( --data.limQ.LL  <= 0 ) if ( data.now.LL  ) {data.limQ.LL =1; data.repQ.LL  = true;}
			if( data.limQ.LR >= 0 ) if ( --data.limQ.LR  <= 0 ) if ( data.now.LR  ) {data.limQ.LR =1; data.repQ.LR  = true;}

			if ( data.trig.RD ) {data.limQ.RD=data.keyFirstKey;};
			if ( data.trig.RR ) {data.limQ.RR=data.keyFirstKey;};
			if ( data.trig.RL ) {data.limQ.RL=data.keyFirstKey;};
			if ( data.trig.RU ) {data.limQ.RU=data.keyFirstKey;};
			if ( data.trig.L1 ) {data.limQ.L1=data.keyFirstKey;};
			if ( data.trig.R1 ) {data.limQ.R1=data.keyFirstKey;};
			if ( data.trig.L2 ) {data.limQ.L2=data.keyFirstKey;};
			if ( data.trig.R2 ) {data.limQ.R2=data.keyFirstKey;};
			if ( data.trig.L3 ) {data.limQ.L3=data.keyFirstKey;};
			if ( data.trig.R3 ) {data.limQ.R3=data.keyFirstKey;};
			if ( data.trig.SE ) {data.limQ.SE=data.keyFirstKey;};
			if ( data.trig.ST ) {data.limQ.ST=data.keyFirstKey;};
			if ( data.trig.LU  ) {data.limQ.LU =data.keyFirstKey;};
			if ( data.trig.LD  ) {data.limQ.LD =data.keyFirstKey;};
			if ( data.trig.LL  ) {data.limQ.LL =data.keyFirstKey;};
			if ( data.trig.LR  ) {data.limQ.LR =data.keyFirstKey;};
		}
		
//		let border = 0.15; //15%を遊び
		if ( Math.abs( data.now.LX ) < border ) data.now.LX = 0;
		if ( Math.abs( data.now.LY ) < border ) data.now.LY = 0;
		if ( Math.abs( data.now.RX ) < border ) data.now.RX = 0;
		if ( Math.abs( data.now.RY ) < border ) data.now.RY = 0;

	}
	function buttons_assign_xbox360( data, inf, border )
	{
		if ( data.prevButtons == undefined ) 
		{
		}
		else
		{
			data.prev.LX =  data.now.LX;
			data.prev.LY =  data.now.LY;
			data.prev.RX =  data.now.RX;
			data.prev.RY =  data.now.RY;
			data.prev.RD =  data.now.RD;
			data.prev.RR =  data.now.RR;
			data.prev.RL =  data.now.RL;
			data.prev.RU =  data.now.RU;
			data.prev.L1 =  data.now.L1;
			data.prev.R1 =  data.now.R1;
			data.prev.L2 =  data.now.L2;
			data.prev.R2 =  data.now.R2;
			data.prev.L3 =  data.now.L3;
			data.prev.R3 =  data.now.R3;
			data.prev.SE =  data.now.SE;
			data.prev.ST =  data.now.ST;
			data.prev.LU  =  data.now.LU;
			data.prev.LD  =  data.now.LD;
			data.prev.LL  =  data.now.LL;
			data.prev.LR  =  data.now.LR;

			data.now.LX =  inf.axes[0];
			data.now.LY =  inf.axes[1];
			data.now.RX =  inf.axes[2];
			data.now.RY =  inf.axes[3];
			data.now.RD =  inf.buttons[ 0].value == 1;
			data.now.RR =  inf.buttons[ 1].value == 1;
			data.now.RL =  inf.buttons[ 2].value == 1;
			data.now.RU =  inf.buttons[ 3].value == 1;
			data.now.L1 =  inf.buttons[ 4].value == 1;
			data.now.R1 =  inf.buttons[ 5].value == 1;
			data.now.L2 =  inf.buttons[ 6].value;
			data.now.R2 =  inf.buttons[ 7].value;
			data.now.SE =  inf.buttons[ 8].value == 1;
			data.now.ST =  inf.buttons[ 9].value == 1;
			data.now.L3 =  inf.buttons[10].value == 1;
			data.now.R3 =  inf.buttons[11].value == 1;
			data.now.LU  =  inf.buttons[12].value == 1;
			data.now.LD  =  inf.buttons[13].value == 1;
			data.now.LL  =  inf.buttons[14].value == 1;
			data.now.LR  =  inf.buttons[15].value == 1;

			buttons_assign_common( data, border );
		}

		data.prevButtons = inf.buttons;
	}
	function buttons_assign_saturn( data, inf, border )	// XInput 対応のサターンパッド用	SAVAKIエディタ用
	{
		if ( data.prevButtons == undefined ) 
		{
		}
		else
		{
			data.prev.LX =  data.now.LX;
			data.prev.LY =  data.now.LY;
			data.prev.RX =  data.now.RX;
			data.prev.RY =  data.now.RY;
			data.prev.RD =  data.now.RD;
			data.prev.RR =  data.now.RR;
			data.prev.RL =  data.now.RL;
			data.prev.RU =  data.now.RU;
			data.prev.L1 =  data.now.L1;
			data.prev.R1 =  data.now.R1;
			data.prev.L2 =  data.now.L2;
			data.prev.R2 =  data.now.R2;
			data.prev.L3 =  data.now.L3;
			data.prev.R3 =  data.now.R3;
			data.prev.SE =  data.now.SE;
			data.prev.ST =  data.now.ST;
			data.prev.LU  =  data.now.LU;
			data.prev.LD  =  data.now.LD;
			data.prev.LL  =  data.now.LL;
			data.prev.LR  =  data.now.LR;
			// サターンパッド(参考:DirectInput)		Xinput
			// axes[0]		:						(-1)Left / (1)Right									
			// axes[1]		:						(-1)Up   / (1)Down									
			// axes[2]		:										
			// axes[30]		:										
			// buttons[ 0]	:	B					A				
			// buttons[ 1]	:	A					B				
			// buttons[ 2]	:	Y					X				
			// buttons[ 3]	:	X					Y				
			// buttons[ 4]	:	C					L				
			// buttons[ 5]	:	Z					R				
			// buttons[ 6]	:						Z				
			// buttons[ 7]	:						C				
			// buttons[ 8]	:										
			// buttons[ 9]	:	start				start			
			// buttons[10]	:										
			// buttons[11]	:										
			// buttons[12]	:	up									
			// buttons[13]	:	down								
			// buttons[14]	:	left								
			// buttons[15]	:	right								
			data.now.RD =  inf.buttons[ 0].value == 1;	//A
			data.now.RR =  inf.buttons[ 6].value == 1;	//Z
			data.now.RL =  inf.buttons[ 2].value == 1;	//X
			data.now.RU =  inf.buttons[ 3].value == 1;	//Y
			data.now.L1 =  inf.buttons[ 4].value == 1;	//L
			data.now.R1 =  inf.buttons[ 5].value == 1;	//R
			data.now.L2 =  inf.buttons[ 1].value;		//B
			data.now.R2 =  inf.buttons[ 7].value;		//C
//			data.now.SE =  inf.buttons[  ].value == 1;	//-
			data.now.ST =  inf.buttons[ 9].value == 1;	//start
			data.now.LU  =  inf.axes[1] == -1;
			data.now.LD  =  inf.axes[1] ==  1;
			data.now.LL  =  inf.axes[0] == -1;
			data.now.LR  =  inf.axes[0] ==  1;

			buttons_assign_common( data, border );


		}
		data.prevButtons = inf.buttons;
	}
	let body = {};

	body.p1 = buttons_create();

	//-----------------------------------------------------------------------------
	body.update = function()
	//-----------------------------------------------------------------------------
	{
		body.getinfo( 0.11 );
	}
	//-----------------------------------------------------------------------------
	body.setCont = function (  fq, sq )	// -> updateに統合予定
	//-----------------------------------------------------------------------------
	{
		body.p1.keyFirstKey	= fq;
		body.p1.keySecoundKey	= sq;
	}
	//-----------------------------------------------------------------------------
	body.getinfo = function( border = 0.15 )	// -> updateに統合予定
	//-----------------------------------------------------------------------------
	{
		if(navigator.getGamepads)
		{
			let list = navigator.getGamepads();
			for ( let i = 0 ; i < list.length ; i++ )
			{
				let inf = list[i];
				if ( inf != null )		
				{
					body.p1.inf = inf;
					body.p1.list = list;
					body.p1.id = inf.id;
					buttons_assign_xbox360( body.p1, inf, border );
//					buttons_assign_saturn( body.p1, inf, border );
					
					body.p1.now.count = 0;
					body.p1.now.count += body.p1.now.RD?1:0;
					body.p1.now.count += body.p1.now.RR?1:0;
					body.p1.now.count += body.p1.now.RL?1:0;
					body.p1.now.count += body.p1.now.RU?1:0;
					body.p1.now.count += body.p1.now.R1?1:0;
					body.p1.now.count += body.p1.now.R2?1:0;
					body.p1.now.count += body.p1.now.R3?1:0;
					body.p1.now.count += body.p1.now.LU?1:0;
					body.p1.now.count += body.p1.now.LD?1:0;
					body.p1.now.count += body.p1.now.LL?1:0;
					body.p1.now.count += body.p1.now.LR?1:0;
					body.p1.now.count += body.p1.now.L1?1:0;
					body.p1.now.count += body.p1.now.L2?1:0;
					body.p1.now.count += body.p1.now.L3?1:0;
					body.p1.now.count += body.p1.now.SE?1:0;
					body.p1.now.count += body.p1.now.ST?1:0;

					let data = body.p1;
/*
					if ( data.now.LX < 0.5 && data.now.LX == data.prev.LX ) data.now.LX = 0.0;
					if ( data.now.LY < 0.5 && data.now.LY == data.prev.LY ) data.now.LY = 0.0;
					if ( data.now.RX < 0.5 && data.now.RX == data.prev.RX ) data.now.RX = 0.0;
					if ( data.now.RY < 0.5 && data.now.RY == data.prev.RY ) data.now.RY = 0.0;
					if ( data.now.L2 < 0.5 && data.now.L2 == data.prev.L2 ) data.now.L2 = 0.0;
					if ( data.now.R2 < 0.5 && data.now.R2 == data.prev.R2 ) data.now.R2 = 0.0;
*/
					break;

				}
			}
		}
		else
		{
				console.log("null");
		}
		return body.p1;
	}


	body.test_press = function()
	{
		let p = body.p1.now;
		console.log( "now:",p.RD,p.RR,p.RL,p.RU,p.L1,p.R1,p.SE,p.ST,p.LX,p.LY,p.RX,p.RY,p.L2,p.L3,p.R2,p.R3,p.LU,p.LD,p.LL,p.LR );
	}
	body.test_trig = function()
	{
		let p = body.p1.trig;
		console.log( "trig:",p.RD,p.RR,p.RL,p.RU,p.L1,p.R1,p.SE,p.ST,p.LX,p.LY,p.RX,p.RY,p.L2,p,p.L3.R2,p.R3,p.LU,p.LD,p.LL,p.LR );
	}
	body.test_release = function()
	{
		let p = body.p1.trig;
		console.log( "release:",p.RD,p.RR,p.RL,p.RU,p.L1,p.R1,p.SE,p.ST,p.LX,p.LY,p.RX,p.RY,p.L2,p.L3,p.R2,p.R3,p.LU,p.LD,p.LL,p.LR );
	}

	return body;
}


//-----------------------------------------------------------------------------
function  retrogra_create( context, width, height )	// レトログラフィック
//-----------------------------------------------------------------------------
{
	let body = {};
	body.img = context.createImageData( width, height );
	body.stencil = new Array( width*height );

	//-----------------------------------------------------------------------------
	body.window = function( x0,y0,x1,y1, x2,y2,x3,y3 )
	//-----------------------------------------------------------------------------
	{
		body.x0 = x0;
		body.y0 = y0;
		body.x1 = x1;
		body.y1 = y1;
		body.x2 = x2;
		body.y2 = y2;
		body.x3 = x3;
		body.y3 = y3;

		body.sw = (body.x1-body.x0+1)/(body.x3-body.x2+1);
		body.sh = (body.y1-body.y0+1)/(body.y3-body.y2+1);
	}

	body.window( 
		0,
		0,
		width-1,
		height-1,
		0,
		0,
		width-1,
		height-1
	);

	//-----------------------------------------------------------------------------
	body.window_conv = function( _ox, _oy )
	//-----------------------------------------------------------------------------
	{
		let ox = (_ox-body.x2)*body.sw;	// window対応
		let	oy = (_oy-body.y2)*body.sh;	// window対応
		switch(3)
		{
		case 0:
			ox=ox;
			oy=oy;
			break;
		case 1:
			ox=Math.floor(ox);
			oy=Math.floor(oy);
			break;
		case 2:
			ox=Math.ceil(ox);	// 400ドットで壁に達するにはこれなんだけど
			oy=Math.ceil(oy);
			break;
		case 3:
			ox=Math.round(ox);	// これでないと目瞼に塗り残しが出る。//kozo
			oy=Math.round(oy);
			break;
		}
		return [ox,oy];
	}
	//-----------------------------------------------------------------------------
	body.window_revconv = function( _ox, _oy )
	//-----------------------------------------------------------------------------
	{
		let ox = _ox/body.sw +body.x2;	// window対応
		let oy = _oy/body.sh +body.y2;	// window対応
//			ox=Math.round(ox);
//			oy=Math.round(oy);
		ox=Math.floor(ox);
		oy=Math.floor(oy);
		return [ox,oy];
	}



	//-----------------------------------------------------------------------------
	body.cls = function( col, a =0xff )
	//-----------------------------------------------------------------------------
	{
		for (let x=0; x<body.img.width ; x++ )
		for (let y=0; y<body.img.height ; y++ )
		{
			let adr = (y*body.img.width+x)*4;
			body.img.data[ adr +0 ] = (col>>16)&0xff;
			body.img.data[ adr +1 ] = (col>> 8)&0xff;
			body.img.data[ adr +2 ] = (col>> 0)&0xff;
			body.img.data[ adr +3 ] = a;
		}
	}
	//-----------------------------------------------------------------------------
	body.rgb = function( r,g,b )	// xRGB 8:8:8:8 
	//-----------------------------------------------------------------------------
	{
		return (r<<16)|(g<<8)|b;
	}
	//-----------------------------------------------------------------------------
	body.point = function( x, y )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*body.img.width+x)*4;
		let r = body.img.data[ adr +0 ];
		let g = body.img.data[ adr +1 ];
		let b = body.img.data[ adr +2 ];
	//	let a = body.img.data[ adr +3 ];
		return body.rgb(r,g,b);
	}
	//-----------------------------------------------------------------------------
	body.pset0 = function( _ox, _oy, col, a=0xff )
	//-----------------------------------------------------------------------------
	{
//			let x = Math.floor(_ox);
//			let y = Math.floor(_oy);
		let x = (_ox);
		let y = (_oy);
		if ( x < 0 ) return;
		if ( y < 0 ) return;
		if ( x >= body.img.width ) return;
		if ( y >= body.img.height ) return;

		let adr = (y*body.img.width+x)*4;
		body.img.data[ adr +0 ] = (col>>16)&0xff;
		body.img.data[ adr +1 ] = (col>> 8)&0xff;
		body.img.data[ adr +2 ] = (col>> 0)&0xff;
		body.img.data[ adr +3 ] = a&0xff;
	}
	//-----------------------------------------------------------------------------
	body.pset = function( _px, _py, col )
	//-----------------------------------------------------------------------------
	{
		let [px,py] = body.window_conv( _px, _py );
		body.pset0( px, py, col );
	}
	//-----------------------------------------------------------------------------
	body.pset_rgb = function( x, y, [r,g,b] )
	//-----------------------------------------------------------------------------
	{
		if ( r > 1 ) r = 1;
		if ( r < 0 ) r = 0;
		r = (r*255)&0xff;

		if ( g > 1 ) g = 1;
		if ( g < 0 ) g = 0;
		g = (g*255)&0xff;

		if ( b > 1 ) b = 1;
		if ( b < 0 ) b = 0;
		b = (b*255)&0xff;

		let adr = (y*body.img.width+x)*4;
		body.img.data[ adr+0 ] = r;
		body.img.data[ adr+1 ] = g;
		body.img.data[ adr+2 ] = b;
	}
	//-----------------------------------------------------------------------------
	body.stencil_point = function( x, y )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*body.img.width+x);
		let r = body.stencil[ adr ];
		return r;
	}
	//-----------------------------------------------------------------------------
	body.stencil_pset = function( x, y, a )
	//-----------------------------------------------------------------------------
	{
		let adr = (y*body.img.width+x);
		body.stencil[ adr ] = a;
	}

	//-----------------------------------------------------------------------------
	body.line = function( _x1, _y1, _x2, _y2, col, tile=0xffff ) 
	//-----------------------------------------------------------------------------
	{
		let [x1,y1] = body.window_conv( _x1, _y1 );
		let [x2,y2] = body.window_conv( _x2, _y2 );

		let cnt = 0;

		//ブレセンハムの線分発生アルゴリズム

		// 二点間の距離
		let dx = ( x2 > x1 ) ? x2 - x1 : x1 - x2;
		let dy = ( y2 > y1 ) ? y2 - y1 : y1 - y2;

		// 二点の方向
		let sx = ( x2 > x1 ) ? 1 : -1;
		let sy = ( y2 > y1 ) ? 1 : -1;

		if ( dx > dy ) 
		{
			// 傾きが1より小さい場合
			let E = -dx;
			for ( let i = 0 ; i <= dx ; i++ ) 
			{
				if( ((1<<(cnt %16)) & tile ) != 0 ) body.pset0( x1,y1, col );
				x1 += sx;
				E += 2 * dy;
				if ( E >= 0 ) 
				{
					y1 += sy;
					E -= 2 * dx;
				}
				cnt++;
			}
		}
		else
		{
			// 傾きが1以上の場合
			let E = -dy;
			for ( let i = 0 ; i <= dy ; i++ )
			{
				if( ((1<<(cnt %16)) & tile ) != 0 ) body.pset0( x1,y1, col );
				y1 += sy;
				E += 2 * dx;
				if ( E >= 0 )
				{
					x1 += sx;
					E -= 2 * dy;
				}
				cnt++;
			}
		}

	}
	//-----------------------------------------------------------------------------
	body.box = function( x1,y1, x2,y2, col )
	//-----------------------------------------------------------------------------
	{

		body.line( x1,y1,x2,y1, col);
		body.line( x1,y2,x2,y2, col);
		body.line( x1,y1,x1,y2, col);
		body.line( x2,y1,x2,y2, col);
	}

	//-----------------------------------------------------------------------------
	body.circle = function( x,y,r,col, scy=1 )
	//-----------------------------------------------------------------------------
	{
		const scx=2;

		let rad = function( deg )
		//-----------------------------------------------------------------------------
		{
			return deg*Math.PI/180;
		}
		{
			let st = rad(1);
			let x0,y0;
			for (  let i = 0 ; i <= Math.PI*2 ; i+=st  )
			{
				let x1 = r * Math.cos(i)*scx + x;
				let y1 = r * Math.sin(i)*scy + y;

				if ( i > 0 ) body.line( x0, y0, x1, y1, col );
				x0 = x1;
				y0 = y1;
			}
		}
	}

	//-----------------------------------------------------------------------------
	body.paint = async function(  _x0, _y0, colsPat, colsRej  ) 
	//-----------------------------------------------------------------------------
	{
	//	呼び出しサンプル
	//	gra.circle(100,100, 20,0xff0000);
	//	gra.paint( 100,100, [[0xffff00]],[0xff0000] );


		let [x0,y0] = body.window_conv( _x0, _y0 );
		let cntlines = 0;

		{
			let c = body.point(x0,y0);
			if ( colsRej.indexOf(c) != -1 ) return cntlines;
		}

		body.stencil.fill(0);

		let seed=[];
		seed.push([x0,y0,0,0,0]); // x,y,dir,lx,rx
		while( seed.length > 0 )
		{
			// 先頭のシードを取り出す
			let sx	= seed[0][0];
			let sy	= seed[0][1];
			let pdi	= seed[0][2];
			let plx	= seed[0][3];
			let prx	= seed[0][4];
			seed.shift();

			// シードから左端を探す
			let lx=sx;
			while( lx >= 0 )
			{
				let c = body.point(lx,sy);
				if ( colsRej.indexOf(c) != -1 ) break;
				let s = body.stencil_point(lx,sy);
				if ( s != 0 ) break;
				lx--;
			}
			lx++;

			// シードから右端探す
			let rx=sx;
			while( rx < body.img.width )
			{
				let c = body.point(rx,sy);
				if ( colsRej.indexOf(c) != -1 ) break;
				let s = body.stencil_point(rx,sy);
				if ( s != 0 ) break;
				rx++;
			}
			rx--;

			// 1ライン塗り
			{
				let iy = Math.floor( sy % colsPat.length );
				let ay = sy*body.img.width;
				for ( let x = lx ; x <=rx ; x++ )
				{
					let ix = Math.floor(  x % colsPat[0].length );
					let col = colsPat[iy][ix];
					let adr = (ay+x);
					body.img.data[ adr*4 +0 ] = (col>>16)&0xff;
					body.img.data[ adr*4 +1 ] = (col>> 8)&0xff;
					body.img.data[ adr*4 +2 ] = (col>> 0)&0xff;
					body.img.data[ adr*4 +3 ] = 0xff;
				
					body.stencil[ adr ] = 1;
				}
				
				if ( cntlines %(3) == 1 )
				{
					g_flgSleep = true;
					await sleep(1); // 1msecスリープ
					g_flgSleep = false;
				}
				cntlines++;
			}

			if ( seed.length > 50 ) 
			{
				console.log("Out of seed sampling painted at", _x0, _y0, colsPat, colsRej );

				break;
			}
			for( let dir of [-1,1] )
			{// 一ライン上（下）のライン内でのペイント領域の右端をすべてシードに加える
				let y=sy+dir;
				if ( dir ==-1 && y < 0 ) continue;
				if ( dir == 1 && y >= body.img.height ) continue;
				let flgBegin = false;
				for ( let x = lx ; x <=rx ; x++ )
				{
					let c = body.point(x,y);
					let s = body.stencil_point(x,y);
					if ( flgBegin == false )
					{
						if ( s == 0 && colsRej.indexOf(c) == -1 )
						{
							flgBegin = true;
						}
					}
					else
					{
						if ( s == 0 && colsRej.indexOf(c) == -1 )
						{}
						else
						{
							seed.push([x-1,y,dir,lx,rx]);
							flgBegin = false;
						}
					}
				}
				if ( flgBegin == true )
				{
							seed.push([rx,y,dir,lx,rx]);
				}
			}
		}
		
		return cntlines;
	}

	//-----------------------------------------------------------------------------
	body.streach = function()
	//-----------------------------------------------------------------------------
	{
		let ctx = context;
		let img = body.img;
		// -----------------------------------------
		// ImageDataをcanvasに合成
		// -----------------------------------------
		// g   : canvas.getContext('2d')
		// img : g.createImageData( width, height )

		ctx.imageSmoothingEnabled = false; // スムージングOFF
		{
		// 引き伸ばして表示
		    let cv=document.createElement('canvas');				// 新たに<canvas>タグを生成
		    cv.width = img.width;
		    cv.height = img.height;
			cv.getContext("2d").putImageData( img,0,0);				// 作成したcanvasにImageDataをコピー
			{
				let sx = 0;
				let sy = 0;
				let sw = img.width;
				let sh = img.height;
				let dx = 0;
				let dy = 0;
				let dw = ctx.canvas.width;
				let dh = ctx.canvas.height;
				ctx.drawImage( cv,sx,sy,sw,sh,dx,dy,dw,dh);	// ImageDataは引き延ばせないけど、Imageは引き延ばせる
			}
			
		}
	}


	return body
};

//-----------------------------------------------------------------------------
function gra_create( cv )	//2021/06/01		2Dグラフィックス
//-----------------------------------------------------------------------------
{
	let gra={}
	gra.ctx=cv.getContext('2d');
	gra.x = 0;
	gra.y = 0;

	gra.sx = 0; 
	gra.sy = 0; 
	gra.ex = gra.ctx.canvas.width; 
	gra.ey = gra.ctx.canvas.height; 
	gra.size_w = gra.ex-gra.sx;
	gra.size_h = gra.ey-gra.sy;

	gra.backcol = "#FFFFFF";
//	gra.ctx.font = "12px monospace";	// iOSだとCourierになる	読める限界の小ささ
//	gra.ctx.font = "14px monospace";	// iOSだとCourierになる 程よい小ささ
//	gra.ctx.font = "16px Courier";	// iOSでも使えるモノスペースフォントただし漢字はモノスペースにはならない 見栄えもある
//	gra.ctx.textAlign = "left";
//	gra.ctx.textBaseline = "alphabetic";
	gra.fontw = gra.ctx.measureText("_").width;

	gra.lineWidth = 1;
	if(0)
	{
		//2021/07/22 フルスクリーン用にアスペクト機能を追加	※フルスクリーン画面の解像度はソフトウェアは把握できない。
		gra.asp = 1/(gra.ctx.canvas.width/gra.ctx.canvas.height);
		gra.adj = (gra.ctx.canvas.width-gra.ctx.canvas.height)/2;
	}
	else
	{
		//2021/12/26	デフォルトは確保したサイズと左詰めではないかと思って変更
		gra.asp = 1.0;
		gra.adj = 0;
	}

	//-------------------------------------------------------------------------
	gra.window = function( _sx, _sy, _ex, _ey )
	//-------------------------------------------------------------------------
	{
		gra.sx = _sx;
		gra.sy = _sy;
		gra.ex = _ex;
		gra.ey = _ey;
		gra.size_w = gra.ex-gra.sx;
		gra.size_h = gra.ey-gra.sy;
	}
	//-------------------------------------------------------------------------
	gra.adjust_win = function() // 2021/08/03 window scale に合わせる
	//-------------------------------------------------------------------------
	{
		gra.ctx.lineWidth = gra.ctx.canvas.height/(gra.ey-gra.sy) *gra.lineWidth;
	}	
	
	//-------------------------------------------------------------------------
	gra.setAspect = function( as,ab )	// 2021/08/13追加
	//-------------------------------------------------------------------------
	{
		gra.asp = as;
		gra.adj = ab;
	}


	gra.win_abs = function( x, y )
	{
		let w = gra.ex-gra.sx;
		let h = gra.ey-gra.sy;
		x = (x-gra.sx)/w * gra.ctx.canvas.width;
		y = (y-gra.sy)/h * gra.ctx.canvas.height;
		return [x*gra.asp+gra.adj,y];
	}
	gra.win_range = function( x, y )
	{
		if ( gra.mode == 'no-range' )
		{
		
			// モードはよくない。パラメータで素の値が返るようにするべき
		
			return [x,y];
		}
		else
		if ( gra.mode == '' )
		{
			let w = Math.abs(gra.ex-gra.sx);
			let h = Math.abs(gra.ey-gra.sy);
			x = (x)/w * gra.ctx.canvas.width;
			y = (y)/h * gra.ctx.canvas.height;
			return [x*gra.asp,y];
		}
		else
		{
			alert("gra mode 異常 gra.win_range()");
		}
	}
	gra.mode = ''; 
	//-----------------------------------------------------------------------------
	gra.setMode = function( mode )	// ドットbyドット
	//-----------------------------------------------------------------------------
	{
		gra.mode = mode;
	}
	
	//-------------------------------------------------------------------------
	gra.boxv2 = function( v0, v1 ) // 2022/10/09 add
	//-------------------------------------------------------------------------
	{
		gra.box( v0.x, v0.y, v1.x, v1.y );
	}
	//-----------------------------------------------------------------------------
	gra.box = function( x1, y1, x2, y2 )
	//-----------------------------------------------------------------------------
	{
		function func( sx,sy, ex,ey )
		{
			gra.ctx.beginPath();
		    gra.ctx.rect(sx,sy,ex-sx,ey-sy);
			gra.ctx.closePath();
			gra.ctx.stroke();
		}

		[x1,y1]=gra.win_abs(x1,y1);
		[x2,y2]=gra.win_abs(x2,y2);

		func( x1, y1, x2, y2 );
	}
	//-------------------------------------------------------------------------
	gra.fillv2 = function( v0, v1 ) // 2022/10/09 add
	//-------------------------------------------------------------------------
	{
		gra.fill( v0.x, v0.y, v1.x, v1.y );
	}
	//-----------------------------------------------------------------------------
	gra.fill= function(  x1, y1, x2, y2 ) // 使えなくなっていたのを修正
	//-----------------------------------------------------------------------------
	{
		function func( sx,sy, ex,ey )
		{

			gra.ctx.beginPath();
		    gra.ctx.rect(sx,sy,ex-sx,ey-sy);
			gra.ctx.fill();
		}

		[x1,y1]=gra.win_abs(x1,y1);
		[x2,y2]=gra.win_abs(x2,y2);

		func( x1, y1, x2, y2 );
	}
	

	//-------------------------------------------------------------------------
	gra.line = function( x1, y1, x2, y2 )
	//-------------------------------------------------------------------------
	{
		function func( sx,sy, ex,ey )
		{
			gra.ctx.beginPath();
			gra.ctx.moveTo( sx, sy );
			gra.ctx.lineTo( ex, ey );
			gra.ctx.stroke();
		}

		[x1,y1]=gra.win_abs(x1,y1);
		[x2,y2]=gra.win_abs(x2,y2);

		func( x1, y1, x2, y2 );
	}
	//-------------------------------------------------------------------------
	gra.linev2 = function( v0, v1 ) // 2021/08/10 追加
	//-------------------------------------------------------------------------
	{
		gra.line( v0.x, v0.y, v1.x, v1.y );
	}
	
	//-------------------------------------------------------------------------
	gra.pattern = function( type = '' )
	//-------------------------------------------------------------------------
	{
		switch( type )
		{
			case "": gra.ctx.setLineDash([]);	break;
			case "normal": gra.ctx.setLineDash([]);	break;
			case "hasen1": gra.ctx.setLineDash([1,2]);	break;
			case "hasen2": gra.ctx.setLineDash([2,4]);	break;
			case "hasen3": gra.ctx.setLineDash([3,6]);	break;
			case "hasen4": gra.ctx.setLineDash([4,8]);	break;
			case "hasen": gra.ctx.setLineDash([2,4]);	break;
			default: alert("破線パターン異常 gra.pattern():",type);
		}
	}
	//-------------------------------------------------------------------------
	gra.path_n = function( V, mode="/loop/fill" ) // vec2 V
	//-------------------------------------------------------------------------
	{
		for ( let v of V )
		{
			[v.x,v.y]=gra.win_abs(v.x,v.y);
		}

		{
			gra.ctx.beginPath();

			gra.ctx.moveTo( V[0].x, V[0].y );
			
			for ( let i = 1 ; i < V.length ; i++ )
			{
				gra.ctx.lineTo( V[i].x, V[i].y );
			}


			if ( mode == 'fill' ) 
			{
				gra.ctx.fill();
			}
			else
			if ( mode == 'loop' )
			{
				gra.ctx.closePath();
				gra.ctx.stroke();
			}
			else
			{
				gra.ctx.stroke();
			}

		}
	}

	//-------------------------------------------------------------------------
	gra.locate = function( x1, y1 )
	//-------------------------------------------------------------------------
	{
		gra.x=x1*gra.fontw/gra.asp;
		gra.y=y1*16;
	}
	//-------------------------------------------------------------------------
	//gra.print = function( str, x1=gra.x, y1=gra.y )
	gra.print_old = function( str, x1=gra.x, y1=gra.y )	// 廃止予定
	//-------------------------------------------------------------------------
	{
//		[x1,y1]=gra.win_abs(x1,y1);	
		gra.ctx.font = "14px Courier";	// iOSでも使えるモノスペースフォントただし漢字はモノスペースにはならない 16pxより綺麗に見える
		gra.ctx.textAlign = "left";
		gra.ctx.textBaseline = "alphabetic";
		gra.ctx.fillText( str, x1+2, y1+16-1 );

		gra.x = x1;
		gra.y = y1+16;
	}
	//-------------------------------------------------------------------------
	gra.print = function( str, x1=gra.x, y1=gra.y )
	//-------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);	
		gra.ctx.font = "14px Courier";	// iOSでも使えるモノスペースフォントただし漢字はモノスペースにはならない 16pxより綺麗に見える
		gra.ctx.textAlign = "left";
		gra.ctx.textBaseline = "alphabetic";
		gra.ctx.fillText( str, x1+2, y1+16-1 );

		gra.x = x1;
		gra.y = y1+16;
	}
	//-------------------------------------------------------------------------
	gra.symbol = function( str, x1,y1, size = 16, alighbase="CM", rot=0 )
	//-------------------------------------------------------------------------
	{
		// 画面解像度に合わせて大きさが変わるフォントサイズ	※描画サイズに関係がないので機種依存しない

		[x1,y1]=gra.win_abs(x1,y1);
		let [sw,sh] = gra.win_range(size,size);

		let align;
		let base;
		switch( alighbase )
		{
			case "LB": align="left"		;base="ideographic"		;break;
			case "CB": align="center"	;base="ideographic"		;break;
			case "RB": align="right"	;base="ideographic"		;break;
			case "LM": align="left"		;base="middle"			;break;
			case "CM": align="center"	;base="middle"			;break;
			case "RM": align="right"	;base="middle"			;break;
			case "LT": align="left"		;base="top"				;break;
			case "CT": align="center"	;base="top"				;break;
			case "RT": align="right"	;base="top"				;break;
			case "center": align=alighbase	;base="ideographic"		;break;
			default: 	alert("symbol() 文字位置エラー:"+alighbase);
		}

		gra.ctx.font =   sw+"px Courier";
		gra.ctx.textAlign = align;
//		base="middle";
		gra.ctx.textBaseline = base;
		

				gra.ctx.save();
				gra.ctx.translate(x1,y1);

				gra.ctx.rotate( rot );
					
				gra.ctx.fillText( str, 0, 0 );

				gra.ctx.restore();
	}

	//-------------------------------------------------------------------------
	gra.symbol_row = function( str, x1,y1, size = 16, alighbase="CM" )
	//-------------------------------------------------------------------------
	{
		// 画面解像度に依存しないフォントサイズ				※文字の大きさが変わらないので情報表示用
	
		[x1,y1]=gra.win_abs(x1,y1);

		switch( alighbase )
		{
			case "LB": align="left"		;base="ideographic"		;break;
			case "CB": align="center"	;base="ideographic"		;break;
			case "RB": align="right"	;base="ideographic"		;break;
			case "LM": align="left"		;base="middle"			;break;
			case "CM": align="center"	;base="middle"			;break;
			case "RM": align="right"	;base="middle"			;break;
			case "LT": align="left"		;base="top"				;break;
			case "CT": align="center"	;base="top"				;break;
			case "RT": align="right"	;base="top"				;break;
			case "center": align=alighbase	;base="ideographic"		;break;
			default: 	alert("symbol() 文字位置エラー:"+alighbase);
		}

		gra.ctx.font =   size+"px Courier";
		gra.ctx.textAlign = align;
		gra.ctx.textBaseline = base;
		gra.ctx.fillText( str, x1, y1 );
	}

	//-----------------------------------------------------------------------------
	gra.alpha = function( fa=1.0, func='none' ) // 2021/07/10 追加
	//-----------------------------------------------------------------------------
	{
		gra.ctx.globalAlpha=fa;

		switch( func )
		{
			case 'add':		gra.ctx.globalCompositeOperation = "lighter"; 		break;	// 加算合成
			default:		gra.ctx.globalCompositeOperation = "source-over";	break;	// src*(1-α)+dst*α
		}
	}

	//-----------------------------------------------------------------------------
	gra.setLineWidth = function( val=1.0 ) //2021/07/26 追加	windowサイズに合わせる
	//-----------------------------------------------------------------------------
	{
		gra.lineWidth = gra.ctx.canvas.height/(gra.ey-gra.sy) *val;
		gra.ctx.lineWidth = gra.lineWidth;
	}
	//-----------------------------------------------------------------------------
	gra.setLineWidth_row = function( val=1.0 ) //2021/07/26 追加	生のサイズ
	//-----------------------------------------------------------------------------
	{
		gra.lineWidth = val;
		gra.ctx.lineWidth = val;
	}

	gra.rgbv =  function( {x:fr, y:fg, z:fb} )//2022/07/23
	{
		let r = fr*255;
		let g = fg*255;
		let b = fb*255;
		if ( r > 255 ) r = 255;
		if ( g > 255 ) g = 255;
		if ( b > 255 ) b = 255;
		let c = (r<<16)+(g<<8)+(b<<0);
		return c;
	}
	
	//-----------------------------------------------------------------------------
	gra.colorv = function( col ) //2022/07/23 vec3 col
	//-----------------------------------------------------------------------------
	{
		let c = gra.rgbv( col );

		let s = "#"+("000000"+c.toString(16)).substr(-6);

		gra.ctx.strokeStyle = s;

		gra.ctx.fillStyle = s;
	}
	//-----------------------------------------------------------------------------
//	gra.rgb = function( col )//2021/10/24
	gra.rgb =  function(  fr, fg, fb  )//2021/11/01
	//-----------------------------------------------------------------------------
	{
		let r = fr*255;
		let g = fg*255;
		let b = fb*255;
		if ( r > 255 ) r = 255;
		if ( g > 255 ) g = 255;
		if ( b > 255 ) b = 255;
		let c = (r<<16)+(g<<8)+(b<<0);
		return c;
	}
	//-----------------------------------------------------------------------------
//	gra.color_rgb = function( [fr, fg, fb] ) //2021/12/26
	gra.color = function( [fr, fg, fb] ) //2021/12/26 作成 2022/01/20 名前変更
	//-----------------------------------------------------------------------------
	{
		let c = gra.rgb( fr,fg,fb);

		let s = "#"+("000000"+c.toString(16)).substr(-6);

		gra.ctx.strokeStyle = s;

		gra.ctx.fillStyle = s;
	}
	//-----------------------------------------------------------------------------
//	gra.backcolor_rgb = function( [fr=0.0, fg=0.0, fb=0.0] ) // 2021/12/26
	gra.setBackcolor = function( [fr=0.0, fg=0.0, fb=0.0] ) // 2021/12/26 作成 2022/01/20 名称変更
	//-----------------------------------------------------------------------------
	{
		let r = fr*255;
		let g = fg*255;
		let b = fb*255;
		if ( r > 255 ) r = 255;
		if ( g > 255 ) g = 255;
		if ( b > 255 ) b = 255;
		let c = (r<<16)+(g<<8)+(b<<0);
		
		let s = "#"+("000000"+c.toString(16)).substr(-6);
		gra.backcol = s;
		gra.ctx.canvas.style.backgroundColor = gra.backcol;	// 2022/06/16 追加
	}
	//-----------------------------------------------------------------------------
	gra.bezier_n = function( v, mode='/loop/fill/loopfill' ) // vec2[] v;  2021/07/29 add
	//-----------------------------------------------------------------------------
	{
		if ( v.length < 4 ) return;

		for ( let a of v )
		{
			[a.x,a.y]=gra.win_abs(a.x,a.y);
		}

		{
			gra.ctx.beginPath();

			{
				let p = 0;
				let x0,y0;
				let x1,y1;
				let [x2,y2] = [v[p+0].x,v[p+0].y];
				let [x3,y3] = [v[p+1].x,v[p+1].y];
				gra.ctx.moveTo( x2, y2 );
				//--
				for ( let i = 0 ; i < v.length/2 ; i++ )
				{
					p += 2;
					if ( mode == 'loop' || mode == 'loopfill' )	p %= v.length;
					if ( p >= v.length ) break;
					[x0,y0] = [x2,y2];
					[x1,y1] = [x3,y3];
					[x2,y2] = [v[p+0].x,v[p+0].y];
					[x3,y3] = [v[p+1].x,v[p+1].y];

					if ( (i%2)==0 )
					{
						gra.ctx.bezierCurveTo( x1, y1, x2, y2, x3, y3 );
					}
					else
					{
						let x0b = 2*x1-x0;
						let y0b = 2*y1-y0;
						let x3b = 2*x2-x3;
						let y3b = 2*y2-y3;
						gra.ctx.bezierCurveTo( x0b, y0b, x3b, y3b, x2, y2 );
					}
				}
			}

			if ( mode == 'fill' || mode == 'loopfill' )	gra.ctx.fill();
			gra.ctx.stroke();
		}

	}
	//-----------------------------------------------------------------------------
	gra.circle = function( x1,y1,r, st=0, en=Math.PI*2, mode="/loop/fill" ) // 2021/07/21　circle にst en を追加
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let [rw,rh] = gra.win_range(r,r); // 2021/07/29 windowとcanvasのアスペクト比を反映
		{
			gra.ctx.beginPath();

			let rotation = 0;
			gra.ctx.ellipse( x1, y1, rw, rh, rotation, -st, -en, true  ); // 反時計回り(-st, -en, true)

			if ( mode == 'loop' ) 
			{
				gra.ctx.closePath();
				gra.ctx.stroke();
			}
			else
			if ( mode == 'fill' ) 
			{
				gra.ctx.fill();
			}
			else
			{
				gra.ctx.stroke();
			}
		}
	}
	//-----------------------------------------------------------------------------
	gra.circle_row = function( x1,y1,r, st=0, en=Math.PI*2, mode="/loop/fill" ) // 2021/07/21　circle にst en を追加
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let [rw,rh] = gra.win_range(r,r); // 2021/07/29 windowとcanvasのアスペクト比を反映
		rw = r;
		rh = r;
		{
			gra.ctx.beginPath();

			let rotation = 0;
			gra.ctx.ellipse( x1, y1, rw, rh, rotation, -st, -en, true  ); // 反時計回り(-st, -en, true)

			if ( mode == 'loop' ) 
			{
				gra.ctx.closePath();
				gra.ctx.stroke();
			}
			else
			if ( mode == 'fill' ) 
			{
				gra.ctx.fill();
			}
			else
			{
				gra.ctx.stroke();
			}
		}
	}
	//-----------------------------------------------------------------------------
	gra.circlefill = function( x1,y1,r, st=0, en=Math.PI*2 ) // 2021/07/21　circle にst en を追加 )
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let [rw,rh] = gra.win_range(r,r); // 2021/07/29 windowとcanvasのアスペクト比を反映
		{
			gra.ctx.beginPath();
			let rotation = 0;
			gra.ctx.ellipse( x1, y1, rw, rh, rotation, st, en );
			gra.ctx.fill();
			gra.ctx.stroke(); // 2022/01/21
		};
	}
	//-----------------------------------------------------------------------------
	gra.circlev2 = function( v, r ) // 2022/08/24
	//-----------------------------------------------------------------------------
	{
		gra.circle( v.x,v.y,r );
	}
	//-----------------------------------------------------------------------------
	gra.circlefillv2 = function( v, r ) // 2022/08/24
	//-----------------------------------------------------------------------------
	{
		gra.circlefill( v.x,v.y,r );
	}
	//-----------------------------------------------------------------------------
	gra.dotv2 = function( v, r, st=0, en=Math.PI*2 ) // 2021/07/21　circle にst en を追加 )
	//-----------------------------------------------------------------------------
	{
		gra.dot( v.x,v.y,r,st,en );
	}
	//-----------------------------------------------------------------------------
	gra.dot = function( x1,y1,r, st=0, en=Math.PI*2 ) // 2021/07/21　circle にst en を追加 )
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let [rw,rh] = gra.win_range(r,r); // 2021/07/29 windowとcanvasのアスペクト比を反映
		rw = r;
		rh = r;
		{
			gra.ctx.beginPath();
			let rotation = 0;
			gra.ctx.ellipse( x1, y1, rw, rh, rotation, st, en );
			gra.ctx.fill();
		};
	}

	//-----------------------------------------------------------------------------
	gra.pset = function( x1,y1,r=1 ) // 2021/08/13 追加
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let st=0;
		let en=Math.PI*2;
		{
			gra.ctx.beginPath();
			let rotation = 0;
			gra.ctx.ellipse( x1, y1, r, r, rotation, st, en );
			gra.ctx.fill();
		};
	}


	//-----------------------------------------------------------------------------
//	gra.drawpictgrambone = function( p1, r1, p2, r2 )	// 2021/07/30 ピクトグラム風、円が二つ連なった図形の描画
	gra.line_pictgram = function( x0,y0,x1,y1, r1, r2, mode='' )	// 2021/10/31
	//-----------------------------------------------------------------------------
	{
		let p1=vec2(x0,y0);
		let p2=vec2(x1,y1);

		let l = length2(vsub2(p2,p1));
		let rot = Math.atan2(p1.x-p2.x, p1.y-p2.y);
		let th = -Math.asin( (r1-r2)/l);

		let c = Math.cos(th);
		let s = Math.sin(th);
		let va=vec2( r1*c,r1*s);
		let vb=vec2( r2*c,r2*s);
		let vc=vec2(-r1*c,r1*s);
		let vd=vec2(-r2*c,r2*s);

		let pa = vadd2(vrot2(va,rot),p1);
		let pb = vadd2(vrot2(vb,rot),p2);
		let pc = vadd2(vrot2(vc,rot),p1);
		let pd = vadd2(vrot2(vd,rot),p2);

		function path_circle( x1,y1,r, st, en )
		{
			[x1,y1]=gra.win_abs(x1,y1);
			let [rw,rh] = gra.win_range(r,r); // 2021/07/29 windowとcanvasのアスペクト比を反映
			{
				let rotation = 0;
				gra.ctx.ellipse( x1, y1, rw, rh, rotation, st, en );
			};
		}
		gra.ctx.beginPath();
		path_circle( p1.x, p1.y, r1, Math.PI+th+rot, -th+rot );
		path_circle( p2.x, p2.y, r2, -th+rot, Math.PI+th+rot );

		if ( mode == 'fill' )
		{
			gra.ctx.fill();
		}
		else
		{
			gra.ctx.closePath();
			gra.ctx.stroke();
		}

	}
	//-----------------------------------------------------------------------------
	gra.cls = function()
	//-----------------------------------------------------------------------------
	{
		gra.ctx.clearRect(0, 0, gra.ctx.canvas.width, gra.ctx.canvas.height);	// clearRectでないと合成出来ない。fillRectではダメ
		gra.x=0;
		gra.y=0;


	}

	// ばねの表示
/*
	//-----------------------------------------------------------------------------
	gra.drawbane2d = function( a,b,r,step=10,l0=r*2,l1=r*2,wd=4,div=step*14 ) // 2021/08/06 追加
	//-----------------------------------------------------------------------------
	{
		let rot = Math.atan2( b.y-a.y, b.x-a.x );
		let p0=  vadd2( a , vrot2(vec2( l0,0),rot) );
		let p1 = vadd2( b , vrot2(vec2(-l1,0),rot) );
		//
		let v0 = vec2(a.x,a.y);
		let st = step*radians(360)/div;
		let th = radians(0);
		let len = length2( vsub( p1, p0) ); 
		let d = (len / div);
		for ( let i = 0 ; i <= div ; i++ )
		{
			let v1 = vec2(
				r* Math.cos(th)/wd + d*i,
				r* Math.sin(th)  
			);
			v1 = vrot2( v1, rot );
			v1 = vadd2( v1, p0 );

			gra.line( v0.x, v0.y, v1.x, v1.y );
			v0 = v1;

			th += st;
		}

		gra.line( v0.x, v0.y, b.x, b.y );
	}
*/
	//-----------------------------------------------------------------------------
	gra.line_spring= function( x0, y0, x1, y1,r,step=10,l0=r*2,l1=r*2,wd=4,div=step*14 ) // 2021/08/06 追加 2021/10/17変更
	//-----------------------------------------------------------------------------
	{
		let a = vec2(x0,y0);
		let b = vec2(x1,y1);
		let rot = Math.atan2( b.y-a.y, b.x-a.x );
		let p0=  vadd2( a , vrot2(vec2( l0,0),rot) );
		let p1 = vadd2( b , vrot2(vec2(-l1,0),rot) );
		//
		let v0 = vec2(a.x,a.y);
		let st = step*radians(360)/div;
		let th = radians(0);
		let len = length2( vsub( p1, p0) ); 
		let d = (len / div);
		for ( let i = 0 ; i <= div ; i++ )
		{
			let v1 = vec2(
				r* Math.cos(th)/wd + d*i,
				r* Math.sin(th)  
			);
			v1 = vrot2( v1, rot );
			v1 = vadd2( v1, p0 );

			gra.line( v0.x, v0.y, v1.x, v1.y );
			v0 = v1;

			th += st;
		}

		gra.line( v0.x, v0.y, b.x, b.y );
	}
	// 矢印の表示
	//-----------------------------------------------------------------------------
	gra.drawarrow2d = function( p, v, l, sc = 1 ) // vec2 pos, vec2 vel, 
	//-----------------------------------------------------------------------------
	{
		if ( l == 0 || length2(v)==0 ) 
		{
			gra.circle( p.x, p.y, sc );
			return;
		}
		else
		if ( l < 0 )
		{
			l = -l;
		}
		
		let rot = Math.atan2( v.y, v.x );
		let h = 1*sc;
		let w = h/Math.tan(radians(30));

		let tbl = 
			[
				vec2( l,0),
				vec2( l-w*2 ,-h*2	),
				vec2( l-w*2 ,-h		),
				vec2(    0  ,-h		),
				vec2(    0  , h		),
				vec2(    0  , h		),
				vec2( l-w*2 , h		),
				vec2( l-w*2 , h*2	),
				vec2( l,0),
			];
		let tbl2=[];
		for ( let v of tbl )
		{
			v = vrot2( v, rot );
			v = vadd2( v, p );
			tbl2.push(v);
		}

		gra.path_n( tbl2 );
	}
	//-----------------------------------------------------------------------------
	gra.drawarrow_line2d = function( x0, y0, x1, y1, sc = 2 )
	//-----------------------------------------------------------------------------
	{
		let p = new vec2(x0,y0);
		let b = new vec2(x1, y1);
		let v = normalize2(vsub2(b,p));
		let l = length2(vsub2(b,p));
		gra.drawarrow2d( p, v, l, sc );
	}

	//-----------------------------------------------------------------------------
	gra.drawmesure_line = function( x0, y0, x1, y1, w = 4 )
	//-----------------------------------------------------------------------------
	{
		let v = vmul_scalar2( normalize2(vsub2(vec2(x1,y1),vec2(x0,y0))), w );
		[v.x,v.y]=[v.y,v.x];				
		let s1 = vec2( x0, y0  ); let e1=vec2( x1, y1   );
		let s2 = vec2( x0+v.x, y0-v.y); let e2=vec2( x0-v.x, y0+v.y );
		let s3 = vec2( x1+v.x, y1-v.y); let e3=vec2( x1-v.x, y1+v.y );
		gra.line( s1.x,s1.y,e1.x,e1.y);
		gra.line( s2.x,s2.y,e2.x,e2.y);
		gra.line( s3.x,s3.y,e3.x,e3.y);
	}

	return gra;

};

///// geom 2021/07/02 vec2追加

//------------------------------------------------------------------------------
function vec2( x, y )	// 2021/05/28新規追加
//------------------------------------------------------------------------------
{
	return {x:x, y:y};
}
//------------------------------------------------------------------------------
function vsub2( a, b )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x - b.x,
		a.y - b.y 
	);
}
//------------------------------------------------------------------------------
function vadd2( a, b )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x + b.x,
		a.y + b.y 
	);
}
//------------------------------------------------------------------------------
function vmul2( a, b )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x * b.x,
		a.y * b.y 
	);
}
//------------------------------------------------------------------------------
function vdiv2( a, b ) //2021/11/02
//------------------------------------------------------------------------------
{
	return vec2(
		a.x / b.x,
		a.y / b.y 
	);
}
//------------------------------------------------------------------------------
function reflect2( I, N )
//------------------------------------------------------------------------------
{
	// R = I-(I・N)*2N
	let d = 2*(I.x*N.x + I.y*N.y);
 	return vsub2( I , vec2( d*N.x, d*N.y ) ); // I-dN
}

//------------------------------------------------------------------------------
function refract2( I, N, eta ) // 2021/11/16
//------------------------------------------------------------------------------
{
	let R = vec2(0,0);
	let k = 1.0 - eta * eta * (1.0 - dot2(N, I) * dot2(N, I));
	if ( k >= 0.0 )
	{
		let a = eta * I - (eta * dot2(N, I) + Math.sqrt(k));
		R = vmuls2( N, a );
	}
	return R;
}
//------------------------------------------------------------------------------
function vmul_scalar2( a, s )
//------------------------------------------------------------------------------
{
	return vec2(
		a.x * s,
		a.y * s 
	);
}
//------------------------------------------------------------------------------
function vmuls2( a, s ) // 2021/08/15
//------------------------------------------------------------------------------
{
	return vmul_scalar2( a,s )
}
//------------------------------------------------------------------------------
function vscale2( a, s ) // 2022/07/06
//------------------------------------------------------------------------------
{
	return vmul_scalar2( a,s )
}

//------------------------------------------------------------------------------
function vdiv_scalar2( a, s ) // 2021/07/26 追加
//------------------------------------------------------------------------------
{
	return vec2(
		a.x / s,
		a.y / s 
	);
}
//------------------------------------------------------------------------------
function vdivs2( a, s ) // 2021/08/16
//------------------------------------------------------------------------------
{
	return vdiv_scalar2( a,s )
}

//------------------------------------------------------------------------------
function vneg2( a )
//------------------------------------------------------------------------------
{
	return vec2( -a.x, -a.y );
}
//------------------------------------------------------------------------------
function dot2( a, b )
//------------------------------------------------------------------------------
{
	return a.x*b.x + a.y*b.y;
}
//------------------------------------------------------------------------------
function cross2( a, b )
//------------------------------------------------------------------------------
{
	return a.x*b.y-a.y*b.x;
}

//------------------------------------------------------------------------------
function length2( v )	//	 as abs()
//------------------------------------------------------------------------------
{
	if ( v.x==0 && v.y==0 ) return 0; // 2021/07/28 add
	return Math.sqrt(v.x*v.x+v.y*v.y);
}
//------------------------------------------------------------------------------
function vcopy2( v )
//------------------------------------------------------------------------------
{
	return vec2(v.x,v.y);
}
//------------------------------------------------------------------------------
function vcopy3( v )
//------------------------------------------------------------------------------
{
	return vec3(v.x,v.y,v.z);
}
//------------------------------------------------------------------------------
function vcopy4( v )
//------------------------------------------------------------------------------
{
	return vec4(v.x,v.y,v.z,v.w);
}
//------------------------------------------------------------------------------
function normalize2( v )
//------------------------------------------------------------------------------
{
	if ( v.x == 0 && v.y == 0 ) return vec2(0,0);
	let s = 1/Math.sqrt( v.x*v.x + v.y*v.y );
	return vec2(
		v.x * s,
		v.y * s
	);
}

//------------------------------------------------------------------------------
function vrot2( v, th )	// 2021/08/03 二次元回転関数
//------------------------------------------------------------------------------
{
	let s = Math.sin(th);
	let c = Math.cos(th);
	if(0)
	{
		// c,  s
		//-s,  c
		return new vec2( 
			 v.x*c + v.y*s,
			-v.x*s + v.y*c
		);
	}
	else
	{
		//『ユークリッド空間の2次元空間では、原点中心の θ 回転（反時計回りを正とする）の回転行列』(wiki)
		return new vec2( 
			 v.x*c - v.y*s,
			 v.x*s + v.y*c
		);
	}
}




///// geom 2021/05/07 vec3対応

//-----------------------------------------------------------------------------
function radians( v )
//-----------------------------------------------------------------------------
{
	return v/180*Math.PI;
}
//-----------------------------------------------------------------------------
function degrees( v )
//-----------------------------------------------------------------------------
{
	return v*180/Math.PI;
}
function vec3( x, y, z )	// 2021/05/06 クラスを止めて配列化
{
	return {x:x, y:y, z:z};
}
function vec4( x, y, z, w )	// 2021/05/06 クラスを止めて配列化
{
	return {x:x, y:y, z:z, w:w};
}
function quat( w, i, j, k )	// 2022/06/26	内部構造は
{
//	return vec4(i,j,k,w);
	return {w:w, i:i, j:j, k:k};
}
function QP( Q, P )
{
	return {Q:Q,P:P};	// vec4 Q; vec3 P;
}

//---------------------------------------------------------------------
function QP_mul( parent, child ) // QP child; QP parent
//---------------------------------------------------------------------
{
	let P = vadd( parent.P, vmul_QvC( parent.Q, child.P ) );	//cul:16+16+4
	let Q = qmul( parent.Q, child.Q );											//cul:16
	return QP( Q, P );
}

//------------------------------------------------------------------------------
function dot( a, b )
//------------------------------------------------------------------------------
{
	return a.x*b.x + a.y*b.y + a.z*b.z;
}
//------------------------------------------------------------------------------
function cross( a, b )
//------------------------------------------------------------------------------
{
	return vec3(
		a.y*b.z-a.z*b.y,
		a.z*b.x-a.x*b.z,
		a.x*b.y-a.y*b.x
	);
}
//------------------------------------------------------------------------------
function length( v )
//------------------------------------------------------------------------------
{
	return Math.sqrt( v.x*v.x + v.y*v.y + v.z*v.z );
}

//------------------------------------------------------------------------------
function normalize( v )
//------------------------------------------------------------------------------
{
	let s = 1/Math.sqrt( v.x*v.x + v.y*v.y + v.z*v.z );
	return vec3(
		v.x * s,
		v.y * s,
		v.z * s
	);
}

//------------------------------------------------------------------------------
function vadd( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		a.x +b.x,
		a.y +b.y,
		a.z +b.z
	);
}
//------------------------------------------------------------------------------
function vsub( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		a.x -b.x,
		a.y -b.y,
		a.z -b.z
	);
}
//------------------------------------------------------------------------------
function vmul( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		a.x *b.x,
		a.y *b.y,
		a.z *b.z
	);
}
//------------------------------------------------------------------------------
function vdiv( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		a.x /b.x,
		a.y /b.y,
		a.z /b.z
	);
}
//------------------------------------------------------------------------------
function vscale( a, s ) // 2022/07/06
//------------------------------------------------------------------------------
{
	return vmul( a, vec3(s,s,s) );
}
//------------------------------------------------------------------------------
function vmax( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		Math.max(a.x,b.x),
		Math.max(a.y,b.y),
		Math.max(a.z,b.z)
	);
}
//------------------------------------------------------------------------------
function vmin( a, b )
//------------------------------------------------------------------------------
{
	return vec3( 
		Math.min(a.x,b.x),
		Math.min(a.y,b.y),
		Math.min(a.z,b.z)
	);
}
//------------------------------------------------------------------------------
function reflect( I, N )
//------------------------------------------------------------------------------
{
	let a = 2*dot(I,N);
 	return vsub( I , vmul( vec3(a,a,a), N ) );
}
//------------------------------------------------------------------------------
function refract( I, N, eta )
//------------------------------------------------------------------------------
{
	let R = vec3(0,0,0);
	let k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
	if ( k < 0.0 )
	{
		R = vec3(0,0,0);
	}
	else
	{
	//	R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
		let ve = vec3(eta,eta,eta);
		let a = vmul( ve , I ); 
		let b = eta * dot(N, I);
		let c = b + Math.sqrt(k);
		let d = vmul( vec3(c,c,c) , N);
		R = vsub(a , d);

	}
	return R;
}

function mat4(		// 2021/05/06 二次元配列化
		m00,m01,m02,m03,
		m10,m11,m12,m13,
		m20,m21,m22,m23,
		m30,m31,m32,m33)
{
	return [
		[m00,m01,m02,m03],
		[m10,m11,m12,m13],
		[m20,m21,m22,m23],
		[m30,m31,m32,m33]
	];
}


//---------------------------------------------------------------------
function mperspective( fovy, aspect, n, f ) // 2021/05/04 GLに準拠
//---------------------------------------------------------------------
{
	// n : ニアクリップ、必ず正の値を指定	= 視点から投影面までの距離
	// f : ファークリップ、必ず正の値を指定
	// gluPerspective
  	//
	//	Y-up
	//	Z奥がマイナス、手前が＋（右手系座標系）
	//	

    let y = n * Math.tan(fovy * Math.PI / 360.0);
    let x = y * aspect;

	return mfrustum( -x, x, -y, y, n, f );
}

//---------------------------------------------------------------------
function mfrustum( l, r, b, t, n, f ) //2021/05/04 GLに準拠
//---------------------------------------------------------------------
{
	// | 2n/(r-l)   0          (r+l)/(r-l) 0           |	// 数学的表記
	// | 0          2n/(t-b)   (t+b)/(t-b) 0           |
	// | 0          0          (f+n)/(f-n) 2fn/(f-n)   |
	// | 0          0         -1           0           |
  	//
	// glFrustum(-1.0, 1.0, -1.0, 1.0, 1.5, 20.0);
  	//
	//	Y-up
	//	Z奥がマイナス

	return mat4(
		2*n/(r-l)	,	0			,	0				,	0	,
			0		,	2*n/(t-b)	,	0				,	0	,
		(r+l)/(r-l)	,	(t+b)/(t-b)	,	-(f+n)/(f-n)	,	-1	,
			0		,	0			,	-(2*f*n)/(f-n)	,	0	);
}
//---------------------------------------------------------------------
function mortho ( l, r, b, t, n, f ) //GL 準拠
//---------------------------------------------------------------------
{
	// glOrtho(-2.0, 2.0, -2.0, 2.0, -1.5, 1.5);
	//
	//	Y-up
	//	Z奥がマイナス

	let tx =  -(r+l)/(r-l);
	let ty =  -(t+b)/(t-b);
	let tz =  -(f+n)/(f-n);

	return mat4(
		2/(r-l)		,	0			,	0			,	0			,
		0			,	2/(t-b)		,	0			,	0			,
		0			,	0			,	-2/(f-n)	,	0			,
		tx			,	ty			,	tz			,	1			);
}
//---------------------------------------------------------------------
function midentity() 
//---------------------------------------------------------------------
{
	//	|	1	0	0	tx	|	// 数学的表記
	//	|	0	1	0	ty	|
	//	|	0	0	1	tz	|
	//	|	0	0	0	1	|
	return mat4(
		1	,	0	,	0	,	0	,
		0	,	1	,	0	,	0	,
		0	,	0	,	1	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mtrans( v )	// vec3 v 	// GL準拠＆列優先
//---------------------------------------------------------------------
{
	//|1 0 0 0||1 0 0 x| |1 0 0 x|	//  数学的表記	掛け算の場合
	//|0 1 0 0||0 1 0 y|=|0 1 0 y|
	//|0 0 1 0||0 0 1 z| |0 0 1 z|
	//|0 0 0 1||0 0 0 1| |0 0 0 1|

	//	|	1	0	0	tx	|	// 数学的表記
	//	|	0	1	0	ty	|
	//	|	0	0	1	tz	|
	//	|	0	0	0	1	|
	return mat4(	// GL準拠＆列優先 
		1	,	0	,	0	,	0	,
		0	,	1	,	0	,	0	,
		0	,	0	,	1	,	0	,
		v.x	,	v.y	,	v.z	,	1	
	);
}
//---------------------------------------------------------------------
function mscale( v )	// 2021/05/06 GL準拠＆列優先
//---------------------------------------------------------------------
{
	//	|	x	0	0	tx	|	// 数学的表記
	//	|	0	y	0	ty	|
	//	|	0	0	z	tz	|
	//	|	0	0	0	1	|
	return mat4(
		v.x	,	0	,	0	,	0	,
		0	,	v.y	,	0	,	0	,
		0	,	0	,	v.z	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotx( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
	//	|	1		0		0		tx	|	// 数学的表記
	//	|	0		cosθ	-s		ty	|
	//	|	0		sinθ	cosθ	tz	|
	//	|	0		0		0		1	|
	let c = Math.cos(th);
	let s = Math.sin(th);
	return mat4(	// GL準拠＆列優先 
		1	,	0	,	0	,	0	,
		0	,	c	,	s	,	0	,
		0	,	-s	,	c	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mroty( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
	//	|	cosθ	0		sinθ	tx	|	// 数学的表記
	//	|	0		1		0		ty	|
	//	|	-sinθ	0		cosθ	tz	|
	//	|	0		0		0		1	|
	let c = Math.cos(th);
	let s = Math.sin(th);
	return mat4(	// GL準拠＆列優先
		c	,	0	,	-s	,	0	,
		0	,	1	,	0	,	0	,
		s	,	0	,	c	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotz( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
	//	|	cosθ	-sinθ	0		tx	|	// 数学的表記
	//	|	sinθ	cosθ	0		ty	|
	//	|	0		0		1		tz	|
	//	|	0		0		0		1	|
	let c = Math.cos(th);
	let s = Math.sin(th);
	return mat4(	// GL準拠＆列優先 
		c	,	s	,	0	,	0	,
		-s	,	c	,	0	,	0	,
		0	,	0	,	1	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotate( th, axis ) // 2021/05/06 回転行列だけを返す
//---------------------------------------------------------------------
{

	let {x,y,z} = normalize( axis );
	let s = Math.sin(th);
	let c = Math.cos(th);
	let q = 1-c;

	return mat4(	// GL準拠＆列優先 
		x*x*q+c		,	y*x*q+z*s	,	z*x*q-y*s	,	0	,
		x*y*q-z*s	,	y*y*q+c		,	z*y*q+x*s	,	0	,
		x*z*q+y*s	,	y*z*q-x*s	,	z*z*q+c		,	0	,
		0			,	0			,	0			,	1	);
}
//---------------------------------------------------------------------
function mmul( S, T )  //  mat4 S, mat4 T	 GL準拠＆列優先
//---------------------------------------------------------------------
{
	// |a b c d|   |A B C D|   |aA+bE+cI+dM aB+bF+cJ+dN aC+bG+cK+dO aD+bH+cL+dP|	//数学的表記
	// |e f g h| X |E F G H| = |eA+fE+gI+hM eB+fF+gJ+hN eC+fG+gK+hO eD+fH+gL+hP|
	// |i j k l|   |I J K L|   |iA+jE+kI+lM iB+jF+kJ+lN iC+jG+kK+lO iD+jH+kL+lP|
	// |m n o p|   |M N O P|   |mA+nE+oI+pM mB+nF+oJ+pN mC+nG+oK+pO mD+nH+oL+pP|

	let a=S[0][0];	let b=S[1][0];	let c=S[2][0];	let d=S[3][0];
	let e=S[0][1];	let f=S[1][1];	let g=S[2][1];	let h=S[3][1];
	let i=S[0][2];	let j=S[1][2];	let k=S[2][2];	let l=S[3][2];
	let m=S[0][3];	let n=S[1][3];	let o=S[2][3];	let p=S[3][3];

	let A=T[0][0];	let B=T[1][0];	let C=T[2][0];	let D=T[3][0];	
	let E=T[0][1];	let F=T[1][1];	let G=T[2][1];	let H=T[3][1];
	let I=T[0][2];	let J=T[1][2];	let K=T[2][2];	let L=T[3][2];
	let M=T[0][3];	let N=T[1][3];	let O=T[2][3];	let P=T[3][3];

	return mat4(	// GL準拠＆列優先
		a*A+b*E+c*I+d*M,	e*A+f*E+g*I+h*M,	i*A+j*E+k*I+l*M,	m*A+n*E+o*I+p*M,
		a*B+b*F+c*J+d*N,	e*B+f*F+g*J+h*N,	i*B+j*F+k*J+l*N,	m*B+n*F+o*J+p*N,
		a*C+b*G+c*K+d*O,	e*C+f*G+g*K+h*O,	i*C+j*G+k*K+l*O,	m*C+n*G+o*K+p*O,
		a*D+b*H+c*L+d*P,	e*D+f*H+g*L+h*P,	i*D+j*H+k*L+l*P,	m*D+n*H+o*L+p*P
	);

}



/*
//----------------------------------------------------------
function	minverse( M ) // 変換ミスがいくつかあった
//----------------------------------------------------------
{
	let z1=4;  //配列の次数

	let A = midentity();
	for( let i = 0 ; i < z1 ; i++ ) 
	for( let j = 0 ; j < z1 ; j++ ) 
	A[i][j]=M[i][j];// 配列コピー

//	A = M.concat();	// 配列コピー
	
	let I = midentity();
	

	//掃き出し法
	for( let i = 0 ; i < z1 ; i++ )
	{
		let f =1/A[i][i];
		for( let j = 0 ; j < z1 ; j++ )
		{
			A[i][j] *= f;
			I[i][j] *= f;
		}
		for( let j = 0 ; j < z1 ; j++ )
		{
			if( i !=j )
			{
				f= A[j][i];
				for( let k = 0 ; k < z1 ; k++ )
				{
					A[j][k] -= A[i][k]*f;
					I[j][k] -= I[i][k]*f;
				}
			}
		}
	}
	return	I;
}
*/
//----------------------------------------
function minverse( M ) // 20_01/05/25 別のアルゴリズムに交換
//----------------------------------------
{

	// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm

	let	m00 = M[0][0], m01 = M[0][1], m02 = M[0][2], m03 = M[0][3];
	let	m10 = M[1][0], m11 = M[1][1], m12 = M[1][2], m13 = M[1][3];
	let	m20 = M[2][0], m21 = M[2][1], m22 = M[2][2], m23 = M[2][3];
	let	m30 = M[3][0], m31 = M[3][1], m32 = M[3][2], m33 = M[3][3];

	let	a00 = m21 * m32 * m13 - m31 * m22 * m13 + m31 * m12 * m23 - m11 * m32 * m23 - m21 * m12 * m33 + m11 * m22 * m33;
	let	a10 = m30 * m22 * m13 - m20 * m32 * m13 - m30 * m12 * m23 + m10 * m32 * m23 + m20 * m12 * m33 - m10 * m22 * m33;
	let	a20 = m20 * m31 * m13 - m30 * m21 * m13 + m30 * m11 * m23 - m10 * m31 * m23 - m20 * m11 * m33 + m10 * m21 * m33;
	let	a30 = m30 * m21 * m12 - m20 * m31 * m12 - m30 * m11 * m22 + m10 * m31 * m22 + m20 * m11 * m32 - m10 * m21 * m32;

	let det = m00 * a00 + m01 * a10 + m02 * a20 + m03 * a30;

	if ( det == 0 ) 
	{
		let msg = "err minverse";
		console.warn(msg);
		return midentity();
	}
	
	let invd = 1 / det;

	return mat4(
		a00 * invd,
		( m31 * m22 * m03 - m21 * m32 * m03 - m31 * m02 * m23 + m01 * m32 * m23 + m21 * m02 * m33 - m01 * m22 * m33 ) * invd,
		( m11 * m32 * m03 - m31 * m12 * m03 + m31 * m02 * m13 - m01 * m32 * m13 - m11 * m02 * m33 + m01 * m12 * m33 ) * invd,
		( m21 * m12 * m03 - m11 * m22 * m03 - m21 * m02 * m13 + m01 * m22 * m13 + m11 * m02 * m23 - m01 * m12 * m23 ) * invd,
		a10 * invd,
		( m20 * m32 * m03 - m30 * m22 * m03 + m30 * m02 * m23 - m00 * m32 * m23 - m20 * m02 * m33 + m00 * m22 * m33 ) * invd,
		( m30 * m12 * m03 - m10 * m32 * m03 - m30 * m02 * m13 + m00 * m32 * m13 + m10 * m02 * m33 - m00 * m12 * m33 ) * invd,
		( m10 * m22 * m03 - m20 * m12 * m03 + m20 * m02 * m13 - m00 * m22 * m13 - m10 * m02 * m23 + m00 * m12 * m23 ) * invd,
		a20 * invd,
		( m30 * m21 * m03 - m20 * m31 * m03 - m30 * m01 * m23 + m00 * m31 * m23 + m20 * m01 * m33 - m00 * m21 * m33 ) * invd,
		( m10 * m31 * m03 - m30 * m11 * m03 + m30 * m01 * m13 - m00 * m31 * m13 - m10 * m01 * m33 + m00 * m11 * m33 ) * invd,
		( m20 * m11 * m03 - m10 * m21 * m03 - m20 * m01 * m13 + m00 * m21 * m13 + m10 * m01 * m23 - m00 * m11 * m23 ) * invd,
		a30 * invd,
		( m20 * m31 * m02 - m30 * m21 * m02 + m30 * m01 * m22 - m00 * m31 * m22 - m20 * m01 * m32 + m00 * m21 * m32 ) * invd,
		( m30 * m11 * m02 - m10 * m31 * m02 - m30 * m01 * m12 + m00 * m31 * m12 + m10 * m01 * m32 - m00 * m11 * m32 ) * invd,
		( m10 * m21 * m02 - m20 * m11 * m02 + m20 * m01 * m12 - m00 * m21 * m12 - m10 * m01 * m22 + m00 * m11 * m22 ) * invd);

}
//---------------------------------------------------------------------
function vec4_vmul_vM( v, M ) // 列優先 
//---------------------------------------------------------------------
{
	//					|	00	10	20	30	|		// 数学的表記
	//	| x y z w |	 X	|	01	11	21	31	|
	//					|	02	12	22	32	|
	//					|	03	13	23	33	|

	return vec4(
		v.x * M[0][0] +  v.y * M[0][1] +  v.z * M[0][2] +  v.w * M[0][3] ,
		v.x * M[1][0] +  v.y * M[1][1] +  v.z * M[1][2] +  v.w * M[1][3] ,
		v.x * M[2][0] +  v.y * M[2][1] +  v.z * M[2][2] +  v.w * M[2][3] ,
		v.x * M[3][0] +  v.y * M[3][1] +  v.z * M[3][2] +  v.w * M[3][3]
	);
}
//---------------------------------------------------------------------
function vmul_vM( v, M ) // 列優先 2021/05/23 バグ修正vec4->vec3 
//---------------------------------------------------------------------
{
	//					|	00	10	20	|			// 数学的表記
	//	| x y z 1 |	X	|	01	11	21	|
	//					|	02	12	22	|
	//					|	03	13	23	|

	return vec3(
		v.x * M[0][0] +  v.y * M[0][1] +  v.z * M[0][2] +  1 * M[0][3] ,
		v.x * M[1][0] +  v.y * M[1][1] +  v.z * M[1][2] +  1 * M[1][3] ,
		v.x * M[2][0] +  v.y * M[2][1] +  v.z * M[2][2] +  1 * M[2][3] ,
	);
}

//---------------------------------------------------------------------
function vec4_vmul_Mv( M, v ) // 列優先 
//---------------------------------------------------------------------
{
	//	|	00	10	20	30	|		| x |			// 数学的表記
	//	|	01	11	21	31	|		| y	|
	//	|	02	12	22	32	|	X	| z	|
	//	|	03	13	23	33	|		| w	|

	return vec4(
		M[0][0] * v.x +  M[1][0] * v.y +  M[2][0] * v.z +  M[3][0] * v.w,
		M[0][1] * v.x +  M[1][1] * v.y +  M[2][1] * v.z +  M[3][1] * v.w,
		M[0][2] * v.x +  M[1][2] * v.y +  M[2][2] * v.z +  M[3][2] * v.w,
		M[0][3] * v.x +  M[1][3] * v.y +  M[2][3] * v.z +  M[3][3] * v.w
	);
}
//---------------------------------------------------------------------
function vmul_Mv( M, v ) // 列優先 	2021/05/07 	mat4 M, vec3 v
//---------------------------------------------------------------------
{
	//	|	00	10	20	30	|		| x |			// 数学的表記
	//	|	01	11	21	31	|	X	| y	|
	//	|	02	12	22	32	|		| z	|
	//								| 1	|

	return vec3(
		M[0][0] * v.x +  M[1][0] * v.y +  M[2][0] * v.z +  M[3][0] * 1,
		M[0][1] * v.x +  M[1][1] * v.y +  M[2][1] * v.z +  M[3][1] * 1,
		M[0][2] * v.x +  M[1][2] * v.y +  M[2][2] * v.z +  M[3][2] * 1,
	);
}
//-----------------------------------------------------------------------------
function mlookat( eye, at, up=vec3(0,1,0)  )	// V マトリクスを作成
//-----------------------------------------------------------------------------
{
	if(0)
	{
		let m = midentity();
		let v = vsub( at, eye );
		let ry = Math.atan2(v.x,-v.z);
		let xy = Math.sqrt(v.x*v.x+v.z*v.z);
		let rx = Math.atan2(-v.y,xy);

		m = mmul( m, mrotx( rx ) );
		m = mmul( m, mroty( ry ) );
		m = mmul( m, mtrans( vec3( -eye.x, -eye.y, -eye.z )) );
		return m;
	}
	else
	{	// カメラ行列を生成し、逆マトリクスにする。
		let	z = normalize( vsub( eye, at ) );
		let	x = normalize( cross( up, z  ) );
		let	y = cross( z, x );

		let m = mat4(
			x.x		,	x.y		,	x.z		,	0	,
			y.x		,	y.y		,	y.z		,	0	,
			z.x		,	z.y		,	z.z		,	0	,
			eye.x	,	eye.y	,	eye.z	,	1	
		);
		return minverse(m);
	}
}

// Quaternion functions
//-----------------------------------------------------------------------------
function qidentity()
//-----------------------------------------------------------------------------
{
	return vec4(0,0,0,1);
}
//-----------------------------------------------------------------------------
function qnormalize( Q )
//-----------------------------------------------------------------------------
{
	//四元数>http://hooktail.sub.jp/mathInPhys/quaternion/
	let s = 1/Math.sqrt( Q.x*Q.x + Q.y*Q.y + Q.z*Q.z + Q.w*Q.w );
	return vec4(
		Q.x * s,
		Q.y * s,
		Q.z * s,
		Q.w * s
	);
}
//-----------------------------------------------------------------------------
function qabs( Q )	// 絶対値
//-----------------------------------------------------------------------------
{
	//Quaternionによる3次元の回転変換>https://qiita.com/kenjihiranabe/items/945232fbde58fab45681
	if ( Q.x==0 && Q.y==0 && Q.z==0 && Q.w==0 ) return 0;
	return Math.sqrt( Q.x*Q.x + Q.y*Q.y + Q.z*Q.z + Q.w*Q.w );
}
//-----------------------------------------------------------------------------
function qscale( Q, s )	// スケール
//-----------------------------------------------------------------------------
{
	return vec4(
		Q.x * s,
		Q.y * s,
		Q.z * s,
		Q.w * s
	);
}
//-----------------------------------------------------------------------------
function qconjugation( Q )	// 共役
//-----------------------------------------------------------------------------
{
	//四元数>http://hooktail.sub.jp/mathInPhys/quaternion/
	
	return vec4( -Q.x, -Q.y, -Q.z,  Q.w );
}
//-----------------------------------------------------------------------------
function qinverse( Q )	// 逆数
//-----------------------------------------------------------------------------
{
	//四元数>http://hooktail.sub.jp/mathInPhys/quaternion/
	// ※単位クォータニオンの場合は、逆数＝共役、になる

	let a = qabs( Q );
	let b = a*a;
	let C = qconjugation( Q );
	return vec4( 
		C.x/b, 
		C.y/b, 
		C.z/b, 
		C.w/b
	);
}
//-----------------------------------------------------------------------------
function qmul( A, B )	// vec4 A, vec4 B
//-----------------------------------------------------------------------------
{
	//https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/arithmetic/index.htm
	//※ijk=-1
	//※ii=-1
	//※jj=-1
	//※kk=-1
	//※ij=k
	//※jk=i
	//※ki=j
	//※ji=-k
	//※kj=-i
	//※ik=-j
	//A={w:a,x:b,y:c,z:d}=a+ib+jc+kd
	//B={w:f,x:g,y:h,z:e}=e+if+jg+kh
	//A*B
	//=(a+ib+jc+kd)(e+if+jg+kh)
	//= ae+iaf+jag+kah  +  ibe+ibif+ibjg+ibkh  +  jce+jcif+jcjg+jckh  +  kde+kdif+kdjg+kdkh
	//= ae+iaf+jag+kah  +  ibe+(-1)bf+(k)bg+(-j)bh  +  jce+(-k)cf+(-1)cg+(i)ch  +  kde+(j)df+(-i)dg+(-1)dh
	//= ae+iaf+jag+kah  +  ibe-bf+kbg-jbh  +  jce+-kcf-cg+ich  +  kde+jdf-idg-dh
	//= ae-bf-cg-dh  +  i(af+be+ch-dg)  +  j(ag-bh+ce+df)  +  k(ah+bg-cf+de)
	//= ae-bf-cg-dh  +  i(af+be+ch-dg)  +  j(ag-bh+ce+df)  +  k(ah+bg-cf+de)
	//= {(
	// 	w:a*e-b*f-c*g-d*h
	//	x:a*f+b*e+c*h-d*g,
	// 	y:a*g-b*h+c*e+d*f,
	// 	z:a*h+b*g-c*f+d*e,
	// );

	{
		let [a,b,c,d] = [A.w,A.x,A.y,A.z];
		let [e,f,g,h] = [B.w,B.x,B.y,B.z];
		return {
			w:a*e - b*f - c*g - d*h,	// 計算量 MUL16
			x:a*f + b*e + c*h - d*g,
			y:a*g - b*h + c*e + d*f,
			z:a*h + b*g - c*f + d*e
		};
	}


}

//-----------------------------------------------------------------------------
function qrot_axis( axis, th  )		// 	vec3 axis, float th
//-----------------------------------------------------------------------------
{
	//https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation

	let s = Math.sin(th/2);
	return vec4(
		s*axis.x,
		s*axis.y,
		s*axis.z,
		Math.cos(th/2)
	);
}
//-----------------------------------------------------------------------------
function qroty( th )
//-----------------------------------------------------------------------------
{
	return	qrot_axis( vec3(0,1,0), th  );
}
//-----------------------------------------------------------------------------
function qrotz( th )
//-----------------------------------------------------------------------------
{
	return	qrot_axis( vec3(0,0,1), th  );
}
//-----------------------------------------------------------------------------
function qrotx( th )
//-----------------------------------------------------------------------------
{
	return	qrot_axis( vec3(1,0,0), th  );
}

//-----------------------------------------------------------------------------
function  qslerp( A, B, t )	//from D3DMath_SlerpQuaternions
//-----------------------------------------------------------------------------
{
	let ratioA;
	let ratioB;

	// Compute dot product, aka cos(theta):
	let fCosTheta = A.x*B.x + A.y*B.y + A.z*B.z + A.w*B.w;

	if( fCosTheta < 0.0 )
	{
		// Flip start quaternion
		A.x = -A.x; A.y = -A.y; A.x = -A.z; A.w = -A.w;
		fCosTheta = -fCosTheta;
	}

	if( fCosTheta + 1.0 > 0.05 )
	{
		// If the quaternions are close, use linear interploation
		if( 1.0 - fCosTheta < 0.05 )
		{
			ratioA = 1.0 - t;
			ratioB = t;
		}
		else // Otherwise, do spherical interpolation
		{
			let fTheta	= Math.acos( fCosTheta );
			let fSinTheta = Math.sin( fTheta );
			
			ratioA = Math.sin( fTheta * (1.0 -t) ) / fSinTheta;
			ratioB = Math.sin( fTheta * t ) / fSinTheta;
		}
	}
	else
	{
		B.x = -A.y;
		B.y =  A.x;
		B.z = -A.w;
		B.w =  A.z;
		ratioA = Math.sin( Math.PI * (0.5 - t) );
		ratioB = Math.sin( Math.PI * t );
	}

	return vec4(
		ratioA * A.x + ratioB * B.x,
		ratioA * A.y + ratioB * B.y,
		ratioA * A.z + ratioB * B.z,
		ratioA * A.w + ratioB * B.w
	);
}
//-----------------------------------------------------------------------------
function vmul_QvC( Q, v )	// vec4 Q, vec3 P	return vec3
//-----------------------------------------------------------------------------
{
	let v2 = vec4( v.x, v.y, v.z, 0 );
	let v3 = qmul(Q, qmul( v2, qconjugation( Q ) )  );
	return v3;
	
}
/*
//-----------------------------------------------------------------------------
function qrotatev( Q, P )	// vec4 Q, vec4 P		vmul_Mv	vmulc_QvQ
//-----------------------------------------------------------------------------
{
	// P'=QPQ^-1
	return qmul(Q, qmul( P, qconjugation( Q ) )  );
}
*/

//-----------------------------------------------------------------------------
function mq( Q )		// vec4 Q
//-----------------------------------------------------------------------------
{
	//www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/index.htm
	//	Q = ix + jy + kz +w 
	let mat;
	let xx = Q.x*Q.x; 
	let yy = Q.y*Q.y; 
	let zz = Q.z*Q.z;
	let xy = Q.x*Q.y; 
	let xz = Q.x*Q.z; 
	let yz = Q.y*Q.z;
	let xw = Q.x*Q.w; 
	let yw = Q.y*Q.w; 
	let zw = Q.z*Q.w;

	let m00=1-2*(yy+zz);let m01=  2*(xy-zw);let m02=  2*(xz+yw);	// 数学的表記
	let m10=  2*(xy+zw);let m11=1-2*(xx+zz);let m12=  2*(yz-xw);
	let m20=  2*(xz-yw);let m21=  2*(yz+xw);let m22=1-2*(xx+yy);

	return mat4(	// GL式列優先
		m00,m10,m20, 0,
		m01,m11,m21, 0,
		m02,m12,m22, 0,
		 0, 0, 0, 1
	)
	
}
//-----------------------------------------------------------------------------
function qm( M ) // mat4 M
//-----------------------------------------------------------------------------
{
	//https://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
	//  T = 4 - 4*qx2 - 4*qy2 - 4*qz2	
	//	= 4( 1 -qx2 - qy2 - qz2 )
	//	= m00 + m11 + m22 + 1
	//  S = 0.5 / sqrt(T)
	//  W = 0.25 / S
	//  X = ( m21 - m12 ) * S
	//  Y = ( m02 - m20 ) * S
	//  Z = ( m10 - m01 ) * S

	// 列優先を数学的行優先に置き換え
	let m00 = M[0][0];	let m01 = M[1][0];	let m02 = M[2][0];
	let m10 = M[0][1];	let m11 = M[1][1];	let m12 = M[2][1];
	let m20 = M[0][2];	let m21 = M[1][2];	let m22 = M[2][2];

	{
		let q={};

		let tr = m00 + m11 + m22;

		if (tr > 0) 
		{ 
			let S = Math.sqrt(tr+1.0) * 2; // S=4*qw 
			q.w = 0.25 * S;
			q.x = (m21 - m12) / S;
			q.y = (m02 - m20) / S; 
			q.z = (m10 - m01) / S; 
		} 
		else 
		if ((m00 > m11)&(m00 > m22)) 
		{ 
			let S = Math.sqrt(1.0 + m00 - m11 - m22) * 2; // S=4*qx 
			q.w = (m21 - m12) / S;
			q.x = 0.25 * S;
			q.y = (m01 + m10) / S; 
			q.z = (m02 + m20) / S; 
		} 
		else 
		if (m11 > m22) 
		{ 
			let S = Math.sqrt(1.0 + m11 - m00 - m22) * 2; // S=4*qy
			q.w = (m02 - m20) / S;
			q.x = (m01 + m10) / S; 
			q.y = 0.25 * S;
			q.z = (m12 + m21) / S; 
		} 
		else 
		{ 
			let S = Math.sqrt(1.0 + m22 - m00 - m11) * 2; // S=4*qz
			q.w = (m10 - m01) / S;
			q.x = (m02 + m20) / S;
			q.y = (m12 + m21) / S;
			q.z = 0.25 * S;
		}
		q = qnormalize( q );	// 行列の歪みで壊れやすいので正規化
		return q;
	}
}

////


// 2021/07/24 KEY追加
const	KEY_F1	= 112;
const	KEY_F2	= 113;
const	KEY_F3	= 114;
const	KEY_F4	= 115;
const	KEY_F5	= 116;
const	KEY_F6	= 117;
const	KEY_F7	= 118;
const	KEY_F8	= 119;
const	KEY_F9	= 121;
const	KEY_F10	= 122;
const	KEY_F11	= 123;
const	KEY_F12 = 124;
const	KEY_DEL	= 46;
const	KEY_ESC	= 27;
const	KEY_BS	= 8;
const	KEY_TAB	= 9;
const	KEY_CAPS	= 20;
const	KEY_SHIFT	= 16;
const	KEY_CTRL	= 17;
const	KEY_ALT		= 18;
const	KEY_CR	= 13;
const	KEY_SPC	= 32;
const	KEY_0	= 48;	//0x30
const	KEY_1	= 49;	//0x31
const	KEY_2	= 50;	//0x32
const	KEY_3	= 51;	//0x33
const	KEY_4	= 52;	//0x34
const	KEY_5	= 53;	//0x35
const	KEY_6	= 54;	//0x36
const	KEY_7	= 55;	//0x37
const	KEY_8	= 56;	//0x38
const	KEY_9	= 57;	//0x39
const	KEY_A	= 65;	//0x41
const	KEY_B	= 66;	//0x42
const	KEY_C	= 67;	//0x43
const	KEY_D	= 68;	//0x44
const	KEY_E	= 69;	//0x45
const	KEY_F	= 70;	//0x46
const	KEY_G	= 71;	//0x47
const	KEY_H	= 72;	//0x48
const	KEY_I	= 73;	//0x49
const	KEY_J	= 74;	//0x4a
const	KEY_K	= 75;	//0x4b
const	KEY_L	= 76;	//0x4c
const	KEY_M	= 77;	//0x4d
const	KEY_N	= 78;	//0x4e
const	KEY_O	= 79;	//0x4f
const	KEY_P	= 80;	//0x50
const	KEY_Q	= 81;	//0x51
const	KEY_R	= 82;	//0x52
const	KEY_S	= 83;	//0x53
const	KEY_T	= 84;	//0x54
const	KEY_U	= 85;	//0x55
const	KEY_V	= 86;	//0x56
const	KEY_W	= 87;	//0x57
const	KEY_X	= 88;	//0x58
const	KEY_Y	= 89;	//0x59
const	KEY_Z	= 90;	//0x5a

const	KEY_LEFT	= 37;
const	KEY_UP		= 38;
const	KEY_RIGHT	= 39;
const	KEY_DOWN	= 40;

//-----------------------------------------------------------------------------
function ene_create( cv )	// 2021/08/15 U K Eのエネルギーを算出して波形を描画
//-----------------------------------------------------------------------------
{
	let ene={};
	let gra = gra_create( cv );

	let count = 0;
	
	ene.valmax = 0;
	ene.prot_x = 0;
	ene.time_max = 0;
	ene.cnt_prots = 0;
	ene.K = 0;
	ene.U = 0;
	ene.tbl_k = [];

	let hash_plugs = 
	{
		'E':{p0:vec2(0,0), p1:vec2(0,0), cr:0,cg:0,cb:0, xx_flgActive:false ,p:vec2(0,0),m:0, name:"E=U+K"  		} ,	// 3黒	E
		'U':{p0:vec2(0,0), p1:vec2(0,0), cr:0,cg:0,cb:1, xx_flgActive:false ,p:vec2(0,0),m:0, name:"U位置ｴﾈﾙｷﾞｰ" 	} ,	// 1青	U
		'K':{p0:vec2(0,0), p1:vec2(0,0), cr:1,cg:0,cb:0, xx_flgActive:false ,p:vec2(0,0),m:0, name:"K運動ｴﾈﾙｷﾞｰ"  	} ,	// 2赤	K
	};
	
	let tbl_prots = [];

	let reqReset = true;
	let reqLoop = false;
	let start_x = 0;


	//-----------------------------------------------------------------------------
	ene.reset = function( valmax, time_max=5 )
	//-----------------------------------------------------------------------------
	{
		ene.valmax = valmax;
		ene.valtop = valmax*1.3;
		ene.valbtm = -valmax/4;
		reqReset = true;
		reqLoop = false;
		ene.time_max = time_max;
	}

	//-----------------------------------------------------------------------------
//	ene.prot_pos2 = function( num, p, v, m ) // prot_entryへ移行予定
//	ene.prot_entry = function( px,py,pz, vx,vy,vz, m )
	ene.prot_entry2 = function( name, px,py,pz, vx,vy,vz, m )
	//-----------------------------------------------------------------------------
	{
		let num = ene.cnt_prots++;
		// 衝突が発生したときに正しく検出できないので速度を必要とする
		if ( num > 2000 ) 
		{
			alert("プロット数多すぎ。prot_entry()");
			return ;
		}
		if ( tbl_prots.length <= num ) 
		{
			tbl_prots.push( {name:"", px:px, py:py, pz:pz, vx:vx, vy:vy, vz:vz,m:0} );
			num = tbl_prots.length-1;
		}
		tbl_prots[num].name = name;
		tbl_prots[num].px = px;
		tbl_prots[num].py = py;
		tbl_prots[num].pz = pz;
		tbl_prots[num].vx = vx;
		tbl_prots[num].vy = vy;
		tbl_prots[num].vz = vz;
		tbl_prots[num].m = m;
	
	}

	//-----------------------------------------------------------------------------
	ene.calc = function( dt, g ) // dt:delta time , g:gravity (ex. 9.8m/s/s)
	//-----------------------------------------------------------------------------
	{
		ene.cnt_prots = 0;
		if ( reqReset ) 
		{
			count = 0;
			reqReset = false;
			reqLoop = true;
			start_x = gra.sx;
		}
		if ( reqLoop ) 
		{
			reqLoop = false;

			gra.window( 0,  ene.valtop, ene.time_max/dt, ene.valbtm );

			gra.setAspect(1,0);
			gra.cls();

			ene.prot_x = start_x;

			for ( let pl of Object.values(hash_plugs) )
			{
				pl.p0.x = gra.sx;
				pl.p0.y = pl.p1.y;
				pl.p1.x = gra.sx;
			}
			start_x = gra.sx+1;
			
			for ( let pl of Object.values(hash_plugs) )
			{
				gra.color( pl.cr, pl.cg, pl.cb );
				gra.print( pl.name );
			}

			gra.color(0.8,0.8,0.8);gra.line(gra.sx,0,gra.ex,0);
		}

		{		
			ene.U = 0;
			ene.K = 0;
			ene.tbl_k = [];
			for ( let it of tbl_prots )
			{
				{
					// 位置エネルギーの積算
					ene.U += (it.m * Math.abs(g) * it.py);

					// 運動エネルギーの積算
					{
						let vv = it.vx*it.vx + it.vy*it.vy + it.vz*it.vz;
						let k = 1/2*it.m*vv;
						ene.K += k;
						ene.tbl_k.push( {name:it.name,val:k} );
					}
				}
			}
			// 最大値自動調整
			if ( ene.valmax < ene.U+ene.K ) 
			{
				ene.valmax =  ene.U+ene.K;
				ene.valtop = ene.valmax*1.3;
				ene.valbtm = -ene.valmax/4;
			}

			hash_plugs['U'].p1 = vec2( ene.prot_x, ene.U );
			hash_plugs['K'].p1 = vec2( ene.prot_x, ene.K );
			hash_plugs['E'].p1 = vec2( ene.prot_x, ene.U+ene.K );
		}
		if ( ene.prot_x++ > gra.ex ) 
		{
			reqLoop = true;
		}
	}
	//-----------------------------------------------------------------------------
	ene.draw = function()
	//-----------------------------------------------------------------------------
	{

		for ( let pl of Object.values(hash_plugs) )
		{
			if ( count >=1 )
			{
				gra.color( pl.cr, pl.cg, pl.cb );
				gra.line( pl.p0.x, pl.p0.y, pl.p1.x, pl.p1.y );
			}
			pl.p0 = vcopy2(pl.p1);
		}
		count++;
	}
	//-----------------------------------------------------------------------------
	ene.drawK = function()
	//-----------------------------------------------------------------------------
	{
		for ( let k of ene.tbl_k )
		{
			let pl = hash_plugs['K'];
			gra.color( 0,0,0 );
			gra.dot( pl.p1.x, pl.p1.y, 1/2);

			gra.color( 1,0,0 );
			gra.dot( pl.p1.x, k.val, 1/2);

		}
		count++;
	}

	return ene;
}


//HTML ラッパー関数

//-----------------------------------------------------------------------------
function cv_convertImageData2Png( imgdata )	// ImageDataをBASE64の.pngデータに変換する
//-----------------------------------------------------------------------------
{
	let cv_img = window.document.createElement('canvas');
	cv_img.width = imgdata.width;
	cv_img.height = imgdata.height;

	const ctx = cv_img.getContext("2d");
	ctx.imageSmoothingEnabled = false; // スムージングOFF
	ctx.clearRect(0, 0, cv_img.width, cv_img.height);
	ctx.putImageData( imgdata,0,0);	

	return cv_img.toDataURL(); 
}
//-----------------------------------------------------------------------------
function	cv_requestLoadImagefile( filename )	// Imageファイル読込リクエスト
//-----------------------------------------------------------------------------
{
	let image  = new Image();
	image.src = filename;
	return image;
}

//-----------------------------------------------------------------------------
function cv_convertImage2ImaeData( image )	// Image → ImageData
//-----------------------------------------------------------------------------
{
	let cv = window.document.createElement('canvas');
	cv.width = image.naturalWidth;	// widthは表示サイズ。naturalWidthデータのサイズ。
	cv.height = image.naturalHeight;
	let ctx = cv.getContext('2d');
	ctx.drawImage( image, 0, 0);
	return ctx.getImageData( 0, 0, cv.width, cv.height );
}

// GL ラッパー関数＆定数

//-----------------------------------------------------------------------------
function gl_reset()
//-----------------------------------------------------------------------------
{
	{
		gl.enable( gl.POLYGON_OFFSET_FILL );
		gl.polygonOffset(1,1);
		//	GL_POLYGON_OFFSET_FILL、GL_POLYGON_OFFSET_LINE、またはGL_POLYGON_OFFSET_POINTが有効になっている場合、
		//	各フラグメントの深度値は、適切な頂点の深度値から補間された後にオフセットされます。 

		//	polygonOffset(GLfloat factor, GLfloat units);
		//	オフセットの値はfactor×DZ+r×unitsです。
		//	ここで、DZはポリゴンの画面領域に対する深さの変化の測定値であり、
		//	rは特定の値に対して解決可能なオフセットを生成することが保証されている最小値です。 
		//	オフセットは、深度テストが実行される前、および値が深度バッファーに書き込まれる前に追加されます。
	}
	gl.enable( gl.DEPTH_TEST );
	gl.depthFunc( gl.LEQUAL );	// gl.LESS;	最も奥が1.0、最も手前が0.0
	gl.enable( gl.CULL_FACE );	// デフォルトでは反時計回りが表示
	gl.cullFace(gl.BACK);		// defaulg:gl.BACK
}



let gl_vs_P4C = 
	 "attribute vec4 Pos4;"
	+"attribute vec3 Col3;"
	+"varying vec3 vColor;"
	+"void main( void )"
	+"{"
//挙動確認用コード 
//	+   "mat4 S = mat4( 0.5,  0.0,  0.0,  0.0,"
//	+   "              0.0,  0.5,  0.0,  0.0,"
//	+   "              0.0,  0.0,  0.5,  0.0,"
//	+   "              0.0,  0.0,  0.0,  1.0 );"
//	+   "float th = radians( 15.0 );"
//	+   "float c = cos( th );"
//	+   "float s = sin( th );"
//	+   "mat4 Rx = mat4( 1.0,  0.0,  0.0,  0.0,"
//	+   "               0.0,    c,   -s,  0.0,"
//	+   "               0.0,    s,    c,  0.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 Ry = mat4(  c,  0.0,    s,  0.0,"
//	+   "               0.0,  1.0,  0.0,  0.0,"
//	+   "                -s,  0.0,    c,  0.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 Rz = mat4(  c,   -s,  0.0,  0.0,"
//	+   "                 s,    c,  0.0,  0.0,"
//	+   "               0.0,  0.0,  1.0,  0.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 Tx = mat4( 1.0,  0.0,  0.0, -1.0,"
//	+   "               0.0,  1.0,  0.0,  0.0,"
//	+   "               0.0,  0.0,  1.0,  0.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 Ty = mat4( 1.0,  0.0,  0.0,  0.0,"
//	+   "               0.0,  1.0,  0.0,  1.0,"
//	+   "               0.0,  0.0,  1.0,  0.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 Tz = mat4( 1.0,  0.0,  0.0,  0.0,"
//	+   "               0.0,  1.0,  0.0,  0.0,"
//	+   "               0.0,  0.0,  1.0, -9.0,"
//	+   "               0.0,  0.0,  0.0,  1.0 );"
//	+   "mat4 T = Rz;         "
//	+   "float fovy=radians( 45.0 );     "
//	+   "float sc=1.0/tan( fovy/2.0 );   "
//	+   "float n=0.0;                  "
//	+   "float f=-1.0;                 "
//	+   "float aspect=1.0;             "
//	+	"mat4 Pm = mat4(               "
//	+	"	sc/aspect,     0.0,          0.0,              0.0,"
//	+	"	      0.0,      sc,          0.0,              0.0,"
//	+	"	      0.0,     0.0, -( f+n )/( f-n ), -( 2.0*f*n )/( f-n ),"
//	+	"	      0.0,     0.0,         -1.0,              0.0 );"
	+   "gl_Position = Pos4;"
	+   "vColor = Col3;"
	+"}"
;
let gl_vs_P3C = 
	 "attribute vec3 Pos3;"
	+"attribute vec3 Col3;"
	+"varying vec3 vColor;"
	+"void main( void )"
	+"{"
	+	"gl_Position = vec4( Pos3, 1.0 );"
	+   "vColor = Col3;"
	+"}"
;
		
let gl_fs_color =
	 "precision mediump float;"
	+"varying vec3 vColor;"
	+"void main( void )"
	+"{"
	+	"gl_FragColor = vec4( vColor, 1.0 );"
	+"}"
;
		
const gl_vs_P2U = " 								"
	+"attribute vec2	Pos2;					" // Pos2 = attribte["Pos2"][n]
	+"attribute vec2	Uv;						" // Uv  = attribte["Uv"][n]
	+"											"
	+"varying  vec2		uv;						" // uv = &fs.uv
	+"void main( void )							"
	+"{											"
	+"	gl_Position = vec4( Pos2,0,1 );			"
	+"	uv = Uv;								"
	+"}											";

const gl_fs_constant = " 						" // コンスタントカラー
	+"precision highp float;					"
	+"uniform sampler2D Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ]
	+"											"
	+"varying  vec2 	uv;						" 
	+"void main( void )							"
	+"{											"
	+"	gl_FragColor = texture2D( Tex0, uv );	"
	+"}											";

const gl_fs_gaussian_v = "  					" // ガウシアンブラーV
	+"precision highp float;					"
	+"uniform sampler2D	Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ]
	+"uniform vec2		Dot;					"
	+"uniform float		Gaus[20];				"
	+"											" 
	+"varying vec2	uv;							" 
	+"void main ( void )						" 
	+"{																		"
	+"	vec4 col  = texture2D( Tex0, uv ) * Gaus[0] ;						"
	+"	float v = 1.0;														"
	+"	for ( int i=1 ; i < 20 ; i++ ) {									" // version 200だと可変のforが使えない
	+"		col += texture2D( Tex0, uv + vec2( 0.0,  Dot.y*v ) ) * Gaus[i]; "
	+"		col += texture2D( Tex0, uv + vec2( 0.0, -Dot.y*v ) ) * Gaus[i]; "
	+"		v+=1.0;															"
	+"	}																	"
	+"	gl_FragColor = col;													"
	+"}																		";

const gl_fs_gaussian_h = "  					" // ガウシアンブラーH
	+"precision highp float;					" 
	+"uniform sampler2D	Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ] 
	+"uniform vec2		Dot;					"
	+"uniform float		Gaus[20];				"
	+"											" 
	+"varying vec2	uv;							" 
	+"void main ( void )						" 
	+"{																		"
	+"	vec4 col  = texture2D( Tex0, uv ) * Gaus[0] ;						"
	+"	float v = 1.0;														"
	+"	for ( int i=1 ; i < 20 ; i++ ) {									" // version 200だと可変のforが使えない
	+"		col += texture2D( Tex0, uv + vec2(  v*Dot.x, 0.0 ) ) * Gaus[i]; "
	+"		col += texture2D( Tex0, uv + vec2( -v*Dot.x, 0.0 ) ) * Gaus[i]; "
	+"		v+=1.0;															"
	+"	}																	"
	+"	gl_FragColor = col;													"
	+"}																		";

const gl_fs_add = "				 			   " // 加算合成
	+"precision highp float;					"
	+"uniform sampler2D Tex0;					"
	+"uniform sampler2D	Tex1;					"
	+" 											"
	+"varying vec2		uv;						"
	+"void main()								"
	+"{																		"
	+"	gl_FragColor = ( texture2D( Tex0,vec2( uv ) )						"
	+"					+texture2D( Tex1,vec2( uv ) ) );					"
	+"}																		";

//-----------------------------------------------------------------------------
function gl_cls( gl, rgb )
//-----------------------------------------------------------------------------
{
	gl.clearColor( rgb.x, rgb.y, rgb.z, 1.0 );
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
}
//-----------------------------------------------------------------------------
function gl_createTextureFromBuffer( gl, width, height, buf, flgLiner )
//-----------------------------------------------------------------------------
{
	let hdlTexture = gl.createTexture();
	gl.bindTexture( gl.TEXTURE_2D, hdlTexture );

	const internalFormat = gl.RGBA;
	const srcFormat = gl.RGBA;
	const level = 0;
	const border = 0;
	const srcType = gl.UNSIGNED_BYTE;
	const pixel = buf;
	gl.bindTexture( gl.TEXTURE_2D, hdlTexture );
	gl.texImage2D( gl.TEXTURE_2D, level, internalFormat, width, height,0,srcFormat, srcType, pixel );
	gl.generateMipmap( gl.TEXTURE_2D );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
	if ( flgLiner ) 
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR  );
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
	}
	else
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	}
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture( gl.TEXTURE_2D, null );
	return hdlTexture ;
}

//-----------------------------------------------------------------------------
function gl_createTexFromImage( image )
//-----------------------------------------------------------------------------
{
	let tex = {isActive:false};
	tex.hdl = gl.createTexture();
	
	gl.bindTexture(gl.TEXTURE_2D, tex.hdl );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image ); 
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);

	tex.width = image.width;
	tex.height = image.height;
	tex.isActive = true;
	return tex;
}





// フォントファイルを読み込んでフォントを作成

//-----------------------------------------------------------------------------
function gl_MDL( mesh, shader, tblTex )	// モデルフォーマット
//-----------------------------------------------------------------------------
{
	return { 
		mesh	:mesh, 
		shader	:shader, 
		tblTex	:tblTex
	};
}

//-----------------------------------------------------------------------------
function gl_SHADER( {Prog=null,Pos4=null,Pos3=null,Pos2=null,Uv=null,Col4=null,Col3=null,Tex0=null,Tex1=null,Tex2=null,Tex3=null,Dot=null,Gaus=null,Scl=null})	// シェーダーフォーマット
//-----------------------------------------------------------------------------
{
	return {
		"Prog"	:Prog,
		"Pos4"	:Pos4,
		"Pos3"	:Pos3,
		"Pos2"	:Pos2,
		"Uv"	:Uv,
		"Col4"	:Col4,
		"Col3"	:Col3,
		"Tex0"	:Tex0,
		"Tex1"	:Tex1,
		"Tex2"	:Tex2,
		"Tex3"	:Tex3,
		"Dot"	:Dot,
		"Gaus"	:Gaus,
		"Scl"	:Scl,
	};
}

//-----------------------------------------------------------------------------
function gl_MESH( {drawtype, hdlPos, hdlUv, hdlCol, hdlIndex, offset, cntVertex} )	// メッシュフォーマット
//-----------------------------------------------------------------------------
{
	return {
		drawtype	:drawtype,
		hdlPos		:hdlPos,
		hdlUv		:hdlUv,
		hdlCol		:hdlCol,
		hdlIndex	:hdlIndex,	// インデックスド頂点でない場合はnull
		ofsVertex	:offset,
		cntVertex	:cntVertex,
	}
}
//-----------------------------------------------------------------------------
function gl_PREMESH( {drawtype, sizePos, cntVertex=0, tblPos=null, tblUv=null, tblCol=null, tblIndex=null} )	// プリメッシュ：gl化する前のメッシュフォーマット
//-----------------------------------------------------------------------------
{
	return {
		drawtype	:drawtype,
		tblPos		:tblPos,
		sizePos		:sizePos, 
		tblUv		:tblUv,
		tblCol		:tblCol,
		tblIndex	:tblIndex,
		cntVertex	:cntVertex,
	}
}

// for FBO
//-----------------------------------------------------------------------------
function gl_FBO( hdl, tex_color, tex_depth, width, height )
//-----------------------------------------------------------------------------
{
	return {
		hdl			:hdl,
		tex_color	:tex_color,
		tex_depth	:tex_depth,
		width		:width,
		height		:height,
	};
}
//-----------------------------------------------------------------------------
function gl_createFramebuf( gl, width, height, flgDepth )
//-----------------------------------------------------------------------------
{
	function create_texture( width, height, internalFormat, srcFormat, srcType )
	{//memo 浮動小数点バッファの場合：internalFormat:RGB32F	Format:RGB	Type:FLOAT
		let tex = gl.createTexture();
		const level				= 0;
		gl.bindTexture( gl.TEXTURE_2D, tex );
		gl.texImage2D( gl.TEXTURE_2D, level, internalFormat,width,height,0,srcFormat, srcType, null );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
		gl.texParameterf( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );	
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
		// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR

		return tex;
	}
	let tex_color	= create_texture( width, height, gl.RGBA				, gl.RGBA				, gl.UNSIGNED_BYTE );

	let hdl = gl.createFramebuffer();
	gl.bindFramebuffer( gl.FRAMEBUFFER, hdl );
	gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0	, gl.TEXTURE_2D, tex_color		, 0 );

	let tex_depth = null;
	if(flgDepth)
	{
		var ext = gl.getExtension('WEBGL_depth_texture');
		if ( ext )
		{
			//  weggl ではdepthは拡張仕様
			tex_depth	= create_texture( width, height, gl.DEPTH_COMPONENT	, gl.DEPTH_COMPONENT	, gl.UNSIGNED_SHORT );
		}
		else
		{
			// weggl2
			tex_depth	= create_texture( width, height, gl.DEPTH_COMPONENT16	, gl.DEPTH_COMPONENT	, gl.UNSIGNED_SHORT );
		}
		gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT	, gl.TEXTURE_2D, tex_depth	, 0 );
	}
	gl.bindFramebuffer( gl.FRAMEBUFFER, null );

	return gl_FBO( hdl, tex_color, tex_depth, width, height );
}

// シェーダー作成
//-----------------------------------------------------------------------------
function gl_createShader( gl, src_vs, src_fs, tblAttribute, tblUniform )
//-----------------------------------------------------------------------------
{
	let prog = gl.createProgram();

	function compile( gl, type, source ) 
	{
		const hdl = gl.createShader( type );
		gl.shaderSource( hdl, source );
		gl.compileShader( hdl );
		if ( !gl.getShaderParameter( hdl, gl.COMPILE_STATUS ) ) 
		{
			alert( "An error occurred compiling the shaders: " + gl.getShaderInfoLog( hdl ) );
			gl.deleteShader( hdl );
			return null;
		}
		return hdl;
	}

	const vs	= compile( gl, gl.VERTEX_SHADER, src_vs );
	const fs	= compile( gl, gl.FRAGMENT_SHADER, src_fs );
	gl.attachShader( prog, vs );
	gl.attachShader( prog, fs );
	gl.linkProgram( prog );
	if ( !gl.getProgramParameter( prog, gl.LINK_STATUS ) ) 
	{
		alert( "Unable to initialize the shader program: " + gl.getProgramInfoLog( prog ) );
		return null;
	}

	let hashHdl = {};
	for ( let name of tblAttribute )
	{
		hashHdl[name] = gl.getAttribLocation( prog, name );
	}
	for ( let name of tblUniform )
	{
		hashHdl[name] = gl.getUniformLocation( prog, name );
	}

	return gl_SHADER( 
		{
			"Prog"	:{hdl:prog},
			"Pos4"	:{hdl:hashHdl["Pos4"]},
			"Pos3"	:{hdl:hashHdl["Pos3"]},
			"Pos2"	:{hdl:hashHdl["Pos2"]},
			"Uv"	:{hdl:hashHdl["Uv"]},
			"Col4"	:{hdl:hashHdl["Col4"]},
			"Col3"	:{hdl:hashHdl["Col3"]},
			"Tex0"	:{hdl:hashHdl["Tex0"]},
			"Tex1"	:{hdl:hashHdl["Tex1"]},
			"Tex2"	:{hdl:hashHdl["Tex2"]},
			"Tex3"	:{hdl:hashHdl["Tex3"]},
			"Dot"	:{hdl:hashHdl["Dot"]},
			"Gaus"	:{hdl:hashHdl["Gaus"],tblGaus:null,},
			"Scl"	:{hdl:hashHdl["Scl"]},
		},
	);
}

// メッシュ作成
	
///-----------------------------------------------------------------------------
function gl_reloadMesh( gl, mesh, premesh, using )	// メッシュロード
///-----------------------------------------------------------------------------
{
	if ( mesh.hdlPos && premesh.tblPos )
	{
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlPos );
		gl.bufferData( gl.ARRAY_BUFFER, premesh.tblPos , using );
	}

	if ( mesh.hdlUv && premesh.tblUv )
	{
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlUv );
		gl.bufferData( gl.ARRAY_BUFFER, premesh.tblUv , using );
	}

	if ( mesh.hdlCol && premesh.tblCol )
	{
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlCol );
		gl.bufferData( gl.ARRAY_BUFFER, premesh.tblCol , using );
	}

	if ( mesh.hdlIndex && premesh.tblIndex )
	{
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, mesh.hdlIndex );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, premesh.tblIndex, using );
	}

	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	mesh.cntVertex = premesh.cntVertex;
}

///-----------------------------------------------------------------------------
function gl_createMesh( 
///-----------------------------------------------------------------------------
	gl, 
	{
		drawtype	,
		tblPos		,
		sizePos		,
		tblUv		,
		tblCol		,
		tblIndex	,
		using		,
	},
)
{
	let mesh = gl_MESH( 
	{
		drawtype	:drawtype, 
		hdlPos		:(tblPos  )?gl.createBuffer():null, 
		hdlUv		:(tblUv   )?gl.createBuffer():null, 
		hdlCol		:(tblCol  )?gl.createBuffer():null, 
		hdlIndex	:(tblIndex)?gl.createBuffer():null, 
		offset		:0, 
		cntVertex		:0,
	} );
	let cntVertex;
	// indexed場合はindexed頂点数の方、独立頂点の場合はtblPos.length/sizePos
	cntVertex = ( tblIndex )?tblIndex.length:tblPos.length/sizePos;

	let premesh	= gl_PREMESH( 
	{
		drawtype	:drawtype,
		tblPos		:tblPos,
		sizePos		:sizePos,
		tblUv		:tblUv,
		tblCol		:tblCol,
		tblIndex	:tblIndex,
		cntVertex	:cntVertex,	
	});
	gl_reloadMesh( gl, mesh, premesh, using  );
	return mesh;
}

// 描画
//-----------------------------------------------------------------------------
function gl_drawmMdl( gl, mdl )
//-----------------------------------------------------------------------------
{
	// shader setup
	gl.useProgram( mdl.shader["Prog"].hdl );
	{

		if ( mdl.shader["Pos2"].hdl != null )						// Pos2
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlPos );
			gl.vertexAttribPointer( mdl.shader["Pos2"].hdl, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Pos2"].hdl );
		}

		if ( mdl.shader["Pos3"].hdl != null )						// Pos3
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlPos );
			gl.vertexAttribPointer( mdl.shader["Pos3"].hdl, 3, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Pos3"].hdl );
		}

		if ( mdl.shader["Pos4"].hdl != null )						// Pos4
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlPos );
			gl.vertexAttribPointer( mdl.shader["Pos4"].hdl, 4, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Pos4"].hdl );
		}

		if ( mdl.shader["Uv"].hdl != null )						// UV
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlUv );
			gl.vertexAttribPointer( mdl.shader["Uv"].hdl, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Uv"].hdl );
		}

		if ( mdl.shader["Col4"].hdl != null )						// RGBA
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlCol );
			gl.vertexAttribPointer( mdl.shader["Col4"].hdl, 3, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Col4"].hdl );
		}

		if ( mdl.shader["Col3"].hdl != null )						// RGB
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, mdl.mesh.hdlCol );
			gl.vertexAttribPointer( mdl.shader["Col3"].hdl, 3, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( mdl.shader["Col3"].hdl );
		}

		if ( mdl.shader["Tex0"].hdl != null )						// テクスチャ0
		{
			gl.activeTexture( gl.TEXTURE0 );						
			gl.bindTexture( gl.TEXTURE_2D, mdl.tblTex[0] );			
 			gl.uniform1i( mdl.shader["Tex0"].hdl, 0 );				
		}

		if ( mdl.shader["Tex1"].hdl != null )						// テクスチャ1
		{
			gl.activeTexture( gl.TEXTURE1 );						
			gl.bindTexture( gl.TEXTURE_2D, mdl.tblTex[1] );			
 			gl.uniform1i( mdl.shader["Tex1"].hdl, 1 );						
		}

		if ( mdl.shader["Tex2"].hdl != null )						// テクスチャ2
		{
			gl.activeTexture( gl.TEXTURE2 );						
			gl.bindTexture( gl.TEXTURE_2D, mdl.tblTex[2] );			
 			gl.uniform1i( mdl.shader["Tex2"].hdl, 1 );						
		}

		if ( mdl.shader["Tex3"].hdl != null )						// テクスチャ3
		{
			gl.activeTexture( gl.TEXTURE3 );						
			gl.bindTexture( gl.TEXTURE_2D, mdl.tblTex[3] );			
 			gl.uniform1i( mdl.shader["Tex3"].hdl, 1 );						
		}

		if ( mdl.shader["Dot"].hdl != null )						// ドットピッチ	fs内の描画１ドットのサイズ
		{
			let m_viewport = gl.getParameter( gl.VIEWPORT );
			let [x,y] = [ 1.0/m_viewport[2] , 1.0/m_viewport[3] ];
			gl.uniform2f( mdl.shader["Dot"].hdl, x,y );
		}

		if ( mdl.shader["Gaus"].hdl != null  && mdl.shader["Gaus"].tblGaus != null )	// Gasussian
		{
			gl.uniform1fv( mdl.shader["Gaus"].hdl, mdl.shader["Gaus"].tblGaus );
		}

		if ( mdl.shader["Scl"].hdl != null )						// ドットピッチ	vs内の移動１ドットのサイズ Dotの倍になる
		{
			let m_viewport = gl.getParameter( gl.VIEWPORT );
			let [x,y] = [ 2.0/m_viewport[2] , 2.0/m_viewport[3] ];
			gl.uniform2f( mdl.shader["Scl"].hdl, x,y );
		}

	}

	// draw
	if ( mdl.mesh.hdlIndex )
	{
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, mdl.mesh.hdlIndex );
		gl.drawElements( mdl.mesh.drawtype, mdl.mesh.cntVertex, gl.UNSIGNED_SHORT, 0 );
	}
	else
	{
		gl.drawArrays( mdl.mesh.drawtype, mdl.mesh.ofsVertex, mdl.mesh.cntVertex );
	}

	// バインド解除
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
  	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	gl.bindTexture( gl.TEXTURE_2D, null );

}

// 2021/05/11 ver0.01	bloom_create追加
//-----------------------------------------------------------------------------
function bloom_create( gl )
//-----------------------------------------------------------------------------
{

	let mesh = gl_createMesh( 
		gl,
		{
			drawtype	:	gl.TRIANGLE_STRIP,
			tblPos		:	new Float32Array([	-1.0,-1.0,	1.0,-1.0,	-1.0, 1.0,	 1.0, 1.0	]),
			sizePos		:	2,
			tblUv		:	new Float32Array([	 0.0, 0.0,	1.0, 0.0,	 0.0, 1.0,	 1.0, 1.0	]),
			tblCol		:	null,
			tblIndex	:	new Uint16Array( [	0,1,2,3	] ),
			using		:	gl.STATIC_DRAW,
		}
	);

	let shader_v		= gl_createShader( gl, gl_vs_P2U, gl_fs_gaussian_v	, ["Pos2","Uv"],["Tex0","Dot","Gaus"] );
	let shader_h		= gl_createShader( gl, gl_vs_P2U, gl_fs_gaussian_h	, ["Pos2","Uv"],["Tex0","Dot","Gaus"]  );
	let	shader_color	= gl_createShader( gl, gl_vs_P4C, gl_fs_color		, ["Pos4","Col3"],[] );
	let shader_const	= gl_createShader( gl, gl_vs_P2U, gl_fs_constant	, ["Pos2","Uv"],["Tex0"]   );
	let shader_add		= gl_createShader( gl, gl_vs_P2U, gl_fs_add			, ["Pos2","Uv"],["Tex0","Tex1"]   );
	let fbo_1			= gl_createFramebuf( gl, gl.canvas.width/1, gl.canvas.height/1, true );
	let fbo_1a			= gl_createFramebuf( gl, gl.canvas.width/1, gl.canvas.height/1, false );
	let fbo_1b			= gl_createFramebuf( gl, gl.canvas.width/1, gl.canvas.height/1, false );
	let fbo_2a			= gl_createFramebuf( gl, gl.canvas.width/2, gl.canvas.height/2, false );
	let fbo_2b			= gl_createFramebuf( gl, gl.canvas.width/2, gl.canvas.height/2, false );
	let fbo_4a			= gl_createFramebuf( gl, gl.canvas.width/4, gl.canvas.height/4, false );
	let fbo_4b			= gl_createFramebuf( gl, gl.canvas.width/4, gl.canvas.height/4, false );
	let fbo_8a			= gl_createFramebuf( gl, gl.canvas.width/8, gl.canvas.height/8, false );
	let fbo_8b			= gl_createFramebuf( gl, gl.canvas.width/8, gl.canvas.height/8, false );

	//-----------------------------------------------------------------------------
	function renderer( cb_drawScene, mode="8x8", sigma=1.5, rate=0.9 )
	//-----------------------------------------------------------------------------
	{
		function make_gauss( size, sigma, rate )
		{
			function gauss( x,s )
			{
				let u = 0; 
				// u: μミュー	平均
				// s: σシグマ	標準偏差
				return 	1/( Math.sqrt( 2*Math.PI*s ) )*Math.exp( -( ( x-u )*( x-u ) ) / ( 2*s*s ) );	// 距離[0]は1.0(100%)
			}
			// size  :マトリクスの一辺の大きさ
			// sigma :
			let pat = new Array( size );
			for ( let m = 0 ; m < pat.length ; m++ )
			{
				pat[m] = gauss( m, sigma )*rate;	
			}
			return pat;
		}	
		shader_v["Gaus"].tblGaus = make_gauss( 20, sigma, rate );	// 20はシェーダー内のGaus[20]より
		shader_h["Gaus"].tblGaus = make_gauss( 20, sigma, rate );
	
		function bf( fbo )
		{
			if ( fbo == null )
			{
				gl.bindFramebuffer( gl.FRAMEBUFFER, null );
				gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
			}
			else
			{
				gl.bindFramebuffer( gl.FRAMEBUFFER, fbo.hdl );
				gl.viewport( 0, 0,  fbo.width, fbo.height );
			}
		}
		if ( mode=="8x8" ) // sigma=10.0/8;rate=0.9
		{
			bf( fbo_1 );	cb_drawScene();
			bf( fbo_2a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_1.tex_color] ) );		// 1/2
			bf( fbo_4a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_2a.tex_color] ) );		// 1/4
			bf( fbo_8a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_4a.tex_color] ) );		// 1/8
			bf( fbo_8b );	gl_drawmMdl( gl, gl_MDL( mesh, shader_v		, [fbo_8a.tex_color] ) );	// 縦ブラー
			bf( fbo_8a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_h		, [fbo_8b.tex_color] ) );	// 横ブラー
			bf( null );		gl_drawmMdl( gl, gl_MDL( mesh, shader_add	, [fbo_8a.tex_color, fbo_1.tex_color] ) ); // 合成
		}
		else
		if ( mode=="4x4" ) // sigma=10.0/3 rate=0.659
		{
			bf( fbo_1 );	cb_drawScene();
			bf( fbo_2a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_1.tex_color] ) );		// 1/4
			bf( fbo_4a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_2a.tex_color] ) );		// 1/16
			bf( fbo_4b );	gl_drawmMdl( gl, gl_MDL( mesh, shader_v		, [fbo_4a.tex_color] ) );	// 縦ブラー
			bf( fbo_4a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_h		, [fbo_4b.tex_color] ) );	// 横ブラー
			bf( null );		gl_drawmMdl( gl, gl_MDL( mesh, shader_add	, [fbo_4a.tex_color, fbo_1.tex_color] ) ); // 合成
		}
		else
		if ( mode=="2x2" ) // sigma=10.0/3;rate=0.659
		{
			bf( fbo_1 );	cb_drawScene();
			bf( fbo_2a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_const	, [fbo_1.tex_color] ) );		// 1/4
			bf( fbo_2b );	gl_drawmMdl( gl, gl_MDL( mesh, shader_v		, [fbo_2a.tex_color] ) );	// 縦ブラー
			bf( fbo_2a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_h		, [fbo_2b.tex_color] ) );	// 横ブラー
			bf( null );		gl_drawmMdl( gl, gl_MDL( mesh, shader_add	, [fbo_2a.tex_color, fbo_1.tex_color] ) ); // 合成
		}
		else
		if ( mode=="1x1" ) // sigma=10;rate=0.45
		{
			bf( fbo_1 );	cb_drawScene();
			bf( fbo_1a );	gl_drawmMdl( gl, gl_MDL( mesh, shader_v		, [fbo_1.tex_color] ) );	// 縦ブラー
			bf( fbo_1b );	gl_drawmMdl( gl, gl_MDL( mesh, shader_h		, [fbo_1a.tex_color] ) );	// 横ブラー
			bf( null );		gl_drawmMdl( gl, gl_MDL( mesh, shader_add	, [fbo_1b.tex_color, fbo_1.tex_color] ) ); // 合成
		}
		else
		{
			cb_drawScene();
		}


	}
	return {
		renderer:renderer
	}
}

//テキストＶＲＡＭのようなもの
//-----------------------------------------------------------------------------
function gl_createTvram( gl, width, height, funcGetXY )
//-----------------------------------------------------------------------------
{
	let prim_fb = gl.getParameter(gl.FRAMEBUFFER_BINDING);
	let prim_vp = gl.getParameter(gl.VIEWPORT);
	let prim_cc = gl.getParameter(gl.COLOR_CLEAR_VALUE);

	let fbo1			= gl_createFramebuf( gl, width, height, true );
	gl.bindFramebuffer( gl.FRAMEBUFFER, fbo1.hdl );
	gl.viewport( 0, 0, fbo1.width, fbo1.height );
	gl_cls( gl, vec3(0,0,0) );
	gl.bindFramebuffer( gl.FRAMEBUFFER, null );

	let fbo2			= gl_createFramebuf( gl, width, height, true );
	gl.bindFramebuffer( gl.FRAMEBUFFER, fbo2.hdl );
	gl.viewport( 0, 0, fbo2.width, fbo2.height );
	gl_cls( gl, vec3(0,0,0) );
	gl.bindFramebuffer( gl.FRAMEBUFFER, null );

	gl.bindFramebuffer( gl.FRAMEBUFFER, prim_fb );
	gl.viewport( prim_vp[0], prim_vp[1], prim_vp[2], prim_vp[3] );
	gl.clearColor( prim_cc[0], prim_cc[1], prim_cc[2], prim_cc[3] );



	return {
		width		:width,
		height		:height,
		prim_fb		:null,			// 描画前のフレームバッファの保存場所
		prim_vp		:null,			// 描画前のビューポートの保存場所
		idxFboMain	:0,					// ダブルバッファメインの番号
		idxFboBack	:1,					// ダブルバッファバックの番号
		tblFbo		:[ fbo1, fbo2 ],	// ダブルバッファ本体
		mesh2d		:
			gl_createMesh( 
				gl, 
				{
					drawtype	:	gl.TRIANGLE_STRIP,
					tblPos		:	new Float32Array([	 1.0, 1.0,	-1.0, 1.0,	 1.0,-1.0,	-1.0, -1.0	]),
					sizePos		:	2,
					tblUv		:	new Float32Array([	 1.0, 1.0,	 0.0, 1.0,	 1.0, 0.0,	 0.0,  0.0	]),
					tblCol		:	null,
					tblIndex	:	new Uint16Array([	0,1,2,3	]),
					using		:	gl.STATIC_DRAW,
				},
			),
		shader			:gl_createShader( gl, gl_vs_P2U, gl_fs_constant		, ["Pos2","Uv"],["Tex0"]   ),
	}
}

//-----------------------------------------------------------------------------
function gl_tvram_draw_begin( gl, tvram )
//-----------------------------------------------------------------------------
{
	// フレームバッファとビューポートの設定を保存
	tvram.prim_fb = gl.getParameter(gl.FRAMEBUFFER_BINDING);
	tvram.prim_vp = gl.getParameter(gl.VIEWPORT);

	// フレームバッファとビューポートの設定を書き換え
	gl.bindFramebuffer( gl.FRAMEBUFFER, tvram.tblFbo[tvram.idxFboMain].hdl );
	gl.viewport( 0, 0,  tvram.tblFbo[tvram.idxFboMain].width, tvram.tblFbo[tvram.idxFboMain].height );

	// 前回のフレームバッファを描画
	gl_drawmMdl( gl, gl_MDL( tvram.mesh2d, tvram.shader, [tvram.tblFbo[tvram.idxFboBack].tex_color] ) );
}
//-----------------------------------------------------------------------------
function gl_tvram_draw_end( gl_tvram )
//-----------------------------------------------------------------------------
{
	// フレームバッファとビューポートの設定を元に戻す
	gl.bindFramebuffer( gl.FRAMEBUFFER, tvram.prim_fb );
	gl.viewport( tvram.prim_vp[0], tvram.prim_vp[1], tvram.prim_vp[2], tvram.prim_vp[3] );

	// 上下反転&プライマリフレームバッファに描画
	gl_drawmMdl( gl, gl_MDL( tvram.mesh2d, tvram.shader	, [tvram.tblFbo[tvram.idxFboMain].tex_color] ) ); 

	// フレームバッファの入れ替え
	[tvram.idxFboBack, tvram.idxFboMain] = [tvram.idxFboMain,tvram.idxFboBack];
}

const font_SZ = 12;
//-----------------------------------------------------------------------------
function font_prints( font, premesh, tx, ty, str, DW,DH )
//-----------------------------------------------------------------------------
{
	// DW,DHは移動空間(vs)内のドットピッチ


	for ( let i = 0 ; i < str.length ; i++ )
	{
		let idx = premesh.cntVertex*premesh.sizePos;
	
		if ( idx+font_SZ > premesh.maxSiz ) 
		{
			// リングバッファ
			idx = 0;
		}
	
		let c = str.charCodeAt(i);
		let [fx,fy] = font.getXY( c );

		{
			const W = DW * font.FW;
			const H = DH * font.FH;
			let X = -1.0 +DW*tx+i*font.FW*DW;
			let Y = -1.0 +DH*(2.0/DH-font.FH-ty);
			let pos = premesh.tblPos[ idx+0 ];
			premesh.tblPos[ idx+0 ] = X		;premesh.tblPos[ idx+1 ] = Y+H	; //0	縮退頂点
			premesh.tblPos[ idx+2 ] = X		;premesh.tblPos[ idx+3 ] = Y+H	; //0
			premesh.tblPos[ idx+4 ] = X+W		;premesh.tblPos[ idx+5 ] = Y+H	; //2	
			premesh.tblPos[ idx+6 ] = X		;premesh.tblPos[ idx+7 ] = Y	; //1
			premesh.tblPos[ idx+8 ] = X+W		;premesh.tblPos[ idx+9 ] = Y	; //3
			premesh.tblPos[ idx+10 ] = X+W	;premesh.tblPos[ idx+11 ] = Y	; //3	縮退頂点
		}
		
		{
			// テクセルピッチ
			const TW = 1.0 / font.tex.width;
			const TH = 1.0 / font.tex.height;

			let x0 = fx*font.FW;	
			let y0 = fy*font.FH;	
			let x1 = x0+1*font.FW;	
			let y1 = y0+1*font.FH;	

			premesh.tblUv[ idx+0 ] = x1*TW	;premesh.tblUv[ idx+1 ] = y0*TH;//3	縮退頂点
			premesh.tblUv[ idx+2 ] = x0*TW	;premesh.tblUv[ idx+3 ] = y0*TH; //1
			premesh.tblUv[ idx+4 ] = x1*TW	;premesh.tblUv[ idx+5 ] = y0*TH;//3
			premesh.tblUv[ idx+6 ] = x0*TW	;premesh.tblUv[ idx+7 ] = y1*TH;//0
			premesh.tblUv[ idx+8 ] = x1*TW	;premesh.tblUv[ idx+9 ] = y1*TH;//2
			premesh.tblUv[ idx+10 ] = x0*TW	;premesh.tblUv[ idx+11 ] = y1*TH;//0	縮退頂点

		}

		premesh.cntVertex = (idx+font_SZ)/premesh.sizePos;
	}
	return premesh;
}
/*
//-----------------------------------------------------------------------------
function gl_font_prints( gl, font, tx, ty, str, DW,DH )
//-----------------------------------------------------------------------------
{
//	font.premesh.cntVertex=0;

	font.premesh = font_prints( font, font.premesh, tx, ty, str, DW,DH );

	gl_reloadMesh( gl, font.mesh, font.premesh, gl.DYNAMIC_DRAW  );
	return gl_MDL( font.mesh, font.shader, [font.tex.hdl] );
}
*/

//-----------------------------------------------------------------------------
function font_createPremeshFromTex( gl, tex, FW, FH, funcGetXY, max=2048 ) // max:最大表示文字数
//-----------------------------------------------------------------------------
{
	const maxSiz = max*font_SZ;

	return{
		tex			: tex,
		shader		: gl_createShader( gl, gl_vs_P2U, gl_fs_constant	, ["Pos2","Uv"],["Tex0"]   ),
		FW			: FW,	// フォント幅
		FH			: FH,	// フォント高さ
		getXY		: funcGetXY,
		//
		mesh		: gl_MESH( 
		{
			drawtype	:gl.TRIANGLE_STRIP, 
			hdlPos		:gl.createBuffer(), 
			hdlUv		:gl.createBuffer(), 
			hdlCol		:null, 
			hdlIndex	:null, 
			offset		:0, 
			length		:0
		} ),

		//
		premesh		: gl_PREMESH(
			{
				drawtype	:gl.TRIANGLE_STRIP, 
				sizePos		:2, 
				length		:0,
				tblPos		:new Float32Array(maxSiz),	//１文字当たりの頂点サイズ=12B, 
				tblUv		:new Float32Array(maxSiz), 
			}
		),
	};
}
//-----------------------------------------------------------------------------
function getUV_ascii(c)
//-----------------------------------------------------------------------------
{
	//UTF-16コードを→ASCIIマップに変換
/*
	if ( c > 255 ) c= 0;
	let fx = (c % 16);
	let fy = c>>4;
	return [fx,fy];
	let inf = utf16_to_sjis[c];
*/
	let inf = utf16_to_ascii[c];
	if ( !inf ) inf = utf16_to_ascii[0];
	let fx = inf.点;
	let fy = inf.区;
	return [fx,fy];
}
//-----------------------------------------------------------------------------
function getUV_sjis(c)
//-----------------------------------------------------------------------------
{
	//UTF-16コードを→SJISマップに変換
	let inf = utf16_to_sjis[c];
	if ( !inf ) inf = utf16_to_sjis[0];
	let fx = inf.点-1;
	let fy = inf.区-1;
	return [fx,fy];
}


let utf16_to_ascii = 
{
	  0:{区: 0,点: 0},	// ■	NUL（null文字)
	  1:{区: 0,点: 1},	// ■	SOH（ヘッダ開始）
	  2:{区: 0,点: 2},	// ■	STX（テキスト開始）
	  3:{区: 0,点: 3},	// ■	ETX（テキスト終了）
	  4:{区: 0,点: 4},	// ■	EOT（転送終了）
	  5:{区: 0,点: 5},	// ■	ENQ（照会）
	  6:{区: 0,点: 6},	// ■	ACK（受信確認）
	  7:{区: 0,点: 7},	// ■	BEL（警告）
	  8:{区: 0,点: 8},	// ■	BS（後退）
	  9:{区: 0,点: 9},	// ■	HT（水平タブ）
	 10:{区: 0,点:10},	// ■	LF（改行）
	 11:{区: 0,点:11},	// ■	VT（垂直タブ）
	 12:{区: 0,点:12},	// ■	FF（改頁）
	 13:{区: 0,点:13},	// ■	CR（復帰）
	 14:{区: 0,点:14},	// ■	SO（シフトアウト）
	 15:{区: 0,点:15},	// ■	SI（シフトイン）
	 16:{区: 1,点: 0},	// ■	DLE（データリンクエスケー プ）
	 17:{区: 1,点: 1},	// ■	DC1（装置制御１）
	 18:{区: 1,点: 2},	// ■	DC2（装置制御２）
	 19:{区: 1,点: 3},	// ■	DC3（装置制御３）
	 20:{区: 1,点: 4},	// ■	DC4（装置制御４）
	 21:{区: 1,点: 5},	// ■	NAK（受信失敗）
	 22:{区: 1,点: 6},	// ■	SYN（同期）
	 23:{区: 1,点: 7},	// ■	ETB（転送ブロック終了）
	 24:{区: 1,点: 8},	// ■	CAN（キャンセル）
	 25:{区: 1,点: 9},	// ■	EM（メディア終了）
	 26:{区: 1,点:10},	// ■	SUB（置換）
	 27:{区: 1,点:11},	// ■	ESC（エスケープ）
	 28:{区: 1,点:12},	// ■	FS（フォーム区切り）
	 29:{区: 1,点:13},	// ■	GS（グループ区切り）
	 30:{区: 1,点:14},	// ■	RS（レコード区切り）
	 31:{区: 1,点:15},	// ■	US（ユニット区切り）
	 32:{区: 2,点: 0},	// 　	SPC（空白文字）
	 33:{区: 2,点:11},	// ！	!
	 34:{区: 2,点:72},	// ″	"
	 35:{区: 2,点:83},	// ＃	#
	 36:{区: 2,点:84},	// ＄	$
	 37:{区: 2,点:85},	// ％	%
	 38:{区: 2,点:86},	// ＆	&
	 39:{区: 2,点:37},	// ’	'
	 40:{区: 2,点:48},	// （	(
	 41:{区: 2,点:49},	// ）	)
	 42:{区: 2,点:10},	// ＊	*
	 43:{区: 2,点:11},	// ＋	+
	 44:{区: 2,点:12},	// ，	,
	 45:{区: 2,点:13},	// －	-
	 46:{区: 2,点:14},	// ．	.
	 47:{区: 2,点:15},	// ／	/
	 48:{区: 3,点: 0},	// ０	0		
	 49:{区: 3,点: 1},	// １	1
	 50:{区: 3,点: 2},	// ２	2
	 51:{区: 3,点: 3},	// ３	3
	 52:{区: 3,点: 4},	// ４	4
	 53:{区: 3,点: 5},	// ５	5
	 54:{区: 3,点: 6},	// ６	6
	 55:{区: 3,点: 7},	// ７	7
	 56:{区: 3,点: 8},	// ８	8
	 57:{区: 3,点: 9},	// ９	9
	 58:{区: 3,点:10},	// ：	:
	 59:{区: 3,点:11},	// ；	;
	 60:{区: 3,点:12},	// ＜	<
	 61:{区: 3,点:13},	// ＝	=
	 62:{区: 3,点:14},	// ＞	>
	 63:{区: 3,点:15},	// ？	?
	 64:{区: 4,点: 0},	// ＠	@
	 65:{区: 4,点: 1},	// Ａ	A
	 66:{区: 4,点: 2},	// Ｂ	B
	 67:{区: 4,点: 3},	// Ｃ	C
	 68:{区: 4,点: 4},	// Ｄ	D
	 69:{区: 4,点: 5},	// Ｅ	E
	 70:{区: 4,点: 6},	// Ｆ	F
	 71:{区: 4,点: 7},	// Ｇ	G
	 72:{区: 4,点: 8},	// Ｈ	H
	 73:{区: 4,点: 9},	// Ｉ	I
	 74:{区: 4,点:10},	// Ｊ	J
	 75:{区: 4,点:11},	// Ｋ	K
	 76:{区: 4,点:12},	// Ｌ	L
	 77:{区: 4,点:13},	// Ｍ	M
	 78:{区: 4,点:14},	// Ｎ	N
	 79:{区: 4,点:15},	// Ｏ	O
	 80:{区: 5,点: 0},	// Ｐ	P
	 81:{区: 5,点: 1},	// Ｑ	Q
	 82:{区: 5,点: 2},	// Ｒ	R
	 83:{区: 5,点: 3},	// Ｓ	S
	 84:{区: 5,点: 4},	// Ｔ	T
	 85:{区: 5,点: 5},	// Ｕ	U
	 86:{区: 5,点: 6},	// Ｖ	V
	 87:{区: 5,点: 7},	// Ｗ	W
	 88:{区: 5,点: 8},	// Ｘ	X
	 89:{区: 5,点: 9},	// Ｙ	Y
	 90:{区: 5,点:10},	// Ｚ	W
	 91:{区: 5,点:11},	// ［	[
	 92:{区: 5,点:12},	// ￥	\
	 93:{区: 5,点:13},	// ］	]
	 94:{区: 5,点:14},	// ＾	^
	 95:{区: 5,点:15},	// ＿	_
	 96:{区: 6,点: 0},	// ‘	`
	 97:{区: 6,点: 1},	// ａ	a
	 98:{区: 6,点: 2},	// ｂ	b
	 99:{区: 6,点: 3},	// ｃ	c
	100:{区: 6,点: 4},	// ｄ	d
	101:{区: 6,点: 5},	// ｅ	e
	102:{区: 6,点: 6},	// ｆ	f
	103:{区: 6,点: 7},	// ｇ	g
	104:{区: 6,点: 8},	// ｈ	h
	105:{区: 6,点: 9},	// ｉ	i
	106:{区: 6,点:10},	// ｊ	j
	107:{区: 6,点:11},	// ｋ	k
	108:{区: 6,点:12},	// ｌ	l
	109:{区: 6,点:13},	// ｍ	m
	110:{区: 6,点:14},	// ｎ	n
	111:{区: 6,点:15},	// ｏ	o
	112:{区: 7,点: 0},	// ｐ	p
	113:{区: 7,点: 1},	// ｑ	q
	114:{区: 7,点: 2},	// ｒ	r
	115:{区: 7,点: 3},	// ｓ	s
	116:{区: 7,点: 4},	// ｔ	t
	117:{区: 7,点: 5},	// ｕ	u
	118:{区: 7,点: 6},	// ｖ	v
	119:{区: 7,点: 7},	// ｗ	w
	120:{区: 7,点: 8},	// ｘ	x
	121:{区: 7,点: 9},	// ｙ	y
	122:{区: 7,点:10},	// ｚ	z
	123:{区: 7,点:11},	// ｛	{
	124:{区: 7,点:12},	// ｜	|
	125:{区: 7,点:13},	// ｝	}
	126:{区: 7,点:14},	// ～	~
	127:{区: 7,点:15},	// ■	DEL（削除）
	0x3000:{区:10,点: 0},	// 　(カナスペース)
	0x3002:{区:10,点: 1},	// 。
	0x300C:{区:10,点: 2},	// 「
	0x300D:{区:10,点: 3},	// 」
	0x3001:{区:10,点: 4},	// 、
	0x309C:{区:10,点: 5},	// ゜
	0x30F2:{区:10,点: 6},	// ヲ
	0x30A1:{区:10,点: 7},	// ァ
	0x30A3:{区:10,点: 8},	// ィ
	0x30A5:{区:10,点: 9},	// ゥ
	0x30A7:{区:10,点:10},	// ェ
	0x30A9:{区:10,点:11},	// ォ
	0x30E3:{区:10,点:12},	// ャ
	0x30E5:{区:10,点:13},	// ュ
	0x30E7:{区:10,点:14},	// ョ
	0x30C3:{区:10,点:15},	// ッ
	0x30FC:{区:10,点: 0},	// ー
	0x30A2:{区:11,点: 1},	// ア
	0x30A4:{区:11,点: 2},	// イ
	0x30A6:{区:11,点: 3},	// ウ
	0x30A8:{区:11,点: 4},	// エ
	0x30AA:{区:11,点: 5},	// オ
	0x30AB:{区:11,点: 6},	// カ
	0x30AD:{区:11,点: 7},	// キ
	0x30AF:{区:11,点: 8},	// ク
	0x30B1:{区:11,点: 9},	// ケ
	0x30B3:{区:11,点:10},	// コ
	0x30B5:{区:11,点:11},	// サ
	0x30B7:{区:11,点:12},	// シ
	0x30B9:{区:11,点:13},	// ス
	0x30BB:{区:11,点:14},	// セ
	0x30BD:{区:11,点:15},	// ソ
	0x30BF:{区:12,点: 0},	// タ
	0x30C1:{区:12,点: 1},	// チ
	0x30C4:{区:12,点: 2},	// ツ
	0x30C6:{区:12,点: 3},	// テ
	0x30C8:{区:12,点: 4},	// ト
	0x30CA:{区:12,点: 5},	// ナ
	0x30CB:{区:12,点: 6},	// ニ
	0x30CC:{区:12,点: 7},	// ヌ
	0x30CD:{区:12,点: 8},	// ネ
	0x30CE:{区:12,点: 9},	// ノ
	0x30CF:{区:12,点:10},	// ハ
	0x30D2:{区:12,点:11},	// ヒ
	0x30D5:{区:12,点:12},	// フ
	0x30D8:{区:12,点:13},	// ヘ
	0x30DB:{区:12,点:14},	// ホ
	0x30DE:{区:12,点:15},	// マ
	0x30DF:{区:13,点: 0},	// ミ
	0x30E0:{区:13,点: 1},	// ム
	0x30E1:{区:13,点: 2},	// メ
	0x30E2:{区:13,点: 3},	// モ
	0x30E4:{区:13,点: 4},	// ヤ
	0x30E6:{区:13,点: 5},	// ユ
	0x30E8:{区:13,点: 6},	// ヨ
	0x30E9:{区:13,点: 7},	// ラ
	0x30EA:{区:13,点: 8},	// リ
	0x30EB:{区:13,点: 9},	// ル
	0x30EC:{区:13,点:10},	// レ
	0x30ED:{区:13,点:11},	// ロ
	0x30EF:{区:13,点:12},	// ワ
	0x30F3:{区:13,点:13},	// ン
	0x309B:{区:13,点:14},	// ゛
	0x00B0:{区:13,点:15},	// 15
}
let utf16_to_sjis = 
{
	  0:{区: 2,点: 3},	// ■	NUL（null文字)
	  1:{区: 2,点: 3},	// ■	SOH（ヘッダ開始）
	  2:{区: 2,点: 3},	// ■	STX（テキスト開始）
	  3:{区: 2,点: 3},	// ■	ETX（テキスト終了）
	  4:{区: 2,点: 3},	// ■	EOT（転送終了）
	  5:{区: 2,点: 3},	// ■	ENQ（照会）
	  6:{区: 2,点: 3},	// ■	ACK（受信確認）
	  7:{区: 2,点: 3},	// ■	BEL（警告）
	  8:{区: 2,点: 3},	// ■	BS（後退）
	  9:{区: 2,点: 3},	// ■	HT（水平タブ）
	 10:{区: 2,点: 3},	// ■	LF（改行）
	 11:{区: 2,点: 3},	// ■	VT（垂直タブ）
	 12:{区: 2,点: 3},	// ■	FF（改頁）
	 13:{区: 2,点: 3},	// ■	CR（復帰）
	 14:{区: 2,点: 3},	// ■	SO（シフトアウト）
	 15:{区: 2,点: 3},	// ■	SI（シフトイン）
	 16:{区: 2,点: 3},	// ■	DLE（データリンクエスケー プ）
	 17:{区: 2,点: 3},	// ■	DC1（装置制御１）
	 18:{区: 2,点: 3},	// ■	DC2（装置制御２）
	 19:{区: 2,点: 3},	// ■	DC3（装置制御３）
	 20:{区: 2,点: 3},	// ■	DC4（装置制御４）
	 21:{区: 2,点: 3},	// ■	NAK（受信失敗）
	 22:{区: 2,点: 3},	// ■	SYN（同期）
	 23:{区: 2,点: 3},	// ■	ETB（転送ブロック終了）
	 24:{区: 2,点: 3},	// ■	CAN（キャンセル）
	 25:{区: 2,点: 3},	// ■	EM（メディア終了）
	 26:{区: 2,点: 3},	// ■	SUB（置換）
	 27:{区: 2,点: 3},	// ■	ESC（エスケープ）
	 28:{区: 2,点: 3},	// ■	FS（フォーム区切り）
	 29:{区: 2,点: 3},	// ■	GS（グループ区切り）
	 30:{区: 2,点: 3},	// ■	RS（レコード区切り）
	 31:{区: 2,点: 3},	// ■	US（ユニット区切り）
	 32:{区: 1,点: 1},	// 　	SPC（空白文字）
	 33:{区: 1,点:10},	// ！	!
	 34:{区: 1,点:77},	// ″	"
	 35:{区: 1,点:84},	// ＃	#
	 36:{区: 1,点:80},	// ＄	$
	 37:{区: 1,点:83},	// ％	%
	 38:{区: 1,点:85},	// ＆	&
	 39:{区: 1,点:39},	// ’	'
	 40:{区: 1,点:42},	// （	(
	 41:{区: 1,点:43},	// ）	)
	 42:{区: 1,点:86},	// ＊	*
	 43:{区: 1,点:60},	// ＋	+
	 44:{区: 1,点: 4},	// ，	,
	 45:{区: 1,点:61},	// －	-
	 46:{区: 1,点: 5},	// ．	.
	 47:{区: 1,点:31},	// ／	/
	 48:{区: 3,点:16},	// ０	0		
	 49:{区: 3,点:17},	// １	1
	 50:{区: 3,点:18},	// ２	2
	 51:{区: 3,点:19},	// ３	3
	 52:{区: 3,点:20},	// ４	4
	 53:{区: 3,点:21},	// ５	5
	 54:{区: 3,点:22},	// ６	6
	 55:{区: 3,点:23},	// ７	7
	 56:{区: 3,点:24},	// ８	8
	 57:{区: 3,点:25},	// ９	9
	 58:{区: 1,点: 7},	// ：	:
	 59:{区: 1,点: 8},	// ；	;
	 60:{区: 1,点:67},	// ＜	<
	 61:{区: 1,点:65},	// ＝	=
	 62:{区: 1,点:68},	// ＞	>
	 63:{区: 1,点: 9},	// ？	?
	 64:{区: 1,点:87},	// ＠	@
	 65:{区: 3,点:33},	// Ａ	A
	 66:{区: 3,点:34},	// Ｂ	B
	 67:{区: 3,点:35},	// Ｃ	C
	 68:{区: 3,点:36},	// Ｄ	D
	 69:{区: 3,点:37},	// Ｅ	E
	 70:{区: 3,点:38},	// Ｆ	F
	 71:{区: 3,点:39},	// Ｇ	G
	 72:{区: 3,点:40},	// Ｈ	H
	 73:{区: 3,点:41},	// Ｉ	I
	 74:{区: 3,点:42},	// Ｊ	J
	 75:{区: 3,点:43},	// Ｋ	K
	 76:{区: 3,点:44},	// Ｌ	L
	 77:{区: 3,点:45},	// Ｍ	M
	 78:{区: 3,点:46},	// Ｎ	N
	 79:{区: 3,点:47},	// Ｏ	O
	 80:{区: 3,点:48},	// Ｐ	P
	 81:{区: 3,点:49},	// Ｑ	Q
	 82:{区: 3,点:50},	// Ｒ	R
	 83:{区: 3,点:51},	// Ｓ	S
	 84:{区: 3,点:52},	// Ｔ	T
	 85:{区: 3,点:53},	// Ｕ	U
	 86:{区: 3,点:54},	// Ｖ	V
	 87:{区: 3,点:55},	// Ｗ	W
	 88:{区: 3,点:56},	// Ｘ	X
	 89:{区: 3,点:57},	// Ｙ	Y
	 90:{区: 3,点:58},	// Ｚ	Z
	 91:{区: 1,点:46},	// ［	[
	 92:{区: 1,点:79},	// ￥	\
	 93:{区: 1,点:47},	// ］	]
	 94:{区: 1,点:16},	// ＾	^
	 95:{区: 1,点:18},	// ＿	_
	 96:{区: 1,点:38},	// ‘	`
	 97:{区: 3,点:65},	// ａ	a
	 98:{区: 3,点:66},	// ｂ	b
	 99:{区: 3,点:67},	// ｃ	c
	100:{区: 3,点:68},	// ｄ	d
	101:{区: 3,点:69},	// ｅ	e
	102:{区: 3,点:70},	// ｆ	f
	103:{区: 3,点:71},	// ｇ	g
	104:{区: 3,点:72},	// ｈ	h
	105:{区: 3,点:73},	// ｉ	i
	106:{区: 3,点:74},	// ｊ	j
	107:{区: 3,点:75},	// ｋ	k
	108:{区: 3,点:76},	// ｌ	l
	109:{区: 3,点:77},	// ｍ	m
	110:{区: 3,点:78},	// ｎ	n
	111:{区: 3,点:79},	// ｏ	o
	112:{区: 3,点:80},	// ｐ	p
	113:{区: 3,点:81},	// ｑ	q
	114:{区: 3,点:82},	// ｒ	r
	115:{区: 3,点:83},	// ｓ	s
	116:{区: 3,点:84},	// ｔ	t
	117:{区: 3,点:85},	// ｕ	u
	118:{区: 3,点:86},	// ｖ	v
	119:{区: 3,点:87},	// ｗ	w
	120:{区: 3,点:88},	// ｘ	x
	121:{区: 3,点:89},	// ｙ	y
	122:{区: 3,点:90},	// ｚ	z
	123:{区: 1,点:48},	// ｛	{
	124:{区: 1,点:35},	// ｜	|
	125:{区: 1,点:49},	// ｝	}
	126:{区: 1,点:33},	// ～	~
	127:{区: 2,点: 3},	// ■	DEL（削除）
	0x3000:{区: 1,点: 1},	// 　
	0x3001:{区: 1,点: 2},	// 、
	0x3002:{区: 1,点: 3},	// 。
	0xFF0C:{区: 1,点: 4},	// ，
	0xFF0E:{区: 1,点: 5},	// ．
	0x30FB:{区: 1,点: 6},	// ・
	0xFF1A:{区: 1,点: 7},	// ：
	0xFF1B:{区: 1,点: 8},	// ；
	0xFF1F:{区: 1,点: 9},	// ？
	0xFF01:{区: 1,点:10},	// ！
	0x309B:{区: 1,点:11},	// ゛
	0x309C:{区: 1,点:12},	// ゜
	0x00B4:{区: 1,点:13},	// ´
	0xFF40:{区: 1,点:14},	// ｀
	0x00A8:{区: 1,点:15},	// ¨
	0xFF3E:{区: 1,点:16},	// ＾
	0xFFE3:{区: 1,点:17},	// ￣
	0xFF3F:{区: 1,点:18},	// ＿
	0x30FD:{区: 1,点:19},	// ヽ
	0x30FE:{区: 1,点:20},	// ヾ
	0x309D:{区: 1,点:21},	// ゝ
	0x309E:{区: 1,点:22},	// ゞ
	0x3003:{区: 1,点:23},	// 〃
	0x4EDD:{区: 1,点:24},	// 仝
	0x3005:{区: 1,点:25},	// 々
	0x3006:{区: 1,点:26},	// 〆
	0x3007:{区: 1,点:27},	// 〇
	0x30FC:{区: 1,点:28},	// ー
	0x2015:{区: 1,点:29},	// ―
	0x2010:{区: 1,点:30},	// ‐
	0xFF0F:{区: 1,点:31},	// ／
	0x005C:{区: 1,点:32},	// ＼
	0x301C:{区: 1,点:33},	// ～
	0x2016:{区: 1,点:34},	// ∥
	0xFF5C:{区: 1,点:35},	// ｜
	0x2026:{区: 1,点:36},	// …
	0x2025:{区: 1,点:37},	// ‥
	0x2018:{区: 1,点:38},	// ‘
	0x2019:{区: 1,点:39},	// ’
	0x201C:{区: 1,点:40},	// “
	0x201D:{区: 1,点:41},	// ”
	0xFF08:{区: 1,点:42},	// （
	0xFF09:{区: 1,点:43},	// ）
	0x3014:{区: 1,点:44},	// 〔
	0x3015:{区: 1,点:45},	// 〕
	0xFF3B:{区: 1,点:46},	// ［
	0xFF3D:{区: 1,点:47},	// ］
	0xFF5B:{区: 1,点:48},	// ｛
	0xFF5D:{区: 1,点:49},	// ｝
	0x3008:{区: 1,点:50},	// 〈
	0x3009:{区: 1,点:51},	// 〉
	0x300A:{区: 1,点:52},	// 《
	0x300B:{区: 1,点:53},	// 》
	0x300C:{区: 1,点:54},	// 「
	0x300D:{区: 1,点:55},	// 」
	0x300E:{区: 1,点:56},	// 『
	0x300F:{区: 1,点:57},	// 』
	0x3010:{区: 1,点:58},	// 【
	0x3011:{区: 1,点:59},	// 】
	0xFF0B:{区: 1,点:60},	// ＋
	0x2212:{区: 1,点:61},	// －
	0x00B1:{区: 1,点:62},	// ±
	0x00D7:{区: 1,点:63},	// ×
	0x00F7:{区: 1,点:64},	// ÷
	0xFF1D:{区: 1,点:65},	// ＝
	0x2260:{区: 1,点:66},	// ≠
	0xFF1C:{区: 1,点:67},	// ＜
	0xFF1E:{区: 1,点:68},	// ＞
	0x2266:{区: 1,点:69},	// ≦
	0x2267:{区: 1,点:70},	// ≧
	0x221E:{区: 1,点:71},	// ∞
	0x2234:{区: 1,点:72},	// ∴
	0x2642:{区: 1,点:73},	// ♂
	0x2640:{区: 1,点:74},	// ♀
	0x00B0:{区: 1,点:75},	// °
	0x2032:{区: 1,点:76},	// ′
	0x2033:{区: 1,点:77},	// ″
	0x2103:{区: 1,点:78},	// ℃
	0xFFE5:{区: 1,点:79},	// ￥
	0xFF04:{区: 1,点:80},	// ＄
	0x00A2:{区: 1,点:81},	// ￠
	0x00A3:{区: 1,点:82},	// ￡
	0xFF05:{区: 1,点:83},	// ％
	0xFF03:{区: 1,点:84},	// ＃
	0xFF06:{区: 1,点:85},	// ＆
	0xFF0A:{区: 1,点:86},	// ＊
	0xFF20:{区: 1,点:87},	// ＠
	0x00A7:{区: 1,点:88},	// §
	0x2606:{区: 1,点:89},	// ☆
	0x2605:{区: 1,点:90},	// ★
	0x25CB:{区: 1,点:91},	// ○
	0x25CF:{区: 1,点:92},	// ●
	0x25CE:{区: 1,点:93},	// ◎
	0x25C7:{区: 1,点:94},	// ◇
	0x25C6:{区: 2,点: 1},	// ◆
	0x25A1:{区: 2,点: 2},	// □
	0x25A0:{区: 2,点: 3},	// ■
	0x25B3:{区: 2,点: 4},	// △
	0x25B2:{区: 2,点: 5},	// ▲
	0x25BD:{区: 2,点: 6},	// ▽
	0x25BC:{区: 2,点: 7},	// ▼
	0x203B:{区: 2,点: 8},	// ※
	0x3012:{区: 2,点: 9},	// 〒
	0x2192:{区: 2,点:10},	// →
	0x2190:{区: 2,点:11},	// ←
	0x2191:{区: 2,点:12},	// ↑
	0x2193:{区: 2,点:13},	// ↓
	0x3013:{区: 2,点:14},	// 〓
	0x2208:{区: 2,点:26},	// ∈
	0x220B:{区: 2,点:27},	// ∋
	0x2286:{区: 2,点:28},	// ⊆
	0x2287:{区: 2,点:29},	// ⊇
	0x2282:{区: 2,点:30},	// ⊂
	0x2283:{区: 2,点:31},	// ⊃
	0x222A:{区: 2,点:32},	// ∪
	0x2229:{区: 2,点:33},	// ∩
	0x2227:{区: 2,点:42},	// ∧
	0x2228:{区: 2,点:43},	// ∨
	0x00AC:{区: 2,点:44},	// ￢
	0x21D2:{区: 2,点:45},	// ⇒
	0x21D4:{区: 2,点:46},	// ⇔
	0x2200:{区: 2,点:47},	// ∀
	0x2203:{区: 2,点:48},	// ∃
	0x22A4:{区: 2,点:60},	// ∠
	0x22A5:{区: 2,点:61},	// ⊥
	0x2312:{区: 2,点:62},	// ⌒
	0x2202:{区: 2,点:63},	// ∂
	0x2207:{区: 2,点:64},	// ∇
	0x2261:{区: 2,点:65},	// ≡
	0x2252:{区: 2,点:66},	// ≒
	0x226A:{区: 2,点:67},	// ≪
	0x226B:{区: 2,点:68},	// ≫
	0x221A:{区: 2,点:69},	// √
	0x223D:{区: 2,点:70},	// ∽
	0x221D:{区: 2,点:71},	// ∝
	0x2235:{区: 2,点:72},	// ∵
	0x222B:{区: 2,点:73},	// ∫
	0x222C:{区: 2,点:74},	// ∬
	0x212B:{区: 2,点:82},	// Å
	0x2030:{区: 2,点:83},	// ‰
	0x266F:{区: 2,点:84},	// ♯
	0x266D:{区: 2,点:85},	// ♭
	0x266A:{区: 2,点:86},	// ♪
	0x2020:{区: 2,点:87},	// †
	0x2021:{区: 2,点:88},	// ‡
	0x00B6:{区: 2,点:89},	// ¶
	0x25EF:{区: 2,点:94},	// ◯
	0xFF10:{区: 3,点:16},	// ０
	0xFF11:{区: 3,点:17},	// １
	0xFF12:{区: 3,点:18},	// ２
	0xFF13:{区: 3,点:19},	// ３
	0xFF14:{区: 3,点:20},	// ４
	0xFF15:{区: 3,点:21},	// ５
	0xFF16:{区: 3,点:22},	// ６
	0xFF17:{区: 3,点:23},	// ７
	0xFF18:{区: 3,点:24},	// ８
	0xFF19:{区: 3,点:25},	// ９
	0xFF21:{区: 3,点:33},	// Ａ
	0xFF22:{区: 3,点:34},	// Ｂ
	0xFF23:{区: 3,点:35},	// Ｃ
	0xFF24:{区: 3,点:36},	// Ｄ
	0xFF25:{区: 3,点:37},	// Ｅ
	0xFF26:{区: 3,点:38},	// Ｆ
	0xFF27:{区: 3,点:39},	// Ｇ
	0xFF28:{区: 3,点:40},	// Ｈ
	0xFF29:{区: 3,点:41},	// Ｉ
	0xFF2A:{区: 3,点:42},	// Ｊ
	0xFF2B:{区: 3,点:43},	// Ｋ
	0xFF2C:{区: 3,点:44},	// Ｌ
	0xFF2D:{区: 3,点:45},	// Ｍ
	0xFF2E:{区: 3,点:46},	// Ｎ
	0xFF2F:{区: 3,点:47},	// Ｏ
	0xFF30:{区: 3,点:48},	// Ｐ
	0xFF31:{区: 3,点:49},	// Ｑ
	0xFF32:{区: 3,点:50},	// Ｒ
	0xFF33:{区: 3,点:51},	// Ｓ
	0xFF34:{区: 3,点:52},	// Ｔ
	0xFF35:{区: 3,点:53},	// Ｕ
	0xFF36:{区: 3,点:54},	// Ｖ
	0xFF37:{区: 3,点:55},	// Ｗ
	0xFF38:{区: 3,点:56},	// Ｘ
	0xFF39:{区: 3,点:57},	// Ｙ
	0xFF3A:{区: 3,点:58},	// Ｚ
	0xFF41:{区: 3,点:65},	// ａ
	0xFF42:{区: 3,点:66},	// ｂ
	0xFF43:{区: 3,点:67},	// ｃ
	0xFF44:{区: 3,点:68},	// ｄ
	0xFF45:{区: 3,点:69},	// ｅ
	0xFF46:{区: 3,点:70},	// ｆ
	0xFF47:{区: 3,点:71},	// ｇ
	0xFF48:{区: 3,点:72},	// ｈ
	0xFF49:{区: 3,点:73},	// ｉ
	0xFF4A:{区: 3,点:74},	// ｊ
	0xFF4B:{区: 3,点:75},	// ｋ
	0xFF4C:{区: 3,点:76},	// ｌ
	0xFF4D:{区: 3,点:77},	// ｍ
	0xFF4E:{区: 3,点:78},	// ｎ
	0xFF4F:{区: 3,点:79},	// ｏ
	0xFF50:{区: 3,点:80},	// ｐ
	0xFF51:{区: 3,点:81},	// ｑ
	0xFF52:{区: 3,点:82},	// ｒ
	0xFF53:{区: 3,点:83},	// ｓ
	0xFF54:{区: 3,点:84},	// ｔ
	0xFF55:{区: 3,点:85},	// ｕ
	0xFF56:{区: 3,点:86},	// ｖ
	0xFF57:{区: 3,点:87},	// ｗ
	0xFF58:{区: 3,点:88},	// ｘ
	0xFF59:{区: 3,点:89},	// ｙ
	0xFF5A:{区: 3,点:90},	// ｚ
	0x3041:{区: 4,点: 1},	// ぁ
	0x3042:{区: 4,点: 2},	// あ
	0x3043:{区: 4,点: 3},	// ぃ
	0x3044:{区: 4,点: 4},	// い
	0x3045:{区: 4,点: 5},	// ぅ
	0x3046:{区: 4,点: 6},	// う
	0x3047:{区: 4,点: 7},	// ぇ
	0x3048:{区: 4,点: 8},	// え
	0x3049:{区: 4,点: 9},	// ぉ
	0x304A:{区: 4,点:10},	// お
	0x304B:{区: 4,点:11},	// か
	0x304C:{区: 4,点:12},	// が
	0x304D:{区: 4,点:13},	// き
	0x304E:{区: 4,点:14},	// ぎ
	0x304F:{区: 4,点:15},	// く
	0x3050:{区: 4,点:16},	// ぐ
	0x3051:{区: 4,点:17},	// け
	0x3052:{区: 4,点:18},	// げ
	0x3053:{区: 4,点:19},	// こ
	0x3054:{区: 4,点:20},	// ご
	0x3055:{区: 4,点:21},	// さ
	0x3056:{区: 4,点:22},	// ざ
	0x3057:{区: 4,点:23},	// し
	0x3058:{区: 4,点:24},	// じ
	0x3059:{区: 4,点:25},	// す
	0x305A:{区: 4,点:26},	// ず
	0x305B:{区: 4,点:27},	// せ
	0x305C:{区: 4,点:28},	// ぜ
	0x305D:{区: 4,点:29},	// そ
	0x305E:{区: 4,点:30},	// ぞ
	0x305F:{区: 4,点:31},	// た
	0x3060:{区: 4,点:32},	// だ
	0x3061:{区: 4,点:33},	// ち
	0x3062:{区: 4,点:34},	// ぢ
	0x3063:{区: 4,点:35},	// っ
	0x3064:{区: 4,点:36},	// つ
	0x3065:{区: 4,点:37},	// づ
	0x3066:{区: 4,点:38},	// て
	0x3067:{区: 4,点:39},	// で
	0x3068:{区: 4,点:40},	// と
	0x3069:{区: 4,点:41},	// ど
	0x306A:{区: 4,点:42},	// な
	0x306B:{区: 4,点:43},	// に
	0x306C:{区: 4,点:44},	// ぬ
	0x306D:{区: 4,点:45},	// ね
	0x306E:{区: 4,点:46},	// の
	0x306F:{区: 4,点:47},	// は
	0x3070:{区: 4,点:48},	// ば
	0x3071:{区: 4,点:49},	// ぱ
	0x3072:{区: 4,点:50},	// ひ
	0x3073:{区: 4,点:51},	// び
	0x3074:{区: 4,点:52},	// ぴ
	0x3075:{区: 4,点:53},	// ふ
	0x3076:{区: 4,点:54},	// ぶ
	0x3077:{区: 4,点:55},	// ぷ
	0x3078:{区: 4,点:56},	// へ
	0x3079:{区: 4,点:57},	// べ
	0x307A:{区: 4,点:58},	// ぺ
	0x307B:{区: 4,点:59},	// ほ
	0x307C:{区: 4,点:60},	// ぼ
	0x307D:{区: 4,点:61},	// ぽ
	0x307E:{区: 4,点:62},	// ま
	0x307F:{区: 4,点:63},	// み
	0x3080:{区: 4,点:64},	// む
	0x3081:{区: 4,点:65},	// め
	0x3082:{区: 4,点:66},	// も
	0x3083:{区: 4,点:67},	// ゃ
	0x3084:{区: 4,点:68},	// や
	0x3085:{区: 4,点:69},	// ゅ
	0x3086:{区: 4,点:70},	// ゆ
	0x3087:{区: 4,点:71},	// ょ
	0x3088:{区: 4,点:72},	// よ
	0x3089:{区: 4,点:73},	// ら
	0x308A:{区: 4,点:74},	// り
	0x308B:{区: 4,点:75},	// る
	0x308C:{区: 4,点:76},	// れ
	0x308D:{区: 4,点:77},	// ろ
	0x308E:{区: 4,点:78},	// ゎ
	0x308F:{区: 4,点:79},	// わ
	0x3090:{区: 4,点:80},	// ゐ
	0x3091:{区: 4,点:81},	// ゑ
	0x3092:{区: 4,点:82},	// を
	0x3093:{区: 4,点:83},	// ん
	0x30A1:{区: 5,点: 1},	// ァ
	0x30A2:{区: 5,点: 2},	// ア
	0x30A3:{区: 5,点: 3},	// ィ
	0x30A4:{区: 5,点: 4},	// イ
	0x30A5:{区: 5,点: 5},	// ゥ
	0x30A6:{区: 5,点: 6},	// ウ
	0x30A7:{区: 5,点: 7},	// ェ
	0x30A8:{区: 5,点: 8},	// エ
	0x30A9:{区: 5,点: 9},	// ォ
	0x30AA:{区: 5,点:10},	// オ
	0x30AB:{区: 5,点:11},	// カ
	0x30AC:{区: 5,点:12},	// ガ
	0x30AD:{区: 5,点:13},	// キ
	0x30AE:{区: 5,点:14},	// ギ
	0x30AF:{区: 5,点:15},	// ク
	0x30B0:{区: 5,点:16},	// グ
	0x30B1:{区: 5,点:17},	// ケ
	0x30B2:{区: 5,点:18},	// ゲ
	0x30B3:{区: 5,点:19},	// コ
	0x30B4:{区: 5,点:20},	// ゴ
	0x30B5:{区: 5,点:21},	// サ
	0x30B6:{区: 5,点:22},	// ザ
	0x30B7:{区: 5,点:23},	// シ
	0x30B8:{区: 5,点:24},	// ジ
	0x30B9:{区: 5,点:25},	// ス
	0x30BA:{区: 5,点:26},	// ズ
	0x30BB:{区: 5,点:27},	// セ
	0x30BC:{区: 5,点:28},	// ゼ
	0x30BD:{区: 5,点:29},	// ソ
	0x30BE:{区: 5,点:30},	// ゾ
	0x30BF:{区: 5,点:31},	// タ
	0x30C0:{区: 5,点:32},	// ダ
	0x30C1:{区: 5,点:33},	// チ
	0x30C2:{区: 5,点:34},	// ヂ
	0x30C3:{区: 5,点:35},	// ッ
	0x30C4:{区: 5,点:36},	// ツ
	0x30C5:{区: 5,点:37},	// ヅ
	0x30C6:{区: 5,点:38},	// テ
	0x30C7:{区: 5,点:39},	// デ
	0x30C8:{区: 5,点:40},	// ト
	0x30C9:{区: 5,点:41},	// ド
	0x30CA:{区: 5,点:42},	// ナ
	0x30CB:{区: 5,点:43},	// ニ
	0x30CC:{区: 5,点:44},	// ヌ
	0x30CD:{区: 5,点:45},	// ネ
	0x30CE:{区: 5,点:46},	// ノ
	0x30CF:{区: 5,点:47},	// ハ
	0x30D0:{区: 5,点:48},	// バ
	0x30D1:{区: 5,点:49},	// パ
	0x30D2:{区: 5,点:50},	// ヒ
	0x30D3:{区: 5,点:51},	// ビ
	0x30D4:{区: 5,点:52},	// ピ
	0x30D5:{区: 5,点:53},	// フ
	0x30D6:{区: 5,点:54},	// ブ
	0x30D7:{区: 5,点:55},	// プ
	0x30D8:{区: 5,点:56},	// ヘ
	0x30D9:{区: 5,点:57},	// ベ
	0x30DA:{区: 5,点:58},	// ペ
	0x30DB:{区: 5,点:59},	// ホ
	0x30DC:{区: 5,点:60},	// ボ
	0x30DD:{区: 5,点:61},	// ポ
	0x30DE:{区: 5,点:62},	// マ
	0x30DF:{区: 5,点:63},	// ミ
	0x30E0:{区: 5,点:64},	// ム
	0x30E1:{区: 5,点:65},	// メ
	0x30E2:{区: 5,点:66},	// モ
	0x30E3:{区: 5,点:67},	// ャ
	0x30E4:{区: 5,点:68},	// ヤ
	0x30E5:{区: 5,点:69},	// ュ
	0x30E6:{区: 5,点:70},	// ユ
	0x30E7:{区: 5,点:71},	// ョ
	0x30E8:{区: 5,点:72},	// ヨ
	0x30E9:{区: 5,点:73},	// ラ
	0x30EA:{区: 5,点:74},	// リ
	0x30EB:{区: 5,点:75},	// ル
	0x30EC:{区: 5,点:76},	// レ
	0x30ED:{区: 5,点:77},	// ロ
	0x30EE:{区: 5,点:78},	// ヮ
	0x30EF:{区: 5,点:79},	// ワ
	0x30F0:{区: 5,点:80},	// ヰ
	0x30F1:{区: 5,点:81},	// ヱ
	0x30F2:{区: 5,点:82},	// ヲ
	0x30F3:{区: 5,点:83},	// ン
	0x30F4:{区: 5,点:84},	// ヴ
	0x30F5:{区: 5,点:85},	// ヵ
	0x30F6:{区: 5,点:86},	// ヶ
	0x0391:{区: 6,点: 1},	// Α
	0x0392:{区: 6,点: 2},	// Β
	0x0393:{区: 6,点: 3},	// Γ
	0x0394:{区: 6,点: 4},	// Δ
	0x0395:{区: 6,点: 5},	// Ε
	0x0396:{区: 6,点: 6},	// Ζ
	0x0397:{区: 6,点: 7},	// Η
	0x0398:{区: 6,点: 8},	// Θ
	0x0399:{区: 6,点: 9},	// Ι
	0x039A:{区: 6,点:10},	// Κ
	0x039B:{区: 6,点:11},	// Λ
	0x039C:{区: 6,点:12},	// Μ
	0x039D:{区: 6,点:13},	// Ν
	0x039E:{区: 6,点:14},	// Ξ
	0x039F:{区: 6,点:15},	// Ο
	0x03A0:{区: 6,点:16},	// Π
	0x03A1:{区: 6,点:17},	// Ρ
	0x03A3:{区: 6,点:18},	// Σ
	0x03A4:{区: 6,点:19},	// Τ
	0x03A5:{区: 6,点:20},	// Υ
	0x03A6:{区: 6,点:21},	// Φ
	0x03A7:{区: 6,点:22},	// Χ
	0x03A8:{区: 6,点:23},	// Ψ
	0x03A9:{区: 6,点:24},	// Ω
	0x03B1:{区: 6,点:33},	// α
	0x03B2:{区: 6,点:34},	// β
	0x03B3:{区: 6,点:35},	// γ
	0x03B4:{区: 6,点:36},	// δ
	0x03B5:{区: 6,点:37},	// ε
	0x03B6:{区: 6,点:38},	// ζ
	0x03B7:{区: 6,点:39},	// η
	0x03B8:{区: 6,点:40},	// θ
	0x03B9:{区: 6,点:41},	// ι
	0x03BA:{区: 6,点:42},	// κ
	0x03BB:{区: 6,点:43},	// λ
	0x03BC:{区: 6,点:44},	// μ
	0x03BD:{区: 6,点:45},	// ν
	0x03BE:{区: 6,点:46},	// ξ
	0x03BF:{区: 6,点:47},	// ο
	0x03C0:{区: 6,点:48},	// π
	0x03C1:{区: 6,点:49},	// ρ
	0x03C3:{区: 6,点:50},	// σ
	0x03C4:{区: 6,点:51},	// τ
	0x03C5:{区: 6,点:52},	// υ
	0x03C6:{区: 6,点:53},	// φ
	0x03C7:{区: 6,点:54},	// χ
	0x03C8:{区: 6,点:55},	// ψ
	0x03C9:{区: 6,点:56},	// ω
	0x0410:{区: 7,点: 1},	// А
	0x0411:{区: 7,点: 2},	// Б
	0x0412:{区: 7,点: 3},	// В
	0x0413:{区: 7,点: 4},	// Г
	0x0414:{区: 7,点: 5},	// Д
	0x0415:{区: 7,点: 6},	// Е
	0x0401:{区: 7,点: 7},	// Ё
	0x0416:{区: 7,点: 8},	// Ж
	0x0417:{区: 7,点: 9},	// З
	0x0418:{区: 7,点:10},	// И
	0x0419:{区: 7,点:11},	// Й
	0x041A:{区: 7,点:12},	// К
	0x041B:{区: 7,点:13},	// Л
	0x041C:{区: 7,点:14},	// М
	0x041D:{区: 7,点:15},	// Н
	0x041E:{区: 7,点:16},	// О
	0x041F:{区: 7,点:17},	// П
	0x0420:{区: 7,点:18},	// Р
	0x0421:{区: 7,点:19},	// С
	0x0422:{区: 7,点:20},	// Т
	0x0423:{区: 7,点:21},	// У
	0x0424:{区: 7,点:22},	// Ф
	0x0425:{区: 7,点:23},	// Х
	0x0426:{区: 7,点:24},	// Ц
	0x0427:{区: 7,点:25},	// Ч
	0x0428:{区: 7,点:26},	// Ш
	0x0429:{区: 7,点:27},	// Щ
	0x042A:{区: 7,点:28},	// Ъ
	0x042B:{区: 7,点:29},	// Ы
	0x042C:{区: 7,点:30},	// Ь
	0x042D:{区: 7,点:31},	// Э
	0x042E:{区: 7,点:32},	// Ю
	0x042F:{区: 7,点:33},	// Я
	0x0430:{区: 7,点:49},	// а
	0x0431:{区: 7,点:50},	// б
	0x0432:{区: 7,点:51},	// в
	0x0433:{区: 7,点:52},	// г
	0x0434:{区: 7,点:53},	// д
	0x0435:{区: 7,点:54},	// е
	0x0451:{区: 7,点:55},	// ё
	0x0436:{区: 7,点:56},	// ж
	0x0437:{区: 7,点:57},	// з
	0x0438:{区: 7,点:58},	// и
	0x0439:{区: 7,点:59},	// й
	0x043A:{区: 7,点:60},	// к
	0x043B:{区: 7,点:61},	// л
	0x043C:{区: 7,点:62},	// м
	0x043D:{区: 7,点:63},	// н
	0x043E:{区: 7,点:64},	// о
	0x043F:{区: 7,点:65},	// п
	0x0440:{区: 7,点:66},	// р
	0x0441:{区: 7,点:67},	// с
	0x0442:{区: 7,点:68},	// т
	0x0443:{区: 7,点:69},	// у
	0x0444:{区: 7,点:70},	// ф
	0x0445:{区: 7,点:71},	// х
	0x0446:{区: 7,点:72},	// ц
	0x0447:{区: 7,点:73},	// ч
	0x0448:{区: 7,点:74},	// ш
	0x0449:{区: 7,点:75},	// щ
	0x044A:{区: 7,点:76},	// ъ
	0x044B:{区: 7,点:77},	// ы
	0x044C:{区: 7,点:78},	// ь
	0x044D:{区: 7,点:79},	// э
	0x044E:{区: 7,点:80},	// ю
	0x044F:{区: 7,点:81},	// я
	0x2500:{区: 8,点: 1},	// ─
	0x2502:{区: 8,点: 2},	// │
	0x250C:{区: 8,点: 3},	// ┌
	0x2510:{区: 8,点: 4},	// ┐
	0x2518:{区: 8,点: 5},	// ┘
	0x2514:{区: 8,点: 6},	// └
	0x251C:{区: 8,点: 7},	// ├
	0x252C:{区: 8,点: 8},	// ┬
	0x2524:{区: 8,点: 9},	// ┤
	0x2534:{区: 8,点:10},	// ┴
	0x253C:{区: 8,点:11},	// ┼
	0x2501:{区: 8,点:12},	// ━
	0x2503:{区: 8,点:13},	// ┃
	0x250F:{区: 8,点:14},	// ┏
	0x2513:{区: 8,点:15},	// ┓
	0x251B:{区: 8,点:16},	// ┛
	0x2517:{区: 8,点:17},	// ┗
	0x2523:{区: 8,点:18},	// ┣
	0x2533:{区: 8,点:19},	// ┳
	0x252B:{区: 8,点:20},	// ┫
	0x253B:{区: 8,点:21},	// ┻
	0x254B:{区: 8,点:22},	// ╋
	0x2520:{区: 8,点:23},	// ┠
	0x252F:{区: 8,点:24},	// ┯
	0x2528:{区: 8,点:25},	// ┨
	0x2537:{区: 8,点:26},	// ┷
	0x253F:{区: 8,点:27},	// ┿
	0x251D:{区: 8,点:28},	// ┝
	0x2530:{区: 8,点:29},	// ┰
	0x2525:{区: 8,点:30},	// ┥
	0x2538:{区: 8,点:31},	// ┸
	0x2542:{区: 8,点:32},	// ╂
	0x4E9C:{区:16,点: 1},	// 亜
	0x5516:{区:16,点: 2},	// 唖
	0x5A03:{区:16,点: 3},	// 娃
	0x963F:{区:16,点: 4},	// 阿
	0x54C0:{区:16,点: 5},	// 哀
	0x611B:{区:16,点: 6},	// 愛
	0x6328:{区:16,点: 7},	// 挨
	0x59F6:{区:16,点: 8},	// 姶
	0x9022:{区:16,点: 9},	// 逢
	0x8475:{区:16,点:10},	// 葵
	0x831C:{区:16,点:11},	// 茜
	0x7A50:{区:16,点:12},	// 穐
	0x60AA:{区:16,点:13},	// 悪
	0x63E1:{区:16,点:14},	// 握
	0x6E25:{区:16,点:15},	// 渥
	0x65ED:{区:16,点:16},	// 旭
	0x8466:{区:16,点:17},	// 葦
	0x82A6:{区:16,点:18},	// 芦
	0x9BF5:{区:16,点:19},	// 鯵
	0x6893:{区:16,点:20},	// 梓
	0x5727:{区:16,点:21},	// 圧
	0x65A1:{区:16,点:22},	// 斡
	0x6271:{区:16,点:23},	// 扱
	0x5B9B:{区:16,点:24},	// 宛
	0x59D0:{区:16,点:25},	// 姐
	0x867B:{区:16,点:26},	// 虻
	0x98F4:{区:16,点:27},	// 飴
	0x7D62:{区:16,点:28},	// 絢
	0x7DBE:{区:16,点:29},	// 綾
	0x9B8E:{区:16,点:30},	// 鮎
	0x6216:{区:16,点:31},	// 或
	0x7C9F:{区:16,点:32},	// 粟
	0x88B7:{区:16,点:33},	// 袷
	0x5B89:{区:16,点:34},	// 安
	0x5EB5:{区:16,点:35},	// 庵
	0x6309:{区:16,点:36},	// 按
	0x6697:{区:16,点:37},	// 暗
	0x6848:{区:16,点:38},	// 案
	0x95C7:{区:16,点:39},	// 闇
	0x978D:{区:16,点:40},	// 鞍
	0x674F:{区:16,点:41},	// 杏
	0x4EE5:{区:16,点:42},	// 以
	0x4F0A:{区:16,点:43},	// 伊
	0x4F4D:{区:16,点:44},	// 位
	0x4F9D:{区:16,点:45},	// 依
	0x5049:{区:16,点:46},	// 偉
	0x56F2:{区:16,点:47},	// 囲
	0x5937:{区:16,点:48},	// 夷
	0x59D4:{区:16,点:49},	// 委
	0x5A01:{区:16,点:50},	// 威
	0x5C09:{区:16,点:51},	// 尉
	0x60DF:{区:16,点:52},	// 惟
	0x610F:{区:16,点:53},	// 意
	0x6170:{区:16,点:54},	// 慰
	0x6613:{区:16,点:55},	// 易
	0x6905:{区:16,点:56},	// 椅
	0x70BA:{区:16,点:57},	// 為
	0x754F:{区:16,点:58},	// 畏
	0x7570:{区:16,点:59},	// 異
	0x79FB:{区:16,点:60},	// 移
	0x7DAD:{区:16,点:61},	// 維
	0x7DEF:{区:16,点:62},	// 緯
	0x80C3:{区:16,点:63},	// 胃
	0x840E:{区:16,点:64},	// 萎
	0x8863:{区:16,点:65},	// 衣
	0x8B02:{区:16,点:66},	// 謂
	0x9055:{区:16,点:67},	// 違
	0x907A:{区:16,点:68},	// 遺
	0x533B:{区:16,点:69},	// 医
	0x4E95:{区:16,点:70},	// 井
	0x4EA5:{区:16,点:71},	// 亥
	0x57DF:{区:16,点:72},	// 域
	0x80B2:{区:16,点:73},	// 育
	0x90C1:{区:16,点:74},	// 郁
	0x78EF:{区:16,点:75},	// 磯
	0x4E00:{区:16,点:76},	// 一
	0x58F1:{区:16,点:77},	// 壱
	0x6EA2:{区:16,点:78},	// 溢
	0x9038:{区:16,点:79},	// 逸
	0x7A32:{区:16,点:80},	// 稲
	0x8328:{区:16,点:81},	// 茨
	0x828B:{区:16,点:82},	// 芋
	0x9C2F:{区:16,点:83},	// 鰯
	0x5141:{区:16,点:84},	// 允
	0x5370:{区:16,点:85},	// 印
	0x54BD:{区:16,点:86},	// 咽
	0x54E1:{区:16,点:87},	// 員
	0x56E0:{区:16,点:88},	// 因
	0x59FB:{区:16,点:89},	// 姻
	0x5F15:{区:16,点:90},	// 引
	0x98F2:{区:16,点:91},	// 飲
	0x6DEB:{区:16,点:92},	// 淫
	0x80E4:{区:16,点:93},	// 胤
	0x852D:{区:16,点:94},	// 蔭
	0x9662:{区:17,点: 1},	// 院
	0x9670:{区:17,点: 2},	// 陰
	0x96A0:{区:17,点: 3},	// 隠
	0x97FB:{区:17,点: 4},	// 韻
	0x540B:{区:17,点: 5},	// 吋
	0x53F3:{区:17,点: 6},	// 右
	0x5B87:{区:17,点: 7},	// 宇
	0x70CF:{区:17,点: 8},	// 烏
	0x7FBD:{区:17,点: 9},	// 羽
	0x8FC2:{区:17,点:10},	// 迂
	0x96E8:{区:17,点:11},	// 雨
	0x536F:{区:17,点:12},	// 卯
	0x9D5C:{区:17,点:13},	// 鵜
	0x7ABA:{区:17,点:14},	// 窺
	0x4E11:{区:17,点:15},	// 丑
	0x7893:{区:17,点:16},	// 碓
	0x81FC:{区:17,点:17},	// 臼
	0x6E26:{区:17,点:18},	// 渦
	0x5618:{区:17,点:19},	// 嘘
	0x5504:{区:17,点:20},	// 唄
	0x6B1D:{区:17,点:21},	// 欝
	0x851A:{区:17,点:22},	// 蔚
	0x9C3B:{区:17,点:23},	// 鰻
	0x59E5:{区:17,点:24},	// 姥
	0x53A9:{区:17,点:25},	// 厩
	0x6D66:{区:17,点:26},	// 浦
	0x74DC:{区:17,点:27},	// 瓜
	0x958F:{区:17,点:28},	// 閏
	0x5642:{区:17,点:29},	// 噂
	0x4E91:{区:17,点:30},	// 云
	0x904B:{区:17,点:31},	// 運
	0x96F2:{区:17,点:32},	// 雲
	0x834F:{区:17,点:33},	// 荏
	0x990C:{区:17,点:34},	// 餌
	0x53E1:{区:17,点:35},	// 叡
	0x55B6:{区:17,点:36},	// 営
	0x5B30:{区:17,点:37},	// 嬰
	0x5F71:{区:17,点:38},	// 影
	0x6620:{区:17,点:39},	// 映
	0x66F3:{区:17,点:40},	// 曳
	0x6804:{区:17,点:41},	// 栄
	0x6C38:{区:17,点:42},	// 永
	0x6CF3:{区:17,点:43},	// 泳
	0x6D29:{区:17,点:44},	// 洩
	0x745B:{区:17,点:45},	// 瑛
	0x76C8:{区:17,点:46},	// 盈
	0x7A4E:{区:17,点:47},	// 穎
	0x9834:{区:17,点:48},	// 頴
	0x82F1:{区:17,点:49},	// 英
	0x885B:{区:17,点:50},	// 衛
	0x8A60:{区:17,点:51},	// 詠
	0x92ED:{区:17,点:52},	// 鋭
	0x6DB2:{区:17,点:53},	// 液
	0x75AB:{区:17,点:54},	// 疫
	0x76CA:{区:17,点:55},	// 益
	0x99C5:{区:17,点:56},	// 駅
	0x60A6:{区:17,点:57},	// 悦
	0x8B01:{区:17,点:58},	// 謁
	0x8D8A:{区:17,点:59},	// 越
	0x95B2:{区:17,点:60},	// 閲
	0x698E:{区:17,点:61},	// 榎
	0x53AD:{区:17,点:62},	// 厭
	0x5186:{区:17,点:63},	// 円
	0x5712:{区:17,点:64},	// 園
	0x5830:{区:17,点:65},	// 堰
	0x5944:{区:17,点:66},	// 奄
	0x5BB4:{区:17,点:67},	// 宴
	0x5EF6:{区:17,点:68},	// 延
	0x6028:{区:17,点:69},	// 怨
	0x63A9:{区:17,点:70},	// 掩
	0x63F4:{区:17,点:71},	// 援
	0x6CBF:{区:17,点:72},	// 沿
	0x6F14:{区:17,点:73},	// 演
	0x708E:{区:17,点:74},	// 炎
	0x7114:{区:17,点:75},	// 焔
	0x7159:{区:17,点:76},	// 煙
	0x71D5:{区:17,点:77},	// 燕
	0x733F:{区:17,点:78},	// 猿
	0x7E01:{区:17,点:79},	// 縁
	0x8276:{区:17,点:80},	// 艶
	0x82D1:{区:17,点:81},	// 苑
	0x8597:{区:17,点:82},	// 薗
	0x9060:{区:17,点:83},	// 遠
	0x925B:{区:17,点:84},	// 鉛
	0x9D1B:{区:17,点:85},	// 鴛
	0x5869:{区:17,点:86},	// 塩
	0x65BC:{区:17,点:87},	// 於
	0x6C5A:{区:17,点:88},	// 汚
	0x7525:{区:17,点:89},	// 甥
	0x51F9:{区:17,点:90},	// 凹
	0x592E:{区:17,点:91},	// 央
	0x5965:{区:17,点:92},	// 奥
	0x5F80:{区:17,点:93},	// 往
	0x5FDC:{区:17,点:94},	// 応
	0x62BC:{区:18,点: 1},	// 押
	0x65FA:{区:18,点: 2},	// 旺
	0x6A2A:{区:18,点: 3},	// 横
	0x6B27:{区:18,点: 4},	// 欧
	0x6BB4:{区:18,点: 5},	// 殴
	0x738B:{区:18,点: 6},	// 王
	0x7FC1:{区:18,点: 7},	// 翁
	0x8956:{区:18,点: 8},	// 襖
	0x9D2C:{区:18,点: 9},	// 鴬
	0x9D0E:{区:18,点:10},	// 鴎
	0x9EC4:{区:18,点:11},	// 黄
	0x5CA1:{区:18,点:12},	// 岡
	0x6C96:{区:18,点:13},	// 沖
	0x837B:{区:18,点:14},	// 荻
	0x5104:{区:18,点:15},	// 億
	0x5C4B:{区:18,点:16},	// 屋
	0x61B6:{区:18,点:17},	// 憶
	0x81C6:{区:18,点:18},	// 臆
	0x6876:{区:18,点:19},	// 桶
	0x7261:{区:18,点:20},	// 牡
	0x4E59:{区:18,点:21},	// 乙
	0x4FFA:{区:18,点:22},	// 俺
	0x5378:{区:18,点:23},	// 卸
	0x6069:{区:18,点:24},	// 恩
	0x6E29:{区:18,点:25},	// 温
	0x7A4F:{区:18,点:26},	// 穏
	0x97F3:{区:18,点:27},	// 音
	0x4E0B:{区:18,点:28},	// 下
	0x5316:{区:18,点:29},	// 化
	0x4EEE:{区:18,点:30},	// 仮
	0x4F55:{区:18,点:31},	// 何
	0x4F3D:{区:18,点:32},	// 伽
	0x4FA1:{区:18,点:33},	// 価
	0x4F73:{区:18,点:34},	// 佳
	0x52A0:{区:18,点:35},	// 加
	0x53EF:{区:18,点:36},	// 可
	0x5609:{区:18,点:37},	// 嘉
	0x590F:{区:18,点:38},	// 夏
	0x5AC1:{区:18,点:39},	// 嫁
	0x5BB6:{区:18,点:40},	// 家
	0x5BE1:{区:18,点:41},	// 寡
	0x79D1:{区:18,点:42},	// 科
	0x6687:{区:18,点:43},	// 暇
	0x679C:{区:18,点:44},	// 果
	0x67B6:{区:18,点:45},	// 架
	0x6B4C:{区:18,点:46},	// 歌
	0x6CB3:{区:18,点:47},	// 河
	0x706B:{区:18,点:48},	// 火
	0x73C2:{区:18,点:49},	// 珂
	0x798D:{区:18,点:50},	// 禍
	0x79BE:{区:18,点:51},	// 禾
	0x7A3C:{区:18,点:52},	// 稼
	0x7B87:{区:18,点:53},	// 箇
	0x82B1:{区:18,点:54},	// 花
	0x82DB:{区:18,点:55},	// 苛
	0x8304:{区:18,点:56},	// 茄
	0x8377:{区:18,点:57},	// 荷
	0x83EF:{区:18,点:58},	// 華
	0x83D3:{区:18,点:59},	// 菓
	0x8766:{区:18,点:60},	// 蝦
	0x8AB2:{区:18,点:61},	// 課
	0x5629:{区:18,点:62},	// 嘩
	0x8CA8:{区:18,点:63},	// 貨
	0x8FE6:{区:18,点:64},	// 迦
	0x904E:{区:18,点:65},	// 過
	0x971E:{区:18,点:66},	// 霞
	0x868A:{区:18,点:67},	// 蚊
	0x4FC4:{区:18,点:68},	// 俄
	0x5CE8:{区:18,点:69},	// 峨
	0x6211:{区:18,点:70},	// 我
	0x7259:{区:18,点:71},	// 牙
	0x753B:{区:18,点:72},	// 画
	0x81E5:{区:18,点:73},	// 臥
	0x82BD:{区:18,点:74},	// 芽
	0x86FE:{区:18,点:75},	// 蛾
	0x8CC0:{区:18,点:76},	// 賀
	0x96C5:{区:18,点:77},	// 雅
	0x9913:{区:18,点:78},	// 餓
	0x99D5:{区:18,点:79},	// 駕
	0x4ECB:{区:18,点:80},	// 介
	0x4F1A:{区:18,点:81},	// 会
	0x89E3:{区:18,点:82},	// 解
	0x56DE:{区:18,点:83},	// 回
	0x584A:{区:18,点:84},	// 塊
	0x58CA:{区:18,点:85},	// 壊
	0x5EFB:{区:18,点:86},	// 廻
	0x5FEB:{区:18,点:87},	// 快
	0x602A:{区:18,点:88},	// 怪
	0x6094:{区:18,点:89},	// 悔
	0x6062:{区:18,点:90},	// 恢
	0x61D0:{区:18,点:91},	// 懐
	0x6212:{区:18,点:92},	// 戒
	0x62D0:{区:18,点:93},	// 拐
	0x6539:{区:18,点:94},	// 改
	0x9B41:{区:19,点: 1},	// 魁
	0x6666:{区:19,点: 2},	// 晦
	0x68B0:{区:19,点: 3},	// 械
	0x6D77:{区:19,点: 4},	// 海
	0x7070:{区:19,点: 5},	// 灰
	0x754C:{区:19,点: 6},	// 界
	0x7686:{区:19,点: 7},	// 皆
	0x7D75:{区:19,点: 8},	// 絵
	0x82A5:{区:19,点: 9},	// 芥
	0x87F9:{区:19,点:10},	// 蟹
	0x958B:{区:19,点:11},	// 開
	0x968E:{区:19,点:12},	// 階
	0x8C9D:{区:19,点:13},	// 貝
	0x51F1:{区:19,点:14},	// 凱
	0x52BE:{区:19,点:15},	// 劾
	0x5916:{区:19,点:16},	// 外
	0x54B3:{区:19,点:17},	// 咳
	0x5BB3:{区:19,点:18},	// 害
	0x5D16:{区:19,点:19},	// 崖
	0x6168:{区:19,点:20},	// 慨
	0x6982:{区:19,点:21},	// 概
	0x6DAF:{区:19,点:22},	// 涯
	0x788D:{区:19,点:23},	// 碍
	0x84CB:{区:19,点:24},	// 蓋
	0x8857:{区:19,点:25},	// 街
	0x8A72:{区:19,点:26},	// 該
	0x93A7:{区:19,点:27},	// 鎧
	0x9AB8:{区:19,点:28},	// 骸
	0x6D6C:{区:19,点:29},	// 浬
	0x99A8:{区:19,点:30},	// 馨
	0x86D9:{区:19,点:31},	// 蛙
	0x57A3:{区:19,点:32},	// 垣
	0x67FF:{区:19,点:33},	// 柿
	0x86CE:{区:19,点:34},	// 蛎
	0x920E:{区:19,点:35},	// 鈎
	0x5283:{区:19,点:36},	// 劃
	0x5687:{区:19,点:37},	// 嚇
	0x5404:{区:19,点:38},	// 各
	0x5ED3:{区:19,点:39},	// 廓
	0x62E1:{区:19,点:40},	// 拡
	0x64B9:{区:19,点:41},	// 撹
	0x683C:{区:19,点:42},	// 格
	0x6838:{区:19,点:43},	// 核
	0x6BBB:{区:19,点:44},	// 殻
	0x7372:{区:19,点:45},	// 獲
	0x78BA:{区:19,点:46},	// 確
	0x7A6B:{区:19,点:47},	// 穫
	0x899A:{区:19,点:48},	// 覚
	0x89D2:{区:19,点:49},	// 角
	0x8D6B:{区:19,点:50},	// 赫
	0x8F03:{区:19,点:51},	// 較
	0x90ED:{区:19,点:52},	// 郭
	0x95A3:{区:19,点:53},	// 閣
	0x9694:{区:19,点:54},	// 隔
	0x9769:{区:19,点:55},	// 革
	0x5B66:{区:19,点:56},	// 学
	0x5CB3:{区:19,点:57},	// 岳
	0x697D:{区:19,点:58},	// 楽
	0x984D:{区:19,点:59},	// 額
	0x984E:{区:19,点:60},	// 顎
	0x639B:{区:19,点:61},	// 掛
	0x7B20:{区:19,点:62},	// 笠
	0x6A2B:{区:19,点:63},	// 樫
	0x6A7F:{区:19,点:64},	// 橿
	0x68B6:{区:19,点:65},	// 梶
	0x9C0D:{区:19,点:66},	// 鰍
	0x6F5F:{区:19,点:67},	// 潟
	0x5272:{区:19,点:68},	// 割
	0x559D:{区:19,点:69},	// 喝
	0x6070:{区:19,点:70},	// 恰
	0x62EC:{区:19,点:71},	// 括
	0x6D3B:{区:19,点:72},	// 活
	0x6E07:{区:19,点:73},	// 渇
	0x6ED1:{区:19,点:74},	// 滑
	0x845B:{区:19,点:75},	// 葛
	0x8910:{区:19,点:76},	// 褐
	0x8F44:{区:19,点:77},	// 轄
	0x4E14:{区:19,点:78},	// 且
	0x9C39:{区:19,点:79},	// 鰹
	0x53F6:{区:19,点:80},	// 叶
	0x691B:{区:19,点:81},	// 椛
	0x6A3A:{区:19,点:82},	// 樺
	0x9784:{区:19,点:83},	// 鞄
	0x682A:{区:19,点:84},	// 株
	0x515C:{区:19,点:85},	// 兜
	0x7AC3:{区:19,点:86},	// 竃
	0x84B2:{区:19,点:87},	// 蒲
	0x91DC:{区:19,点:88},	// 釜
	0x938C:{区:19,点:89},	// 鎌
	0x565B:{区:19,点:90},	// 噛
	0x9D28:{区:19,点:91},	// 鴨
	0x6822:{区:19,点:92},	// 栢
	0x8305:{区:19,点:93},	// 茅
	0x8431:{区:19,点:94},	// 萱
	0x7CA5:{区:20,点: 1},	// 粥
	0x5208:{区:20,点: 2},	// 刈
	0x82C5:{区:20,点: 3},	// 苅
	0x74E6:{区:20,点: 4},	// 瓦
	0x4E7E:{区:20,点: 5},	// 乾
	0x4F83:{区:20,点: 6},	// 侃
	0x51A0:{区:20,点: 7},	// 冠
	0x5BD2:{区:20,点: 8},	// 寒
	0x520A:{区:20,点: 9},	// 刊
	0x52D8:{区:20,点:10},	// 勘
	0x52E7:{区:20,点:11},	// 勧
	0x5DFB:{区:20,点:12},	// 巻
	0x559A:{区:20,点:13},	// 喚
	0x582A:{区:20,点:14},	// 堪
	0x59E6:{区:20,点:15},	// 姦
	0x5B8C:{区:20,点:16},	// 完
	0x5B98:{区:20,点:17},	// 官
	0x5BDB:{区:20,点:18},	// 寛
	0x5E72:{区:20,点:19},	// 干
	0x5E79:{区:20,点:20},	// 幹
	0x60A3:{区:20,点:21},	// 患
	0x611F:{区:20,点:22},	// 感
	0x6163:{区:20,点:23},	// 慣
	0x61BE:{区:20,点:24},	// 憾
	0x63DB:{区:20,点:25},	// 換
	0x6562:{区:20,点:26},	// 敢
	0x67D1:{区:20,点:27},	// 柑
	0x6853:{区:20,点:28},	// 桓
	0x68FA:{区:20,点:29},	// 棺
	0x6B3E:{区:20,点:30},	// 款
	0x6B53:{区:20,点:31},	// 歓
	0x6C57:{区:20,点:32},	// 汗
	0x6F22:{区:20,点:33},	// 漢
	0x6F97:{区:20,点:34},	// 澗
	0x6F45:{区:20,点:35},	// 潅
	0x74B0:{区:20,点:36},	// 環
	0x7518:{区:20,点:37},	// 甘
	0x76E3:{区:20,点:38},	// 監
	0x770B:{区:20,点:39},	// 看
	0x7AFF:{区:20,点:40},	// 竿
	0x7BA1:{区:20,点:41},	// 管
	0x7C21:{区:20,点:42},	// 簡
	0x7DE9:{区:20,点:43},	// 緩
	0x7F36:{区:20,点:44},	// 缶
	0x7FF0:{区:20,点:45},	// 翰
	0x809D:{区:20,点:46},	// 肝
	0x8266:{区:20,点:47},	// 艦
	0x839E:{区:20,点:48},	// 莞
	0x89B3:{区:20,点:49},	// 観
	0x8ACC:{区:20,点:50},	// 諌
	0x8CAB:{区:20,点:51},	// 貫
	0x9084:{区:20,点:52},	// 還
	0x9451:{区:20,点:53},	// 鑑
	0x9593:{区:20,点:54},	// 間
	0x9591:{区:20,点:55},	// 閑
	0x95A2:{区:20,点:56},	// 関
	0x9665:{区:20,点:57},	// 陥
	0x97D3:{区:20,点:58},	// 韓
	0x9928:{区:20,点:59},	// 館
	0x8218:{区:20,点:60},	// 舘
	0x4E38:{区:20,点:61},	// 丸
	0x542B:{区:20,点:62},	// 含
	0x5CB8:{区:20,点:63},	// 岸
	0x5DCC:{区:20,点:64},	// 巌
	0x73A9:{区:20,点:65},	// 玩
	0x764C:{区:20,点:66},	// 癌
	0x773C:{区:20,点:67},	// 眼
	0x5CA9:{区:20,点:68},	// 岩
	0x7FEB:{区:20,点:69},	// 翫
	0x8D0B:{区:20,点:70},	// 贋
	0x96C1:{区:20,点:71},	// 雁
	0x9811:{区:20,点:72},	// 頑
	0x9854:{区:20,点:73},	// 顔
	0x9858:{区:20,点:74},	// 願
	0x4F01:{区:20,点:75},	// 企
	0x4F0E:{区:20,点:76},	// 伎
	0x5371:{区:20,点:77},	// 危
	0x559C:{区:20,点:78},	// 喜
	0x5668:{区:20,点:79},	// 器
	0x57FA:{区:20,点:80},	// 基
	0x5947:{区:20,点:81},	// 奇
	0x5B09:{区:20,点:82},	// 嬉
	0x5BC4:{区:20,点:83},	// 寄
	0x5C90:{区:20,点:84},	// 岐
	0x5E0C:{区:20,点:85},	// 希
	0x5E7E:{区:20,点:86},	// 幾
	0x5FCC:{区:20,点:87},	// 忌
	0x63EE:{区:20,点:88},	// 揮
	0x673A:{区:20,点:89},	// 机
	0x65D7:{区:20,点:90},	// 旗
	0x65E2:{区:20,点:91},	// 既
	0x671F:{区:20,点:92},	// 期
	0x68CB:{区:20,点:93},	// 棋
	0x68C4:{区:20,点:94},	// 棄
	0x6A5F:{区:21,点: 1},	// 機
	0x5E30:{区:21,点: 2},	// 帰
	0x6BC5:{区:21,点: 3},	// 毅
	0x6C17:{区:21,点: 4},	// 気
	0x6C7D:{区:21,点: 5},	// 汽
	0x757F:{区:21,点: 6},	// 畿
	0x7948:{区:21,点: 7},	// 祈
	0x5B63:{区:21,点: 8},	// 季
	0x7A00:{区:21,点: 9},	// 稀
	0x7D00:{区:21,点:10},	// 紀
	0x5FBD:{区:21,点:11},	// 徽
	0x898F:{区:21,点:12},	// 規
	0x8A18:{区:21,点:13},	// 記
	0x8CB4:{区:21,点:14},	// 貴
	0x8D77:{区:21,点:15},	// 起
	0x8ECC:{区:21,点:16},	// 軌
	0x8F1D:{区:21,点:17},	// 輝
	0x98E2:{区:21,点:18},	// 飢
	0x9A0E:{区:21,点:19},	// 騎
	0x9B3C:{区:21,点:20},	// 鬼
	0x4E80:{区:21,点:21},	// 亀
	0x507D:{区:21,点:22},	// 偽
	0x5100:{区:21,点:23},	// 儀
	0x5993:{区:21,点:24},	// 妓
	0x5B9C:{区:21,点:25},	// 宜
	0x622F:{区:21,点:26},	// 戯
	0x6280:{区:21,点:27},	// 技
	0x64EC:{区:21,点:28},	// 擬
	0x6B3A:{区:21,点:29},	// 欺
	0x72A0:{区:21,点:30},	// 犠
	0x7591:{区:21,点:31},	// 疑
	0x7947:{区:21,点:32},	// 祇
	0x7FA9:{区:21,点:33},	// 義
	0x87FB:{区:21,点:34},	// 蟻
	0x8ABC:{区:21,点:35},	// 誼
	0x8B70:{区:21,点:36},	// 議
	0x63AC:{区:21,点:37},	// 掬
	0x83CA:{区:21,点:38},	// 菊
	0x97A0:{区:21,点:39},	// 鞠
	0x5409:{区:21,点:40},	// 吉
	0x5403:{区:21,点:41},	// 吃
	0x55AB:{区:21,点:42},	// 喫
	0x6854:{区:21,点:43},	// 桔
	0x6A58:{区:21,点:44},	// 橘
	0x8A70:{区:21,点:45},	// 詰
	0x7827:{区:21,点:46},	// 砧
	0x6775:{区:21,点:47},	// 杵
	0x9ECD:{区:21,点:48},	// 黍
	0x5374:{区:21,点:49},	// 却
	0x5BA2:{区:21,点:50},	// 客
	0x811A:{区:21,点:51},	// 脚
	0x8650:{区:21,点:52},	// 虐
	0x9006:{区:21,点:53},	// 逆
	0x4E18:{区:21,点:54},	// 丘
	0x4E45:{区:21,点:55},	// 久
	0x4EC7:{区:21,点:56},	// 仇
	0x4F11:{区:21,点:57},	// 休
	0x53CA:{区:21,点:58},	// 及
	0x5438:{区:21,点:59},	// 吸
	0x5BAE:{区:21,点:60},	// 宮
	0x5F13:{区:21,点:61},	// 弓
	0x6025:{区:21,点:62},	// 急
	0x6551:{区:21,点:63},	// 救
	0x673D:{区:21,点:64},	// 朽
	0x6C42:{区:21,点:65},	// 求
	0x6C72:{区:21,点:66},	// 汲
	0x6CE3:{区:21,点:67},	// 泣
	0x7078:{区:21,点:68},	// 灸
	0x7403:{区:21,点:69},	// 球
	0x7A76:{区:21,点:70},	// 究
	0x7AAE:{区:21,点:71},	// 窮
	0x7B08:{区:21,点:72},	// 笈
	0x7D1A:{区:21,点:73},	// 級
	0x7CFE:{区:21,点:74},	// 糾
	0x7D66:{区:21,点:75},	// 給
	0x65E7:{区:21,点:76},	// 旧
	0x725B:{区:21,点:77},	// 牛
	0x53BB:{区:21,点:78},	// 去
	0x5C45:{区:21,点:79},	// 居
	0x5DE8:{区:21,点:80},	// 巨
	0x62D2:{区:21,点:81},	// 拒
	0x62E0:{区:21,点:82},	// 拠
	0x6319:{区:21,点:83},	// 挙
	0x6E20:{区:21,点:84},	// 渠
	0x865A:{区:21,点:85},	// 虚
	0x8A31:{区:21,点:86},	// 許
	0x8DDD:{区:21,点:87},	// 距
	0x92F8:{区:21,点:88},	// 鋸
	0x6F01:{区:21,点:89},	// 漁
	0x79A6:{区:21,点:90},	// 禦
	0x9B5A:{区:21,点:91},	// 魚
	0x4EA8:{区:21,点:92},	// 亨
	0x4EAB:{区:21,点:93},	// 享
	0x4EAC:{区:21,点:94},	// 京
	0x4F9B:{区:22,点: 1},	// 供
	0x4FA0:{区:22,点: 2},	// 侠
	0x50D1:{区:22,点: 3},	// 僑
	0x5147:{区:22,点: 4},	// 兇
	0x7AF6:{区:22,点: 5},	// 競
	0x5171:{区:22,点: 6},	// 共
	0x51F6:{区:22,点: 7},	// 凶
	0x5354:{区:22,点: 8},	// 協
	0x5321:{区:22,点: 9},	// 匡
	0x537F:{区:22,点:10},	// 卿
	0x53EB:{区:22,点:11},	// 叫
	0x55AC:{区:22,点:12},	// 喬
	0x5883:{区:22,点:13},	// 境
	0x5CE1:{区:22,点:14},	// 峡
	0x5F37:{区:22,点:15},	// 強
	0x5F4A:{区:22,点:16},	// 彊
	0x602F:{区:22,点:17},	// 怯
	0x6050:{区:22,点:18},	// 恐
	0x606D:{区:22,点:19},	// 恭
	0x631F:{区:22,点:20},	// 挟
	0x6559:{区:22,点:21},	// 教
	0x6A4B:{区:22,点:22},	// 橋
	0x6CC1:{区:22,点:23},	// 況
	0x72C2:{区:22,点:24},	// 狂
	0x72ED:{区:22,点:25},	// 狭
	0x77EF:{区:22,点:26},	// 矯
	0x80F8:{区:22,点:27},	// 胸
	0x8105:{区:22,点:28},	// 脅
	0x8208:{区:22,点:29},	// 興
	0x854E:{区:22,点:30},	// 蕎
	0x90F7:{区:22,点:31},	// 郷
	0x93E1:{区:22,点:32},	// 鏡
	0x97FF:{区:22,点:33},	// 響
	0x9957:{区:22,点:34},	// 饗
	0x9A5A:{区:22,点:35},	// 驚
	0x4EF0:{区:22,点:36},	// 仰
	0x51DD:{区:22,点:37},	// 凝
	0x5C2D:{区:22,点:38},	// 尭
	0x6681:{区:22,点:39},	// 暁
	0x696D:{区:22,点:40},	// 業
	0x5C40:{区:22,点:41},	// 局
	0x66F2:{区:22,点:42},	// 曲
	0x6975:{区:22,点:43},	// 極
	0x7389:{区:22,点:44},	// 玉
	0x6850:{区:22,点:45},	// 桐
	0x7C81:{区:22,点:46},	// 粁
	0x50C5:{区:22,点:47},	// 僅
	0x52E4:{区:22,点:48},	// 勤
	0x5747:{区:22,点:49},	// 均
	0x5DFE:{区:22,点:50},	// 巾
	0x9326:{区:22,点:51},	// 錦
	0x65A4:{区:22,点:52},	// 斤
	0x6B23:{区:22,点:53},	// 欣
	0x6B3D:{区:22,点:54},	// 欽
	0x7434:{区:22,点:55},	// 琴
	0x7981:{区:22,点:56},	// 禁
	0x79BD:{区:22,点:57},	// 禽
	0x7B4B:{区:22,点:58},	// 筋
	0x7DCA:{区:22,点:59},	// 緊
	0x82B9:{区:22,点:60},	// 芹
	0x83CC:{区:22,点:61},	// 菌
	0x887F:{区:22,点:62},	// 衿
	0x895F:{区:22,点:63},	// 襟
	0x8B39:{区:22,点:64},	// 謹
	0x8FD1:{区:22,点:65},	// 近
	0x91D1:{区:22,点:66},	// 金
	0x541F:{区:22,点:67},	// 吟
	0x9280:{区:22,点:68},	// 銀
	0x4E5D:{区:22,点:69},	// 九
	0x5036:{区:22,点:70},	// 倶
	0x53E5:{区:22,点:71},	// 句
	0x533A:{区:22,点:72},	// 区
	0x72D7:{区:22,点:73},	// 狗
	0x7396:{区:22,点:74},	// 玖
	0x77E9:{区:22,点:75},	// 矩
	0x82E6:{区:22,点:76},	// 苦
	0x8EAF:{区:22,点:77},	// 躯
	0x99C6:{区:22,点:78},	// 駆
	0x99C8:{区:22,点:79},	// 駈
	0x99D2:{区:22,点:80},	// 駒
	0x5177:{区:22,点:81},	// 具
	0x611A:{区:22,点:82},	// 愚
	0x865E:{区:22,点:83},	// 虞
	0x55B0:{区:22,点:84},	// 喰
	0x7A7A:{区:22,点:85},	// 空
	0x5076:{区:22,点:86},	// 偶
	0x5BD3:{区:22,点:87},	// 寓
	0x9047:{区:22,点:88},	// 遇
	0x9685:{区:22,点:89},	// 隅
	0x4E32:{区:22,点:90},	// 串
	0x6ADB:{区:22,点:91},	// 櫛
	0x91E7:{区:22,点:92},	// 釧
	0x5C51:{区:22,点:93},	// 屑
	0x5C48:{区:22,点:94},	// 屈
	0x6398:{区:23,点: 1},	// 掘
	0x7A9F:{区:23,点: 2},	// 窟
	0x6C93:{区:23,点: 3},	// 沓
	0x9774:{区:23,点: 4},	// 靴
	0x8F61:{区:23,点: 5},	// 轡
	0x7AAA:{区:23,点: 6},	// 窪
	0x718A:{区:23,点: 7},	// 熊
	0x9688:{区:23,点: 8},	// 隈
	0x7C82:{区:23,点: 9},	// 粂
	0x6817:{区:23,点:10},	// 栗
	0x7E70:{区:23,点:11},	// 繰
	0x6851:{区:23,点:12},	// 桑
	0x936C:{区:23,点:13},	// 鍬
	0x52F2:{区:23,点:14},	// 勲
	0x541B:{区:23,点:15},	// 君
	0x85AB:{区:23,点:16},	// 薫
	0x8A13:{区:23,点:17},	// 訓
	0x7FA4:{区:23,点:18},	// 群
	0x8ECD:{区:23,点:19},	// 軍
	0x90E1:{区:23,点:20},	// 郡
	0x5366:{区:23,点:21},	// 卦
	0x8888:{区:23,点:22},	// 袈
	0x7941:{区:23,点:23},	// 祁
	0x4FC2:{区:23,点:24},	// 係
	0x50BE:{区:23,点:25},	// 傾
	0x5211:{区:23,点:26},	// 刑
	0x5144:{区:23,点:27},	// 兄
	0x5553:{区:23,点:28},	// 啓
	0x572D:{区:23,点:29},	// 圭
	0x73EA:{区:23,点:30},	// 珪
	0x578B:{区:23,点:31},	// 型
	0x5951:{区:23,点:32},	// 契
	0x5F62:{区:23,点:33},	// 形
	0x5F84:{区:23,点:34},	// 径
	0x6075:{区:23,点:35},	// 恵
	0x6176:{区:23,点:36},	// 慶
	0x6167:{区:23,点:37},	// 慧
	0x61A9:{区:23,点:38},	// 憩
	0x63B2:{区:23,点:39},	// 掲
	0x643A:{区:23,点:40},	// 携
	0x656C:{区:23,点:41},	// 敬
	0x666F:{区:23,点:42},	// 景
	0x6842:{区:23,点:43},	// 桂
	0x6E13:{区:23,点:44},	// 渓
	0x7566:{区:23,点:45},	// 畦
	0x7A3D:{区:23,点:46},	// 稽
	0x7CFB:{区:23,点:47},	// 系
	0x7D4C:{区:23,点:48},	// 経
	0x7D99:{区:23,点:49},	// 継
	0x7E4B:{区:23,点:50},	// 繋
	0x7F6B:{区:23,点:51},	// 罫
	0x830E:{区:23,点:52},	// 茎
	0x834A:{区:23,点:53},	// 荊
	0x86CD:{区:23,点:54},	// 蛍
	0x8A08:{区:23,点:55},	// 計
	0x8A63:{区:23,点:56},	// 詣
	0x8B66:{区:23,点:57},	// 警
	0x8EFD:{区:23,点:58},	// 軽
	0x981A:{区:23,点:59},	// 頚
	0x9D8F:{区:23,点:60},	// 鶏
	0x82B8:{区:23,点:61},	// 芸
	0x8FCE:{区:23,点:62},	// 迎
	0x9BE8:{区:23,点:63},	// 鯨
	0x5287:{区:23,点:64},	// 劇
	0x621F:{区:23,点:65},	// 戟
	0x6483:{区:23,点:66},	// 撃
	0x6FC0:{区:23,点:67},	// 激
	0x9699:{区:23,点:68},	// 隙
	0x6841:{区:23,点:69},	// 桁
	0x5091:{区:23,点:70},	// 傑
	0x6B20:{区:23,点:71},	// 欠
	0x6C7A:{区:23,点:72},	// 決
	0x6F54:{区:23,点:73},	// 潔
	0x7A74:{区:23,点:74},	// 穴
	0x7D50:{区:23,点:75},	// 結
	0x8840:{区:23,点:76},	// 血
	0x8A23:{区:23,点:77},	// 訣
	0x6708:{区:23,点:78},	// 月
	0x4EF6:{区:23,点:79},	// 件
	0x5039:{区:23,点:80},	// 倹
	0x5026:{区:23,点:81},	// 倦
	0x5065:{区:23,点:82},	// 健
	0x517C:{区:23,点:83},	// 兼
	0x5238:{区:23,点:84},	// 券
	0x5263:{区:23,点:85},	// 剣
	0x55A7:{区:23,点:86},	// 喧
	0x570F:{区:23,点:87},	// 圏
	0x5805:{区:23,点:88},	// 堅
	0x5ACC:{区:23,点:89},	// 嫌
	0x5EFA:{区:23,点:90},	// 建
	0x61B2:{区:23,点:91},	// 憲
	0x61F8:{区:23,点:92},	// 懸
	0x62F3:{区:23,点:93},	// 拳
	0x6372:{区:23,点:94},	// 捲
	0x691C:{区:24,点: 1},	// 検
	0x6A29:{区:24,点: 2},	// 権
	0x727D:{区:24,点: 3},	// 牽
	0x72AC:{区:24,点: 4},	// 犬
	0x732E:{区:24,点: 5},	// 献
	0x7814:{区:24,点: 6},	// 研
	0x786F:{区:24,点: 7},	// 硯
	0x7D79:{区:24,点: 8},	// 絹
	0x770C:{区:24,点: 9},	// 県
	0x80A9:{区:24,点:10},	// 肩
	0x898B:{区:24,点:11},	// 見
	0x8B19:{区:24,点:12},	// 謙
	0x8CE2:{区:24,点:13},	// 賢
	0x8ED2:{区:24,点:14},	// 軒
	0x9063:{区:24,点:15},	// 遣
	0x9375:{区:24,点:16},	// 鍵
	0x967A:{区:24,点:17},	// 険
	0x9855:{区:24,点:18},	// 顕
	0x9A13:{区:24,点:19},	// 験
	0x9E78:{区:24,点:20},	// 鹸
	0x5143:{区:24,点:21},	// 元
	0x539F:{区:24,点:22},	// 原
	0x53B3:{区:24,点:23},	// 厳
	0x5E7B:{区:24,点:24},	// 幻
	0x5F26:{区:24,点:25},	// 弦
	0x6E1B:{区:24,点:26},	// 減
	0x6E90:{区:24,点:27},	// 源
	0x7384:{区:24,点:28},	// 玄
	0x73FE:{区:24,点:29},	// 現
	0x7D43:{区:24,点:30},	// 絃
	0x8237:{区:24,点:31},	// 舷
	0x8A00:{区:24,点:32},	// 言
	0x8AFA:{区:24,点:33},	// 諺
	0x9650:{区:24,点:34},	// 限
	0x4E4E:{区:24,点:35},	// 乎
	0x500B:{区:24,点:36},	// 個
	0x53E4:{区:24,点:37},	// 古
	0x547C:{区:24,点:38},	// 呼
	0x56FA:{区:24,点:39},	// 固
	0x59D1:{区:24,点:40},	// 姑
	0x5B64:{区:24,点:41},	// 孤
	0x5DF1:{区:24,点:42},	// 己
	0x5EAB:{区:24,点:43},	// 庫
	0x5F27:{区:24,点:44},	// 弧
	0x6238:{区:24,点:45},	// 戸
	0x6545:{区:24,点:46},	// 故
	0x67AF:{区:24,点:47},	// 枯
	0x6E56:{区:24,点:48},	// 湖
	0x72D0:{区:24,点:49},	// 狐
	0x7CCA:{区:24,点:50},	// 糊
	0x88B4:{区:24,点:51},	// 袴
	0x80A1:{区:24,点:52},	// 股
	0x80E1:{区:24,点:53},	// 胡
	0x83F0:{区:24,点:54},	// 菰
	0x864E:{区:24,点:55},	// 虎
	0x8A87:{区:24,点:56},	// 誇
	0x8DE8:{区:24,点:57},	// 跨
	0x9237:{区:24,点:58},	// 鈷
	0x96C7:{区:24,点:59},	// 雇
	0x9867:{区:24,点:60},	// 顧
	0x9F13:{区:24,点:61},	// 鼓
	0x4E94:{区:24,点:62},	// 五
	0x4E92:{区:24,点:63},	// 互
	0x4F0D:{区:24,点:64},	// 伍
	0x5348:{区:24,点:65},	// 午
	0x5449:{区:24,点:66},	// 呉
	0x543E:{区:24,点:67},	// 吾
	0x5A2F:{区:24,点:68},	// 娯
	0x5F8C:{区:24,点:69},	// 後
	0x5FA1:{区:24,点:70},	// 御
	0x609F:{区:24,点:71},	// 悟
	0x68A7:{区:24,点:72},	// 梧
	0x6A8E:{区:24,点:73},	// 檎
	0x745A:{区:24,点:74},	// 瑚
	0x7881:{区:24,点:75},	// 碁
	0x8A9E:{区:24,点:76},	// 語
	0x8AA4:{区:24,点:77},	// 誤
	0x8B77:{区:24,点:78},	// 護
	0x9190:{区:24,点:79},	// 醐
	0x4E5E:{区:24,点:80},	// 乞
	0x9BC9:{区:24,点:81},	// 鯉
	0x4EA4:{区:24,点:82},	// 交
	0x4F7C:{区:24,点:83},	// 佼
	0x4FAF:{区:24,点:84},	// 侯
	0x5019:{区:24,点:85},	// 候
	0x5016:{区:24,点:86},	// 倖
	0x5149:{区:24,点:87},	// 光
	0x516C:{区:24,点:88},	// 公
	0x529F:{区:24,点:89},	// 功
	0x52B9:{区:24,点:90},	// 効
	0x52FE:{区:24,点:91},	// 勾
	0x539A:{区:24,点:92},	// 厚
	0x53E3:{区:24,点:93},	// 口
	0x5411:{区:24,点:94},	// 向
	0x540E:{区:25,点: 1},	// 后
	0x5589:{区:25,点: 2},	// 喉
	0x5751:{区:25,点: 3},	// 坑
	0x57A2:{区:25,点: 4},	// 垢
	0x597D:{区:25,点: 5},	// 好
	0x5B54:{区:25,点: 6},	// 孔
	0x5B5D:{区:25,点: 7},	// 孝
	0x5B8F:{区:25,点: 8},	// 宏
	0x5DE5:{区:25,点: 9},	// 工
	0x5DE7:{区:25,点:10},	// 巧
	0x5DF7:{区:25,点:11},	// 巷
	0x5E78:{区:25,点:12},	// 幸
	0x5E83:{区:25,点:13},	// 広
	0x5E9A:{区:25,点:14},	// 庚
	0x5EB7:{区:25,点:15},	// 康
	0x5F18:{区:25,点:16},	// 弘
	0x6052:{区:25,点:17},	// 恒
	0x614C:{区:25,点:18},	// 慌
	0x6297:{区:25,点:19},	// 抗
	0x62D8:{区:25,点:20},	// 拘
	0x63A7:{区:25,点:21},	// 控
	0x653B:{区:25,点:22},	// 攻
	0x6602:{区:25,点:23},	// 昂
	0x6643:{区:25,点:24},	// 晃
	0x66F4:{区:25,点:25},	// 更
	0x676D:{区:25,点:26},	// 杭
	0x6821:{区:25,点:27},	// 校
	0x6897:{区:25,点:28},	// 梗
	0x69CB:{区:25,点:29},	// 構
	0x6C5F:{区:25,点:30},	// 江
	0x6D2A:{区:25,点:31},	// 洪
	0x6D69:{区:25,点:32},	// 浩
	0x6E2F:{区:25,点:33},	// 港
	0x6E9D:{区:25,点:34},	// 溝
	0x7532:{区:25,点:35},	// 甲
	0x7687:{区:25,点:36},	// 皇
	0x786C:{区:25,点:37},	// 硬
	0x7A3F:{区:25,点:38},	// 稿
	0x7CE0:{区:25,点:39},	// 糠
	0x7D05:{区:25,点:40},	// 紅
	0x7D18:{区:25,点:41},	// 紘
	0x7D5E:{区:25,点:42},	// 絞
	0x7DB1:{区:25,点:43},	// 綱
	0x8015:{区:25,点:44},	// 耕
	0x8003:{区:25,点:45},	// 考
	0x80AF:{区:25,点:46},	// 肯
	0x80B1:{区:25,点:47},	// 肱
	0x8154:{区:25,点:48},	// 腔
	0x818F:{区:25,点:49},	// 膏
	0x822A:{区:25,点:50},	// 航
	0x8352:{区:25,点:51},	// 荒
	0x884C:{区:25,点:52},	// 行
	0x8861:{区:25,点:53},	// 衡
	0x8B1B:{区:25,点:54},	// 講
	0x8CA2:{区:25,点:55},	// 貢
	0x8CFC:{区:25,点:56},	// 購
	0x90CA:{区:25,点:57},	// 郊
	0x9175:{区:25,点:58},	// 酵
	0x9271:{区:25,点:59},	// 鉱
	0x783F:{区:25,点:60},	// 砿
	0x92FC:{区:25,点:61},	// 鋼
	0x95A4:{区:25,点:62},	// 閤
	0x964D:{区:25,点:63},	// 降
	0x9805:{区:25,点:64},	// 項
	0x9999:{区:25,点:65},	// 香
	0x9AD8:{区:25,点:66},	// 高
	0x9D3B:{区:25,点:67},	// 鴻
	0x525B:{区:25,点:68},	// 剛
	0x52AB:{区:25,点:69},	// 劫
	0x53F7:{区:25,点:70},	// 号
	0x5408:{区:25,点:71},	// 合
	0x58D5:{区:25,点:72},	// 壕
	0x62F7:{区:25,点:73},	// 拷
	0x6FE0:{区:25,点:74},	// 濠
	0x8C6A:{区:25,点:75},	// 豪
	0x8F5F:{区:25,点:76},	// 轟
	0x9EB9:{区:25,点:77},	// 麹
	0x514B:{区:25,点:78},	// 克
	0x523B:{区:25,点:79},	// 刻
	0x544A:{区:25,点:80},	// 告
	0x56FD:{区:25,点:81},	// 国
	0x7A40:{区:25,点:82},	// 穀
	0x9177:{区:25,点:83},	// 酷
	0x9D60:{区:25,点:84},	// 鵠
	0x9ED2:{区:25,点:85},	// 黒
	0x7344:{区:25,点:86},	// 獄
	0x6F09:{区:25,点:87},	// 漉
	0x8170:{区:25,点:88},	// 腰
	0x7511:{区:25,点:89},	// 甑
	0x5FFD:{区:25,点:90},	// 忽
	0x60DA:{区:25,点:91},	// 惚
	0x9AA8:{区:25,点:92},	// 骨
	0x72DB:{区:25,点:93},	// 狛
	0x8FBC:{区:25,点:94},	// 込
	0x6B64:{区:26,点: 1},	// 此
	0x9803:{区:26,点: 2},	// 頃
	0x4ECA:{区:26,点: 3},	// 今
	0x56F0:{区:26,点: 4},	// 困
	0x5764:{区:26,点: 5},	// 坤
	0x58BE:{区:26,点: 6},	// 墾
	0x5A5A:{区:26,点: 7},	// 婚
	0x6068:{区:26,点: 8},	// 恨
	0x61C7:{区:26,点: 9},	// 懇
	0x660F:{区:26,点:10},	// 昏
	0x6606:{区:26,点:11},	// 昆
	0x6839:{区:26,点:12},	// 根
	0x68B1:{区:26,点:13},	// 梱
	0x6DF7:{区:26,点:14},	// 混
	0x75D5:{区:26,点:15},	// 痕
	0x7D3A:{区:26,点:16},	// 紺
	0x826E:{区:26,点:17},	// 艮
	0x9B42:{区:26,点:18},	// 魂
	0x4E9B:{区:26,点:19},	// 些
	0x4F50:{区:26,点:20},	// 佐
	0x53C9:{区:26,点:21},	// 叉
	0x5506:{区:26,点:22},	// 唆
	0x5D6F:{区:26,点:23},	// 嵯
	0x5DE6:{区:26,点:24},	// 左
	0x5DEE:{区:26,点:25},	// 差
	0x67FB:{区:26,点:26},	// 査
	0x6C99:{区:26,点:27},	// 沙
	0x7473:{区:26,点:28},	// 瑳
	0x7802:{区:26,点:29},	// 砂
	0x8A50:{区:26,点:30},	// 詐
	0x9396:{区:26,点:31},	// 鎖
	0x88DF:{区:26,点:32},	// 裟
	0x5750:{区:26,点:33},	// 坐
	0x5EA7:{区:26,点:34},	// 座
	0x632B:{区:26,点:35},	// 挫
	0x50B5:{区:26,点:36},	// 債
	0x50AC:{区:26,点:37},	// 催
	0x518D:{区:26,点:38},	// 再
	0x6700:{区:26,点:39},	// 最
	0x54C9:{区:26,点:40},	// 哉
	0x585E:{区:26,点:41},	// 塞
	0x59BB:{区:26,点:42},	// 妻
	0x5BB0:{区:26,点:43},	// 宰
	0x5F69:{区:26,点:44},	// 彩
	0x624D:{区:26,点:45},	// 才
	0x63A1:{区:26,点:46},	// 採
	0x683D:{区:26,点:47},	// 栽
	0x6B73:{区:26,点:48},	// 歳
	0x6E08:{区:26,点:49},	// 済
	0x707D:{区:26,点:50},	// 災
	0x91C7:{区:26,点:51},	// 采
	0x7280:{区:26,点:52},	// 犀
	0x7815:{区:26,点:53},	// 砕
	0x7826:{区:26,点:54},	// 砦
	0x796D:{区:26,点:55},	// 祭
	0x658E:{区:26,点:56},	// 斎
	0x7D30:{区:26,点:57},	// 細
	0x83DC:{区:26,点:58},	// 菜
	0x88C1:{区:26,点:59},	// 裁
	0x8F09:{区:26,点:60},	// 載
	0x969B:{区:26,点:61},	// 際
	0x5264:{区:26,点:62},	// 剤
	0x5728:{区:26,点:63},	// 在
	0x6750:{区:26,点:64},	// 材
	0x7F6A:{区:26,点:65},	// 罪
	0x8CA1:{区:26,点:66},	// 財
	0x51B4:{区:26,点:67},	// 冴
	0x5742:{区:26,点:68},	// 坂
	0x962A:{区:26,点:69},	// 阪
	0x583A:{区:26,点:70},	// 堺
	0x698A:{区:26,点:71},	// 榊
	0x80B4:{区:26,点:72},	// 肴
	0x54B2:{区:26,点:73},	// 咲
	0x5D0E:{区:26,点:74},	// 崎
	0x57FC:{区:26,点:75},	// 埼
	0x7895:{区:26,点:76},	// 碕
	0x9DFA:{区:26,点:77},	// 鷺
	0x4F5C:{区:26,点:78},	// 作
	0x524A:{区:26,点:79},	// 削
	0x548B:{区:26,点:80},	// 咋
	0x643E:{区:26,点:81},	// 搾
	0x6628:{区:26,点:82},	// 昨
	0x6714:{区:26,点:83},	// 朔
	0x67F5:{区:26,点:84},	// 柵
	0x7A84:{区:26,点:85},	// 窄
	0x7B56:{区:26,点:86},	// 策
	0x7D22:{区:26,点:87},	// 索
	0x932F:{区:26,点:88},	// 錯
	0x685C:{区:26,点:89},	// 桜
	0x9BAD:{区:26,点:90},	// 鮭
	0x7B39:{区:26,点:91},	// 笹
	0x5319:{区:26,点:92},	// 匙
	0x518A:{区:26,点:93},	// 冊
	0x5237:{区:26,点:94},	// 刷
	0x5BDF:{区:27,点: 1},	// 察
	0x62F6:{区:27,点: 2},	// 拶
	0x64AE:{区:27,点: 3},	// 撮
	0x64E6:{区:27,点: 4},	// 擦
	0x672D:{区:27,点: 5},	// 札
	0x6BBA:{区:27,点: 6},	// 殺
	0x85A9:{区:27,点: 7},	// 薩
	0x96D1:{区:27,点: 8},	// 雑
	0x7690:{区:27,点: 9},	// 皐
	0x9BD6:{区:27,点:10},	// 鯖
	0x634C:{区:27,点:11},	// 捌
	0x9306:{区:27,点:12},	// 錆
	0x9BAB:{区:27,点:13},	// 鮫
	0x76BF:{区:27,点:14},	// 皿
	0x6652:{区:27,点:15},	// 晒
	0x4E09:{区:27,点:16},	// 三
	0x5098:{区:27,点:17},	// 傘
	0x53C2:{区:27,点:18},	// 参
	0x5C71:{区:27,点:19},	// 山
	0x60E8:{区:27,点:20},	// 惨
	0x6492:{区:27,点:21},	// 撒
	0x6563:{区:27,点:22},	// 散
	0x685F:{区:27,点:23},	// 桟
	0x71E6:{区:27,点:24},	// 燦
	0x73CA:{区:27,点:25},	// 珊
	0x7523:{区:27,点:26},	// 産
	0x7B97:{区:27,点:27},	// 算
	0x7E82:{区:27,点:28},	// 纂
	0x8695:{区:27,点:29},	// 蚕
	0x8B83:{区:27,点:30},	// 讃
	0x8CDB:{区:27,点:31},	// 賛
	0x9178:{区:27,点:32},	// 酸
	0x9910:{区:27,点:33},	// 餐
	0x65AC:{区:27,点:34},	// 斬
	0x66AB:{区:27,点:35},	// 暫
	0x6B8B:{区:27,点:36},	// 残
	0x4ED5:{区:27,点:37},	// 仕
	0x4ED4:{区:27,点:38},	// 仔
	0x4F3A:{区:27,点:39},	// 伺
	0x4F7F:{区:27,点:40},	// 使
	0x523A:{区:27,点:41},	// 刺
	0x53F8:{区:27,点:42},	// 司
	0x53F2:{区:27,点:43},	// 史
	0x55E3:{区:27,点:44},	// 嗣
	0x56DB:{区:27,点:45},	// 四
	0x58EB:{区:27,点:46},	// 士
	0x59CB:{区:27,点:47},	// 始
	0x59C9:{区:27,点:48},	// 姉
	0x59FF:{区:27,点:49},	// 姿
	0x5B50:{区:27,点:50},	// 子
	0x5C4D:{区:27,点:51},	// 屍
	0x5E02:{区:27,点:52},	// 市
	0x5E2B:{区:27,点:53},	// 師
	0x5FD7:{区:27,点:54},	// 志
	0x601D:{区:27,点:55},	// 思
	0x6307:{区:27,点:56},	// 指
	0x652F:{区:27,点:57},	// 支
	0x5B5C:{区:27,点:58},	// 孜
	0x65AF:{区:27,点:59},	// 斯
	0x65BD:{区:27,点:60},	// 施
	0x65E8:{区:27,点:61},	// 旨
	0x679D:{区:27,点:62},	// 枝
	0x6B62:{区:27,点:63},	// 止
	0x6B7B:{区:27,点:64},	// 死
	0x6C0F:{区:27,点:65},	// 氏
	0x7345:{区:27,点:66},	// 獅
	0x7949:{区:27,点:67},	// 祉
	0x79C1:{区:27,点:68},	// 私
	0x7CF8:{区:27,点:69},	// 糸
	0x7D19:{区:27,点:70},	// 紙
	0x7D2B:{区:27,点:71},	// 紫
	0x80A2:{区:27,点:72},	// 肢
	0x8102:{区:27,点:73},	// 脂
	0x81F3:{区:27,点:74},	// 至
	0x8996:{区:27,点:75},	// 視
	0x8A5E:{区:27,点:76},	// 詞
	0x8A69:{区:27,点:77},	// 詩
	0x8A66:{区:27,点:78},	// 試
	0x8A8C:{区:27,点:79},	// 誌
	0x8AEE:{区:27,点:80},	// 諮
	0x8CC7:{区:27,点:81},	// 資
	0x8CDC:{区:27,点:82},	// 賜
	0x96CC:{区:27,点:83},	// 雌
	0x98FC:{区:27,点:84},	// 飼
	0x6B6F:{区:27,点:85},	// 歯
	0x4E8B:{区:27,点:86},	// 事
	0x4F3C:{区:27,点:87},	// 似
	0x4F8D:{区:27,点:88},	// 侍
	0x5150:{区:27,点:89},	// 児
	0x5B57:{区:27,点:90},	// 字
	0x5BFA:{区:27,点:91},	// 寺
	0x6148:{区:27,点:92},	// 慈
	0x6301:{区:27,点:93},	// 持
	0x6642:{区:27,点:94},	// 時
	0x6B21:{区:28,点: 1},	// 次
	0x6ECB:{区:28,点: 2},	// 滋
	0x6CBB:{区:28,点: 3},	// 治
	0x723E:{区:28,点: 4},	// 爾
	0x74BD:{区:28,点: 5},	// 璽
	0x75D4:{区:28,点: 6},	// 痔
	0x78C1:{区:28,点: 7},	// 磁
	0x793A:{区:28,点: 8},	// 示
	0x800C:{区:28,点: 9},	// 而
	0x8033:{区:28,点:10},	// 耳
	0x81EA:{区:28,点:11},	// 自
	0x8494:{区:28,点:12},	// 蒔
	0x8F9E:{区:28,点:13},	// 辞
	0x6C50:{区:28,点:14},	// 汐
	0x9E7F:{区:28,点:15},	// 鹿
	0x5F0F:{区:28,点:16},	// 式
	0x8B58:{区:28,点:17},	// 識
	0x9D2B:{区:28,点:18},	// 鴫
	0x7AFA:{区:28,点:19},	// 竺
	0x8EF8:{区:28,点:20},	// 軸
	0x5B8D:{区:28,点:21},	// 宍
	0x96EB:{区:28,点:22},	// 雫
	0x4E03:{区:28,点:23},	// 七
	0x53F1:{区:28,点:24},	// 叱
	0x57F7:{区:28,点:25},	// 執
	0x5931:{区:28,点:26},	// 失
	0x5AC9:{区:28,点:27},	// 嫉
	0x5BA4:{区:28,点:28},	// 室
	0x6089:{区:28,点:29},	// 悉
	0x6E7F:{区:28,点:30},	// 湿
	0x6F06:{区:28,点:31},	// 漆
	0x75BE:{区:28,点:32},	// 疾
	0x8CEA:{区:28,点:33},	// 質
	0x5B9F:{区:28,点:34},	// 実
	0x8500:{区:28,点:35},	// 蔀
	0x7BE0:{区:28,点:36},	// 篠
	0x5072:{区:28,点:37},	// 偲
	0x67F4:{区:28,点:38},	// 柴
	0x829D:{区:28,点:39},	// 芝
	0x5C61:{区:28,点:40},	// 屡
	0x854A:{区:28,点:41},	// 蕊
	0x7E1E:{区:28,点:42},	// 縞
	0x820E:{区:28,点:43},	// 舎
	0x5199:{区:28,点:44},	// 写
	0x5C04:{区:28,点:45},	// 射
	0x6368:{区:28,点:46},	// 捨
	0x8D66:{区:28,点:47},	// 赦
	0x659C:{区:28,点:48},	// 斜
	0x716E:{区:28,点:49},	// 煮
	0x793E:{区:28,点:50},	// 社
	0x7D17:{区:28,点:51},	// 紗
	0x8005:{区:28,点:52},	// 者
	0x8B1D:{区:28,点:53},	// 謝
	0x8ECA:{区:28,点:54},	// 車
	0x906E:{区:28,点:55},	// 遮
	0x86C7:{区:28,点:56},	// 蛇
	0x90AA:{区:28,点:57},	// 邪
	0x501F:{区:28,点:58},	// 借
	0x52FA:{区:28,点:59},	// 勺
	0x5C3A:{区:28,点:60},	// 尺
	0x6753:{区:28,点:61},	// 杓
	0x707C:{区:28,点:62},	// 灼
	0x7235:{区:28,点:63},	// 爵
	0x914C:{区:28,点:64},	// 酌
	0x91C8:{区:28,点:65},	// 釈
	0x932B:{区:28,点:66},	// 錫
	0x82E5:{区:28,点:67},	// 若
	0x5BC2:{区:28,点:68},	// 寂
	0x5F31:{区:28,点:69},	// 弱
	0x60F9:{区:28,点:70},	// 惹
	0x4E3B:{区:28,点:71},	// 主
	0x53D6:{区:28,点:72},	// 取
	0x5B88:{区:28,点:73},	// 守
	0x624B:{区:28,点:74},	// 手
	0x6731:{区:28,点:75},	// 朱
	0x6B8A:{区:28,点:76},	// 殊
	0x72E9:{区:28,点:77},	// 狩
	0x73E0:{区:28,点:78},	// 珠
	0x7A2E:{区:28,点:79},	// 種
	0x816B:{区:28,点:80},	// 腫
	0x8DA3:{区:28,点:81},	// 趣
	0x9152:{区:28,点:82},	// 酒
	0x9996:{区:28,点:83},	// 首
	0x5112:{区:28,点:84},	// 儒
	0x53D7:{区:28,点:85},	// 受
	0x546A:{区:28,点:86},	// 呪
	0x5BFF:{区:28,点:87},	// 寿
	0x6388:{区:28,点:88},	// 授
	0x6A39:{区:28,点:89},	// 樹
	0x7DAC:{区:28,点:90},	// 綬
	0x9700:{区:28,点:91},	// 需
	0x56DA:{区:28,点:92},	// 囚
	0x53CE:{区:28,点:93},	// 収
	0x5468:{区:28,点:94},	// 周
	0x5B97:{区:29,点: 1},	// 宗
	0x5C31:{区:29,点: 2},	// 就
	0x5DDE:{区:29,点: 3},	// 州
	0x4FEE:{区:29,点: 4},	// 修
	0x6101:{区:29,点: 5},	// 愁
	0x62FE:{区:29,点: 6},	// 拾
	0x6D32:{区:29,点: 7},	// 洲
	0x79C0:{区:29,点: 8},	// 秀
	0x79CB:{区:29,点: 9},	// 秋
	0x7D42:{区:29,点:10},	// 終
	0x7E4D:{区:29,点:11},	// 繍
	0x7FD2:{区:29,点:12},	// 習
	0x81ED:{区:29,点:13},	// 臭
	0x821F:{区:29,点:14},	// 舟
	0x8490:{区:29,点:15},	// 蒐
	0x8846:{区:29,点:16},	// 衆
	0x8972:{区:29,点:17},	// 襲
	0x8B90:{区:29,点:18},	// 讐
	0x8E74:{区:29,点:19},	// 蹴
	0x8F2F:{区:29,点:20},	// 輯
	0x9031:{区:29,点:21},	// 週
	0x914B:{区:29,点:22},	// 酋
	0x916C:{区:29,点:23},	// 酬
	0x96C6:{区:29,点:24},	// 集
	0x919C:{区:29,点:25},	// 醜
	0x4EC0:{区:29,点:26},	// 什
	0x4F4F:{区:29,点:27},	// 住
	0x5145:{区:29,点:28},	// 充
	0x5341:{区:29,点:29},	// 十
	0x5F93:{区:29,点:30},	// 従
	0x620E:{区:29,点:31},	// 戎
	0x67D4:{区:29,点:32},	// 柔
	0x6C41:{区:29,点:33},	// 汁
	0x6E0B:{区:29,点:34},	// 渋
	0x7363:{区:29,点:35},	// 獣
	0x7E26:{区:29,点:36},	// 縦
	0x91CD:{区:29,点:37},	// 重
	0x9283:{区:29,点:38},	// 銃
	0x53D4:{区:29,点:39},	// 叔
	0x5919:{区:29,点:40},	// 夙
	0x5BBF:{区:29,点:41},	// 宿
	0x6DD1:{区:29,点:42},	// 淑
	0x795D:{区:29,点:43},	// 祝
	0x7E2E:{区:29,点:44},	// 縮
	0x7C9B:{区:29,点:45},	// 粛
	0x587E:{区:29,点:46},	// 塾
	0x719F:{区:29,点:47},	// 熟
	0x51FA:{区:29,点:48},	// 出
	0x8853:{区:29,点:49},	// 術
	0x8FF0:{区:29,点:50},	// 述
	0x4FCA:{区:29,点:51},	// 俊
	0x5CFB:{区:29,点:52},	// 峻
	0x6625:{区:29,点:53},	// 春
	0x77AC:{区:29,点:54},	// 瞬
	0x7AE3:{区:29,点:55},	// 竣
	0x821C:{区:29,点:56},	// 舜
	0x99FF:{区:29,点:57},	// 駿
	0x51C6:{区:29,点:58},	// 准
	0x5FAA:{区:29,点:59},	// 循
	0x65EC:{区:29,点:60},	// 旬
	0x696F:{区:29,点:61},	// 楯
	0x6B89:{区:29,点:62},	// 殉
	0x6DF3:{区:29,点:63},	// 淳
	0x6E96:{区:29,点:64},	// 準
	0x6F64:{区:29,点:65},	// 潤
	0x76FE:{区:29,点:66},	// 盾
	0x7D14:{区:29,点:67},	// 純
	0x5DE1:{区:29,点:68},	// 巡
	0x9075:{区:29,点:69},	// 遵
	0x9187:{区:29,点:70},	// 醇
	0x9806:{区:29,点:71},	// 順
	0x51E6:{区:29,点:72},	// 処
	0x521D:{区:29,点:73},	// 初
	0x6240:{区:29,点:74},	// 所
	0x6691:{区:29,点:75},	// 暑
	0x66D9:{区:29,点:76},	// 曙
	0x6E1A:{区:29,点:77},	// 渚
	0x5EB6:{区:29,点:78},	// 庶
	0x7DD2:{区:29,点:79},	// 緒
	0x7F72:{区:29,点:80},	// 署
	0x66F8:{区:29,点:81},	// 書
	0x85AF:{区:29,点:82},	// 薯
	0x85F7:{区:29,点:83},	// 藷
	0x8AF8:{区:29,点:84},	// 諸
	0x52A9:{区:29,点:85},	// 助
	0x53D9:{区:29,点:86},	// 叙
	0x5973:{区:29,点:87},	// 女
	0x5E8F:{区:29,点:88},	// 序
	0x5F90:{区:29,点:89},	// 徐
	0x6055:{区:29,点:90},	// 恕
	0x92E4:{区:29,点:91},	// 鋤
	0x9664:{区:29,点:92},	// 除
	0x50B7:{区:29,点:93},	// 傷
	0x511F:{区:29,点:94},	// 償
	0x52DD:{区:30,点: 1},	// 勝
	0x5320:{区:30,点: 2},	// 匠
	0x5347:{区:30,点: 3},	// 升
	0x53EC:{区:30,点: 4},	// 召
	0x54E8:{区:30,点: 5},	// 哨
	0x5546:{区:30,点: 6},	// 商
	0x5531:{区:30,点: 7},	// 唱
	0x5617:{区:30,点: 8},	// 嘗
	0x5968:{区:30,点: 9},	// 奨
	0x59BE:{区:30,点:10},	// 妾
	0x5A3C:{区:30,点:11},	// 娼
	0x5BB5:{区:30,点:12},	// 宵
	0x5C06:{区:30,点:13},	// 将
	0x5C0F:{区:30,点:14},	// 小
	0x5C11:{区:30,点:15},	// 少
	0x5C1A:{区:30,点:16},	// 尚
	0x5E84:{区:30,点:17},	// 庄
	0x5E8A:{区:30,点:18},	// 床
	0x5EE0:{区:30,点:19},	// 廠
	0x5F70:{区:30,点:20},	// 彰
	0x627F:{区:30,点:21},	// 承
	0x6284:{区:30,点:22},	// 抄
	0x62DB:{区:30,点:23},	// 招
	0x638C:{区:30,点:24},	// 掌
	0x6377:{区:30,点:25},	// 捷
	0x6607:{区:30,点:26},	// 昇
	0x660C:{区:30,点:27},	// 昌
	0x662D:{区:30,点:28},	// 昭
	0x6676:{区:30,点:29},	// 晶
	0x677E:{区:30,点:30},	// 松
	0x68A2:{区:30,点:31},	// 梢
	0x6A1F:{区:30,点:32},	// 樟
	0x6A35:{区:30,点:33},	// 樵
	0x6CBC:{区:30,点:34},	// 沼
	0x6D88:{区:30,点:35},	// 消
	0x6E09:{区:30,点:36},	// 渉
	0x6E58:{区:30,点:37},	// 湘
	0x713C:{区:30,点:38},	// 焼
	0x7126:{区:30,点:39},	// 焦
	0x7167:{区:30,点:40},	// 照
	0x75C7:{区:30,点:41},	// 症
	0x7701:{区:30,点:42},	// 省
	0x785D:{区:30,点:43},	// 硝
	0x7901:{区:30,点:44},	// 礁
	0x7965:{区:30,点:45},	// 祥
	0x79F0:{区:30,点:46},	// 称
	0x7AE0:{区:30,点:47},	// 章
	0x7B11:{区:30,点:48},	// 笑
	0x7CA7:{区:30,点:49},	// 粧
	0x7D39:{区:30,点:50},	// 紹
	0x8096:{区:30,点:51},	// 肖
	0x83D6:{区:30,点:52},	// 菖
	0x848B:{区:30,点:53},	// 蒋
	0x8549:{区:30,点:54},	// 蕉
	0x885D:{区:30,点:55},	// 衝
	0x88F3:{区:30,点:56},	// 裳
	0x8A1F:{区:30,点:57},	// 訟
	0x8A3C:{区:30,点:58},	// 証
	0x8A54:{区:30,点:59},	// 詔
	0x8A73:{区:30,点:60},	// 詳
	0x8C61:{区:30,点:61},	// 象
	0x8CDE:{区:30,点:62},	// 賞
	0x91A4:{区:30,点:63},	// 醤
	0x9266:{区:30,点:64},	// 鉦
	0x937E:{区:30,点:65},	// 鍾
	0x9418:{区:30,点:66},	// 鐘
	0x969C:{区:30,点:67},	// 障
	0x9798:{区:30,点:68},	// 鞘
	0x4E0A:{区:30,点:69},	// 上
	0x4E08:{区:30,点:70},	// 丈
	0x4E1E:{区:30,点:71},	// 丞
	0x4E57:{区:30,点:72},	// 乗
	0x5197:{区:30,点:73},	// 冗
	0x5270:{区:30,点:74},	// 剰
	0x57CE:{区:30,点:75},	// 城
	0x5834:{区:30,点:76},	// 場
	0x58CC:{区:30,点:77},	// 壌
	0x5B22:{区:30,点:78},	// 嬢
	0x5E38:{区:30,点:79},	// 常
	0x60C5:{区:30,点:80},	// 情
	0x64FE:{区:30,点:81},	// 擾
	0x6761:{区:30,点:82},	// 条
	0x6756:{区:30,点:83},	// 杖
	0x6D44:{区:30,点:84},	// 浄
	0x72B6:{区:30,点:85},	// 状
	0x7573:{区:30,点:86},	// 畳
	0x7A63:{区:30,点:87},	// 穣
	0x84B8:{区:30,点:88},	// 蒸
	0x8B72:{区:30,点:89},	// 譲
	0x91B8:{区:30,点:90},	// 醸
	0x9320:{区:30,点:91},	// 錠
	0x5631:{区:30,点:92},	// 嘱
	0x57F4:{区:30,点:93},	// 埴
	0x98FE:{区:30,点:94},	// 飾
	0x62ED:{区:31,点: 1},	// 拭
	0x690D:{区:31,点: 2},	// 植
	0x6B96:{区:31,点: 3},	// 殖
	0x71ED:{区:31,点: 4},	// 燭
	0x7E54:{区:31,点: 5},	// 織
	0x8077:{区:31,点: 6},	// 職
	0x8272:{区:31,点: 7},	// 色
	0x89E6:{区:31,点: 8},	// 触
	0x98DF:{区:31,点: 9},	// 食
	0x8755:{区:31,点:10},	// 蝕
	0x8FB1:{区:31,点:11},	// 辱
	0x5C3B:{区:31,点:12},	// 尻
	0x4F38:{区:31,点:13},	// 伸
	0x4FE1:{区:31,点:14},	// 信
	0x4FB5:{区:31,点:15},	// 侵
	0x5507:{区:31,点:16},	// 唇
	0x5A20:{区:31,点:17},	// 娠
	0x5BDD:{区:31,点:18},	// 寝
	0x5BE9:{区:31,点:19},	// 審
	0x5FC3:{区:31,点:20},	// 心
	0x614E:{区:31,点:21},	// 慎
	0x632F:{区:31,点:22},	// 振
	0x65B0:{区:31,点:23},	// 新
	0x664B:{区:31,点:24},	// 晋
	0x68EE:{区:31,点:25},	// 森
	0x699B:{区:31,点:26},	// 榛
	0x6D78:{区:31,点:27},	// 浸
	0x6DF1:{区:31,点:28},	// 深
	0x7533:{区:31,点:29},	// 申
	0x75B9:{区:31,点:30},	// 疹
	0x771F:{区:31,点:31},	// 真
	0x795E:{区:31,点:32},	// 神
	0x79E6:{区:31,点:33},	// 秦
	0x7D33:{区:31,点:34},	// 紳
	0x81E3:{区:31,点:35},	// 臣
	0x82AF:{区:31,点:36},	// 芯
	0x85AA:{区:31,点:37},	// 薪
	0x89AA:{区:31,点:38},	// 親
	0x8A3A:{区:31,点:39},	// 診
	0x8EAB:{区:31,点:40},	// 身
	0x8F9B:{区:31,点:41},	// 辛
	0x9032:{区:31,点:42},	// 進
	0x91DD:{区:31,点:43},	// 針
	0x9707:{区:31,点:44},	// 震
	0x4EBA:{区:31,点:45},	// 人
	0x4EC1:{区:31,点:46},	// 仁
	0x5203:{区:31,点:47},	// 刃
	0x5875:{区:31,点:48},	// 塵
	0x58EC:{区:31,点:49},	// 壬
	0x5C0B:{区:31,点:50},	// 尋
	0x751A:{区:31,点:51},	// 甚
	0x5C3D:{区:31,点:52},	// 尽
	0x814E:{区:31,点:53},	// 腎
	0x8A0A:{区:31,点:54},	// 訊
	0x8FC5:{区:31,点:55},	// 迅
	0x9663:{区:31,点:56},	// 陣
	0x976D:{区:31,点:57},	// 靭
	0x7B25:{区:31,点:58},	// 笥
	0x8ACF:{区:31,点:59},	// 諏
	0x9808:{区:31,点:60},	// 須
	0x9162:{区:31,点:61},	// 酢
	0x56F3:{区:31,点:62},	// 図
	0x53A8:{区:31,点:63},	// 厨
	0x9017:{区:31,点:64},	// 逗
	0x5439:{区:31,点:65},	// 吹
	0x5782:{区:31,点:66},	// 垂
	0x5E25:{区:31,点:67},	// 帥
	0x63A8:{区:31,点:68},	// 推
	0x6C34:{区:31,点:69},	// 水
	0x708A:{区:31,点:70},	// 炊
	0x7761:{区:31,点:71},	// 睡
	0x7C8B:{区:31,点:72},	// 粋
	0x7FE0:{区:31,点:73},	// 翠
	0x8870:{区:31,点:74},	// 衰
	0x9042:{区:31,点:75},	// 遂
	0x9154:{区:31,点:76},	// 酔
	0x9310:{区:31,点:77},	// 錐
	0x9318:{区:31,点:78},	// 錘
	0x968F:{区:31,点:79},	// 随
	0x745E:{区:31,点:80},	// 瑞
	0x9AC4:{区:31,点:81},	// 髄
	0x5D07:{区:31,点:82},	// 崇
	0x5D69:{区:31,点:83},	// 嵩
	0x6570:{区:31,点:84},	// 数
	0x67A2:{区:31,点:85},	// 枢
	0x8DA8:{区:31,点:86},	// 趨
	0x96DB:{区:31,点:87},	// 雛
	0x636E:{区:31,点:88},	// 据
	0x6749:{区:31,点:89},	// 杉
	0x6919:{区:31,点:90},	// 椙
	0x83C5:{区:31,点:91},	// 菅
	0x9817:{区:31,点:92},	// 頗
	0x96C0:{区:31,点:93},	// 雀
	0x88FE:{区:31,点:94},	// 裾
	0x6F84:{区:32,点: 1},	// 澄
	0x647A:{区:32,点: 2},	// 摺
	0x5BF8:{区:32,点: 3},	// 寸
	0x4E16:{区:32,点: 4},	// 世
	0x702C:{区:32,点: 5},	// 瀬
	0x755D:{区:32,点: 6},	// 畝
	0x662F:{区:32,点: 7},	// 是
	0x51C4:{区:32,点: 8},	// 凄
	0x5236:{区:32,点: 9},	// 制
	0x52E2:{区:32,点:10},	// 勢
	0x59D3:{区:32,点:11},	// 姓
	0x5F81:{区:32,点:12},	// 征
	0x6027:{区:32,点:13},	// 性
	0x6210:{区:32,点:14},	// 成
	0x653F:{区:32,点:15},	// 政
	0x6574:{区:32,点:16},	// 整
	0x661F:{区:32,点:17},	// 星
	0x6674:{区:32,点:18},	// 晴
	0x68F2:{区:32,点:19},	// 棲
	0x6816:{区:32,点:20},	// 栖
	0x6B63:{区:32,点:21},	// 正
	0x6E05:{区:32,点:22},	// 清
	0x7272:{区:32,点:23},	// 牲
	0x751F:{区:32,点:24},	// 生
	0x76DB:{区:32,点:25},	// 盛
	0x7CBE:{区:32,点:26},	// 精
	0x8056:{区:32,点:27},	// 聖
	0x58F0:{区:32,点:28},	// 声
	0x88FD:{区:32,点:29},	// 製
	0x897F:{区:32,点:30},	// 西
	0x8AA0:{区:32,点:31},	// 誠
	0x8A93:{区:32,点:32},	// 誓
	0x8ACB:{区:32,点:33},	// 請
	0x901D:{区:32,点:34},	// 逝
	0x9192:{区:32,点:35},	// 醒
	0x9752:{区:32,点:36},	// 青
	0x9759:{区:32,点:37},	// 静
	0x6589:{区:32,点:38},	// 斉
	0x7A0E:{区:32,点:39},	// 税
	0x8106:{区:32,点:40},	// 脆
	0x96BB:{区:32,点:41},	// 隻
	0x5E2D:{区:32,点:42},	// 席
	0x60DC:{区:32,点:43},	// 惜
	0x621A:{区:32,点:44},	// 戚
	0x65A5:{区:32,点:45},	// 斥
	0x6614:{区:32,点:46},	// 昔
	0x6790:{区:32,点:47},	// 析
	0x77F3:{区:32,点:48},	// 石
	0x7A4D:{区:32,点:49},	// 積
	0x7C4D:{区:32,点:50},	// 籍
	0x7E3E:{区:32,点:51},	// 績
	0x810A:{区:32,点:52},	// 脊
	0x8CAC:{区:32,点:53},	// 責
	0x8D64:{区:32,点:54},	// 赤
	0x8DE1:{区:32,点:55},	// 跡
	0x8E5F:{区:32,点:56},	// 蹟
	0x78A9:{区:32,点:57},	// 碩
	0x5207:{区:32,点:58},	// 切
	0x62D9:{区:32,点:59},	// 拙
	0x63A5:{区:32,点:60},	// 接
	0x6442:{区:32,点:61},	// 摂
	0x6298:{区:32,点:62},	// 折
	0x8A2D:{区:32,点:63},	// 設
	0x7A83:{区:32,点:64},	// 窃
	0x7BC0:{区:32,点:65},	// 節
	0x8AAC:{区:32,点:66},	// 説
	0x96EA:{区:32,点:67},	// 雪
	0x7D76:{区:32,点:68},	// 絶
	0x820C:{区:32,点:69},	// 舌
	0x8749:{区:32,点:70},	// 蝉
	0x4ED9:{区:32,点:71},	// 仙
	0x5148:{区:32,点:72},	// 先
	0x5343:{区:32,点:73},	// 千
	0x5360:{区:32,点:74},	// 占
	0x5BA3:{区:32,点:75},	// 宣
	0x5C02:{区:32,点:76},	// 専
	0x5C16:{区:32,点:77},	// 尖
	0x5DDD:{区:32,点:78},	// 川
	0x6226:{区:32,点:79},	// 戦
	0x6247:{区:32,点:80},	// 扇
	0x64B0:{区:32,点:81},	// 撰
	0x6813:{区:32,点:82},	// 栓
	0x6834:{区:32,点:83},	// 栴
	0x6CC9:{区:32,点:84},	// 泉
	0x6D45:{区:32,点:85},	// 浅
	0x6D17:{区:32,点:86},	// 洗
	0x67D3:{区:32,点:87},	// 染
	0x6F5C:{区:32,点:88},	// 潜
	0x714E:{区:32,点:89},	// 煎
	0x717D:{区:32,点:90},	// 煽
	0x65CB:{区:32,点:91},	// 旋
	0x7A7F:{区:32,点:92},	// 穿
	0x7BAD:{区:32,点:93},	// 箭
	0x7DDA:{区:32,点:94},	// 線
	0x7E4A:{区:33,点: 1},	// 繊
	0x7FA8:{区:33,点: 2},	// 羨
	0x817A:{区:33,点: 3},	// 腺
	0x821B:{区:33,点: 4},	// 舛
	0x8239:{区:33,点: 5},	// 船
	0x85A6:{区:33,点: 6},	// 薦
	0x8A6E:{区:33,点: 7},	// 詮
	0x8CCE:{区:33,点: 8},	// 賎
	0x8DF5:{区:33,点: 9},	// 践
	0x9078:{区:33,点:10},	// 選
	0x9077:{区:33,点:11},	// 遷
	0x92AD:{区:33,点:12},	// 銭
	0x9291:{区:33,点:13},	// 銑
	0x9583:{区:33,点:14},	// 閃
	0x9BAE:{区:33,点:15},	// 鮮
	0x524D:{区:33,点:16},	// 前
	0x5584:{区:33,点:17},	// 善
	0x6F38:{区:33,点:18},	// 漸
	0x7136:{区:33,点:19},	// 然
	0x5168:{区:33,点:20},	// 全
	0x7985:{区:33,点:21},	// 禅
	0x7E55:{区:33,点:22},	// 繕
	0x81B3:{区:33,点:23},	// 膳
	0x7CCE:{区:33,点:24},	// 糎
	0x564C:{区:33,点:25},	// 噌
	0x5851:{区:33,点:26},	// 塑
	0x5CA8:{区:33,点:27},	// 岨
	0x63AA:{区:33,点:28},	// 措
	0x66FE:{区:33,点:29},	// 曾
	0x66FD:{区:33,点:30},	// 曽
	0x695A:{区:33,点:31},	// 楚
	0x72D9:{区:33,点:32},	// 狙
	0x758F:{区:33,点:33},	// 疏
	0x758E:{区:33,点:34},	// 疎
	0x790E:{区:33,点:35},	// 礎
	0x7956:{区:33,点:36},	// 祖
	0x79DF:{区:33,点:37},	// 租
	0x7C97:{区:33,点:38},	// 粗
	0x7D20:{区:33,点:39},	// 素
	0x7D44:{区:33,点:40},	// 組
	0x8607:{区:33,点:41},	// 蘇
	0x8A34:{区:33,点:42},	// 訴
	0x963B:{区:33,点:43},	// 阻
	0x9061:{区:33,点:44},	// 遡
	0x9F20:{区:33,点:45},	// 鼠
	0x50E7:{区:33,点:46},	// 僧
	0x5275:{区:33,点:47},	// 創
	0x53CC:{区:33,点:48},	// 双
	0x53E2:{区:33,点:49},	// 叢
	0x5009:{区:33,点:50},	// 倉
	0x55AA:{区:33,点:51},	// 喪
	0x58EE:{区:33,点:52},	// 壮
	0x594F:{区:33,点:53},	// 奏
	0x723D:{区:33,点:54},	// 爽
	0x5B8B:{区:33,点:55},	// 宋
	0x5C64:{区:33,点:56},	// 層
	0x531D:{区:33,点:57},	// 匝
	0x60E3:{区:33,点:58},	// 惣
	0x60F3:{区:33,点:59},	// 想
	0x635C:{区:33,点:60},	// 捜
	0x6383:{区:33,点:61},	// 掃
	0x633F:{区:33,点:62},	// 挿
	0x63BB:{区:33,点:63},	// 掻
	0x64CD:{区:33,点:64},	// 操
	0x65E9:{区:33,点:65},	// 早
	0x66F9:{区:33,点:66},	// 曹
	0x5DE3:{区:33,点:67},	// 巣
	0x69CD:{区:33,点:68},	// 槍
	0x69FD:{区:33,点:69},	// 槽
	0x6F15:{区:33,点:70},	// 漕
	0x71E5:{区:33,点:71},	// 燥
	0x4E89:{区:33,点:72},	// 争
	0x75E9:{区:33,点:73},	// 痩
	0x76F8:{区:33,点:74},	// 相
	0x7A93:{区:33,点:75},	// 窓
	0x7CDF:{区:33,点:76},	// 糟
	0x7DCF:{区:33,点:77},	// 総
	0x7D9C:{区:33,点:78},	// 綜
	0x8061:{区:33,点:79},	// 聡
	0x8349:{区:33,点:80},	// 草
	0x8358:{区:33,点:81},	// 荘
	0x846C:{区:33,点:82},	// 葬
	0x84BC:{区:33,点:83},	// 蒼
	0x85FB:{区:33,点:84},	// 藻
	0x88C5:{区:33,点:85},	// 装
	0x8D70:{区:33,点:86},	// 走
	0x9001:{区:33,点:87},	// 送
	0x906D:{区:33,点:88},	// 遭
	0x9397:{区:33,点:89},	// 鎗
	0x971C:{区:33,点:90},	// 霜
	0x9A12:{区:33,点:91},	// 騒
	0x50CF:{区:33,点:92},	// 像
	0x5897:{区:33,点:93},	// 増
	0x618E:{区:33,点:94},	// 憎
	0x81D3:{区:34,点: 1},	// 臓
	0x8535:{区:34,点: 2},	// 蔵
	0x8D08:{区:34,点: 3},	// 贈
	0x9020:{区:34,点: 4},	// 造
	0x4FC3:{区:34,点: 5},	// 促
	0x5074:{区:34,点: 6},	// 側
	0x5247:{区:34,点: 7},	// 則
	0x5373:{区:34,点: 8},	// 即
	0x606F:{区:34,点: 9},	// 息
	0x6349:{区:34,点:10},	// 捉
	0x675F:{区:34,点:11},	// 束
	0x6E2C:{区:34,点:12},	// 測
	0x8DB3:{区:34,点:13},	// 足
	0x901F:{区:34,点:14},	// 速
	0x4FD7:{区:34,点:15},	// 俗
	0x5C5E:{区:34,点:16},	// 属
	0x8CCA:{区:34,点:17},	// 賊
	0x65CF:{区:34,点:18},	// 族
	0x7D9A:{区:34,点:19},	// 続
	0x5352:{区:34,点:20},	// 卒
	0x8896:{区:34,点:21},	// 袖
	0x5176:{区:34,点:22},	// 其
	0x63C3:{区:34,点:23},	// 揃
	0x5B58:{区:34,点:24},	// 存
	0x5B6B:{区:34,点:25},	// 孫
	0x5C0A:{区:34,点:26},	// 尊
	0x640D:{区:34,点:27},	// 損
	0x6751:{区:34,点:28},	// 村
	0x905C:{区:34,点:29},	// 遜
	0x4ED6:{区:34,点:30},	// 他
	0x591A:{区:34,点:31},	// 多
	0x592A:{区:34,点:32},	// 太
	0x6C70:{区:34,点:33},	// 汰
	0x8A51:{区:34,点:34},	// 詑
	0x553E:{区:34,点:35},	// 唾
	0x5815:{区:34,点:36},	// 堕
	0x59A5:{区:34,点:37},	// 妥
	0x60F0:{区:34,点:38},	// 惰
	0x6253:{区:34,点:39},	// 打
	0x67C1:{区:34,点:40},	// 柁
	0x8235:{区:34,点:41},	// 舵
	0x6955:{区:34,点:42},	// 楕
	0x9640:{区:34,点:43},	// 陀
	0x99C4:{区:34,点:44},	// 駄
	0x9A28:{区:34,点:45},	// 騨
	0x4F53:{区:34,点:46},	// 体
	0x5806:{区:34,点:47},	// 堆
	0x5BFE:{区:34,点:48},	// 対
	0x8010:{区:34,点:49},	// 耐
	0x5CB1:{区:34,点:50},	// 岱
	0x5E2F:{区:34,点:51},	// 帯
	0x5F85:{区:34,点:52},	// 待
	0x6020:{区:34,点:53},	// 怠
	0x614B:{区:34,点:54},	// 態
	0x6234:{区:34,点:55},	// 戴
	0x66FF:{区:34,点:56},	// 替
	0x6CF0:{区:34,点:57},	// 泰
	0x6EDE:{区:34,点:58},	// 滞
	0x80CE:{区:34,点:59},	// 胎
	0x817F:{区:34,点:60},	// 腿
	0x82D4:{区:34,点:61},	// 苔
	0x888B:{区:34,点:62},	// 袋
	0x8CB8:{区:34,点:63},	// 貸
	0x9000:{区:34,点:64},	// 退
	0x902E:{区:34,点:65},	// 逮
	0x968A:{区:34,点:66},	// 隊
	0x9EDB:{区:34,点:67},	// 黛
	0x9BDB:{区:34,点:68},	// 鯛
	0x4EE3:{区:34,点:69},	// 代
	0x53F0:{区:34,点:70},	// 台
	0x5927:{区:34,点:71},	// 大
	0x7B2C:{区:34,点:72},	// 第
	0x918D:{区:34,点:73},	// 醍
	0x984C:{区:34,点:74},	// 題
	0x9DF9:{区:34,点:75},	// 鷹
	0x6EDD:{区:34,点:76},	// 滝
	0x7027:{区:34,点:77},	// 瀧
	0x5353:{区:34,点:78},	// 卓
	0x5544:{区:34,点:79},	// 啄
	0x5B85:{区:34,点:80},	// 宅
	0x6258:{区:34,点:81},	// 托
	0x629E:{区:34,点:82},	// 択
	0x62D3:{区:34,点:83},	// 拓
	0x6CA2:{区:34,点:84},	// 沢
	0x6FEF:{区:34,点:85},	// 濯
	0x7422:{区:34,点:86},	// 琢
	0x8A17:{区:34,点:87},	// 託
	0x9438:{区:34,点:88},	// 鐸
	0x6FC1:{区:34,点:89},	// 濁
	0x8AFE:{区:34,点:90},	// 諾
	0x8338:{区:34,点:91},	// 茸
	0x51E7:{区:34,点:92},	// 凧
	0x86F8:{区:34,点:93},	// 蛸
	0x53EA:{区:34,点:94},	// 只
	0x53E9:{区:35,点: 1},	// 叩
	0x4F46:{区:35,点: 2},	// 但
	0x9054:{区:35,点: 3},	// 達
	0x8FB0:{区:35,点: 4},	// 辰
	0x596A:{区:35,点: 5},	// 奪
	0x8131:{区:35,点: 6},	// 脱
	0x5DFD:{区:35,点: 7},	// 巽
	0x7AEA:{区:35,点: 8},	// 竪
	0x8FBF:{区:35,点: 9},	// 辿
	0x68DA:{区:35,点:10},	// 棚
	0x8C37:{区:35,点:11},	// 谷
	0x72F8:{区:35,点:12},	// 狸
	0x9C48:{区:35,点:13},	// 鱈
	0x6A3D:{区:35,点:14},	// 樽
	0x8AB0:{区:35,点:15},	// 誰
	0x4E39:{区:35,点:16},	// 丹
	0x5358:{区:35,点:17},	// 単
	0x5606:{区:35,点:18},	// 嘆
	0x5766:{区:35,点:19},	// 坦
	0x62C5:{区:35,点:20},	// 担
	0x63A2:{区:35,点:21},	// 探
	0x65E6:{区:35,点:22},	// 旦
	0x6B4E:{区:35,点:23},	// 歎
	0x6DE1:{区:35,点:24},	// 淡
	0x6E5B:{区:35,点:25},	// 湛
	0x70AD:{区:35,点:26},	// 炭
	0x77ED:{区:35,点:27},	// 短
	0x7AEF:{区:35,点:28},	// 端
	0x7BAA:{区:35,点:29},	// 箪
	0x7DBB:{区:35,点:30},	// 綻
	0x803D:{区:35,点:31},	// 耽
	0x80C6:{区:35,点:32},	// 胆
	0x86CB:{区:35,点:33},	// 蛋
	0x8A95:{区:35,点:34},	// 誕
	0x935B:{区:35,点:35},	// 鍛
	0x56E3:{区:35,点:36},	// 団
	0x58C7:{区:35,点:37},	// 壇
	0x5F3E:{区:35,点:38},	// 弾
	0x65AD:{区:35,点:39},	// 断
	0x6696:{区:35,点:40},	// 暖
	0x6A80:{区:35,点:41},	// 檀
	0x6BB5:{区:35,点:42},	// 段
	0x7537:{区:35,点:43},	// 男
	0x8AC7:{区:35,点:44},	// 談
	0x5024:{区:35,点:45},	// 値
	0x77E5:{区:35,点:46},	// 知
	0x5730:{区:35,点:47},	// 地
	0x5F1B:{区:35,点:48},	// 弛
	0x6065:{区:35,点:49},	// 恥
	0x667A:{区:35,点:50},	// 智
	0x6C60:{区:35,点:51},	// 池
	0x75F4:{区:35,点:52},	// 痴
	0x7A1A:{区:35,点:53},	// 稚
	0x7F6E:{区:35,点:54},	// 置
	0x81F4:{区:35,点:55},	// 致
	0x8718:{区:35,点:56},	// 蜘
	0x9045:{区:35,点:57},	// 遅
	0x99B3:{区:35,点:58},	// 馳
	0x7BC9:{区:35,点:59},	// 築
	0x755C:{区:35,点:60},	// 畜
	0x7AF9:{区:35,点:61},	// 竹
	0x7B51:{区:35,点:62},	// 筑
	0x84C4:{区:35,点:63},	// 蓄
	0x9010:{区:35,点:64},	// 逐
	0x79E9:{区:35,点:65},	// 秩
	0x7A92:{区:35,点:66},	// 窒
	0x8336:{区:35,点:67},	// 茶
	0x5AE1:{区:35,点:68},	// 嫡
	0x7740:{区:35,点:69},	// 着
	0x4E2D:{区:35,点:70},	// 中
	0x4EF2:{区:35,点:71},	// 仲
	0x5B99:{区:35,点:72},	// 宙
	0x5FE0:{区:35,点:73},	// 忠
	0x62BD:{区:35,点:74},	// 抽
	0x663C:{区:35,点:75},	// 昼
	0x67F1:{区:35,点:76},	// 柱
	0x6CE8:{区:35,点:77},	// 注
	0x866B:{区:35,点:78},	// 虫
	0x8877:{区:35,点:79},	// 衷
	0x8A3B:{区:35,点:80},	// 註
	0x914E:{区:35,点:81},	// 酎
	0x92F3:{区:35,点:82},	// 鋳
	0x99D0:{区:35,点:83},	// 駐
	0x6A17:{区:35,点:84},	// 樗
	0x7026:{区:35,点:85},	// 瀦
	0x732A:{区:35,点:86},	// 猪
	0x82E7:{区:35,点:87},	// 苧
	0x8457:{区:35,点:88},	// 著
	0x8CAF:{区:35,点:89},	// 貯
	0x4E01:{区:35,点:90},	// 丁
	0x5146:{区:35,点:91},	// 兆
	0x51CB:{区:35,点:92},	// 凋
	0x558B:{区:35,点:93},	// 喋
	0x5BF5:{区:35,点:94},	// 寵
	0x5E16:{区:36,点: 1},	// 帖
	0x5E33:{区:36,点: 2},	// 帳
	0x5E81:{区:36,点: 3},	// 庁
	0x5F14:{区:36,点: 4},	// 弔
	0x5F35:{区:36,点: 5},	// 張
	0x5F6B:{区:36,点: 6},	// 彫
	0x5FB4:{区:36,点: 7},	// 徴
	0x61F2:{区:36,点: 8},	// 懲
	0x6311:{区:36,点: 9},	// 挑
	0x66A2:{区:36,点:10},	// 暢
	0x671D:{区:36,点:11},	// 朝
	0x6F6E:{区:36,点:12},	// 潮
	0x7252:{区:36,点:13},	// 牒
	0x753A:{区:36,点:14},	// 町
	0x773A:{区:36,点:15},	// 眺
	0x8074:{区:36,点:16},	// 聴
	0x8139:{区:36,点:17},	// 脹
	0x8178:{区:36,点:18},	// 腸
	0x8776:{区:36,点:19},	// 蝶
	0x8ABF:{区:36,点:20},	// 調
	0x8ADC:{区:36,点:21},	// 諜
	0x8D85:{区:36,点:22},	// 超
	0x8DF3:{区:36,点:23},	// 跳
	0x929A:{区:36,点:24},	// 銚
	0x9577:{区:36,点:25},	// 長
	0x9802:{区:36,点:26},	// 頂
	0x9CE5:{区:36,点:27},	// 鳥
	0x52C5:{区:36,点:28},	// 勅
	0x6357:{区:36,点:29},	// 捗
	0x76F4:{区:36,点:30},	// 直
	0x6715:{区:36,点:31},	// 朕
	0x6C88:{区:36,点:32},	// 沈
	0x73CD:{区:36,点:33},	// 珍
	0x8CC3:{区:36,点:34},	// 賃
	0x93AE:{区:36,点:35},	// 鎮
	0x9673:{区:36,点:36},	// 陳
	0x6D25:{区:36,点:37},	// 津
	0x589C:{区:36,点:38},	// 墜
	0x690E:{区:36,点:39},	// 椎
	0x69CC:{区:36,点:40},	// 槌
	0x8FFD:{区:36,点:41},	// 追
	0x939A:{区:36,点:42},	// 鎚
	0x75DB:{区:36,点:43},	// 痛
	0x901A:{区:36,点:44},	// 通
	0x585A:{区:36,点:45},	// 塚
	0x6802:{区:36,点:46},	// 栂
	0x63B4:{区:36,点:47},	// 掴
	0x69FB:{区:36,点:48},	// 槻
	0x4F43:{区:36,点:49},	// 佃
	0x6F2C:{区:36,点:50},	// 漬
	0x67D8:{区:36,点:51},	// 柘
	0x8FBB:{区:36,点:52},	// 辻
	0x8526:{区:36,点:53},	// 蔦
	0x7DB4:{区:36,点:54},	// 綴
	0x9354:{区:36,点:55},	// 鍔
	0x693F:{区:36,点:56},	// 椿
	0x6F70:{区:36,点:57},	// 潰
	0x576A:{区:36,点:58},	// 坪
	0x58F7:{区:36,点:59},	// 壷
	0x5B2C:{区:36,点:60},	// 嬬
	0x7D2C:{区:36,点:61},	// 紬
	0x722A:{区:36,点:62},	// 爪
	0x540A:{区:36,点:63},	// 吊
	0x91E3:{区:36,点:64},	// 釣
	0x9DB4:{区:36,点:65},	// 鶴
	0x4EAD:{区:36,点:66},	// 亭
	0x4F4E:{区:36,点:67},	// 低
	0x505C:{区:36,点:68},	// 停
	0x5075:{区:36,点:69},	// 偵
	0x5243:{区:36,点:70},	// 剃
	0x8C9E:{区:36,点:71},	// 貞
	0x5448:{区:36,点:72},	// 呈
	0x5824:{区:36,点:73},	// 堤
	0x5B9A:{区:36,点:74},	// 定
	0x5E1D:{区:36,点:75},	// 帝
	0x5E95:{区:36,点:76},	// 底
	0x5EAD:{区:36,点:77},	// 庭
	0x5EF7:{区:36,点:78},	// 廷
	0x5F1F:{区:36,点:79},	// 弟
	0x608C:{区:36,点:80},	// 悌
	0x62B5:{区:36,点:81},	// 抵
	0x633A:{区:36,点:82},	// 挺
	0x63D0:{区:36,点:83},	// 提
	0x68AF:{区:36,点:84},	// 梯
	0x6C40:{区:36,点:85},	// 汀
	0x7887:{区:36,点:86},	// 碇
	0x798E:{区:36,点:87},	// 禎
	0x7A0B:{区:36,点:88},	// 程
	0x7DE0:{区:36,点:89},	// 締
	0x8247:{区:36,点:90},	// 艇
	0x8A02:{区:36,点:91},	// 訂
	0x8AE6:{区:36,点:92},	// 諦
	0x8E44:{区:36,点:93},	// 蹄
	0x9013:{区:36,点:94},	// 逓
	0x90B8:{区:37,点: 1},	// 邸
	0x912D:{区:37,点: 2},	// 鄭
	0x91D8:{区:37,点: 3},	// 釘
	0x9F0E:{区:37,点: 4},	// 鼎
	0x6CE5:{区:37,点: 5},	// 泥
	0x6458:{区:37,点: 6},	// 摘
	0x64E2:{区:37,点: 7},	// 擢
	0x6575:{区:37,点: 8},	// 敵
	0x6EF4:{区:37,点: 9},	// 滴
	0x7684:{区:37,点:10},	// 的
	0x7B1B:{区:37,点:11},	// 笛
	0x9069:{区:37,点:12},	// 適
	0x93D1:{区:37,点:13},	// 鏑
	0x6EBA:{区:37,点:14},	// 溺
	0x54F2:{区:37,点:15},	// 哲
	0x5FB9:{区:37,点:16},	// 徹
	0x64A4:{区:37,点:17},	// 撤
	0x8F4D:{区:37,点:18},	// 轍
	0x8FED:{区:37,点:19},	// 迭
	0x9244:{区:37,点:20},	// 鉄
	0x5178:{区:37,点:21},	// 典
	0x586B:{区:37,点:22},	// 填
	0x5929:{区:37,点:23},	// 天
	0x5C55:{区:37,点:24},	// 展
	0x5E97:{区:37,点:25},	// 店
	0x6DFB:{区:37,点:26},	// 添
	0x7E8F:{区:37,点:27},	// 纏
	0x751C:{区:37,点:28},	// 甜
	0x8CBC:{区:37,点:29},	// 貼
	0x8EE2:{区:37,点:30},	// 転
	0x985B:{区:37,点:31},	// 顛
	0x70B9:{区:37,点:32},	// 点
	0x4F1D:{区:37,点:33},	// 伝
	0x6BBF:{区:37,点:34},	// 殿
	0x6FB1:{区:37,点:35},	// 澱
	0x7530:{区:37,点:36},	// 田
	0x96FB:{区:37,点:37},	// 電
	0x514E:{区:37,点:38},	// 兎
	0x5410:{区:37,点:39},	// 吐
	0x5835:{区:37,点:40},	// 堵
	0x5857:{区:37,点:41},	// 塗
	0x59AC:{区:37,点:42},	// 妬
	0x5C60:{区:37,点:43},	// 屠
	0x5F92:{区:37,点:44},	// 徒
	0x6597:{区:37,点:45},	// 斗
	0x675C:{区:37,点:46},	// 杜
	0x6E21:{区:37,点:47},	// 渡
	0x767B:{区:37,点:48},	// 登
	0x83DF:{区:37,点:49},	// 菟
	0x8CED:{区:37,点:50},	// 賭
	0x9014:{区:37,点:51},	// 途
	0x90FD:{区:37,点:52},	// 都
	0x934D:{区:37,点:53},	// 鍍
	0x7825:{区:37,点:54},	// 砥
	0x783A:{区:37,点:55},	// 砺
	0x52AA:{区:37,点:56},	// 努
	0x5EA6:{区:37,点:57},	// 度
	0x571F:{区:37,点:58},	// 土
	0x5974:{区:37,点:59},	// 奴
	0x6012:{区:37,点:60},	// 怒
	0x5012:{区:37,点:61},	// 倒
	0x515A:{区:37,点:62},	// 党
	0x51AC:{区:37,点:63},	// 冬
	0x51CD:{区:37,点:64},	// 凍
	0x5200:{区:37,点:65},	// 刀
	0x5510:{区:37,点:66},	// 唐
	0x5854:{区:37,点:67},	// 塔
	0x5858:{区:37,点:68},	// 塘
	0x5957:{区:37,点:69},	// 套
	0x5B95:{区:37,点:70},	// 宕
	0x5CF6:{区:37,点:71},	// 島
	0x5D8B:{区:37,点:72},	// 嶋
	0x60BC:{区:37,点:73},	// 悼
	0x6295:{区:37,点:74},	// 投
	0x642D:{区:37,点:75},	// 搭
	0x6771:{区:37,点:76},	// 東
	0x6843:{区:37,点:77},	// 桃
	0x68BC:{区:37,点:78},	// 梼
	0x68DF:{区:37,点:79},	// 棟
	0x76D7:{区:37,点:80},	// 盗
	0x6DD8:{区:37,点:81},	// 淘
	0x6E6F:{区:37,点:82},	// 湯
	0x6D9B:{区:37,点:83},	// 涛
	0x706F:{区:37,点:84},	// 灯
	0x71C8:{区:37,点:85},	// 燈
	0x5F53:{区:37,点:86},	// 当
	0x75D8:{区:37,点:87},	// 痘
	0x7977:{区:37,点:88},	// 祷
	0x7B49:{区:37,点:89},	// 等
	0x7B54:{区:37,点:90},	// 答
	0x7B52:{区:37,点:91},	// 筒
	0x7CD6:{区:37,点:92},	// 糖
	0x7D71:{区:37,点:93},	// 統
	0x5230:{区:37,点:94},	// 到
	0x8463:{区:38,点: 1},	// 董
	0x8569:{区:38,点: 2},	// 蕩
	0x85E4:{区:38,点: 3},	// 藤
	0x8A0E:{区:38,点: 4},	// 討
	0x8B04:{区:38,点: 5},	// 謄
	0x8C46:{区:38,点: 6},	// 豆
	0x8E0F:{区:38,点: 7},	// 踏
	0x9003:{区:38,点: 8},	// 逃
	0x900F:{区:38,点: 9},	// 透
	0x9419:{区:38,点:10},	// 鐙
	0x9676:{区:38,点:11},	// 陶
	0x982D:{区:38,点:12},	// 頭
	0x9A30:{区:38,点:13},	// 騰
	0x95D8:{区:38,点:14},	// 闘
	0x50CD:{区:38,点:15},	// 働
	0x52D5:{区:38,点:16},	// 動
	0x540C:{区:38,点:17},	// 同
	0x5802:{区:38,点:18},	// 堂
	0x5C0E:{区:38,点:19},	// 導
	0x61A7:{区:38,点:20},	// 憧
	0x649E:{区:38,点:21},	// 撞
	0x6D1E:{区:38,点:22},	// 洞
	0x77B3:{区:38,点:23},	// 瞳
	0x7AE5:{区:38,点:24},	// 童
	0x80F4:{区:38,点:25},	// 胴
	0x8404:{区:38,点:26},	// 萄
	0x9053:{区:38,点:27},	// 道
	0x9285:{区:38,点:28},	// 銅
	0x5CE0:{区:38,点:29},	// 峠
	0x9D07:{区:38,点:30},	// 鴇
	0x533F:{区:38,点:31},	// 匿
	0x5F97:{区:38,点:32},	// 得
	0x5FB3:{区:38,点:33},	// 徳
	0x6D9C:{区:38,点:34},	// 涜
	0x7279:{区:38,点:35},	// 特
	0x7763:{区:38,点:36},	// 督
	0x79BF:{区:38,点:37},	// 禿
	0x7BE4:{区:38,点:38},	// 篤
	0x6BD2:{区:38,点:39},	// 毒
	0x72EC:{区:38,点:40},	// 独
	0x8AAD:{区:38,点:41},	// 読
	0x6803:{区:38,点:42},	// 栃
	0x6A61:{区:38,点:43},	// 橡
	0x51F8:{区:38,点:44},	// 凸
	0x7A81:{区:38,点:45},	// 突
	0x6934:{区:38,点:46},	// 椴
	0x5C4A:{区:38,点:47},	// 届
	0x9CF6:{区:38,点:48},	// 鳶
	0x82EB:{区:38,点:49},	// 苫
	0x5BC5:{区:38,点:50},	// 寅
	0x9149:{区:38,点:51},	// 酉
	0x701E:{区:38,点:52},	// 瀞
	0x5678:{区:38,点:53},	// 噸
	0x5C6F:{区:38,点:54},	// 屯
	0x60C7:{区:38,点:55},	// 惇
	0x6566:{区:38,点:56},	// 敦
	0x6C8C:{区:38,点:57},	// 沌
	0x8C5A:{区:38,点:58},	// 豚
	0x9041:{区:38,点:59},	// 遁
	0x9813:{区:38,点:60},	// 頓
	0x5451:{区:38,点:61},	// 呑
	0x66C7:{区:38,点:62},	// 曇
	0x920D:{区:38,点:63},	// 鈍
	0x5948:{区:38,点:64},	// 奈
	0x90A3:{区:38,点:65},	// 那
	0x5185:{区:38,点:66},	// 内
	0x4E4D:{区:38,点:67},	// 乍
	0x51EA:{区:38,点:68},	// 凪
	0x8599:{区:38,点:69},	// 薙
	0x8B0E:{区:38,点:70},	// 謎
	0x7058:{区:38,点:71},	// 灘
	0x637A:{区:38,点:72},	// 捺
	0x934B:{区:38,点:73},	// 鍋
	0x6962:{区:38,点:74},	// 楢
	0x99B4:{区:38,点:75},	// 馴
	0x7E04:{区:38,点:76},	// 縄
	0x7577:{区:38,点:77},	// 畷
	0x5357:{区:38,点:78},	// 南
	0x6960:{区:38,点:79},	// 楠
	0x8EDF:{区:38,点:80},	// 軟
	0x96E3:{区:38,点:81},	// 難
	0x6C5D:{区:38,点:82},	// 汝
	0x4E8C:{区:38,点:83},	// 二
	0x5C3C:{区:38,点:84},	// 尼
	0x5F10:{区:38,点:85},	// 弐
	0x8FE9:{区:38,点:86},	// 迩
	0x5302:{区:38,点:87},	// 匂
	0x8CD1:{区:38,点:88},	// 賑
	0x8089:{区:38,点:89},	// 肉
	0x8679:{区:38,点:90},	// 虹
	0x5EFF:{区:38,点:91},	// 廿
	0x65E5:{区:38,点:92},	// 日
	0x4E73:{区:38,点:93},	// 乳
	0x5165:{区:38,点:94},	// 入
	0x5982:{区:39,点: 1},	// 如
	0x5C3F:{区:39,点: 2},	// 尿
	0x97EE:{区:39,点: 3},	// 韮
	0x4EFB:{区:39,点: 4},	// 任
	0x598A:{区:39,点: 5},	// 妊
	0x5FCD:{区:39,点: 6},	// 忍
	0x8A8D:{区:39,点: 7},	// 認
	0x6FE1:{区:39,点: 8},	// 濡
	0x79B0:{区:39,点: 9},	// 禰
	0x7962:{区:39,点:10},	// 祢
	0x5BE7:{区:39,点:11},	// 寧
	0x8471:{区:39,点:12},	// 葱
	0x732B:{区:39,点:13},	// 猫
	0x71B1:{区:39,点:14},	// 熱
	0x5E74:{区:39,点:15},	// 年
	0x5FF5:{区:39,点:16},	// 念
	0x637B:{区:39,点:17},	// 捻
	0x649A:{区:39,点:18},	// 撚
	0x71C3:{区:39,点:19},	// 燃
	0x7C98:{区:39,点:20},	// 粘
	0x4E43:{区:39,点:21},	// 乃
	0x5EFC:{区:39,点:22},	// 廼
	0x4E4B:{区:39,点:23},	// 之
	0x57DC:{区:39,点:24},	// 埜
	0x56A2:{区:39,点:25},	// 嚢
	0x60A9:{区:39,点:26},	// 悩
	0x6FC3:{区:39,点:27},	// 濃
	0x7D0D:{区:39,点:28},	// 納
	0x80FD:{区:39,点:29},	// 能
	0x8133:{区:39,点:30},	// 脳
	0x81BF:{区:39,点:31},	// 膿
	0x8FB2:{区:39,点:32},	// 農
	0x8997:{区:39,点:33},	// 覗
	0x86A4:{区:39,点:34},	// 蚤
	0x5DF4:{区:39,点:35},	// 巴
	0x628A:{区:39,点:36},	// 把
	0x64AD:{区:39,点:37},	// 播
	0x8987:{区:39,点:38},	// 覇
	0x6777:{区:39,点:39},	// 杷
	0x6CE2:{区:39,点:40},	// 波
	0x6D3E:{区:39,点:41},	// 派
	0x7436:{区:39,点:42},	// 琶
	0x7834:{区:39,点:43},	// 破
	0x5A46:{区:39,点:44},	// 婆
	0x7F75:{区:39,点:45},	// 罵
	0x82AD:{区:39,点:46},	// 芭
	0x99AC:{区:39,点:47},	// 馬
	0x4FF3:{区:39,点:48},	// 俳
	0x5EC3:{区:39,点:49},	// 廃
	0x62DD:{区:39,点:50},	// 拝
	0x6392:{区:39,点:51},	// 排
	0x6557:{区:39,点:52},	// 敗
	0x676F:{区:39,点:53},	// 杯
	0x76C3:{区:39,点:54},	// 盃
	0x724C:{区:39,点:55},	// 牌
	0x80CC:{区:39,点:56},	// 背
	0x80BA:{区:39,点:57},	// 肺
	0x8F29:{区:39,点:58},	// 輩
	0x914D:{区:39,点:59},	// 配
	0x500D:{区:39,点:60},	// 倍
	0x57F9:{区:39,点:61},	// 培
	0x5A92:{区:39,点:62},	// 媒
	0x6885:{区:39,点:63},	// 梅
	0x6973:{区:39,点:64},	// 楳
	0x7164:{区:39,点:65},	// 煤
	0x72FD:{区:39,点:66},	// 狽
	0x8CB7:{区:39,点:67},	// 買
	0x58F2:{区:39,点:68},	// 売
	0x8CE0:{区:39,点:69},	// 賠
	0x966A:{区:39,点:70},	// 陪
	0x9019:{区:39,点:71},	// 這
	0x877F:{区:39,点:72},	// 蝿
	0x79E4:{区:39,点:73},	// 秤
	0x77E7:{区:39,点:74},	// 矧
	0x8429:{区:39,点:75},	// 萩
	0x4F2F:{区:39,点:76},	// 伯
	0x5265:{区:39,点:77},	// 剥
	0x535A:{区:39,点:78},	// 博
	0x62CD:{区:39,点:79},	// 拍
	0x67CF:{区:39,点:80},	// 柏
	0x6CCA:{区:39,点:81},	// 泊
	0x767D:{区:39,点:82},	// 白
	0x7B94:{区:39,点:83},	// 箔
	0x7C95:{区:39,点:84},	// 粕
	0x8236:{区:39,点:85},	// 舶
	0x8584:{区:39,点:86},	// 薄
	0x8FEB:{区:39,点:87},	// 迫
	0x66DD:{区:39,点:88},	// 曝
	0x6F20:{区:39,点:89},	// 漠
	0x7206:{区:39,点:90},	// 爆
	0x7E1B:{区:39,点:91},	// 縛
	0x83AB:{区:39,点:92},	// 莫
	0x99C1:{区:39,点:93},	// 駁
	0x9EA6:{区:39,点:94},	// 麦
	0x51FD:{区:40,点: 1},	// 函
	0x7BB1:{区:40,点: 2},	// 箱
	0x7872:{区:40,点: 3},	// 硲
	0x7BB8:{区:40,点: 4},	// 箸
	0x8087:{区:40,点: 5},	// 肇
	0x7B48:{区:40,点: 6},	// 筈
	0x6AE8:{区:40,点: 7},	// 櫨
	0x5E61:{区:40,点: 8},	// 幡
	0x808C:{区:40,点: 9},	// 肌
	0x7551:{区:40,点:10},	// 畑
	0x7560:{区:40,点:11},	// 畠
	0x516B:{区:40,点:12},	// 八
	0x9262:{区:40,点:13},	// 鉢
	0x6E8C:{区:40,点:14},	// 溌
	0x767A:{区:40,点:15},	// 発
	0x9197:{区:40,点:16},	// 醗
	0x9AEA:{区:40,点:17},	// 髪
	0x4F10:{区:40,点:18},	// 伐
	0x7F70:{区:40,点:19},	// 罰
	0x629C:{区:40,点:20},	// 抜
	0x7B4F:{区:40,点:21},	// 筏
	0x95A5:{区:40,点:22},	// 閥
	0x9CE9:{区:40,点:23},	// 鳩
	0x567A:{区:40,点:24},	// 噺
	0x5859:{区:40,点:25},	// 塙
	0x86E4:{区:40,点:26},	// 蛤
	0x96BC:{区:40,点:27},	// 隼
	0x4F34:{区:40,点:28},	// 伴
	0x5224:{区:40,点:29},	// 判
	0x534A:{区:40,点:30},	// 半
	0x53CD:{区:40,点:31},	// 反
	0x53DB:{区:40,点:32},	// 叛
	0x5E06:{区:40,点:33},	// 帆
	0x642C:{区:40,点:34},	// 搬
	0x6591:{区:40,点:35},	// 斑
	0x677F:{区:40,点:36},	// 板
	0x6C3E:{区:40,点:37},	// 氾
	0x6C4E:{区:40,点:38},	// 汎
	0x7248:{区:40,点:39},	// 版
	0x72AF:{区:40,点:40},	// 犯
	0x73ED:{区:40,点:41},	// 班
	0x7554:{区:40,点:42},	// 畔
	0x7E41:{区:40,点:43},	// 繁
	0x822C:{区:40,点:44},	// 般
	0x85E9:{区:40,点:45},	// 藩
	0x8CA9:{区:40,点:46},	// 販
	0x7BC4:{区:40,点:47},	// 範
	0x91C6:{区:40,点:48},	// 釆
	0x7169:{区:40,点:49},	// 煩
	0x9812:{区:40,点:50},	// 頒
	0x98EF:{区:40,点:51},	// 飯
	0x633D:{区:40,点:52},	// 挽
	0x6669:{区:40,点:53},	// 晩
	0x756A:{区:40,点:54},	// 番
	0x76E4:{区:40,点:55},	// 盤
	0x78D0:{区:40,点:56},	// 磐
	0x8543:{区:40,点:57},	// 蕃
	0x86EE:{区:40,点:58},	// 蛮
	0x532A:{区:40,点:59},	// 匪
	0x5351:{区:40,点:60},	// 卑
	0x5426:{区:40,点:61},	// 否
	0x5983:{区:40,点:62},	// 妃
	0x5E87:{区:40,点:63},	// 庇
	0x5F7C:{区:40,点:64},	// 彼
	0x60B2:{区:40,点:65},	// 悲
	0x6249:{区:40,点:66},	// 扉
	0x6279:{区:40,点:67},	// 批
	0x62AB:{区:40,点:68},	// 披
	0x6590:{区:40,点:69},	// 斐
	0x6BD4:{区:40,点:70},	// 比
	0x6CCC:{区:40,点:71},	// 泌
	0x75B2:{区:40,点:72},	// 疲
	0x76AE:{区:40,点:73},	// 皮
	0x7891:{区:40,点:74},	// 碑
	0x79D8:{区:40,点:75},	// 秘
	0x7DCB:{区:40,点:76},	// 緋
	0x7F77:{区:40,点:77},	// 罷
	0x80A5:{区:40,点:78},	// 肥
	0x88AB:{区:40,点:79},	// 被
	0x8AB9:{区:40,点:80},	// 誹
	0x8CBB:{区:40,点:81},	// 費
	0x907F:{区:40,点:82},	// 避
	0x975E:{区:40,点:83},	// 非
	0x98DB:{区:40,点:84},	// 飛
	0x6A0B:{区:40,点:85},	// 樋
	0x7C38:{区:40,点:86},	// 簸
	0x5099:{区:40,点:87},	// 備
	0x5C3E:{区:40,点:88},	// 尾
	0x5FAE:{区:40,点:89},	// 微
	0x6787:{区:40,点:90},	// 枇
	0x6BD8:{区:40,点:91},	// 毘
	0x7435:{区:40,点:92},	// 琵
	0x7709:{区:40,点:93},	// 眉
	0x7F8E:{区:40,点:94},	// 美
	0x9F3B:{区:41,点: 1},	// 鼻
	0x67CA:{区:41,点: 2},	// 柊
	0x7A17:{区:41,点: 3},	// 稗
	0x5339:{区:41,点: 4},	// 匹
	0x758B:{区:41,点: 5},	// 疋
	0x9AED:{区:41,点: 6},	// 髭
	0x5F66:{区:41,点: 7},	// 彦
	0x819D:{区:41,点: 8},	// 膝
	0x83F1:{区:41,点: 9},	// 菱
	0x8098:{区:41,点:10},	// 肘
	0x5F3C:{区:41,点:11},	// 弼
	0x5FC5:{区:41,点:12},	// 必
	0x7562:{区:41,点:13},	// 畢
	0x7B46:{区:41,点:14},	// 筆
	0x903C:{区:41,点:15},	// 逼
	0x6867:{区:41,点:16},	// 桧
	0x59EB:{区:41,点:17},	// 姫
	0x5A9B:{区:41,点:18},	// 媛
	0x7D10:{区:41,点:19},	// 紐
	0x767E:{区:41,点:20},	// 百
	0x8B2C:{区:41,点:21},	// 謬
	0x4FF5:{区:41,点:22},	// 俵
	0x5F6A:{区:41,点:23},	// 彪
	0x6A19:{区:41,点:24},	// 標
	0x6C37:{区:41,点:25},	// 氷
	0x6F02:{区:41,点:26},	// 漂
	0x74E2:{区:41,点:27},	// 瓢
	0x7968:{区:41,点:28},	// 票
	0x8868:{区:41,点:29},	// 表
	0x8A55:{区:41,点:30},	// 評
	0x8C79:{区:41,点:31},	// 豹
	0x5EDF:{区:41,点:32},	// 廟
	0x63CF:{区:41,点:33},	// 描
	0x75C5:{区:41,点:34},	// 病
	0x79D2:{区:41,点:35},	// 秒
	0x82D7:{区:41,点:36},	// 苗
	0x9328:{区:41,点:37},	// 錨
	0x92F2:{区:41,点:38},	// 鋲
	0x849C:{区:41,点:39},	// 蒜
	0x86ED:{区:41,点:40},	// 蛭
	0x9C2D:{区:41,点:41},	// 鰭
	0x54C1:{区:41,点:42},	// 品
	0x5F6C:{区:41,点:43},	// 彬
	0x658C:{区:41,点:44},	// 斌
	0x6D5C:{区:41,点:45},	// 浜
	0x7015:{区:41,点:46},	// 瀕
	0x8CA7:{区:41,点:47},	// 貧
	0x8CD3:{区:41,点:48},	// 賓
	0x983B:{区:41,点:49},	// 頻
	0x654F:{区:41,点:50},	// 敏
	0x74F6:{区:41,点:51},	// 瓶
	0x4E0D:{区:41,点:52},	// 不
	0x4ED8:{区:41,点:53},	// 付
	0x57E0:{区:41,点:54},	// 埠
	0x592B:{区:41,点:55},	// 夫
	0x5A66:{区:41,点:56},	// 婦
	0x5BCC:{区:41,点:57},	// 富
	0x51A8:{区:41,点:58},	// 冨
	0x5E03:{区:41,点:59},	// 布
	0x5E9C:{区:41,点:60},	// 府
	0x6016:{区:41,点:61},	// 怖
	0x6276:{区:41,点:62},	// 扶
	0x6577:{区:41,点:63},	// 敷
	0x65A7:{区:41,点:64},	// 斧
	0x666E:{区:41,点:65},	// 普
	0x6D6E:{区:41,点:66},	// 浮
	0x7236:{区:41,点:67},	// 父
	0x7B26:{区:41,点:68},	// 符
	0x8150:{区:41,点:69},	// 腐
	0x819A:{区:41,点:70},	// 膚
	0x8299:{区:41,点:71},	// 芙
	0x8B5C:{区:41,点:72},	// 譜
	0x8CA0:{区:41,点:73},	// 負
	0x8CE6:{区:41,点:74},	// 賦
	0x8D74:{区:41,点:75},	// 赴
	0x961C:{区:41,点:76},	// 阜
	0x9644:{区:41,点:77},	// 附
	0x4FAE:{区:41,点:78},	// 侮
	0x64AB:{区:41,点:79},	// 撫
	0x6B66:{区:41,点:80},	// 武
	0x821E:{区:41,点:81},	// 舞
	0x8461:{区:41,点:82},	// 葡
	0x856A:{区:41,点:83},	// 蕪
	0x90E8:{区:41,点:84},	// 部
	0x5C01:{区:41,点:85},	// 封
	0x6953:{区:41,点:86},	// 楓
	0x98A8:{区:41,点:87},	// 風
	0x847A:{区:41,点:88},	// 葺
	0x8557:{区:41,点:89},	// 蕗
	0x4F0F:{区:41,点:90},	// 伏
	0x526F:{区:41,点:91},	// 副
	0x5FA9:{区:41,点:92},	// 復
	0x5E45:{区:41,点:93},	// 幅
	0x670D:{区:41,点:94},	// 服
	0x798F:{区:42,点: 1},	// 福
	0x8179:{区:42,点: 2},	// 腹
	0x8907:{区:42,点: 3},	// 複
	0x8986:{区:42,点: 4},	// 覆
	0x6DF5:{区:42,点: 5},	// 淵
	0x5F17:{区:42,点: 6},	// 弗
	0x6255:{区:42,点: 7},	// 払
	0x6CB8:{区:42,点: 8},	// 沸
	0x4ECF:{区:42,点: 9},	// 仏
	0x7269:{区:42,点:10},	// 物
	0x9B92:{区:42,点:11},	// 鮒
	0x5206:{区:42,点:12},	// 分
	0x543B:{区:42,点:13},	// 吻
	0x5674:{区:42,点:14},	// 噴
	0x58B3:{区:42,点:15},	// 墳
	0x61A4:{区:42,点:16},	// 憤
	0x626E:{区:42,点:17},	// 扮
	0x711A:{区:42,点:18},	// 焚
	0x596E:{区:42,点:19},	// 奮
	0x7C89:{区:42,点:20},	// 粉
	0x7CDE:{区:42,点:21},	// 糞
	0x7D1B:{区:42,点:22},	// 紛
	0x96F0:{区:42,点:23},	// 雰
	0x6587:{区:42,点:24},	// 文
	0x805E:{区:42,点:25},	// 聞
	0x4E19:{区:42,点:26},	// 丙
	0x4F75:{区:42,点:27},	// 併
	0x5175:{区:42,点:28},	// 兵
	0x5840:{区:42,点:29},	// 塀
	0x5E63:{区:42,点:30},	// 幣
	0x5E73:{区:42,点:31},	// 平
	0x5F0A:{区:42,点:32},	// 弊
	0x67C4:{区:42,点:33},	// 柄
	0x4E26:{区:42,点:34},	// 並
	0x853D:{区:42,点:35},	// 蔽
	0x9589:{区:42,点:36},	// 閉
	0x965B:{区:42,点:37},	// 陛
	0x7C73:{区:42,点:38},	// 米
	0x9801:{区:42,点:39},	// 頁
	0x50FB:{区:42,点:40},	// 僻
	0x58C1:{区:42,点:41},	// 壁
	0x7656:{区:42,点:42},	// 癖
	0x78A7:{区:42,点:43},	// 碧
	0x5225:{区:42,点:44},	// 別
	0x77A5:{区:42,点:45},	// 瞥
	0x8511:{区:42,点:46},	// 蔑
	0x7B86:{区:42,点:47},	// 箆
	0x504F:{区:42,点:48},	// 偏
	0x5909:{区:42,点:49},	// 変
	0x7247:{区:42,点:50},	// 片
	0x7BC7:{区:42,点:51},	// 篇
	0x7DE8:{区:42,点:52},	// 編
	0x8FBA:{区:42,点:53},	// 辺
	0x8FD4:{区:42,点:54},	// 返
	0x904D:{区:42,点:55},	// 遍
	0x4FBF:{区:42,点:56},	// 便
	0x52C9:{区:42,点:57},	// 勉
	0x5A29:{区:42,点:58},	// 娩
	0x5F01:{区:42,点:59},	// 弁
	0x97AD:{区:42,点:60},	// 鞭
	0x4FDD:{区:42,点:61},	// 保
	0x8217:{区:42,点:62},	// 舗
	0x92EA:{区:42,点:63},	// 鋪
	0x5703:{区:42,点:64},	// 圃
	0x6355:{区:42,点:65},	// 捕
	0x6B69:{区:42,点:66},	// 歩
	0x752B:{区:42,点:67},	// 甫
	0x88DC:{区:42,点:68},	// 補
	0x8F14:{区:42,点:69},	// 輔
	0x7A42:{区:42,点:70},	// 穂
	0x52DF:{区:42,点:71},	// 募
	0x5893:{区:42,点:72},	// 墓
	0x6155:{区:42,点:73},	// 慕
	0x620A:{区:42,点:74},	// 戊
	0x66AE:{区:42,点:75},	// 暮
	0x6BCD:{区:42,点:76},	// 母
	0x7C3F:{区:42,点:77},	// 簿
	0x83E9:{区:42,点:78},	// 菩
	0x5023:{区:42,点:79},	// 倣
	0x4FF8:{区:42,点:80},	// 俸
	0x5305:{区:42,点:81},	// 包
	0x5446:{区:42,点:82},	// 呆
	0x5831:{区:42,点:83},	// 報
	0x5949:{区:42,点:84},	// 奉
	0x5B9D:{区:42,点:85},	// 宝
	0x5CF0:{区:42,点:86},	// 峰
	0x5CEF:{区:42,点:87},	// 峯
	0x5D29:{区:42,点:88},	// 崩
	0x5E96:{区:42,点:89},	// 庖
	0x62B1:{区:42,点:90},	// 抱
	0x6367:{区:42,点:91},	// 捧
	0x653E:{区:42,点:92},	// 放
	0x65B9:{区:42,点:93},	// 方
	0x670B:{区:42,点:94},	// 朋
	0x6CD5:{区:43,点: 1},	// 法
	0x6CE1:{区:43,点: 2},	// 泡
	0x70F9:{区:43,点: 3},	// 烹
	0x7832:{区:43,点: 4},	// 砲
	0x7E2B:{区:43,点: 5},	// 縫
	0x80DE:{区:43,点: 6},	// 胞
	0x82B3:{区:43,点: 7},	// 芳
	0x840C:{区:43,点: 8},	// 萌
	0x84EC:{区:43,点: 9},	// 蓬
	0x8702:{区:43,点:10},	// 蜂
	0x8912:{区:43,点:11},	// 褒
	0x8A2A:{区:43,点:12},	// 訪
	0x8C4A:{区:43,点:13},	// 豊
	0x90A6:{区:43,点:14},	// 邦
	0x92D2:{区:43,点:15},	// 鋒
	0x98FD:{区:43,点:16},	// 飽
	0x9CF3:{区:43,点:17},	// 鳳
	0x9D6C:{区:43,点:18},	// 鵬
	0x4E4F:{区:43,点:19},	// 乏
	0x4EA1:{区:43,点:20},	// 亡
	0x508D:{区:43,点:21},	// 傍
	0x5256:{区:43,点:22},	// 剖
	0x574A:{区:43,点:23},	// 坊
	0x59A8:{区:43,点:24},	// 妨
	0x5E3D:{区:43,点:25},	// 帽
	0x5FD8:{区:43,点:26},	// 忘
	0x5FD9:{区:43,点:27},	// 忙
	0x623F:{区:43,点:28},	// 房
	0x66B4:{区:43,点:29},	// 暴
	0x671B:{区:43,点:30},	// 望
	0x67D0:{区:43,点:31},	// 某
	0x68D2:{区:43,点:32},	// 棒
	0x5192:{区:43,点:33},	// 冒
	0x7D21:{区:43,点:34},	// 紡
	0x80AA:{区:43,点:35},	// 肪
	0x81A8:{区:43,点:36},	// 膨
	0x8B00:{区:43,点:37},	// 謀
	0x8C8C:{区:43,点:38},	// 貌
	0x8CBF:{区:43,点:39},	// 貿
	0x927E:{区:43,点:40},	// 鉾
	0x9632:{区:43,点:41},	// 防
	0x5420:{区:43,点:42},	// 吠
	0x982C:{区:43,点:43},	// 頬
	0x5317:{区:43,点:44},	// 北
	0x50D5:{区:43,点:45},	// 僕
	0x535C:{区:43,点:46},	// 卜
	0x58A8:{区:43,点:47},	// 墨
	0x64B2:{区:43,点:48},	// 撲
	0x6734:{区:43,点:49},	// 朴
	0x7267:{区:43,点:50},	// 牧
	0x7766:{区:43,点:51},	// 睦
	0x7A46:{区:43,点:52},	// 穆
	0x91E6:{区:43,点:53},	// 釦
	0x52C3:{区:43,点:54},	// 勃
	0x6CA1:{区:43,点:55},	// 没
	0x6B86:{区:43,点:56},	// 殆
	0x5800:{区:43,点:57},	// 堀
	0x5E4C:{区:43,点:58},	// 幌
	0x5954:{区:43,点:59},	// 奔
	0x672C:{区:43,点:60},	// 本
	0x7FFB:{区:43,点:61},	// 翻
	0x51E1:{区:43,点:62},	// 凡
	0x76C6:{区:43,点:63},	// 盆
	0x6469:{区:43,点:64},	// 摩
	0x78E8:{区:43,点:65},	// 磨
	0x9B54:{区:43,点:66},	// 魔
	0x9EBB:{区:43,点:67},	// 麻
	0x57CB:{区:43,点:68},	// 埋
	0x59B9:{区:43,点:69},	// 妹
	0x6627:{区:43,点:70},	// 昧
	0x679A:{区:43,点:71},	// 枚
	0x6BCE:{区:43,点:72},	// 毎
	0x54E9:{区:43,点:73},	// 哩
	0x69D9:{区:43,点:74},	// 槙
	0x5E55:{区:43,点:75},	// 幕
	0x819C:{区:43,点:76},	// 膜
	0x6795:{区:43,点:77},	// 枕
	0x9BAA:{区:43,点:78},	// 鮪
	0x67FE:{区:43,点:79},	// 柾
	0x9C52:{区:43,点:80},	// 鱒
	0x685D:{区:43,点:81},	// 桝
	0x4EA6:{区:43,点:82},	// 亦
	0x4FE3:{区:43,点:83},	// 俣
	0x53C8:{区:43,点:84},	// 又
	0x62B9:{区:43,点:85},	// 抹
	0x672B:{区:43,点:86},	// 末
	0x6CAB:{区:43,点:87},	// 沫
	0x8FC4:{区:43,点:88},	// 迄
	0x4FAD:{区:43,点:89},	// 侭
	0x7E6D:{区:43,点:90},	// 繭
	0x9EBF:{区:43,点:91},	// 麿
	0x4E07:{区:43,点:92},	// 万
	0x6162:{区:43,点:93},	// 慢
	0x6E80:{区:43,点:94},	// 満
	0x6F2B:{区:44,点: 1},	// 漫
	0x8513:{区:44,点: 2},	// 蔓
	0x5473:{区:44,点: 3},	// 味
	0x672A:{区:44,点: 4},	// 未
	0x9B45:{区:44,点: 5},	// 魅
	0x5DF3:{区:44,点: 6},	// 巳
	0x7B95:{区:44,点: 7},	// 箕
	0x5CAC:{区:44,点: 8},	// 岬
	0x5BC6:{区:44,点: 9},	// 密
	0x871C:{区:44,点:10},	// 蜜
	0x6E4A:{区:44,点:11},	// 湊
	0x84D1:{区:44,点:12},	// 蓑
	0x7A14:{区:44,点:13},	// 稔
	0x8108:{区:44,点:14},	// 脈
	0x5999:{区:44,点:15},	// 妙
	0x7C8D:{区:44,点:16},	// 粍
	0x6C11:{区:44,点:17},	// 民
	0x7720:{区:44,点:18},	// 眠
	0x52D9:{区:44,点:19},	// 務
	0x5922:{区:44,点:20},	// 夢
	0x7121:{区:44,点:21},	// 無
	0x725F:{区:44,点:22},	// 牟
	0x77DB:{区:44,点:23},	// 矛
	0x9727:{区:44,点:24},	// 霧
	0x9D61:{区:44,点:25},	// 鵡
	0x690B:{区:44,点:26},	// 椋
	0x5A7F:{区:44,点:27},	// 婿
	0x5A18:{区:44,点:28},	// 娘
	0x51A5:{区:44,点:29},	// 冥
	0x540D:{区:44,点:30},	// 名
	0x547D:{区:44,点:31},	// 命
	0x660E:{区:44,点:32},	// 明
	0x76DF:{区:44,点:33},	// 盟
	0x8FF7:{区:44,点:34},	// 迷
	0x9298:{区:44,点:35},	// 銘
	0x9CF4:{区:44,点:36},	// 鳴
	0x59EA:{区:44,点:37},	// 姪
	0x725D:{区:44,点:38},	// 牝
	0x6EC5:{区:44,点:39},	// 滅
	0x514D:{区:44,点:40},	// 免
	0x68C9:{区:44,点:41},	// 棉
	0x7DBF:{区:44,点:42},	// 綿
	0x7DEC:{区:44,点:43},	// 緬
	0x9762:{区:44,点:44},	// 面
	0x9EBA:{区:44,点:45},	// 麺
	0x6478:{区:44,点:46},	// 摸
	0x6A21:{区:44,点:47},	// 模
	0x8302:{区:44,点:48},	// 茂
	0x5984:{区:44,点:49},	// 妄
	0x5B5F:{区:44,点:50},	// 孟
	0x6BDB:{区:44,点:51},	// 毛
	0x731B:{区:44,点:52},	// 猛
	0x76F2:{区:44,点:53},	// 盲
	0x7DB2:{区:44,点:54},	// 網
	0x8017:{区:44,点:55},	// 耗
	0x8499:{区:44,点:56},	// 蒙
	0x5132:{区:44,点:57},	// 儲
	0x6728:{区:44,点:58},	// 木
	0x9ED9:{区:44,点:59},	// 黙
	0x76EE:{区:44,点:60},	// 目
	0x6762:{区:44,点:61},	// 杢
	0x52FF:{区:44,点:62},	// 勿
	0x9905:{区:44,点:63},	// 餅
	0x5C24:{区:44,点:64},	// 尤
	0x623B:{区:44,点:65},	// 戻
	0x7C7E:{区:44,点:66},	// 籾
	0x8CB0:{区:44,点:67},	// 貰
	0x554F:{区:44,点:68},	// 問
	0x60B6:{区:44,点:69},	// 悶
	0x7D0B:{区:44,点:70},	// 紋
	0x9580:{区:44,点:71},	// 門
	0x5301:{区:44,点:72},	// 匁
	0x4E5F:{区:44,点:73},	// 也
	0x51B6:{区:44,点:74},	// 冶
	0x591C:{区:44,点:75},	// 夜
	0x723A:{区:44,点:76},	// 爺
	0x8036:{区:44,点:77},	// 耶
	0x91CE:{区:44,点:78},	// 野
	0x5F25:{区:44,点:79},	// 弥
	0x77E2:{区:44,点:80},	// 矢
	0x5384:{区:44,点:81},	// 厄
	0x5F79:{区:44,点:82},	// 役
	0x7D04:{区:44,点:83},	// 約
	0x85AC:{区:44,点:84},	// 薬
	0x8A33:{区:44,点:85},	// 訳
	0x8E8D:{区:44,点:86},	// 躍
	0x9756:{区:44,点:87},	// 靖
	0x67F3:{区:44,点:88},	// 柳
	0x85AE:{区:44,点:89},	// 薮
	0x9453:{区:44,点:90},	// 鑓
	0x6109:{区:44,点:91},	// 愉
	0x6108:{区:44,点:92},	// 愈
	0x6CB9:{区:44,点:93},	// 油
	0x7652:{区:44,点:94},	// 癒
	0x8AED:{区:45,点: 1},	// 諭
	0x8F38:{区:45,点: 2},	// 輸
	0x552F:{区:45,点: 3},	// 唯
	0x4F51:{区:45,点: 4},	// 佑
	0x512A:{区:45,点: 5},	// 優
	0x52C7:{区:45,点: 6},	// 勇
	0x53CB:{区:45,点: 7},	// 友
	0x5BA5:{区:45,点: 8},	// 宥
	0x5E7D:{区:45,点: 9},	// 幽
	0x60A0:{区:45,点:10},	// 悠
	0x6182:{区:45,点:11},	// 憂
	0x63D6:{区:45,点:12},	// 揖
	0x6709:{区:45,点:13},	// 有
	0x67DA:{区:45,点:14},	// 柚
	0x6E67:{区:45,点:15},	// 湧
	0x6D8C:{区:45,点:16},	// 涌
	0x7336:{区:45,点:17},	// 猶
	0x7337:{区:45,点:18},	// 猷
	0x7531:{区:45,点:19},	// 由
	0x7950:{区:45,点:20},	// 祐
	0x88D5:{区:45,点:21},	// 裕
	0x8A98:{区:45,点:22},	// 誘
	0x904A:{区:45,点:23},	// 遊
	0x9091:{区:45,点:24},	// 邑
	0x90F5:{区:45,点:25},	// 郵
	0x96C4:{区:45,点:26},	// 雄
	0x878D:{区:45,点:27},	// 融
	0x5915:{区:45,点:28},	// 夕
	0x4E88:{区:45,点:29},	// 予
	0x4F59:{区:45,点:30},	// 余
	0x4E0E:{区:45,点:31},	// 与
	0x8A89:{区:45,点:32},	// 誉
	0x8F3F:{区:45,点:33},	// 輿
	0x9810:{区:45,点:34},	// 預
	0x50AD:{区:45,点:35},	// 傭
	0x5E7C:{区:45,点:36},	// 幼
	0x5996:{区:45,点:37},	// 妖
	0x5BB9:{区:45,点:38},	// 容
	0x5EB8:{区:45,点:39},	// 庸
	0x63DA:{区:45,点:40},	// 揚
	0x63FA:{区:45,点:41},	// 揺
	0x64C1:{区:45,点:42},	// 擁
	0x66DC:{区:45,点:43},	// 曜
	0x694A:{区:45,点:44},	// 楊
	0x69D8:{区:45,点:45},	// 様
	0x6D0B:{区:45,点:46},	// 洋
	0x6EB6:{区:45,点:47},	// 溶
	0x7194:{区:45,点:48},	// 熔
	0x7528:{区:45,点:49},	// 用
	0x7AAF:{区:45,点:50},	// 窯
	0x7F8A:{区:45,点:51},	// 羊
	0x8000:{区:45,点:52},	// 耀
	0x8449:{区:45,点:53},	// 葉
	0x84C9:{区:45,点:54},	// 蓉
	0x8981:{区:45,点:55},	// 要
	0x8B21:{区:45,点:56},	// 謡
	0x8E0A:{区:45,点:57},	// 踊
	0x9065:{区:45,点:58},	// 遥
	0x967D:{区:45,点:59},	// 陽
	0x990A:{区:45,点:60},	// 養
	0x617E:{区:45,点:61},	// 慾
	0x6291:{区:45,点:62},	// 抑
	0x6B32:{区:45,点:63},	// 欲
	0x6C83:{区:45,点:64},	// 沃
	0x6D74:{区:45,点:65},	// 浴
	0x7FCC:{区:45,点:66},	// 翌
	0x7FFC:{区:45,点:67},	// 翼
	0x6DC0:{区:45,点:68},	// 淀
	0x7F85:{区:45,点:69},	// 羅
	0x87BA:{区:45,点:70},	// 螺
	0x88F8:{区:45,点:71},	// 裸
	0x6765:{区:45,点:72},	// 来
	0x83B1:{区:45,点:73},	// 莱
	0x983C:{区:45,点:74},	// 頼
	0x96F7:{区:45,点:75},	// 雷
	0x6D1B:{区:45,点:76},	// 洛
	0x7D61:{区:45,点:77},	// 絡
	0x843D:{区:45,点:78},	// 落
	0x916A:{区:45,点:79},	// 酪
	0x4E71:{区:45,点:80},	// 乱
	0x5375:{区:45,点:81},	// 卵
	0x5D50:{区:45,点:82},	// 嵐
	0x6B04:{区:45,点:83},	// 欄
	0x6FEB:{区:45,点:84},	// 濫
	0x85CD:{区:45,点:85},	// 藍
	0x862D:{区:45,点:86},	// 蘭
	0x89A7:{区:45,点:87},	// 覧
	0x5229:{区:45,点:88},	// 利
	0x540F:{区:45,点:89},	// 吏
	0x5C65:{区:45,点:90},	// 履
	0x674E:{区:45,点:91},	// 李
	0x68A8:{区:45,点:92},	// 梨
	0x7406:{区:45,点:93},	// 理
	0x7483:{区:45,点:94},	// 璃
	0x75E2:{区:46,点: 1},	// 痢
	0x88CF:{区:46,点: 2},	// 裏
	0x88E1:{区:46,点: 3},	// 裡
	0x91CC:{区:46,点: 4},	// 里
	0x96E2:{区:46,点: 5},	// 離
	0x9678:{区:46,点: 6},	// 陸
	0x5F8B:{区:46,点: 7},	// 律
	0x7387:{区:46,点: 8},	// 率
	0x7ACB:{区:46,点: 9},	// 立
	0x844E:{区:46,点:10},	// 葎
	0x63A0:{区:46,点:11},	// 掠
	0x7565:{区:46,点:12},	// 略
	0x5289:{区:46,点:13},	// 劉
	0x6D41:{区:46,点:14},	// 流
	0x6E9C:{区:46,点:15},	// 溜
	0x7409:{区:46,点:16},	// 琉
	0x7559:{区:46,点:17},	// 留
	0x786B:{区:46,点:18},	// 硫
	0x7C92:{区:46,点:19},	// 粒
	0x9686:{区:46,点:20},	// 隆
	0x7ADC:{区:46,点:21},	// 竜
	0x9F8D:{区:46,点:22},	// 龍
	0x4FB6:{区:46,点:23},	// 侶
	0x616E:{区:46,点:24},	// 慮
	0x65C5:{区:46,点:25},	// 旅
	0x865C:{区:46,点:26},	// 虜
	0x4E86:{区:46,点:27},	// 了
	0x4EAE:{区:46,点:28},	// 亮
	0x50DA:{区:46,点:29},	// 僚
	0x4E21:{区:46,点:30},	// 両
	0x51CC:{区:46,点:31},	// 凌
	0x5BEE:{区:46,点:32},	// 寮
	0x6599:{区:46,点:33},	// 料
	0x6881:{区:46,点:34},	// 梁
	0x6DBC:{区:46,点:35},	// 涼
	0x731F:{区:46,点:36},	// 猟
	0x7642:{区:46,点:37},	// 療
	0x77AD:{区:46,点:38},	// 瞭
	0x7A1C:{区:46,点:39},	// 稜
	0x7CE7:{区:46,点:40},	// 糧
	0x826F:{区:46,点:41},	// 良
	0x8AD2:{区:46,点:42},	// 諒
	0x907C:{区:46,点:43},	// 遼
	0x91CF:{区:46,点:44},	// 量
	0x9675:{区:46,点:45},	// 陵
	0x9818:{区:46,点:46},	// 領
	0x529B:{区:46,点:47},	// 力
	0x7DD1:{区:46,点:48},	// 緑
	0x502B:{区:46,点:49},	// 倫
	0x5398:{区:46,点:50},	// 厘
	0x6797:{区:46,点:51},	// 林
	0x6DCB:{区:46,点:52},	// 淋
	0x71D0:{区:46,点:53},	// 燐
	0x7433:{区:46,点:54},	// 琳
	0x81E8:{区:46,点:55},	// 臨
	0x8F2A:{区:46,点:56},	// 輪
	0x96A3:{区:46,点:57},	// 隣
	0x9C57:{区:46,点:58},	// 鱗
	0x9E9F:{区:46,点:59},	// 麟
	0x7460:{区:46,点:60},	// 瑠
	0x5841:{区:46,点:61},	// 塁
	0x6D99:{区:46,点:62},	// 涙
	0x7D2F:{区:46,点:63},	// 累
	0x985E:{区:46,点:64},	// 類
	0x4EE4:{区:46,点:65},	// 令
	0x4F36:{区:46,点:66},	// 伶
	0x4F8B:{区:46,点:67},	// 例
	0x51B7:{区:46,点:68},	// 冷
	0x52B1:{区:46,点:69},	// 励
	0x5DBA:{区:46,点:70},	// 嶺
	0x601C:{区:46,点:71},	// 怜
	0x73B2:{区:46,点:72},	// 玲
	0x793C:{区:46,点:73},	// 礼
	0x82D3:{区:46,点:74},	// 苓
	0x9234:{区:46,点:75},	// 鈴
	0x96B7:{区:46,点:76},	// 隷
	0x96F6:{区:46,点:77},	// 零
	0x970A:{区:46,点:78},	// 霊
	0x9E97:{区:46,点:79},	// 麗
	0x9F62:{区:46,点:80},	// 齢
	0x66A6:{区:46,点:81},	// 暦
	0x6B74:{区:46,点:82},	// 歴
	0x5217:{区:46,点:83},	// 列
	0x52A3:{区:46,点:84},	// 劣
	0x70C8:{区:46,点:85},	// 烈
	0x88C2:{区:46,点:86},	// 裂
	0x5EC9:{区:46,点:87},	// 廉
	0x604B:{区:46,点:88},	// 恋
	0x6190:{区:46,点:89},	// 憐
	0x6F23:{区:46,点:90},	// 漣
	0x7149:{区:46,点:91},	// 煉
	0x7C3E:{区:46,点:92},	// 簾
	0x7DF4:{区:46,点:93},	// 練
	0x806F:{区:46,点:94},	// 聯
	0x84EE:{区:47,点: 1},	// 蓮
	0x9023:{区:47,点: 2},	// 連
	0x932C:{区:47,点: 3},	// 錬
	0x5442:{区:47,点: 4},	// 呂
	0x9B6F:{区:47,点: 5},	// 魯
	0x6AD3:{区:47,点: 6},	// 櫓
	0x7089:{区:47,点: 7},	// 炉
	0x8CC2:{区:47,点: 8},	// 賂
	0x8DEF:{区:47,点: 9},	// 路
	0x9732:{区:47,点:10},	// 露
	0x52B4:{区:47,点:11},	// 労
	0x5A41:{区:47,点:12},	// 婁
	0x5ECA:{区:47,点:13},	// 廊
	0x5F04:{区:47,点:14},	// 弄
	0x6717:{区:47,点:15},	// 朗
	0x697C:{区:47,点:16},	// 楼
	0x6994:{区:47,点:17},	// 榔
	0x6D6A:{区:47,点:18},	// 浪
	0x6F0F:{区:47,点:19},	// 漏
	0x7262:{区:47,点:20},	// 牢
	0x72FC:{区:47,点:21},	// 狼
	0x7BED:{区:47,点:22},	// 篭
	0x8001:{区:47,点:23},	// 老
	0x807E:{区:47,点:24},	// 聾
	0x874B:{区:47,点:25},	// 蝋
	0x90CE:{区:47,点:26},	// 郎
	0x516D:{区:47,点:27},	// 六
	0x9E93:{区:47,点:28},	// 麓
	0x7984:{区:47,点:29},	// 禄
	0x808B:{区:47,点:30},	// 肋
	0x9332:{区:47,点:31},	// 録
	0x8AD6:{区:47,点:32},	// 論
	0x502D:{区:47,点:33},	// 倭
	0x548C:{区:47,点:34},	// 和
	0x8A71:{区:47,点:35},	// 話
	0x6B6A:{区:47,点:36},	// 歪
	0x8CC4:{区:47,点:37},	// 賄
	0x8107:{区:47,点:38},	// 脇
	0x60D1:{区:47,点:39},	// 惑
	0x67A0:{区:47,点:40},	// 枠
	0x9DF2:{区:47,点:41},	// 鷲
	0x4E99:{区:47,点:42},	// 亙
	0x4E98:{区:47,点:43},	// 亘
	0x9C10:{区:47,点:44},	// 鰐
	0x8A6B:{区:47,点:45},	// 詫
	0x85C1:{区:47,点:46},	// 藁
	0x8568:{区:47,点:47},	// 蕨
	0x6900:{区:47,点:48},	// 椀
	0x6E7E:{区:47,点:49},	// 湾
	0x7897:{区:47,点:50},	// 碗
	0x8155:{区:47,点:51},	// 腕
};
/*
		function expow2( sz ) // 2のべき乗に変換
		{
			let i = 0;
			do 
			{
				sz = Math.floor(sz>>1);
				i++;
			} while( sz > 0 );
			return Math.pow(2,i);
		}
*/

// model


//-----------------------------------------------------------------------------
function gra3d_create( cv )	// 2022/06/10
//-----------------------------------------------------------------------------
{
	// ライブラリコンセプト
	//	・座標(xyz,w)と色(r,g,b)のみで、三角形と線を描画
	//	・線画、BASICのLINEのような使い勝手が出来るライブラリ。
	//	・速度は重視しない
	//	・透視投影変換にシェーダーを使わない（ＣＰＵで計算）
	//	・毎回ＶＲＡＭ転送
	//	・graライブラリと似せる

	let gra3d = {}
//	let	m_shader = {};
	let	m_hdlVertexbuf;
	let	m_hdlColorbuf;
	let m_tblVertex = [];
	let m_tblColor = [];
	let m_tblDisplay = [];
	let m_offset = 0;

	let gl = cv.getContext( "webgl", { antialias: false } );
	gra3d.gl = gl; 
	gra3d.P = midentity(); 
	gra3d.V = midentity(); 
	gra3d.color = vec3(0,0,0);

	{
//		gl.enable( gl.POLYGON_OFFSET_FILL );
//		gl.polygonOffset(1,1);
		/*
		GL_POLYGON_OFFSET_FILL、GL_POLYGON_OFFSET_LINE、またはGL_POLYGON_OFFSET_POINTが有効になっている場合、
		各フラグメントの深度値は、適切な頂点の深度値から補間された後にオフセットされます。 

		polygonOffset(GLfloat factor, GLfloat units);
		オフセットの値はfactor×DZ+r×unitsです。
		ここで、DZはポリゴンの画面領域に対する深さの変化の測定値であり、
		rは特定の値に対して解決可能なオフセットを生成することが保証されている最小値です。 
		オフセットは、深度テストが実行される前、および値が深度バッファーに書き込まれる前に追加されます。
		*/
	}

	if ( gl == null )
	{
		alert( "ブラウザがwebGL2に対応していません。Safariの場合は設定>Safari>詳細>ExperimentalFeatures>webGL2.0をonにすると動作すると思います。" );
	}
//	gl.enable( gl.DEPTH_TEST );
//	gl.depthFunc( gl.LEQUAL );// gl.LESS;	最も奥が1.0、最も手前が0.0
/*

	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.clearDepth( 1.0 );
	gl.viewport( 0.0, 0.0, gl.canvas.width, gl.canvas.height );
	gl.enable( gl.CULL_FACE );	// デフォルトでは反時計回りが表示
*/

	
	// シェーダー構成
	let m_shader		= gl_createShader( gl, gl_vs_P4C, gl_fs_color	, ["Pos4","Col3"],[] );

	//-----------------------------------------------------------------------------
	gra3d.reload_flush_display = function()
	//-----------------------------------------------------------------------------
	{
		
		// 頂点データの再ロード
		{
			gl.deleteBuffer( m_hdlVertexbuf );
			gl.deleteBuffer( m_hdlColorbuf );

			m_hdlVertexbuf = gl.createBuffer();				// ※gl.createBuffer() ⇔  gl.deleteBuffer( buffer );
			{
				gl.bindBuffer( gl.ARRAY_BUFFER, m_hdlVertexbuf );
				gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( m_tblVertex ), gl.STATIC_DRAW );
		    	gl.bindBuffer( gl.ARRAY_BUFFER, null );
			}
			
			m_hdlColorbuf = gl.createBuffer();				// ※gl.createBuffer() ⇔  gl.deleteBuffer( buffer );
			{
				gl.bindBuffer( gl.ARRAY_BUFFER, m_hdlColorbuf );
				gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( m_tblColor ), gl.STATIC_DRAW );
		    	gl.bindBuffer( gl.ARRAY_BUFFER, null );
			}

			m_tblVertex = [];	// VRAMに転送するので保存しなくてよい
			m_tblColor = [];	// VRAMに転送するので保存しなくてよい


		}



		{
			for ( let it of m_tblDisplay )
			{
				let shader		= m_shader;

				let type		= it.type;
				let hdlPos		= m_hdlVertexbuf;
				let hdlUv		= null;
				let hdlCol		= m_hdlColorbuf;
				let hdlIndex	= null;
				let offset		= it.offset;
				let cntVertex		= it.count;
				let mesh		= gl_MESH( {
					drawtype	:type, 
					hdlPos		:hdlPos, 
					hdlUv		:hdlUv, 
					hdlCol		:hdlCol, 
					hdlIndex	:hdlIndex, 
					offset		:offset, 
					cntVertex	:cntVertex
				} );


				let mdl = gl_MDL( mesh, shader, [] );

				if ( it.type == gl.TRIANGLES )
				{
					gl.enable( gl.POLYGON_OFFSET_FILL );
				}
				else
				{
					gl.disable( gl.POLYGON_OFFSET_FILL );
				}
				gl_drawmMdl( gl, mdl );
	
			}
			

		}

		gl.flush();
		m_tblDisplay = [];
	}

	//-----------------------------------------------------------------------------
	gra3d.draw_primitive = function( type, verts )	// [ {"pos":vec4(),"col":vec3()} ] vert
	//-----------------------------------------------------------------------------
	{
		for ( let v of verts )
		{
			m_tblVertex.push( v.pos.x, v.pos.y, v.pos.z, v.pos.w );
			m_tblColor.push( v.col.x, v.col.y, v.col.z );
		}
		m_tblDisplay.push( {"type":type, "offset":m_tblVertex.length/4-verts.length, "count":verts.length } ); 
	}
	//-----------------------------------------------------------------------------
	gra3d.entry_TRIANGLE = function( a,b,c )		// {"pos":vec4(),"col":vec3()}
	//-----------------------------------------------------------------------------
	{
		m_tblVertex.push( a.pos.x, a.pos.y, a.pos.z, a.pos.w );
		m_tblVertex.push( b.pos.x, b.pos.y, b.pos.z, b.pos.w );
		m_tblVertex.push( c.pos.x, c.pos.y, c.pos.z, c.pos.w );

		m_tblColor.push( a.col.x, b.col.y, c.col.z );
		m_tblColor.push( a.col.x, b.col.y, c.col.z );
		m_tblColor.push( a.col.x, b.col.y, c.col.z );
	
		if ( m_tblDisplay.length > 0 && m_tblDisplay[m_tblDisplay.length-1].type == gl.TRIANGLES )
		{
			m_tblDisplay[m_tblDisplay.length-1].count+=3;
		}
		else
		{
			m_tblDisplay.push( {"type":gl.TRIANGLES, "offset":m_tblVertex.length/4-3, "count":3 } ); 
		}
	}	
	//-----------------------------------------------------------------------------
	gra3d.entry_LINE = function( s, e )			// {"pos":vec4(),"col":vec3()}
	//-----------------------------------------------------------------------------
	{
		m_tblVertex.push( s.pos.x, s.pos.y, s.pos.z, s.pos.w );
		m_tblVertex.push( e.pos.x, e.pos.y, e.pos.z, e.pos.w );

		m_tblColor.push( s.col.x, s.col.y, s.col.z );
		m_tblColor.push( e.col.x, e.col.y, e.col.z );

		if ( m_tblDisplay.length > 0 && m_tblDisplay[m_tblDisplay.length-1].type == gl.LINES )
		{
			m_tblDisplay[m_tblDisplay.length-1].count+=2;
		}
		else
		{
			m_tblDisplay.push( {"type":gl.LINES, "offset":m_tblVertex.length/4-2, "count":2} ); 
		}
	}
	
	//-----------------------------------------------------------------------------
	gra3d.setProjectionMatrix = function( P )
	//-----------------------------------------------------------------------------
	{
		gra3d.P = P;
	}
	//-----------------------------------------------------------------------------
	gra3d.setViewMatrix = function( V )
	//-----------------------------------------------------------------------------
	{
		gra3d.V = V
	}

	//-----------------------------------------------------------------------------
	gra3d.pers = function( v )	// vec3 v
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let s2 = vec4( v.x, v.y, v.z, 1 );
		s2 = vec4_vmul_Mv( gra3d.V ,s2 );
		s2 = vec4_vmul_Mv( gra3d.P ,s2 );
		return s2;
	}
	//-----------------------------------------------------------------------------
	gra3d.pers2d = function( V )	// vec3 v 2Dcanvasの座標系に変換
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let v = gra3d.pers(V);

		let W	= gl.canvas.width/2;
		let H	= gl.canvas.height/2;
		let px	=  (v.x/v.w)*W+W;	
		let py	= -(v.y/v.w)*H+H;	
		return vec2(px,py);
	}
	//-----------------------------------------------------------------------------
	gra3d.persScreen = function( V )	// vec3 v 2Dcanvasの座標系に変換
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let v = gra3d.pers(V);

		let px	=  (v.x/v.w);	
		let py	=  (v.y/v.w);	
		let pz	=  (v.z);	
		return vec3(px,py,pz);
	}
	//-----------------------------------------------------------------------------
	gra3d.colorv = function( col )
	//-----------------------------------------------------------------------------
	{
		gra3d.color = col;
	}
	//-----------------------------------------------------------------------------
	gra3d.line = function( s, e, col )	// vec3 s, vec3 e, [n,n,n] col
	//-----------------------------------------------------------------------------
	{
		// 透視変換	//pos = PVMv;
		let s3 = {"pos":gra3d.pers(s), "col":gra3d.color};
		let e3 = {"pos":gra3d.pers(e), "col":gra3d.color};
		gra3d.entry_LINE( s3, e3 );
	}

	//-----------------------------------------------------------------------------
	gra3d.getScreenPos_vec2 = function( V )	//  vec4 v return vec2
	//-----------------------------------------------------------------------------
	{
		let v = vcopy4(V);
		// 透視変換	//pos = PVMv;
		v = vec4_vmul_Mv( gra3d.V ,v );
		v = vec4_vmul_Mv( gra3d.P ,v );

		let W	= gl.canvas.width/2;
		let H	= gl.canvas.height/2;
		let px	=  (v.x/v.w)*W+W;	
		let py	= -(v.y/v.w)*H+H;	
		return vec2(px,py);
	}
	//-----------------------------------------------------------------------------
	gra3d.drawModel = function( M, model )	// モデル表示
	//-----------------------------------------------------------------------------
	{
		// 座標計算
		let tmp = []; 
		{
			for ( let i = 0 ; i < model.tblVertex3.length ; i+=3 )
			{
				// 透視変換	//pos = PVMv;
				let v = vec4( 
					model.tblVertex3[i+0],
					model.tblVertex3[i+1],
					model.tblVertex3[i+2],
					1,
				 );
				v = vec4_vmul_Mv( M ,v );
				v = vec4_vmul_Mv( gra3d.V ,v );
				v = vec4_vmul_Mv( gra3d.P ,v );
				tmp.push( v );
			}
		}

		// 描画	共有頂点を独立三角形にして描画
		{
			{ // 陰線処理用
				for ( let i = 0 ; i < model.tblIndex_flat.length ; i+=3 )
				{
					let v1 = {"pos":tmp[model.tblIndex_flat[i+0]], "col":model.col_flat};
					let v2 = {"pos":tmp[model.tblIndex_flat[i+1]], "col":model.col_flat};
					let v3 = {"pos":tmp[model.tblIndex_flat[i+2]], "col":model.col_flat};
					gra3d.entry_TRIANGLE( v1, v2, v3 );
				}
			}
			{ // 線描画
				for ( let i = 0 ; i < model.tblIndex_wire.length ; i+=2 )
				{
					let s = {"pos":tmp[model.tblIndex_wire[i+0]], "col":model.col_wire};
					let e = {"pos":tmp[model.tblIndex_wire[i+1]], "col":model.col_wire};
					gra3d.entry_LINE( s, e );

				}
			}

		}

	}
	//-----------------------------------------------------------------------------
	gra3d.backcolor = function( rgb ) 
	//-----------------------------------------------------------------------------
	{
		gl.clearColor( rgb.x, rgb.y, rgb.z, 1.0 );
	}
	//-----------------------------------------------------------------------------
	gra3d.cls = function()
	//-----------------------------------------------------------------------------
	{
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	}
	
	return gra3d;
}

//-----------------------------------------------------------------------------
function shader_create_PCIWF( gl )
//-----------------------------------------------------------------------------
{
	let	shader = {};

	//----------------------------
	function compile( type, src )
	//----------------------------
	{
		let sdr = gl.createShader( type );				//※ gl.createShader( type )⇔  gl.deleteShader( shader );
		gl.shaderSource( sdr, src );
		gl.compileShader( sdr );
		if( gl.getShaderParameter( sdr, gl.COMPILE_STATUS ) == false )
		{
			console.log( gl.getShaderInfoLog( sdr ) );
		}
		return sdr
	}

	// シェーダー構成
	shader		= gl_createShader( gl, gl_vs_P4C, gl_fs_color	, ["Pos4","Col3"],[] );
	shader.hdlPos = null;
	shader.hdlCol = null;


	return 	shader;
}
//-----------------------------------------------------------------------------
function orgmesh_create_PCIWF()
//-----------------------------------------------------------------------------
{

	let orgmesh = {};
	orgmesh.m_tblPos = [];
	orgmesh.m_tblColor = []
	orgmesh.m_tblDisp = [];

	return 	orgmesh;
}

//-----------------------------------------------------------------------------
let orgmesh_entry_LINE = function( gl, orgmesh, s, e )			// {"pos":vec4(),"col":vec3()}
//-----------------------------------------------------------------------------
{
	orgmesh.m_tblPos.push( s.pos.x, s.pos.y, s.pos.z, s.pos.w );
	orgmesh.m_tblPos.push( e.pos.x, e.pos.y, e.pos.z, e.pos.w );

	orgmesh.m_tblColor.push( s.col.x, s.col.y, s.col.z );
	orgmesh.m_tblColor.push( e.col.x, e.col.y, e.col.z );

	if ( orgmesh.m_tblDisp.length > 0 && orgmesh.m_tblDisp[orgmesh.m_tblDisp.length-1].type == gl.LINES )
	{
		orgmesh.m_tblDisp[orgmesh.m_tblDisp.length-1].count+=2;
	}
	else
	{
		orgmesh.m_tblDisp.push( {"type":gl.LINES, "offset":orgmesh.m_tblPos.length/4-2, "count":2} ); 
	}
}

//------------------------------------------
let orgmesh_drawModel = function( gl, P, V, M, model, shader,orgmesh )
//------------------------------------------
{
	// 座標計算
	let tmpPos3 = []; 
	{
		for ( let i = 0 ; i < model.tblPos3.length ; i++ )
		{
			// 透視変換	//pos = PVMv;
			let v = vec4( 
				model.tblPos3[i].x,
				model.tblPos3[i].y,
				model.tblPos3[i].z,
				1,
			 );
			v = vec4_vmul_Mv( M ,v );
			v = vec4_vmul_Mv( V ,v );
			v = vec4_vmul_Mv( P ,v );
			tmpPos3.push( v );
		}
	}

	// 描画	共有頂点を独立三角形にして描画
	{
		{ // 陰線処理用
			for ( let i = 0 ; i < model.tblIndex_flat.length ; i+=3 )	// 独立３頂点ポリゴン
			{
				let i0 = model.tblIndex_flat[i+0];
				let i1 = model.tblIndex_flat[i+1];
				let i2 = model.tblIndex_flat[i+2];
				let p0 = tmpPos3[i0];
				let p1 = tmpPos3[i1];
				let p2 = tmpPos3[i2];
				let c0 = model.tblCol3[i0];
				let c1 = model.tblCol3[i1];
				let c2 = model.tblCol3[i2];
				{
					orgmesh.m_tblPos.push( p0.x, p0.y, p0.z, p0.w );
					orgmesh.m_tblPos.push( p1.x, p1.y, p1.z, p1.w );
					orgmesh.m_tblPos.push( p2.x, p2.y, p2.z, p2.w );
					orgmesh.m_tblColor.push( c0.x, c0.y, c0.z );
					orgmesh.m_tblColor.push( c1.x, c1.y, c1.z );
					orgmesh.m_tblColor.push( c2.x, c2.y, c2.z );
					if ( orgmesh.m_tblDisp.length > 0 && orgmesh.m_tblDisp[orgmesh.m_tblDisp.length-1].type == gl.TRIANGLES )
					{
						orgmesh.m_tblDisp[orgmesh.m_tblDisp.length-1].count+=3;
					}
					else
					{
						orgmesh.m_tblDisp.push( {"type":gl.TRIANGLES, "offset":orgmesh.m_tblPos.length/4-3, "count":3 } ); 
					}
				}
			}
		}
/*
		{ // 線描画
			for ( let i = 0 ; i < model.tblIndex_wire.length ; i+=2 )
			{
				let i0 = model.tblIndex_wire[i+0];
				let i1 = model.tblIndex_wire[i+1];
				let s = {"pos":tmpPos3[i0], "col":model.tblCol3[i0]};//, "uv":model.tblUv2[i0]};
				let e = {"pos":tmpPos3[i1], "col":model.tblCol3[i1]};//, "uv":model.tblUv2[i1]};
				orgmesh_entry_LINE( gl, model.shader,model.orgmesh, s, e );

			}
		}
*/

	}
}
//-----------------------------
let shader_draw = function( gl, shader,orgmesh )	// PCIWF
//-----------------------------
{
if(1)
	{
		// 頂点データの再ロード
//		gl.deleteBuffer( shader.hdlPos );
//		gl.deleteBuffer( shader.hdlCol );

		shader.hdlPos = gl.createBuffer();				// ※gl.createBuffer() ⇔  gl.deleteBuffer( buffer );
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, shader.hdlPos );
			gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( orgmesh.m_tblPos ), gl.STATIC_DRAW );
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );
		}
		
		shader.hdlCol = gl.createBuffer();				// ※gl.createBuffer() ⇔  gl.deleteBuffer( buffer );
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, shader.hdlCol );
			gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( orgmesh.m_tblColor ), gl.STATIC_DRAW );
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );
		}

		orgmesh.m_tblPos = [];	// VRAMに転送するので保存しなくてよい
		orgmesh.m_tblColor = [];	// VRAMに転送するので保存しなくてよい

	}
	{
			for ( let it of orgmesh.m_tblDisp )
			{
				gl.drawArrays( it.type, it.offset, it.count );

				let type		= it.type
				let hdlPos		= shader.hdlPos;
				let hdlUv		= null;
				let hdlCol		= shader.hdlCol;
				let hdlIndex	= null;
				let offset		= it.offset;
				let length		= it.count;
				let mesh		= gl_MESH( {
					drawtype	:type, 
					hdlPos		:hdlPos, 
					hdlUv		:hdlUv, 
					hdlCol		:hdlCol, 
					hdlIndex	:hdlIndex, 
					offset		:offset, 
					length		:length
				} );

				let mdl = gl_MDL( mesh, shader, [] );

				if ( it.type == gl.TRIANGLES )
				{
					gl.enable( gl.POLYGON_OFFSET_FILL );
				}
				else
				{
					gl.disable( gl.POLYGON_OFFSET_FILL );
				}
				gl_drawmMdl( gl, mdl );
	
			}
		

	}


}


//---------------------------------------------------------------------
let model_calc = function( tree, parent_qp )	
//---------------------------------------------------------------------
{
	let model = null;
	let qp = parent_qp;
	for ( let t of tree )
	{
		if ( t instanceof Array == true ) 
		{
			model_calc(t,qp);
		}
		else
		{
			model = t;
			{
				// 計算部
				qp = QP_mul( parent_qp, model.qp );
				model.global_qp = qp;
			}
		}
		
	}
}
//-----------------------------------------------------------------------------
let model_comvert_single = function( data )// 内部フォーマットに変換
//-----------------------------------------------------------------------------
{
	let model = {};

	// for model
	model.name = data.name;
	model.tblPos3 = [];		// vec3
	model.tblUv2 = [];		// vec2
	model.tblCol3 = [];		// vec3
	model.tblIndex_wire = [];
	model.tblIndex_flat = [];

	//--基本の方向
	model.qp = QP( qidentity(), vec3( data.xyzOfs[0], data.xyzOfs[1], data.xyzOfs[2] ) );

	//--
	if ( data.type == "PCIWF" )
	{
		let ofs = model.tblPos3.length/3;
		for ( let p of data.xyzPos )
		{
			model.tblPos3.push( vec3(p[0],p[1],p[2]) );
		}
		for ( let p of data.rgbCol )
		{
			model.tblCol3.push( vec3(p[0],p[1],p[2]) );
		}
		for ( let id of data.index_wire )
		{
			model.tblIndex_wire.push( id+ofs );
		}
		for ( let id of data.index_flat )
		{
			model.tblIndex_flat.push( id+ofs );
		}
		model.shader = shader_create_PCIWF(gl);
		model.orgmesh = orgmesh_create_PCIWF();
	}
	else
	{
		console.error("unknown type used:"+data.type );
	}
	
	model.global_qp = QP( qidentity(),vec3(0,0,0) );

	return model;
}


// 上位ライブラリ
//-----------------------------------------------------------------------------
function create_FNT( filename, W, H, getUV, dw, dh, max = 2000 )
//-----------------------------------------------------------------------------
{
	let FNT = 
	{ 
		font		:null, 
		filename	:filename,
		W			:W, 
		H			:H, 
		getUV		:getUV,
		dw			:dw,	// 1ドットの描画幅
		dh			:dh,	// 1ドットの描画高さ
		max			:max
	};

	return  FNT;
}

//-----------------------------------------
function FNT_loadImagefile( FNT )
//-----------------------------------------
{
	let image = cv_requestLoadImagefile( FNT.filename );
	image.onload = function()
	{
		FNT.image = image;
		// フォントファイルの読み込みが終わったら、ＧＬテクスチャ化して、フォント管理
		let tex = gl_createTexFromImage( FNT.image );
		FNT.font = font_createPremeshFromTex( gl, tex, FNT.W,FNT.H, FNT.getUV, FNT.max );//
	}
}
//-----------------------------------------
function FNT_print( FNT, x, y, str )
//-----------------------------------------
{
	FNT.font.premesh = font_prints( FNT.font, FNT.font.premesh, x, y, str, FNT.dw,FNT.dh );
}
//-----------------------------------------
function FNT_isOK( FNT )
//-----------------------------------------
{
	return(FNT.font!=null);
}
//-----------------------------------------
function gl_FNT_draw( gl, FNT )
//-----------------------------------------
{
	gl_reloadMesh( gl, FNT.font.mesh, FNT.font.premesh, gl.DYNAMIC_DRAW  );
	let font_mdl =  gl_MDL( FNT.font.mesh, FNT.font.shader, [FNT.font.tex.hdl] );
	gl_drawmMdl( gl, font_mdl );
	FNT.font.premesh.cntVertex = 0;
}
