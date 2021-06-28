<template>
  <div>
    <div class="column">
      <div class="row col-2">
        <img class="banner-photo" src="https://i.imgur.com/95cKuax.jpg"/>
        <!-- <q-img
          src="~assets/photos/banner-home.jpg"
          :ratio="16/9"
          spinner-color="primary"
          spinner-size="82px"
        /> -->
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
  height: 600px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

</style>