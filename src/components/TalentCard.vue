<template>
  <div class="container q-ma-sm">
    <router-link tag="div" class="column" :to="'/profile/' + talent.id">
      <div>
        <q-img
          class="photo"
          src="http://localhost/sribucv/uploads/profile/2.jpg"
          fit="cover"
          spinner-color="white"
        />
      </div>
      <div class="jurusan">{{ jurusan }}</div>
      <div class="domisili">{{ domisili }}</div>
    </router-link>
  </div>
</template>

<script>
// src="~assets/photos/3.jpg"
import { changeToSentenceCase } from "src/components/Utilites";
export default {
  props: {
    talent: Object,
  },
  computed: {
    jurusan() {
      return changeToSentenceCase(this.talent.jurusan);
    },
    domisili() {
      return changeToSentenceCase(this.talent.domisili);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary;
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
a{
  text-decoration: none !important;
}
@mixin text {
  color: white;
  text-align: center;
}
.jurusan {
  @include text;
  padding: 20px 0 10px 0;
  font-size: 18px;
}
.domisili {
  @include text;
  color: $secondary;
  padding-bottom: 20px;
  font-size: 20px;
}
</style>