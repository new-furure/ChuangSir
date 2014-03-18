   function openBrowse(){ 
       	// alert('点击上传');
        var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false; 
        if(ie){ 
        document.getElementById("photo").click(); 
        }else{
        var a=document.createEvent("MouseEvents");//FF的处理 
        a.initEvent("click", true, true);  
        document.getElementById("photo").dispatchEvent(a); 
        } 
    } 
  
    function PreviewImage(imgFile)
     {  
     	$("#uploadForm").submit();
        /*  $.ajaxFileUpload
                     (
                       {
                            url:'{:U("__URL__/uploadPhoto")}', //你处理上传文件的服务端
                            secureuri:false,
                            fileElementId:'img',
                            dataType: 'json',
                            success:function(data)
                                  {
                                    alert(data.file_infor);
                                  }
                        }
                    );
        alert('上传图片');*/
        var filextension=imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
        filextension=filextension.toLowerCase();
        if ((filextension!='.jpg')&&(filextension!='.gif')&&(filextension!='.jpeg')&&(filextension!='.png')&&(filextension!='.bmp'))
        {
            alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            imgFile.focus();
        }
        else
        {
            //var path;
            if(document.all)//IE
            {
                imgFile.select();
                path = document.selection.createRange().text;
                document.getElementById("imgPreview").innerHTML="";
                document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果      
            }
            else//FF
            {
            	//alert('图片预览');
                path=window.URL.createObjectURL(imgFile.files[0]);// FF 7.0以上
                //path = imgFile.files[0].getAsDataURL();// FF 3.0
                document.getElementById("imgPreview").innerHTML = "<img id='img1' width='110px' height='140px' src='"+path+"' onclick='openBrowse()'/>";
                //document.getElementById("img1").src = path;
            }
            //alert(path);
            //document.getElementById("message").value = "上传成功";
      	    
        }
 	}
 	function stopSend(url){
 		//alert('发送成功');
 		document.getElementById('send_state').innerHTML = '图片上传成功';
 		pic_url = url;
 	}