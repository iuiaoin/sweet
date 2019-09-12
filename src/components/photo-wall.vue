<template>
  <section class="stage" ref="stage">
    <section class="img-sec" :class="perspective">
      <img-figure v-for="(item, index) in imgData" :key="`imgFigure${index}`" ref="imgFigure" :data="item" :arrange="imgsArrangeArr[index]" @inverse="inverse(index)" @center="center(index)" />
    </section>
    <nav class="controller-nav">
      <controller-unit v-for="(item, index) in imgData" :arrange="imgsArrangeArr[index]" :key="`unit_${index}`" @inverse="inverse(index)" @center="center(index)" />
    </nav>
  </section>
</template>

<script>
  import { data } from '../constants/data';
  import imgFigure from './img-figure.vue';
  import controllerUnit from './controller-unit.vue';
  import { getRangeRandom, get30DegRandom, isPC } from '../util';
  export default {
    data() {
      return {
        constant: {
          centerPos: {
            left: 0,
            right: 0
          },
          hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
          },
          vPosRange: {
            x: [0, 0],
            topY: [0, 0]
          }
        },
        imgsArrangeArr: [],
        imgFigures: [],
        controllerUnits: [],
        imgData: data.map(img => {
          img.imgURL = require('../../public/assets/imgs/' + img.fileName);
          return img;
        }),
        perspective: ''
      }
    },
    components: {
      imgFigure,
      controllerUnit
    },
    created() {
      this.initPos();
      this.perspective = isPC() ? 'perspective' : '';
    },
    mounted() {
      this.initRange();
    },
    methods: {
      initRange() {
        let stage = this.$refs.stage,
          stageW = stage.scrollWidth,
          stageH = stage.scrollHeight,
          halfStageW = Math.ceil(stageW / 2),
          halfStageH = Math.ceil(stageH / 2);

        let imgFigure = this.$refs.imgFigure[0].$el,
          imgW = imgFigure.scrollWidth,
          imgH = imgFigure.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);

        this.constant.centerPos = {
          left: halfStageW - halfImgW,
          top: halfStageH - halfImgH
        }

        this.constant.hPosRange.leftSecX[0] = -halfImgW;
        this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.constant.hPosRange.y[0] = -halfImgH;
        this.constant.hPosRange.y[1] = stageH - halfImgH;

        this.rearrange(0);
      },
      initPos() {
        let { imgData } = this;
        this.imgsArrangeArr = imgData.map(() => ({
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0, //初始化旋转角度
          isInverse: false, //是否翻转
          isCenter: false //是否居中
        }))
      },
      rearrange(centerIndex) {
        let imgsArrangeArr = this.imgsArrangeArr,
          constant = this.constant,
          centerPos = constant.centerPos,
          hPosRange = constant.hPosRange,
          vPosRange = constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,

          imgsArrangeTopArr = [],

          //取一个或者不取
          topImgNum = Math.floor(Math.random() * 2),
          topImgSpliceIndex = 0,

          imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        //首先居中centerIndex的图片,居中的centerIndex的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true,
          isInverse: false
        }


        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length -
          topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach((value, index) => {
          imgsArrangeTopArr[index] = {
            pos: {
              top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false,
            isInverse: false
          };
        });

        //布局左右两侧的图片
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
          let hPosRangeLORX = null;

          // 前半部分布局左边, 右半部分布局右边
          if (i < k) {
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos: {
              top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false,
            isInverse: false
          };
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.imgsArrangeArr = imgsArrangeArr;
      },
      center(index) {
        this.rearrange(index);
      },
      inverse(index) {
        let { imgsArrangeArr } = this;
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        this.imgsArrangeArr = imgsArrangeArr;
      }
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: "icons-turn-arrow";
    src: url("../../public/assets/icons/turn-arrow.eot");
    /* IE9 */
    src: url("../../public/assets/icons/turn-arrow.eot") format("embedded-opentype"),
      /* IE6-IE8 */
      url("../../public/assets/icons/turn-arrow.woff") format("woff"),
      /* chrome, firefox */
      url("../../public/assets/icons/turn-arrow.ttf") format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../public/assets/icons/turn-arrow.svg") format("svg");
    /* iOS 4.1- */
  }

  /* Base Application Styles */
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    background-color: #222;
  }

  .content {
    width: 100%;
    height: 100%;
  }

  /* stage -- start */
  .stage {
    position: relative;

    width: 100%;
    height: 100%;
  }

  /* stage -- end */

  /* image -- start */
  .img-sec {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ddd;
  }

  //景深
  .perspective {
    perspective: 1800px;
    -webkit-perspective: 1800px;
  }

  /* image -- end */


  /* controller -- start */
  .controller-nav {
    position: absolute;
    left: 0;
    bottom: 30px;
    z-index: 101;
    width: 100%;
    text-align: center;
  }

  /* controller -- end */
</style>