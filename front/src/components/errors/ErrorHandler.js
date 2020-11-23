import { array } from "prop-types";
import { dictionary } from "../../services/local/en-en";

const handleError = ({ error, validationFields = [], operation = "" }) => {
  console.log(error);
  // If error message from backend contains a dictionary, check if its keys match values from validation fields array,
  // and if so, get values from this dictionary, and join them in one string.
  if (
    Object.keys(error).some((errorKey) => validationFields.includes(errorKey))
  ) {
    const errors = [];
    Object.values(error).forEach((element) =>
      typeof element === "string"
        ? errors.push(element)
        : element.forEach((string) => errors.push(string))
    );
    return errors.join("\n");
  } else {
    return (
      `${operation} failed!` +
      " Please check your input and try again!" +
      " In case this problem repeats, please contact your administrator!"
    );
  }
};

export default handleError;
