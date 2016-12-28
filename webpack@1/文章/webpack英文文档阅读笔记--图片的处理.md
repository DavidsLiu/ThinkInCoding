###图片的使用方式
  在web中引用图片的三种方式：
  * 直接在css中设置background-image
  * 在js中设置backgroundImage
  * img标签中通过src引用

###实践
  * 针对于前面两种情况，我们可以使用url-loader
  * 针对于第三种情况，我们可以使用html-withimg-loader

  ```css
    .small {
      width: 64px;
      height: 64px;
      background: url(../images/close.png);
      background-size: cover;
    }
  ```
  ```js
    //这里一定要写require()得到路径。不让图片不会被打包
    img.style.backgroundImage = 'url('+ require('../images/bg.png') +')';
  ```
  ```html
    <img src="images/logo.png" width="126px" alt="">
  ```

  webpack.config.js配置写法：（这里只给出loaders里面的配置）
  ```js
    {
      //处理在css设置background-image和在js中设置backgroundImage的情况
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      /**
       * 这里可以设置两个参数
       * （1）limit设置图片base64处理的大小，比如这里是图片小于8KB时，做base64,有效的减少一次请求
       * （2）name设置图片的路径
       */
    },
    {
      //处理img标签中通过src引用图片你的情况
      test: /\.(htm|html)$/,
      loader: 'html-withimg-loader'
    },
  ```
    
