<?php
	//��ʱдһЩ��������������
	function getConfig()
	{
		$config=M('config')->getField('name,content');
		C($config);//�ϲ����ò�����ȫ������
		//���ôκ����󣬿���ֱ����C����ȡ������Ϣ��
	}
?>