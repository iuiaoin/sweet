<template>
  <span class="controller-unit" :class="isCenterOrInverse" @click="handleClick"></span>
</template>

<script>
  export default {
    props: {
      arrange: Object
    },
    computed: {
      isCenterOrInverse() {
        let { isCenter, isInverse } = this.arrange;
        let str = '';
        if (isCenter) str += 'is-center';
        if (isInverse) str += ' is-inverse';
        return str;
      },
    },
    methods: {
      handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.arrange.isCenter) {
          this.$emit('inverse');
        } else {
          this.$emit('center');
        }
      }
    }
  }
</script>

<style lang="scss">
  .controller-unit {
    display: inline-block;
    margin: 0 5px;
    width: 30px;
    height: 30px;

    vertical-align: middle;
    text-align: center;

    cursor: pointer;
    background-color: #aaa;
    border-radius: 50%;
    transform: scale(.5);
    transition: transform .6s ease-in-out, background-color .3s;

    //判断是否居中的选择器
    &.is-center {
      background-color: #888;
      transform: scale(1); //Icon Font字体图片

      &::after {
        color: #fff;
        font-size: 80%;
        font-family: "icons-turn-arrow";
        line-height: 30px;

        content: "\e600";

        //在mac上采用灰阶渲染,使字体更平滑(亮色字体,深色背景,默认亚像素渲染)
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      &.is-inverse {
        background-color: #555;

        transform: rotateY(180deg);

      }
    }
  }
</style>