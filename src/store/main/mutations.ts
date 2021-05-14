import { MutationTree } from "vuex";
import { MainStateInterface } from "./state";

const mutation: MutationTree<MainStateInterface> = {
  setLoginStatus(state: MainStateInterface, payload) {
    state.login.status = true;
    state.login.type = payload;
  },
  login(state: MainStateInterface, user) {
    if (state.login.type == 0) {
      state.userProfessional = user;
    } else {
      state.userCompany = user;
    }
  },
  logout(state: MainStateInterface) {
    state.login.status = false;
    state.login.type = -1;
    // if (state.login.type == 0) {
    //   state.userProfessional = {
    //     uid: "",
    //     email: "",
    //     verified: false,
    //     name: "",
    //     birthdate: "",
    //     type_id: -1,
    //     job_id: -1,
    //     city_id: -1,
    //     religion_id: -1,
    //     gender_id: -1,
    //   };
    // } else {
    //   //
    // }
  },
};

export default mutation;
