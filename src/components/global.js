import { reactive } from "vue";

const state = reactive({
  loggedInUser: {
    id: -1,
    isRecruiter: false,
    name: "",
    email: "",
  },
  filter: {},
});

const mutations = {};

export default { state, mutations };
