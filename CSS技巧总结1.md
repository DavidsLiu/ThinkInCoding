####CSS技巧

#####1、关于Reset.css vs Normalize.css
    1. Normaliza.css保护了有价值的默认值。
    2. Normalize.css修复了浏览器的bug。
    3. Normalize.css不会让你的调试工具变得很乱。
    4. Normalize.css是模块化的。
    5. Normalize.css有详细的文档。
    关于这两者区别的文章: http://jerryzou.com/posts/aboutNormalizeCss/

#####2、text-transform修饰英文
```css
    text-transform: uppercase;
    text-transform: lowercase;
    text-transform: capitalize;
```

#####3、font-variant字母变得小一号
```css
    font-variant: small-caps;
```

#####4、去掉链接外部的虚线
```css
    outline: none;
```

#####5、取消class和id前面的元素限定

#####6、background的url中可以不加引号

#####7、块级元素
    1. 块级元素总是会另起一行。
    2. 没有设置宽度，则为父级元素的宽度。
    3. 含有的属性基本多可以修改。
    4. div, p, h1, form, ul, li

#####8、行内元素
    1. 行内元素从相同的行开始，大小由内容撑开。
    2. 只能修改水平方向上的margin, padding。
    3. 不能修改宽、高。
    4. span, a, label, input, img, strong, em

#####9、防止移动设备屏幕旋转时改变字体大小
```CSS
	html {
		-webkit-text-size-adjust:none;
	}
```

#####10、语义化标签figure 和 figcaption
```HTML
	<figure>
		<img src="">
		<figcaption>
			<p>文字描述</p>
		</figcaption>
	</figure>
```

#####11、letter-spacing(字符间距) 和 word-spacing(单词间距)
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

#####12、
