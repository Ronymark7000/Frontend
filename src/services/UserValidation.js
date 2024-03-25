import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "First Name too Short!")
    .max(20, "Username very Long!")
    .required("Enter the first name of your user!!! "),

  lastname: Yup.string()
    .min(3, "First Name too Short!")
    .max(20, "Username very Long!")
    .required("Enter the last name of your user!!! "),  

  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits.")
    .required("Enter the contact number."),

  email: Yup.string().email("Invalid email address.").required("Email Address Required."),

  password: Yup.string()
    .min(5, "Password too Short!")
    .max(100, "Very long Password!")
    .required("Enter the password for the user."),
});