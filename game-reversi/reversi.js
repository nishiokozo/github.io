"use strict";

//const "(Tree)" = "(Tree)";	
//const "(Name)" = "(Name)";	

const N = 8;
const u = ["a","b","c","d","e","f","g","h","i","j"];
const v = ["1","2","3","4","5","6","7","8","9","10"];
const w = {"belong黒":"黒", "belong白":"白", "":"口"};
const aiteban = {"belong黒":"belong白", "belong白":"belong黒"};


// 駒フォーマット
function Koma( type, belong )
{
	return {type:type,belong:belong};
}
function Counts( black, white )
{
	return {"belong黒":black, "belong白":white };
}

function Evaluation( e=0, u=0, counts_canput=Counts(0,0), counts_untakable=Counts(0,0) )
{
	return {
		e:e, 		//階層分析後の評価値
		u:u, 		//初期評価値
		counts_canput:counts_canput,
		counts_untakable:counts_untakable,
	};
}

function Baninfo( koma )
{
	return {
		koma:koma, 
		show_koma:koma, show_lim:0,
	};
}


// 指し手フォーマット
function Sasite( mode, tx, ty, koma, eva=Evaluation() )
{
	return {line:0, mode:mode, tx:tx, ty:ty, koma:koma, eva:eva, child:[], parent:null, flgopen:false, name:"" };
}



html.param =  
{
	// local buffer
	"html_deep_BLACK"	:{val:2		,type:"textbox"		,req:true},
	"html_deep_WHITE"	:{val:2		,type:"textbox"		,req:true},

	"html_canput"		:{val:false	,type:"checkbox"	,req:true},
	"html_untakable"	:{val:true	,type:"checkbox"	,req:true},
	"html_showeva"		:{val:true	,type:"checkbox"	,req:true},
	"html_debug_d"		:{val:true	,type:"checkbox"	,req:true},
	"html_quick"		:{val:true	,type:"checkbox"	,req:true},
	"html_one"			:{val:true	,type:"checkbox"	,req:true},

	"html_BLACK"		:{val:"hum"		,type:"selectbox"	,req:true},
	"html_WHITE"		:{val:"hum"		,type:"selectbox"	,req:true},
	"html_HELP"			:{val:"com-L3"	,type:"selectbox"	,req:true},
	
	"html_delay"		:{val:""	,type:"innerHTML"	,req:true},
	"html_cnt"			:{val:""	,type:"innerHTML"	,req:true},
	"html_error"		:{val:""	,type:"innerHTML"	,req:true},
	"html_eva"			:{val:""	,type:"innerHTML"	,req:true},
	"html_textarea"		:{val:"白d2白c3黒d3白e3白b4白c4白d4白e4白f4黒d5黒e5黒f5黒g5黒h5黒e6白f6黒g6白e7白f7白f8:黒"	,type:"textbox"		,req:true},
	"html_innerhtml"	:{val:""	,type:"innerHTML"	,req:true},

};
	//-------------------------------------------------------------
	function putKoma( x1, y1, koma )
	//-------------------------------------------------------------
	{
		if ( koma.type != "typeNone" )
		{
			if ( koma.belong == "belong黒" )
			{
				gra.color( C0 );
			}
			else
			{
				gra.color( C7 );
			}
				gra.circlefill( x1,y1,17);
		}
	}

/*
黒c3黒d3黒e3白b4白c4白d4白e4白f4白c5白d5白e5白d6黒e6
白d2白c3黒d3白e3白b4白c4白d4白e4白f4黒d5黒e5黒f5黒g5黒h5黒e6白f6黒g6白e7白f7白f8:黒
*/
const OFS=3;

const SZ = 48;
const SZ2 = 24;

// 駒版表示エリア
const BX = 90;
const BY = 25;
const BW = N*SZ;
const BH = N*SZ;
const CX = BX+BW/2;
const CY = BY+BH/2;

// 持駒左
const LX = BX-60;
const LY = BY+60;

// 持駒右
const RX = BX+BW+60;
const RY = BY+BH-SZ2*8;

// 持駒エリア右（編集用）
const MX = RX-38;
const MY = RY-12;
const MW = 38*2;
const MH = 210;

// 駒リストエリア（編集用）
const EX = BX-110;
const EY = BY-18;
const EW = 100;
const EH = 472;

const C0 = [0   ,0   ,0  ];
const C1 = [0   ,0.2 ,1  ];
const C2 = [1   ,0   ,0  ];
const C3 = [1   ,0.5 ,0  ];
const C4 = [0   ,1   ,0  ];
const C5 = [0   ,0.9 ,0.9];
const C6 = [0.9 ,0.9 ,0  ];
const C7 = [1   ,1   ,1  ];
const C8 = [0.6 ,0.6 ,0.6];
const C9 = [0.2 ,0.2 ,0.2];
const C10 = [0.5 ,0.5 ,0.5];


let gra = gra_create( html_canvas );

//-----------------------------
function put_banmen( ban )
//-----------------------------
{ // 盤面表示
	gra.backcolor(C7);
	gra.color(C9);
	gra.cls();

	{
		
		for ( let x = 0 ; x < N ;x++ )
		{
			let px = BX+x*SZ+SZ2;
			let py = BY-SZ/4;
			let s = u[x];
			gra.symbol( s, px,py, SZ/3,"CM" );
		}
		for ( let y = 0 ; y < N ; y++ )
		{
			let px = BX-SZ/4;
			let py = BY+y*SZ+SZ2;
			let s = v[y];
			gra.symbol( s, px,py, SZ/3,"CM" );
		}

		
		gra.color(C9);
		let s = 4;
		gra.fill(BX-s,BY-s,BX+SZ*N+s,BY+SZ*N+s);
		gra.color( [0.25  ,0.75   ,0.25  ]);
		gra.fill(BX,BY,BX+SZ*N,BY+SZ*N);
		gra.color(C9 );

		// 盤表示
		for ( let i = 0 ; i <= N ;i++ )
		{
			let a = i*SZ;
			let b1 = 0*SZ;
			let b2 = N*SZ;
			gra.line( BX+a, BY+b1, BX+a, BY+b2 );
			gra.line( BX+b1, BY+a, BX+b2, BY+a );
		}

		// 駒表示
		for ( let y = 0 ; y < N ;y++ )
		for ( let x = 0 ; x < N ;x++ )
		{
			let px = x*SZ+BX;
			let py = y*SZ+BY;
			let inf = ban.tblBaninfo[y*N+x];

			let x1 = px+SZ2;
			let y1 = py+SZ2;
			putKoma( x1, y1, inf.show_koma );
			gra.color( C9 );
		}
		for ( let x = 2 ; x <= 6 ;x+=4 )
		for ( let y = 2 ; y <= 6 ;y+=4 )
		{
			let px = x*SZ+BX;
			let py = y*SZ+BY;
			gra.pset(px,py,4);
		}	
	}

}
//---------------------------------------------------------------------
function ban_create()
//---------------------------------------------------------------------
{
	let ban = {};

	const tblMov=
	[
		{ax:-1,ay: 0},		// 裏返す順番でもある。左右、上下、斜めの順
		{ax: 1,ay: 0},
		{ax: 0,ay:-1},
		{ax: 0,ay: 1},
		{ax:-1,ay:-1},
		{ax: 1,ay: 1},
		{ax: 1,ay:-1},
		{ax:-1,ay: 1},
	];

	//---------------------------------------------------------------------
	ban.koma_put = function( ban, fx, fy,  koma, flgAnim )
	//---------------------------------------------------------------------
	{ // 裏返し処理

		ban.tblBaninfo[fy*N+fx] = Baninfo( koma );	

		let cnt = 0;
		for ( let mov of tblMov )
		{
			let tx = fx;
			let ty = fy;
			let step = 0;
			for ( let j = 0 ; j < N ; j++ )
			{
				tx += mov.ax;
				ty += mov.ay;
				if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

				let to = ban.tblBaninfo[ty*N+tx];

				if ( to.koma.type == "typeNone" ) break;

				if ( step == 0 && to.koma.belong == koma.belong ) break;
				if ( step == 0 && to.koma.belong != koma.belong ) step=1;
				if ( step == 1 && to.koma.belong == koma.belong ) 
				{

					let x = fx;
					let y = fy;
					for ( let i = 0 ; i < j ; i++ )
					{
						x += mov.ax;
						y += mov.ay;
						if ( flgAnim )
						{
							let inf = ban.tblBaninfo[y*N+x];
							inf.show_lim = (++cnt)*kif.upd_DELAY_2;
							inf.koma = koma;
						}
						else
						{
							let inf = ban.tblBaninfo[y*N+x];
							inf.show_lim = 0;
							inf.koma = koma;
							inf.show_koma = inf.koma;
						}
					}
					break;
				}

			}
		}

	}
	// 盤
	//---------------------------------------------------------------------
	ban.init = function()
	//---------------------------------------------------------------------
	{
		this.tblBaninfo = new Array(N*N);
		for ( let i = 0 ; i < this.tblBaninfo.length ; i++ )
		{
			this.tblBaninfo[i] = Baninfo( Koma("typeNone","") );
		}
	}
	ban.init();

	//---------------------------------------------------------------------
	ban.ban_copy = function() // 盤面コピー
	//---------------------------------------------------------------------
	{
		let to						= Object.assign({},this);
		to.tblBaninfo				= Object.assign([],this.tblBaninfo);				// 盤面実コピー
		for ( let i = 0 ; i < this.tblBaninfo.length ; i++ )
		{
			to.tblBaninfo[i]		= Object.assign({},this.tblBaninfo[i]);				// 盤面実コピー
			to.tblBaninfo[i].koma	= Object.assign({},this.tblBaninfo[i].koma);		// 盤面実コピー

		}
		return to;
	}

	//-------------------------------------------------------------
	ban.draw_analysys_canput = function()
	//-------------------------------------------------------------
	{
		for ( let y = 0 ; y < N ;y++ )
		for ( let x = 0 ; x < N ;x++ )
		{
			let cnt = 0; 
			{
				let flg = ban.check_canput( x,y, "belong黒");
				if (flg ) 
				{
					gra.color(C0);
					let str = flg?"★":"";
					kif.mark0( x, y, str, cnt++ );
				}
			}
			{
				let flg = ban.check_canput( x,y, "belong白");
				if ( flg )
				{
					gra.color(C7)
					let str = flg?"★":"";
					kif.mark0( x, y, str, cnt++ );
				}
			}
		}
	}

	//--------------------------------------
	ban.check_canput = function( fx, fy, belong )
	//--------------------------------------
	{
		let fm = this.tblBaninfo[fy*N+fx];
		if ( fm.koma.type == "typeNone" )
		{
			for ( let mov of tblMov )
			{
				let tx = fx;
				let ty = fy;
				let step = 0;
				for ( let j = 0 ; j < N ; j++ )
				{
					tx += mov.ax;
					ty += mov.ay;
					if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

					let to = this.tblBaninfo[ty*N+tx];

					if ( to.koma.type == "typeNone" ) break;

					if ( step == 0 && to.koma.belong == belong ) break;
					if ( step == 0 && to.koma.belong != belong ) step++;
					if ( step == 1 && to.koma.belong == belong ) return true;

				}
			}
		}
		return false;
	}

	//----------------------------------------------------------------------
	ban.playBySasite = function( tblSasite, line ) // 指し手から盤面際限
	//----------------------------------------------------------------------
	{
		//--------------------------------------------------------------
		function build_tejyun( tblSasite )
		//--------------------------------------------------------------
		{
			let tejyun = [];	// 指定line番号までの手順を構築
			function ana( tblSasite )
			{
				for ( let i = 0 ; i < tblSasite.length ; i++ )
				{
					let sasite = tblSasite[i];
					let next = ( i+1 < tblSasite.length )?tblSasite[i+1].line:9999999;
					if ( sasite.line == line )
					{
						tejyun.push( sasite );
						return;
					}
					if ( next > line ) 
					{
						if ( sasite.child.length > 0 )
						{
							tejyun.push( sasite );
							ana( sasite.child );
						}
						break;
					}
				}
			}

			ana( tblSasite );
			return tejyun;
		}
		let tejyun = build_tejyun( kif.tblSasite ); 

		for ( let sasite of tejyun )
		{
			kif.ban_move( this, sasite, "rec-noanm" );
		//	console.log( formatSasite( sasite ) );
		}
	
		return tejyun[ tejyun.length-1 ]; // 最後の指し手
	}



	return ban;
}


//-------------------------------------------------------------
function formatSasite( sasite ) 
//-------------------------------------------------------------
{
	return w[sasite.koma.belong]+u[sasite.tx]+v[sasite.ty];
}


let game_last_put = { flg:false, x:0, y:0, belong:""};

//----------------------------------------------------------------------
html.request = function( req )
//----------------------------------------------------------------------
{
//console.log(req);
	if ( req && req.substr(0,"(Tree)".length) == "(Tree)" )
	{
		let num = req.substr("(Tree)".length)*1;

		function ana( tree,  lvl )
		{
			for ( let a of tree )
			{
				if ( a.line == num )
				{
					a.flgopen = !a.flgopen;
				}
				if ( a.child.length > 0 ) 
				{
					ana( a.child, lvl+1 );
				}
			}

		}
		ana( kif.tblSasite, 0 );							

		{
			//Tree表示
			function foo( tree )	// line / child / flgopen / name
			{
				let s1 = (tree.child.length>0) ?( (tree.flgopen )?" －":" ＋" ) : "・";
				let tagB = "'"+"(Tree)"+tree.line+"'";
				let tagL = "'"+"(Name)"+tree.line+"'";
				let str1 = "<a onclick=html.request("+tagB+")>"+s1+"</a>";
				let str2 = "<a onclick=html.request("+tagL+")>"+tree.name+"</a>";

				return str1+str2;
				
			}
			function tree2innerHTML( tree, func )
			{
				let mojiretu = "";
				let push = function( str )
				{
					mojiretu += str;
				}
				function ana( tree,  lvl )
				{
					push( "<ul>" );
					for ( let a of tree )
					{
						push( "<li>" );
						let str = func(a);
						push( str );
						if ( a.flgopen )
						if ( a.child.length > 0 ) 
						{
							ana( a.child, lvl+1 );
						}
						push( "</li>" );
					}
					push( "</ul>" );

				}
				ana( tree, 0 );							
		
				return mojiretu;
			}
//			html.set("html_innerhtml", "<a onclick=html.request('"+"(Tree)"+"0')>"+"戻る"+"</a>" );
			html.set("html_innerhtml", tree2innerHTML(kif.tblSasite, foo ) );

		}
	}
	else
	{
		html.read_all();

		{
			let id = "html_think";
			let a = document.getElementById( id );
			if ( html.get("html_debug_d") )
			{
				a.style="visibility:visible;";	
				a.style="display:visible;";	
			}
			else
			{
				a.style="visibility:hidden";	// 隠すだけ
				a.style="display:none;"			// 存在しなかったように扱う
			}
		}
		if( req ) kif.request( req );
	}



}

let 	game_idxKif = 0;
let		game_tblKif = [];


//-----------------------------------------------------------------------------
function kif_create()
//-----------------------------------------------------------------------------
{
	let kif = {};

	kif.upd_DELAY_1 = 40;
	kif.upd_DELAY_2 = 10;


	kif.req = [];

	kif.base = ban_create();
	kif.first = ban_create();
	kif.mark_base = ban_create();
	kif.mark_flg = false;
	kif.mark_idxKif = -1;
	kif.mark_num = 0;

	kif.delay = 0;
	kif.hdlTimeout = null;

	kif.stat = "";
	kif.next = "";

	kif.x = 0;
	kif.y = 0;
	//--
	kif.players = 
	{ 
		"belong黒":{deep:html.get("html_deep_BLACK"), player_type:html.get("html_BLACK")}, 
		"belong白":{deep:html.get("html_deep_WHITE"), player_type:html.get("html_WHITE")}
	};

	kif.tblSasite = [];
	



	kif.mouse_hl = false;
	kif.mouse_hr = false;

	let game = game_create()

	

	//---------------------------------------------------------------------
	function game_create()
	//---------------------------------------------------------------------
	{
		let game = {};

		
		game.teban_belong = "belong黒";
		game.teban_flgkuro = true;

		game.flgResult = false;

		game.score={"belong黒":0,"belong白":0};

		game.showeva_flg = false;
		game.showeva_ban = new Array(N*N).fill(0);
		game.showeva_val = 0;

		return game;
	}

	// 初期化
	let se = se_create();
	gra.window(0,0,560,440);

	//---------------------------------------------------------------------
	kif.request = function( req )
	//---------------------------------------------------------------------
	{
		if ( req && req.substr(0,"(Name)".length) == "(Name)" )
		{
			let num = req.substr("(Name)".length)*1;
			kif.mark_num = num;
			req = "(Name)";
		}

		{
			kif.players = 
			{ 
				"belong黒":{deep:html.get("html_deep_BLACK"), player_type:html.get("html_BLACK")}, 
				"belong白":{deep:html.get("html_deep_WHITE"), player_type:html.get("html_WHITE")}
			}

			kif.req.push( req );
		}
	}
	//---------------------------------------------------------------------
	kif.mark0 = function( x,y,str, n )
	//---------------------------------------------------------------------
	{
		let SZ = 48;
		let px = x*SZ+BX+SZ2;
		let py = y*SZ+BY+SZ2;

		let ax = (n%4)*SZ/4-2;
		let ay = Math.floor(n/4)*SZ/4-3;

		gra.symbol(str,px-SZ/3+ax, py-SZ/4+ay, SZ/4);

	}
	//---------------------------------------------------------------------
	kif.mark = function( x,y,str, sz = 48 )
	//---------------------------------------------------------------------
	{
		let px = x*SZ+BX+SZ/2;
		let py = y*SZ+BY+SZ/2+3;

		let ax = 0;
		let ay = 0;

		gra.symbol(str,px, py, sz);

	}

	//---------------------------------------------------------------------
	kif.think = function( ban )
	//---------------------------------------------------------------------
	{
		let player_type = kif.players[game.teban_belong].player_type;
		let com_type = (player_type == "hum")?html.get("html_HELP"):player_type;
		let com_lvl = 1;
		switch(com_type )
		{
			case "com-L1":	com_lvl = 1;	break;
			case "com-L2":	com_lvl = 2;	break;
			case "com-L3":	com_lvl = 3;	break;
			case "com-L4":	com_lvl = 4;	break;
			case "com-L5":	com_lvl = 5;	break;
		}
		let tblSasite = tree_think( ban, game.teban_belong , kif.players[game.teban_belong].deep, com_lvl );



		return tblSasite;
	}

	//---------------------------------------------------------------------
	kif.update = function()
	//---------------------------------------------------------------------
	{
		{	// update時更新
			html.write_all();

			if ( html.get("html_quick") == true )	
			{
				kif.upd_DELAY_1 = 0;
				kif.upd_DELAY_2 = 0;
			}
			else
			{
				kif.upd_DELAY_1 = 40;
				kif.upd_DELAY_2 = 10;
			}

		}


		while(1)
		{
			let req = kif.req.shift();
			if ( req == null ) break;
			else
			{
				switch( req )
				{

					case "(draw)":	
						break;

					case "(none)":	
						break;

					case "(game.reset)":	
						kif.mark_base = kif.base.ban_copy();
						kif.mark_idxKif = 0;
						kif.mark_flg = false;

						kif.delay = 0;
						game_last_put.flg = false;
						game_tblKif = [];
						game_idxKif = 0;
						game.score={"belong黒":0,"belong白":0};
						game.teban_belong = "belong黒";
						game.teban_flgkuro = true;
						game.flgResult = false;
						kif.base.init();
//X点の評価が高すぎる						
/*
黒c3黒d3黒e3白b4白c4白d4白e4白f4白c5白d5白e5白d6黒e6:白
白d2白c3黒d3白e3白b4白c4白d4白e4白f4黒d5黒e5黒f5黒g5黒h5黒e6白f6黒g6白e7白f7白f8:黒
*/

						kif.ban_read( kif.base, "白d4黒e4黒d5白e5:黒");
//						kif.first = kif.base.ban_copy();
		ban_ban_copy( kif.first, kif.base );
						
						kif.request("(game.beginturn)");
						break;

					case "(game.beginturn)":
						kif.mark_base = kif.base.ban_copy();
						kif.mark_idxKif = game_idxKif;
						kif.mark_flg = true;

						kif.tblSasite = kif.think( kif.base );

						if ( html.get("html_debug_d") )
						{
							html.request( "(Tree)"+"0");
//							html.request( "X0");
							//g_reqTree = true;
						}

						kif.stat = "(stat:ingame)";
						break;

						
					case "(game.自動で打つ)":	// 実際にコンピュータの思考
						kif.stat = "(stat:think)";
						kif.next = "(game.打つ)"
						{

							if ( kif.tblSasite.length > 0 )
							{
								let max = -9999;
								let cnt = 0;
								for ( let sasite of kif.tblSasite )
								{
									if ( max < sasite.eva.e ) 
									{
										max = sasite.eva.e;
										cnt = 1;
									}
									else
									if ( max == sasite.eva.e )
									{
										cnt++;
									}
								}
								{
									let N = cnt;
									let n = Math.floor( Math.random()*Math.min(N,kif.tblSasite.length) );
									if ( html.get("html_one") )	n=0;
									let sasite = kif.tblSasite[n];	
									kif.x = sasite.tx;
									kif.y = sasite.ty;
									
								}
							}
						}
						break;

					case "(game.next)":
						{
							if ( game_idxKif < game_tblKif.length ) 
							{
								game_idxKif+=1;
								playKif( kif.base, game_idxKif );
								
							}
							html.set("html_cnt", game_idxKif );
						}
						break;

					case "(game.prev)":
						{
							game_idxKif-=1;
							if ( game_idxKif < 0  ) game_idxKif = 0;

							playKif( kif.base, game_idxKif );

							html.set("html_cnt", game_idxKif );

						}
						
						break;
						
					case "(game.打つ)":
						kif.stat = "(stat:animation)";
						kif.next = "(game.endturn)"
						let sasite = Sasite( "mode打ち", kif.x, kif.y, Koma("type歩兵",game.teban_belong ) );
						kif.ban_move( kif.base, sasite, "rec" );
						if ( html.get("html_quick") == false ) se.play(  274, 0.04428, 386, 0.1,  'sine', 0.2 );

						game_last_put = { flg:true, x:kif.x, y:kif.y, belong:game.teban_belong};
						game.showeva_flg = false;
						break;

					case "(game.endturn)":
						game.teban_belong = aiteban[game.teban_belong];//=="belong黒"?"belong白":"belong黒";

						kif.request("(game.beginturn)");
						break;

						
					case "(game.pass)":
						game.teban_belong = aiteban[game.teban_belong];//=="belong黒"?"belong白":"belong黒";

						if ( html.get("html_quick") == false ) se.play(  474, 0.024428, 886, 0.5,  'sine', 0.2 );
						kif.request("(game.beginturn)");
						break;

					case "(game.result)":
						kif.stat = "(stat:result)";

						game.score={"belong黒":0,"belong白":0};

						for ( let y = 0 ; y < N ; y++ )
						for ( let x = 0 ; x < N ; x++ )
						{
							let koma = kif.base.tblBaninfo[y*N+x].koma;
							if ( koma.type != "typeNone" )
							{
								game.score[ koma.belong ]++;
							}
						}

						game.flgResult = true;
						{
							if ( game.score[ "belong黒" ] > game.score[ "belong白"] )
							{
								se.play( 872,0.05,972,1.3,  'sine', 0.15 );
							}
							else
							{
								se.play( 672,0.05,772,1.3,  'triangle', 0.15 );
							}

						}
						break;


					case "(html_read)":
						{
							let str = html.get("html_textarea", "" );
							kif.ban_read( kif.base, str );
//							kif.first = kif.base.ban_copy();
		ban_ban_copy( kif.first, kif.base );
							kif.request("(game.beginturn)");
						}
						break;
						
					case "(html_write)":
						{
							let str = kif.ban_save(kif.base);
							html.set("html_textarea", str );
						}
						break;

					case "(Name)"://ツリー指し手のクリックで盤面再生
						{
							kif.base = kif.mark_base.ban_copy();
							game_idxKif = kif.mark_idxKif;
							game.showeva_flg = false;

							{
								let last_sasite = kif.base.playBySasite( kif.tblSasite, kif.mark_num );

								game_last_put = { flg:false };

								if ( last_sasite.child.length > 0 )
								{
									kif.make_showeva( last_sasite.child );
									if ( game_idxKif > 0 )
									{
										game_last_put = { flg:true, x:last_sasite.tx, y:last_sasite.ty, belong:last_sasite.koma.belong};
										game.teban_belong = aiteban[last_sasite.koma.belong];//=="belong黒"?"belong白":"belong黒";
									}
								}

							}
						}
						break;

					default:
						console.error("知らないコマンドが使われた:"+req);
						
				}
			}
		}


		{ // 描画
			game_update_screen( kif.base );
			if ( html.get("html_canput") ) kif.base.draw_analysys_canput();
			if ( html.get("html_untakable") ) put_untakable( kif.base );


			if ( html.get("html_showeva") )
			{
				if ( game.showeva_flg )
				{
					for ( let y = 0 ; y < N ; y++ )
					for ( let x = 0 ; x < N ; x++ )
					{
						let eva_e = game.showeva_ban[y*N+x];
						if ( eva_e == -9999 ) continue;
						if ( eva_e >= 0 )
						{
							gra.color(C2);
						}
						else
						{
							gra.color(C1);
						}
						kif.mark( x,y,eva_e,16);
						if ( eva_e == game.showeva_val ) kif.mark( x,y-0.3,"★",16);
					}

				}
			}


		}
		//
		g_mouse.hl = false;
		g_mouse.hr = false;


		if ( kif.hdlTimeout != null ) window.clearTimeout(  kif.hdlTimeout); // リアルタイムアップデート
		kif.hdlTimeout = window.setTimeout( kif.update, 16.7 ); // リアルタイムアップデート
	

	}
	//-------------------------------------------------------------
			kif.make_showeva = function( tblSasite )
	//-------------------------------------------------------------
			{
				// 盤面上のヒントを作成
				if ( tblSasite.length > 0 )
				{

					for ( let y = 0 ; y < N ; y++ )
					for ( let x = 0 ; x < N ; x++ )
					{
						game.showeva_ban[y*N+x] = -9999;
					}

					for ( let sasite of tblSasite )
					{
						let x = sasite.tx;
						let y = sasite.ty;
						game.showeva_ban[y*N+x] = sasite.eva.e;
					}

					game.showeva_flg = true;
					game.showeva_val = tblSasite[0].eva.e;
				}
			}

	//-------------------------------------------------------------
	kif.ban_move = function( ban, sasite, flgRecord )
	//-------------------------------------------------------------
	{
		let tx = sasite.tx;
		let ty = sasite.ty;

		switch( sasite.mode )
		{

			case "modeNone":
				break;

			case "mode配置盤面":
				{
					ban.tblBaninfo[ty*N+tx] = Baninfo( sasite.koma );
				}
				break

			case "mode打ち":
				{
					ban.koma_put( ban, sasite.tx, sasite.ty,  sasite.koma, flgRecord == "rec" );
	
					if(flgRecord == "rec"||flgRecord == "rec-noanm")
					{
						game_tblKif = game_tblKif.slice(0,game_idxKif);
						game_tblKif.push( sasite );
						game_idxKif++;
						html.set("html_cnt", game_idxKif );
					}
				}
				break;

			default:
				console.log("ban_move エラー:"+sasite.mode);
		}
	}
	//---------------------------------------------------------------------
	function ban_ban_copy( fm, to ) // 盤面コピー
	//---------------------------------------------------------------------
	{
		to						= Object.assign({},fm);
		to.tblBaninfo				= Object.assign([],fm.tblBaninfo);				// 盤面実コピー
		for ( let i = 0 ; i < fm.tblBaninfo.length ; i++ )
		{
			to.tblBaninfo[i]		= Object.assign({},fm.tblBaninfo[i]);				// 盤面実コピー
			to.tblBaninfo[i].koma	= Object.assign({},fm.tblBaninfo[i].koma);		// 盤面実コピー

		}
	}

	//-------------------------------------------------------------
	function ban_dump( ban )
	//-------------------------------------------------------------
	{
				console.log("--");
		for ( let y = 0 ; y < N ;y++ )
		{
			let str1 = "";
			let str2 = "";
			for ( let x = 0 ; x < N ;x++ )
			{
				let inf = ban.tblBaninfo[y*N+x];
				str1 += w[inf.koma.belong]
				str2 += w[inf.show_koma.belong]
			}
				console.log((y+1)+str1+":"+str2);
		}
	}

	//-------------------------------------------------------------
	function playKif( ban, idxKif )
	//-------------------------------------------------------------
	{

		game_last_put.flg = false;
		game.showeva_flg = false;
//		kif.ban_read( ban, "白d4黒e4黒d5白e5:黒");
		ban = kif.ban_read2( "白d4黒e4黒d5白e5:黒");
		game_idxKif = 0;
		for ( let i = 0 ; i < idxKif ; i++ )
		{
			let sasite = game_tblKif[i];
			kif.ban_move( ban, sasite, "norec-noanm" );
			game_idxKif++;
		}
ban_dump( ban );
		if ( game_idxKif > 0 )
		{
			let sasite = game_tblKif[ game_idxKif-1 ];
			game_last_put = { flg:true, x:sasite.tx, y:sasite.ty, belong:sasite.koma.belong};
			game.teban_belong = sasite.koma.belong;
			kif.request("(game.endturn)");
		}
		else
		{
			game_last_put.flg = false;
			game.teban_belong = "belong黒";
		}

	}
	//-----------------------------
	function put_laston()
	//-----------------------------
	{

		if ( game_last_put.flg )
		{
			let s = 4;
			let x = game_last_put.x*SZ+BX;
			let y = game_last_put.y*SZ+BY;

			if ( game_last_put.belong=="belong白" ) 
			{
				gra.color(C7);
			}
			else
			{
				gra.color(C9);
			}
			gra.setLineWidth(2);
			gra.circle( x+SZ2,y+SZ2,20 );
			gra.setLineWidth(1);
		}
	}
	
	//-----------------------------
	function put_jinnei()
	//-----------------------------
	{// 陣営表示
		const X0 = CX+190-190;
		const X1 = CX+130-190;
		const X2 = CX+230-190;
		const Y  = CY+200+10
		const P0 = X0-30;
		const P1 = X0+50;
		const R = 8;

		if ( game.teban_belong=="belong黒" ) 
		{
			gra.color(C0);
			gra.circlefill(P1,Y,R);
			gra.symbol( "turn:" , X0,Y,18,"CM" );
		}
		if ( game.teban_belong=="belong白" ) 
		{
			gra.color(C0);
			gra.circle(P1,Y,R);
			gra.symbol( "turn:" , X0,Y,18,"CM" );
		}
	}
	//-----------------------------
	function put_cursor( ban, mx, my )
	//-----------------------------
	{
		{
			// カーソル位置の表示
			{
				let koma = Koma("type歩兵",game.teban_belong);
				{
					let kx = Math.floor( (mx-BX)/SZ );
					let ky = Math.floor( (my-BY)/SZ );
					let x = kx*SZ+BX;
					let y = ky*SZ+BY;
					let s = 4;
					let to = ban.tblBaninfo[ky*N+kx];

					{
							putKoma( mx, my, koma );
							gra.color(C6);
						gra.setLineWidth(2);
							gra.circle( mx,my,18 );
						gra.setLineWidth(1);
					}
				}
			}
		}
	}

	//-------------------------------------------------------------
	function game_update_screen( ban )
	//-------------------------------------------------------------
	{
		put_banmen( ban );

		// マウスカーソル
		let mx = g_mouse.x*gra.size_w;
		let my = g_mouse.y*gra.size_h;

		// 盤面の表示と入力

		let counts_canput = count_canput( ban );
		let counts_untakable = count_untakable( ban );
		{

			let str = ""
			str +=       "黒"+counts_canput["belong黒"] +","+ counts_untakable["belong黒"];
			str += " : "+"白"+counts_canput["belong白"] +","+ counts_untakable["belong白"];
			html.set("html_eva", str );
		}



		put_laston();

		switch( kif.stat )
		{
			case "(stat:think)":
				{
					put_jinnei();

					if ( kif.delay > 0 )
					{
						kif.delay--;
					}
					if ( kif.delay == 0 ) 
					{
						kif.request( kif.next );
					}
				}
				break;
					
			case "(stat:animation)":
				{
	
					let flg = false;
					for ( let y = 0 ; y < N ;y++ )
					for ( let x = 0 ; x < N ;x++ )
					{
						let inf = ban.tblBaninfo[y*N+x];

						if ( inf.show_lim > 0 )
						{
							inf.show_lim--;
							if ( inf.show_lim == 0 )
							{
								if ( html.get("html_quick") == false ) se.play(  274, 0.05, 386, 0.1,  'sine', 0.2 );
							}
							flg = true;
						}
						if ( inf.show_lim == 0 )
						{
								inf.show_koma = inf.koma;
						}
					}
				
					if ( kif.delay > 0 )
					{
						kif.delay--;
					}
					if ( kif.delay == 0 && flg == false ) 
					if ( flg == false ) 
					{
						kif.request( kif.next );
					}
				}
				break;

			case "(stat:ingame)":
				{
					put_jinnei();

					if ( counts_canput["belong黒"]+ counts_canput["belong白"]== 0 )
					{
						// 決着
						kif.request("(game.result)");
					}
					else
					if ( counts_canput[ game.teban_belong ] == 0 )
					{
						// パス
						kif.request("(game.pass)");
					}
					else
					{
						// 打つ

						let px = BX;
						let py = BY;

						{
							let kx = Math.floor( (mx-px)/SZ );
							let ky = Math.floor( (my-py)/SZ );
							let x = kx*SZ+px;
							let y = ky*SZ+py;
							let s = 4;
							let to = ban.tblBaninfo[ky*N+kx];


							{
							
//console.log(kif.players[game.teban_belong], game.teban_belong );
								if ( kif.players[game.teban_belong].player_type == "hum" )
								{
									//put_cursor( ban, mx,my );
									if ( mx > px && my > py && mx < px+BW && my < py+BH )
									{
										if ( g_mouse.hl ) 
										{
											if ( g_key[KEY_2] )	// デバッグ黒を置く
											{
												let koma = Koma("type歩兵","belong黒");
												ban.tblBaninfo[ky*N+kx].koma = koma;
												ban.tblBaninfo[ky*N+kx].show_koma = koma;
											}
											else
											if ( g_key[KEY_3] )	// デバッグ白を置く
											{
												let koma = Koma("type歩兵","belong白");
												ban.tblBaninfo[ky*N+kx].koma = koma;
												ban.tblBaninfo[ky*N+kx].show_koma = koma;
											}
											else
											if ( g_key[KEY_1] )	// デバッグ消す
											{
												let koma = Koma("typeNone","");
												ban.tblBaninfo[ky*N+kx].koma = koma;
												ban.tblBaninfo[ky*N+kx].show_koma = koma;
											}
											else
											{
												let koma = Koma("type歩兵",game.teban_belong);
												if ( ban.check_canput( kx,ky, koma.belong) )
												{
													kif.x = kx;
													kif.y = ky;
													kif.request("(game.打つ)");
												}
											}

										}
									}
								}
								else
								{
											kif.delay = kif.upd_DELAY_1;
											kif.request("(game.自動で打つ)");
								}
							}

						}


					}
				}
				break;
				
			case "(stat:result)":
				{//  結果表示

					{
						const W =120;
						const H =36;
						gra.color(C0);gra.alpha(0.8);gra.fill( CX-W,CY-H,CX+W,CY+H );
						gra.color(C7);gra.alpha(0.4);gra.fill( CX-W,CY-H,CX+W,CY+H );
						gra.alpha(1.0);
						gra.color(C7);
						gra.box( CX-W,CY-H,CX+W,CY+H );

						const R = 60;

						if ( game.score[ "belong黒" ] > game.score[ "belong白"] )
						{
							gra.color(C0);gra.symbol( "●", CX-94,CY+15,60 );
							gra.color(C7);gra.symbol( "黒の勝ち！", CX,CY+15  ,28 );

						}
						else
						if ( game.score[ "belong黒" ] < game.score[ "belong白"] )
						{
							gra.color(C7);gra.symbol( "●", CX-94,CY+15,60 );
							gra.color(C7);gra.symbol( "白の勝ち！", CX,CY+15  ,28 );
						}

						if ( game.score[ "belong黒" ] == game.score[ "belong白"] )
						{
							gra.color(C7);gra.symbol( "DRAW", CX,CY+15  ,32 );
						}
					}
					{
						const X0 = CX+190-190;
						const X1 = CX+130-190;
						const X2 = CX+230-190;
						const Y  = CY-15
						gra.symbol( "    vs    " , X0,Y,20 );
						gra.color(C0);gra.symbol( "●", X1,Y,36 );
						gra.color(C7);gra.symbol( "●", X2,Y,36 );
						gra.symbol( game.score[ "belong黒" ] , X1+26,Y+2,20 );
						gra.symbol( game.score[ "belong白" ] , X2+26,Y  ,20 );
					}

				}
				break;
				
			default:
				html.set("html_error", "未定義のstat:"+kif.stat );

		}




	}

	//-------------------------------------------------------------
	kif.ban_save = function( ban )
	//-------------------------------------------------------------
	{
	
		let str = "";
		for (let y=0 ; y < N ; y++ )
		{
			for (let x=0 ; x < N ; x++ )
			{
				let koma = ban.tblBaninfo[y*N+x].koma;
				if ( koma.type != "typeNone"  )
				{
					let s2 = koma.belong=="belong黒"?"黒":"白";
					let s3 = u[x];
					let s4 = v[y];
					str += s2+s3+s4+'';
				}
			}
		}
		str += ":"; // セパレータ
		str += w[game.teban_belong];
		return str;
	}

	//-------------------------------------------------------------
	kif.ban_read = function( ban, str )
	//-------------------------------------------------------------
	{
		let to_belong = 
		{
			"黒":"belong黒",
			"白":"belong白",
		};
		let form=[["belong","x","y","(repeat)"],["belong","(repeat)"]];
		let ptr = 0;
		let step = 0;
		let flgError = false;
		function ana( ban, tbl )
		{
			let cmd = {};
			let j = 0;
			while( flgError==false )
			{
				let a = tbl[j++];
				if ( j > tbl.length ) break;
				if ( a == undefined ) return;
				if ( a instanceof Array ) {ana( ban, a );continue;}
				if ( a == "(repeat)"  ) 
				{
					if ( Object.keys(cmd).length == 0 ) break;
					if ( step == 0 )
					{
						let x		 = u.indexOf( cmd["x"] );
						let y		 = v.indexOf( cmd["y"] );
						let belong	 = to_belong[ cmd["belong"] ];
						let koma	 = Koma( "type歩兵", belong );

						if ( x==-1 || y == -1 || belong == undefined ) {flgError=true;break;}
						kif.ban_move( ban,Sasite( "mode配置盤面", x, y, koma ), "norec-noanm" );
					}
					if ( step == 1 )
					{
						let belong		 = to_belong[ cmd["belong"] ];

//						if ( x==-1 || y == -1 || belong == undefined ) {flgError=true;break;}
						if (  belong == undefined ) {flgError=true;break;};

						game.teban_belong = belong;
					}
					cmd = {};
					j = 0; 
					continue;
				}
				if ( ptr >= str.length ) break;
				let c = str.substr(ptr++,1);
				if ( c == ":" ) {step++;break;}
				cmd[a]=c;
			}
		}
		ban.init();
		ana(ban,form);

		game_last_put.flg = false;
		game.showeva_flg = false;
	}

	//-------------------------------------------------------------
	kif.ban_read2 = function( str )
	//-------------------------------------------------------------
	{
		let to_belong = 
		{
			"黒":"belong黒",
			"白":"belong白",
		};
		let form=[["belong","x","y","(repeat)"],["belong","(repeat)"]];
		let ptr = 0;
		let step = 0;
		let flgError = false;
		function ana( ban2, tbl )
		{
			let cmd = {};
			let j = 0;
			while( flgError==false )
			{
				let a = tbl[j++];
				if ( j > tbl.length ) break;
				if ( a == undefined ) return;
				if ( a instanceof Array ) {ana( ban2, a );continue;}
				if ( a == "(repeat)"  ) 
				{
					if ( Object.keys(cmd).length == 0 ) break;
					if ( step == 0 )
					{
						let x		 = u.indexOf( cmd["x"] );
						let y		 = v.indexOf( cmd["y"] );
						let belong	 = to_belong[ cmd["belong"] ];
						let koma	 = Koma( "type歩兵", belong );

						if ( x==-1 || y == -1 || belong == undefined ) {flgError=true;break;}
						kif.ban_move( ban2,Sasite( "mode配置盤面", x, y, koma ), "norec-noanm" );
					}
					if ( step == 1 )
					{
						let belong		 = to_belong[ cmd["belong"] ];

//						if ( x==-1 || y == -1 || belong == undefined ) {flgError=true;break;}
						if (  belong == undefined ) {flgError=true;break;};

						game.teban_belong = belong;
					}
					cmd = {};
					j = 0; 
					continue;
				}
				if ( ptr >= str.length ) break;
				let c = str.substr(ptr++,1);
				if ( c == ":" ) {step++;break;}
				cmd[a]=c;
			}
		}
		let ban2 = ban_create();
		ban2.init();
		ana(ban2,form);

		game_last_put.flg = false;
		game.showeva_flg = false;
		return ban2; 
	}

		
	//---------------------------------------------------------------------
	function serch_sasite( ban, teban_belong ) // 可能な指し手のリストを作成する
	//---------------------------------------------------------------------
	{
		let tblSasite = [];

		for ( let fy = 0 ; fy < N ; fy++ )
		for ( let fx = 0 ; fx < N ; fx++ )
		{
			if ( ban.check_canput( fx,fy, teban_belong) )
			{
				tblSasite.push( Sasite("mode打ち",fx,fy,Koma("type歩兵",teban_belong), Evaluation() ));
			}
		}

		return tblSasite;
	}

	//-------------------------------------------------------------
	function count_canput( ban )	// 置ける
	//-------------------------------------------------------------
	{

		let counts_canput = Counts(0,0);

		for ( let fy = 0 ; fy < N ; fy++ )
		for ( let fx = 0 ; fx < N ; fx++ )
		{
			if ( ban.check_canput( fx,fy, "belong白") ) counts_canput[ "belong白" ]++;
			if ( ban.check_canput( fx,fy, "belong黒") ) counts_canput[ "belong黒" ]++;
		}

		return counts_canput;
	}
	let onece = true;

	//-------------------------------------------------------------
	function calc_untakable( ban )	// 取れない
	//-------------------------------------------------------------
	{
		let tmp = new Array(N*N).fill(0);

		for ( let j = 0 ; j < N ; j++ )
		{
			
			if ( 0 != farmcount( 0  ,   j, 1, 0 ) ) farmcount( N-1,   j,-1, 0 );
			if ( 0 != farmcount( j  ,   0, 0, 1 ) ) farmcount( j  , N-1, 0,-1 );
			if ( 0 != farmcount( 0  ,   j, 1, 1 ) ) farmcount( N-1-j,   N-1, -1, -1 );				// ＼方向左下半分
			if ( j > 0 ) if ( 0 != farmcount( j  ,   0, 1, 1 ) ) farmcount( N-1  , N-1-j, -1, -1 );	// ＼方向右上半分

			if ( 0 != farmcount( j  ,   0, -1, 1 ) ) farmcount( 0  , j,  1,-1 ); 					// ／方向左上半分
			if ( j > 0 ) if ( 0 != farmcount( j  , N-1,  1,-1 ) ) farmcount( N-1  ,j, -1, 1 ); 		// ／方向右下半分
		}
		
		
		function farmcount( fx, fy, ax, ay )
		{ 
			let koma = ban.tblBaninfo[fy*N+fx].koma;
			if ( koma.type == "typeNone" ) return;

			let tx = 0;
			let ty = 0;
			let buf = Array(N).fill(0);

			// ①空きの数（＝ひっくり返る可能性のある最大数）を数える。
			let cntAki = 0;
			tx = fx;
			ty = fy;
			for ( let j = 0 ; j < N ; j++ )
			{
				if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;
				let koma = ban.tblBaninfo[ty*N+tx].koma;
				if ( koma.type == "typeNone" ) cntAki++;

				tx += ax;
				ty += ay;
			}

			// ②変化の最大数を取得して置く
			let belong = "";
			let cntMax = 0;
			tx = fx;
			ty = fy;
			for ( let j = 0 ; j < N ; j++ )
			{
				if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;
				let koma = ban.tblBaninfo[ty*N+tx].koma;
				if ( koma.type == "typeNone"  ) break;
				if ( koma.belong != belong ) 
				{
					belong = koma.belong;
					cntMax++; //色が変わる数の最大値
				}

				tx += ax;
				ty += ay;
			}

			function chk_buf( buf, j )
			{
				if ( j < 0 ) return true;
				if ( buf[j] > 0 ) return true;
				return false;
			}

			// ➂確実に存在する取れない駒から順にチェック。
			belong = "";
			let cntCol = 0;
			tx = fx;
			ty = fy;
			for ( let j = 0 ; j < N ; j++ )
			{
				if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;
				let koma = ban.tblBaninfo[ty*N+tx].koma;
				if ( koma.type == "typeNone"  ) break;

				if ( koma.belong != belong ) 
				{
					belong = koma.belong;
					cntCol++; //色が変わる数をカウント。cntAki（空きの数）以下なら取られる可能性はある。
				}

				if ( cntCol > Math.max( 1, cntMax - cntAki) ) break;

				if ( chk_buf( buf, j-1 ) ) buf[j] = 1;

				tx += ax;
				ty += ay;
			}

			tx = fx;
			ty = fy;
			for ( let j = 0 ; j <= N ; j++ )
			{
				if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;
				if ( buf[j] ) tmp[ty*N+tx]++;
				tx += ax;
				ty += ay;
			}

			return cntAki;
		}

		return tmp;
	}
	//-------------------------------------------------------------
	function put_untakable( ban )	// 取れない
	//-------------------------------------------------------------
	{

		let tmp = calc_untakable( ban );

		gra.color( C3 );
		for ( let fy = 0 ; fy < N ; fy++ )
		for ( let fx = 0 ; fx < N ; fx++ )
		{
			if ( tmp[fy*N+fx] >= 4 )
			gra.color(C3)
			else
			gra.color(C5)
			
			if ( ban.tblBaninfo[fy*N+fx].show_lim == 0 )
			if ( tmp[fy*N+fx] >=4 )
					kif.mark( fx,fy,tmp[fy*N+fx],16)
		}	
		gra.color( C8 );

		return Counts(0,0);
	}

	//---------------------------------------------------------------------
	function count_untakable( ban )
	//---------------------------------------------------------------------
	{
		let counts_untakable = Counts(0,0);

		let tmp = calc_untakable( ban );
		for ( let fy = 0 ; fy < N ; fy++ )
		for ( let fx = 0 ; fx < N ; fx++ )
		{
			let koma = ban.tblBaninfo[fy*N+fx].koma;

			if ( koma.type != "typeNone" )
			{
				if ( tmp[fy*N+fx] >= 4 )
				{
					counts_untakable[ koma.belong ]++;
				}

			}

		}
		return counts_untakable;
	}

	//---------------------------------------------------------------------
	function eva_sasite( ban, teban_belong, fx,fy, counts_untakable0 ) // 評価関数
	//---------------------------------------------------------------------
	{
		let counts_canput = count_canput( ban );
		let eva_v = counts_canput[teban_belong];
		let eva_w = counts_canput[aiteban[teban_belong]];

		let counts_untakable = count_untakable( ban );
		let eva_a0 = counts_untakable0[teban_belong];
		let eva_b0 = counts_untakable0[aiteban[teban_belong]];
		let eva_a1 = counts_untakable[teban_belong];
		let eva_b1 = counts_untakable[aiteban[teban_belong]];
		let eva_a = eva_a1 - eva_a0;
		let eva_b = eva_b1 - eva_b0;

		function cmp_1b()			//	相手の手を減らす手優先
		{
			let v1 = eva_v;			// 降順：自分の手数
			let v2 = -eva_w;		// 昇順：相手の手数
			return v1+v2*100;
		}
		function cmp_2b()			//	自分の手を増やす手優先
		{
			let v1 = eva_v;			// 昇順：自分の手数
			let v2 = -eva_w;		// 降順：相手の手数
			return v1*100+v2;
		}
		function cmp_3b()			//	自分と相手の手の差が増える手を優先
		{
			let v1 = eva_v-eva_w;
			let c = v1;
			let w1 = Math.min(eva_v,eva_w);
			let d = w1;
			return c+d;
		}
		function cmp_4a()			//	自分の手を伸ばすことだけ考える
		{
			let v1 = eva_v;			// 降順：自分の手数
		
			return v1;
		}
		function cmp_4b()			//	手数の差が開くように打つ
		{
			let v1 = eva_v-eva_w;
		
			return v1;
		}
		function cmp_4c()			//	相手の手を減らすことだけ考える
		{
			let v1 = -eva_w;			// 降順：相手の手数
		
			return v1;
		}
		function cmp_5()			//	確定駒が増えるように打つ、手数の差が開くように打つ
		{
			let v1 = eva_v-eva_w;
			let v2 = eva_a-eva_b;
	//			let a=eva_a-eva_a0;
	//		let b=eva_b-eva_b0;
	//		let v2 = a-b;
			return v1+v2;
		}
		let e = cmp_5();

		if ( 0 )
		{
			if ( fx == 0 && fy == 0 ) e+=4;	//	角なら評価を上げる
			if ( fx == 7 && fy == 0 ) e+=4;
			if ( fx == 0 && fy == 7 ) e+=4;
			if ( fx == 7 && fy == 7 ) e+=4;

			if ( fx == 1 && fy == 1 ) e-=3;	//	X位置なら評価を下げる
			if ( fx == 6 && fy == 1 ) e-=3;
			if ( fx == 1 && fy == 6 ) e-=3;
			if ( fx == 6 && fy == 6 ) e-=3;

			if ( fx == 1 && fy == 0 || fx == 0 && fy == 1 ) e-=2;	//	角横なら評価を下げる
			if ( fx == 6 && fy == 0 || fx == 7 && fy == 1 ) e-=2;	//	角横なら評価を下げる
			if ( fx == 0 && fy == 6 || fx == 1 && fy == 7 ) e-=2;	//	角横なら評価を下げる
			if ( fx == 7 && fy == 6 || fx == 6 && fy == 7 ) e-=2;	//	角横なら評価を下げる
		}

	///	if ( e == 0 ) e= 0;//0.1;

		return Evaluation(e,e, counts_canput, Counts(eva_a,eva_b));
	}


	//-------------------------------------------------------------
	function tree_think( ban, teban_belong, nest, com_lvl )
	//-------------------------------------------------------------
	{
		function copymove( ban, sasite )
		{
			let ban2 = ban.ban_copy();
			kif.ban_move( ban2, sasite, "norec-noanm" );
			return ban2
		}

		let counts_untakable0 = count_untakable( ban );

		function addeva( tblSasite, ban, teban  )
		{

			for ( let sasite of tblSasite )
			{
				let ban2 = ban.ban_copy();
				kif.ban_move( ban2, sasite, "norec-noanm" );
				sasite.eva = eva_sasite( ban2, teban, sasite.tx, sasite.ty, counts_untakable0 );
			}
		
		}

		function sasite_search_caleva( ban2, teban )
		{
			let tblSasite2 = serch_sasite( ban2, teban);

			//評価
			addeva( tblSasite2, ban2, teban );
			return tblSasite2
		}

		// 第一階層
		let teban = teban_belong;
		let tblSasite = sasite_search_caleva( ban, teban );

		// 第２階層
		if ( com_lvl >= 2 )
		{
			teban = (teban == "belong黒")? "belong白":"belong黒";
			for ( let sasite of tblSasite )
			{
				let ban2 = ban.ban_copy();
				kif.ban_move( ban2, sasite, "norec-noanm" );

				sasite.child = sasite_search_caleva( ban2, teban );
				sasite.child.parent = sasite;
			}
		}

		// 第３階層
		if ( com_lvl >= 3 )
		{
			teban = (teban == "belong黒")? "belong白":"belong黒";
			for ( let sasite of tblSasite )
			{
				let ban2 = ban.ban_copy();
				kif.ban_move( ban2, sasite, "norec-noanm" );

				for ( let sasite2 of sasite.child )
				{
					let ban3 = ban2.ban_copy();
					kif.ban_move( ban3, sasite2, "norec-noanm" );

					sasite2.child = sasite_search_caleva( ban3, teban );
					sasite2.child.parent = sasite2;
				}
			}
		}

		// 第４階層
		if ( com_lvl >= 4 )
		{
			teban = (teban == "belong黒")? "belong白":"belong黒";
			for ( let sasite of tblSasite )
			{
				let ban2 = ban.ban_copy();
				kif.ban_move( ban2, sasite, "norec-noanm" );

				for ( let sasite2 of sasite.child )
				{
					let ban3 = ban2.ban_copy();
					kif.ban_move( ban3, sasite2, "norec-noanm" );

					for ( let sasite3 of sasite2.child )
					{
						let ban4 = ban3.ban_copy();
						kif.ban_move( ban4, sasite3, "norec-noanm" );

						sasite3.child = sasite_search_caleva( ban4, teban );
						sasite3.child.parent = sasite3;
					}
				}
			}
		}

		// 第５階層
		if ( com_lvl >= 5 )
		{
			teban = (teban == "belong黒")? "belong白":"belong黒";
			for ( let sasite of tblSasite )
			{
				let ban2 = ban.ban_copy();
				kif.ban_move( ban2, sasite, "norec-noanm" );

				for ( let sasite2 of sasite.child )
				{
					let ban3 = ban2.ban_copy();
					kif.ban_move( ban3, sasite2, "norec-noanm" );

					for ( let sasite3 of sasite2.child )
					{
						let ban4 = ban3.ban_copy();
						kif.ban_move( ban4, sasite3, "norec-noanm" );

						for ( let sasite4 of sasite3.child )
						{
							let ban5 = ban4.ban_copy();
							kif.ban_move( ban5, sasite4, "norec-noanm" );

							sasite4.child = sasite_search_caleva( ban5, teban );
							sasite4.child.parent = sasite4;
						}
					}
				}
			}
		}


//X点の評価が高すぎる						
/*
黒c3黒d3黒e3白b4白c4白d4白e4白f4白c5白d5白e5白d6黒e6:白
白d2白c3黒d3白e3白b4白c4白d4白e4白f4黒d5黒e5黒f5黒g5黒h5黒e6白f6黒g6白e7白f7白f8:黒
白a1白b1白c1白d1白e1白f1黒h1白a2白b2白c2白d2白e2白f2黒g2白b3黒c3白d3黒e3黒f3白b4白c4黒d4黒e4黒f4黒g4黒h4黒c5黒d5黒e5白f5黒g5黒h5黒c6白e6白f6黒g6白e7白f7白f8:黒

*/


		// 深度の深い情報で評価値を再評価
		function ana_reeva( tblSasite, flgSemekata, lvl )
		{
			let val = flgSemekata ? -9999 : 9999; // 攻め方なら最善手、守り方なら最悪手を

			for ( let sasite of tblSasite )
			{
				let val2 = sasite.eva.e;
				if ( sasite.child.length > 0 ) 
				{
					val2 = ana_reeva( sasite.child, !flgSemekata, lvl+1 );
					sasite.eva.e = val2; 			// 評価値を更新
				}
				if (  flgSemekata && val < sasite.eva.e ) val = sasite.eva.e;
				if ( !flgSemekata && val > sasite.eva.e ) val = sasite.eva.e;
				
			}

			return val;
		}
		ana_reeva( tblSasite, true, 0 );

		// 有力な手順でソート	※実用性としては一番上の階層のソートだけで十分だけど、見やすいように全部ソート
		{
			function ana_sort( tblSasite, flgSemekata )
			{
				if ( flgSemekata )
				tblSasite.sort(function(a,b){return b.eva.e - a.eva.e;});
				else
				tblSasite.sort(function(a,b){return a.eva.e - b.eva.e;});

				for ( let sasite of tblSasite )
				{
					if ( sasite.child.length > 0 ) 
					{
						ana_sort( sasite.child, !flgSemekata );
					}
					
				}
			}
			ana_sort( tblSasite, true );
		}

/*		// ナンバリング		※これも実用上は不要だが、簡易検索用にライン番号をつけておく
		if(0)
		{
			{
				let line = 0;
				function anaprint( tblSasite,  lvl )
				{
					for ( let sasite of tblSasite )
					{
						line++;
						sasite.line = line;
						if ( sasite.child.length > 0 ) 
						{
							anaprint( sasite.child, lvl+1 );
						}
					}

				}
				anaprint( tblSasite, 0 );							

			}
		}
*/

		// ルート接地		※これも実用上は不要だが、盤面検討のツリー表示用にルート木を作る
		if(1)
		{
				let tbl = [];
				let st = Sasite( "modeNone", game_last_put.x,game_last_put.y, Koma("type歩兵",game_last_put.belong) );
				st.child = tblSasite;
/*
				function getname( sasite )
				{
					let s2 = " ("+sasite.eva.e+")"
					let s3 = formatSasite( sasite );
					let s4 = " : ["+sasite.eva.counts_canput["belong黒"]
							+","+sasite.eva.counts_canput["belong白"]+"] ";
					let s5 = "["+sasite.eva.counts_untakable["belong黒"]
							+","+sasite.eva.counts_untakable["belong白"]+"] ";
					let s6 = " "+sasite.eva.u;
					let str = s3+s2+s4+s5;//+s6;

					if ( sasite.child.length>0 ) str = s3+s2;
					return str;
				}
				st.name = "(root)";
				st.name = getname( st );
*/				st.flgopen = true;
				tbl.push( st );
				tblSasite = tbl;
		}

		// ナンバリング		※これも実用上は不要だが、簡易検索用にライン番号をつけておく
		// ネーミング		※これも実用上は不要だが、盤面検討のツリー表示用に名前を付けておく
		{
			{
				function getname( sasite )
				{
					let s2 = " ("+sasite.eva.e+")"
					let s3 = formatSasite( sasite );
					let s4 = " : ["+sasite.eva.counts_canput["belong黒"]
							+","+sasite.eva.counts_canput["belong白"]+"] ";
					let s5 = "["+sasite.eva.counts_untakable["belong黒"]
							+","+sasite.eva.counts_untakable["belong白"]+"] ";
					let s6 = " "+sasite.eva.u;
					let str = s3+s2+s4+s5;//+s6;

					if ( sasite.child.length>0 ) str = s3+s2;
					return str;
				}
				
				let line = 0;
				function anaprint( tblSasite,  lvl )
				{
					for ( let sasite of tblSasite )
					{
						line++;
						sasite.line = line;
						if ( game_idxKif+lvl > 0 )
						{
							sasite.name = getname( sasite );
						}
						else
						{
							sasite.name = "(start)";
						}
						if ( sasite.child.length > 0 ) 
						{
							anaprint( sasite.child, lvl+1 );
						}
					}

				}
				anaprint( tblSasite, 0 );							

			}
		}


		// root 追加
		if(0)
		{
				let tbl = [];
				let st = Sasite( "modeNone", N,N, Koma("typeNone","") );
				st.child = tblSasite
				st.name = "(root)";
				tbl.push( st );
				tblSasite = tbl;
		}

		return tblSasite;
	
	}

	//-------------------------------------------------------------
	kif.tree_play = function( ban, tblSasite, id )
	//-------------------------------------------------------------
	{
		let cnt = 0;
		function tree_play0( tblSasite, lvl, tume0 )
		{
			for ( let sasite of tblSasite )
			{
				cnt++;

				let tume = tume0.concat( [sasite] );
				if ( id == cnt  ) 
				{
					for ( let sasite of tume )
					{
						kif.ban_move( ban, sasite, "norec-noanm" );
					}
					return;	
					
				}

				tree_play0( sasite.child, lvl+1, tume );
			}
		}
		tree_play0( tblSasite, 0, [] );
	}

	//-------------------------------------------------------------
	function pXutKoma_siz( x1, y1, koma, siz=17 )
	//-------------------------------------------------------------
	{
		if ( koma.type != "typeNone" )
		{
			if ( koma.belong == "belong黒" )
			{
				gra.color( C0 );
			}
			else
			{
				gra.color( C7 );
			}
				gra.circlefill( x1,y1,siz);
		}
	}



	return kif;
}
