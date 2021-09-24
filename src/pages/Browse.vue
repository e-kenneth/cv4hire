<template>
  <div class="container">
    <div class="row q-pt-md justify-center">
      <q-btn
        color="secondary"
        icon="filter_list"
        label="Filter"
        @click="folded = !folded"
      />
    </div>
    <div class="row q-pt-md q-pl-md q-pr-md justify-center">
      <div
        class="row justify-evenly filterContainer q-ml-sm q-mr-sm"
        :class="{ folded: folded }"
      >
        <div class="col-12 col-lg-6">
          <q-select
            class="filterSelect"
            v-model="filter.job_id"
            :options="$store.state.main.options.jobs"
            label="Pekerjaan"
            filled
            emit-value
            map-options
          />
          <q-select
            class="filterSelect"
            v-model="filter.city_id"
            :options="$store.state.main.options.cities"
            label="Kota"
            filled
            emit-value
            map-options
          />
        </div>
        <div class="col-12 col-lg-6">
          <q-select
            class="filterSelect"
            v-model="filter.gender_id"
            :options="$store.state.main.options.genders"
            label="Jenis Kelamin"
            filled
            emit-value
            map-options
          />
          <!-- <q-select
            class="filterSelect"
            v-model="filter.religions"
            :options="$store.state.main.options.religions"
            label="Agama"
            filled
          /> -->
          <!-- <q-select v-model="model" :options="$store.state.main.options." label="Standard" filled />
          <q-select v-model="model" :options="$store.state.main.options." label="Standard" filled /> -->
        </div>
      </div>
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
      filter: {
        job_id: "",
        city_id: "",
        gender_id: "",
      },
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
  watch: {
    filter: {
      handler(val, oldVal) {
        this.load();
      },
      deep: true,
    },
  },
  methods: {
    load() {
      this.professionals = [];
      let users = firebase
        .firestore()
        .collection("professionals")
        // .where("verificationStatus", "==", 1)
        .orderBy("verificationDate", "desc");

      if (this.filter.gender_id != "") {
        users = users.where("gender_id", "==", this.filter.gender_id);
        console.log("filtered gender");
      }      
      if (this.filter.city_id != "") {
        users = users.where("city_id", "array-contains",this.filter.city_id);
      }      
      if (this.filter.job_id != "") {
        users = users.where("job_id", "array-contains", this.filter.job_id);
      }

      users = users.get();

      users.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const dataProfessional = {
            id: doc.id,
            username: doc.get("username"),
            // username: doc.get("verificationDate"),
            // birthdate: doc.get("birthday"),
            job_id: doc.get("job_id"),
            city_id: doc.get("city_id"),
            // religion_id: doc.get("religion_d"),
            // gender_id: doc.get("gender_id"),
            // userVerified: doc.get("userVerified"),
            verificationStatus: doc.get("verificationStatus"),
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
  margin-bottom: 20px;
}
.filterContainer {
  overflow: hidden;
  background-color: $primary;
  width: 100%;
  // height: 170px;
  border-radius: 5px;
  padding: 10px;
  transition: height 0.5s, padding 0.5s;
}
.filterContainer.folded {
  padding: 0;
  height: 0px;
}
.filterSelect {
  // width: 100%;
  padding: 10px;
}
</style>
