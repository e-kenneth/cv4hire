<template>
  <div>
    {{ photoUrl }}
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
      return this.$store.state.main.dataCompany;
    },
    photoUrl() {
      if (this.$store.state.main.user.type == 1) {
        let storageRef = firebase
          .storage()
          .ref()
          .child(`recruiters/${this.$store.state.main.user.uid}/logo`);
        return storageRef.getDownloadURL();
      } else {
        return "null";
      }
    },
  },
  data() {
    return {
      currentProfessional: null,
    };
  },
  mounted() {
    this.currentProfessional = this.dataProfessional;
  },
};
</script>

<style lang="scss" scoped></style>
