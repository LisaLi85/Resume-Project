
function Tab(ct,trigType) {
    this.ct = ct;
    this.init();
    this.bind(trigType);
}

Tab.prototype.init = function() {
    this.tabLis = this.ct.querySelectorAll('.tab-header>li');           // 选中标题
    this.tabPanels = this.ct.querySelectorAll('.tab-container>li');     // 选中内容
}

Tab.prototype.bind = function(trigType) {
    var _this = this;                           // 先保存this,供以后使用

    function pfunc(para){
        var target = para.target;              // e.target,当前点的li

        var index = [].indexOf.call(_this.tabLis, target);  
        // [].indexOf 是借用数组的方法,tabLis本身只是类数组对象。
        // 在本函数中，this代表被点击的li. 所以用_this.tabLis来表示从 tab-header中找到被点的li 

        _this.tabLis.forEach(function(li) {
            li.classList.remove('active');          // 去掉标题上li的active.
        })
        target.classList.add('active');             // 给被点击的li添加active.     

        _this.tabPanels.forEach(function(panel) {   // 去掉内容上li的active.
            panel.classList.remove('active');
        })
        _this.tabPanels[index].classList.add('active'); // 给被点击的li的内容添加active.          
    }

    if(0==trigType)
    {
        this.tabLis.forEach(function(tabli) {       // 通过 forEach, 将所有的 tab-header>li 都绑定事件。 
            tabli.onclick = function(e) {
                pfunc(e);
            }
        })        
    }
    else if(1==trigType)
    {
        this.tabLis.forEach(function(tabli) {       // 通过 forEach, 将所有的 tab-header>li 都绑定事件。 
            tabli.onmouseover = function(e) {
                pfunc(e);
            }
        })  
    }






}

