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
		array( 'user_passwd', '', 2, 'ignore' ),

		//密码修改时的填充
		array('oldpasswd','',3,'ignore') ,
		array( 'oldpasswd', "encodeOldPasswd", 2, 'callback' ),

	);

	/**
	 * 依据具POST的信息
	 * 对密码加密
	 *
	 * @author Future
	 * @param string  passwd
	 * @return string 加密后的结果
	 */
	protected function encodePasswd( $passwd) {
		if(!$passwd)
			$passwd= I( 'post.user_passwd' );
		// if ( !$passwd ) {
		// 	if ( APP_DEBUG ) {
		// 		dump($isnew);
		// 		dump( $passwd );
		// 		dump( $_POST );
		// 	}
		// 	E( '密码不能为空！' );
		// }else{
		// 	return;
		// }

		//前端是否已经MD5加密
		if ( !I( 'post.is_md5' ) ) {
			//前端未加密进行md5处理
			$passwd=md5( $passwd );
		}

		//获取邮箱
		$email=I( 'post.user_email' );
		if ( empty( $email ) ) {

			$id=get_id( false );
			if ( !$id ) {
				$id=session( "user_id_for_change" );
			}
			if ( $id ) {
				$email=M( 'User' )->getFieldByUserId( $id, 'user_email' );
			}
		}

		if ( empty( $email ) ) {
			E( '查找用户失败' );
		}

		return encryption( $passwd, $email );
	}

	protected function encodeOldPasswd() {
		$oldpasswd=I( 'post.oldpasswd' );
		if($oldpasswd)
		return $this->encodePasswd( $oldpasswd );
	}
}