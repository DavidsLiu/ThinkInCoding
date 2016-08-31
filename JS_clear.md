####常用的清除浮动的方法

#####本例的HTML结构

```HTML
	<div class="con">
		<div class="left"></div>
		<div class="right"></div>
	</div>
	<div class="next"></div>
```

#####第一种方法给父类一个指定的高度
	
	第一种方法适用于知道子类的高度，比较简单，但是不够灵活.

```css
		.con {
			position: relative;
			width: 1000px;
			margin: 20px auto;
			border: 5px solid rgb(213,213,213);
			height: 500px;
		}
		.left {
			float: left;
			width: 500px;
			height: 500px;
			background-color: red;
		}
		.right {
			float: right;
			width: 500px;
			height: 500px;
			background-color: yellow;
		}
		.next {
			position: relative;
			width: 1000px;
			margin: 0 auto;
			height: 200px;
			background-color: blue;
		}
```

#####第二种方法是最常用的
	
	主要结合伪元素和clear:both解决, 加入到父类元素即可。

```css
		.clearfix {
			zoom: 1;
		}
		.clearfix::after {
			content: '';
			display: block;
			visibility: hidden;
			height: 0;
			clear: both;
		}
```