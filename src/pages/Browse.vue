<template>
  <div class="container">
    <div class="row q-pt-md justify-center">
      <q-btn color="secondary" icon="filter_list" label="Filter" @click="folded = !folded" />
    </div>
    <div class="row q-pt-md q-pa-md justify-center">
      <div class="filterContainer q-ml-sm q-mr-sm" :class="{'folded' : folded}" >Filter</div>
    </div>
    <div class="row q-pa-md items-stretch">
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
      folded: true,
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
  margin-bottom: 20px;
}
.filterContainer{
  background-color: $primary;
  width: 100%;
  height: 400px;
  border-radius: 5px;
  transition: height .5s;
}
.filterContainer.folded{
  height: 0px;
}
</style>
