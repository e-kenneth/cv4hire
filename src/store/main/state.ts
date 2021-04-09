export interface MainStateInterface {
  loginState: number; // 0: not, 1: professional, 2: recruiter
}

function state(): MainStateInterface {
  return {
    loginState: 0,
  }
};

export default state;
