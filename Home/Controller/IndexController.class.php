<?php
/*
+------------------------------------------------
+               默认模块
+ 初稿 NewFuture
+ 完善
+-------------------------------------------------
*/
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    /**
     * 首页
     *
     * @add 判断登陆 by Future
     */
    public function index() {

        if ( get_id( false ) ) {
            $this->indexAll();
        }else{
            $this->display();
        }
    }
    /**
     * 修改者：夏闪闪
     * 添加逻辑
     */
    public function indexAll() {
        $this->indexGoto();
    }

    //创意页
    public function idea() {
        $this->indexGoto( C( "IDEA_TYPE" ) );
    }
    //时光机页
    public function talk() {
        $this->indexGoto( C( "TALK_TYPE" ) );
    }
    //问答
    public function question() {
        $this->indexGoto( C( "QUESTION_TYPE" ) );
    }
    // //孵化器页
    // public function incubator() {
    //     $this->indexGoto( C( "INCUBATOR_TYPE" ) );
    // }
    // //投资人页
    // public function vc() {
    //     $this->indexGoto( C( "VC_TYPE" ) );
    // }
    // //项目页
    public function project() {
        $this->indexGoto( C( "PROJECT_TYPE" ) );
    }
    // //政策页
    // public function policy() {
    //     $this->indexGoto( C( "POLICY_TYPE" ) );
    // }


    //先生汇不同页面数据

    public function indexGoto( $article_type=null ) {
        $this->indexData( $article_type );
        $this->goPage( $article_type );
    }

    //Home/Project/index

    public function indexData( $article_type=null ) {
        $user_id=get_id();
        $Article=M( 'article' );
        $fieldSql='article.*,user.user_nickname as user_name,user.user_id,user.user_avatar_url,user.user_focus_number';
        $joinSql=array();//user join sql
        $joinSql[0]="left join __USER__ as user on user.user_id=article.user_id";
        //$article_type=I('get.type');//不同模块

        if ( $article_type ) {
            $typeSql=' and article.article_type='.$article_type;
            //政策原链接地址
            if ( $article_type==C( "POLICY_TYPE" ) ) {
                $fieldSql.=',policy.policy_url';
                $joinSql[1]="left join __POLICY__ as policy on article.article_id=policy.article_id";
            }else if($article_type==C("INCUBATOR_TYPE") || $article_type==C("PROJECT_TYPE")){
                $fieldSql.=',project.project_avatar_url';
                $joinSql[1]="left join __PROJECT__ as project on project.article_id=article.article_id";
            }
        }else{
            $typeSql=' and article.article_type='.C("IDEA_TYPE").' or article.article_type='.C("TALK_TYPE").' or article.article_type='.C("QUESTION_TYPE");
        }
        $rows=12;
        $listRows=6;
        //不同页的查询limit不同
        switch ( $article_type ) {
        case C( "VC_TYPE" ):
            $rows=16;
            $listRows=16;
            break;
        case C( "INCUBATOR_TYPE" ):
        case C( "PROJECT_TYPE" ):
        case C( "POLICY_TYPE" ):
            $rows=8;
            $listRows=8;
            break;
        default:
            // code...
            break;
        }
        //条件先忽略，后期去掉注释
        //$user_condition='and user.user_id in (select user_id_focused from focus_on_user where user_id='.$user_id.')';
        $condition='article_effective=1 '.$typeSql;
        $count=$Article->where( $condition )->count();
        import( 'ORG.Util.Page' );
        $Page=new \Think\Page( $count, $rows );
        $show=$Page->show();

        //ajax请求
        if ( IS_AJAX ) {
            //unset($articleList);
            //unset($maxArticleId);
            $maxArticleId=I( 'post.maxArticleId' );//新页最大article id
            $articleList=$Article
            ->join( $joinSql )
            ->where( $condition.' and article_id<='.$maxArticleId )
            ->field( $fieldSql )
            ->order( 'article_id desc' )
            ->limit( $Page->listRows/2, $Page->listRows/2 )//加载更多
            ->select();
            if ( $articleList ) {
                $data['status']=1;
                foreach ($articleList as $key => $value) {
                    $this->uid=$value['user_id'];
                    $this->article=$value;
                    $articles.=$this->fetch('Index:articlecard');
                }
                
                $data['articles']=$articles;
                $this->ajaxReturn( $data, 'json' );
            }else {
                $data['status']=0;
                $data['firstRow']=$Page->firstRow;
                $data['listRows']=$Page->listRows;
                $this->ajaxReturn( $data, 'json' );
            }
        }else {
            //unset($articleList);
            $articleList=$Article
            ->join( $joinSql )
            ->where( $condition )
            ->field( $fieldSql )
            ->order( 'article_id desc' )
            ->limit( $Page->firstRow, $listRows )
            ->select();
            //var_dump($articleList);
            //下次操作（加载更多）的最大articleId
            $maxArticleId=$articleList[0]['article_id'];
            $this->assign( 'maxArticleId', $maxArticleId );
            $this->assign( 'list', $articleList );
            $this->assign( 'page', $show );
        }
    }

    public function goPage( $article_type ) {
        $goto='indexAll';
        switch ( $article_type ) {
        case C( "IDEA_TYPE" ):
            $goto='indexIdea';
            break;
        case C( "QUESTION_TYPE" ):
            $goto='indexQuestion';
            break;
        case C( "TALK_TYPE" ):
            $goto='indexTalk';
            break;
        case C( "PROJECT_TYPE" ):
            $goto='Project:index';
            break;

        }
        $this->display( $goto );
    }

    //发布孵化器、vc
    public function publish() {
        $user_id=get_id();
        $tag = M( 'tag' )->limit( 10 )->select();
        $this->assign( 'tag_list', $tag );
        $this->assign( 'user_id', $user_id );

        $type=I( 'get.type' );
        if ( $type=='incubator' ) {
            $this->display( 'Incubator:publish' );
        }else {
            $this->display( 'Vc:publish' );
        }


    }

    //几个搜索方面的方法
    //@author:牛亮
    //调用的函数来自于search.php
    public function searchUser() {
        //dump($_POST);
        header( "Content-Type: text/html; charset=UTF-8" );
        $type  = array_sum( I( 'post.TYPE', array( 0 ) ) ) % 4;   // 取模以使参数安全
        $cat   = array_sum( I( 'post.CATE', array( 0 ) ) ) % 128; // 取模以使参数安全
        $field = array_sum( I( 'post.FIELD', array( 0 ) ) ) % 8;   // 取模以使参数安全
        if ( I( 'exact', 1 ) ) $exact = true;
        else $exact = false;
        $this->user_list = search_user( I( 'post.keyword', '' ), $type, $cat, $field, $exact );
        if ( $this->user_list && !( $this->user_list< 0 ) ) {
            // dump($this->user_list);
            $this->display();}
        else {
            //$this->display();}
            $this->error( '没有返回结果,请检查您的勾选选项或关键字.' ); }
    }

    public function searchCircle() {
        header( "Content-Type: text/html; charset=UTF-8" );
        $this->result = search_circle( I( 'keyword', '' ) );
        //dump($this->result);
        if ( $this->result && !( $this->result< 0 ) ) {
            $this->display();}
        else {
            $this->error( '没有返回结果,请检查您的勾选选项或关键字.' ); }
    }

    public function searchTag() {
        header( "Content-Type: text/html; charset=UTF-8" );
        if ( I( 'exact', true ) ) {
            $exact = true;}
        else {
            $exact = false;}
        $this->tag_list = search_tag( I( 'keyword', '' ), $exact );
        // dump($this->tag_list);
        if ( $this->tag_list && $this->tag_list!=-1 ) {
            $this->display(); }
        else {
            $this->error( '没有返回结果,请检查您的勾选选项或关键字.' ); }
    }

    public function searchArticle() {
        header( "Content-Type: text/html; charset=UTF-8" );
        $type  = array_sum( I( 'post.TYPE' , array( 0 ) ) ) % 8; // 取模以使参数安全
        $field = array_sum( I( 'post.FIELD', array( 0 ) ) ) % 8; // 取模以使参数安全
        $order = array_sum( I( 'post.ORDER', array( 0 ) ) ) % 4; // 取模以使参数安全
        if ( I( 'exact', true ) ) $exact = true;
        else $exact = false;
        $this->article_list = search_article( I( 'post.keyword', '' ), $type, $field, $order, $exact );
        // dump($this->article_list);
        if ( $this->article_list && !( $this->article_list< 0 ) ) {
            $this->display();}
        else {
            $this->error( '没有返回结果,请检查您的勾选选项或关键字.' ); }
    }

    //介绍页
    //@作者：
    public function about() {

    }

    //网站地图
    //所有页面连接
    //@作者：
    public function sitemap() {

    }

}
