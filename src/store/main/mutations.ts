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
      verificationStatus: 0,
      verificationDate: null,
    };
  },
  uploadVerification(state: MainStateInterface, payload) {
    state.dataProfessional!.verificationStatus = 1;
    state.dataProfessional!.verificationDate = new Date();
  },
  dataProfessional(state, payload) {
    state.dataProfessional = payload;
  },
  dataCompany(state, payload) {
    state.dataCompany = payload;
  },
  toggleDarkMode(state) {
    state.settings.darkMode = !state.settings.darkMode;
  },
};

export default mutation;
