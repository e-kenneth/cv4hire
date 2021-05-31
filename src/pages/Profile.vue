<template>
  <div>
    <div v-if="isSelfProfile">
      {{ user }}
    </div>
    <div v-if="currentProfessional != null">{{ currentProfessional }}</div>
    <div v-else>Professional tidak ditemukan</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
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
  data() {
    return {
      currentProfessional: null,
    };
  },
  mounted() {
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
            }
          });
        });
    } else {
      this.currentProfessional = this.dataProfessional;
    }
  },
};
</script>

<style lang="scss" scoped></style>
