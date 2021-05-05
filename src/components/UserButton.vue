<template>
  <div>
    <q-btn
      color="secondary"
      icon="person"
      :label="label"
      @click="opened = true"
    />
    <q-dialog v-model="opened">
      <q-card v-if="loginState == 0">
        <q-card-section class="column">
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Google Sign-in"
            @click="dummyLogin"
          />
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Daftar sebagai professional"
            @click="opened = false"
            to="/professional/register/"
          />
          <q-btn
            class="q-mb-none"
            color="secondary"
            label="Daftar sebagai perusahaan"
            @click="opened = false"
            to="/recruiter/register/"
          />
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section class="column">
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Profil"
            to="/profile"
            @click="opened = false"
          />
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Pengaturan"
            to="Profile"
            @click="opened = false"
          />
          <q-btn color="secondary" label="Keluar" @click="dummyLogout" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    loginState() {
      return this.$store.state.main.loginState;
    },
    label() {
      if (this.loginState == 0) {
        return "";
      } else if (this.loginState == 1) {
        return "Dummy User";
      }
    },
  },
  methods: {
    dummyLogin() {
      this.$store.commit("main/changeLoginState", 1);
      this.opened = false;
    },
    dummyLogout() {
      this.$store.commit("main/changeLoginState", 0);
      this.opened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>