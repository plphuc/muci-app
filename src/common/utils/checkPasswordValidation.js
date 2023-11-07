const checkPasswordValidation = (value) => {
  const passwordErrors = [];
  if (value.length < 8) {
    passwordErrors.push('At least 8 characters');
  }
  if (!value.match(/[a-z]/g)) {
    passwordErrors.push('Must contain lowercase letter');
  }
  if (!value.match(/[A-Z]/g)) {
    passwordErrors.push('Must contain uppercase letter');
  }
  // eslint-disable-next-line
  if (!value.match(/[!@#\$%\^\&*\)\(\/><"':;,|\\\]\[{}?+=._-]/g)) {
    passwordErrors.push('Must contain special chracter');
  }
  return passwordErrors;
};

export default checkPasswordValidation;
