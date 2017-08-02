// ===================
// let data = [
//     "#口碑推荐# 香辣豆干（大份）",
//     "#口碑推荐# 香辣腐竹",
//     "#口碑推荐# 怪味鸭爪",
//     "#口碑推荐# 美味豆干套餐",
//     "#口碑推荐# 百味魔芋丝",
//     "#口碑推荐# 香辣鱼嘴",
//     "#口碑推荐# 绝味卤干子"
// ]
//
// const b = new Barrage('canvas',data, {});
// b.animate();
// ====================

/**
 * @param { Array } data 数据源
 * @param { Object } options 配置项
 *        { Number } size 文字的大小
 *        { Number } hp 水平内间距
 *        { Number } vp 垂直内间距
 */

function Barrage (id,data,options) {

    if (!(this instanceof Barrage)) {
        return new Barrage(id, data, options);
    }

    //画布的基本信息
    const canvas = document.getElementById(id),
          context = canvas.getContext('2d'),
          w = canvas.width,
          h = canvas.height;
    this.width = w;
    this.height = h;
    this.context = context;

    const size = options.size || 14,
          x = w,
          hp = options.hp || 10,
          vp = options.vp || 5;

    // ====================
    // 划分通道
    // ====================
    const pathHeight = 10 + vp * 2 + size;
    const pathNumber = Math.floor(h / pathHeight);

    //需要展示的数据
    this.data = data.map((item, index) => {
        const temp = {};
        temp.text = item;
        temp.size = size;
        temp.w = this.getTextWidth(size, item);
        temp.x = x;
        temp.hp = hp;
        temp.vp = vp;
        temp.speed = Math.random() * .25 + 1;
        temp.status = 0;
        return temp;
    });

    this.activeArray = []; //显示中的弹幕
    let i = this.data.length,
        j = pathNumber;
    while (j > 0 && i > 0) {
        const temp = this.data.shift();
        temp.y = (j % pathNumber) * pathHeight + 10;
        this.activeArray.push(temp);
        i--;
        j--;
    }

    this.nextBarrage = []; //下一个显示的弹幕
}

// 动画执行
Barrage.prototype.animate = function () {


    this.context.clearRect(0,0,this.width, this.height);


    const next = this.nextBarrage,
          data = this.data,
          activeArray = this.activeArray,
          width = this.width;

    // ===============
    // 拿出下一个弹幕
    // ================
    if (next.length > 0 && data.length > 0) {
        const temp = data.shift();
        temp.y = next.shift();
        temp.x = width + 200;
        activeArray.push(temp);
    }

    activeArray.forEach(item => {
        item.x -= item.speed;
        this.drawLabel(item);
    });

    // ==============
    // 下一个弹幕
    // ==============
    for (let i = 0, max = activeArray.length; i < max; i++) {
        const item = activeArray[i];
        if (item.x + item.w < width && item.status === 0) {
            next.push(item.y);
            item.status = 1;
            break;
        }
    }

    // ================
    // 剔除超出视窗的弹幕
    // ================
    for (let i = 0, max = activeArray.length; i < max; i++) {
        const item = activeArray[i];
        if (item.x + item.w < -10) {
            activeArray.splice(i, 1);
            item.status = 0;
            data.push(item);
            break;
        }
    }


    window.requestAnimationFrame(this.animate.bind(this));
}



// ===================
// 计算文字宽度
// ===================
Barrage.prototype.getTextWidth = function(font, text) {
    const context = this.context;
    context.font = font + "px Arial";
    const textWidth = context.measureText(text).width;
    return textWidth;
}
// =============================
// 绘制标签
// =============================
// @param { String } text 文字内容
// @param { Number } size 字体大小
// @param { String } color 字体颜色
// @param { Number } x 左上角x坐标
// @param { Number } y 左上角y坐标
// @param { Number } vp 垂直的padding值
// @param { Number } hp 水平的padding值
// @param { Number } r 圆角的半径
Barrage.prototype.drawLabel = function(options) {
    let {text, size = 14, color = "rgb(182,67,112)", w, x = 0, y = 0, vp = 0, hp = 0, r = (size + vp * 2) / 2} = options;
    const font = size + "px Arial",
          width = w + hp * 2,
          h = size + vp * 2,
          context = this.context;
    this.drawRoundRect({
        x: x,
        y: y,
        w: width,
        h: h,
        r: r
    });
    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(text, x + width / 2, y + h / 2);
}

// =====================
// canvas 圆角矩形的绘制
// =====================
// @param { Number } x 左上角的x坐标
// @param { Number } y 左上角的y坐标
// @param { Number } w 宽度
// @param { Number } h 高度
// @param { Number } r 圆角半径
// @param { String } bg 背景颜色
Barrage.prototype.drawRoundRect = function(options) {
    let {x,y,w,h,r,bg = "rgb(246,185,206)"} = options;
    const context = this.context;
    context.beginPath();
    context.fillStyle = bg;
    //左上角
    context.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);
    context.lineTo(x + w - r, y);
    //右上角
    context.arc(x + w - r, y + r, r, Math.PI * 3 / 2, 0);
    context.lineTo(x + w, y + h - r);
    //右下角
    context.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    context.lineTo(x + r, y + h);
    //左下角
    context.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
    context.lineTo(x, y + r);

    context.fill();
}


export default Barrage;
