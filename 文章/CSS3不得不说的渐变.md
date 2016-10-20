###CSS3渐变
  这个属性各家浏览器多很傲娇，我查了一下webkit写法、moz写法、W3C写法（ie就算了 比较的奇葩）

####webkit浏览器渐变语法(这个应该比较的老)
```
    ----------------------
      -webkit-gradient
    ----------------------
    background: -webkit-gradient(linear,startpoint,endpoint,color-stop(百分比, color) | form(color) end(color))  

    linear: 线性渐变
    startpoint和endpoint分别为渐变开始和结束点，一般多是采用top、left、bottom、right表示

    后面为颜色的列表:
    color-stop(百分比, color) 可以为逗号间隔的多组数值
    form(color)就是color-stop(0%, color)的简写
    end(color)就是color-stop(100%, color)的简写

    background: -webkit-gradient(radial,内部圆心坐标,内部圆的半径,外部圆心坐标，外部圆半径，color-stop(百分比,color).....);
    radial: 径向渐变

```

####W3C的写法
```
    ---------------------
      linear-gradient
    ---------------------
    linear-gradient(angle, stop-color,stop-color,.....)
    angle可以写度数，也可以写top、bottom、left、right;(angle的方向大家写两个就懂了)
    stop-color: color [length]  


    ----------------------
      radial-gradient
    ----------------------
      
```
