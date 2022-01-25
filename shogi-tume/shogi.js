"use strict";

const N = 9;
	const u = ["９","８","７","６","５","４","３","２","１"];
	const v = ["一","二","三","四","五","六","七","八","九"];

// 駒フォーマット
function Koma( type, belong )
{
	return {type:type,belong:belong};
}

function Denger(koma, x, y)
{
	return {koma:koma, x:x, y:y}
}
function Baninfo( koma )
{
	return {koma:koma, types:[], dengers:[], heros:[]};
}
// 指し手フォーマット
function Sasite(weight,mode,fx,fy,tx,ty,koma,attr )
{
	return {weight:weight, mode:mode, fx:fx, fy:fy, tx:tx, ty:ty, koma:koma, attr:attr};
}

// 手に持ってる駒情報
function Temoti(koma,from,x,y)
{
	return {koma:koma,from:from,x:x,y:y};
}


//-----------------------------------------------------------------------------
function kif_create()
//-----------------------------------------------------------------------------
{
	let kif = {};
	const OFS=3;

	const SZ = 48;
	const SZ2 = 24;

	// 駒版表示エリア
	const BX = 120;
	const BY = 25;
	const BW = N*SZ;
	const BH = N*SZ;

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

	kif.req = [];
	kif.text=null;
	kif.deep = 0;
	kif.flg_editmode = false;
	kif.tree = [];
	kif.think = [];
	kif.message = "";
	kif.message_unshift = "";
	kif.message_req = false;
	kif.message2 = "";
	kif.message2_req = false;

	kif.base = ban_create();
//	kif.tmp = kif.base.ban_copy();

	//---------------------------------------------------------------------
	function ban_create()
	//---------------------------------------------------------------------
	{
		let ban = {};

		// 将棋盤
		//---------------------------------------------------------------------
		ban.init = function()
		//---------------------------------------------------------------------
		{
			ban.tblBaninfo = new Array(N*N);
			for ( let i = 0 ; i < ban.tblBaninfo.length ; i++ )
			{
				ban.tblBaninfo[i] = Baninfo( Koma("typeNone","") );
			}
			ban.tblKomabako=
			{
				"type歩兵":18,	
				"type香車":4,	
				"type桂馬":4,	
				"type銀将":4,	
				"type金将":4,	
				"type角行":2,	
				"type飛車":2,	
				"type玉将":2,	
			};
			// 駒台
			ban.tblKomadai=
			{
				"belong先手":
				{
					"type歩兵":0,	
					"type香車":0,	
					"type桂馬":0,	
					"type銀将":0,	
					"type金将":0,	
					"type角行":0,	
					"type飛車":0,	
					"type玉将":0,	
				}, 
				"belong後手":
				{
					"type歩兵":0,	
					"type香車":0,	
					"type桂馬":0,	
					"type銀将":0,	
					"type金将":0,	
					"type角行":0,	
					"type飛車":0,	
					"type玉将":0,	
				}
			};
		}
		ban.init();

		//---------------------------------------------------------------------
		ban.ban_copy = function() // 盤面コピー
		//---------------------------------------------------------------------
		{
			let to						= Object.assign({},this);
			to.tblKomadai				= Object.assign({},this.tblKomadai);
			to.tblKomadai["belong先手"]	= Object.assign({},this.tblKomadai["belong先手"]);	// 駒台実コピー
			to.tblKomadai["belong後手"]	= Object.assign({},this.tblKomadai["belong後手"]);	// 駒台実コピー
			to.tblBaninfo				= Object.assign([],this.tblBaninfo);					// 盤面実コピー
//			to.tblBaninfo.koma			= Object.assign({},this.tblBaninfo.koma);				// 盤面実コピー
			for ( let i = 0 ; i < this.tblBaninfo.length ; i++ )
			{
				to.tblBaninfo[i]	= Object.assign({},this.tblBaninfo[i]);				// 盤面実コピー
				to.tblBaninfo[i].koma	= Object.assign({},this.tblBaninfo[i].koma);				// 盤面実コピー
			}
			return to;
		}
		//---------------------------------------------------------------------
		ban.ban_copyTst = function() // 盤面コピー
		//---------------------------------------------------------------------
		{
			let to						= Object.assign({},this);
			to.tblKomadai				= Object.assign({},this.tblKomadai);
			to.tblKomadai["belong先手"]	= Object.assign({},this.tblKomadai["belong先手"]);	// 駒台実コピー
			to.tblKomadai["belong後手"]	= Object.assign({},this.tblKomadai["belong後手"]);	// 駒台実コピー
			to.tblBaninfo				= Object.assign([],this.tblBaninfo);					// 盤面実コピー
			to.tblBaninfo.koma			= Object.assign({},this.tblBaninfo.koma);				// 盤面実コピー
			return to;
		}


		//-------------------------------------------------------------
		ban.ban_move = function( sasite )
		//-------------------------------------------------------------
		{
			let fx = sasite.fx;
			let fy = sasite.fy;
			let tx = sasite.tx;
			let ty = sasite.ty;

			switch( sasite.mode )
			{

				case "modeNone":
					break;

				case "mode配置盤面":
					{
						this.tblBaninfo[ty*N+tx] = Baninfo( Koma(sasite.koma.type, sasite.koma.belong) );
						let type = kif.infKomadata[sasite.koma.type].type;
						this.tblKomabako[ type ]--;
					}
					break
					

				case "mode配置駒台":
					{
						this.tblKomadai[sasite.koma.belong][sasite.koma.type]++;
						let type = kif.infKomadata[sasite.koma.type].type;
						this.tblKomabako[ type ]--;
					}
					break

				case "mode移動":
					{
						let koma_fm = this.tblBaninfo[fy*N+fx].koma;
						let koma_to = this.tblBaninfo[ty*N+tx].koma;
						if ( koma_to.type != "typeNone" )
						{
							// 移動先に駒がある場合
							let type = kif.infKomadata[koma_to.type].type;
							this.tblKomadai[sasite.koma.belong][type]++;
						}
						this.tblBaninfo[ty*N+tx] = Baninfo( sasite.koma );
						this.tblBaninfo[fy*N+fx] = Baninfo( Koma("typeNone","") );
					}
					break

				case "mode成り":
					{
						let koma_fm = this.tblBaninfo[fy*N+fx].koma;
						let koma_to = this.tblBaninfo[ty*N+tx].koma;
						if ( koma_to.type != "typeNone" )
						{
							// 移動先に駒がある場合
							let type = kif.infKomadata[koma_to.type].type;
							this.tblKomadai[sasite.koma.belong][type]++;
						}
						let type = kif.infKomadata[sasite.koma.type].ntype;
						this.tblBaninfo[ty*N+tx] = Baninfo( Koma( type, sasite.koma.belong ) );
						this.tblBaninfo[fy*N+fx] = Baninfo( Koma("typeNone","") );
					}
					break

				case "mode打ち":
					{
						this.tblKomadai[sasite.koma.belong][sasite.koma.type]--;
						let type = kif.infKomadata[sasite.koma.type].type;
						this.tblBaninfo[ty*N+tx] = Baninfo( sasite.koma );
					}
					break;

				default:
					console.log("ban_move エラー:"+sasite.mode);
			}
		}

		//-------------------------------------------------------------
		ban.setup = function()
		//-------------------------------------------------------------
		{
			// 残りの駒を後手番の持駒に
			for ( let key of Object.keys( this.tblKomabako) )
			{
				let type = kif.infKomadata[key].type;
				if ( type != "type玉将" )
				{
					let cnt = this.tblKomabako[ type ];
					if ( cnt > 0 )
					{
						this.tblKomabako[ type ] -= cnt;
						this.tblKomadai["belong後手"][type]+=cnt;
					}
				}
			}

		}

		//-------------------------------------------------------------
		ban.serch_oh = function()
		//-------------------------------------------------------------
		{
			// 玉将を探す
			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{
				let koma = this.tblBaninfo[y*N+x].koma;	
				if ( koma.type == "type玉将" )
				{
					return [x,y];
				}
			}
			return [-1,-1];
		}

		//-------------------------------------------------------------
		ban.draw_analysys_types = function()
		//-------------------------------------------------------------
		{
			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{

				for ( let i = 0 ; i < this.tblBaninfo[y*N+x].types.length ; i++ )
				{
					let type = this.tblBaninfo[y*N+x].types[i];
					let inf = kif.infKomadata[ type ];

					kif.mark( x, y, inf.name, i, "belong先手" );
				}

			}
		}

		//-------------------------------------------------------------
		ban.draw_analysys_dengers = function()
		//-------------------------------------------------------------
		{
			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{
				// for dengers
				for ( let i = 0 ; i < this.tblBaninfo[y*N+x].dengers.length ; i++ )
				{
					let koma = this.tblBaninfo[y*N+x].dengers[i].koma;
					let inf = kif.infKomadata[ koma.type ];
					kif.mark( x, y, inf.name, i+12, koma.belong );
				}
/*
				// for heros
				for ( let i = 0 ; i < this.tblBaninfo[y*N+x].heros.length ; i++ )
				{
					let koma = this.tblBaninfo[y*N+x].heros[i].koma;
					let inf = kif.infKomadata[ koma.type ];
					kif.mark( x, y, inf.name, i, koma.belong );
				}
*/			}
		}
		//-------------------------------------------------------------
		ban.draw_analysys_heros = function()
		//-------------------------------------------------------------
		{
			for ( let y = 0 ; y < N ;y++ )
			for ( let x = 0 ; x < N ;x++ )
			{
/*				// for dengers
				for ( let i = 0 ; i < this.tblBaninfo[y*N+x].dengers.length ; i++ )
				{
					let koma = this.tblBaninfo[y*N+x].dengers[i].koma;
					let inf = kif.infKomadata[ koma.type ];
					kif.mark( x, y, inf.name, i+12, koma.belong );
				}
*/
				// for heros
				for ( let i = 0 ; i < this.tblBaninfo[y*N+x].heros.length ; i++ )
				{
					let koma = this.tblBaninfo[y*N+x].heros[i].koma;
					let inf = kif.infKomadata[ koma.type ];
					kif.mark( x, y, inf.name, i, koma.belong );
				}
			}
		}

		//-------------------------------------------------------------
		ban.baninfo_analysys_types = function( belong_teban, ox, oy )
		//-------------------------------------------------------------
		{
			for ( let inf of this.tblBaninfo )
			{
				inf.types = [];
			}

			{
				for ( let key of Object.keys(kif.infKomadata) )
				{
					for ( let mov of kif.infKomadata[ key ].mov )
					{
						let ax = mov.ax;
						let ay = mov.ay*(belong_teban=="belong先手"?1:-1);
						let tx = ox;
						let ty = oy;
						for ( let j = 0 ; j < mov.n ; j++ )
						{
							tx -= ax;
							ty -= ay;
							if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

							let koma_to = this.tblBaninfo[ty*N+tx].koma;		// 攻撃元

							if ( koma_to.belong == "belong先手" ) break;		

							this.tblBaninfo[ty*N+tx].types.push(key);

							// 味方駒があったら、その手前で検索中断
							if ( koma_to.belong == "belong後手" ) break;		
						
						}
					}
				}
			}
		}

		//-------------------------------------------------------------
		ban.baninfo_analysys_dengers = function( reject_x, reject_y )
		//-------------------------------------------------------------
		{
			for ( let inf of this.tblBaninfo )
			{
				inf.dengers = [];
			}

			for ( let fy = 0 ; fy < N ;fy++ )
			for ( let fx = 0 ; fx < N ;fx++ )
			{
				let koma_fm = this.tblBaninfo[fy*N+fx].koma;	// 移動元

				for ( let mov of kif.infKomadata[ koma_fm.type ].mov )
				{
					let ax = mov.ax;
					let ay = mov.ay*(koma_fm.belong == "belong先手"?1:-1);
					let tx = fx;
					let ty = fy;
					for ( let j = 0 ; j < mov.n ; j++ )
					{
						tx += ax;
						ty += ay;
						if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

						let koma_to = this.tblBaninfo[ty*N+tx].koma;	// 移動先(攻撃先)

						if ( koma_fm.belong == "belong先手" )
						{
//							this.tblBaninfo[ty*N+tx].dengers.push( {koma:koma_fm, x:fx, y:fy}  );
							this.tblBaninfo[ty*N+tx].dengers.push( Denger(koma_fm, fx, fy)  );
						}

						// 味方駒があったら、その手前で検索中断
						if ( koma_to.belong == koma_fm.belong ) break;

						// 移動先が相手駒だったら、そこで検索中断
						if ( koma_to.type != "typeNone" && (koma_to.belong != koma_fm.belong) ) 
						{
							if ( koma_to.belong == "belong後手"  && tx==reject_x && ty==reject_y )
							{
								// 攻撃先がrejectだったら無視して検索継続
							}
							else
							{
								break;
							}
						}

					}
				}

			}
		}

		//-------------------------------------------------------------
		ban.baninfo_analysys_heros = function()
		//-------------------------------------------------------------
		{
			for ( let inf of this.tblBaninfo )
			{
				inf.heros = [];
			}

			for ( let fy = 0 ; fy < N ;fy++ )
			for ( let fx = 0 ; fx < N ;fx++ )
			{
				let koma_fm = this.tblBaninfo[fy*N+fx].koma;	// 移動元

				for ( let mov of kif.infKomadata[ koma_fm.type ].mov )
				{
					let ax = mov.ax;
					let ay = mov.ay*(koma_fm.belong == "belong先手"?1:-1);
					let tx = fx;
					let ty = fy;
					for ( let j = 0 ; j < mov.n ; j++ )
					{
						tx += ax;
						ty += ay;
						if ( tx < 0 || tx >= N || ty < 0 || ty >= N ) break;

						let koma_to = this.tblBaninfo[ty*N+tx].koma;	// 移動先(攻撃先)

						if ( koma_fm.belong == "belong後手" )
						{
							this.tblBaninfo[ty*N+tx].heros.push( {koma:koma_fm, x:fx, y:fy}  );
						}

						// 味方駒があったら、その手前で検索中断
						if ( koma_to.belong == koma_fm.belong ) break;

						// 移動先が相手駒だったら、そこで検索中断
						if ( koma_to.type != "typeNone" && (koma_to.belong != koma_fm.belong) ) break;

					}
				}

			}
		}
		//-------------------------------------------------------------
		ban.tree_play = function( aban, tbl, id )
		//-------------------------------------------------------------
		{
			let cnt = 0;
			function tree_play0( tbl, lvl, tume0 )
			{
				for ( let t of tbl )
				{
					cnt++;

					let tume = tume0.concat( [t.sasite] );
					if ( id == cnt  ) 
					{
						for ( let sasite of tume )
						{
							aban.ban_move( sasite );
						}
						return;	
						
					}

					tree_play0( t.tree, lvl+1, tume );
				}
			}
			tree_play0( tbl, 0, [] );
		}
		return ban;
	}


	kif.mouse_hl = false;
	kif.mouse_hr = false;

	let editor = editor_create()
	//---------------------------------------------------------------------
	function editor_create()
	//---------------------------------------------------------------------
	{
		let editor = {};
		editor.temoti = Temoti(Koma("typeNone",""),"fromNone",-1,-1);
		//-------------------------------------------------------------
		editor.putBanmen = function( mx,my,px, py, ban, temoti  )
		//-------------------------------------------------------------
		{
			kif.update_draw( ban );	

			if ( mx > px && my > py && mx < px+BW && my < py+BH )
			{
				let kx = Math.floor( (mx-px)/SZ );
				let ky = Math.floor( (my-py)/SZ );
				let x = kx*SZ+px;
				let y = ky*SZ+py;
				let s = 4;
				gra.box( x+s,y+s,x+SZ-s,y+SZ-s );

				let koma_fm = ban.tblBaninfo[ky*N+kx].koma;								// 盤面から取得

				if ( g_mouse.hl ) 
				{
					if ( temoti.koma.type == "typeNone" ) 								// とる
					{
						if ( koma_fm.type != "typeNone" )				
						{
							temoti = Temoti(koma_fm,"from盤面",kx,ky);					// 取得
							ban.tblBaninfo[ky*N+kx] = Baninfo( Koma("typeNone","") );	// 消去
						}
					}
					else
					if ( temoti.koma.type != "typeNone" )								// おく
					{
						ban.tblBaninfo[ky*N+kx] = Baninfo( temoti.koma );
						if ( temoti.from == "from盤面" )
						{
							temoti = Temoti(Koma("typeNone",""),"fromNone",-1,-1);
						}
						else
						{
							temoti = Temoti(Koma("typeNone",""),"fromNone",-1,-1); 		// リストからも消す
						}
					}
				}
				if ( g_mouse.hr ) 
				{
						if ( temoti.koma.type == "typeNone" )
						{
							ban.tblBaninfo[ky*N+kx] = Baninfo( Koma("typeNone","") );	// 消去
						}
				}

			}

			if ( g_mouse.hr ) // 駒を放棄
			{
				if ( temoti.from == "from盤面" )
				{
					let kx = temoti.x;
					let ky = temoti.y;
					ban.tblBaninfo[ky*N+kx] = Baninfo( temoti.koma );					// 戻す
					temoti = Temoti(Koma("typeNone",""),"fromNone",-1,-1);
				}
			}
			return temoti;

		}
		//-------------------------------------------------------------
		editor.putKomalist = function( mx,my, px, py, temoti )
		//-------------------------------------------------------------
		{
			let tbl =
			[
				{x:0,y: 0,koma:Koma("type玉将","belong後手"),	},
				{x:0,y: 1,koma:Koma("type飛車","belong後手"),	},
				{x:0,y: 2,koma:Koma("type角行","belong後手"),	},
				{x:0,y: 3,koma:Koma("type金将","belong後手"),	},
				{x:0,y: 4,koma:Koma("type銀将","belong後手"),	},
				{x:0,y: 5,koma:Koma("type桂馬","belong後手"),	},
				{x:0,y: 6,koma:Koma("type香車","belong後手"),	},
				{x:0,y: 7,koma:Koma("type歩兵","belong後手"),	},

				{x:2,y: 1,koma:Koma("type龍王","belong後手"),	},
				{x:2,y: 2,koma:Koma("type竜馬","belong後手"),	},
				{x:2,y: 4,koma:Koma("type成銀","belong後手"),	},
				{x:2,y: 5,koma:Koma("type成桂","belong後手"),	},
				{x:2,y: 6,koma:Koma("type成香","belong後手"),	},
				{x:2,y: 7,koma:Koma("typeと金","belong後手"),	},

				{x:0,y: 9,koma:Koma("type歩兵","belong先手"),	},
				{x:0,y:10,koma:Koma("type香車","belong先手"),	},
				{x:0,y:11,koma:Koma("type桂馬","belong先手"),	},
				{x:0,y:12,koma:Koma("type銀将","belong先手"),	},
				{x:0,y:13,koma:Koma("type金将","belong先手"),	},
				{x:0,y:14,koma:Koma("type角行","belong先手"),	},
				{x:0,y:15,koma:Koma("type飛車","belong先手"),	},

				{x:2,y: 9,koma:Koma("typeと金","belong先手"),	},
				{x:2,y:10,koma:Koma("type成香","belong先手"),	},
				{x:2,y:11,koma:Koma("type成桂","belong先手"),	},
				{x:2,y:13,koma:Koma("type成銀","belong先手"),	},
				{x:2,y:14,koma:Koma("type竜馬","belong先手"),	},
				{x:2,y:15,koma:Koma("type龍王","belong先手"),	},
			]; 

			{
				let s = 0;
				gra.box( px+s, py+s, px+EW-s, py+EH-s );
			}

			let l = 0;
			let cnt = 0;
			for ( let k of tbl )
			{
				if ( k.koma.type != "typeNone" )
				{
					let str = kif.infKomadata[ k.koma.type ].name;
					
					{
						let flg = k.koma.belong=="belong後手"
						let rot = flg?radians(180):0;
						let x = px + 26 + k.x*SZ2;
						let y = py + 21 + k.y*SZ2*1.1+10;

						gra.symbol( str, x,y-6*flg-3,SZ2,"CM", rot);
						let [w,h] = [9,6];
						let x1 = x-SZ2+w;
						let y1 = y-SZ2/2-h;
						let x2 = x+SZ2-w;
						let y2 = y+SZ2/2-h;

						if ( mx > x1 && my > y1 && mx < x2 && my < y2 )
						{
							let [w,h] = [-1,-3];
							gra.box( x1+w,y1+h,x2-w,y2-h );
						
							if ( g_mouse.hl ) // 駒を選択
							{
								temoti = Temoti(k.koma,"from駒リスト",-1,-1);
							}

						}
					}

				}

				l++;
			}

			if ( g_mouse.hr ) // 駒を放棄
			{
				if ( editor.temoti.from == "from駒リスト" )
				{
					temoti = Temoti(Koma("typeNone",""),"fromNone",-1,-1);
				}
			}

			return temoti;
		}
		//-------------------------------------------------------------
		editor.putMotigoma = function ( mx,my, px, py, ban, belong_teban, temoti )
		//-------------------------------------------------------------
		{
			let koma = temoti.koma;
		
			let tbls = ban.tblKomadai[belong_teban];
			let l = 0;

			{
				let s = 0;
				gra.box( px+s, py+s, px+MW-s, py+MH-s );
			}

			for ( let type of Object.keys( tbls ) )
			{
				if ( type == "type玉将" ) continue;
				let num = tbls[ type ];
				let str = kif.infKomadata[ type ].name;

				{
					let x = px+MW/2;
					let y = py+24 +(l++)*SZ2+SZ2/2;
					gra.symbol( str+"×"+num, x,y,SZ2 );

					let w = -2;
					let h = 3;
					let x1 = x-SZ2+w;
					let y1 = y-SZ2/2-h;
					let x2 = x+SZ2-w;
					let y2 = y+SZ2/2-h;

					if ( mx > x1 && my >= y1 && mx < x2 && my <= y2 )
					{
						let s = -2;
						gra.box( x1+s,y1+s,x2-s,y2-s );
						s = -1;
						gra.box( x1+s,y1+s,x2-s,y2-s );

						if ( g_mouse.hl ) // 持駒を増やす
						{
							ban.tblKomadai[belong_teban][type]++;
						}
						if ( g_mouse.hr ) // 持駒を減らす
						{
							if ( ban.tblKomadai[belong_teban][type] > 0 )
							ban.tblKomadai[belong_teban][type]--;
						}
					}

				}
			}

			return temoti;

		}
		//-------------------------------------------------------------
		editor.update = function( ban )
		//-------------------------------------------------------------
		{
			let mx = g_mouse.x*gra.size_w;
			let my = g_mouse.y*gra.size_h;


			// 盤面の表示と入力
			editor.temoti = editor.putBanmen( mx,my,BX, BY, ban, editor.temoti );

			// 駒リストの表示と入力
			editor.temoti = editor.putKomalist( mx,my,EX, EY, editor.temoti );

			// 持駒の表示と入力 
			editor.temoti = editor.putMotigoma( mx,my,MX, MY, ban, "belong先手", editor.temoti );

			// 掴んでいる駒の表示
			{
				let koma = editor.temoti.koma;
				if ( koma.type != "typeNone" )
				{
					let str = kif.infKomadata[ koma.type ].name;
					putKoma( mx, my, koma );
				}
			}

			window.setTimeout( kif.update, 10 ); // 編集中はリアルタイムアップデート
		}
		return editor;
	}

		
	
	// 駒データ

	const D1 = {n:1, ax:-1, ay: 1};	
	const D2 = {n:1, ax: 0, ay: 1};	
	const D3 = {n:1, ax: 1, ay: 1};	
	const D4 = {n:1, ax:-1, ay: 0};	
	const D6 = {n:1, ax: 1, ay: 0};	
	const D7 = {n:1, ax:-1, ay:-1};	
	const D8 = {n:1, ax: 0, ay:-1};	
	const D9 = {n:1, ax: 1, ay:-1};	
	const DA = {n:1, ax:-1, ay:-2};	
	const DB = {n:1, ax: 1, ay:-2};	
	const E1 = {n:8, ax:-1, ay: 1};	
	const E2 = {n:8, ax: 0, ay: 1};	
	const E3 = {n:8, ax: 1, ay: 1};	
	const E4 = {n:8, ax:-1, ay: 0};	
	const E6 = {n:8, ax: 1, ay: 0};	
	const E7 = {n:8, ax:-1, ay:-1};	
	const E8 = {n:8, ax: 0, ay:-1};	
	const E9 = {n:8, ax: 1, ay:-1};	
	kif.infKomadata =
	{
		"typeNone":{name:""	  ,name2:""	   ,type:""		    ,ntype:""		  ,nari:""	   ,mov:[] 							},
		"type玉将":{name:"玉" ,name2:"玉将",type:"type玉将" ,ntype:""		  ,nari:"不可" ,mov:[ D1,D2,D3,D4,D6,D7,D8,D9 ]	},
		"type飛車":{name:"飛" ,name2:"飛車",type:"type飛車" ,ntype:"type龍王" ,nari:"必須" ,mov:[ E8,E2,E4,E6 ]				},
		"type角行":{name:"角" ,name2:"角行",type:"type角行" ,ntype:"type竜馬" ,nari:"必須" ,mov:[ E7,E9,E1,E3 ]				},
		"type金将":{name:"金" ,name2:"金将",type:"type金将" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D8,D9, D4,D6, D2 ]		},
		"type銀将":{name:"銀" ,name2:"銀将",type:"type銀将" ,ntype:"type成銀" ,nari:"選択" ,mov:[ D7,D8,D9, D1,D3 ]			},
		"type桂馬":{name:"桂" ,name2:"桂馬",type:"type桂馬" ,ntype:"type成桂" ,nari:"選択" ,mov:[ DA,DB ]					},
		"type香車":{name:"香" ,name2:"香車",type:"type香車" ,ntype:"type成香" ,nari:"選択" ,mov:[ E8 ]						},
		"type歩兵":{name:"歩" ,name2:"歩兵",type:"type歩兵" ,ntype:"typeと金" ,nari:"必須" ,mov:[ D8 ]						},
		"type龍王":{name:"龍" ,name2:"飛車",type:"type飛車" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D9,D1,D3 , E2,E4,E6,E8 ]},
		"type竜馬":{name:"馬" ,name2:"角行",type:"type角行" ,ntype:""		  ,nari:"不可" ,mov:[ D2,D4,D6,D8 , E7,E9,E1,E3 ]},
		"type成銀":{name:"全" ,name2:"銀将",type:"type銀将" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D8,D9, D4,D6, D2 ]		},
		"type成桂":{name:"圭" ,name2:"桂馬",type:"type桂馬" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D8,D9, D4,D6, D2 ]		},
		"type成香":{name:"呑" ,name2:"香車",type:"type香車" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D8,D9, D4,D6, D2 ]		},
		"typeと金":{name:"と" ,name2:"歩兵",type:"type歩兵" ,ntype:""		  ,nari:"不可" ,mov:[ D7,D8,D9, D4,D6, D2 ]		},
	};




	// 初期化
	let gra = gra_create( html_canvas );
	gra.window(0,0,670,480);


	//---------------------------------------------------------------------
	kif.request = function( req )
	//---------------------------------------------------------------------
	{
		kif.req.push( req );
	}
	//---------------------------------------------------------------------
	kif.mark = function( x,y,str,n, belong )
	//---------------------------------------------------------------------
	{
		let SZ = 48;
		let px = x*SZ+BX+SZ2;
		let py = y*SZ+BY+SZ2;
		
		let ax = (n%4)*SZ/4-2;
		let ay = Math.floor(n/4)*SZ/4;
		if ( belong=="belong先手" )
		{
			gra.symbol(str,px-SZ/3+ax, py-SZ/4+ay-4, SZ/4,"CM",radians(0));
		}
		else
		{
			gra.symbol(str,px-SZ/3+ax, py-SZ/4+ay-6, SZ/4,"CM",radians(180));
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
	kif.update = function()
	//---------------------------------------------------------------------
	{

		let req = kif.req.shift();
		if ( req )
		{
			console.log(req);
			switch( req )
			{
				case "(reset)":	
					kif.update_draw( kif.base );	
					kif.tmp = kif.base.ban_copy();
					break;

				case "(draw)":	
					kif.update_draw( kif.base );	
					kif.tmp = kif.base.ban_copy();
					break;

				case "(none)":	
					break;

				case "(詰め探索)":	
					kif.clrmessage();
					kif.clrmessage2();
					kif.putHtml2( "<p>開始:"+(new Date()).toLocaleTimeString() +"</p>");
					kif.request("(詰め探索本番)");
					window.setTimeout( kif.update, 200 ); // メッセージエリアの更新より遅れて割り込み
					break;
				case "(詰め探索本番)":	

					kif.flg_editmode = false;
					kif.update_draw( kif.base );	
					kif.tmp = kif.base.ban_copy();	
					{	
						let [x,y] = kif.base.serch_oh();
						if ( x >= 0 )
						{
	
							kif.base.baninfo_analysys_dengers( -1,-1 );
							kif.base.baninfo_analysys_heros();
							let dengers = kif.base.tblBaninfo[y*N+x].dengers;
							let teban_belong = (( dengers.length == 0)?"belong先手":"belong後手");

							let deep = kif.deep;
							kif.tree = tree_think( kif.base, teban_belong , deep );

							let [cnt,cntTumi] = tree_get_result( kif.tree );

							kif.putHtml2( "<p>終了:"+(new Date()).toLocaleTimeString() +" 探索数:"+cnt+"</p>");
							if ( cntTumi == 0 )
							{
								kif.putHtml2( "<p>探索深度"+deep+"以内には詰めは存在しませんでした。</p>" );
							}

						}
					}
					break;

				case "(王手範囲)":
					kif.update_draw( kif.tmp );	
					{
						let [ox,oy] = kif.tmp.serch_oh();
						if ( ox >-1 )
						{
							kif.tmp.baninfo_analysys_types( "belong先手", ox, oy );
						}
					}
					kif.tmp.draw_analysys_types();
					break;

				case "(攻撃範囲)":
					kif.update_draw( kif.tmp );	
					{
						let [x,y]=kif.tmp.serch_oh();
						kif.tmp.baninfo_analysys_dengers( x,y );
						//kif.tmp.baninfo_analysys_heros();
					}
					kif.tmp.draw_analysys_dengers();
					break;

				case "(守備範囲)":
					kif.update_draw( kif.tmp );	
					{
						//let [x,y]=kif.tmp.serch_oh();
						//kif.tmp.baninfo_analysys_dengers( x,y );
						kif.tmp.baninfo_analysys_heros();
					}
					kif.tmp.draw_analysys_heros();
					break;

				case "(編集)":
					kif.flg_editmode = true;
					kif.update_draw( kif.base );
					editor.update( kif.base );
					break;

				case "(読み込み)":
					{
						let str = kif.getmessage3();
						kif.ban_read( kif.base, str );
					}
					break;
					
				case "(書き出し)":
					{
						let str = kif.ban_save(kif.base);
						kif.clrmessage3();
						kif.putmessage3( str );
					}
					break;

				default:
					console.log("知らないコマンドが使われた:"+req);
					
			}
		}
	
		if ( kif.flg_editmode )
		{
			editor.update( kif.base );
		}
		g_mouse.hl = false;
		g_mouse.hr = false;
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
				let name = kif.infKomadata[ koma.type ].name;
				if ( koma.type != "typeNone"  )
				{
					let s1 = name;
					let s2 = koma.belong=="belong先手"?"▲":"▽";
					let s3 = u[x];
					let s4 = v[y];
					str += s2+s3+s4+s1+'';
				}
			}
		}
		str += ":";
		{
			let tbls = ban.tblKomadai["belong先手"];
			for ( let type of Object.keys( tbls ) )
			{
				if ( type != "type玉将" )
				{
					let num = tbls[ type ];
					let name = kif.infKomadata[ type ].name;
					for ( let i = 0 ; i < num ; i++ )
					{
						str += name;
					}
				}
			}
		}
		str += ":";
		str.trim();
		return str;
	}

	//-------------------------------------------------------------
	kif.ban_read = function( ban, str )
	//-------------------------------------------------------------
	{
		str.trim();

		let to_belong = 
		{
			"▲":"belong先手",
			"▽":"belong後手",
		};
		let to_type = 
		{
			"玉":"type玉将",
			"飛":"type飛車",
			"角":"type角行",
			"金":"type金将",
			"銀":"type銀将",
			"桂":"type桂馬",
			"香":"type香車",
			"歩":"type歩兵",
			"龍":"type龍王",
			"馬":"type竜馬",
			"全":"type成銀",
			"圭":"type成桂",
			"呑":"type成香",
			"と":"typeと金",
		};
		let form=[["belong","x","y","駒","(repeat)"],["持","(repeat)"]];
		let ptr = 0;
		let step = 0;
		function ana( tbl )
		{
			let cmd = {};
			let j = 0;
			while(1)
			{
				let a = tbl[j++];
				if ( j > tbl.length ) break;
				if ( a == undefined ) return;
				if ( a instanceof Array ) {ana( a );continue;}
				if ( a == "(repeat)" ) 
				{
					if ( Object.keys(cmd).length == 0 ) break;
					if ( step == 0 )
					{
						let x		 = u.indexOf( cmd["x"] );
						let y		 = v.indexOf( cmd["y"] );
						let type	 = to_type[ cmd.駒 ];
						let belong	 = to_belong[ cmd.belong ];
						let koma	 = Koma( type, belong );
						ban.ban_move( Sasite(1.0,"mode配置盤面",-1,-1,x,y,koma ) );
					}
					if ( step == 1 )
					{
						let x		 = -1;
						let y		 = -1;
						let type	 = to_type[ cmd.持 ];
						let belong	 = "belong先手";
						let koma	 = Koma( type, belong );
						ban.ban_move( Sasite(1.0,"mode配置駒台",-1,-1,x,y,koma ) );
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
		
		ban.init()
		ana(form);
		ban.setup();
		kif.update_draw( ban );
	}

	//-------------------------------------------------------------
	function formatSasite( sasite )
	//-------------------------------------------------------------
	{
		let s1 = (sasite.mode=="mode打ち")?"打"
				:(sasite.mode=="mode成り")?"成"
				:(sasite.mode=="mode移動")?""
				:sasite.mode;
		let s2 = ((sasite.koma.belong=="belong先手")?"▲":"▽");
		let s3 = u[sasite.tx]+v[sasite.ty]+kif.infKomadata[sasite.koma.type].name;
		return s2 + s3 + s1;
	}
	//-------------------------------------------------------------
	function tree_think( ban, teban_belong, nest )
	//-------------------------------------------------------------
	{
		// 探索木
		function Tree( sasite, tree, flg )
		{
			return {sasite:sasite, tree:tree, flgTumi:flg};
		}


		function deepin( ban, teban_belong, lvl )
		{
			let flgSente = (teban_belong=="belong先手");
			let a={flgTumi:false, tree:[]};
			if ( lvl < nest ) 
			{
				// 守備側ならfalseで初期化
				a.flgTumi = !flgSente;
				let tbl = serch_sasite( ban, teban_belong );
				for ( let sasite of tbl )
				{
					let ban2 = ban.ban_copy();
					ban2.ban_move( sasite );
					let th2  =  deepin( ban2, (flgSente?"belong後手":"belong先手"), lvl+1 );

					// 攻め手側なら|| 守備側なら&&で初期化
					a.flgTumi =  flgSente?(a.flgTumi||th2.flgTumi):(a.flgTumi&&th2.flgTumi);

					a.tree.push( {sasite:sasite, tree:th2.tree, flgTumi:th2.flgTumi} );
					if (  flgSente &&  a.flgTumi ) break;	
					if ( !flgSente && !a.flgTumi ) break;	
				}
			}
			return a;
		}

		return deepin( ban, "belong先手", 0 ).tree;
	}

	//-------------------------------------------------------------
	function tree_get_result( tree )
	//-------------------------------------------------------------
	{
		let cnt = 0;
		let cntTumi = 0;
		function show_tree0( tree, lvl, tume0, flgTumi0 )
		{
			for ( let tr of tree )
			{
				let s4 = strfloat(++cnt,4,0)+":";
				let s1 = "　".repeat(lvl);
				let sk = formatSasite(tr.sasite);
				let s5 = (tr.flgTumi?" 詰み":"");
				let str = s4 + s1 + sk + s5;
				kif.putHtml( "<p onclick='html_req("+cnt+")'>"+str+"</p>" );

				let tume = "";
				if ( tr.flgTumi&&flgTumi0 )
				{
					tume = ((tume0=="")?"":tume0+"") + sk;
					if( tr.tree.length == 0 )
					{
						cntTumi++;
						kif.putHtml2( "<p onclick='html_req("+cnt+")'>"+cnt +":"+tume+"</p>" );
					}
				}

				show_tree0( tr.tree, lvl+1, tume, tr.flgTumi&&flgTumi0 );
				
			}
		}
		show_tree0( tree, 0, "", true );

//		let str = "<p>探索数:"+cnt+" 詰数:"+cntTumi+"</p>";
		return [cnt,cntTumi];
//		kif.putHtml2( "<p>"+str +"</p>");

	}
	//-------------------------------------------------------------
	kif.tree_play = function( ban, tree, id )
	//-------------------------------------------------------------
	{
		let cnt = 0;
		function tree_play0( tree, lvl, tume0 )
		{
			for ( let t of tree )
			{
				cnt++;

				let tume = tume0.concat( [t.sasite] );
				if ( id == cnt  ) 
				{
					for ( let sasite of tume )
					{
						ban.ban_move( sasite );
					}
					return;	
					
				}

				tree_play0( t.tree, lvl+1, tume );
			}
		}
		tree_play0( tree, 0, [] );
	}

	//-------------------------------------------------------------
	function putKoma( x1, y1, koma )
	//-------------------------------------------------------------
	{
		let str = kif.infKomadata[ koma.type ].name;
		if ( koma.belong == "belong後手" )
		{
			gra.symbol( str, x1,y1-4, SZ-16,"CM", radians(180) );
		}
		else
		{
			gra.symbol( str, x1,y1+4, SZ-16,"CM", radians(0) );
		}
	}

	//-------------------------------------------------------------
	function putBanmen( ban, BX, BY )
	//-------------------------------------------------------------
	{
		
		for ( let x = 0 ; x < N ;x++ )
		{
			let px = BX+BW-x*SZ-SZ2;
			let py = BY-SZ/4;
			let s = ["０","１","２","３","４","５","６","７","８","９"][x+1];
			gra.symbol( s, px,py, SZ/3,"CM" );
		}
		for ( let y = 0 ; y < N ; y++ )
		{
			let px = BX+BW+SZ/4;
			let py = BY+y*SZ+SZ2;
			let s = ["〇","一","二","三","四","五","六","七","八","九"][y+1];
			gra.symbol( s, px,py, SZ/3,"CM" );
		}

		// 将棋盤表示
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
			let koma = ban.tblBaninfo[y*N+x].koma;

			let x1 = px+SZ2;
			let y1 = py+SZ2;
			putKoma( x1, y1, koma );
			gra.color_rgb( C9 );
		}
		for ( let x = 3 ; x <= 6 ;x+=3 )
		for ( let y = 3 ; y <= 6 ;y+=3 )
		{
			let px = x*SZ+BX;
			let py = y*SZ+BY;
			gra.pset(px,py,4);
		}
	}

	//-------------------------------------------------------------
	function putMotigoma( ban, belong_teban, px, py, flgDetail  )
	//-------------------------------------------------------------
	{
		let tbls = ban.tblKomadai[belong_teban];
		let l = -2;
		let s2 = ((belong_teban=="belong先手")?"▲":"▽");
		gra.symbol( "持", px,py+(l++)*SZ2,SZ2 );	// 持駒
		gra.symbol( "駒", px,py+(l++)*SZ2,SZ2 );
		let cnt = 0;
		for ( let type of Object.keys( tbls ) )
		{
			let num = tbls[ type ];
			let str = kif.infKomadata[ type ].name;



			if( flgDetail )
			{
				let x = px;
				let y = py+(l++)*SZ2+SZ2/2;
				gra.symbol( str+"×"+num, x,y,SZ2 );
			}
			else
			{
				if ( num >0 ) 
				{
					let x = px;
					let y = py+(l++)*SZ2+SZ2/2;
					if ( num == 1 ) 
					{
						gra.symbol( str, x,y,SZ2 );
					}
					else
					{
						gra.symbol( str+"×"+num, x,y,SZ2 );
					}
					cnt++;
				}
			}

		}
		if ( cnt== 0 && flgDetail == false )
		{
				gra.symbol( "な", px,py+20,SZ2 );
				gra.symbol( "し", px,py+44,SZ2 );
		}
	}
	//-------------------------------------------------------------
	function putKomabako( tbls, px, py  )
	//-------------------------------------------------------------
	{
		let l = 0;
		gra.symbol( "駒箱", px,py+(l++)*24,24 );
		for ( let type of Object.keys( tbls ) )
		{
			let str = kif.infKomadata[ type ].name;
			let num = tbls[ type ];
			gra.symbol( str+"×"+num, px,py+(l++)*24,24 );
		}
	}

	//---------------------------------------------------------------------
	kif.update_draw = function ( ban )
	//---------------------------------------------------------------------
	{
		gra.backcolor_rgb(C7);
		gra.color_rgb(C9);
		gra.cls();

		putBanmen( ban, BX,BY);
		if ( kif.flg_editmode )
		{
		}
		else
		{
			putMotigoma( ban, "belong先手", RX, RY, false );
			
			if( kif.debug_d ) // デバッグ用
			{
				putMotigoma( ban, "belong後手", LX, LY, false );
				putKomabako( ban.tblKomabako, LX,BY+250 );
			}
		}
	}


/*
	・棋譜データ：指手データの集合体。初期盤面も棋譜データで持つ。
	・指手データ：盤面、駒箱、駒台、のどこからどこへ度の駒がどちらの手番で移動したかが書かれる
	・盤面データ：8x8
	・指し手検索：盤面データから、させる可能性のある指し手リストを作成する
	・評価値関数：8x8の盤面データと指手データを受け取ったら価値判断をして評価データを返す。
	・評価データ：何対何の二つの数字で優劣を返す。
*/

	//---------------------------------------------------------------------
	kif.clrmessage = function()
	//---------------------------------------------------------------------
	{
		kif.message = "";
		kif.message_unshift = "";
		kif.message_req = true;
	}
	//---------------------------------------------------------------------
	kif.putHtml = function( str )
	//---------------------------------------------------------------------
	{
		kif.message += str;
		kif.message_req = true;
	}
	//---------------------------------------------------------------------
	kif.unshiftmessage = function( str )
	//---------------------------------------------------------------------
	{
		kif.message_unshift = str + "<br>" + kif.message_unshift;
		kif.message_req = true;
	}
	//---------------------------------------------------------------------
	kif.flushmessage = function( )
	//---------------------------------------------------------------------
	{
		// htmlの書き換え過ぎは警告が出るので100ms単位にチェックしてまとめて転送する。
		if ( kif.message_req )
		{
			document.getElementById("html_message4").innerHTML = kif.message_unshift + kif.message;
			kif.message_req = false;
		}
		window.setTimeout( kif.flushmessage, 100 );
	}
	kif.hdlTimeout = window.setTimeout( kif.flushmessage, 0 );

	//---------------------------------------------------------------------
	kif.clrmessage2 = function()
	//---------------------------------------------------------------------
	{
		kif.message2 = "";
		kif.message2_req = true;
	}
	//---------------------------------------------------------------------
	kif.putHtml2 = function( str )
	//---------------------------------------------------------------------
	{
		kif.message2 += str;
		kif.message2_req = true;
	}
	//---------------------------------------------------------------------
	kif.flushmessage2 = function( )
	//---------------------------------------------------------------------
	{
		// htmlの書き換え過ぎは警告が出るので100ms単位にチェックしてまとめて転送する。
		if ( kif.message2_req )
		{
			document.getElementById("html_message5b").innerHTML = kif.message2;
			kif.message2_req = false;
		}
		window.setTimeout( kif.flushmessage2, 100 );
	}
	kif.hdlTimeout2 = window.setTimeout( kif.flushmessage2, 0 );

	//---------------------------------------------------------------------
	kif.clrmessage3 = function()
	//---------------------------------------------------------------------
	{
		document.getElementById( "html_textarea" ).value = "";
	}
	//---------------------------------------------------------------------
	kif.putmessage3 = function( str )
	//---------------------------------------------------------------------
	{
		document.getElementById( "html_textarea" ).value += str+"\n";
	}
	//---------------------------------------------------------------------
	kif.getmessage3 = function()
	//---------------------------------------------------------------------
	{
		return document.getElementById( "html_textarea" ).value;
	}
	

	return kif;
}



