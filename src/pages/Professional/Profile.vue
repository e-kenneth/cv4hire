<template>
  <div class="row">
    <div class="col-12 col-lg-6">
      <div class="videoContainer row" v-if="finishedLoadingVideo">
        <video :height="videoHeight" class="video col" controls>
          <source :src="videoURL" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div v-else>
        <div class="spinner">
          <q-spinner-tail color="secondary" size="10em" />
          <!-- <q-tooltip :offset="[0, 8]">Loading video</q-tooltip> -->
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div v-if="currentProfessional != null">
        <!-- {{ currentProfessional }} -->
        <div class="row section1">
          <div class="col-6 col-lg-3" style="text-align: right">
            <q-img
              class="photo"
              :src="photoURL"
              :ratio="1"
              spinner-color="secondary"
              spinner-size="82px"
            />
          </div>
          <div class="col-6 col-lg-9">
            <div class="username">{{ currentProfessional.username }}</div>
            <div class="profile">{{ jobs }}</div>
            <div class="profile">{{ cities }}</div>
          </div>
        </div>
        <div class="row section2">
          <div class="col">
            <custom-profile-button
              icon="share"
              label="Bagikan"
              :number="27"
            ></custom-profile-button>
            <!-- <q-btn color="secondary" icon="share" label="Bagikan (10)" /> -->
          </div>
          <div class="col">
            <custom-profile-button
              icon="bookmark_add"
              label="Simpan"
              :number="57"
            ></custom-profile-button>
            <!-- <q-btn color="secondary" icon="bookmark_add" label="Simpan (15)" /> -->
          </div>
          <div class="col">
            <custom-profile-button
              icon="monetization_on"
              label="Kontak"
              :number="3"
              @click="showPaymentPopup"
            ></custom-profile-button>
            <!-- <q-btn
              color="secondary"
              icon="monetization_on"
              label="Kontak (5)"
            /> -->
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
        </div>
      </div>
      <div v-else>Professional tidak ditemukan</div>
    </div>
    <q-dialog v-model="paymentPopup">
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            >Melakukan kontak dengan {{ currentProfessional.username }} akan
            mengurangi koin anda sejumlah 10. Lanjutkan proses?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batalkan" color="text-secondary" v-close-popup />
          <q-btn
            :label="`Kontak ${currentProfessional.username}`"
            color="secondary"
            @click="purchaseUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import CustomProfileButton from "components/CustomProfileButton.vue";

export default {
  components: {
    CustomProfileButton,
  },
  data() {
    return {
      finishedLoadingVideo: false,
      finishedLoadingPhoto: false,
      videoURL: "",
      photoURL: "",
      videoHeight: 0,
      currentProfessional: null,
      paymentPopup: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.main.user;
    },
    cities() {
      if (this.currentProfessional == null) return "Loading...";
      let stringCities = "";
      const cities = this.currentProfessional.city_id;
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
      if (this.currentProfessional == null) return "Loading...";
      let stringJobs = "";
      const jobs = this.currentProfessional.job_id;
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
  mounted() {
    window.addEventListener("resize", this.resizeVideo);
    this.initialLoad();
  },
  watch: {
    "$route.params.id"(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.initialLoad();
    },
  },
  methods: {
    initialLoad() {
      firebase
        .firestore()
        .collection("professionals")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (
              doc.get("username") ==
              this.$route.params.id.toString().toUpperCase()
            ) {
              const dataProfessional = {
                username: doc.get("username"),
                birthdate: doc.get("birthday"),
                job_id: doc.get("job_id"),
                city_id: doc.get("city_id"),
                religion_id: doc.get("religion_d"),
                gender_id: doc.get("gender_id"),
              };
              this.currentProfessional = dataProfessional;
              this.getVideoURL(doc.id);
              this.getPhotoURL(doc.id);
              this.resizeVideo();
            }
          });
        });
    },
    getVideoURL(id) {
      console.log("Start loading video");
      firebase
        .storage()
        .ref(`professionals/${id}/video`)
        .getDownloadURL()
        .then((url) => {
          this.videoURL = url;
          this.finishedLoadingVideo = true;
          console.log(`Finished loading video: ${url}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPhotoURL(id) {
      console.log("Start loading photo");
      firebase
        .storage()
        .ref(`professionals/${id}/photo`)
        .getDownloadURL()
        .then((url) => {
          this.photoURL = url;
          // this.finishedLoadingPhoto = true;
          console.log(`Finished loading photo: ${url}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resizeVideo() {
      this.videoHeight = window.innerHeight - 58;
    },
    showPaymentPopup() {
      this.paymentPopup = true;
    },
    purchaseUser() {
      const user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("companies")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id == user.uid) {
              const coins = doc.get("coins");
              this.$store.commit("main/updateCoins", coins);
              if (coins >= 10) {
                this.$q.notify({
                  message: "Proses transaksi",
                });
              } else {
                this.$q.notify({
                  message: "Koin anda tidak cukup",
                  color: "red",
                });
              }
            }
          });
        });
    },
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeVideo);
  },
};
</script>

<style lang="scss" scoped>
.videoContainer {
  background-color: black;
}

.spinner {
  text-align: center;
  margin: 30%;
}

.section1 {
  background-color: $secondary;
  // text-align: center;
}
.photo {
  width: 150px;
  border-radius: 50%;
  margin: 20px 0;
}
.username {
  font-size: 30px;
  padding: 40px 0 0 20px;
}
.profile {
  font-size: 15px;
  padding: 0px 0 0 22px;
}

.section2 {
  background-color: $primary;
  text-align: center;
  padding: 20px 0;
}
</style>
