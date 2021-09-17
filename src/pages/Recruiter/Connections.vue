<template>
  <div class="q-pa-md text-center">
    <div class="columns" v-if="connections.length > 0">
      <div v-for="connection in connections" :key="connection.uid">
        <ConnectionCard :connection="connection" />
      </div>
    </div>
    <div v-else>Silahkan beli kontak terlebih dahulu</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import ConnectionCard from "src/components/ConnectionCard.vue";

export default {
  components: {
    ConnectionCard,
  },
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
      if (this.user.uid != "") {
        var docRef = firebase
          .firestore()
          .collection("connections")
          .doc(this.user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const connectionIDs = doc.data().professionals;

              connectionIDs.forEach((id) => {
                firebase
                  .firestore()
                  .collection("professionals")
                  .doc(id)
                  .get()
                  .then((doc) => {
                    let tempData = doc.data();
                    tempData.uid = doc.id;
                    this.connections.push(tempData);
                  });
              });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    },
  },
  mounted() {
    this.getConnections();
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
