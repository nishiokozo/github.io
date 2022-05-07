"use strict";

	// ◆詰みの条件
	// 
	// 王手が掛かっている
	// 
	// 王が移動できる場所が無い
	// 
	// 合間出来ない
	// 
	// 王手をかけている相手を取れない
	// 

	// ◆王手の時
	// 
	// 逃げる
	// 
	// 相手を取る
	// 
	// 合間をする
	// 

	// ◆王手放置対策
	// 
	// 王手放置対策①：敵の攻撃エリアに対し、王が自ら入り込む手筋は不要→あると無駄に検索量が増える
	//
	// 王手放置対策②：王が取れる状態において、王を取る以外の手筋は不要→あると無駄に検索量が増える
	// 
	// 王手放置対策➂：王手に対し、a逃げる、b相手を取る、c合間する、以外の手筋は不要→あると無駄に検索量が増える


let kif = kif_create();

function html_getByID_innerHTML( name )
{
	let val = 0;
	if ( document.getElementById( name ) )
	{
		val = document.getElementById( name ).innerHTML;
	}
	return val;
}
function html_setByID_innerHTML( name, val  )
{
	if ( document.getElementById( name ) )
	{
		document.getElementById( name ).innerHTML = val;
	}
}
//-----------------------------------------------------------------------------
window.onload = function()
//-----------------------------------------------------------------------------
{
//	html_setByID_innerHTML("html_title", "詰将棋を解くプログラム");
 
	switch(7)	// 三つの詰め上がりパターン
	{
	case 0:// ３手詰め
		kif.ban_read( kif.base, "▽３一香▲１一角▽３二玉▲４三歩▲２三香▲１三龍▽４四歩▽３四歩::");
		break;
	case 1:// 一手詰め
		kif.ban_read( kif.base, "▽３一歩▽２一玉▲２三銀:銀:");
		break;
	case 2:// ０手詰み王手、後手番開始、
		kif.ban_read( kif.base, "▽３一歩▽２一玉▽１一銀▲２二金▲２三銀::");
		break;
	case 3:// １手詰め。縛り撃ち
		kif.ban_read( kif.base, "▲３一飛▽２一銀▽１一玉▲１三歩:金:");
		break;
	case 4:// 詰まず。 合間可
		kif.ban_read( kif.base, "▽２一銀▽１一玉▲２三銀▽１四歩:香:");
		break;
	case 5:// ３手詰め。合間不可、香成
		kif.ban_read( kif.base, "▽３一歩▽１一玉▲２三銀▽１四歩:香:");
		break;
	case 6://詰まず。打ち歩詰め。 
		kif.ban_read( kif.base, "▽２一桂▽１一玉▲２三銀▽１四歩:歩:");
		break;
	case 7://三手詰め。合間不可+無駄合間不可２
		kif.ban_read( kif.base, "▽３一歩▽１一玉▲２三銀▽１四歩:香:");
		break;
	case 8://３手詰め 134 テスト
		kif.ban_read( kif.base, "▲１一飛▽３二歩▽２二玉▲１二角▽３三金:金:");
		break;
	case 9:// 不成不可ケース
		kif.ban_read( kif.base, "▽２一歩▽１一玉▲２三歩▲１四桂▲１五香::");
		break;
	case 10:// ５手詰め 当初解けなかったケース2022/01/18
		kif.ban_read( kif.base, "▲３三馬▽５四銀▽４四桂▽２四馬▽３五玉▲２五歩▽１五銀▲７六龍▲１七桂▲２八銀:桂金:" );
		break;
	case 11:// ５手詰め 
		kif.ban_read( kif.base, "▲５二龍▲４二銀▽２二玉▲１二角▽３四歩▽４四歩▲２四桂▲１四香::");
		break;
	case 12:// １手詰め 解けなかったことのあるケース 2022/01/18
		kif.ban_read( kif.base, "▲３三馬▽５四銀▽２四馬▽４五玉▲２五歩▽１五銀▽５六桂▲２六龍▲１七桂▲２八銀:桂:");
		break;
	case 13:// ７手詰め フリーズしたケース 
		kif.ban_read( kif.base, "▽９一香▽８一玉▲５二飛▽８三歩▲５三馬▽９四金▽７四角:銀:");
		break;
	case 14:// ９手詰め フリーズしたケース 
		kif.ban_read( kif.base, "▽４一歩▲４二と▲１二馬▽５三歩▽３三玉▽５四銀▲２五飛▲３六歩:金:");
		break;
		
	}
	kif.base.setup();
	kif.request("(draw)");
	kif.update();
}

//---------------------------------------------------------------------
function serch_sasite( ban, teban_belong ) // 可能な指し手のリストを作成する
//---------------------------------------------------------------------
{
	let tblSasite = [];

	// 玉将を探す
	let [ox,oy]=ban.serch_oh();
	if ( ox != -1 ) 
	{
		ban.baninfo_analysys_types( "belong先手",ox,oy );				// 解析 王手がかけられるエリア
		ban.baninfo_analysys_dengers( ox, oy );							// ▽番解析 攻撃エリア
		ban.baninfo_analysys_heros();									// ▽番解析 攻撃エリア
		//-------------------------------------------------
		function sasite_on( ban, x, y, tx, ty, koma, attr )
		//-------------------------------------------------
		{
			let flgHissu = false;

			let inf = kif.infKomadata[ koma.type ];
			if ( ( koma.belong == "belong先手" ) )
			{
				let idx;
				function check( type )
				{
					{
						// 仮盤面上で空き王手になってないかを確認する
						let tmp = ban.ban_copy();
						tmp.ban_move( Sasite(1.0,"mode移動",x,y,tx,ty,koma,"") ); // 仮移動
						tmp.baninfo_analysys_dengers( ox, oy );					// 解析 攻撃エリア
						if ( tmp.tblBaninfo[oy*N+ox].dengers.length > 0 )
						{
							return 0; // 空き王手
						}
					}

					return ban.tblBaninfo[ty*N+tx].types.indexOf( type )
				}

				if ( (ty <= 2 || y <= 2) && inf.nari == "必須" )
				{
					idx = check( inf.ntype );
					if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr));
				}
				else
				if ( (ty <= 2 || y <= 2) && inf.nari == "選択" )
				{
					idx = check( inf.ntype );
					if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr));

					function checkFunariFuka()	// 不成不可のケース
					{
						if ( koma.type == "type桂馬" && ty < 2 ) return true;
						if ( koma.type == "type香車" && ty == 0 ) return true;
						if ( koma.type == "type歩兵" && ty == 0 ) return true;
						return false;
					}
					if ( checkFunariFuka() == false )
					{
						idx = check( koma.type );
						if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
					}
				}
				else
				{
					idx = check( koma.type );
					if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
				}
			}
			else
			{
				if ( (ty >= 5 || y >= 5) && inf.nari == "必須" )
				{
					tblSasite.push( Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr));
				}
				else
				if ( (ty >= 5 || y >= 5) && inf.nari == "選択" )
				{
					tblSasite.push( Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr));

					function checkFunariFuka()	// 不成不可のケース
					{
						if ( koma.type == "type桂馬" && ty > 6 ) return true;
						if ( koma.type == "type香車" && ty == 8 ) return true;
						if ( koma.type == "type歩兵" && ty == 8 ) return true;
						return false;
					}
					if ( checkFunariFuka() == false )
					{
						tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
					}
				}
				else
				{
					tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
				}
			}
		}

		for ( let y = 0 ; y < N ;y++ )
		for ( let x = 0 ; x < N ;x++ )
		{
			let koma_fm = ban.tblBaninfo[y*N+x].koma;								// 移動元
	
			if ( koma_fm.type == "typeNone" ) 										// 置き駒
			{
				for ( let type of Object.keys( ban.tblKomadai[teban_belong] ) )		// 駒台
				{
					 let val = ban.tblKomadai[teban_belong][type];					// 駒数
					 if ( val > 0 )
					 {
						if ( teban_belong == "belong先手" )							// 王手
						{
							let idx = ban.tblBaninfo[y*N+x].types.indexOf( type );
							if ( idx >= 0 )
							{
								function check_utifuzume() 	//打ち歩詰めチェック
								{
									if ( type == "type歩兵" )
									{
										let tmp = ban.ban_copy();
										tmp.ban_move( Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,teban_belong),"王手")); 
										let tbl = serch_sasite( tmp, "belong後手" );
										return ( tbl.length == 0 )
									}
									return false;
								}
							 	// ▲王手
							 	if ( check_utifuzume() == false )
							 	{
									tblSasite.push( Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,teban_belong),"王手"));
								}
							}
						}
						else
						if ( teban_belong == "belong後手" )	
						{
							let dengers_o = ban.tblBaninfo[oy*N+ox].dengers;
							if ( dengers_o.length == 1 )								// 一か所からのみの攻撃
							{
								let tbl = [ "type飛車", "type角行","type香車","type龍王","type竜馬" ];
								if ( tbl.indexOf( dengers_o[0].koma.type ) >= 0 )		// 飛び道具なら
								{
									// 攻撃の方向
									let ax0 = dengers_o[0].x - ox;
									let ay0 = dengers_o[0].y - oy;

									// 升目の方向
									let bx0 = x - ox;
									let by0 = y - oy;

									let ax = Math.sign(ax0);
									let ay = Math.sign(ay0);
									let bx = Math.sign(bx0);
									let by = Math.sign(by0);

									if( ax==bx && ay==by )								// 軌道が同じ
									{
										let al = Math.max(Math.abs(ax0),Math.abs(ay0));
										let bl = Math.max(Math.abs(bx0),Math.abs(by0));
										if ( bl < al )									// 攻撃駒範囲内
										{
											let dengers = ban.tblBaninfo[y*N+x].dengers;
											let heros   = ban.tblBaninfo[y*N+x].heros;
											if ( heros.length >= dengers.length )		// 防御が攻撃と同等以上
											{
												function check_nifu() 	//二歩チェック
												{
													if ( type == "type歩兵" )
													{
														// 仮盤面上で打ち歩詰めになっていないかを確認する
														for ( let i = 0 ; i < N ; i++ )
														{
															if ( ban.tblBaninfo[i*N+x].koma.type == type ) return true;
														}
													}
													return false;
												}

												// ▽合間
												if ( check_nifu() == false )
												{
													tblSasite.push( Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,teban_belong),"合間"));
												}
											}
										}
									}
								}
							}
						}
					 }
				}
			}
			else
			if ( koma_fm.belong == teban_belong )			// 移動駒
			{
				let mov = kif.infKomadata[ koma_fm.type ].mov;

				for ( let i = 0 ; i < mov.length ; i++ )
				{
					let n  = mov[i].n;
					let ax = mov[i].ax;
					let ay = mov[i].ay*(koma_fm.belong == "belong先手"?1:-1);
					let tx = x;
					let ty = y;
					for ( let j = 0 ; j < n ; j++ )
					{
						tx += ax;
						ty += ay;
						if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

						let koma_to = ban.tblBaninfo[ty*N+tx].koma;	

						// 味方駒があったら、その手前で検索中断
						if ( koma_to.belong == koma_fm.belong ) break;		

						if ( koma_fm.belong == "belong先手")	// ▲王手
						{
							sasite_on( ban, x, y, tx, ty, koma_fm, "王手" );
						}
						else
						if ( koma_fm.belong == "belong後手" )
						{
							if ( koma_fm.type == "type玉将" )
							{
								// ▽王逃げ
								if ( ban.tblBaninfo[ty*N+tx].dengers.length == 0 )
								{
									tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma_fm,"逃げ "));
								}
							}
							else
							{
								// ▽迎撃
								let dengers = ban.tblBaninfo[oy*N+ox].dengers;
								if ( dengers.length == 1 ) // 王への攻撃元が一つだけなら迎撃
								{
									if ( tx == dengers[0].x && ty == dengers[0].y )
									{
										// 仮盤面上で空き王手になってないかを確認する
										let tmp = ban.ban_copy();
										tmp.ban_move( Sasite(1.0,"mode移動",x,y,tx,ty,koma_fm,"") );
										tmp.baninfo_analysys_dengers( ox, oy );		// 解析 攻撃エリア
										if ( tmp.tblBaninfo[oy*N+ox].dengers.length == 0 )
										{
											sasite_on( ban, x, y, tx, ty, koma_fm, "迎撃" );
										}
									}
								}
							}
						}

						// 敵駒があったら、その駒の所で検索中断
						if ( koma_to.type != "typeNone" && koma_to.belong != koma_fm.belong ) break;		

					}
				}
			}
		}

	}

	return tblSasite;
}


function log_ban( ban )
{
	for (let y=0 ; y < N ; y++ )
	{
		let line="";
		for (let x=0 ; x < N ; x++ )
		{
			let koma = ban.tblBaninfo[y*N+x].koma;
			let str = kif.infKomadata[ koma.type ].name;
			str = str!=""?str:"口";
			line+=str;

					kif.mark( x, y, str, 0,koma.belong);

		}
		console.log( line );
	}
}

//-----------------------------------------------------------------------------
function html_req( num )
//-----------------------------------------------------------------------------
{
	console.log( "req=",num );
if(1)
{
	kif.tmp = kif.base.ban_copy();
	kif.tmp.tree_play( kif.tmp, kif.tree, num );
	kif.update_draw( kif.tmp );	
}
else
{


	let tmp = kif.base.ban_copy();
	tmp.tree_play( tmp, kif.tree, num );
	kif.update_draw( tmp );	

//	log_ban( tmp );
	{
		let x=7;
		let y=0;
		let koma = tmp.tblBaninfo[y*N+x].koma;
//		console.log(koma.type);
	}

}

	
}
//-----------------------------------------------------------------------------
function html_request( cmd )
//-----------------------------------------------------------------------------
{
	kif.debug_d = html_get_value_checkbox( "html_debug_d" );
	kif.deep = html_get_value_id( "html_deep" );

	//
	kif.request(cmd);
	kif.update();
}



// キー入力
let g_key=Array(256);
//-----------------------------------------------------------------------------
window.onkeyup = function( ev )
//-----------------------------------------------------------------------------
{
	g_key[ev.keyCode]=false;
}
//-----------------------------------------------------------------------------
window.onkeydown = function( ev )
//-----------------------------------------------------------------------------
{
	g_key[ev.keyCode]=true;
	if ( g_key[KEY_D] )		
	{
		let item = document.getElementsByName( "html_debug_d" )[0];
		if ( item ) item.checked = !item.checked;
		html_request();
	}
	if ( g_key[KEY_F] )		
	{
		let item = document.getElementsByName( "html_debug_f" )[0];
		if ( item ) item.checked = !item.checked;
		html_request();
	}
	if ( g_key[KEY_G] )		
	{
		let item = document.getElementsByName( "html_debug_g" )[0];
		if ( item ) item.checked = !item.checked;
		html_request();
	}
	if ( g_key[KEY_H] )		
	{
		let item = document.getElementsByName( "html_debug_h" )[0];
		if ( item ) item.checked = !item.checked;
		html_request();
	}
	if ( g_key[KEY_R] 		)	html_request('(reset)');
	if ( g_key[KEY_LEFT] 	)	html_request('(前)');
	if ( g_key[KEY_RIGHT]	)	html_request('(次)');
	if ( g_key[KEY_CR] 		)	html_request('(再生)');
	if ( g_key[KEY_SPC] ) return false; // falseを返すことでスペースバーでのスクロールを抑制
}

//マウス入力
let g_mouse = {x:0,y:0,l:false,r:false,hl:false,hr:false};
document.onmousedown = mousemovedown;
document.onmouseup = mousemoveup;
document.onmousemove = onmousemove;
//-----------------------------------------------------------------------------
function mousemoveup(e)
//-----------------------------------------------------------------------------
{
	if ( e.button==0 )	g_mouse.l=false;
	if ( e.button==2 )	g_mouse.r=false;
}
//-----------------------------------------------------------------------------
function mousemovedown(e)
//-----------------------------------------------------------------------------
{
	if ( e.button==0 && g_mouse.l == false )	g_mouse.hl = true;
	if ( e.button==2 && g_mouse.r == false )	g_mouse.hr = true;

	if ( e.button==0 )	g_mouse.l = true;
	if ( e.button==2 )	g_mouse.r = true;
}
//-----------------------------------------------------------------------------
function onmousemove(e)
//-----------------------------------------------------------------------------
{
	//test
    let rect = html_canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left)/ html_canvas.width;
    let y = (e.clientY - rect.top )/ html_canvas.height;
	g_mouse.x = x;
	g_mouse.y = y;

	// 
}
// 右クリックでのコンテキストメニューを抑制
document.addEventListener('contextmenu', contextmenu);
function contextmenu(e) 
{
  e.preventDefault();
}
