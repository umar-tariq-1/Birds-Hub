export const validate = (
  Fname,
  Lname,
  Phone,
  Password,
  Confirmpassword,
  setError,
  setinputErrors,
  enqueueSnackbar
) => {
  if (/\s/.test(Fname)) {
    setError("Name must not contain blank space");
    setinputErrors({ fname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  }
  // eslint-disable-next-line
  else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(Fname)) {
    setError("First Name must contain only alphabet letters");
    setinputErrors({ fname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (/\d/.test(Fname)) {
    setError("Name must not contain any number");
    setinputErrors({ fname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  }
  // eslint-disable-next-line
  else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(Lname)) {
    setError("Name must contain only alphabet letters");
    setinputErrors({ lname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (/\d/.test(Lname)) {
    setError("Name must not contain any number");
    setinputErrors({ lname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (/\s/.test(Lname)) {
    setError("Name must not contain blank space");
    setinputErrors({ lname: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (!/^\+?\d{8,15}$/.test(Phone)) {
    setError("Invalid Phone Number");
    setinputErrors({ phone: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (/\s/.test(Password)) {
    setError("Password must not contain blank space");
    setinputErrors({ password: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (!Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    setError("Invalid Password");
    setinputErrors({ password: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else if (Password !== Confirmpassword) {
    setError("Passwords donot match");
    setinputErrors({ confirmpassword: 1 });
    enqueueSnackbar("Couldn't register", { variant: "error" });
    return false;
  } else {
    return true;
  }
};

export const capitalize = (Word) => {
  if (!Word) {
    return;
  }
  return Word[0].toUpperCase() + Word.substring(1).toLowerCase();
};
