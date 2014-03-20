// JavaScript Document
$(function(){
	$(".mo").each(function(){
		$(this).mouseover(function(){
			$(this).addClass("over");
		}).mouseout(function(){
			$(this).removeClass("over");
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

// JavaScript Document
//新版本还没有检查，先保留
/*$(function(){
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
			if($(this).attr("target")!=""){
				$($(this).attr('target')).addClass("sel").siblings().removeClass("sel");
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
});*/