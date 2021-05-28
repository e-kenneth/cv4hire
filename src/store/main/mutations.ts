import { MutationTree } from "vuex";
import { MainStateInterface } from "./state";

const mutation: MutationTree<MainStateInterface> = {
  login(state: MainStateInterface, payload) {
    state.user = payload;
  },
  logout(state: MainStateInterface) {
    state.user = {
      uid: "",
      email: "",
      emailVerified: false,
      type: -1,
    };
    state.dataProfessional = {
      name: "",
      username: "",
      birthdate: "",
      job_id: [],
      city_id: [],
      religion_id: -1,
      gender_id: -1,
    };
  },
  dataProfessional(state, payload) {
    state.dataProfessional = payload;
  },
};

export default mutation;
