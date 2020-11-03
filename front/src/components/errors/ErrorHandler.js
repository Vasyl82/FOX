const handleError = ({ error, validationFields = [], operation = "" }) => {
  console.log(error);
  if (Object.keys(error).some(errorKey => validationFields.includes(errorKey))) {
    const errors = []
    Object.values(error).forEach(element => typeof element === 'string' ? errors.push(element) : element.forEach(string => errors.push(string)));
    return errors.join("\n")
  }
  else {
    return `${operation} failed!` +
      ' Please check your input and try again!' +
      ' In case this problem repeats, please contact your administrator!'

  }
}

export default handleError

