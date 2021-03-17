<template>
  <div class="container">
    <div class="row q-pa-md items-stretch">
        <div class="talents col-4 col-lg-2" v-for="talent in talents" :key="talent.id">
          <talent-card :talent="talent" />
        </div>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
import global from "src/components/global";
import TalentCard from "src/components/TalentCard.vue";
export default {
  components: {
    TalentCard,
  },
  data() {
    return {
      talents: [],
    };
  },
  computed: {
      user() {
          return global.state.loggedInUser; 
      }
  },
  mounted() {
    api
      .get("talent/")
      .then((response) => {
        this.talents = response.data;
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
.talents{
  // align-items: stretch;
}
</style>