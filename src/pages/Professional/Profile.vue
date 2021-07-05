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
      <div v-else>Loading video</div>
    </div>
    <div class="col-12 col-lg-6">
      <div v-if="isSelfProfile">
        {{ user }}
      </div>
      <div v-if="currentProfessional != null">{{ currentProfessional }}</div>
      <div v-else>Professional tidak ditemukan</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export default {
  data() {
    return {
      finishedLoadingVideo: false,
      videoURL: "",
      videoHeight: 0,
      currentProfessional: null,
    };
  },
  computed: {
    isSelfProfile() {
      if (
        this.$route.params.id == null ||
        this.$route.params.id.toString().toLowerCase() ==
          this.dataProfessional.username.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.state.main.user;
    },
    dataProfessional() {
      return this.$store.state.main.dataProfessional;
    },
  },
  mounted() {
    window.addEventListener("resize", this.resizeVideo);
    if (this.$route.params.id != null) {
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
              this.resizeVideo();
            }
          });
        });
    } else {
      this.currentProfessional = this.dataProfessional;
      this.getVideoURL(this.user.uid);
    }
  },
  methods: {
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
    resizeVideo(){
      this.videoHeight = window.innerHeight-58;
      // console.log(`resize to ${window.innerHeight}`);
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeVideo);
  },
};
</script>

<style lang="scss" scoped>
.videoContainer {
  // display: flex;
  // align-items: stretch;
  background-color: black;
  // height: 100%;
}
// .video {
//   height: 800px;
//   object-fit: contain;
// }
</style>
