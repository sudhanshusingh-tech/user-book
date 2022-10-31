const ValidateName = (event) => {
  const re = /^[A-Za-z\s]*$/;
  if (!re.test(event.target.value)) {
    return "[A-Z] Characters are only allowed";
  } else if (event.target.value === "" || event.target.value === null) {
    return "Name cannot be empty";
  } else {
    return null;
  }
};
const ValidateState = (event) => {
  const re = /^[A-Za-z]*$/;
  if (!re.test(event.target.value)) {
    return "[A-Z] Characters are only allowed";
  } else {
    return null;
  }
};
const ValidateEmail = (event) => {
  const re =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
  if (re.test(event.target.value)) {
    return "Please provide a proper email address";
  } else if (event.target.value === "" || event.target.value === null) {
    return "Email cannot be empty";
  } else {
    return null;
  }
};
const ValidateCity = (event) => {
  const re = /^[A-Za-z]*$/;
  if (!re.test(event.target.value)) {
    return "[A-Z] Characters are only allowed";
  } else {
    return null;
  }
};
const ValidateMobile = (event) => {
  const re = /^[0-9]*$/;
  if (event.target.value === "" || event.target.value === null) {
    return "Mobile number cannot be empty";
  } else if (
    !re.test(event.target.value) ||
    event.target.value.length < 10 ||
    event.target.value.length > 10
  ) {
    return "Enter a 10 digit valid mobile number with [0-9]";
  } else {
    return null;
  }
};
const ValidateEmployeeId = (event) => {
  const re = /^[0-9]*$/;
  if (event.target.value === "" || event.target.value === null) {
    return "Employee ID cannot be empty";
  } else if (
    !re.test(event.target.value) ||
    event.target.value.length < 7 ||
    event.target.value.length > 7
  ) {
    return "Enter a 7 digit valid employee number with [0-9]";
  } else {
    return null;
  }
};

export {
  ValidateName,
  ValidateMobile,
  ValidateEmployeeId,
  ValidateCity,
  ValidateState,
  ValidateEmail,
};
