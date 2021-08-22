"use strict";

///// canvas

function G_webgl(gl)	
{
	let body={};
	//-----------------------------------------------------------------------------
	function compile( type, src )
	//-----------------------------------------------------------------------------
	{
		let sdr = gl.createShader( type );	
		gl.shaderSource( sdr, src );
		gl.compileShader( sdr );
		if( gl.getShaderParameter( sdr, gl.COMPILE_STATUS ) == false )
		{
			console.log( gl.getShaderInfoLog( sdr ) );
		}
		return sdr
	}
	//-----------------------------------------------------------------------------
	function reloadBuffer()
	//-----------------------------------------------------------------------------
	{
		gl.deleteBuffer( body.hdlVertexbuf );
	    
		body.hdlVertexbuf = gl.createBuffer();
		{
			gl.bindBuffer( gl.ARRAY_BUFFER, body.hdlVertexbuf );
			gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( body.tblVertex ), gl.STATIC_DRAW );
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );
		}
		body.tblVertex = [];	// VRAMに転送するので保存しなくてよい

	}
	
	//-----------------------------------------------------------------------------
	body.drawLists = function()
	//-----------------------------------------------------------------------------
	{
		// 頂点データの再ロード
		reloadBuffer();	
		let P = midentity();	// CPU側で計算するので単位行列を入れておく
		let V = midentity();	// CPU側で計算するので単位行列を入れておく
		body.M = midentity();	// CPU側で計算するので単位行列を入れておく
		gl.flush();
		gl.useProgram( body.shader_1.prog );
		gl.flush();
		{
		
			gl.uniformMatrix4fv( body.shader_1.P, false, P );
			gl.uniformMatrix4fv( body.shader_1.V, false, V );
			gl.uniformMatrix4fv( body.shader_1.M, false, body.M );

			gl.bindBuffer( gl.ARRAY_BUFFER, body.hdlVertexbuf );
			gl.vertexAttribPointer( body.shader_1.pos, 4, gl.FLOAT, false, 0, 0 ) ;
	    	gl.bindBuffer( gl.ARRAY_BUFFER, null );

			gl.drawArrays( gl.LINES, 0, body.count );

			body.count=0;
		}
		gl.flush();
	}
	//-----------------------------------------------------------------------------
	body.linev4 = function( s, e )
	//-----------------------------------------------------------------------------
	{
		let o = body.tblVertex.length/4;
		body.tblVertex.push( s.x, s.y, s.z, s.w );
		body.tblVertex.push( e.x, e.y, e.z, e.w );

		body.count++;
		body.count++;
	}

	if ( gl == null )
	{
		alert( "ブラウザがwebGL2に対応していません。Safariの場合は設定>Safari>詳細>ExperimentalFeatures>webGL2.0をonにすると動作すると思います。" );
	}
	gl.enable( gl.DEPTH_TEST );
	gl.depthFunc( gl.LEQUAL );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.clearDepth( 1.0 );	
	gl.viewport( 0.0, 0.0, gl.canvas.width, gl.canvas.height );
	gl.enable( gl.CULL_FACE );	// デフォルトでは反時計回りが表示

	// シェーダーコンパイル

	body.shader_1 = {};
	// シェーダー構成
	{

		let src_vs = 
			 "attribute vec4 pos;"
			+"varying vec3 vColor;"
			+"void main( void )"
			+"{"
			+   "gl_Position = pos;"
			+"}"
		;
				
		let src_fs =
			 "precision mediump float;"
			+"varying vec3 vColor;"
			+"void main( void )"
			+"{"
			+	"gl_FragColor = vec4( 0,1,0, 1.0 );"
			+"}"
		;
		let vs		= compile( gl.VERTEX_SHADER, src_vs );
		let fs		= compile( gl.FRAGMENT_SHADER, src_fs );

		body.shader_1.prog	= gl.createProgram();			//WebGLProgram オブジェクトを作成
		gl.attachShader( body.shader_1.prog, vs );			//シェーダーを WebGLProgram にアタッチ
		gl.deleteShader( vs );
		gl.attachShader( body.shader_1.prog, fs );			//シェーダーを WebGLProgram にアタッチ
		gl.deleteShader( fs );
		gl.linkProgram( body.shader_1.prog );				//WebGLProgram に接続されたシェーダーをリンク
		body.shader_1.P		= gl.getUniformLocation( body.shader_1.prog, "P" );
		body.shader_1.V		= gl.getUniformLocation( body.shader_1.prog, "V" );
		body.shader_1.pos		= gl.getAttribLocation( body.shader_1.prog, "pos" );
		gl.enableVertexAttribArray( body.shader_1.pos );
	}
	body.tblVertex = [];

	return body;

}

///// main

let gl = document.getElementById( "html_canvas" ).getContext( "webgl", { antialias: false } );
let gra = G_webgl( gl );

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	let m_yaw = 0;

	//---------------------------------------------------------------------
	function	update_paint( now )
	//---------------------------------------------------------------------
	{
		let P = mperspective( 45,  gl.canvas.width/ gl.canvas.height, 0.1, 1000.0 );
		let V = mlookat( vec3( -8,8, 8 ),vec3( 0,3,0 ) );
		m_yaw+=radians( -0.1 );
		V = mmul( V, mrotate( m_yaw, vec3( 0,1,0 ) ) );

		// 描画

		{
			let s = 20;
			for ( let x = -s ; x <= s ; x++)
			{
				let v = vec4( x, 0, -s, 1 );
				let p = vec4( x, 0,  s, 1 );
				v = vec4_vmul_Mv( V ,v );
				v = vec4_vmul_Mv( P ,v );
				p = vec4_vmul_Mv( V ,p );
				p = vec4_vmul_Mv( P ,p );
				gra.linev4( v, p );
			}
			for ( let z = -s ; z <= s ; z++)
			{
				let v = vec4( -s, 0,  z, 1 );
				let p = vec4(  s, 0,  z, 1 );
				v = vec4_vmul_Mv( V ,v );
				v = vec4_vmul_Mv( P ,v );
				p = vec4_vmul_Mv( V ,p );
				p = vec4_vmul_Mv( P ,p );
				gra.linev4( v, p );
				
			}
		}

		gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		gra.drawLists();

		window.requestAnimationFrame( update_paint );
	}
	
	update_paint();
}



