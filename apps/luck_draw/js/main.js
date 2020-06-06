(function($){
	/********为array添加一个自己的排除重复元素方法********/
	Array.prototype.remove = function(dx)
	　{
	　　if(isNaN(dx)||dx>this.length){return false;}
	　　for(var i=0,n=0;i<this.length;i++)
	　　{
	　　　　if(this[i]!=this[dx])
	　　　　{
	　　　　　　this[n++]=this[i]
	　　　　}
	　　}
	　　this.length-=1
	　}
	Array.prototype.insert = function (index, item) {  
	  this.splice(index, 0, item);  
	};  
	/***********变量和函数***********/
	var displayInited = false;//是否已经点击屏幕进行初始化
	var GLOBA = {
		displayInput:{
			yiCiChouJiangDeGeShu : 10,//每个奖项要抽出多少个奖
			jiangeX : parseInt($('.chouJiangNumBox').outerWidth()),
			jiangeY : parseInt($('.chouJiangNumBox').outerHeight()),
			wanChengInputTime : 100,
			meiHangInputDeJianJuX : 30,
			meiHangInputDeJianJuY : 10,
			countX 	: 0,//第一排(竖着)抽奖的input的left的基数
			chushiText : 'si'
		},
		formPop : {
			isSpecial : false
		},
		fontChange : {
			animating : true,
			timer : null,
			timerOne : null
		
		},
		adminReset :{
			currentChoujiangZongShu : 0,
			options : JSON.parse(localStorage.getItem('options'))
		},
		localToResult :{
			zhongjiangmingdan : {}
		}
	};


	var arrMember = GLOBA.adminReset.options.arrZhangQuMember,
		fontChangeMember = arrMember.slice(0),
		winMember = [],
		winMemberAll = [],
		zhongjiangjiangxiang = [],
		shuffle = function(o){ //随机排序
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};
	var Fun = {
		displayInput : function(){
			//$('.chouJiangNumBox').removeAttr('style');
			$('.coerCon').css('padding','17px 130px 0').animate({
				'height':parseInt($('.chouJiangNumBox').height())*GLOBA.displayInput.yiCiChouJiangDeGeShu/4+40
			},1000,function(){
				console.log(parseInt($('.chouJiangNumBox').height())*GLOBA.displayInput.yiCiChouJiangDeGeShu/4)
				var firstdingDianX = parseInt($('.coerCon').css('padding-left')),
					firstdingDianY = parseInt($('.coerCon').css('padding-top'));
				for (var i = 0; i <= GLOBA.displayInput.yiCiChouJiangDeGeShu - 1; i++) {
					$('.coerCon').append($('.chouJiangNumBox','.model').clone())
				};//for
				

				if(GLOBA.displayInput.yiCiChouJiangDeGeShu == 1){
					
					$('.chouJiangNumBox').css('margin-top','-32px').animate({
						'width' : '230px',
						'height' : '100px',
						'left' : '380px'
					},500,function(){
						$('.chouJiangNumBox').children().animate({
						'font-size' : '50px',
						'opacity' : '1'
					},500)
					}).children().css({
						'opacity' : '0',
						'margin':'40px 0 0 62px'
					})
				}else if(GLOBA.displayInput.yiCiChouJiangDeGeShu == 2){
				
					$('.chouJiangNumBox').eq(0).animate({
						'left' : '320px'
					},500).end().eq(1).animate({
						'left' : '504px'
					},500)
						// $('.chouJiangNumBox').each(function(){
						// 	console.log($(this).position().left)
						// 	$(this).animate({
						// 	'left' : parseInt($(this).css('left')) + 200
						// },500)
						// })
				}else{
					$('.chouJiangNumBox').each(function(){
					var nowIndex = $(this).index();

					$(this).attr({
						'bb': nowIndex,
						'cc': GLOBA.displayInput.countX
					});
					
						if(nowIndex < 4){
							$(this).animate({'left':firstdingDianX+GLOBA.displayInput.jiangeX*nowIndex + GLOBA.displayInput.meiHangInputDeJianJuX*nowIndex},GLOBA.displayInput.wanChengInputTime)
						}else{
							$(this).animate({
								'left':firstdingDianX + GLOBA.displayInput.jiangeX*GLOBA.displayInput.countX + GLOBA.displayInput.meiHangInputDeJianJuX*GLOBA.displayInput.countX,
								'top': firstdingDianY + (GLOBA.displayInput.jiangeY +GLOBA.displayInput.meiHangInputDeJianJuY)*Math.floor($(this).index()/4)//高度每次都要+ meiHangInputDeJianJuY要根据行数不同
							},GLOBA.displayInput.wanChengInputTime)
							GLOBA.displayInput.countX++;
							if (GLOBA.displayInput.countX == 4) GLOBA.displayInput.countX = 0;
						}
				})//each
				}//判断当抽奖的个数为1 或者 2 的时候 最后为 2个以上的情况
				GLOBA.fontChange.animating = false;//当所有的input摆好之后，开始抽奖按钮就绪
			})
				
		},//displayInput
		// formPop : function(xjiang){
		// 	$('.wrap').prepend($('.formPop','.model').clone(true),$('.popMask','.model').clone(true));
		// 	$('.formPop').addClass('formPopScale').removeClass('formPopScaleF');
		// 	$('.foopCon img').attr('src', 'images/'+xjiang+'.jpg');
		// 	$('.popMask').css({
		// 		'width' : $(document).width(),
		// 		'height' : $(document).height()
		// 	})

		// },//pop fun

		formPop : function(xjiang,xdengjiang){
			xdengjiang = xdengjiang ||"四等奖";
			$('.wrap').prepend($('.formPop','.model').clone(true),$('.popMask','.model').clone(true));
			$('.foopCon img').attr('src', 'images/'+xjiang+'.png');

			$('.foopCon .btn').html(xdengjiang);
			$('.foopCon img').css('opacity', 0);
			$('.formPop').css({
				'left':($(document).width() - $('.formPop').width())/2,
				'top':"-600px"
			}).animate({
				// 'top':($(document).height() - $('.formPop').height())/2
				'top':150
			},{ 
			    easing: 'easeInOutExpo', 
			    duration: 800, 
			    complete: function(){

			    } 
			});
			$('.popMask').css({
				'width' : $(document).width(),
				'height' : $(document).height()
			})

		},//pop fun
		fontChange : function(){
			GLOBA.fontChange.timer = setInterval(function(){
				$('.chouJiangNum').each(function(){
					$(this).text(fontChangeMember[Math.floor(Math.random()*fontChangeMember.length)])
				})
			},50);




		},//fontChange
		fontChangeOne : function(_this){
			GLOBA.fontChange.timer = setInterval(function(){
				_this.text(fontChangeMember[Math.floor(Math.random()*fontChangeMember.length)]);
			},50);




		},//fontChangeOne
		adminReset : function(){
		 	
			if($('.coerCon').children().length!=0){
				$('.coerCon').children().fadeOut(200,function(){

					$('.chouJiangNum').text('000').removeAttr('style');//刷新input里面的文本
					$('.coerCon').empty();
					$('.chouJiangNumBox').children().andSelf().removeAttr('style');
				});
			}
		
			if(GLOBA.formPop.isSpecial){
				$('p','header.second').text('特殊奖');		
				GLOBA.displayInput.yiCiChouJiangDeGeShu = 1;
			}else{
			   

				$('p','header.second').text(GLOBA.adminReset.options.num1[GLOBA.adminReset.currentChoujiangZongShu].jiangXiang);		
				GLOBA.displayInput.yiCiChouJiangDeGeShu = GLOBA.adminReset.options.num1[GLOBA.adminReset.currentChoujiangZongShu].shuMu;

			}//if 如果是到抽特殊奖励的时候
			

		


			Fun.displayInput();	



			
			GLOBA.adminReset.currentChoujiangZongShu++;
			GLOBA.displayInput.countX = 0;//每次下一组 归零排列开始数据
		}

	}

	/************调用************/




	$('.selectBtn').click(function(){
		$(this).next().slideDown(200).parent().children('.text').css({
			'border-radius':'6px 6px 0 0'
		});
		return false;
	}).next().find('li').click(function(){
		$(this).parents('.controls').children('.text').text($(this).text());
		if($(this).parents('.controls').hasClass('mt40')){
			$('p','header.second').text($(this).text().substr(-3,3));
		}else{
			GLOBA.displayInput.yiCiChouJiangDeGeShu = $(this).text().substr(0,1);
		}//if if 为抽奖页面的标题赋值，else 定义抽奖页面的每个奖项有几个人能中奖
	})//click click
	$(document).click(function(){
		$('.selectUi').hide().prev().prev().removeAttr('style');
	})

	$('.foopCon').delegate('img', 'click', function(event) {
		$('.formPop','.wrap').remove(); 
		$('.popMask','.wrap').remove();
	});

	$('.choujiangbtn').click(function(){
		
		var _this = $(this);
			
				/**真正抽取号码的地方**/

				/******真正抽取号码的地方*****/
				// for (var i = 0; i < arrMember.length; i++) {

				// 	winMember[i] = arrMember.splice(0,Math.floor(Math.random()*arrMember.length));
				// 	console.log(Math.floor(Math.random()*arrMember.length))
				// 	console.log(winMember[i])
				// };










				if(!GLOBA.fontChange.animating && $(this).children().attr('title')=='开始抽奖'){
					GLOBA.fontChange.animating = true;
					//winMember = ['1','2','3','4'],
					winMember = shuffle(arrMember.slice(0)).slice(0,GLOBA.displayInput.yiCiChouJiangDeGeShu);// 选择抽几个人的时候数组有多大 先打乱然后选出 yiCiChouJiangDeGeShu 个长度作为抽出的人员
					for (var i = 0; i < winMember.length; i++) {
						if(arrMember.indexOf(winMember[i])>=0){
							arrMember.remove(arrMember.indexOf(winMember[i]));
						}
						
					};//for 循环 删除选出的数组元素
					winMemberAll.push(winMember);//统计所有的获奖名单
					
					$(this).children('img').rotate({
				      angle:0, 
				      animateTo:360, 
				      callback: function(){
				      	Fun.fontChange();
				      	_this.children('img').attr({
				      		'src':'images/stop.png',
				      		'title':'停止抽奖'
				      	}); 
				      	GLOBA.fontChange.animating = false;
				      }
				   });//rotate
				}//if

				if($(this).children().attr('title')=='停止抽奖'){
					clearInterval(GLOBA.fontChange.timer);
					GLOBA.adminReset.options.num1Length--;//每次点击停止抽奖时候，可以点击的次数减少1
					for (var i = 0; i < winMember.length; i++) {
						//$('.chouJiangNum').eq(i) = winMember[i];
						$('.chouJiangNum').eq(i).text(winMember[i]);//给 抽完后的input赋值（实际抽出的中奖员工）			
					};//for

					zhongjiangjiangxiang.push($('p','header.second').text());
					
					//每一次停止抽奖
					

					if(GLOBA.adminReset.options.num1Length != 0){

						_this.children('img').attr({
				      		'src':'images/Next.png',
				      		'title':'下一组'
				      	});
						GLOBA.displayInput.chushiText = $("#huojiangbianhao").text();
						//alert(GLOBA.displayInput.chushiText)
						return false;
					}else if(GLOBA.adminReset.options.num1Length == 0){
						_this.children('img').attr({
				      		'src':'images/end.png',
				      		'title':'查看结果'
						});
						return false;
					}//判断是否可以进行下一组    				
				}//if 是停止抽奖的时候发生的事情
				if($(this).children().attr('title')=='下一组'){
					Fun.adminReset();//重新定义 .coerCon 下面的input
					
					if($("#huojiangbianhao").text() != GLOBA.displayInput.chushiText){
							
								switch(true){
									case ($("#huojiangbianhao").text() == '三等奖'):
									Fun.formPop('san','三等奖');
									break;
									case ($("#huojiangbianhao").text() == '二等奖'):
									Fun.formPop('er','二等奖');
									break;
									case ($("#huojiangbianhao").text() == '一等奖'):
									Fun.formPop('yi','一等奖');
									break;
									case ($("#huojiangbianhao").text() == '特等奖'):
									Fun.formPop('te','特等奖');
									break;                       
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-动网'):
									Fun.formPop('dongwang','掌趣小伙伴动网');
									break;
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-上游 '):
									Fun.formPop('shangyoutv','掌趣小伙伴上游');
									break;
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-上游'):
									Fun.formPop('shangyoushubiao','掌趣小伙伴上游');
									break;	
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-玩蟹'):
									Fun.formPop('wanxiephone','掌趣小伙伴玩蟹');
									break;
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-玩蟹 '):
									Fun.formPop('wanxiepro','掌趣小伙伴玩蟹');
									break;
									case ($("#huojiangbianhao").text() == '掌趣小伙伴-天马'):
									Fun.formPop('tianma','掌趣小伙伴天马');
									break;
									case ($("#huojiangbianhao").text() == '合作伙伴-索尼'):
									Fun.formPop('suoni','合作伙伴&nbsp; 索尼');
									break;
									
								}//switch
									
						}//if	
						// console.log(winMemberAll)
					_this.children('img').attr({
				      		'src':'images/button.png',
				      		'title':'开始抽奖'
				      	});
					
				}// 下一组的时候发生的事情
				
				if($(this).children().attr('title')=='查看结果'){

					GLOBA.localToResult.zhongjiangmingdan = {
						'jiangXiang' : zhongjiangjiangxiang,
						'zhongjiangNum' : winMemberAll,
						'New' : true
					};
					localStorage.setItem('zhongjiangmingdan', JSON.stringify(GLOBA.localToResult.zhongjiangmingdan));

					window.open('./index_result.html');

				}//查看抽奖结果
				
				

	})//click 点击开始抽奖
	//Fun.formPop();//特殊奖励
	
	var isOne = true;//判断是不是就在重新抽取一个中奖号
	/***********重新抽取一个奖励************/
	$('.coerCon').delegate('.chouJiangNumBox','dblclick',function(){
		if(isOne){
		var chouJiangNumBox = $(this);
		isOne = false;
		if(window.confirm('确定要重新抽取？')){
			Fun.fontChangeOne(chouJiangNumBox.children());
			$(this).append('<div class="reStop">Stop</div>');
			$('.reStop').css({
				width : chouJiangNumBox.width()-4,
				height : chouJiangNumBox.height()-4,
				'margin-top' : 0-chouJiangNumBox.height(),
				'margin-left' : '2px',
				'line-height' : (chouJiangNumBox.height()-4) + 'px'
			}).animate({
				'margin-top' : "2px"
			},200);
			$(chouJiangNumBox,'.coerCon').delegate('.reStop','click',function(){
				var Index = chouJiangNumBox.index(),
					thisRestop = $(this);
				var newZhongjiang = shuffle(arrMember.slice(0)).slice(0,1);
				winMember.insert(Index,newZhongjiang.toString());
				winMember.remove(Index+1);	
				clearInterval(GLOBA.fontChange.timer);
				thisRestop.prev().text(newZhongjiang.toString())
				for (var i = 0; i < newZhongjiang.length; i++) {
						if(arrMember.indexOf(newZhongjiang[i])>=0){
							arrMember.remove(arrMember.indexOf(newZhongjiang[i]));
						}	
				};//for 循环 删除选出的数组元素
				// console.log(arrMember)
				thisRestop.undelegate().animate({
					'margin-top' : 0-chouJiangNumBox.height(),
					'opacity' : 0
				},400,function(){
					thisRestop.remove();
					isOne = true;
				})

			})//click
//重新抽出新一个中奖的奖券
			
			
			
			}else{
			//alert("取消");
			isOne = true;
			return false;
		}//if 是否重新抽奖
		//console.log($(this).text())
		}//if isone
	})//dbclick






	$('.midCheck').click(function(){
			GLOBA.localToResult.zhongjiangmingdan = {
						'jiangXiang' : zhongjiangjiangxiang,
						'zhongjiangNum' : winMemberAll,
						'New' : true
					};
					localStorage.setItem('zhongjiangmingdan', JSON.stringify(GLOBA.localToResult.zhongjiangmingdan));
					//window.open("file:///D:/work/%E5%B9%B4%E4%BC%9A%E6%8A%BD%E5%A5%96/index_result.html");  
					window.open('http://192.168.5.58/HappyNewYearFinal/index_result.html')
	})//抽奖过程中想要查看下结果

	$('.btn','.foopCon').dblclick(function(){

		$('.choujiangbtn').children('img').attr({
				      		'src':'images/Next.png',
				      		'title':'下一组'
				      	});

	GLOBA.adminReset.options.num1Length = GLOBA.adminReset.options.specilLength;
	
	$('.formPop,.popMask').remove();	
	})//click 点击完成后进入抽奖页面


	$('body').keydown(function(e){
					if($('img','.choujiangbtn').attr('title')=='查看结果'){
							var e = e || window.event;        
				             if(e.keyCode==13){ 
				         		Fun.formPop();
				         		GLOBA.formPop.isSpecial = true;
				            }
						
					}//if
					});//按回车添加一个 特等奖环节	

$('.bg').click(function(event) {
	$(this).animate({
		'margin-top':'-635px'
	}, 200,function(){
		Fun.formPop('si');
		$('.container,.midCheck').fadeIn(200, function() {			
		});
		Fun.adminReset(); 
	})
	
	/* Act on the event */
});//bgclick

$(".popMask").click(function(event) {

	$('.foopCon img').animate({
		'opacity':1
	}, 500)
	/* Act on the event */
});//formPop click
	






})
(jQuery)