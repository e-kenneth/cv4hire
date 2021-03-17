<template>
  <div class="container">
    <div class="column">
      <div>
        <q-img
          class="photo"
          src="~assets/photos/3.jpg"
          fit="cover"
          spinner-color="white"
        />
      </div>
      <div class="jurusan">{{ talent.jurusan }}</div>
      <div class="domisili">{{ talent.domisili }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    talent: Object,
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $accent;
  color: white;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
}
.photo {
  position: relative;
  width: 100%;
  height: 200px;
}
.jurusan{
  text-align: center;
  padding: 20px 0 10px 0;
  font-size: 18px;
}
.domisili{
  text-align: center;
  padding-bottom: 20px;
  font-size: 20px;
}
</style>