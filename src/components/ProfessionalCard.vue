<template>
  <div class="container q-ma-sm">
    <router-link
      tag="div"
      class="column"
      :to="'/profile/' + professional.username"
    >
      <div>
        <q-img
          class="photo"
          :src="photoURL"
          fit="cover"
          spinner-color="white"
        />
      </div>
      <div class="titleExplanationContainer">
        <div class="titleExplanation">
          KODE PENGGUNA
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
            class="bg-white text-secondary"
          >
            Kode professional yang berfungsi sebagai identitas di CVForHire sebagai pengganti nama 
          </q-tooltip>
        </div>
      </div>
      <div class="titleContainer q-px-md">
        <div class="title">{{ professional.username }}</div>
      </div>
      <div class="titleExplanationContainer2">
        <div class="titleExplanation2">SPESIALISASI</div>
      </div>
      <div class="q-px-md">
        <div class="subtitle">{{ jobs }}</div>
      </div>
      <div class="titleExplanationContainer2">
        <div class="titleExplanation2">BERSEDIA DITEMPATKAN DI</div>
      </div>
      <div class="q-px-md">
        <div class="subtitle2">{{ cities }}</div>
      </div>
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
            stringCities += cityState.label + " | ";
          }
        });
      });
      stringCities = stringCities.slice(0, -3);
      return stringCities;
    },
    jobs() {
      let stringJobs = "";
      const jobs = this.professional.job_id;
      jobs.forEach((job) => {
        this.$store.state.main.options.jobs.forEach((jobState) => {
          if (job == jobState.value) {
            stringJobs += jobState.label + " | ";
          }
        });
      });
      stringJobs = stringJobs.slice(0, -3);
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
.titleExplanationContainer {
  text-align: center;
}
.titleExplanation {
  text-align: center;
  color: white;
  background-color: $secondary;
  margin-top: 10px;
  margin-bottom: -10px;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
  display: inline-block;
}
.titleContainer {
  text-align: center;
}
.title {
  text-align: center;
  color: $secondary;
  background-color: white;
  padding: 5px;
  font-size: 30px;
  // display: inline-block;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
}
.subtitle {
  text-align: center;
  color: $secondary;
  background-color: rgb(255, 255, 255);
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
}
.subtitle2 {
  text-align: center;
  color: $secondary;
  background-color: white;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
}
.titleExplanationContainer2 {
  text-align: center;
}
.titleExplanation2 {
  text-align: center;
  color: white;
  background-color: $secondary;
  margin-top: 10px;
  margin-bottom: -10px;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
  display: inline-block;
}
</style>
