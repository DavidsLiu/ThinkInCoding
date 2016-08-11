### 纯css实现九宫格

-----------------------------------

  其实实现九宫格的主要难点在于：
  * 边框的处理方式
  * 悬浮单元格重新展现边框的效果

#### 第一步让边框重叠
  我们可以知道九宫格的每一条边框的粗细多是一样的，这里大家要先了解box-sizing中的两种盒子模型，border-box和content-box:
  * border-box:  width = border + padding + contentWidth
  * content-box: width = contentWidth

  那么第一种方式就是通过content-box + border-direction 来实现：

```css
	  .b-r {
	  	border-right: 1px solid rgb(232,232,232);
	  }
	  .b-b {
		border-bottom: 1px solid rgb(232,232,232);
	  }
	  ul > li {
	    list-style: none;
	    width: 200px;
	    height: 200px;
	    border-top: 1px  solid rgb(232,232,232);
	    border-left: 1px  solid rgb(232,232,232);
	    float: left;
	  }
```	    
  虽然以上方法能实现九宫格的样式，但并不是那么灵活，如果格子的数量是动态的话，你在添加边框上还得下点功夫，这是第一个缺点。产品经理总是有奇思妙想。现在他提出了鼠标悬浮在每个格子上边框变为2px,并且颜色的样式也要变化。显然这种方式想做到这样的效果就有点难度了。

  那么第二种方式就是 border-box + margin 来实现:

```
		ul > li {
			list-style: none;
			padding: 0;
			margin: 0;
			float: left;
			width: 200px;
			height: 200px;
			border: 1px solid rgb(232,232,232);
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			margin-top: -1px;
			margin-left: -1px;
		}
```

  显然这种方式更加方便，再也不用担心是九宫格还是100宫格了。啊哈哈。然后我们要解决的就是鼠标悬浮的效果了
  高高兴兴的加了个hover,哎呀，怎么border的颜色显示的不全？别忘了，我们之前做了margin操作，部分的border被遮盖了。
  这下我们得用到 z-index 这个属性：

```
		ul > li:hover {
			position: relative;
			border: 2px solid rgb(213,213,213);
			z-index: 20;
		}
```  
  
  乍一看，效果棒棒的，然后要在格子里添加内容了。我了个去，怎么点击格子时，抽搐了一样。仔细想想，我们在点击的时候改变了border的宽度，页面布局发生了变化，这也就是抽搐的原因。所以解决方案就是没有hover之前，设置li的div的border为1px透明，当hover的时候在添加颜色，这样1+1就是2个px了。哈哈。。。(别忘了 div的盒子模型！)

  ```
  		ul > li:hover {
			position: relative;
			border: 1px solid rgb(213,213,213);
			z-index: 20;
		}
		ul > li:hover .test {
			border: 1px solid rgb(213,213,213);
		}
		.test {
			position: relative;
			width: 100%;
			height: 100%;
			border:1px solid transparent;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			padding: 10px;
		}
  ```
	
