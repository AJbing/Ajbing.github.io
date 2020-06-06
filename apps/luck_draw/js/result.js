
Array.prototype.unique5 = function() {
    var res = [], hash = {};
    for(var i=0, elem; (elem = this[i]) != null; i++)  {
        if (!hash[elem])
        {
            res.push(elem);
            hash[elem] = true;
        }
    }
    return res;
};


(function($){
	var GLOBA = {
			result : JSON.parse(localStorage.getItem('zhongjiangmingdan')),
			timer : null
		};
		// GLOBA.timer = setInterval(function(){
		// 	if(GLOBA.result.New){
		// 		for (var i = 0; i < GLOBA.result.jiangXiang.length; i++) {
		// 			$('.coerCon').append('<fieldset>'+
		// 					'<legend class="yahei headFontColor">'+GLOBA.result.jiangXiang[i]+'</legend>'+
		// 						'<ul class="relt_ul" id='+'relt_ul'+i+'>'+
		// 						'</ul>'+
		// 				'</fieldset>'+
		// 				'<div class="fistLine"></div>')	
		// 			for (var k = 0; k < GLOBA.result.zhongjiangNum[i].length; k++) {			
		// 				$('#relt_ul'+i).append('<li>'+GLOBA.result.zhongjiangNum[i][k]+'</li>')
		// 			};
		// 		};

				
		// 	}//如果本地储存的result变化了，就执行
		// 	console.log($('legend','.coerCon').text())






		// 	GLOBA.result.New = false;
		// },10)

		//localStorage.clear();
	//实现方式一 通过 新加一个n 每次都拿第一个i=0 和 i+n 比较 	
// if(GLOBA.result.New){
// 				var n = 1;
// 				for (var i = 0; i < GLOBA.result.jiangXiang.length; i++) {
	
// 					if(GLOBA.result.jiangXiang[i] == GLOBA.result.jiangXiang[i+n]){//if 如果这一个和下一个的 legend相同
// 						console.log( GLOBA.result.jiangXiang[i] == GLOBA.result.jiangXiang[i+n])
// 						$('.coerCon').append('<fieldset>'+
// 							'<legend class="yahei headFontColor">'+GLOBA.result.jiangXiang[i]+'</legend>'+
// 								'<ul class="relt_ul" id='+'relt_ul'+i+'>'+
// 								'</ul>'+
// 						'</fieldset>'+
// 						'<div class="fistLine"></div>')	
// 						for (var k = 0; k < GLOBA.result.zhongjiangNum[i].length; k++) {			
// 							$('#relt_ul'+i).append('<li>'+GLOBA.result.zhongjiangNum[i][k]+'</li>')
// 						};
// 						for (var k = 0; k < GLOBA.result.zhongjiangNum[i+n].length; k++) {			
// 							$('#relt_ul'+i).append('<li>'+GLOBA.result.zhongjiangNum[i][k]+'</li>')
						
// 						};
// 						i = 0;n++;

// 					}else{
// 						console.log( GLOBA.result.jiangXiang[i] == GLOBA.result.jiangXiang[i+n])
// 						$('.coerCon').append('<fieldset>'+
// 							'<legend class="yahei headFontColor">'+GLOBA.result.jiangXiang[i]+'</legend>'+
// 								'<ul class="relt_ul" id='+'relt_ul'+i+'>'+
// 								'</ul>'+
// 						'</fieldset>'+
// 						'<div class="fistLine"></div>')	
// 						for (var k = 0; k < GLOBA.result.zhongjiangNum[i].length; k++) {			
// 							$('#relt_ul'+i).append('<li>'+GLOBA.result.zhongjiangNum[i][k]+'</li>')
// 						};
// 					}//else
					
// 				};//for

				
// 			}//如果本地储存的result变化了，就执行
// 			console.log(GLOBA.result)
// 			//$('legend','.coerCon').each()


//方法2 

console.log(GLOBA.result);
var jiang = GLOBA.result.jiangXiang,
	jiangNum = GLOBA.result.zhongjiangNum,
	newJiang = [],
	n = 1;
	for (var i = 0; i < jiang.length; i++) {
		// if(jiang[i] == jiang[i+n]){
		// 	newJiang[i] = {
		// 		'num' : jiangNum[i].concat(jiangNum[i+n])
		// 	}
		// 	i = 0;n++;
		
		// }else{
		// 	i = n;
		// 	n = 0;
		// 	newJiang[i] = {
		// 		'num' : jiangNum[i]
		// 	} 
		//  }//if
			newJiang[i] = {
				'I' : jiang[i],
		 		'num' : jiangNum[i]
		 	} 
		
	};
	// $.each(newJiang,function(i,n){
	// 	console.log((n.I*1+1))
	// 	if(n.I*1 == (n.I + 1)*1){
	// 		console.log(n.I)
	// 	}
	// })//each
	
	var A = [];
	var newA = [];//合并后的奖项名称
	var fuckb = [];//中奖的人员奖券号合并
	for (var i = 0; i < newJiang.length; i++) {
		A[i] = newJiang[i].I
	};
	newA = A.unique5();//排除重复元素
	for (var i = 0; i < newA.length; i++) {
		for (var k = 0; k < newJiang.length; k++) {
			if(newA[i] == newJiang[k].I){
				fuckb[i] = newJiang[k].num +','+ (fuckb[i]||' ');
			}
		}//for
	};
	var arrr = [];//最终合并后的中奖人员
	for (var i = 0; i < fuckb.length; i++) {
		arrr[i] =  fuckb[i].split(',');
		arrr[i].pop();
		
	};
	//将原来的数组里的字符串换成数字，为下一步排序做准备
	// for (var i = 0; i < arrr.length; i++) {
	// 	for (var k = 0; k < arrr[i].length; k++) {
	// 		arrr[i][k] = parseInt(arrr[i][k]);
	// 	};
	// };


	/******数组比较排序*****/
	for (var i = 0; i < arrr.length; i++) {	
		arrr[i].sort(function(a,b){return a>b?1:-1});
				
	};
	
	



for (var i = 0; i < newA.length; i++) {
					$('.coerCon').append('<fieldset>'+
							'<legend class="yahei headJiangColor">'+newA[i]+'</legend>'+
								'<ul class="relt_ul" id='+'relt_ul'+i+'>'+
								'</ul>'+
						'</fieldset>'+
						'<div class="fistLine"></div>')	
					for (var k = 0; k < arrr[i].length; k++) {			
						$('#relt_ul'+i).append('<li>'+arrr[i][k]+'</li>')
					};
				};//for

 
// for (var i = 0; i < GLOBA.result.jiangXiang.length; i++) {
// 					$('.coerCon').append('<fieldset>'+
// 							'<legend class="yahei headFontColor">'+GLOBA.result.jiangXiang[i]+'</legend>'+
// 								'<ul class="relt_ul" id='+'relt_ul'+i+'>'+
// 								'</ul>'+
// 						'</fieldset>'+
// 						'<div class="fistLine"></div>')	
// 					for (var k = 0; k < GLOBA.result.zhongjiangNum[i].length; k++) {			
// 						$('#relt_ul'+i).append('<li>'+GLOBA.result.zhongjiangNum[i][k]+'</li>')
// 					};
// 				};//for 分开展示 的方法

})
(jQuery)