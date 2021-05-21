<template>
  <div>
    {{ jobCategories }}
  </div>
</template>

<script>
export default {
  computed: {
    jobCategories() {
      return this.$store.state.main.options.jobs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>