<template>
  <figure class="img-figure" :class="isInverse" :style="styleObj" @click="handleClick">
    <div class="img" :style="{backgroundImage: `url(${data.imgURL})`}"></div>
    <figcaption>
      <h2 class="img-title">{{ data.title }}</h2>
        <div class="img-back" @click="handleClick">
          <p>{{ data.desc }}</p>
        </div>
    </figcaption>
  </figure>
</template>

<script>
  import mixin from '../mixins/index';
  export default {
    mixins: [ mixin ],
    props: {
      arrange: Object,
      data: Object
    },
    computed: {
      isInverse() {
        return this.arrange.isInverse ? 'is-inverse' : '';
      },
      styleObj() {
        let { pos, rotate, isCenter } = this.arrange;
        let obj = {};
        if (pos) {
          let { top, left } = pos;
          obj.top = top + 'px';
          obj.left = left + 'px';
        }
        if (rotate) {
          ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'].forEach(value => {
            obj[value] = 'rotate(' + rotate + 'deg)';
          });
        }
        if(isCenter) obj.zIndex = 11;
        return obj;
      }
    }
  }
</script>

<style lang="scss">
  .img-figure {
    position: absolute;
    width: 320px;
    height: 360px;
    margin: 0;
    padding: 40px;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    transform-style: preserve-3d;
    transform-origin: 0 50% 0;

    //transition 定义在两种状态间切换时的过渡动画
    transition: transform .6s ease-in-out, left .6s ease-in-out, top .6s ease-in-out;

    &.is-inverse {
      transform: translate(320px) rotateY(180deg);
    }

    .img {
      width: 240px;
      height: 240px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }

  figcaption {
    text-align: center;

    .img-title {
      margin: 20px 0 0 0;
      color: #a7a0a2;
      font-size: 16px;
    }

    .img-back {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      padding: 50px 40px;
      overflow: auto;

      color: #a7a0a2;
      font-size: 22px;
      line-height: 1.25;
      text-align: left;

      background-color: #fff;

      box-sizing: border-box;
      transform: rotateY(180deg) translateZ(1px);
      backface-visibility: hidden;

      p {
        margin: 0;
      }

    }
  }
</style>