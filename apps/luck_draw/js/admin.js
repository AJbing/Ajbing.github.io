(function($){
	/********为array添加一个删除方法********/
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
	/********为array添加一个删除方法********/


	/*************向左边补0***********/

	function Buright(mainStr,lngLen) { 
		 if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) { 
		 return mainStr.substring(mainStr.length-lngLen,mainStr.length)} 
		 else{return null} 
	 }
	//  var aaa=[]; 
	// for (var i = 101; i <= 820; i++) {
	// 	aaa[i] = '"'+Buright('000'+i.toString(),3)+'"';
	// };
 // 	alert(aaa)

	var arrZhangQuMember = ["101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","135","136","137","138","139","140","141","142","144","145","146","147","148","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","202","203","204","205","209","210","211","213","214","215","216","217","218","219","220","221","223","224","225","226","227","229","232","233","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255","256","258","259","260","261","262","263","264","265","266","267","268","269","271","272","273","274","276","277","278","279","280","281","282","283","284","285","286","287","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","305","306","307","308","309","310","311","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","378","379","380","381","382","383","384","385","386","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","433","434","435","436","437","439","440","441","442","444","445","447","449","450","452","453","454","455","456","457","458","459","460","461","463","464","465","466","467","468","469","470","471","472","473","474","475","476","477","478","479","480","481","482","483","484","485","486","487","488","489","490","491","492","493","495","496","497","498","499","500","501","502","503","504","505","507","509","510","511","512","513","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534","535","536","537","538","539","540","541","542","543","544","545","546","549","550","551","552","553","554","555","556","557","558","559","560","561","562","563","564","565","566","567","568","569","570","571","572","573","574","575","577","578","579","580","581","582","584","585","586","587","588","589","590","591","593","594","595","596","597","598","599","600","601","602","603","604","605","606","607","608","609","610","611","612","613","614","615","616","617","618","619","620","621","622","623","624","625","626","627","628","629","630","631","632","633","634","635","636","637","638","639","640","641","642","644","645","646","647","648","649","650","651","652","653","655","656","657","658","660","661","662","664","665","666","667","668","669","670","671","672","673","674","675","676","677","678","679","680","681","682","683","684","685","686","687","688","689","690","691","692","693","694","695","696","697","698","699","701","702","703","704","705","706","707","708","709","711","712","713","714","715","716","717","718","719","720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","737","738","739","740","741","742","743","744","745","746","747","748","750","751","752","753","755","756","757","758","759","760","761","762","763","764","765","766","767","768","769","770","771","773","774","775","776","778","779","780","782","784","785","786","787","788","789","790","791","792","793","794","795","796","797","798","799","800","801","802","803","805","806","807","808","809","810","811","812","814","815","816","819","820"],//开始时候的总抽奖券号都在这里
		// arrZhangQuMember = [],
		arrPaiChu = [], 
		ZhangQuMember = arrZhangQuMember.length,	
		zongshu = 0;
		// for (var i = 1; i <= 30; i++) {
		//  	arrZhangQuMember[i-1] = Buright('00000'+i.toString(),5);
		//  }; 
	// var meiyoufachuqu = ['0129','0254','0268','0278'];
	// for (var i = 0; i < meiyoufachuqu.length; i++) {
	// 					if(arrZhangQuMember.indexOf(meiyoufachuqu[i])>=0){
	// 						arrZhangQuMember.remove(arrZhangQuMember.indexOf(meiyoufachuqu[i]));
	// 					}
						
	// };//for 循环 删除选出的数组元素
	console.log(arrZhangQuMember)	
	$('.chouJiangZongShuShengYu').text('('+arrZhangQuMember.length+')');//初始化抽奖总人数
	var docClick = false;//不让每一次点击document都去判断，提高性能
	var adminFun = {
	checkChouJiangZongShu : function(){
			var wrong = false,
				nowMemberNum = 0;
			$('tbody tr','table.right')	.each(function(){

				var td1Val = parseInt($(this).children().eq(1).text() || parseInt($(this).children().eq(1).children().val()));
				nowMemberNum = td1Val + nowMemberNum;
				
				if(td1Val < 21 && td1Val > 0){
					$(this).children().eq(1).removeAttr('style');	
				}else{
					$(this).children().eq(1).css('color','red');
					wrong = true;
				}//if 满足抽奖总数的条件
				
			})//each
				zongshu =  parseInt(nowMemberNum);
				console.log(arrZhangQuMember.length)
				ZhangQuMember = parseInt(arrZhangQuMember.length) - parseInt(nowMemberNum) - ($('.meerText','.fit2Nums').length||0);
		
					if(ZhangQuMember < 0){
						wrong = true;
						$('.chouJiangZongShuShengYu').css('color','red');
					}else{
						$('.chouJiangZongShuShengYu').css('color','');
					}//if  	抽取的奖项总数 所有的和 加起来 大于总人数 那么报错


				$('.chouJiangZongShuShengYu').text('('+ZhangQuMember+')')
			if(wrong){
				alert('请检查红色输入有误的数字');
				return false;
			}else{return true}//if
			
		
		},//checkzongshu
	checkNowHover : function(){
			$('tr','tbody').each(function(){
				if($(this).hasClass('hover')){
						$(this).removeClass('hover').children().html(function(){
							return $(this).children().val();
						})	
				
				}//if


		})//each
	}//checkNowHover
	}//define fun
	$('tbody').delegate('tr','click',function(){
		docClick = true;
		var i = $(this).index(),
			defaultVal = $(this).children().eq(0).text() +','+ $(this).children().eq(1).text(),
			defaultValArr = defaultVal.split(',');
		if(!$(this).hasClass('hover')){
			$(this).addClass('hover').siblings().removeClass().children().html(function(n){
				if($(this).find('input')!=0){
					return $(this).children().val()	
				}
			}).end().end().children(':not(:last)').html('<input type="text">').end().find('input').first().attr('id','jiang'+i).val(defaultValArr[0]).end().eq(1).attr('id','num'+i).val(defaultValArr[1]);
		}//if
		return false;	
	})//click 给tr click 事件 变换 td 里面的 input 和 文本

	$(document).click(function(){
		adminFun.checkChouJiangZongShu();
		if(docClick){
			adminFun.checkNowHover();
		docClick = false;
		}//if	
	})//click 恢复第一个click 的变化

	$('.operation').click(function(){
		var model_tr = $('.model_tr','.model').find('tr');
		$('tbody','table.right').append(model_tr.clone());
		return false;
	})	//click点击增加一个tr

	$('tbody','table.right').delegate('.del','click',function(){
			$(this).parent().remove();
			return false;
	})//click












	/**********排除的人员**********/
	$('input','#fit2Input').keydown(function(e){ 
		var e = e || window.event;        
             if(e.keyCode==13){ // enter 键
            var $span = $('span','.model').clone();
            	$span.children('.meerText').text($(this).val());
             $('.fit2Nums').append($span);
             $(this).val('');
             
             $('.chouJiangZongShuShengYu').text('('+(parseInt(arrZhangQuMember.length) - zongshu - ($('.meerText','.fit2Nums').length||0))+')');    
            }

	})//keydown

	$('.fit2Nums').delegate('.memberDel','click',function(){
		$(this).parent().remove();
	})




	$('button.btn').click(function(){
		if(adminFun.checkChouJiangZongShu()){
			adminFun.checkNowHover();
			var options = {
				num1 : [],
				num1Length : null,
				num2 : [],
				arrZhangQuMember : arrZhangQuMember
			}
			var num1Length = $('tbody tr','table.right').length,
				num2Length = $('.memberDel','.fit2Nums').length,
				specilLength = $('input','#specilFieldset').val() || 0;
				options.specilLength = specilLength;
				options.num1Length = num1Length;
			for(var i = 0 ;i<num1Length;i++){
				options.num1[i] = {'jiangXiang':$('td:eq(0)','tbody tr:eq('+i+')').text(),'shuMu':$('td:eq(1)','tbody tr:eq('+i+')').text()};
			}//for
			for (var i = 0; i < num2Length; i++) {
				options.num2[i] = $('.meerText','.fit2Nums').eq(i).text();
			};
			
			

				if($('.fit2Nums').children().length != 0){
					arrPaiChu = [];
					$('.meerText','.fit2Nums').each(function(){

						arrPaiChu = ($(this).text()+ ',' + arrPaiChu).split(',');

					})//each	
					arrPaiChu.pop();
					
				for (var i = 0; i < arrZhangQuMember.length; i++) {

					if(arrPaiChu.indexOf(arrZhangQuMember[i])>=0){
						
						arrZhangQuMember.remove(arrPaiChu.indexOf(arrZhangQuMember[i]))
					}//数组 arrPaiChu 的元素在数组 arrZhangQuMember中
					
				};//循环排除 要排除的人员
				options.arrZhangQuMember = arrZhangQuMember;
				
				}//if 需要排除的不能参加抽奖的人员


				localStorage.setItem('options', JSON.stringify(options));//传出数据
			alert('设置成功');
			window.open('./index_main.html');

		}//if 抽取的奖项总数 满足条件
		return false;
	})//click 提交之后，将所有生成的数据传送到下一个环节中去

})(jQuery)