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
      verified: false,
      type_id: -1,
    };
  },
  dataProfessional(state, payload) {
    state.dataProfessional = payload;
  },
};

export default mutation;
