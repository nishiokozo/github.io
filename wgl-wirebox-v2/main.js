"use strict";

//	列優先になると、行列同士は左右反対に掛けるか、列X行で掛ける必要がある。
//	列優先だと回転移動行列を4X3で作ることが出来て25%計算量を減らせるというメリットがある。
//	行列ライブラリコンセプト
//	①GLSLと同じ数式同じ行列がメインプログラムでも同様に機能する
//	②直感的な演算順序、vMVPの順で右から掛けるのが最も使いやすい。

///// geom

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

class vec3
{
	constructor( x, y, z )
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
};
class vec4
{
	constructor( x, y, z, w )
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
};


//------------------------------------------------------------------------------
function vrotYaw( v, th )
//------------------------------------------------------------------------------
{
   	let s = Math.sin(th);
	let c = Math.cos(th);
	// c,  0, -s,
	// 0,  1,  0,
    // s,  0,  c
	let nx = v.x*c			- v.z*s;
	let ny =		 v.y;
	let nz = v.x*s			+ v.z*c;

	return new vec3( nx, ny, nz );
}
//------------------------------------------------------------------------------
function vrotPitch( v, th )
//------------------------------------------------------------------------------
{
	let s = Math.sin(th);
	let c = Math.cos(th);
	// 1,  0,  0,
	// 0,  c,  s,
	// 0, -s,  c
	let nx = v.x;
	let ny =	 v.y*c + v.z*s;
	let nz =	-v.y*s + v.z*c;

	return new vec3( nx, ny, nz );
}
//------------------------------------------------------------------------------
function vrotRoll( v, th )
//------------------------------------------------------------------------------
{
	let s = Math.sin(th);
	let c = Math.cos(th);
	// c,  s,  0,
	//-s,  c,  0,
	// 0,  0,  1
	let nx = v.x*c + v.y*s;
	let ny =-v.x*s + v.y*c;
	let nz = 				v.z;

	return new vec3( nx, ny, nz );
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
	return new vec3(
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
	return new vec3(
		v.x * s,
		v.y * s,
		v.z * s
	);
}

//------------------------------------------------------------------------------
function vadd( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x +b.x,
		a.y +b.y,
		a.z +b.z
	);
}
//------------------------------------------------------------------------------
function vsub( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x -b.x,
		a.y -b.y,
		a.z -b.z
	);
}
//------------------------------------------------------------------------------
function vmul( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x *b.x,
		a.y *b.y,
		a.z *b.z
	);
}
//------------------------------------------------------------------------------
function vdiv( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		a.x /b.x,
		a.y /b.y,
		a.z /b.z
	);
}
//------------------------------------------------------------------------------
function vmax( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
		Math.max(a.x,b.x),
		Math.max(a.y,b.y),
		Math.max(a.z,b.z)
	);
}
//------------------------------------------------------------------------------
function vmin( a, b )
//------------------------------------------------------------------------------
{
	return new vec3( 
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
 	return vsub( I , vmul( new vec3(a,a,a), N ) );
}
//------------------------------------------------------------------------------
function refract( I, N, eta )
//------------------------------------------------------------------------------
{
	let R = new vec3(0,0,0);
	let k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
	if ( k < 0.0 )
	{
		R = new vec3(0,0,0);
	}
	else
	{
	//	R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
		let ve = new vec3(eta,eta,eta);
		let a = vmul( ve , I ); 
		let b = eta * dot(N, I);
		let c = b + Math.sqrt(k);
		let d = vmul( new vec3(c,c,c) , N);
		R = vsub(a , d);

	}
	return R;
}


class mat4
{
	constructor( 
		m00,m01,m02,m03,
		m10,m11,m12,m13,
		m20,m21,m22,m23,
		m30,m31,m32,m33)
	{
if (0)
{
		this[0] = [m00,m01,m02,m03];
		this[1] = [m10,m11,m12,m13];
		this[2] = [m20,m21,m22,m23];
		this[3] = [m30,m31,m32,m33];
}
else
if (0)
{
		this[0] = new Array(4);
		this[1] = new Array(4);
		this[2] = new Array(4);
		this[3] = new Array(4);
		this[0][0] = m00;
		this[0][1] = m01;
		this[0][2] = m02;
		this[0][3] = m03;
		this[1][0] = m10;
		this[1][1] = m11;
		this[1][2] = m12;
		this[1][3] = m13;
		this[2][0] = m20;
		this[2][1] = m21;
		this[2][2] = m22;
		this[2][3] = m23;
		this[3][0] = m30;
		this[3][1] = m31;
		this[3][2] = m32;
		this[3][3] = m33;
}
else
{
		this[ 0] = m00;	this[ 1] = m01;	this[ 2] = m02;	this[ 3] = m03;
		this[ 4] = m10;	this[ 5] = m11;	this[ 6] = m12;	this[ 7] = m13;
		this[ 8] = m20;	this[ 9] = m21;	this[10] = m22;	this[11] = m23;
		this[12] = m30;	this[13] = m31;	this[14] = m32;	this[15] = m33;
}

	}
	log( str="" )
	{
		console.log( str );
		console.log( "%f %f %f %f",this[ 0],this[ 1],this[ 2],this[ 3] );
		console.log( "%f %f %f %f",this[ 4],this[ 5],this[ 6],this[ 7] );
		console.log( "%f %f %f %f",this[ 8],this[ 9],this[10],this[11] );
		console.log( "%f %f %f %f",this[12],this[13],this[14],this[15] );
	}
};


//---------------------------------------------------------------------
function mperspective( fovy, aspect, n, f ) // 2021/05/02 fovyで入力に変更
//---------------------------------------------------------------------
{
	// 参考) https://www.khronos.org/opengl/wiki/GluPerspective_code
	// OpenGL® Programming Guide: The Official Guide 
	// https://www.cs.utexas.edu/users/fussell/courses/cs354/handouts/Addison.Wesley.OpenGL.Programming.Guide.8th.Edition.Mar.2013.ISBN.0321773039.pdf

	// n : ニアクリップ、必ず正の値を指定	= 視点から投影面までの距離
	// f : ファークリップ、必ず正の値を指定
	// 視点はz=0にあると考える。
	// 紛らわしいがZ奥がマイナス
	//

	//

	if(0)
	{
		function glhFrustumf2( matrix,  left,  right,  bottom,  top, znear,  zfar)
		{
		    let temp, temp2, temp3, temp4;
		    temp = 2.0 * znear;
		    temp2 = right - left;
		    temp3 = top - bottom;
		    temp4 = zfar - znear;


		    matrix[0] = temp / temp2;
		    matrix[1] = 0.0;
		    matrix[2] = 0.0;
		    matrix[3] = 0.0;
		    matrix[4] = 0.0;
		    matrix[5] = temp / temp3;
		    matrix[6] = 0.0;
		    matrix[7] = 0.0;
		    matrix[8] = (right + left) / temp2;
		    matrix[9] = (top + bottom) / temp3;
		    matrix[10] = (-zfar - znear) / temp4;
		    matrix[11] = -1.0;
		    matrix[12] = 0.0;
		    matrix[13] = 0.0;
		    matrix[14] = (-temp * zfar) / temp4;
		    matrix[15] = 0.0;

		}

		function glhPerspectivef2( matrix,  fovyInDegrees,  aspectRatio, znear,  zfar)
		{
		    let ymax, xmax;
		    let temp, temp2, temp3, temp4;
		    ymax = znear * Math.tan(fovyInDegrees * Math.PI / 360.0);
		    // ymin = -ymax;
		    // xmin = -ymax * aspectRatio;
		    xmax = ymax * aspectRatio;
		    glhFrustumf2(matrix, -xmax, xmax, -ymax, ymax, znear, zfar);
		}

		let matrix = new mat4;
		glhPerspectivef2( matrix, fovy, aspect, n , f );

		return matrix;
	}
	else
	{
		let sc = 1/Math.tan(radians(fovy/2));
		return	new	mat4( // GL公式だとPvで掛けるの転置行列。vPで計算するため今はこのまま
			sc/aspect	,	0			,	0					,	0				,	// x
			0			,	sc			,	0					,	0				,	// y
			0			,	0			,	-(f+n)/(f-n)		,	-(2.0*f*n)/(f-n),	// z: 負の値
			0			,	0			,	-1					,	0				);	// w: DEPTH


	}
}

let flg1 = 1;
//---------------------------------------------------------------------
function mfrustum( l, r, b, t, n, f ) 
//---------------------------------------------------------------------
{
	// 参考)https://www.scratchapixel.com/code.php?id=4&origin=/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix&src=1
	// glFrustum(-1.0, 1.0, -1.0, 1.0, 1.5, 20.0);
  	//
	//	Y-up
	//	Z奥がマイナス

	let A =   (r+l)/(r-l);	// センター
	let B =   (t+b)/(t-b);	// センター
	let C =  -(f+n)/(f-n);
	let D =-2*(f*n)/(f-n);

	return new mat4(
		2*n/(l-r)	,	0			,	0		,	0			,	// 一般的な行列式を転置してある
		
		0			,	2*n/(t-b)	,	0		,	0			,
		A			,	B			,	C		,	-1			,
		0			,	0			,	D		,	0			);
}
//---------------------------------------------------------------------
function mortho ( l, r, b, t, n, f ) 
//---------------------------------------------------------------------
{
	// 参考) https://docs.microsoft.com/en-us/windows/win32/opengl/glfrustum
	// glOrtho(-2.0, 2.0, -2.0, 2.0, -1.5, 1.5);
	//
	//	Y-up
	//	Z奥がマイナス

	let tx =  -(r+l)/(r-l);
	let ty =  -(t+b)/(t-b);
	let tz =  -(f+n)/(f-n);

	return new mat4(
		2/(r-l)		,	0			,	0			,	tx			,
		0			,	2/(t-b)		,	0			,	ty			,
		0			,	0			,	-2/(f-n)	,	tz			,
		0			,	0			,	0			,	1			);
}
//---------------------------------------------------------------------
function midentity() 
//---------------------------------------------------------------------
{
	return new mat4(
		1	,	0	,	0	,	0	,
		0	,	1	,	0	,	0	,
		0	,	0	,	1	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mtrans( v )	// 列優先
//---------------------------------------------------------------------
{
	return new mat4(
		1	,	0	,	0	,	v.x	,
		0	,	1	,	0	,	v.y	,
		0	,	0	,	1	,	v.z	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotX(th)
//---------------------------------------------------------------------
{
	let c = Math.cos(th);
	let s = Math.sin(th);
	return new mat4( 
		1	,	0	,	0	,	0	,
		0	,	c	,	s	,	0	,
		0	,	-s	,	c	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotY(th)
//---------------------------------------------------------------------
{
	let c = Math.cos(th);
	let s = Math.sin(th);
	return new mat4( 
		c	,	0	,	-s	,	0	,
		0	,	1	,	0	,	0	,
		s	,	0	,	c	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotZ(th)
//---------------------------------------------------------------------
{
	let c = Math.cos(th);
	let s = Math.sin(th);
	return new mat4( 
		c	,	s	,	0	,	0	,
		-s	,	c	,	0	,	0	,
		0	,	0	,	1	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mmul( A, B )  //  A X B 列優先
//---------------------------------------------------------------------
{
	return new mat4(
		A[ 0] * B[ 0] +  A[ 4] * B[ 1] +  A[ 8] * B[ 2] +  A[12] * B[ 3],
		A[ 1] * B[ 0] +  A[ 5] * B[ 1] +  A[ 9] * B[ 2] +  A[13] * B[ 3],
		A[ 2] * B[ 0] +  A[ 6] * B[ 1] +  A[10] * B[ 2] +  A[14] * B[ 3],
		A[ 3] * B[ 0] +  A[ 7] * B[ 1] +  A[11] * B[ 2] +  A[15] * B[ 3],

		A[ 0] * B[ 4] +  A[ 4] * B[ 5] +  A[ 8] * B[ 6] +  A[12] * B[ 7],
		A[ 1] * B[ 4] +  A[ 5] * B[ 5] +  A[ 9] * B[ 6] +  A[13] * B[ 7],
		A[ 2] * B[ 4] +  A[ 6] * B[ 5] +  A[10] * B[ 6] +  A[14] * B[ 7],
		A[ 3] * B[ 4] +  A[ 7] * B[ 5] +  A[11] * B[ 6] +  A[15] * B[ 7],

		A[ 0] * B[ 8] +  A[ 4] * B[ 9] +  A[ 8] * B[10] +  A[12] * B[11],
		A[ 1] * B[ 8] +  A[ 5] * B[ 9] +  A[ 9] * B[10] +  A[13] * B[11],
		A[ 2] * B[ 8] +  A[ 6] * B[ 9] +  A[10] * B[10] +  A[14] * B[11],
		A[ 3] * B[ 8] +  A[ 7] * B[ 9] +  A[11] * B[10] +  A[15] * B[11],

		A[ 0] * B[12] +  A[ 4] * B[13] +  A[ 8] * B[14] +  A[12] * B[15],
		A[ 1] * B[12] +  A[ 5] * B[13] +  A[ 9] * B[14] +  A[13] * B[15],
		A[ 2] * B[12] +  A[ 6] * B[13] +  A[10] * B[14] +  A[14] * B[15],
		A[ 3] * B[12] +  A[ 7] * B[13] +  A[11] * B[14] +  A[15] * B[15]
	);

}
//---------------------------------------------------------------------
function vec4_vmul_vM( v4, M ) // 列優先 
//---------------------------------------------------------------------
{
	//	0	1	2	3		:		1	0	0	tx
	//	4	5	6	7		:		0	1	0	ty
	//	8	9	10	11		:		0	0	1	tz
	//	12	13	14	15		:		0	0	0	1

	let m = mmul( mtrans( new vec3( v4.x, v4.y, v4.z) ), M ); // 

	return new vec4( m[3], m[7], m[11], m[15] );
}
//---------------------------------------------------------------------
function vmul_vM( v, M ) // 列優先 
//---------------------------------------------------------------------
{
	//	0	1	2	3		:		1	0	0	tx
	//	4	5	6	7		:		0	1	0	ty
	//	8	9	10	11		:		0	0	1	tz
	//	12	13	14	15		:		0	0	0	1

	let m = mmul( mtrans( v ), M ); // 

	return new vec4( m[3], m[7], m[11] );
}
//-----------------------------------------------------------------------------
function mlookat( vecEye, vecAt )	
//-----------------------------------------------------------------------------
{

	let eye = new vec3( -vecEye.x, -vecEye.y, -vecEye.z );
	let at = new vec3( -vecAt.x, -vecAt.y, -vecAt.z );

	let mv = midentity();
	// 視点・注視点から、viewマトリクスの生成
	let [rx,ry] = function(v)
	{
		let yz =  Math.sqrt(v.x*v.x+v.z*v.z);
		let ry = -Math.atan2( v.x , -v.z ); 
		let rx =  Math.atan2( v.y, yz ); 
		return [rx,ry];
	}( vsub(eye, at) ); 
	mv = mmul( mv, mtrans( new vec3( eye.x, eye.y, eye.z ) ) );
	mv = mmul( mv, mrotY( ry ) ); 
	mv = mmul( mv, mrotX( rx ) );

	return mv;
}
///// canvas

class G_2d
{
	constructor( ctx )
	{
		this.ctx = ctx;
	}
	//-----------------------------------------------------------------------------
	print( tx, ty, str )
	//-----------------------------------------------------------------------------
	{
		this.ctx.font = "12px monospace";
		this.ctx.fillStyle = "#000000";
		this.ctx.fillText( str, tx, ty );
	}

	//-----------------------------------------------------------------------------
	circle( x,y,r )
	//-----------------------------------------------------------------------------
	{
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	//-----------------------------------------------------------------------------
	line( sx,sy, ex,ey )
	//-----------------------------------------------------------------------------
	{
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000000";
		this.ctx.lineWidth = 1.0;
		this.ctx.moveTo( sx, sy );
		this.ctx.lineTo( ex, ey );
		this.ctx.closePath();
		this.ctx.stroke();
	}

	//-----------------------------------------------------------------------------
	cls()
	//-----------------------------------------------------------------------------
	{
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
	}
};

class G_webgl	// 2021/05/02 TRIANGLESに対応
{
	//-----------------------------------------------------------------------------
	compile( type, src )
	//-----------------------------------------------------------------------------
	{
		let shader = this.gl.createShader( type );	
		this.gl.shaderSource( shader, src );
		this.gl.compileShader( shader );
		if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS) == false )
		{
			console.log(this.gl.getShaderInfoLog(shader));
		}
		return shader
	}
	//-----------------------------------------------------------------------------
	constructor( ctx )
	//-----------------------------------------------------------------------------
	{
		if ( ctx == null )
		{
			alert("ブラウザがwebGL2に対応していません。Safariの場合は設定>Safari>詳細>ExperimentalFeatures>webGL2.0をonにすると動作すると思います。");
		}
		this.gl = ctx;
		this.gl.enable( this.gl.DEPTH_TEST );
		this.gl.depthFunc( this.gl.LEQUAL );
		this.gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
		this.gl.clearDepth( 1.0 );	
		this.gl.viewport( 0.0, 0.0, this.gl.canvas.width, this.gl.canvas.height );
		this.gl.enable( this.gl.CULL_FACE);	// デフォルトでは反時計回りが表示

		// シェーダーコンパイル
		{

			{
				let src = 
					 "attribute vec4 pos4;"
					+"attribute vec3 col;"
					+"uniform mat4 V;"
					+"uniform mat4 M;"
					+"uniform mat4 P;"
					+"varying vec3 vColor;"
					+"void main(void)"
					+"{"
				//挙動確認用コード 
				//	+   "mat4 S = mat4(0.5,  0.0,  0.0,  0.0,"
				//	+   "              0.0,  0.5,  0.0,  0.0,"
				//	+   "              0.0,  0.0,  0.5,  0.0,"
				//	+   "              0.0,  0.0,  0.0,  1.0);"
				//	+   "float th = radians(15.0);"
				//	+   "float c = cos(th);"
				//	+   "float s = sin(th);"
				//	+   "mat4 Rx = mat4(1.0,  0.0,  0.0,  0.0,"
				//	+   "               0.0,    c,   -s,  0.0,"
				//	+   "               0.0,    s,    c,  0.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 Ry = mat4(  c,  0.0,    s,  0.0,"
				//	+   "               0.0,  1.0,  0.0,  0.0,"
				//	+   "                -s,  0.0,    c,  0.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 Rz = mat4(  c,   -s,  0.0,  0.0,"
				//	+   "                 s,    c,  0.0,  0.0,"
				//	+   "               0.0,  0.0,  1.0,  0.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 Tx = mat4(1.0,  0.0,  0.0, -1.0,"
				//	+   "               0.0,  1.0,  0.0,  0.0,"
				//	+   "               0.0,  0.0,  1.0,  0.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 Ty = mat4(1.0,  0.0,  0.0,  0.0,"
				//	+   "               0.0,  1.0,  0.0,  1.0,"
				//	+   "               0.0,  0.0,  1.0,  0.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 Tz = mat4(1.0,  0.0,  0.0,  0.0,"
				//	+   "               0.0,  1.0,  0.0,  0.0,"
				//	+   "               0.0,  0.0,  1.0, -9.0,"
				//	+   "               0.0,  0.0,  0.0,  1.0);"
				//	+   "mat4 T = Rz;         "
				//	+   "float fovy=radians(45.0);     "
				//	+   "float sc=1.0/tan(fovy/2.0);   "
				//	+   "float n=0.0;                  "
				//	+   "float f=-1.0;                 "
				//	+   "float aspect=1.0;             "
				//	+	"mat4 Pm = mat4(               "
				//	+	"	sc/aspect,     0.0,          0.0,              0.0,"
				//	+	"	      0.0,      sc,          0.0,              0.0,"
				//	+	"	      0.0,     0.0, -(f+n)/(f-n), -(2.0*f*n)/(f-n),"
				//	+	"	      0.0,     0.0,         -1.0,              0.0);"
					+   "gl_Position = pos4;"
					+   "vColor = col;"
					+"}"
				;
				
				this.bin_vs = this.compile( this.gl.VERTEX_SHADER, src );
			}
			{
				let src =
					 "precision mediump float;"
					+"varying vec3 vColor;"
					+"void main(void)"
					+"{"
					+	"gl_FragColor = vec4(vColor, 1.0);"
					+"}"
				;
				this.bin_fs = this.compile( this.gl.FRAGMENT_SHADER, src );
			}
		}

		// シェーダー構成
		{
			this.hdlProgram = this.gl.createProgram();				//WebGLProgram オブジェクトを作成、初期化
			this.gl.attachShader( this.hdlProgram, this.bin_vs );	//シェーダーを WebGLProgram にアタッチ
			this.gl.attachShader( this.hdlProgram, this.bin_fs );	//シェーダーを WebGLProgram にアタッチ
			this.gl.linkProgram( this.hdlProgram );					//WebGLProgram に接続されたシェーダーをリンク

			this.hdlP = this.gl.getUniformLocation( this.hdlProgram, "P" );
			this.hdlV = this.gl.getUniformLocation( this.hdlProgram, "V" );
			this.hdlM = this.gl.getUniformLocation( this.hdlProgram, "M" );

			this.hdl_pos4 = this.gl.getAttribLocation( this.hdlProgram, "pos4" );
			this.gl.enableVertexAttribArray( this.hdl_pos4 );

			this.hdl_col = this.gl.getAttribLocation( this.hdlProgram, "col" );
			this.gl.enableVertexAttribArray( this.hdl_col );
		}

		this.tblIndex = [];
		this.tblVertex = [];
		this.tblColor = [];
		this.reloadBuffer();
	}

	//-----------------------------------------------------------------------------
	reloadBuffer()
	//-----------------------------------------------------------------------------
	{
		// 頂点バッファ
		// gl.createBuffer() ⇔  gl.deleteBuffer(buffer);

		// シェーダ削除
		// shader = gl.createShader( type )⇔  gl.deleteShader( shader );

		// プログラム削除
		// program = gl.createProgram()	⇔  gl.deleteProgram( program );

		this.hdlIndexbuf = this.gl.deleteBuffer( this.hdlIndexbuf );
		this.hdlVertexbuf = this.gl.deleteBuffer( this.hdlVertexbuf );
		this.hdlColorbuf = this.gl.deleteBuffer( this.hdlColorbuf );

		this.hdlIndexbuf = this.gl.createBuffer();
		{
			this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.hdlIndexbuf );
			this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.tblIndex ), this.gl.STATIC_DRAW );
	    	this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, null );
	    }
	    
		this.hdlVertexbuf = this.gl.createBuffer();
		{
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.hdlVertexbuf );
			this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( this.tblVertex ), this.gl.STATIC_DRAW );
	    	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );
		}
		
		this.hdlColorbuf = this.gl.createBuffer();
		{
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.hdlColorbuf );
			this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( this.tblColor ), this.gl.STATIC_DRAW );
	    	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );
		}

		this.tblVertex = [];	// VRAMに転送するので保存しなくてよい
		this.tblColor = [];	// VRAMに転送するので保存しなくてよい

	}
	
	//-----------------------------------------------------------------------------
	drawLists( type )
	//-----------------------------------------------------------------------------
	{
		// 頂点データの再ロード
		this.reloadBuffer();	
		let P = midentity();	// CPU側で計算するので単位行列を入れておく
		let V = midentity();	// CPU側で計算するので単位行列を入れておく
		this.M = midentity();	// CPU側で計算するので単位行列を入れておく
		this.gl.useProgram( this.hdlProgram );
		{
			this.gl.uniformMatrix4fv( this.hdlP, false, Object.values(P) );
			this.gl.uniformMatrix4fv( this.hdlV, false, Object.values(V) );
			this.gl.uniformMatrix4fv( this.hdlM, false, Object.values(this.M) );

			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.hdlVertexbuf );
			this.gl.vertexAttribPointer( this.hdl_pos4, 4, this.gl.FLOAT, false, 0, 0 ) ;
	    	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.hdlColorbuf );
			this.gl.vertexAttribPointer( this.hdl_col, 3, this.gl.FLOAT, false, 0, 0 ) ;
	    	this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

			this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.hdlIndexbuf );
			this.gl.drawElements( type, this.tblIndex.length, this.gl.UNSIGNED_SHORT, 0 );
	    	this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, null );
		}
		this.gl.flush();
		this.tblIndex = [];
	}

	//-----------------------------------------------------------------------------
	trianglev4( a,b,c )
	//-----------------------------------------------------------------------------
	{
		let o = this.tblVertex.length/4;
		this.tblVertex.push( a.x, a.y, a.z, a.w );
		this.tblVertex.push( b.x, b.y, b.z, b.w );
		this.tblVertex.push( c.x, c.y, c.z, c.w );

//g_param
		if (g_param=="RB")
		{
			this.tblColor.push( 0.10, 0.0, 0.23427 );
			this.tblColor.push( 0.10, 0.0, 0.23427 );
			this.tblColor.push( 0.10, 0.0, 0.23427 );
		}
		else
		if (g_param=="BW")
		{
			this.tblColor.push( 1.0, 1.0, 1.0 );
			this.tblColor.push( 1.0, 1.0, 1.0 );
			this.tblColor.push( 1.0, 1.0, 1.0 );
		}
		else
		{
			this.tblColor.push( 0.0, 0.120, 0.0 );
			this.tblColor.push( 0.0, 0.120, 0.0 );
			this.tblColor.push( 0.0, 0.120, 0.0 );
		}
		this.tblIndex.push( o+0, o+1, o+2 );
	}
	//-----------------------------------------------------------------------------
	linev4( s, e )
	//-----------------------------------------------------------------------------
	{
		let o = this.tblVertex.length/4;
		this.tblVertex.push( s.x, s.y, s.z, s.w );
		this.tblVertex.push( e.x, e.y, e.z, e.w );

		if (g_param=="RB")
		{
			this.tblColor.push( 1.0, 0.0, 0.0 );
			this.tblColor.push( 1.0, 0.0, 0.0 );
		}
		else
		if (g_param=="BW")
		{
			this.tblColor.push( 0.320, 0.320, 0.320 );
			this.tblColor.push( 0.320, 0.320, 0.320 );
		}
		else
		{
			this.tblColor.push( 0.0, 1.0, 0.0 );
			this.tblColor.push( 0.0, 1.0, 0.0 );
		}

		this.tblIndex.push( o+0, o+1 );
	}

	//-----------------------------------------------------------------------------
	cls()
	//-----------------------------------------------------------------------------
	{
		if (g_param=="RB")
		{
			this.gl.clearColor( 0.10, 0.0, 0.23427, 1.0 );
		}
		else
		if (g_param=="BW")
		{
			this.gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
		}
		else
		{
			this.gl.clearColor( 0.0, 0.120, 0.0, 1.0 );
		}
			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
	}
}


///// Model

class Model	// 2021/05/02 TRIANGLESに対応
{
	indexes = [];
	vertexes = [];

	//-----------------------------------------------------------------------------
	constructor( vecOfs, indexes, vertexes, drawtype )
	//-----------------------------------------------------------------------------
	{
		this.drawtype = drawtype;
		this.vertexes = vertexes;
		this.indexes = indexes;

		this.M = mtrans( vecOfs );
	}

	//-----------------------------------------------------------------------------
	drawModel( P, V )
	//-----------------------------------------------------------------------------
	{
		// 座標計算
		let tmp = []; 
		{
			for ( let i = 0 ; i < this.vertexes.length/3 ; i++ )
			{
				// 透視変換	//pos = v*M*V*P;
				let v = new vec4(
					this.vertexes[i*3+0],
					this.vertexes[i*3+1],
					this.vertexes[i*3+2],
					1,
				);
				v = vec4_vmul_vM( v, this.M );
				v = vec4_vmul_vM( v, V );
				v = vec4_vmul_vM( v, P );
				tmp.push( v );
			}
		}

		// 描画
		{
			if ( this.drawtype == "LINES" )
			{
				for ( let i = 0 ; i < this.indexes.length/2 ; i++ )
				{
					let v = tmp[this.indexes[i*2+0]];
					let p = tmp[this.indexes[i*2+1]];					
					gra.linev4( v, p );
				}
				gra.drawLists( gra.gl.LINES );
			}
			if ( this.drawtype == "TRIANGLES" )
			{
				for ( let i = 0 ; i < this.indexes.length/3 ; i++ )
				{
					let v1 = tmp[this.indexes[i*3+0]];
					let v2 = tmp[this.indexes[i*3+1]];
					let v3 = tmp[this.indexes[i*3+2]];
					gra.trianglev4( v1, v2, v3 );
				}
				gra.drawLists( gra.gl.TRIANGLES );
			}
	
		}


	}

};

///// main

//-----------------------------------------------------------------------------
function int_model()
//-----------------------------------------------------------------------------
{

	//-----------------------------------------------------------------------------
	function makeWireBox( s )
	//-----------------------------------------------------------------------------
	{
		let tblVertex = 
		[
			-s,-s,-s,
			 s,-s,-s,
			 s, s,-s,
			-s, s,-s,

			-s,-s, s,
			 s,-s, s,
			 s, s, s,
			-s, s, s,
		];

		let tblIndex = 
		[
			0,1,
			1,2,
			2,3,
			3,0,

			4+0,4+1,
			4+1,4+2,
			4+2,4+3,
			4+3,4+0,

			0,4+0,
			1,4+1,
			2,4+2,
			3,4+3,
		];

		return [ tblIndex, tblVertex, "LINES"];
	}
	//-----------------------------------------------------------------------------
	function makeFlatBox( s )
	//-----------------------------------------------------------------------------
	{
		let tblVertex = 
		[
			-s,-s,-s,
			 s,-s,-s,
			 s, s,-s,
			-s, s,-s,

			-s,-s, s,
			 s,-s, s,
			 s, s, s,
			-s, s, s,
		];

		let tblIndex = 
		[
			4,6,7,	6,4,5,
			7,2,3,2,7,6,
			5,2,6,2,5,1,
			0,7,3,7,0,4,
			0,2,1,2,0,3,
			4,1,5,1,4,0,
			
			
		];

		return [ tblIndex, tblVertex, "TRIANGLES"];
	}

	//-----------------------------------------------------------------------------
	function makeWireGrid( sz,st)
	//-----------------------------------------------------------------------------
	{
		let tblVertex = [];
		let tblIndex = [];


		{// grid floor
		
			{
				let ofs = tblVertex.length/3;
				for ( let i = -sz ; i < sz ; i++ )
				{
					let x = sz*st;
					let z = i*st;
					tblVertex.push( -x,0,z );
					tblVertex.push( x,0,z );

				}
					tblVertex.push( sz*st,0,sz*st );

				for ( let i = 0 ; i < sz*2 ; i++ )
				{
					tblIndex.push(  ofs+i*2,ofs+i*2+1 );
				}
					tblIndex.push(  ofs+0*2+1,ofs+sz*4 );
			}
			{
				let ofs = tblVertex.length/3;
				for ( let i = -sz ; i < sz ; i++ )
				{
					let x = i*st;
					let z = sz*st;
					tblVertex.push( x,0,-z );
					tblVertex.push( x,0,z );
				}
					tblVertex.push( sz*st,0,sz*st );

				for ( let i = 0 ; i < sz*2 ; i++ )
				{
					tblIndex.push(  ofs+i*2,ofs+i*2+1 );
				}
					tblIndex.push(  ofs+0*2+1,ofs+sz*4  );
			}
		}
		return [ tblIndex, tblVertex, "LINES"];
	}
		
	// main
		
	// floor
	{
		let [ tblIndex, tblVertex, drawtype] = makeWireGrid( 10.0, 2.0 );
		g_tblModel.push( new Model( new vec3( 0,0,0), tblIndex, tblVertex, drawtype ) );
	}
	
	// box1
	{
		let [ tblIndex, tblVertex, drawtype] = makeWireBox( 2.0 );
		let m = new Model( new vec3( 0.0,2.0,0), tblIndex, tblVertex, drawtype );
		g_tblModel.push( m );
	}
	{
		let [ tblIndex, tblVertex, drawtype] = makeFlatBox( 2.0 );
		let m = new Model( new vec3( 0,2.0, 0.0), tblIndex, tblVertex, drawtype );
		g_tblModel.push( m );
	}

	// box1
	{
		let [ tblIndex, tblVertex, drawtype] = makeWireBox( 1.0 );
		let m = new Model( new vec3( 8.0,1.0,0), tblIndex, tblVertex, drawtype );
		g_tblModel.push( m );
	}
	{
		let [ tblIndex, tblVertex, drawtype] = makeFlatBox( 1.0 );
		let m = new Model( new vec3( 8,1.0, 0.0), tblIndex, tblVertex, drawtype );
		g_tblModel.push( m );
	}

}


let g_yaw = 0;
let g_tblModel = [];
let g_reqId;

let gra = new G_webgl( html_canvas.getContext('webgl') );

class Camera
{
	constructor( pos, at, fovy )
	{
		this.pos	= pos;
		this.at		= at;
		this.fovy	= fovy;
	}
	
};
let g_cam;

//-----------------------------------------------------------------------------
window.onload = function( e )
//-----------------------------------------------------------------------------
{
	//---------------------------------------------------------------------
	function	update_paint(time)
	//---------------------------------------------------------------------
	{
		// プロジェクション計算
		let P = mperspective( g_cam.fovy,  gra.gl.canvas.width/ gra.gl.canvas.height, 1.0, 1000.0);

		// ビュー計算
		g_yaw+=radians(0.1263);
		let V = midentity();
		V = mmul( V, mrotY( g_yaw )  );
		V = mmul( V, mlookat( g_cam.pos, g_cam.at ) );
//		V = mmul( V, mtrans( g_cam.pos ) );


		// モデル回転
		{
			let m = g_tblModel[3];
			m.M = mmul( m.M, mrotY( radians(-0.5) )  );
		}
		{
			let m = g_tblModel[4];
			m.M = mmul( m.M, mrotY( radians(-0.5) )  );
		}

		// 描画
		gra.cls();
		for ( let m of g_tblModel )
		{
			m.drawModel( P, V );
		}


		if ( g_reqId ) window.cancelAnimationFrame( g_reqId ); // 止めないと多重で実行される可能性がある
		g_reqId = window.requestAnimationFrame( update_paint );
	}

//	g_cam = new Camera( new vec3( 4,5, 10), new vec3( 0,2,0), 28 );
	g_cam = new Camera( new vec3( 4,8, 26), new vec3( 0,2,0), 28 );

	g_reqId = null;

	int_model();
	
	update_paint();
}

let g_param = "BW";
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
