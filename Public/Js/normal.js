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
			type_select=!type_select;
			if(type_select == true){
				article_type='talk';
				article_cat = "时光机";
			}
				
			else {
				article_type='idea';
				article_cat = "创意汇";
			}
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