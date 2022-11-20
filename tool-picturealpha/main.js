"use strict";

let image_col	= window.document.getElementById( "html_img_col" );
let image_alp	= window.document.getElementById( "html_img_alp" );
let image_work	= window.document.getElementById( "html_img_work" );
let image_out	= window.document.getElementById( "html_img_out" );
let elm_file1	= window.document.getElementById( "html_file1" );
let elm_file2	= window.document.getElementById( "html_file2" );

let g_imgdataColor = null;
let g_imgdataAlpha = null;
let g_imgdataMono = null;


//-----------------------------------------------------------------------------
function html_drag(ev) 
//-----------------------------------------------------------------------------
{
  	ev.stopPropagation();	// 複数にdrag処理が伝播するのを防ぐ
	ev.preventDefault();	// 複数のdrag処理のデフォルト実行を防ぐ
}
//-----------------------------------------------------------------------------
function html_dropColor(ev) 
//-----------------------------------------------------------------------------
{
  	ev.stopPropagation();	// 複数にdrop処理が伝播するのを防ぐ
	ev.preventDefault();	// 複数のdrop処理のデフォルト実行を防ぐ
	let dt = ev.dataTransfer;
	cmd_setColorImage(dt.files[0]);
}
//-----------------------------------------------------------------------------
function html_dropAlpha(ev) 
//-----------------------------------------------------------------------------
{
  	ev.stopPropagation();	// 複数にdrop処理が伝播するのを防ぐ
	ev.preventDefault();	// 複数のdrop処理のデフォルト実行を防ぐ
	let dt = ev.dataTransfer;
	cmd_setAlphaImage(dt.files[0]);
}

//-----------------------------------------------------------------------------
function convert_binary( imgdata, val ) //二諧調化
//-----------------------------------------------------------------------------
{
	let imgOut = new ImageData( imgdata.width, imgdata.height );

	for ( let i = 0 ; i < imgdata.width * imgdata.height ; i++ )
	{
		let r = imgdata.data[ i*4 +0 ];
		let g = imgdata.data[ i*4 +1 ];
		let b = imgdata.data[ i*4 +2 ];
		let m = Math.max(Math.max(r,g),b);

		if ( m > val ) m = 255; else m = 0;

		imgOut.data[ i*4 +0 ] = m;
		imgOut.data[ i*4 +1 ] = m;
		imgOut.data[ i*4 +2 ] = m;
		imgOut.data[ i*4 +3 ] = 0xff;
	}

	return imgOut;
}
//-----------------------------------------------------------------------------
function convert_leftup( imgdata ) // 左上（最初の色を抜き色）
//-----------------------------------------------------------------------------
{
	let imgOut = new ImageData( imgdata.width, imgdata.height );

	let nr = imgdata.data[ 0 ];
	let ng = imgdata.data[ 1 ];
	let nb = imgdata.data[ 2 ];

	for ( let i = 0 ; i < imgdata.width * imgdata.height ; i++ )
	{
		let r = imgdata.data[ i*4 +0 ];
		let g = imgdata.data[ i*4 +1 ];
		let b = imgdata.data[ i*4 +2 ];

		let m = 0xff;
		if ( r == nr && g == ng && b == nb ) m = 0; 

		imgOut.data[ i*4 +0 ] = m;
		imgOut.data[ i*4 +1 ] = m;
		imgOut.data[ i*4 +2 ] = m;
		imgOut.data[ i*4 +3 ] = 0xff;
	}

	return imgOut;
}

//-----------------------------------------------------------------------------
function convert_mono( imgdata, flgRev ) // モノクロ化
//-----------------------------------------------------------------------------
{
	let imgOut = new ImageData( imgdata.width, imgdata.height );

	for ( let i = 0 ; i < imgdata.width * imgdata.height ; i++ )
	{
		let r = imgdata.data[ i*4 +0 ];
		let g = imgdata.data[ i*4 +1 ];
		let b = imgdata.data[ i*4 +2 ];
		let m = Math.max(Math.max(r,g),b);

		if ( m > 255 ) 255;
		if( flgRev ) m = 255-m;

		imgOut.data[ i*4 +0 ] = m;
		imgOut.data[ i*4 +1 ] = m;
		imgOut.data[ i*4 +2 ] = m;
		imgOut.data[ i*4 +3 ] = 0xff;
	}

	return imgOut;
}

//-----------------------------------------------------------------------------
function convert_color( imgdata ) // αを外す
//-----------------------------------------------------------------------------
{
	let imgOut = new ImageData( imgdata.width, imgdata.height );

	for ( let i = 0 ; i < imgdata.width * imgdata.height ; i++ )
	{
		let r = imgdata.data[ i*4 +0 ];
		let g = imgdata.data[ i*4 +1 ];
		let b = imgdata.data[ i*4 +2 ];


		imgOut.data[ i*4 +0 ] = r;
		imgOut.data[ i*4 +1 ] = g;
		imgOut.data[ i*4 +2 ] = b;
		imgOut.data[ i*4 +3 ] = 0xff;
	}

	return imgOut;
}
//-----------------------------------------------------------------------------
function convert_imageAndAlpha( imgC, imgA ) //カラーとアルファ画像を合成
//-----------------------------------------------------------------------------
{
	let imgOut = new ImageData( imgC.width, imgC.height );

	let sw = imgA.width / imgC.width;
	let sh = imgA.height / imgC.height;

	for ( let y = 0 ; y < imgC.height ; y++ )
	{
		for ( let x = 0 ; x < imgC.width ; x++ )
		{
			let adrC = y*imgC.width+x;
			let adrA = Math.floor(y*sh)*imgA.width+Math.floor(x*sw);

			imgOut.data[ adrC*4 +0 ] = imgC.data[ adrC*4 +0 ];
			imgOut.data[ adrC*4 +1 ] = imgC.data[ adrC*4 +1 ];
			imgOut.data[ adrC*4 +2 ] = imgC.data[ adrC*4 +2 ];
			imgOut.data[ adrC*4 +3 ] = imgA.data[ adrA*4 +0 ];
		}
	}
	return	imgOut;


}

//-----------------------------------------------------------------------------
function resizeImage( w, h )	
//-----------------------------------------------------------------------------
{
	let max = Math.max(w,h);
	{
		let s = ( w > h ) ? 320 / w : 320 / h;
		w *= s;
		h *= s;
	}
	return [w,h];
}

//-----------------------------------------------------------------------------
function cmd_setAlphaBinary()	// 二値化
//-----------------------------------------------------------------------------
{
	let v = html.getById_textbox("html_binary_val",127);

	if ( g_imgdataMono )
	{
		image_alp.style="display:none;";
		image_alp.onload = function()
		{
			image_alp.style="display:block;";
		}
		g_imgdataMono = convert_binary( g_imgdataMono, v );
		image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	}
}

//-----------------------------------------------------------------------------
function cmd_setAlphaReverse()	// α画像を反転
//-----------------------------------------------------------------------------
{
	if ( g_imgdataMono )
	{
		image_alp.style="display:none;";
		image_alp.onload = function()
		{
			image_alp.style="display:block;";
		}
		g_imgdataMono = convert_mono( g_imgdataMono, true );
		image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	}
}
//-----------------------------------------------------------------------------
function cmd_setAlphaLeftup()	// 抜き色
//-----------------------------------------------------------------------------
{
	if ( g_imgdataAlpha )
	{
		image_alp.style="display:none;";
		{
			g_imgdataMono = convert_leftup( g_imgdataAlpha );
			//
			image_alp.onload = function()
			{
				[image_alp.width, image_alp.height] = resizeImage( image_alp.naturalWidth, image_alp.naturalHeight );
				image_alp.style="display:block;";
			}
			image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	
		}
	}
}
//-----------------------------------------------------------------------------
function cmd_setAlphaReset()	// α画像をリセット
//-----------------------------------------------------------------------------
{
	if ( g_imgdataAlpha )
	{
//			g_imgdataMono = cv_convertImage2ImaeData( image_work );	// Image → ImageData
			g_imgdataMono = convert_mono( g_imgdataAlpha, false );
			//
			image_alp.onload = function()
			{
				[image_alp.width, image_alp.height] = resizeImage( image_alp.naturalWidth, image_alp.naturalHeight );
				image_alp.style="display:block;";
			}
			image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	}	
}


//-----------------------------------------------------------------------------
function cmd_setAlphaCopy()	// カラー画像をα画像に複写
//-----------------------------------------------------------------------------
{
	if ( g_imgdataColor )
	{
		image_alp.style="display:none;";
		image_alp.onload = function()
		{
			[image_alp.width, image_alp.height] = resizeImage( image_alp.naturalWidth, image_alp.naturalHeight );
			image_alp.style="display:block;";
		}
		g_imgdataAlpha = convert_color( g_imgdataColor, false );
		g_imgdataMono = convert_mono( g_imgdataColor, false );
		image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	}
	else
	{
		alert("複写元画像がありません");
	}
}

//-----------------------------------------------------------------------------
function cmd_setColorImage( filename )
//-----------------------------------------------------------------------------
{
	let fileReader = new FileReader();
	fileReader.onload = function() 
	{ 
		image_col.style="display:none;";
		image_work.onload = function()
		{
			g_imgdataColor = cv_convertImage2ImaeData( image_work );	// Image → ImageData
			g_imgdataColor = convert_color( g_imgdataColor, false );	// αチャンネルを外す
			//
			image_col.onload = function()
			{
				[image_col.width, image_col.height] = resizeImage( image_col.naturalWidth, image_col.naturalHeight );
				image_col.style="display:block;";
			}
			image_col.src = cv_convertImageData2Png( g_imgdataColor );
	
		}
		image_work.src = fileReader.result;
	}
	fileReader.readAsDataURL( filename );
}

//-----------------------------------------------------------------------------
function cmd_setAlphaImage( filename )
//-----------------------------------------------------------------------------
{
	let fileReader = new FileReader();
	fileReader.onload = function() 
	{ 
		image_alp.style="display:none;";
		image_work.onload = function()
		{
			g_imgdataAlpha = cv_convertImage2ImaeData( image_work );	// Image → ImageData
			g_imgdataMono = convert_mono( g_imgdataAlpha, false );
			//
			image_alp.onload = function()
			{
				[image_alp.width, image_alp.height] = resizeImage( image_alp.naturalWidth, image_alp.naturalHeight );
				image_alp.style="display:block;";
			}
			image_alp.src = cv_convertImageData2Png( g_imgdataMono );
	
		}
		image_work.src = fileReader.result;
	}
	fileReader.readAsDataURL( filename);
}

//-----------------------------------------------------------------------------
function cmd_convert()
//-----------------------------------------------------------------------------
{
	if ( g_imgdataColor && g_imgdataMono )
	{
		image_out.style="display:none";
		image_out.onload = function()
		{
			[image_out.width, image_out.height] = resizeImage( image_out.naturalWidth, image_out.naturalHeight );
			image_out.style="display:block;";

		}
		let imgdata = convert_imageAndAlpha( g_imgdataColor, g_imgdataMono );
		image_out.src = cv_convertImageData2Png( imgdata );
	}
}

//-----------------------------------------------------------------------------
function html_request( req )
//-----------------------------------------------------------------------------
{
	switch( req )
	{
		case "(copy)"		: cmd_setAlphaCopy();		break;
		case "(nuki)"		: cmd_setAlphaLeftup();		break;
		case "(reverse)"	: cmd_setAlphaReverse();	break;
		case "(binary)"		: cmd_setAlphaBinary();		break;
		case "(reset)"		: cmd_setAlphaReset();		break;
		case "(file.color)"	: cmd_setColorImage(elm_file1.files[0]);		break;
		case "(file.alpha)"	: cmd_setAlphaImage(elm_file2.files[0]);		break;
		case "(convert)"	: cmd_convert();			break;
		default: alert("エラーreq",req); break;
	}
}