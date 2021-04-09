<template>
  <div class="container">
    <div class="row q-pa-md items-stretch">
        <div class="professionals col-6 col-lg-2" v-for="professional in professionals" :key="professional.id">
          <professional-card :professional="professional" /> 
        </div>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
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
      }
  },
  mounted() {
    api
      .get("professional/")
      .then((response) => {
        this.professionals = response.data;
      })
      .catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.professionals{
  // align-items: stretch;
}
</style>