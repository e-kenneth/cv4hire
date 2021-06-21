<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar akun baru</h5>
      <q-input
        required="required"
        color="secondary"
        v-model="user.name"
        type="text"
        label="Nama lengkap"
      />
      <q-file required="required" v-model="temp.photo" label="Foto (formal)" accept="image/*">
        <template v-slot:prepend>
          <q-icon name="add_photo_alternate" />
        </template>
      </q-file>
      <div class="row">
        <div class="self-center q-pr-lg">Tanggal lahir:</div>
        <q-input
          required="required"
          color="secondary"
          type="date"
          v-model="user.birthdate"
        />
      </div>
      <q-input
        color="secondary"
        v-model="auth.email"
        type="email"
        label="Alamat email"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="auth.password"
        type="password"
        label="Kata sandi"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="auth.password"
        type="password"
        label="Ulang sandi"
        required="required"
      />
      <q-select
        color="secondary"
        v-model="user.job_id"
        :options="options.jobs"
        use-chips
        multiple
        max-values="3"
        emit-value
        map-options
        label="Pekerjaan yang diinginkan"
      />
      <q-select
        color="secondary"
        v-model="user.city_id"
        :options="temp.optionCity"
        use-chips
        multiple
        max-values="3"
        use-input
        @filter="filterCityFn"
        emit-value
        map-options
        label="Domisili"
      />
      <q-select
        color="secondary"
        v-model="user.gender_id"
        :options="options.genders"
        emit-value
        map-options
        label="Kelamin"
      />
      <q-select
        color="secondary"
        v-model="user.religion_id"
        :options="options.religions"
        emit-value
        map-options
        label="Agama"
      />
      <div>
        <q-btn label="Daftar sekarang" type="submit" color="secondary" />
        <q-btn
          label="Saya sudah punya akun"
          color="secondary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default {
  data() {
    return {
      temp: {
        optionCity: [],
        photo: null,
      },
      auth: {
        email: "",
        password: "",
        password_repeat: "",
      },
      user: {
        name: "",
        username: "",
        birthdate: "",
        job_id: [],
        city_id: [],
        religion_id: "",
        gender_id: "",
        verificationStatus: 0,
        verificationDate: null,
      },
    };
  },
  computed: {
    options() {
      return this.$store.state.main.options;
    },
  },
  mounted() {
    this.options.cities.forEach((city) => {
      this.temp.optionCity.push(city);
    });
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((userCredential) => {
          const operations = [];

          let user = userCredential.user;
          this.user.username = user.uid.substring(0, 6).toUpperCase();

          operations.push(
            firebase
              .firestore()
              .collection("professionals")
              .doc(user.uid)
              .set(this.user)
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              })
          );
          operations.push(
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: 0,
              })
              .catch((error) => {
                console.error(error);
              })
          );
          let storageRef = firebase
            .storage()
            .ref()
            .child(`professionals/${user.uid}/photo`);
          operations.push(storageRef.put(this.temp.photo));
          operations.push(
            firebase
              .auth()
              .currentUser.sendEmailVerification()
              .catch((error) => {
                console.error(error);
              })
          );
          Promise.all(operations).then(() => {
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error.code);
          this.$q.notify({
            message: error.message,
            color: "red",
          });
        });
    },
    filterCityFn(val, update) {
      if (val === "") {
        update(() => {
          this.temp.optionCity = this.options.cities;
        });
        return;
      }

      update(() => {
        this.temp.optionCity = [];

        this.options.cities.forEach((city) => {
          if (city.label.toLowerCase().includes(val.toLowerCase())) {
            this.temp.optionCity.push(city);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
