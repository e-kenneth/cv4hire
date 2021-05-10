import { MutationTree } from "vuex";
import { MainStateInterface } from "./state";

const mutation: MutationTree<MainStateInterface> = {
  login(state: MainStateInterface, user) {
    state.user = user;
  },
  logout(state: MainStateInterface) {
    state.user = {
      uid: "",
      email: "",
    };
  },
};

export default mutation;
