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

、、、css
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
、、、	  

