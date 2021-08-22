// 2021/05/09 ver1.02	minverts追加、mlookat変更
// 2021/05/07 ver1.01	デバッグvec3対応
// 2021/05/06 ver1.00	分離
//
//	行列ライブラリコンセプト
//	GLSLと同じ数式同じ行列がメインプログラムでも同様に機能する
//
// OpenGL® Programming Guide: The Official Guide 
// https://www.cs.utexas.edu/users/fussell/courses/cs354/handouts/Addison.Wesley.OpenGL.Programming.Guide.8th.Edition.Mar.2013.ISBN.0321773039.pdf

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
function vec4( x, y, z,w )	// 2021/05/06 クラスを止めて配列化
{
	return {x:x, y:y, z:z, w:w};
}
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

	return vec3( nx, ny, nz );
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

	return vec3( nx, ny, nz );
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

	return vec3( nx, ny, nz );
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
	//	Z奥がマイナス

    let y = n * Math.tan(fovy * Math.PI / 360.0);
    let x = y * aspect;

	return mfrustum( -x, x, -y, y, n, f );
}

//---------------------------------------------------------------------
function mfrustum( l, r, b, t, n, f ) //2021/05/04 GLに準拠
//---------------------------------------------------------------------
{
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
	return mat4(
		1	,	0	,	0	,	0	,
		0	,	1	,	0	,	0	,
		0	,	0	,	1	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mtrans( v )	// GL準拠＆列優先
//---------------------------------------------------------------------
{
	return mat4(
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
	return mat4(
		v.x	,	0	,	0	,	0	,
		0	,	v.y	,	0	,	0	,
		0	,	0	,	v.z	,	0	,
		0	,	0	,	0	,	1	
	);
}
//---------------------------------------------------------------------
function mrotX( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
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
function mrotY( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
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
function mrotZ( th )	// 右ねじ	GL準拠
//---------------------------------------------------------------------
{
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

	return mat4(
		x*x*q+c		,	y*x*q+z*s	,	z*x*q-y*s	,	0	,
		x*y*q-z*s	,	y*y*q+c		,	z*y*q+x*s	,	0	,
		x*z*q+y*s	,	y*z*q-x*s	,	z*z*q+c		,	0	,
		0			,	0			,	0			,	1	);
}
//---------------------------------------------------------------------
function mmul( A, B )  //  A X B 列優先
//---------------------------------------------------------------------
{
	return mat4(
		A[0][0] * B[0][0] +  A[1][0] * B[0][1] +  A[2][0] * B[0][2] +  A[3][0] * B[0][3],
		A[0][1] * B[0][0] +  A[1][1] * B[0][1] +  A[2][1] * B[0][2] +  A[3][1] * B[0][3],
		A[0][2] * B[0][0] +  A[1][2] * B[0][1] +  A[2][2] * B[0][2] +  A[3][2] * B[0][3],
		A[0][3] * B[0][0] +  A[1][3] * B[0][1] +  A[2][3] * B[0][2] +  A[3][3] * B[0][3],

		A[0][0] * B[1][0] +  A[1][0] * B[1][1] +  A[2][0] * B[1][2] +  A[3][0] * B[1][3],
		A[0][1] * B[1][0] +  A[1][1] * B[1][1] +  A[2][1] * B[1][2] +  A[3][1] * B[1][3],
		A[0][2] * B[1][0] +  A[1][2] * B[1][1] +  A[2][2] * B[1][2] +  A[3][2] * B[1][3],
		A[0][3] * B[1][0] +  A[1][3] * B[1][1] +  A[2][3] * B[1][2] +  A[3][3] * B[1][3],

		A[0][0] * B[2][0] +  A[1][0] * B[2][1] +  A[2][0] * B[2][2] +  A[3][0] * B[2][3],
		A[0][1] * B[2][0] +  A[1][1] * B[2][1] +  A[2][1] * B[2][2] +  A[3][1] * B[2][3],
		A[0][2] * B[2][0] +  A[1][2] * B[2][1] +  A[2][2] * B[2][2] +  A[3][2] * B[2][3],
		A[0][3] * B[2][0] +  A[1][3] * B[2][1] +  A[2][3] * B[2][2] +  A[3][3] * B[2][3],

		A[0][0] * B[3][0] +  A[1][0] * B[3][1] +  A[2][0] * B[3][2] +  A[3][0] * B[3][3],
		A[0][1] * B[3][0] +  A[1][1] * B[3][1] +  A[2][1] * B[3][2] +  A[3][1] * B[3][3],
		A[0][2] * B[3][0] +  A[1][2] * B[3][1] +  A[2][2] * B[3][2] +  A[3][2] * B[3][3],
		A[0][3] * B[3][0] +  A[1][3] * B[3][1] +  A[2][3] * B[3][2] +  A[3][3] * B[3][3]
	);
}
//----------------------------------------------------------
function	minvers( M ) 
//----------------------------------------------------------
{
//	let A = midentity();
//	for( let i = 0 ; i < 4 ; i++ )
//	for( let j = 0 ; j < 4 ; j++ )
//	A[i][j]=M[i][j];

	let A = M.concat();	// 配列コピー
	
	let I = midentity();
	
	let z1=4;  //配列の次数

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
//---------------------------------------------------------------------
function vec4_vmul_vM( v, M ) // 列優先 
//---------------------------------------------------------------------
{
	//	| x |		|	00	01	02	03	|
	//	| y |		|	10	11	12	13	|
	//	| z |	X	|	20	21	22	23	|
	//	| w |		|	30	31	32	33	|

	return vec4(
		v.x * M[0][0] +  v.y * M[0][1] +  v.z * M[0][2] +  v.w * M[0][3] ,
		v.x * M[1][0] +  v.y * M[1][1] +  v.z * M[1][2] +  v.w * M[1][3] ,
		v.x * M[2][0] +  v.y * M[2][1] +  v.z * M[2][2] +  v.w * M[2][3] ,
		v.x * M[3][0] +  v.y * M[3][1] +  v.z * M[3][2] +  v.w * M[3][3]
	);
}
//---------------------------------------------------------------------
function vmul_vM( v, M ) // 列優先 2021/05/07 vec3
//---------------------------------------------------------------------
{
	//	| x |		|	00	01	02	|
	//	| y |		|	10	11	12	|
	//	| z |	X	|	20	21	22	|
	//	| 1 |		|	30	31	32	|

	return vec4(
		v.x * M[0][0] +  v.y * M[0][1] +  v.z * M[0][2] +  1 * M[0][3] ,
		v.x * M[1][0] +  v.y * M[1][1] +  v.z * M[1][2] +  1 * M[1][3] ,
		v.x * M[2][0] +  v.y * M[2][1] +  v.z * M[2][2] +  1 * M[2][3] ,
	);
}

//---------------------------------------------------------------------
function vec4_vmul_Mv( M, v ) // 列優先 
//---------------------------------------------------------------------
{
	//	|	00	01	02	03	|
	//	|	10	11	12	13	|
	//	|	20	21	22	23	|	X	| x y z w |
	//	|	30	31	32	33	|

	return vec4(
		M[0][0] * v.x +  M[1][0] * v.y +  M[2][0] * v.z +  M[3][0] * v.w,
		M[0][1] * v.x +  M[1][1] * v.y +  M[2][1] * v.z +  M[3][1] * v.w,
		M[0][2] * v.x +  M[1][2] * v.y +  M[2][2] * v.z +  M[3][2] * v.w,
		M[0][3] * v.x +  M[1][3] * v.y +  M[2][3] * v.z +  M[3][3] * v.w
	);
}
//---------------------------------------------------------------------
function vmul_Mv( M, v ) // 列優先 	2021/05/07 vec3
//--------------------------------------------------s-------------------
{
	//	|	00	01	02	|
	//	|	10	11	12	|
	//	|	20	21	22	|	X	| x y z 1 |
	//	|	30	31	32	|

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

		m = mmul( m, mrotX( rx ) );
		m = mmul( m, mrotY( ry ) );
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
		return minvers(m);
	}
}

////

