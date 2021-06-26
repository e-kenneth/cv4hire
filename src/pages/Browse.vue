<template>
  <div class="container">
    <div class="row q-pa-md items-stretch">
      <!-- {{professionals}} -->
      <div
        class="professionals col-6 col-lg-2"
        v-for="professional in professionals"
        :key="professional.id"
      >
        <professional-card :professional="professional" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import global from "src/components/global";
import ProfessionalCard from "src/components/ProfessionalCard.vue";
export default {
  components: {
    ProfessionalCard,
  },
  data() {
    return {
      professionals: [],
    };
  },
  computed: {
    user() {
      return global.state.loggedInUser;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      firebase
        .firestore()
        .collection("professionals")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const dataProfessional = {
              id: doc.id,
              username: doc.get("username"),
              // birthdate: doc.get("birthday"),
              job_id: doc.get("job_id"),
              city_id: doc.get("city_id"),
              // religion_id: doc.get("religion_d"),
              // gender_id: doc.get("gender_id"),
              // userVerified: doc.get("userVerified"),
              // verificationStatus: doc.get("verificationStatus"),
              // verificationDate: doc.get("verificationDate"),
            };
            this.professionals.push(dataProfessional);
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.professionals {
  // align-items: stretch;
}
</style>
