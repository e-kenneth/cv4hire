<template>
  <div class="container q-ma-sm">
    <router-link tag="div" class="column" :to="'/profile/' + professional.username">
      <div>
        <q-img
          class="photo"
          :src="photoURL"
          fit="cover"
          spinner-color="white"
        />
      </div>
      <div class="title">{{ professional.username }}</div>
      <div class="q-px-md q-py-sm">
        <div class="subtitle">{{ jobs }}</div>
      </div>
      <div class="subtitle2">{{ cities }}</div>
    </router-link>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
export default {
  props: {
    professional: Object,
  },
  computed: {
    cities() {
      let stringCities = "";
      const cities = this.professional.city_id;
      cities.forEach((city) => {
        this.$store.state.main.options.cities.forEach((cityState) => {
          if (city == cityState.value) {
            stringCities += cityState.label + ", ";
          }
        });
      });
      stringCities = stringCities.slice(0, -2);
      return stringCities;
    },
    jobs() {
      let stringJobs = "";
      const jobs = this.professional.job_id;
      jobs.forEach((job) => {
        this.$store.state.main.options.jobs.forEach((jobState) => {
          if (job == jobState.value) {
            stringJobs += jobState.label + ", ";
          }
        });
      });
      stringJobs = stringJobs.slice(0, -2);
      return stringJobs;
    },
  },
  data() {
    return {
      photoURL: "https://i.imgur.com/EbU4ix7.png",
    };
  },
  methods: {
    getPhotoURL() {
      firebase
        .storage()
        .ref(`professionals/${this.professional.id}/photo`)
        .getDownloadURL()
        .then((url) => {
          this.photoURL = url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPhotoURL();
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
a {
  text-decoration: none !important;
}
@mixin text {
  // color: white;
  text-align: center;
}
.title {
  @include text;
  color: $secondary;
  padding:5px 0 0px 0;
  font-size: 30px;
}
.subtitle {
  @include text;
  color: rgb(77, 77, 77);
  background-color: rgb(211, 211, 211);
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
}
.subtitle2 {
  @include text;
  color: rgb(206, 206, 206);
  padding: 0 15px 5px 15px;
  font-size: 15px;
}
</style>
