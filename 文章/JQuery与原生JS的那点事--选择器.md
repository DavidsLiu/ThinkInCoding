###JQuery与原生JS的那点事--选择器

####为什么jquery这么火
```
    1、在前端群雄割据的年代，各种不兼容。(Jquery2.0以上版本不支持ie6、7、8)
    2、轻量级。你要想想前端的代码多是要通过网络请求下来，虽然有缓存，但是代码越少越节约网络请求的时间。
    3、各种方便的api。
    4、健壮的插件库。

    JQuery的地位，就连比较牛的Angular框架多要内置一个jqlite。我们需要学习JQuery,但是我们要在学习JQuery的同时，理解原生的JS，这才是王道。

    下面的例子多是基于JQuery(v3.1.1)
```

####$()返回的是什么类型
```
    技巧：Object.prototype.toString.call()

    $()始终返回的多是[object Object]
    而对于原生的方法中多个元素返回[object NodeList](NodeList不是数组)
    如果是单个元素则返回[HTMLXXXXElement]
```

####$()的容错功能
```
    比如:$('.some').css('height','200px')如果.some不存在，这句代码并不会报错。
    原生的document.querySelector('.some').style.height="200px",就会报错。

    仔细想想，谁又会傻到查询一个不存在的dom呢，假如你写错了(这是不是一个很牵强的理由)，但是有一种情况是避免不了的，动态的dom.
    所以那时候我们只能这样写：
    var some = document.querySelector('.some');
    if(some) {
        some.style.height = "200px";
    }
    虽然原生麻烦，但是却在警示每个开发人员要以严谨的态度去写代码。
```

####JQ查询方法与原生查询方法的对比
```
    --------------
      JQuery
    --------------  
    $(str) 是不是比较容易记。

    --------------
      原生JS
    --------------  
    document.querySelector() 返回的是单个元素 不兼容ie6、7.
    document.querySelectorAll() 返回的NodeList 不兼容ie6、7.
    document.getElementById() 返回的是单个元素

    (还有其他的我就不介绍了，上面的已经够用了，如果非要纠结ie6、7,那就用JQuery吧)
    这里query两个方法与$(str)几乎没什么差别。但是这里要特别主要应为这些方法多是要对字符串解析的，所以你的字符串越复杂，函数执行的效率越低，所以要注意方法的结合使用与你html代码的合理编写。
    也正是应为如此，jquery也提供很多减轻选择器过于复杂的方法。
    下面我会针对各种选择器列出(JQuery,JS,CSS)三种写法
    (CSS的部分写法，可能兼容性上有点问题)
    (要通过JQuery来复习JS，是多么惭愧的一件事。)
```

####选择器
```
    -------------
      元素选择器
    -------------
    栗子：使li的背景颜色变成红色
    JQ:
    $('li').css('background','red')
    JS: 这里为了省事 就用了map(兼容性有点问题-_-!)
    Array.prototype.map.call(document.querySelectorAll('li'),function(item){
        item.style.background = "red";
    })
    CSS:
    li {
        background-color: red;
    }


    ---------------
      类选择器
    ---------------
    栗子：使类名为some的背景颜色变成红色
    JQ：
    $('.some').css('background','red')
    JS:这里我们默认只有一个some类（换一种写法-_-)
    document.querySelector('.some').style.background="red"
    CSS:
    .some {
        background-color: red;
    }


    ------------
      ID选择器
    ------------
    栗子: 使ID为box的元素的背景颜色改为红色
    JQ:
    $('#box').css('background','red')
    JS:
    document.getElementById('box').style.background="red"
    CSS:
    #box {
        background-color: red;
    }
    这里有个细节，JQ和JS对于ID的查询默认是唯一的，但是我在页面中声明两个一样的ID并不会报错，而在CSS中设置ID的样式，并不会考虑到唯一性。
    所以这里开发者应该多要遵循ID唯一的原则，避免造成不必要的错误。


    ---------------
      群组选择器
    ---------------
    栗子: 使ul和div的背景颜色变成红色
    JQ:
    $('ul,div').css('background','red')
    JS: (上面提到map的兼容性，所以我还是扩展NodeList的原型方法吧^-^。)
    NodeList.prototype.map = function(callback){
        for(var i = 0; i < this.length; i++) {
            //改变this指向
            callback.call(this[i]);
        }
    }
    document.querySelectorAll('li,div').map(function(){
        this.style.background = "red";
    });
    CSS:
    ul,div {
        background-color: red;
    }


    ----------------
      后代选择器
    ----------------
    栗子: 使ul下面所有的li的背景颜色变成红色(这里要与继承区别开)
    JQ:
    $('ul li').css('background','red');

    通过上面几个例子，JS和CSS的写法我就不写了。


    -------------
      儿子选择器
    -------------
    栗子: 使ID为box的ul下的li的背景颜色变成红色,而li里面嵌套的ul的li不受影响(排除继承)
    JQ:
    $('#box>li').css('background','red')
    提供了children([selector])的方法,最好的写法
    $("#box").children().css('background','red');

    这里要特别注意，JS是不提供链式调用的，千万别这样写：
    document.getElementById('box').querySelectorAll('li')这是错的。


    -------------------
      A + B
    -------------------
    栗子: 找出与A同级的后一位为B的元素的背景颜色变成红色
    JQ:
    $('.p1 + div').css('background','red');
    提供了next(selector)的方法,最好的写法
    $('.p1').next('div').css('background','red');

    ----------------
      A ~ B
    ----------------
    栗子: 找出与A同级的后面所有的B元素的背景颜色变成红色
    JQ:
    $('.p1 ~ p').css('background','red');
    同样有nextAll(selector)
    $('.p1').nextAll('p').css('background','red');


    -----------------
      .a.b
    -----------------
    同时满足拥有.a.b类名的
    JQ:
    $('.p1.dai').css('background','red');


    举了这几个例子，套路大家应该多懂了吧，还有很多选择器，大家去看看文档吧，毕竟文档才是王道。
    再唠叨几句属性选择器：
    = 等于
    != 不等于
    ^= 以什么开头
    $= 以什么结尾
    ~= 以空格间隔的值列表
    *= 含有子串

    还有一些特别容易出错的地方
    :even是从0开始的 :nth-child()是从1开始的
    :parent含有子元素的元素 :empty没有子元素(文本节点也算)
    但是parent()确是找到父元素。。
    end()返回到上一个状态
```

####这几个JQuery特有的方法还是挺重要的感觉
```
    ------------------
      prev与prevAll
    ------------------
    这个找一个节点的同级节点的前面的一个节点或者是所有节点
    JQ:
    $('.p1').prev('p').css('background','red');
    $('.p1').prevAll('p').css('background','red');
    

    -------------
      siblings
    -------------
    查找兄弟节点
    $('.p1').siblings('p').css('background','red');


    ---------------------------
      nextUntil与prevUntil
    ---------------------------
    nextUntil(selector): 往一个节点的同级节点的前面查找，直到selector停止。
    prevUntil(selector):
```
