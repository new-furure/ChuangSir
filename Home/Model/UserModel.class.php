<?php

namespace Home\Model;
use Think\Model;

/**
 * 用户User表Model
 *
 * @author NewFuture
 * @version 2.0 加密
 * **************************/
class UserModel extends Model
{
	//自动验证 array(验证字段,验证规则,错误提示,[验证条件,附加规则,验证时间])
	protected $_validate = array(
		//email 格式验证
		array( "user_email", "email", "Email格式不对！", self::EXISTS_VALIDATE/*0存在时验证*/, "", self::MODEL_BOTH/*3都验证*/, ),
		//注册密码确认
		array( "re_passwd", "user_passwd", "两次密码不一致！", 0/*self::EXISTS_VALIDATE*/, "confirm" ),
		//注册邮箱唯一性验证
		array( "user_email", "", "邮箱已经注册!", 0/*存在字段时验证*/, "unique", 1/*self::MODEL_INSTERT*/, ),
		//密码非空
		array( 'user_passwd', "require", '密码不能为空', 0, '', 1 ),
	);
	//自动填充
	protected $_auto = array(
		//密码加密
		array( 'user_passwd', "encodePasswd", 3, 'callback' ),
		//w为空时不处理
		array( 'user_password', '', 2, 'ignore' ),
		//
	);

	/**
	 * 依据具POST的信息
	 * 对密码加密
	 *
	 * @author Future
	 * @param string  $password
	 * @return string 加密后的结果
	 */
	public function encodePasswd() {
		$passwd=I( 'post.user_passwd' );
		if ( !$passwd ) {
			return;
		}

		//前端是否已经MD5加密
		$isMd5=I( 'post.is_md5' );
		$email=I( 'post.user_email' );

		if ( !$isMd5 ) {
			//前端为加密进行md5处理
			$passwd=md5( $passwd );
		}

		return encryption( $passwd, $email );
	}
}
