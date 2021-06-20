<template>
  <div>
    <div class="column">
      <div class="row col-2">
        <img class="banner-photo" src="~assets/photos/banner-home.jpg"/>
      </div>
      <div class="row col-8">
        <h1>videos section</h1>
      </div>
    </div>
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

.banner-photo{
  
}

</style>