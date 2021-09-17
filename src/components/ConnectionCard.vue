<template>
  <div class="card q-mb-md row">
    <div class="col-1">
      <q-img
        :src="photoURL"
        :ratio="1 / 1"
        spinner-color="primary"
        spinner-size="82px"
        width="80px"
      />
    </div>
    <div class="col-2">{{ connection.username }}</div>
    <div class="col-2">{{ connection.name }}</div>
    <div class="col-2">{{ jobs }}</div>
    <div class="col-2">{{ cities }}</div>
    <div class="col-1">{{ connection.phone_number }}</div>
    <div class="col-1 q-pa-sm">
      <a :href="`tel:${connection.phone_number}`">
        <div class="phone">Kontak via Telepon</div>
      </a>
    </div>
    <div class="col-1 q-pa-sm">
      <a :href="`https://wa.me/${connection.phone_number}`">
        <div class="whatsapp">Whatsapp</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    connection: Object,
  },
  data() {
    return {
      photoURL: "https://i.imgur.com/EbU4ix7.png",
    };
  },
  computed: {
    jobs() {
      const jobs = this.$store.state.main.options.jobs;
      let connectionJob = "";
      this.connection.job_id.forEach(job_id => {
          jobs.forEach((job) => {
              if (job_id == job.value) {
                  connectionJob += job.label + ", ";
              }
          });
      });
      return connectionJob.slice(0, -2);
    },    
    cities() {
      const cities = this.$store.state.main.options.cities;
      let connectionJob = "";
      this.connection.city_id.forEach(city_id => {
          cities.forEach((city) => {
              if (city_id == city.value) {
                  connectionJob += city.label + ", ";
              }
          });
      });
      return connectionJob.slice(0, -2);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $secondary;
  color: white;
  border-radius: 5px;
  text-align: left;
  padding: 10px 20px;
}
.whatsapp {
  background-color: green;
  text-align: center;
  padding: 10px 5px;
  border-radius: 5px;
  transition: all 0.5s;
}

.whatsapp:hover {
  background-color: #2eac00;
}

.phone {
  background-color: $primary;
  text-align: center;
  padding: 10px 5px;
  border-radius: 5px;
  transition: all 0.5s;
}

.phone:hover {
  background-color: #5162f8;
}

a {
  color: white;
  text-decoration: none;
}
</style>
