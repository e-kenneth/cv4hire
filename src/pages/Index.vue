<template>
  <div>
    Test<br>
    {{ jobCategories }}
  </div>
</template>

<script>
export default {
  computed: {
    jobCategories() {
      return this.$store.state.main.jobCategories;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>