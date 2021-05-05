export interface MainStateInterface {
  jobCategories: object[];
  loginState: number; // 0: not, 1: professional, 2: recruiter
}

function state(): MainStateInterface {
  return {
    jobCategories: [
      { id: 1, name: "Akuntansi" },
      { id: 2, name: "Programmer" },
      { id: 1, name: "" },
    ],
    loginState: 0,
  };
}

export default state;
