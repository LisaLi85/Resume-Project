$('.btnclose').on('click',function(){
    		$('.x22dsk').hide();
})



// 大轮播
      var $view = $('.view')
      var $img = $('.view').find('li');
      var imgCount = $img.length;//原始图片个数
      var imgWidth = $img.width();//单张图片宽度
      var curIdx = 0;
      var locked = false;
      var setTime;

      $view.prepend($img.last().clone());
      $view.append($img.first().clone());
      //设置照片容器的初始位置和宽度
      $view.css({
        'width':(imgCount+2)*imgWidth,//头尾都另外克隆了一个元素，所以要+2
        'left':0-imgWidth
      })
      rollStart();      
         
      function rollStart(){
       // playNext(1)
       setTime = setInterval(function(){
              playNext(1)
       },6000);//每3秒钟执行一次playNext()
      }

      function playNext(idx){//参数表示每次播放图片的数量
        var tmpIdx;//定义一个变量，记录下一张图片的索引
        tmpIdx =(curIdx+idx)%imgCount;   
        $('.btn').find('li').eq(tmpIdx).addClass('active').siblings().removeClass('active'); 
        $view.animate({left:'-='+ imgWidth*idx},function(){
           if(tmpIdx ==0){            
              $view.css('left',0-imgWidth);
           }
            curIdx = tmpIdx; //存储当前的值，供下次使用  
            locked=false;           
        });

      }

      function playPre(idx){
        var tmpIdx;
       tmpIdx=(curIdx-idx+imgCount)%imgCount  // +imgCount 是处理curIdx为负1的情况.
       $('.btn').find('li').eq(tmpIdx).addClass('active').siblings().removeClass('active');
        $view.animate({left:'+='+ (imgWidth*idx)},function(){           
           if(tmpIdx ==imgCount-1){
              $view.css('left',0-imgWidth*imgCount);
           } 
            curIdx = tmpIdx; //存储当前的值，供下次使用 
            locked=false;           
        });                        
      }

      $('.right').on('click',function(){
        if(locked){
              return;
        }
        locked = true;
        clearInterval(setTime);
        playNext(1);

        rollStart();
      });

      $('.left').on('click',function(){
        if(locked){
              return;
        }
        locked = true;
        clearInterval(setTime);
        playPre(1);

        rollStart();
      });

      $('.btn').find('li').on('click',function(){
       var index = $(this).index();//获取当前点击的图片
       if(locked){
              return;
       }

       clearInterval(setTime);            
       locked = true;



       if(index>curIdx){
              playNext(index-curIdx);
       }
       if(index<curIdx){
              playPre(curIdx-index);
       }


       rollStart();
      })



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
