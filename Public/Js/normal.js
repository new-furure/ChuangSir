// JavaScript Document
$(function(){
	$(".mo").each(function(){
		$(this).mouseover(function(){
			$(this).addClass("over");
		}).mouseout(function(){
			$(this).removeClass("over");
		});
	});
	$(".tab").each(function(){
		$(this).mousedown(function(){
			$(this).addClass("sel").siblings().removeClass("sel");
		});
	});
	$(".clk").each(function(){
		$(this).mousedown(function(){
			$(this).addClass("sel");
		});
	});
	$(".upImg").click(function(){
		$(this).find(".upImgWindow").toggle();
	});
	$(".msgBox dt").mouseover(function(){
		$(this).find(".userConWindow").show();
	}).mouseout(function(){
		$(this).find(".userConWindow").hide();
	});
	$(".policyBox dt").mouseover(function(){
		$(this).find(".userConWindow").show();
	}).mouseout(function(){
		$(this).find(".userConWindow").hide();
	});
	$(".pinh dt").mouseover(function(){
		$(this).find(".userConWindow").show();
	}).mouseout(function(){
		$(this).find(".userConWindow").hide();
	});
});