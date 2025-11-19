export const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export const isValidUsername = (username) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};
