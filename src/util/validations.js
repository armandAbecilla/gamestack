export const isNotEmpty = (value) => {
  return value.trim() !== '';
};

export const isEmailValid = (value) => {
  return isNotEmpty(value) && value.includes('@');
};
