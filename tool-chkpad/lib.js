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
	let	m_shader = {};
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
		gl.enable( gl.POLYGON_OFFSET_FILL );
		gl.polygonOffset(1,1);
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

	//-----------------------------------------------------------------------------
	function compile( type, src )
	//-----------------------------------------------------------------------------
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

/*
	//-----------------------------------------------------------------------------
	gra3d.cls = function( col=vec3(0,0,0) )
	//-----------------------------------------------------------------------------
	{
		gl.clearColor( col.x , col.y , col.z , 1.0);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	}
*/
	if ( gl == null )
	{
		alert( "ブラウザがwebGL2に対応していません。Safariの場合は設定>Safari>詳細>ExperimentalFeatures>webGL2.0をonにすると動作すると思います。" );
	}
	gl.enable( gl.DEPTH_TEST );
	gl.depthFunc( gl.LEQUAL );// gl.LESS;	最も奥が1.0、最も手前が0.0
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.clearDepth( 1.0 );
	gl.viewport( 0.0, 0.0, gl.canvas.width, gl.canvas.height );
	gl.enable( gl.CULL_FACE );	// デフォルトでは反時計回りが表示

	// シェーダーコンパイル

	// シェーダー構成
	{

		let src_vs = 
			 "attribute vec4 pos;"
			+"attribute vec3 col;"
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
			+   "gl_Position = pos;"
			+   "vColor = col;"
			+"}"
		;
				
		let src_fs =
			 "precision mediump float;"
			+"varying vec3 vColor;"
			+"void main( void )"
			+"{"
			+	"gl_FragColor = vec4( vColor, 1.0 );"
			+"}"
		;
		m_shader.prog	= gl.createProgram();			//WebGLProgram オブジェクトを作成		※gl.createProgram()	⇔  gl.deleteProgram( program );
		let vs	= compile( gl.VERTEX_SHADER, src_vs );
		let fs	= compile( gl.FRAGMENT_SHADER, src_fs );
		gl.attachShader( m_shader.prog, vs );			//シェーダーを WebGLProgram にアタッチ
		gl.attachShader( m_shader.prog, fs );			//シェーダーを WebGLProgram にアタッチ
		gl.deleteShader( vs );
		gl.deleteShader( fs );
		gl.linkProgram( m_shader.prog );				//WebGLProgram に接続されたシェーダーをリンク
		m_shader.pos		= gl.getAttribLocation( m_shader.prog, "pos" );
		m_shader.col		= gl.getAttribLocation( m_shader.prog, "col" );
		gl.enableVertexAttribArray( m_shader.pos );
		gl.enableVertexAttribArray( m_shader.col );
	}


	//-----------------------------------------------------------------------------
	function reload_to_VRAM()
	//-----------------------------------------------------------------------------
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
	
	//-----------------------------------------------------------------------------
	gra3d.reload_flush_display = function()
	//-----------------------------------------------------------------------------
	{
		
		// 頂点データの再ロード
		reload_to_VRAM();	
		gl.useProgram( m_shader.prog );
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, m_hdlVertexbuf );
			gl.vertexAttribPointer( m_shader.pos, 4, gl.FLOAT, false, 0, 0 ) ;
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );

			gl.bindBuffer( gl.ARRAY_BUFFER, m_hdlColorbuf );
			gl.vertexAttribPointer( m_shader.col, 3, gl.FLOAT, false, 0, 0 ) ;
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );


			for ( let it of m_tblDisplay )
			{
				if ( it.type == gl.TRIANGLES )
				{
					gl.enable( gl.POLYGON_OFFSET_FILL );
				}
				else
				{
					gl.disable( gl.POLYGON_OFFSET_FILL );
				}
				gl.drawArrays( it.type, it.offset, it.count );
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
				case "textbox":	
				case "innerHTML":
				case "selectbox":
					// HTML内にIDが存在するか
					if ( document.getElementById( name ) ) html.param[ name ].isHtml = true;
					break;

				case "radiobutton":
				case "checkbox":
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

//-----------------------------------------------------------------------------
function strfloat( v, r=4, f=2 ) // v値、r指数部桁、f小数部桁
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
		data.trig.L2 = (data.now.L2 > 0.0 ) && ( data.prev.L2 == 0.0 );
		data.trig.R2 = (data.now.R2 > 0.0 ) && ( data.prev.R2 == 0.0 );
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

			if ( inf.axes[0]     )data.now.LX =  inf.axes[0];
			if ( inf.axes[1]     )data.now.LY =  inf.axes[1];
			if ( inf.axes[2]     )data.now.RX =  inf.axes[2];
			if ( inf.axes[3]     )data.now.RY =  inf.axes[3];
			if ( inf.buttons[ 0] )data.now.RD =  inf.buttons[ 0].value == 1;
			if ( inf.buttons[ 1] )data.now.RR =  inf.buttons[ 1].value == 1;
			if ( inf.buttons[ 2] )data.now.RL =  inf.buttons[ 2].value == 1;
			if ( inf.buttons[ 3] )data.now.RU =  inf.buttons[ 3].value == 1;
			if ( inf.buttons[ 4] )data.now.L1 =  inf.buttons[ 4].value == 1;
			if ( inf.buttons[ 5] )data.now.R1 =  inf.buttons[ 5].value == 1;
			if ( inf.buttons[ 6] )data.now.L2 =  inf.buttons[ 6].value;
			if ( inf.buttons[ 7] )data.now.R2 =  inf.buttons[ 7].value;
			if ( inf.buttons[ 8] )data.now.SE =  inf.buttons[ 8].value == 1;
			if ( inf.buttons[ 9] )data.now.ST =  inf.buttons[ 9].value == 1;
			if ( inf.buttons[10] )data.now.L3 =  inf.buttons[10].value == 1;
			if ( inf.buttons[11] )data.now.R3 =  inf.buttons[11].value == 1;
			if ( inf.buttons[12] )data.now.LU =  inf.buttons[12].value == 1;
			if ( inf.buttons[13] )data.now.LD =  inf.buttons[13].value == 1;
			if ( inf.buttons[14] )data.now.LL =  inf.buttons[14].value == 1;
			if ( inf.buttons[15] )data.now.LR =  inf.buttons[15].value == 1;

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

	/*----------------------------------------------------------------------*/
	body.setCont = function (  fq, sq )
	/*----------------------------------------------------------------------*/
	{
		body.p1.keyFirstKey	= fq;
		body.p1.keySecoundKey	= sq;
	}

	//-----------------------------------------------------------------------------
	body.getinfo = function( border = 0.15 )
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
	gra.backcolor = function( [fr=0.0, fg=0.0, fb=0.0] ) // 2021/12/26 作成 2022/01/20 名称変更
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
	gra.psetv2 = function( v1 ) // 2021/08/13 追加
	//-----------------------------------------------------------------------------
	{
		gra.pset( v1.x, v1.y );
	}

	//-----------------------------------------------------------------------------
	gra.pset = function( x1,y1,r=1 ) // 2021/08/13 追加
	//-----------------------------------------------------------------------------
	{
		[x1,y1]=gra.win_abs(x1,y1);
		let st=0;
		let en=Math.PI*2;
		if(1)
		{
			gra.ctx.beginPath();
			let rotation = 0;
			gra.ctx.ellipse( x1, y1, r, r, rotation, st, en );
			gra.ctx.fill();
		}
		else
		{
			let w = 0.25*2;
			gra.fill(x1-w,y1-w,x1+w,y1+w);
		}

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


