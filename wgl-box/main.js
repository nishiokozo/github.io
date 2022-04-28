"use strict";

function	create_vertexbuffer( tbl )
{
	let buf = gl.createBuffer ();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( tbl ), gl.STATIC_DRAW);
	return buf;
}

function	create_indexbuffer( tbl )
{
	let buf = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf );
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tbl), gl.STATIC_DRAW);
	return buf;
}

function create_shader()
{
	let shader = gl.createProgram();
	let str_vs = 'attribute vec3 pos;'+
		'uniform mat4 P;'+
		'uniform mat4 V;'+
		'uniform mat4 M;'+
		'void main(void) '+
		'{'+
		'	gl_Position = P*V*M*vec4(pos, 1.);'+
		'}';

	let str_fs = 'precision mediump float;'+
		'void main(void) '+
		'{'+
		'	gl_FragColor = vec4(vec3(1,1,1), 1.);'+
		'}';
	let vs = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vs, str_vs);
	gl.compileShader(vs);
		
	let fs = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fs, str_fs);
	gl.compileShader(fs);

	gl.attachShader(shader, vs);
	gl.attachShader(shader, fs);
	gl.linkProgram(shader);
	return shader;
}
//---------------------------------------------------------------------

let canvas = document.getElementById('html_canvas');
let gl = canvas.getContext('webgl');

let g_bufVert = create_vertexbuffer( 
	[ 
		-1,-1,-1,	1,-1,-1,	1, 1,-1,	-1, 1,-1,
		-1,-1, 1,	1,-1, 1,	1, 1, 1,	-1, 1, 1 
	] 
);
let g_index = [ 0,1,1,2,2,3,3,0, 
				4,5,5,6,6,7,7,4, 
				0,4,1,5,2,6,3,7,
				];

let index_buffer = create_indexbuffer( g_index );
let g_lenIdx = g_index.length;
let g_shader = create_shader();

gl.bindBuffer(gl.ARRAY_BUFFER, g_bufVert);

let hdl_P = gl.getUniformLocation(g_shader, "P");
let hdl_V = gl.getUniformLocation(g_shader, "V");
let hdl_M = gl.getUniformLocation(g_shader, "M");
let hdl_pos = gl.getAttribLocation(g_shader, "pos");
	
gl.vertexAttribPointer(hdl_pos, 3, gl.FLOAT, false,0,0) ;
gl.enableVertexAttribArray(hdl_pos);
	
gl.useProgram(g_shader);

let matP = midentity();
let matM = midentity();
let matV = midentity();

matV = mmul( matV, mtrans( vec3(0,0,-6) ));


//---------------------------------------------------------------------
function	update_main(dt)
//---------------------------------------------------------------------
{


	matM = mmul( matM, mroty(dt*0.0005) );
	matM = mmul( matM, mrotx(dt*0.0002) );
	matM = mmul( matM, mrotz(dt*0.0003) );
		
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearColor(0.5, 0.5, 0.5, 0.9);
	gl.clearDepth(1.0);
	gl.viewport(0.0, 0.0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
	matP = mperspective(40,canvas.width/canvas.height, 1, 100);
	gl.uniformMatrix4fv(hdl_P, false, matP.flat());
	gl.uniformMatrix4fv(hdl_V, false, matV.flat());
	gl.uniformMatrix4fv(hdl_M, false, matM.flat());
		
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.drawElements(gl.LINES, g_lenIdx, gl.UNSIGNED_SHORT, 0);

	html.setById_textContent( "html_timer1", dt );

}

let timer_old1 = 0;
let timer_now2 = 0;
let timer_old2 = 0;
//---------------------------------------------------------------------
function update1( time )
//---------------------------------------------------------------------
{

	let dt = time-timer_old1;

	update_main(dt);

	timer_old1 = time;
	window.requestAnimationFrame(update1);
}
//---------------------------------------------------------------------
function update2()
//---------------------------------------------------------------------
{
	timer_old2 = timer_now2;
	timer_now2 = Date.now();
	let dt = timer_now2-timer_old2;

//	update_main(dt);

	html.setById_textContent( "html_timer2", dt );
	window.setTimeout( update2, 1 ); // 編集中はリアルタイムアップデート
}
update1(0);
update2();


