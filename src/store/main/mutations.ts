import { MutationTree } from "vuex";
import { MainStateInterface } from "./state";

const mutation: MutationTree<MainStateInterface> = {
  changeLoginState(state: MainStateInterface, value: number) {
    state.loginState = value;
  },
};

export default mutation;
