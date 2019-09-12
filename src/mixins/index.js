export default {
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