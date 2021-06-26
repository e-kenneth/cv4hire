<template>
  <div>
    <div class="row">
      <div class="photoContainer">
        <q-img
          :src="photoURL"
          class="photoButton"
          spinner-color="primary"
          spinner-size="82px"
          @click="opened = true"
        />
        <div v-if="isLoggedIn" class="photoLabel" @click="opened = true">
          {{ label }}
        </div>
      </div>
    </div>

    <!-- <q-btn
      color="secondary"
      :icon="icon"
      :label="label"
      @click="opened = true"
    /> -->
    <q-dialog v-model="opened">
      <q-card v-if="!isLoggedIn">
        <q-card-section class="column">
          <q-btn class="q-mb-md" color="secondary" label="Masuk" to="/login/" />
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Daftar sebagai professional"
            @click="opened = false"
            to="/professional/register/"
          />
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Daftar sebagai perusahaan"
            @click="opened = false"
            to="/recruiter/register/"
          />
          <q-btn
            class="q-mb-none"
            color="secondary"
            :label="darkModeLabel"
            @click="toggleDarkMode"
          />
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section class="column">
          <q-img contain :src="photoURL" class="photoMenu" :ratio="1" />
          <div class="menuLabel">{{ label }}</div>
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
          <q-btn
            class="q-mb-md"
            color="secondary"
            label="Keluar"
            @click="logout"
          />
          <q-btn
            class="q-mb-none"
            color="secondary"
            :label="darkModeLabel"
            @click="toggleDarkMode"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export default {
  data() {
    return {
      opened: false,
      photoURL: "ui_elements/login.png",
    };
  },
  computed: {
    darkModeLabel() {
      if (this.$store.state.main.settings.darkMode) {
        return "Mode terang";
      } else {
        return "Mode gelap";
      }
    },
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
      if (this.$store.state.main.user.type == 0) {
        return this.$store.state.main.dataProfessional.username;
      } else if (this.$store.state.main.user.type == 1) {
        return this.$store.state.main.dataCompany.name;
      }
    },
  },
  watch: {
    "$store.state.main.user.uid"(newValue, oldValue) {
      this.getPhotoURL();
    },
  },
  mounted() {
    this.getPhotoURL();
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
    getPhotoURL() {
      if (this.$store.state.main.user.uid != "") {
        if (this.$store.state.main.user.type == 0) {
          firebase
            .storage()
            .ref(`professionals/${this.$store.state.main.user.uid}/photo`)
            .getDownloadURL()
            .then((url) => {
              this.photoURL = url;
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.$store.state.main.user.type == 1) {
          firebase
            .storage()
            .ref(`recruiters/${this.$store.state.main.user.uid}/logo`)
            .getDownloadURL()
            .then((url) => {
              this.photoURL = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        this.photoURL = "ui_elements/login.png";
      }
    },
    toggleDarkMode() {
      this.$store.commit("main/toggleDarkMode");
    },
  },
};
</script>

<style lang="scss" scoped>
.menuLabel {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
}

.photoMenu {
  margin-bottom: 20px;
  height: 128.7px;
  object-fit: contain;
  border-radius: 10px;
}

.photoButton {
  display: inline-block;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  border: 2px solid white;
}
.photoLabel {
  display: inline-block;
  cursor: pointer;
  transition: 1s all;
  max-width: 0;
  background-color: white;
  color: $primary;
  font-size: 16px;
  padding: 7px 0;
  border-radius: 5px;
}

// .photoButton:hover + .photoLabel {
//   max-width: 200px;
//   padding: 7px 10px;
//   margin-left: 5px;
// }

.photoContainer:hover > .photoLabel {
  max-width: 200px;
  padding: 7px 10px;
  margin-left: 5px;
}

// .photoLabel:hover {
//   max-width: 200px;
//   padding: 7px 10px;
//   margin-left: 5px;
// }
</style>
