<template>
  <div>
    <q-btn
      color="secondary"
      :icon="icon"
      :label="label"
      @click="opened = true"
    />
    <q-dialog v-model="opened">
      <q-card v-if="!isLoggedIn">
        <q-card-section class="column">
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Masuk"
            to="/login/"
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
          <q-btn color="secondary" label="Keluar" @click="logout" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.main.user.uid != "";
    },
    icon() {
      if (this.isLoggedIn) {
        return "person";
      } else {
        return "person";
      }
    },
    label() {
      return this.$store.state.main.dataProfessional.username;
      // const user = this.$store.state.main.user;
      // if (this.isLoggedIn) {
      //   return user.email;
      // } else {
      //   return "";
      // }
    },
  },
  methods: {
    logout() {
      this.$store.commit("main/logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error.code);
          this.$q.notify({
            message: error.message,
            color: "red",
          });
        });
      this.opened = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
