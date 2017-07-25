// =======================
// 支付宝人气值动画
// =======================
<template lang="jade">
    div(class="zfb-item" ref="zfbitem")
        div(class="popular-item", :class="active ? 'popular-item-active' : ''")
            span.title    此刻人气
            div.item
                span.number {{ten < 0 ? '' : ten}}
                span.number {{bit < 0 ? '' : bit}}
</template>

<script>
    export default {
        props: {
            rate: Number
        },
        data () {
            return {
                LOCK: false,
                active: false,
                bit: -1,
                bounceLock: false,
                ten: -1,
                bitTimeId: null,
                tenTimeId: null
            }
        },
        computed: {
             numberArray () {
                return (this.rate + '').split('');
            }
        },
        watch: {
            active (newValue) {
                if (newValue) {
                    this.$refs.zfbitem.addEventListener('transitionend', this.transitionAction, false);
                }
            }
        },
        mounted () {
            this.onScroll();
            document.addEventListener('scroll', this.onScroll , false);
        },
        methods: {
            transitionAction (e) {
                this.$refs.zfbitem.removeEventListener('transitionend', this.transitionAction, false);
                this.numberBounce();
            },
            /**
             * 数字跳动动画
             */
            numberBounce () {
                let arr = this.numberArray,
                    totalTime = 200,
                    a = arr[1],
                    aLen = Number.parseInt(a),
                    aTime = Math.floor(totalTime / (aLen + 9)),
                    i = 0,
                    b = arr[0],
                    bLen = Number.parseInt(b),
                    bTime = Math.floor(totalTime / (bLen + 9)),
                    j = 0;
                this.bit = 0;
                this.ten = 0;
                this.bitTimeId = setInterval(_ => {
                    i++;
                    this.bit = i % 10;
                    if (i - 10 === aLen) {
                        clearInterval(this.bitTimeId);
                        this.bitTimeId = null;
                    }
                }, aTime);

                this.tenTimeId = setInterval(_ => {
                    j++;
                    this.ten = j % 10;
                    if (j - 10 === bLen) {
                        clearInterval(this.tenTimeId);
                        this.tenTimeId = null;
                    }
                }, bTime);
            },
            isElementInViewport (el, offset) {
                const h = offset || 20,
                      box = el.getBoundingClientRect(),
                      top = (box.top >= 0),
                      left = (box.left >= 0),
                      bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + h),
                      right = (box.right <= (window.innerWidth || document.documentElement.clientWidth) + h);
                return (top && left && bottom && right);
            },
            onScroll (e) {
                if (!this.LOCK) {
                    this.LOCK = true;
                    window.requestAnimationFrame(this.scrollAction);
                }
            },
            scrollAction () {
                const flag = this.isElementInViewport(this.$refs.zfbitem, 100);
                if (!flag) {
                    this.LOCK = false;
                } else {
                    this.active = true;
                    document.removeEventListener('scroll', this.onScroll , false);
                }

            }
        },
        beforeDestroy () {
            document.removeEventListener('scroll', this.onScroll , false);
            this.$refs.zfbitem.removeEventListener('transitionend', this.transitionAction, false);
            if (this.bitTimeId) {
                clearInterval(this.bitTimeId);
                this.bitTimeId = null;
            }
            if (this.tenTimeId) {
                clearInterval(this.tenTimeId);
                this.tenTimeId = null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    //不要写这样的代码，我这里偷懒了。。。。
    * {
        box-sizing: border-box;
    }
    .zfb-item {
        position: relative;
        width: 400px;
        height: 200px;
        margin: 0 auto;
        border: 4px solid rgb(31,34,38);
        background: #fff;

        & + .zfb-item {
            margin-top: 20px;
        }

        .popular-item {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 80px;
            height: 0;
            background: rgba(0,0,0,.5);
            transition: height .5s ease-in-out;
            overflow: hidden;
            padding: 0 10px;
        }
        .popular-item-active {
            height: 100px;
        }
        .title {
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            line-height: 40px;
        }
        .item {
            border-top: 2px solid #fff;
            .number {
                font-size: 45px;
                color: #fff;
                &:nth-child(1) {
                    margin-right: 5px;
                }
            }
        }
    }
</style>
