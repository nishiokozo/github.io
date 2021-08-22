"use strict";


/////


//-----------------------------------------------------------------------------
function model_create( gl )
//-----------------------------------------------------------------------------
{
	let model = {};
	{
/*
		const src_vs = 
			 "attribute vec4 Pos;						"	attriute → in (es300)
			+"attribute vec2 Uv;						"
			+"uniform mat4 M;							"
			+"uniform mat4 P;							"
			+"varying highp vec2 uv;					"	varying → out (es300)
			+"void main( void ) 						"
			+"{											"
			+"gl_Position = P * M * Pos;				"
			+"	uv = Uv;								"
			+"}											";


		const src_fs = 
			 "varying highp vec2 uv;					"
			+"uniform sampler2D Tex0;					"	// Tex0 = sampler2D[ uniform["Tex0"] ]
			+"void main( void )							"
			+"{											"
			+"	gl_FragColor = texture2D( Tex0, uv );	"	// texture2D → texture (es300)
			+"}											";	// gl_FragColor → out vec4 ...  (es300)
*/
		const src_vs = "#version 300 es 			\n	"
			+"uniform mat4 M;							"
			+"uniform mat4 P;							"
			+"in vec4 Pos;								"
			+"in vec2 Uv;								"
			+"out highp vec2 uv;						"
			+"void main( void ) 						"
			+"{											"
			+"gl_Position = P * M * Pos;				"
			+"	uv = Uv;								"
			+"}";


		const src_fs =  "#version 300 es \n 			"
			+"precision highp float;					"
			+"uniform sampler2D Tex0;					"	// Tex0 = sampler2D[ uniform["Tex0"] ]
			+"in vec2 uv;								"
			+"out vec4 outColor;						"
			+"void main( void )							"
			+"{											"
			+"	vec4 col = texture( Tex0, uv );			"
			+"	outColor =col;	"
			+"}";


		const prog = gl.createProgram();
		{
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
			const vs = compile( gl, gl.VERTEX_SHADER, src_vs );
			const fs = compile( gl, gl.FRAGMENT_SHADER, src_fs );

			gl.attachShader( prog, vs );
			gl.attachShader( prog, fs );
			gl.linkProgram( prog );


			if ( !gl.getProgramParameter( prog, gl.LINK_STATUS ) ) 
			{
				alert( "Unable to initialize the shader prog: " + gl.getProgramInfoLog( prog ) );
				return null;
			}
		}

		model.shaderProg	= prog;
		model.shaderPos	= gl.getAttribLocation( prog, "Pos" );
		model.shaderUv	= gl.getAttribLocation( prog, "Uv" );
		model.shaderP		= gl.getUniformLocation( prog, "P" );
		model.shaderM		= gl.getUniformLocation( prog, "M" );
		model.shaderTex0	= gl.getUniformLocation( prog, "Tex0" );
	}

	{

		const tblPos = [
			-1.0, -1.0,  1.0,
			 1.0, -1.0,  1.0,
			 1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,

			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			 1.0,  1.0, -1.0,
			 1.0, -1.0, -1.0,

			-1.0,  1.0, -1.0,
			-1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0, -1.0,

			-1.0, -1.0, -1.0,
			 1.0, -1.0, -1.0,
			 1.0, -1.0,  1.0,
			-1.0, -1.0,  1.0,

			 1.0, -1.0, -1.0,
			 1.0,  1.0, -1.0,
			 1.0,  1.0,  1.0,
			 1.0, -1.0,  1.0,

			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0,  1.0, -1.0,
		];

		const tblUv = [
			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,

			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,

			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,

			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,

			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,

			0.0,	0.0,
			1.0,	0.0,
			1.0,	1.0,
			0.0,	1.0,
		];

		const tblIndex = [
			0,1,1,2,2,3,3,0,
			4,5,5,6,6,7,7,4,
			0,4,
			1,7,
			2,6,
			3,5,
		];

		const hdlPos = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, hdlPos );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( tblPos ), gl.STATIC_DRAW );

		const hdluv = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, hdluv );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( tblUv ), gl.STATIC_DRAW );

		const hdlIndex = gl.createBuffer();
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, hdlIndex );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( tblIndex ), gl.STATIC_DRAW );

		model.hdlPos		= hdlPos; 
		model.hdlUv		= hdluv; 
		model.hdlIndex	= hdlIndex;
		model.cntIndex		= tblIndex.length;
		model.drawtype		= gl.LINES
	}

	model.texture = gl.createTexture();
	{
		gl.bindTexture( gl.TEXTURE_2D, model.texture );
		if ( 0 ) 
		{
			const level = 0;
			const internalFormat = gl.RGB;
			const width = 4;
			const height = 4;
			const border = 0;
			const srcFormat = gl.RGB;
			const srcType = gl.UNSIGNED_BYTE;
			const pixel = new Uint8Array( [
				255	,	0	,	0	,		0	,	255	,	0	,		0	,	255	,	255	,		0	,	255	,	255	,	
				0	,	255	,	0	,		0	,	0	,	255	,		0	,	255	,	0	,		255	,	0	,	255	,
				255	,	255	,	255	,		0	,	0	,	0	,		255	,	0	,	0	,		0	,	255	,	0	,
				255	,	255	,	0	,		255	,	0	,	0	,		0	,	255	,	0	,		0	,	0	,	255	,
			  ] );	

			gl.bindTexture( gl.TEXTURE_2D, model.texture );
			gl.texImage2D( gl.TEXTURE_2D, level, internalFormat,width,height,0,srcFormat, srcType, pixel );
		}
		else
		{
			const level = 0;
			const internalFormat = gl.RGB;	//internalFormat:RGB32F	Format:RGB	Type:FLOAT
			const width = 1;
			const height = 1;
			const border = 0;
			const srcFormat = gl.RGB;
			const srcType = gl.UNSIGNED_BYTE;
			const pixel = new Uint8Array( [0,255,0]);

			gl.bindTexture( gl.TEXTURE_2D, model.texture );
			gl.texImage2D( gl.TEXTURE_2D, level, internalFormat,width,height,0,srcFormat, srcType, pixel );
		}

		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
		gl.texParameterf( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR

	}
	//-----------------------------------------------------------------------------
	model.model_draw = function( P, M, cntbold )
	//-----------------------------------------------------------------------------
	{
		gl.bindBuffer( gl.ARRAY_BUFFER, model.hdlPos );
		gl.vertexAttribPointer( model.shaderPos, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( model.shaderPos );

		gl.bindBuffer( gl.ARRAY_BUFFER, model.hdlUv );
		gl.vertexAttribPointer( model.shaderUv, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( model.shaderUv );

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, model.hdlIndex );

		gl.useProgram( model.shaderProg );
		gl.uniformMatrix4fv(  model.shaderP, false, P.flat() );

		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, model.texture );
		gl.uniform1i( model.shaderTex0, 0 );

		if( cntbold > 0 )
		{
			gl.uniformMatrix4fv(  model.shaderM, false, M.flat() );
			gl.drawElements( model.drawtype, model.cntIndex, gl.UNSIGNED_SHORT, 0 );
		}

		if( cntbold > 1 )
		{

			let m = M;

			let w = 0.01;
			for ( let i = 0 ; i < cntbold ; i++ )
			{
				{
					let m2 = mmul( mtrans(vec3(w,0,0)    ),  M  );
					gl.uniformMatrix4fv(  model.shaderM, false, m2.flat() );
					gl.drawElements( model.drawtype, model.cntIndex, gl.UNSIGNED_SHORT, 0 );
				}
				{

					let m2 = mmul( mtrans(vec3(0,w,0)    ),  M  );
					gl.uniformMatrix4fv(  model.shaderM, false, m2.flat() );
					gl.drawElements( model.drawtype, model.cntIndex, gl.UNSIGNED_SHORT, 0 );
				}
				w=w+0.01;
			}
		}
		
	}
	return model;
}
let flg1=1;

//-----------------------------------------------------------------------------
function gaus_create( gl )
//-----------------------------------------------------------------------------
{

	const src_vs = "#version 300 es \n				"
		+"in vec2 Pos;								" // Pos = attribte["Pos"][n]
		+"in vec2 Uv;								" // Uv  = attribte["Uv"][n]
		+"											"
		+"out  vec2 uv;								" // uv = &fs.uv
		+"void main( void )							"
		+"{											"
		+"	gl_Position = vec4( Pos,0,1);			"
		+"	uv = Uv;								"
		+"}											";

	const src_fs_c = "#version 300 es \n			" // コンスタントカラー
		+"precision highp float;					"
		+"uniform sampler2D Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ]
		+"											"
		+"in  vec2 uv;								" 
		+"out vec4 outColor;						" 
		+"void main( void )							"
		+"{											"
		+"	outColor = texture( Tex0, uv );			"
		+"}											";

	const src_fs_v = "#version 300 es \n 			" // ガウシアンブラーV
		+"precision highp float;					"
		+"uniform sampler2D	Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ]
		+"uniform vec2	Ofs1;						"
		+"uniform int	Glen;						"
		+"uniform float	Gaus[20];					"
		+"											" 
		+"in vec2	uv;								" 
		+"out vec4 outColor;						" 
		+"void main (void)							" 
		+"{																		"
		+"																		"
		+"	vec4 col  = texture( Tex0, uv ) * Gaus[0] ;							"
		+"	float v = 1.0;														"
		+"	for ( int i=1 ; i < Glen ; i++ ) {									" // version 200だと可変のforが使えない
		+"		col += texture( Tex0, uv + vec2( 0.0,  Ofs1.y*v ) ) * Gaus[i];	"
		+"		col += texture( Tex0, uv + vec2( 0.0, -Ofs1.y*v ) ) * Gaus[i];	"
		+"		v+=1.0;															"
		+"	}																	"
		+"																		"
		+"																		"
		+"	outColor = col;														"
		+"}																		";

	const src_fs_h = "#version 300 es \n 			" // ガウシアンブラーH
		+"precision highp float;					" // Tex0 = sampler2D[ uniform["Tex0"] ] 
		+"uniform sampler2D	Tex0;					" // Tex0 = sampler2D[ uniform["Tex0"] ] 
		+"uniform vec2	Ofs1;						"
		+"uniform int	Glen;						"
		+"uniform float	Gaus[20];					"
		+"											" 
		+"in vec2	uv;								" 
		+"out vec4 outColor;						" 
		+"void main (void)							" 
		+"{																		"
		+"	vec4 col  = texture( Tex0, uv ) * Gaus[0] ;							"
		+"	float v = 1.0;														"
		+"	for ( int i=1 ; i < Glen ; i++ ) {									" // version 200だと可変のforが使えない
		+"		col += texture( Tex0, uv + vec2(  Ofs1.x*v, 0.0 ) ) * Gaus[i];	"
		+"		col += texture( Tex0, uv + vec2( -Ofs1.x*v, 0.0 ) ) * Gaus[i];	"
		+"		v+=1.0;															"
		+"	}																	"
		+"	outColor = col;														"
		+"}																		";

	const src_vs_add ="#version 300 es \n 			"
		+"in vec3	Pos;							"
		+"in vec2	Uv;								"
		+"uniform vec2		Ofs1;					"
		+" 											"
		+"out vec2		uv1;						"
		+"out vec2		uv2;						"
		+"void main() 								"
		+"{ 																	"
		+"	uv1 = Uv;															"
		+"	uv2 = Uv+Ofs1;														"// 1ドット補正する
		+"	gl_Position = vec4(Pos,1);											"
		+"}								 										";

	const src_fs_add = "#version 300 es \n 			" // 加算合成
		+"precision highp float;					"
		+"uniform	sampler2D Tex0;					"
		+"uniform	sampler2D Tex1;					"
		+" 											"
		+"in	vec2 uv1;							"
		+"in	vec2 uv2;							"
		+"out vec4 outColor;						" 
		+"void main()								"
		+"{																		"
		+"	outColor = ( texture(Tex0,vec2(uv1.x,uv1.y))						"
		+"					+texture(Tex1,vec2(uv2.x,uv2.y)));					"
		+"}																		";

	// シェーダー作成
	//-----------------------------------------------------------------------------
	function makeshader( src_vs, src_fs, tblUniformTex )
	//-----------------------------------------------------------------------------
	{
		let shader = {};
		shader.Prog = gl.createProgram();

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

		gl.attachShader( shader.Prog, vs );
		gl.attachShader( shader.Prog, fs );
		gl.linkProgram( shader.Prog );


		if ( !gl.getProgramParameter( shader.Prog, gl.LINK_STATUS ) ) 
		{
			alert( "Unable to initialize the shader program: " + gl.getProgramInfoLog( shader.Prog ) );
			return null;
		}

		shader.listTex = tblUniformTex;

		return shader;
	}

	// for FBO
	//-----------------------------------------------------------------------------
	function makeframebuf( width, height )
	//-----------------------------------------------------------------------------
	{
		let fbo ={};

		fbo.rendertexture = gl.createTexture();
		if(0)
		{
			const level = 0;
			const internalFormat = gl.RGB32F;	//internalFormat:RGB32F	Format:RGB	Type:FLOAT
			const border = 0;
			const srcFormat = gl.RGB;
			const srcType = gl.FLOAT;
			const pixel = new Float32Array( [0,255,0]);

			gl.bindTexture( gl.TEXTURE_2D, fbo.rendertexture );
			gl.texImage2D( gl.TEXTURE_2D, level, internalFormat,width,height,0,srcFormat, srcType, pixel );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
			gl.texParameterf( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR
		}
		else
		{
			const level				= 0;
			const internalFormat	= gl.RGB;
			const srcFormat			= gl.RGB;
			const srcType			= gl.UNSIGNED_BYTE;
			const pixel				= new Uint8Array( width*height*3 ).fill(255,0,0);

			gl.bindTexture( gl.TEXTURE_2D, fbo.rendertexture );
			gl.texImage2D( gl.TEXTURE_2D, level, internalFormat,width,height,0,srcFormat, srcType, pixel );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
			gl.texParameterf( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );	// NEAREST / LINEAR / NEAREST_MIPMAP_NEAREST / LINEAR_MIPMAP_LINEAR
		}

		fbo.hdl = gl.createFramebuffer();
		gl.bindFramebuffer( gl.FRAMEBUFFER, fbo.hdl );
		gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.rendertexture, 0);
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );

		fbo.begin = function()
		{
			gl.bindFramebuffer( gl.FRAMEBUFFER, fbo.hdl );
			gl.viewport( 0, 0,  width, height );
		}

		return fbo;
	}

	// スクリーン用メッシュ
	//-----------------------------------------------------------------------------
	function makemesh()
	//-----------------------------------------------------------------------------
	{
		const tblPos	= [	-1.0,-1.0,	1.0,-1.0,	-1.0, 1.0,	 1.0, 1.0	];
		const tblUv		= [	 0.0, 0.0,	1.0, 0.0,	 0.0, 1.0,	 1.0, 1.0	];	
		const tblIndex	= [	0,1,2,3	];

		let mesh = {};

		mesh.hdlPos = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlPos );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( tblPos ), gl.STATIC_DRAW );

		mesh.hdlUv = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlUv );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( tblUv ), gl.STATIC_DRAW );

		mesh.hdlIndex = gl.createBuffer();
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, mesh.hdlIndex );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( tblIndex ), gl.STATIC_DRAW );

		mesh.cntIndex	= tblIndex.length;
		mesh.drawtype	= gl.TRIANGLE_STRIP

		return mesh;
	}

	let model = {};
	let shader_v		= makeshader( src_vs, src_fs_v, ["Tex0"] );
	let shader_h		= makeshader( src_vs, src_fs_h, ["Tex0"]  );
	let shader_const	= makeshader( src_vs, src_fs_c, ["Tex0"]  );
	let shader_add		= makeshader( src_vs_add, src_fs_add, ["Tex0","Tex1"]  );
	let mesh		= makemesh();
	let fbo_1a		= makeframebuf( gl.canvas.width/1, gl.canvas.height/1 );
	let fbo_1b		= makeframebuf( gl.canvas.width/1, gl.canvas.height/1 );
	let fbo_1c		= makeframebuf( gl.canvas.width/1, gl.canvas.height/1 );
	let fbo_2a		= makeframebuf( gl.canvas.width/2, gl.canvas.height/2 );
	let fbo_4a		= makeframebuf( gl.canvas.width/4, gl.canvas.height/4 );
	let fbo_4b		= makeframebuf( gl.canvas.width/4, gl.canvas.height/4 );
	let fbo_8a		= makeframebuf( gl.canvas.width/8, gl.canvas.height/8 );
	let fbo_8b		= makeframebuf( gl.canvas.width/8, gl.canvas.height/8 );

	///// public:関数

	//-----------------------------------------------------------------------------
	model.drawmodel = function( shader, tblTexture )
	//-----------------------------------------------------------------------------
	{
		// mesh & texture setup
		{
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, mesh.hdlIndex );

			if (  tblTexture.length < shader.listTex.length )
			{
				alert( "Not enough texture for shader." );
				return;
			}

		}

		// shader setup
		{
			gl.useProgram( shader.Prog );
			{
				let hdl = 	gl.getAttribLocation( shader.Prog, "Pos" )
				gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlPos );
				gl.vertexAttribPointer( hdl, 2, gl.FLOAT, false, 0, 0 );
				gl.enableVertexAttribArray( hdl );
			}

			{
				let hdl = 	gl.getAttribLocation( shader.Prog, "Uv" )
				gl.bindBuffer( gl.ARRAY_BUFFER, mesh.hdlUv );
				gl.vertexAttribPointer( hdl, 2, gl.FLOAT, false, 0, 0 );
				gl.enableVertexAttribArray( hdl );
			}
			
	 		// Tex0に渡る定数
	 		{
				for ( let i = 0 ; i < shader.listTex.length ; i++ )
				{
					let hdl = gl.getUniformLocation( shader.Prog, shader.listTex[i] );
		 			gl.uniform1i( hdl, i );									// サンプラーにのったテクスチャインデックスをセット
					gl.activeTexture( gl.TEXTURE0+i );						// TEXTURE0[i].TEXTURE_2D = tblTexture[i]
					gl.bindTexture( gl.TEXTURE_2D, tblTexture[i] );			// サンプラーにテクスチャアドレスをセット
				}
			}
		
	 		// Ofs0に渡る定数
			{//ドットピッチ
				let m_viewport = gl.getParameter( gl.VIEWPORT );
				let hdl = gl.getUniformLocation( shader.Prog, "Ofs1" );
				gl.uniform2f( hdl, 1.0/m_viewport[2] , 1.0/m_viewport[3] );
			}

			//テーブル
			{
				function make_gauss( size, sigma, rate )
				{
					function gauss( x,s )
					{
						let u = 0; 
						// u: μミュー	平均
						// s: σシグマ	標準偏差
						return 	1/(Math.sqrt(2*Math.PI*s))*Math.exp( -((x-u)*(x-u)) / (2*s*s) );
					}
					// size  :マトリクスの一辺の大きさ
					// sigma :
					let pat = new Array(size);
					for ( let m = 0 ; m < pat.length ; m++ )
					{
						pat[m] = gauss( m, sigma )*rate;
					}
					return pat;

				}	
		
				let hdl = gl.getUniformLocation( shader.Prog, "Gaus" );

				let tbl = [];
				if ( document.getElementsByName( "html_small64" )[0].checked )
				{
					tbl = make_gauss( 20, 1.5, 0.9);
				}
				else
/*
				if ( document.getElementsByName( "html_small16" )[0].checked )
				{
					tbl = make_gauss( 20, 3, 0.65);
				}
				else
*/
				{
					tbl = make_gauss( 20,10, 0.45 );
				}

				if ( hdl != null )
				{
					if(flg1)
					{flg1=0;
	//					console.table(hdl);
	//					console.log(tbl.length);
						console.table(tbl);
					}
					gl.uniform1fv( hdl, tbl );

					let hdl2 = gl.getUniformLocation( shader.Prog, "Glen" );
					gl.uniform1i( hdl2, tbl.length );
				}
			}
		}

		// draw
		gl.drawElements( mesh.drawtype, mesh.cntIndex, gl.UNSIGNED_SHORT, 0 );
	}
	//-----------------------------------------------------------------------------
	model.renderer = function( cb_model_draw )
	//-----------------------------------------------------------------------------
	{
// a = cb_model_draw( width, height )
// b = cb_model_draw( width, height );
// c = a+b;

// a = cb_model_draw( width, height ) );
// b = shader_v.draw( a.rendertexture ) );
// c = shader_h.draw( b.rendertexture ) );
// d = a+c;
		if ( 1 )
		{
			fbo_1a.begin();cb_model_draw(1);
			if ( document.getElementsByName( "html_small64" )[0].checked )
			{
				fbo_1b.begin();cb_model_draw(10);											// 1/1
				fbo_2a.begin();model.drawmodel( shader_const, [fbo_1b.rendertexture] );		// 1/2
				fbo_4a.begin();model.drawmodel( shader_const, [fbo_2a.rendertexture] );		// 1/4
				fbo_8a.begin();model.drawmodel( shader_const, [fbo_4a.rendertexture] );		// 1/8
				fbo_8b.begin();model.drawmodel( shader_v, [fbo_8a.rendertexture] );			// 縦ブラー
				fbo_8a.begin();model.drawmodel( shader_h, [fbo_8b.rendertexture] );			// 横ブラー

				gl.bindFramebuffer( gl.FRAMEBUFFER, null );									// 元のサイズに引き延ばす
				gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height );
				model.drawmodel( shader_add, [fbo_8a.rendertexture,fbo_1a.rendertexture] );
			}
			else
/*
			if ( document.getElementsByName( "html_small16" )[0].checked )
			{
				fbo_1b.begin();cb_model_draw(8);											// 1/1
				fbo_2a.begin();model.drawmodel( shader_const, [fbo_1b.rendertexture] );		// 1/4
				fbo_4a.begin();model.drawmodel( shader_const, [fbo_2a.rendertexture] );		// 1/16
				fbo_4b.begin();model.drawmodel( shader_v, [fbo_4a.rendertexture] );			// 縦ブラー
				fbo_4a.begin();model.drawmodel( shader_h, [fbo_4b.rendertexture] );			// 横ブラー

				gl.bindFramebuffer( gl.FRAMEBUFFER, null );									// 元のサイズに引き延ばす
				gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height );
				model.drawmodel( shader_add, [fbo_4a.rendertexture,fbo_1a.rendertexture] );
			}
			else
*/
			{
				fbo_1b.begin();cb_model_draw(4);											// 1/1
				fbo_1c.begin();model.drawmodel( shader_v, [fbo_1b.rendertexture] );			// 縦ブラー
				fbo_1b.begin();model.drawmodel( shader_h, [fbo_1c.rendertexture] );			// 横ブラー

				gl.bindFramebuffer( gl.FRAMEBUFFER, null );									// 元のサイズに引き延ばす
				gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height );
				model.drawmodel( shader_add, [fbo_1a.rendertexture,fbo_1b.rendertexture] );
			}

		}
		else
		{
//				gl.bindFramebuffer( gl.FRAMEBUFFER, null );									// 元のサイズに引き延ばす
//				gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height );
			cb_model_draw();
		}

	}


	
	
	return model;
}

	let rot = 0.0;
//window.onload = function( e )
//-----------------------------------------------------------------------------
function main()
//-----------------------------------------------------------------------------
{
	const gl = document.querySelector( "#html_canvas" ).getContext( "webgl2" );

	if ( !gl ) 
	{
		alert( "Unable to initialize WebGL2. Your browser or machine may not support it." );
		return;
	}
//var ext = gl.getExtension('EXT_color_buffer_float');console.log(ext);


	let model = model_create( gl );
	let bloomfilter = gaus_create( gl );
	let prev = 0;

	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );	
	gl.clearDepth( 1.0 );					
	gl.enable( gl.DEPTH_TEST );			
	gl.depthFunc( gl.LEQUAL );	

	//-----------------------------------------------------------------------------
	function update_paint( now ) 
	//-----------------------------------------------------------------------------
	{
		const deltaTime = (now - prev)/1000;
		prev = now;

		function draw_scene( cntbold )
		{
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

			let P = mperspective( 45, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000.0 );
			let M = mtrans( vec3(0.0, 0.0, -8.0 ) );
			M = mmul(M,mrotate( rot * .7,	normalize( vec3(0, 1, 1) ) ) );	

			model.model_draw( P, M, cntbold );

		}
		rot += deltaTime/2;


		if ( document.getElementsByName( "html_noblur" )[0].checked )
		{
			draw_scene(1);
		}
		else
		{
			bloomfilter.renderer( draw_scene );
		}

		if ( g_reqId != null) window.cancelAnimationFrame( g_reqId ); // 止めないと多重で実行される
		g_reqId = window.requestAnimationFrame( update_paint );
	}
	if ( g_reqId != null) window.cancelAnimationFrame( g_reqId ); // 止めないと多重で実行される
	g_reqId = window.requestAnimationFrame( update_paint );
}

let	g_reqId = null;
let g_param = "Green";
//-----------------------------------------------------------------------------
function html_click()
//-----------------------------------------------------------------------------
{
	var list = document.getElementsByName( "html_param" ) ;
	for ( let l of list )
	{
		if ( l.checked ) 
		{
			g_param = l.value;
console.log(g_param);
			break;
		}
	}
}
//-----------------------------------------------------------------
function html_setFullscreen()
//-----------------------------------------------------------------
{
	const obj = document.querySelector("#html_canvas"); 

	if( document.fullscreenEnabled )
	{
		obj.requestFullscreen.call(obj);
	}
	else
	{
		alert("フルスクリーンに対応していません");
	}
}
//-----------------------------------------------------------------
function html_set1920x1080()
//-----------------------------------------------------------------
{
	html_canvas.width = 1920;
	html_canvas.height = 1080;
	main();
}

main();
