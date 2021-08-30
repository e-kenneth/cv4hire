<template>
  <div class="q-pa-md text-center">
    <div class="col">
      {{ user }}
      {{ connections }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export default {
  data() {
    return {
      connections: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.main.user;
    },
  },
  methods: {
    getConnections() {
      if (this.user != null) {
        var docRef = firebase
          .firestore()
          .collection("connections")
          .doc(this.user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.connections = doc.data().professionals;
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    },
  },
  mounted() {
    // if (this.user != null) {
    //   this.getConnections();
    // }
  },
  watch: {
    user(newValue, oldValue) {
      this.getConnections();
    },
  },
};
</script>

<style lang="scss" scoped></style>
