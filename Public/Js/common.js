/*
公用函数块

*/

var new_talk=0;
var new_question = 0;
var new_idea = 0;
$(function () {
	//alert('function');
	var layer=document.createElement("div");
	layer.id="layer";
	var top_num = document.documentElement.scrollTop + 
    	document.documentElement.clientHeight/2-60+"px";
$('#up').click(function() //点赞函数，实现点赞之后赞数+1并显示取消赞，已赞则-1并显示赞。
{
	var ar = $(this);
	var aid = ar.attr('aid');
	var vl=ar.find(".up_num").text();
	$.post(up_url,{aid:aid},function(data){
		if(data.type==0){
			layer.innerHTML = "不能赞自己";
			layout(layer,top_num);
		}else{

		    if(data.type==1){
		    	vl=parseInt(vl)+1;
	   		    ar.find('.up_num').text(vl);//页面元素加1
              	ar.find('.up').html('取消赞');
            }else{
            	vl=parseInt(vl)-1;
	   		    ar.find('.up_num').text(vl);//页面元素减1
            	ar.find('.up').html('赞');
            }
        }
    },'json'); 
});
$('#down').click(function() //点踩函数。
{
	var ar = $(this);
	var aid = ar.attr('aid');
	var vl=ar.find(".down_num").text();
	$.post(down_url,{aid:aid},function(data){
		if(data.type==0){
			layer.innerHTML = "不能踩自己";
			layout(layer,top_num);
		}else{

		    if(data.type==1){
              	ar.find('.down').html('取消踩');
              	vl=parseInt(vl)+1;
	   		    ar.find('.down_num').text(vl);//页面元素加1
            }else{
            	ar.find('.down').html('踩');
              	vl=parseInt(vl)-1;
	   		    ar.find('.down_num').text(vl);//页面元素减1
            }
        }
    },'json'); 
});
$('#focus').click(function() //关注函数。
{
	var ar = $(this);
	var aid = ar.attr('aid');
	var vl=ar.find(".focus_num").text();
	$.post(focus_url,{aid:aid},function(data){
		if(data.type==0){
			layer.innerHTML = "不能关注自己";
			layout(layer,top_num);
		}else{

		    if(data.type==1){
              	ar.find('.focus').html('取消关注');
              	vl=parseInt(vl)+1;
	   		    ar.find('.focus_num').text(vl);//页面元素加1
            }else{
            	ar.find('.focus').html('关注');
              	vl=parseInt(vl)-1;
	   		    ar.find('.focus_num').text(vl);//页面元素减1
            }
        }
    },'json'); 
});
$('#collect').click(function() //收藏函数。
{
	var ar = $(this);
	var aid = ar.attr('aid');
	var vl=ar.find(".collect_num").text();
	$.post(collect_url,{aid:aid},function(data){
		if(data.type==0){
			layer.innerHTML = "不能收藏自己";
			layout(layer,top_num);
		}else{

		    if(data.type==1){
              	ar.find('.collect').html('取消收藏');
              	vl=parseInt(vl)+1;
	   		    ar.find('.collect_num').text(vl);//页面元素加1
            }else{
            	ar.find('.collect').html('收藏');
              	vl=parseInt(vl)-1;
	   		    ar.find('.collect_num').text(vl);//页面元素减1
            }
        }
    },'json'); 
});

});
//发布按钮点击之后的处理函数，对用户类型和用户登录状态进行判断。
function publish(){ 
	var layer=document.createElement("div");
	layer.id="layer";
	var top_num = document.documentElement.clientHeight/2-30+"px";
	$.post(verify_url,{article_type:article_type},function(data)
	{
		switch(data.type){
			case 0:
				layer.innerHTML = "您还没有登录";
				layout(layer,top_num);
				break;
			case 1:
				layer.innerHTML = "您没有发布政策的权限";
				layout(layer,top_num);
				break;	
			case 2:
				window.location.href = publish_url;
				break;
			case 3:
				window.location.href = publish_step1_url;
				break;
			case 4:
				layer.innerHTML = "您不属于可以发布项目的用户类型";
				layout(layer,top_num);
				break;
		}
    },'json');
  $("#dianjizhediepinglun").click(function(){
  $("#pinglun").toggle();
  });
  $("#dianjizhediewanshan").click(function(){
  $("#wanshan").toggle();
  });
}
//编辑按钮点击处理函数。传文章id值。
function edit(){ 
	var newDigi = document.getElementById("collect");
	var article_id=newDigi.getAttribute("aid");
	window.location.href = edit_url+"/"+article_id;	
}
//提交的处理函数。根据不同的文章类型先判断输入的合法性。异步提交并返回一定的信息。
//提交的处理函数。根据不同的文章类型先判断输入的合法性。异步提交并返回一定的信息。
function submit(){ 
	
}
//存草稿函数，根据不同的文章类型异步传值，并返回状态信息。
function save_draft(){
	var layer=document.createElement("div");
	layer.id="layer";
	var top_num =  document.documentElement.scrollTop -480 +"px";
	var profile;
	var biaoqian;
	switch(article_type){
	case 'policy':
		profile=$('textarea[name=profile]');
		biaoqian=$('input[name=biaoqian]').val();
		profile=profile.val();
		break;
	case 'project':
		profile=$('textarea[name=profile]');
		biaoqian=$('input[name=biaoqian]').val();
		profile=profile.val();
		break;
	case 'question':
		profile ='';
		biaoqian=$('input[name=biaoqian]').val();
		break;
	default:
		biaoqian='';
		profile ='';
	}
	var title=$('input[name=article_title]');
	var content=UE.getEditor('editor').getContent();
	$.post(save_url,{article_type:article_type,title:title.val(),content:content,
		profile:profile,biaoqian:biaoqian},
		function(data){
			switch(data.type){
				case 1:
					layer.innerHTML = "保存失败，请检查输入";
					layout(layer,top_num);
					break;
				case 2:
					layer.innerHTML = "保存成功";
					layout(layer,top_num);
					//window.location.href = home_url;	
					break;
				default:
					break;
			}
		}
		,'json');
}
//生成提示小框，弹出一小段时间之后自动消失，代替alert函数功能。
function layout(layer,top_num){
	var left_num= document.documentElement.scrollLeft + 
    	document.documentElement.clientWidth/2-90+"px";
   /* alert(left_num);
    alert(top_num);*/
	var style=
	{
		backgroundColor:"#ccffcc",
		position:"fixed",
		zIndex:"9999",
		width:"200px",
		height:"80px",
		border:"1px",
		solid:"#ccc",
		textAlign:"center",
		borderRadius:"10px",
		paddingTop:"20px",
		fontSize:"16px",
		color:"#009999",
   		left:left_num,
    	top:top_num,
	}
	for(var i in style)
	   layer.style[i]=style[i];
	if(document.getElementById("layer")==null)
	{
		document.body.appendChild(layer);
		setTimeout("document.body.removeChild(layer)",2000)
	}		
}
//项目模块我要参与的处理函数，对内容进行一定的判断然后异步跳转
function join(){
 	//alert('点击参与');
 	var top_num = document.documentElement.scrollTop + 
    	document.documentElement.clientHeight/2-30+"px";
 	var layer=document.createElement("div");
	layer.id="layer";
    var newDigi = document.getElementById("collect");
	var aid=newDigi.getAttribute("aid");
	var content=$('textarea[name=canyu_content]');
	if(content.val()==''){
		content.focus();
		return;
	}
	//alert(aid);
    $.post(join_url,{aid:aid,content:content.val()},function(data){
    	switch(data.type){
    		case 0:
    			layer.innerHTML="您还没有登录！";
    			layout(layer,top_num);
    			break;
    		case 1:
	    		layer.innerHTML = "发送成功";
				layout(layer,top_num);
				break;
			default:
				break;
    	}
    },'json');
    canyu_content.value="";
}

//该函数用于图片显示出错时显示替换图
function showimg(obj){
        //var errorimg = "__ROOT__/Public/Img/error.jpg";//替换图…
        obj.src = errorimg;
        document.getElementById( "img" ).style.height = "150px"; 
        
}


//时间字符串转换为unix时间戳
function strtotime(strings){
    var arr = strings.split(" ");
    var arr1 = arr[0].split("-");
    var arr2 = arr[1].split(":");
    var year = arr1[0];
    var month = arr1[1]-1;
    var day = arr1[2];
    var hour = arr2[0];
    var mon = arr2[1];
    var timestamp = new Date(year,month,day,hour,mon).getTime()/1000; 
    return timestamp;
}
//时间输出格式化
function formatTime(time){
    var timestamp=strtotime(time);
    var curTimestamp=new Date().getTime()/1000;
    var interval=curTimestamp-timestamp;
    var pastMin=Math.floor(interval/60);
    if(pastMin==0){
    	return "刚刚";
    }else if(pastMin>0 && pastMin<60){
        return pastMin+"分钟前";
    }else if(pastMin>=60){
        var pastHour=Math.floor(interval/3600);
        if(pastHour<=24){
            return pastHour+"小时前";
        }else{
            return time.substr(5,11);
        }
    }
}

//@作者：李建男
//评论加载和评论提交
 
 function getid(el){return document.getElementById(el);}
 var toggle=1;
 var alerthtml="";

  function response(obj){
  		
 	 //alert('hi');
 	// if(getid("panel").style.display!="block"){
 		var oComment=obj.parentNode.parentNode;//这里是关键。找到当前留言对象。
 		var article_id = oComment.getAttribute("aid");
 		//alert(oComment.nodeName);
 		var domPanel=getid("panel"+article_id);
 		//alert(oComment);
 		if(toggle==1){
	    	//oComment.appendChild(domPanel);
	    	
	    	domPanel.style.display="block";
	    	toggle=0;
	    }else{
	    	//oComment.removeChild(domPanel);
	    	domPanel.style.display="none";
	    	toggle=1;
	    }
 	//}

    /*$(".panel").slideToggle("slow");*/
/*	var newDigi = document.getElementById("withdrawComment"); */
 	//传回文章id——用于提取评论
    
    //alert(article_id);
    var article_type = oComment.getAttribute("atype");
    var id = $('.discussCon').attr("id");
    //alert(id);
	//先将内容post回controller
	$.post(withdrawUrl,{article_id:article_id,article_type:article_type},function(data){
		switch(data.type){
			case 0:
				alerthtml = "评论加载失败，请重试";
          		getid("dis"+article_id).innerHTML=alerthtml;
          		break;
          	case 1:
          		var html="";
          		$.each(data.user_comment,function(idx,item)
				{	/*alert('haha');*/
          		html+='<dl><dt><img src="'+item.user_avatar_url+'" /></dt><dd><p> <a href="">'+item.user_nickname+'</a>'+item.comment_content+'</p><ul><li class="msgIcon_3 mo clk">赞(0)</li><li class="msgIcon_4 mo clk">踩(0)</li><li class="msgIcon_5 mo clk">回复(0)</li></ul></dd></dl>';
          		$('.discussCon').html(html);
          
          		}); 
          		if(alerthtml!=""){
          			alerthtml="";
          		}
          		break;
          	case 2: 
          		alerthtml = "还没有评论，快写下你的评论吧";
          		getid("dis"+article_id).innerHTML=alerthtml;
          		break;
          	default:
          		break;

		}
                 
     },'json');
 }
//发布评论
function reply(obj){
/*	alert('gegge');*/
    var oComment=obj.parentNode.parentNode;//这里是关键。找到当前留言对象。留言对象属性在ul中
    //传回文章id——用于提取评论
    var article_id=oComment.getAttribute("aid");
    var user_nickname=oComment.getAttribute("uname");
    var user_avatar_url=oComment.getAttribute("uau");
 	//获取标签的自定义属性
    //传回评论类型——用户评论后在表中插入信息

    //评论内容

    var commentContent=$('#text'+article_id);
    if (commentContent.val()!= "") {

        var a=$.post(handleUrl,{comment_content:commentContent.val(),article_id:article_id,comment_type:comment_type},function(data){
          if(data.type==0){
          	var htmlalert='评论失败，请重试</p>';
   			$(".discussCon").html(htmlalert);
   			/*$(".discussCon i").eq(0).css({"textAlign":"center","height":"0"});  */       	
          }
          else{
            var con='<dl><dt><img src="'+user_avatar_url+'" /></dt><dd><p> <a href="">'+user_nickname+'</a>'+commentContent.val()+'</p><ul><li class="msgIcon_3 mo clk">赞(0)</li><li class="msgIcon_4 mo clk">踩(0)</li><li class="msgIcon_5 mo clk">回复(0)</li></ul></dd></dl>';
  			$(".discussCon").prepend(con);
  			$('#text'+article_id).val("");
          }
        },'json');
        a.error(function(){alert('fail')});

      }

  }

//加载更多
function listMore (maxArticleId) {
	//var maxArticleId=;
	$.ajax({
      type:"post",	      
      url:"indexData",
      data:{maxArticleId:maxArticleId},
      success: function(data, textStatus, xhr) {
        if(data.status==1){
        	if(!data.articleList){
        		$('#loadMore').hide();
        	}else{
	           $.each(data.articleList,function(idx,item){
	           	var time=formatTime(item.article_time);
	           	var image="";
	           	var type;
	           	if(item.article_picture_url){
	           		image="<div><img id='img1' width='110px' height='140px' src='"+item.article_picture_url+"'/></div>";
	           	}
	           	switch(item.article_type){
	           		case "4":
	           			type="创意汇";
	           			break;
	           		case "5":
	           			type="时光机";
	           			break;
	           		case "3":
	           			type="问答";
	           			break;
	           		default:
	           			type="";
	           			break;
	           	}
	          	var txt="<dl><dt><img src='"+item.user_avatar_url+"' /><div class='userConWindow rn ss'><div class='userConWindowBox'><img class='userConImg' src='"+item.user_avatar_url+"' /><span><b class='rs'>加好友</b><b class='rs'>关注</b><b class='rs'>私信</b></span><p><a class='userConWindowUserName' href='###'>十一的眼泪</a><br /><a href='###'>关注（"+item.user_focus_number+"）</a><strong>|</strong><a href='###'>粉丝（"+item.user_focus_number+"）</a></p><font><a href='###'>个人主页</a><strong>|</strong><a href='###'>个人资料</a><strong>|</strong><a href='###'>项目主页</a></font></div></div></dt><dd><i>"+item.user_name+"在"+type+"上有了新动态</i><em>"+time+"</em><h3>"+item.article_title+"</h3><p>"+item.article_content+"<strong>显示更多</strong></p>"+image+"<ul><li class='msgIcon_1 mo clk'>关注问题</li><li class='msgIcon_2 mo clk'>收藏</li><li class='msgIcon_3 mo clk'>赞("+item.article_up_number+")</li><li class='msgIcon_4 mo clk'>踩("+item.article_down_number+")</li><li class='msgIcon_5 mo clk'>评论("+item.article_comment_number+")</li><li class='msgIcon_6 mo clk'>分享</li></ul></dd></dl>";
				txt=$.trim(txt);
	          	$('.msgBox').append(txt);
	          	$('#loadMore').hide();
	          }); 
			}
        }else{
        	$('#loadMore').hide();
        }                
      }
  	});
}

//评论的提交
function post_submit(){

  var newDigi = document.getElementById("comment_submit"); 
  var article_id=newDigi.getAttribute("aid");
  var user_nickname=oComment.getAttribute("uname");
  var user_avatar_url=oComment.getAttribute("uau");

  var content=$('textarea[name=commentContent]');
      if (content.val()!= "") {

        var a=$.post(handleUrl,{comment_content:content.val(),article_id:article_id,comment_type:comment_type},function(data){
          if(data.type==0){
          	var htmlalert='评论失败，请重试</p>';
   			$(".reback").prepend(htmlalert);
   			/*$(".discussCon i").eq(0).css({"textAlign":"center","height":"0"});  */       	
          }
          else{
            var con='<dl><dt><img src="'+user_avatar_url+'" /></dt><dd><p> <a href="">'+user_nickname+'</a>'+commentContent.val()+'</p><ul><li class="msgIcon_3 mo clk">赞(0)</li><li class="msgIcon_4 mo clk">踩(0)</li><li class="msgIcon_5 mo clk">回复(0)</li></ul></dd></dl>';
  			$(".pinh").prepend(con);
  			$(".ping").val("");
          }
        },'json');
        a.error(function(){alert('fail')});

      }
}


//首页轮播js
var hotActivitySlideTimer;
$(function(){
	$(".hotActivitySlide").css({"height":$(".hotActivitySlide li").eq(0).outerHeight()+$(".hotActivitySlidePrev").outerHeight()+$(".hotActivitySlideNext").outerHeight()});
	$(".hotActivitySlide ul").css({"top":$(".hotActivitySlidePrev").outerHeight()})
	$(".hotActivitySlide li").eq(0).addClass("sel");
	$(".hotActivitySlide ul").addClass("ready");
	hotActivitySlideTimer = setInterval(  runHotActivitySlideAuto, 5000);
	$(".hotActivitySlide").mouseover(function(){
		clearInterval(hotActivitySlideTimer);
	}).mouseout(function(){
		hotActivitySlideTimer = setInterval(  runHotActivitySlideAuto, 5000);
	});
});
function runHotActivitySlide(t){
	if($(".hotActivitySlide ul").is(".ready")){
		$(".hotActivitySlide ul").removeClass("ready");
		var nowTop = parseInt($(".hotActivitySlide ul").css("top").split("px")[0]);
		var tarTop = parseInt(0);
		if(t.is(".hotActivitySlideNext")){
			if($(".hotActivitySlide .sel").next().is("li")){
				tarTop = nowTop-$(".hotActivitySlide .sel").outerHeight();
				$(".hotActivitySlide .sel").next().addClass("sel").siblings().removeClass("sel");
			}else{
				tarTop = $(".hotActivitySlidePrev").outerHeight();
				$(".hotActivitySlide li").removeClass("sel").eq(0).addClass("sel");
			}
		}else{
			if($(".hotActivitySlide .sel").prev().is("li")){
				tarTop = nowTop+$(".hotActivitySlide .sel").prev().outerHeight();
				$(".hotActivitySlide .sel").prev().addClass("sel").siblings().removeClass("sel");
			}else{
				tarTop = $(".hotActivitySlide li").last().outerHeight()-$(".hotActivitySlide ul").outerHeight()+$(".hotActivitySlidePrev").outerHeight();
				$(".hotActivitySlide li").removeClass("sel").last().addClass("sel");
			}
		}
		$(".hotActivitySlide ul").animate({"top":tarTop},500);
		$(".hotActivitySlide").animate({"height":$(".hotActivitySlide .sel").outerHeight()+$(".hotActivitySlidePrev").outerHeight()+$(".hotActivitySlideNext").outerHeight()},500,function(){
			$(".hotActivitySlide ul").addClass("ready");
		});
	}
}
function runHotActivitySlideAuto(){
	$(".hotActivitySlideNext").trigger("click");
}


