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

//130 答えが求まらない
	switch(131)
	{
	case 1:// 一手詰め
		kif.ban_read( kif.base, "▽３一歩▽２一玉▲２三銀:銀:");
		//2022/04/06ok
		//▲２二銀打
		break;
	case 2:// 一手詰め:なぜか積まない
		kif.ban_read( kif.base, "▽３一歩▽１一玉▲３三香▲１三歩▲４四角::");
		//2022/04/06 ok
		break;
	case 3:// １手詰め。縛り撃ち	取れそうで取れない
		kif.ban_read( kif.base, "▲３一飛▽２一銀▽１一玉▲１三歩:金:");
		//2022/04/06 ok
		//▲１二金打
		break;
	case 9:// 一手詰め	W王手
		//2022/04/06 ok
		//▲２二桂成
		kif.ban_read( kif.base, "▽２一歩▽１一玉▲２三歩▲１四桂▲１五香::");
		break;

	case 34://三手詰め。合間不可+無駄合間不可２
		kif.ban_read( kif.base, "▽３一歩▽１一玉▲２三銀▽１四歩:香:");
		//2022/04/06 ok
		//▲１三香打▽２一玉▲１二香成
		break;
	case 34:// ３手詰め：詰めパラ138 ok
		kif.ban_read( kif.base, "▲３二歩▲５三飛▲４三銀▽３三玉▲１三馬▽４四金▽４五角::");
		//▲４二銀▽４二玉▲３一馬
		//▲４二銀▽３二玉▲３一馬
		//▲４二銀▽３四玉▲２三飛成
		break;
	case 35:// 三手詰め:相玉：藤井七段が間違えた3手詰め双玉詰将棋 難易度：超難
		//https://www.youtube.com/watch?v=Zh9nBUIcsl4
		kif.ban_read( kif.base, "▽６一銀▽５一歩▽３一銀▽２一歩▽８二金▽６二桂▽５二玉▽４二歩▽２二香▽９三銀▲６三飛▲３三桂▽９四桂▲６四歩▽４四銀▽９五飛▲８五角▲７五玉▽６五香▽８六金▽６六金▽４六桂▽３六金▲５八角▲５九香::");
		//2022/04/06ok
		//▲７三飛成▽８五飛▲６三龍
		//▲７三飛成▽８五金▲６三龍
		break;
	case 36:// 三手詰め:合間せずに自爆。他に詰みがあるのに読まない。
		kif.ban_read( kif.base, "▲５一馬▽２一桂▽１一香▽３二玉▽５三金▽４三歩▽３三歩▽２三歩▽１三歩:飛:");
		break;
	case 37:// ３手詰め：詰めパラ140	なぜか先手スタートの解
		kif.ban_read( kif.base, "▽２一香▽３二玉▽２三歩▲４四飛▽３四歩▲５五角▲２五歩:金:");
		//▲３三金打▽３一玉▲４二飛成
		//▲３三金打▽３一玉▲６四角
		//▲３三金打▽３三玉▲４一飛成
		break;
	case 38://３手詰め 134 テスト
		kif.ban_read( kif.base, "▲１一飛▽３二歩▽２二玉▲１二角▽３三金:金:");
		//▽▲２一金打▽１三玉▲３四角成
		break;
	case 39:// ３手詰め	
		kif.ban_read( kif.base, "▽３一香▲１一角▽３二玉▲４三歩▲２三香▲１三龍▽４四歩▽３四歩::");
		//▲３三角成▽４一玉▲４二歩成
		//▲３三角成▽４一玉▲４二馬
		//▲３三角成▽３三玉▲２二香成
		break;
	case 40:// ３手詰め：詰めパラ139	
		kif.ban_read( kif.base, "▲３二歩▲５三飛▲４三銀▽３三玉▲１三馬▽５五歩▽２五飛::");
		//▲４二銀成▽４二玉▲３一馬
		//▲４二銀成▽４四玉▲４三飛成
		//▲４二銀成▽３四玉▲４三飛成
		break;

//-----------

	case 130:// ３手詰め：詰めパラ141	解けない
		kif.ban_read( kif.base, "▽１一玉▲４二龍▽３二角▽２二馬▲２三龍:銀:");
		//29:▲３一龍▽２一歩打▲２二龍
		//43:▲３一龍▽２一香打▲２二龍
		//45:▲３一龍▽２一桂打▲２二龍
		//59:▲３一龍▽２一銀打▲２二龍
		//73:▲３一龍▽２一金打▲２二龍
		//77:▲３一龍▽３一馬▲１二銀打
		break;
	case 131:// ３手詰め：バグではないが解くのがやたら遅い
		kif.ban_read( kif.base, "▽２一玉▽１一香▲５二飛▽３三金▽２三歩:銀角:");
		break;
	case 132:// 三手詰め:香成で、合間出来るのに１手詰みになる。
		kif.ban_read( kif.base, "▽２一香▽１一玉▽２二馬▲３三角▽１三桂▲１五香::");
		//2022/04/06ok
		break;
	case 133:// ３手詰め。合間不可、おかしな合間
		kif.ban_read( kif.base, "▽３一歩▽１一玉▲２三銀▽１四歩:香:");
		//2022/04/06 ok
		//▲１三香打▽２一玉▲１二香成
		break;
	case 133:// ３手詰め。合間不可、おかしな合間
		kif.ban_read( kif.base, "▽２一玉▽１一香▽４二銀▽３二金▽３三歩▲３四龍▲２四桂::");
		break;
	case 134:// ３手詰め。解けるが、むだ合間がやたら多い
		kif.ban_read( kif.base, "▽３一玉▽２一桂▽１一香▲４二飛▲５三と▽３三銀▲３四桂::");
		break;
	case 135:// ３手詰め。解けるはずが解けないしかなり変な合間
		kif.ban_read( kif.base, "▽４一香▽２一桂▽１一香▽２二玉▲４三と▽３三歩▽２三歩:角飛:");
		break;

		
		

		
	case 100:// ０手詰み王手、後手番開始、
		kif.ban_read( kif.base, "▽３一歩▽２一玉▽１一銀▲２二金▲２三銀::");
		//▲１一金▽１一玉▲２二銀打	2022/04/06 NG
		break;
	case 110:// １手詰め 解けなかったことのあるケース 2022/01/18	
		kif.ban_read( kif.base, "▲３三馬▽５四銀▽２四馬▽４五玉▲２五歩▽１五銀▽５六桂▲２六龍▲１七桂▲２八銀:桂:");
		//2022/04/06 後手番開始になったり2手で詰んだり表示がおかしい
		break;
	case 130:// 三手詰め:驚異の三手詰め＞解けるはずだが解けない
		//http://sookibizviz.blog81.fc2.com/blog-entry-853.html
		kif.ban_read( kif.base, "▽６三歩▽５三歩▽９四龍▽６四玉▽４四歩▲７五香▽５五と▲７六龍▲９七角▲９八角::");
		break;
	case 131:// 三手詰め空き王手
		kif.ban_read( kif.base, "▲１一と▽３三桂▽２三歩▲７四飛▲６四角▽２四玉▲２五角▲２六歩▽１七と▽３八と:金:");
		//2022/04/06 後手番開始になったり2手で詰んだり表示がおかしい
		break;
	case 150:// ５手詰め 	後手番開始になったり2手で詰んだり表示がおかしい
		kif.ban_read( kif.base, "▲３三馬▽５四銀▽４四桂▽２四馬▽３五玉▲２五歩▽１五銀▲７六龍▲１七桂▲２八銀:桂金:" );
		// 当初解けなかったケース2022/01/18
		// 2022/04/06 ng
		break;
	case 151:// ５手詰め 	後手番開始になったり2手で詰んだり表示がおかしい
		kif.ban_read( kif.base, "▲５二龍▲４二銀▽２二玉▲１二角▽３四歩▽４四歩▲２四桂▲１四香::");
		//2022/04/06 後手番開始になったり2手で詰んだり表示がおかしい
		break;
	case 170:// ７手詰め フリーズしたケース  2022/03/27解けない
		kif.ban_read( kif.base, "▽９一香▽８一玉▲５二飛▽８三歩▲５三馬▽９四金▽７四角:銀:");
		//2022/04/06 後手番開始になったり2手で詰んだり表示がおかしい
		break;
	case 171:// 七手済み：	修正）何故か王手が掛かってないのに詰む
		kif.ban_read( kif.base, "▽５一歩▽４一桂▽３一玉▽４三歩▲３三金▲３五桂▽１六歩:歩香:");
		//2022/04/06 後手番開始になったり2手で詰んだり表示がおかしい
		break;
	case 152:// ５手済み：	(第１図)「塚田詰将棋代表作」第２問（５手詰）https://www.shogitown.com/tume/guide/guide.html
		kif.ban_read( kif.base, "▽３一銀▽２一桂▽１一香▲３三馬▽１三玉▽１四歩:角飛:");
		//答えは、１二飛・同玉・３四角・１三玉・２三角成までの５手詰です。
		//玉方は、王様を除く残りの駒全部を、合い駒として使えます。ただし、無駄な合駒はいけません。
		break;
	case 153:// ５手済み：	(第４図)「名作詰将棋」第１４問（５手詰）https://www.shogitown.com/tume/guide/guide.html
		kif.ban_read( kif.base, "▽３一銀▽２一桂▽１一香▲３三馬▽１三玉▽１四歩:角飛:");
		///正解は、１三飛・同金・２四金・同金・１三香成までの五手詰です。
		//持駒は全て使う必要があり、王様が逃げる場合も、駒を全部使わせるように逃げなければなりません（詰め上がりに駒が余ってはいけない）。
		break;
	case 172:// 七手済み：	(第五図)https://www.shogitown.com/tume/guide/guide.html
		kif.ban_read( kif.base, "▽２一桂▽１一香▽２二銀▲３三と▽１三玉▽２四歩▽１四歩:銀金金:");
		//正解は、１二金・同香・２三金・同銀・２二銀の５手詰です。
		//※２手手数が長くなっても、駒が余る場合は、攻め方に駒が余らないように逃げるのを正解とする。
		break;


	
	}


	kif.base.setup();
	kif.request( ["(draw)"] );
	kif.update();
}

//---------------------------------------------------------------------
function serch_sasite( ban, teban_belong, strhis0 ) // 可能な指し手のリストを作成する
//---------------------------------------------------------------------
{
	let tblSasite = [];
//console.log("his "+strhis0 );	//	デバッグ

	if ( teban_belong == "belong先手" )														// 王手
	{
		// 玉将を探す
		let [ox,oy]=ban.serch_oh();
		if ( ox != -1 ) 
		{
			ban.baninfo_analysys_typesOhte( "belong先手",ox,oy );							// 王手範囲

			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{
				let koma_fm = ban.tblBaninfo[y*N+x].koma;									// 移動元
		
				if ( koma_fm.type == "typeNone" ) 											// 移動元に駒が無い→置き駒
				{
					for ( let type of Object.keys( ban.tblKomadai["belong先手"] ) )			// 駒台
					{
						 let val = ban.tblKomadai["belong先手"][type];						// 駒数
						 if ( val > 0 )
						 {
							let idx = ban.tblBaninfo[y*N+x].typesOhte.indexOf( type );
							if ( idx >= 0 )
							{
								function check_utifuzume() 	//打ち歩詰めチェック
								{
									if ( type == "type歩兵" )
									{
										let tmp = ban.ban_copy();
										let sasite =  Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,"belong先手"),"王手");
										tmp.ban_move( sasite ); 

										let strhis = strhis0 + formatSasite(sasite);

										let tbl = serch_sasite( tmp, "belong後手", strhis );
										return ( tbl.length == 0 )
									}
									return false;
								}
							 	// ▲王手
							 	if ( check_utifuzume() == false )
							 	{
									tblSasite.push( Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,"belong先手"),"王手"));
								}
							}
						}
					}
				}
				else
				{
					let mov = kif.infKomadata[ koma_fm.type ].mov;

					for ( let i = 0 ; i < mov.length ; i++ )
					{
						let n  = mov[i].n;
						let ax = mov[i].ax;
						let ay = mov[i].ay*("belong先手" == "belong先手"?1:-1);
						let tx = x;
						let ty = y;
						for ( let j = 0 ; j < n ; j++ )
						{
							tx += ax;
							ty += ay;
							if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

							let koma_to = ban.tblBaninfo[ty*N+tx].koma;	

							// 味方駒があったら、その手前で検索中断
							if ( koma_to.belong == "belong先手" ) break;		

							//-------------------------------------------------
							function sasite_on_sente( ban, x, y, tx, ty, koma, attr )
							//-------------------------------------------------
							{
								let inf = kif.infKomadata[ koma.type ];
								if ( ( koma.belong == "belong先手" ) )									// 先手＝王手をかける方
								{
									let idx;

									function checkOhte( type )
									{
										{
											// 仮盤面上で空き王手になってないかを確認する
											let tmp = ban.ban_copy();
											tmp.ban_move( Sasite(1.0,"mode移動",x,y,tx,ty,Koma(type, koma.belong),"") ); 	// 仮移動
											tmp.baninfo_analysys_dengers_run( ox, oy );						// 解析 攻撃エリア
											if ( tmp.tblBaninfo[oy*N+ox].dengers_run.length > 0 )
											{
												return 0; 												// 移動させても王手。（空き王手含む）になるのでOK。適当に0を返す
											}
										}

										return ban.tblBaninfo[ty*N+tx].typesOhte.indexOf( type );
									}

									if ( (ty <= 2 || y <= 2) && inf.nari == "必須" )
									{
										idx = checkOhte( inf.typeNari );
										if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr));
									}
									else
									if ( (ty <= 2 || y <= 2) && inf.nari == "選択" )
									{

										idx = checkOhte( inf.typeNari );
										if ( idx >= 0 ) 
										{
											let sasite = Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr);
											tblSasite.push( sasite);
										}

										function checkFunariFuka_sente()								// 不成不可のケース
										{
											if ( koma.type == "type桂馬" && ty < 2 ) return true;
											if ( koma.type == "type香車" && ty == 0 ) return true;
											if ( koma.type == "type歩兵" && ty == 0 ) return true;
											return false;
										}
										if ( checkFunariFuka_sente() == false )
										{
											idx = checkOhte( koma.type );
											if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
										}
									}
									else
									{
										idx = checkOhte( koma.type );
										if ( idx >= 0 ) tblSasite.push( Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr));
									}
								}

							}
							sasite_on_sente( ban, x, y, tx, ty, koma_fm, "王手" );

							// 敵駒があったら、その駒の所で検索中断
							if ( koma_to.type != "typeNone" && koma_to.belong != "belong先手" ) break;		

						}
					}
				}
								
			}
		}
	}
	else
	if ( teban_belong == "belong後手" )	// 回避
	{
		// 玉将を探す
		let [ox,oy]=ban.serch_oh();
		if ( ox != -1 ) 
		{
			ban.baninfo_analysys_dengers_run( ox, oy );										// 攻撃範囲:逃げ
			ban.baninfo_analysys_dengers_def();												// 攻撃範囲:受け
			ban.baninfo_analysys_heros();													// 守備範囲

			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{

				let koma_fm = ban.tblBaninfo[y*N+x].koma;
				if ( koma_fm.type == "typeNone" ) 											// 合間の可能性を知らべる
				{

					let tmp = ban.ban_copy();

					let dengers_run_o = ban.tblBaninfo[oy*N+ox].dengers_run;
					if ( dengers_run_o.length == 1 )										// 一か所からのみの攻撃なら
					{
						let tbl = [ "type飛車", "type角行","type香車","type龍王","type竜馬" ];
						if ( tbl.indexOf( dengers_run_o[0].koma.type ) >= 0 )				// 直線の飛び道具なら
						{
							// 攻撃の方向
							let ax0 = dengers_run_o[0].x - ox;
							let ay0 = dengers_run_o[0].y - oy;

							// 升目の方向
							let bx0 = x - ox;
							let by0 = y - oy;

							let	ax = Math.sign(ax0);			//2022/04/08 0が起こりえた＋逆方向を無視していたバグの修正のための追加
							let	ay = Math.sign(ay0);
							let	bx = Math.sign(bx0);
							let	by = Math.sign(by0);

							function func( x, y ){return y*3+x+5;}							//方向を1～9に変換
							if ( func(ax,ay) == func(bx,by) )													// 軌道が同じ	
							{
								let ax1 = Math.abs(ax0)
								let ay1 = Math.abs(ay0)
								let bx1 = Math.abs(bx0)
								let by1 = Math.abs(by0)
							
//								let al = Math.max(ax0,ay0);		//2022/04/13 合間が効かないケースがあるバグを修正。
//								let bl = Math.max(bx0,by0);
								let cl = Math.max(bx0-ax0,by0-ay0);
//if ( strhis0==">▲５一龍" ) console.log(strhis0,",",al,bl,cl,",>",ax0-bx0,ay0-by0,"<,",ax0,ay0,",",bx0,by0,",",x,y);
//								if ( bl < al )												// 攻撃駒範囲内
								if ( cl > 0 )												// 攻撃駒範囲内
								{
									let dengers_run = ban.tblBaninfo[y*N+x].dengers_run;	//(攻撃範囲)
									let heros   	= ban.tblBaninfo[y*N+x].heros;			//(守備範囲)
									if ( heros.length > 0									// 2022/04/15 空合間を抑制
									  && heros.length >= dengers_run.length )				// 防御が攻撃と同等以上（無意味な合間を抑制）
									{
										for ( let type of Object.keys( ban.tblKomadai["belong後手"] ) )		// 駒台
										{
											 let val = ban.tblKomadai["belong後手"][type];					// 駒数
											 if ( val > 0 )
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
													let sasite = Sasite(1.0,"mode打ち",-1,-1,x,y,Koma(type,"belong後手"),"合間");
													tblSasite.push( sasite );
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
				if (  koma_fm.belong == "belong後手" )
				{
																// 王逃げ、迎撃、防御
					let mov = kif.infKomadata[ koma_fm.type ].mov;

					for ( let i = 0 ; i < mov.length ; i++ )
					{
						let n  = mov[i].n;
						let ax = mov[i].ax;
						let ay = mov[i].ay*("belong後手" == "belong先手"?1:-1);
						let tx = x;
						let ty = y;
						for ( let j = 0 ; j < n ; j++ )
						{
							tx += ax;
							ty += ay;
							if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

							let koma_to = ban.tblBaninfo[ty*N+tx].koma;	

							// 味方駒があったら、その手前で検索中断
							if ( koma_to.belong == "belong後手" ) break;		

							if ( koma_fm.type == "type玉将" )
							{
								// ▽王逃げ
								if ( ban.tblBaninfo[ty*N+tx].dengers_run.length == 0 )
								{
									let sasite = Sasite(1.0,"mode移動",x,y,tx,ty,koma_fm,"逃げ ");
									tblSasite.push( sasite );
								}
							}
							else
							{
								// ▽迎撃
								let dengers_run = ban.tblBaninfo[oy*N+ox].dengers_run;
								if ( dengers_run.length == 1 ) // 王への攻撃元が一つだけなら迎撃(攻撃してくる相手を取る）
								{
									if ( tx == dengers_run[0].x && ty == dengers_run[0].y )
									{
										// 仮盤面上で空き王手になってないかを確認する
										let tmp = ban.ban_copy();
										tmp.ban_move( Sasite(1.0,"mode移動",x,y,tx,ty,koma_fm,"") );
										tmp.baninfo_analysys_dengers_run( ox, oy );		// 解析 攻撃エリア
										if ( tmp.tblBaninfo[oy*N+ox].dengers_run.length == 0 )
										{
											//-------------------------------------------------
											function sasite_on_gote( ban, x, y, tx, ty, koma, attr )
											//-------------------------------------------------
											{
												let inf = kif.infKomadata[ koma.type ];
												{																		// 後手＝逃げる方
													if ( (ty >= 5 || y >= 5) && inf.nari == "必須" )
													{
														let sasite = Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr);
														tblSasite.push( sasite );
													}
													else
													if ( (ty >= 5 || y >= 5) && inf.nari == "選択" )
													{
														let sasite = Sasite(1.0,"mode成り",x,y,tx,ty,koma,attr);
														tblSasite.push( sasite );

														function checkFunariFuka_gote()									// 不成不可のケース
														{
															if ( koma.type == "type桂馬" && ty > 6 ) return true;
															if ( koma.type == "type香車" && ty == 8 ) return true;
															if ( koma.type == "type歩兵" && ty == 8 ) return true;
															return false;
														}
														if ( checkFunariFuka_gote() == false )
														{
															let sasite = Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr);
															tblSasite.push( sasite );
														}
													}
													else
													{
														let sasite = Sasite(1.0,"mode移動",x,y,tx,ty,koma,attr);
														tblSasite.push( sasite );
													}
												}
											}
											sasite_on_gote( ban, x, y, tx, ty, koma_fm, "迎撃" );
										}
									}
								}
							}

							// 敵駒があったら、その駒の所で検索中断
							if ( koma_to.type != "typeNone" && koma_to.belong != "belong後手" ) break;		

						}
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
/*
//-----------------------------------------------------------------------------
function html_req( num )
//-----------------------------------------------------------------------------
{
	console.log( "req=",num );

	kif.tmp = kif.base.ban_copy();
	kif.tmp.tree_play( kif.tmp, kif.tree, kif.tblSasite, num );
	kif.update_draw( kif.tmp );	

}
*/

//-----------------------------------------------------------------------------
function html_request( req )
//-----------------------------------------------------------------------------
{
console.log("(req)", req );
	if ( req && req.substr(0,"(Test)".length) == "(Test)" )
	{
		let str = req.substr("(Test)".length);
		kif.mark_str = str;
		req = "(Test)";
		kif.request( [req,str] );
		kif.update();
		return;
	}
	if ( req && req.substr(0,"(Name)".length) == "(Name)" )
	{
		let num = req.substr("(Name)".length)*1;
		kif.mark_num = num;
		req = "(Name)";
	}
	if ( req && req.substr(0,"(Tree)".length) == "(Tree)" )
	{
		let num = req.substr("(Tree)".length)*1;
		kif.mark_num = num;
		req = "(Tree)";
	}

	if ( req == "(Name)" )
	{
		let num = kif.mark_num;
		kif.tmp = kif.base.ban_copy();
		kif.tmp.tree_play( kif.tmp, kif.tree, kif.tblSasite, num );
		kif.update_draw( kif.tmp );	
	
		return;
	}
	if ( req == "(Tree)" )
	{
		tree_click( html_tree.child, kif.mark_num );							

		let str = tree_format( html_tree.child );
		document.getElementById("html_innerhtml").innerHTML = str;
	
		return;
	}
	if ( req == "(読み込み)" )
	{
		let str = kif.getmessage3();
		kif.request( [req,str] );
		kif.update();
		return;
	}

	{
		kif.debug_d = html.getByName_checkbox( "html_debug_d", false );
		kif.deep = html.getById_textbox( "html_deep", 4 );


		//
		kif.request( [req] );
		kif.update();
	}
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
