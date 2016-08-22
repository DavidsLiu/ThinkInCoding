###CSS3 常用设置

#####防止移动设备屏幕旋转时改变字体大小

```CSS
	html {
		-webkit-text-size-adjust:none;
	}
```

#####语义化标签figure 和 figcaption

```HTML
	<figure>
		<img src="">
		<figcaption>
			<p>文字描述</p>
		</figcaption>
	</figure>
```

#####letter-spacing(字符间距) 和 word-spacing(单词间距)

```CSS
	/*  letter-spacing解决inline-block的间距 */
	.father {
		letter-spacing: -10px;/* 稍微大一点 兼容各个浏览器 */
	}
	.father a {
		letter-spacing: 0;
	}


	/*  word-spacing解决inline-block的间距 */	
	.father {
		word-spacing: -10px;/* 稍微大一点 兼容各个浏览器 */
	}
	.father a {
		word-spacing: 0;
	}

```

