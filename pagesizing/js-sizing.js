require([
	'jquery'
  ], function ($) {
	"use strict";
	function getSize(){
		var getSize=[];
		for(var i=0;i < $(".table-size tr").length;i++)
		{	 
			var size = [];
			for(var j=0;j < $(".table-size tr:eq('"+(i+1)+"')").find("td").length -1;j++){
				var oldValue = $(".table-size tr:eq('"+(i+1)+"')").find("td").eq(j+1).text();
				size.push(oldValue);
			}
			getSize.push({size});	
		}
		return getSize;
	}
	function convert(cm=null){
		if(cm != null){
			for(var i=0;i < $(".table-size tr").length;i++)
			{	 
				var size = [];
				for(var j=0;j < $(".table-size tr:eq('"+(i+1)+"')").find("td").length;j++){
  
					var oldValue = $(".table-size tr:eq('"+(i+1)+"')").find("td").eq(j+1).text();
					var newValue = (oldValue * 0.393700787).toFixed(2);
					$(".table-size tr:eq('"+(i+1)+"')").find("td").eq(j+1).text(newValue);
				}
			}
		}
	}
	var size = getSize();
	$(".custom-checkbox input").on("click",function(){
		if ($(this).is(':checked')) {
			  convert("cmToinches");
		}else{
			for(var i=0;i < $(".table-size tr").length;i++)
			{	 
				for(var j=0;j < $(".table-size tr:eq('"+(i+1)+"')").find("td").length;j++){
					$(".table-size tr:eq('"+(i+1)+"')").find("td").eq(j+1).text(size[i].size[j]);
				}
			}
		}
	});
	$(".cms-sizing .sizing-content-right h5:not(.sizing-open)").nextAll().not("h5").hide();
	$(".cms-sizing .sizing-content-right h5").each(function(){
		$(this).on("click",function(event) {
			if($(this).hasClass("sizing-open")){
				$(this).removeClass('sizing-open');
				$(this).nextUntil("h5").hide(50);
		
			}else{
				$(this).toggleClass('active');
				$(this).nextUntil("h5").slideToggle(50);
				var $height =$(window).height() / 2;
				$("html, body").animate({scrollTop:0}, 50);	
				$(this).parent().find("h5").not(this).removeClass("active").nextUntil("h5").hide(50);
				$(this).parent().find("h5").removeClass("sizing-open");
			}
		
		});

	});

	if($(window).width() <= 767){
		var $length = $(".sizing-content-right .content-leftbar p").length;
		var textFirst = $(".sizing-content-right .content-leftbar p").eq($length-2);
		var textLast  =$(".sizing-content-right .content-leftbar p").eq($length-1);
		textFirst.css("display","none");
		textLast.css("display","none");
		$("<p style='font-weight: bold;margin-bottom: 0;padding-top:6px'>"+textFirst.html()+"</p><p style='margin-bottom: 0'>"+textLast.html()+"</p>").insertAfter(".sizing-content-right figure");
		$(".cms-sizing .content-left-sizing .side-bar-cms h5").text("SIZING");

	}
});
  