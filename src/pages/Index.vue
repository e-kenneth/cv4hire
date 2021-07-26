<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-7">
        <q-img
          src="https://i.imgur.com/N0j9GHV.png"
          spinner-color="primary"
          spinner-size="82px"
          height="800px"
        />
      </div>
      <div class="col-12 col-lg-5 text">
        <div class="row logo">
          <q-img
            src="https://i.imgur.com/Tk0Thv2.png"
            spinner-color="primary"
            spinner-size="82px"
            width="300px"
          />
        </div>
        <div class="row heading q-mt-lg q-mb-lg">
          Display your personality,
          <br />
          Demonstrate your prowess.
        </div>
        <div class="row q-gutter-lg q-py-lg">
          <q-btn color="secondary" label="Saya sedang mencari pekerjaan" />
          <q-btn color="primary" label="Kami sedang mencari professional" />
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg">
        <h1 class="text-white">F.A.Q</h1>
      </q-parallax>
    </div> -->
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
.heading {
  font-size: 40px;
}

.text{
  padding-left: 100px;
}

.logo {
  margin: 60px 0 60px 0;
  
}
</style>
