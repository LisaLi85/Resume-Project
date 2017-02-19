// 头部搜索
      $(window).on('scroll',function(){
          if($(window).scrollTop()>50){//当滚动条滚动的距离大于20的时候
            $('header').css({'background':'#c91523'});//回到顶部按钮显示
          }else{
            $('header').css({
              'background':'none',
              'opacity':'0.85'
            });
          }
      })



// 轮播

var Carousel=(function(){
  function _Carousel($carousel,_container, _pre, _next, _item_bullet,_autoPlay){
    this.ct=$carousel;
      this.init(_container, _pre, _next, _item_bullet);
      this.bind();
      if('autoPlay'==_autoPlay)
      {
        this.autoPlay();  
      }
    
  }

  _Carousel.prototype.init=function(_container, _pre, _next, _item_bullet){
    this.$ct = this.ct.find(_container);
      this.$items=this.$ct.children();
      this.$pre= this.ct.find(_pre);
      this.$next=this.ct.find(_next);
      this.$bullet=this.ct.find(_item_bullet);
      this.imgWidth=this.$items.width();
      this.imgCount=this.$ct.children().size();

      this.$ct.prepend(this.$items.last().clone());
    this.$ct.append(this.$items.first().clone());
    this.imgRealCount=this.$ct.children().length;
    this.$ct.css({left:0-this.imgWidth,width:this.imgRealCount*this.imgWidth});
  };
  _Carousel.prototype.bind=function(){
    this.curIdx=0;
    this.isAnimate=false;
    var _this=this;
    this.$next.on('click',function(){
      _this.playNext();
    });
    this.$pre.on('click',function(){
      _this.playPre();
    });
    this.$bullet.find('li').on('click',function(){
      var idx=$(this).index();
      if(idx > _this.curIdx){
        _this.playNext(idx-_this.curIdx);
      }else if(idx < _this.curIdx){
        _this.playPre(_this.curIdx-idx);
      }
    });
  };
  _Carousel.prototype.playNext=function(idx){
    var idx = idx || 1;
    var _this=this;
      if(!this.isAnimate){
        this.isAnimate=true;
        this.$ct.animate({left:'-='+(_this.imgWidth*idx)},function(){
          _this.curIdx+=idx;
          if(_this.curIdx==_this.imgCount){
            _this.$ct.css({left:0-_this.imgWidth});
            _this.curIdx=0;
          }
          _this.isAnimate=false;
          _this.setBullet();
        });
      }
  };
  _Carousel.prototype.playPre=function(idx){
    var idx=idx||1;
    var _this=this;
      if(!this.isAnimate){
        this.isAnimate=true;
        this.$ct.animate({left:'+='+(_this.imgWidth*idx)},function(){
          _this.curIdx=(_this.imgCount+_this.curIdx-idx)%_this.imgCount;
          if(_this.curIdx==(_this.imgCount-1)){
            _this.$ct.css({left:0-_this.imgWidth*_this.imgCount});
          }
          _this.isAnimate=false;
          _this.setBullet();
        });
      }
  };
  _Carousel.prototype.setBullet=function(){
    this.$bullet.find('li').removeClass('active')
                        .eq(this.curIdx).addClass('active');
  };
  _Carousel.prototype.autoPlay=function(){
    var _this=this;
    this.clock=setInterval(function(){
        _this.playNext();
    },3000);
  };
  _Carousel.prototype.stopAuto=function(){
    clearInterval(this.clock);
  };

  return {
    // init:function($ct,_container, _pre, _next, _item_bullet,_autoPlay){
    //  $ct.each(function(index,node){
    //    new _Carousel($(node),_container, _pre, _next, _item_bullet,_autoPlay);
    //  });
    // }

    init:function($ct,_container, _pre, _next, _item_bullet,_autoPlay){
      
      new _Carousel($ct,_container, _pre, _next, _item_bullet,_autoPlay);
      
    }

  };
})();


// 懒加载
 		   showImg();
           var clock;
           $(window).on("scroll",function(){
           	//设置定时器当事件触发一定时间后再执行
				if(clock){
					clearTimeout(clock);
				}
				clock = setTimeout(function(){
					showImg()
				},500)//每0.3秒执行一个showImg()
			});

	       function isVisible($node){
			    var nodeH = $node.height();
			    var offsetTop=$node.offset().top;
			    var winH=$(window).height();
				var scrollTop=$(window).scrollTop();						

				if(winH+scrollTop>offsetTop   && scrollTop<scrollTop+winH){//判断是否加载图片
		            return true;
		        }else{
		            return false;
		        }
			} 

			function showImg(){
				$('.find-similar-ul').find('img').each(function(){
					var $curImg = $(this);//each()方法的this指向当前正在遍历的函数
					if (isVisible($curImg)){
						$curImg.attr('src',$curImg.attr('data-src'));//把$curImg的data-src的值写入$curImg的src属性中，获取图片的真实地址
					}
				})
			}


//回到顶部
      $(window).on('scroll',function(){
          if($(window).scrollTop()>80){//当滚动条滚动的距离大于80的时候
            $('.BackToTop').show();//回到顶部按钮显示
          }else{
            $('.BackToTop').hide();
          }
      })
      $('.BackToTop').on('click',function(){//点击回到顶部按钮，跳转到页面顶部
          $(window).scrollTop(0);
      })
