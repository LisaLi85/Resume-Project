
/*
Tab选项卡组件

    参数说明
        container: Tab，
        triggerType: 'click','mouseover'
        activeStyle: active时的样式名称
        chooseTabHead: 选择TabHead的字符串
        chooseTabContent: 选择TabContent的字符串 

    兼容性
        IE8及以上。
        Firefox 3.5及以上。
        Chrome4及以上。
        Safari 3.1及以上。
*/

function Tab(container,triggerType,activeStyle,chooseTabHead,chooseTabContent) {
    this.container = container;
    this.init(chooseTabHead,chooseTabContent);
    this.bindevent(triggerType,activeStyle);
}

Tab.prototype.init = function(chooseTabHead,chooseTabContent) {
    this.tabHead = this.container.querySelectorAll(chooseTabHead);           // 选中标题
    this.tabContent = this.container.querySelectorAll(chooseTabContent);     // 选中内容
}



Tab.prototype.bindevent = function(triggerType,activeStyle) {
    var _this = this;                                       // 先保存this,供以后使用
    var _activeStyle = activeStyle;                         // 避免多次传参数，在此保存

    function eventProcess(tabHead){    
        var target = tabHead.target;                        // tabHead.target,当前点的li

        var index = [].indexOf.call(_this.tabHead, target);  
        // [].indexOf 是借用数组的方法,tabHead本身只是类数组对象。
        // 在本函数中，this代表被点击的li. 所以用_this.tabHead来表示从 tab-header中找到被点的li 

        _this.tabHead.forEach(function(headItem) {
            headItem.classList.remove(_activeStyle);        // 去掉标题上li的active.
        })
        target.classList.add(_activeStyle);                 // 给被点击的li添加active.     

        _this.tabContent.forEach(function(panel) {          // 去掉内容上li的active.
            panel.classList.remove(_activeStyle);
        })
        _this.tabContent[index].classList.add(_activeStyle); // 给被点击的li的内容添加active.          
    }

    if('click'==triggerType)                         // 点击时响应事件
    {
        this.tabHead.forEach(function(tabli) {       // 通过 forEach, 将所有的 tab-header>li 都绑定事件。 
            tabli.addEventListener('click',function(){eventProcess(arguments[0])}, false);
        })        
    }
    else if('mouseover'==triggerType)               //  鼠标放上去后响应事件.
    {
        this.tabHead.forEach(function(tabli) {       // 通过 forEach, 将所有的 tab-header>li 都绑定事件。 
            tabli.addEventListener('mouseover',function(){eventProcess(arguments[0])}, false);
        })  
    }

}

