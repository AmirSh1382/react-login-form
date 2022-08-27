const validata = (data , type) => {
  const { name, email, password, confirmPassword, isAccepted } = data;

  const error = {};

  if(type === "Signup"){
    if (!name.trim()) {
      error.name = "Username required";
    } else if (name.trim().length < 8) {
      error.name = "Username must be at least 8 charachters";
    } else {
      delete error.name;
    }
  
    if (!password.trim().length) {
      error.password = "Password required";
    } else if (password.trim().length < 8) {
      error.password = "Password needs to be 8 character or more";
    } else if (!/[A-Z]/g.test(password)) {
      error.password = "password must contain an uppercase character";
    } else if (!/[\.$%#^&*!\/]/g.test(password)) {
      error.password = "Password must contain !#.$^%&*/";
    } else if (/[?]/g.test(password)){
      error.password = `Character "?" is not allowed`
    } else {
      delete error.password;
    }

    if (!email.trim()) {
      error.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      error.email = "Email address is invalid";
    }
    
    if (confirmPassword !== password || !confirmPassword.length) {
      error.confirmPassword = "Password does'nt match";
    } else {
      delete error.confirmPassword;
    }
  
    if (!isAccepted) {
      error.isAccepted = "Accept our regulations";
    } else {
      delete error.isAccepted;
    }
  }else {
    if (!name.trim()) {
      error.name = "Username required";
    } 

    if (!password.trim().length) {
      error.password = "Password required";
    } else if (password.trim().length < 8) {
      error.password = "Password needs to be 8 character or more";
    } 
  }
  
  return error;
};

export default validata;