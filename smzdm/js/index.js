//右侧栏回到顶部
$('.back-top').click(function(){
    $('body').animate({scrollTop:0});
}) 


// nav导航条stickup
var $cur = $('#global-nav');//导航条nav
       var curH = $cur.height();//导航条的高度
       var curW = $cur.width(); //导航条的宽度
       var offsetTop = $cur.offset().top;//向上偏移的距离
       var offsetLeft = $cur.offset().left;//向左偏移的距离

       //在导航前面克隆目标元素，让其暂时隐藏以保证同时只能看到一个
       var $curClone = $cur.clone().css({visibility:'hidden',display:'none'}).insertBefore($cur);

       //监听窗口滚动
       $(window).on('scroll',function(){
       	   var scrollTop = $(this).scrollTop();//获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
       	   if(scrollTop >= offsetTop){
       	   	  setFixed();
       	   }else{
       	   	  unsetFixed();
       	   }
       });
       function isFixed(){
         return $cur.data('data-fixed');
       }
       //设置fixed状态
       function setFixed(){
       	   $cur.css({
       	   	 'position':'fixed',
       	   	 'top':0,
       	   	 'left':offsetLeft,
       	   	 'width':curW,
       	   	 'margin':0,
       	   	 'z-index':9999//保证元素在z轴的最上方
       	   });
       	   $curClone.show();
       }
       //设置unfixed状态
       function unsetFixed(){
         $cur.data('data-fixed', false)
             .removeAttr('style');
         $curClone.hide();
       }

