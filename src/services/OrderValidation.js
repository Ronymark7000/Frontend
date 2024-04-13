import * as Yup from "yup";

export const OrderSchema = Yup.object().shape({

  customerName: Yup.string()
    .min(3, "Customer Name too Short!")
    .max(70, "Customer very Long!")
    .required("Enter the customer name!!! "), 

  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits.")
    .required("Enter the contact number."),
  
  orderName: Yup.string()
    .min(3, "Order Name too Short!")
    .max(30, "Order Name very Long!")
    .required("Enter the Order name!!! "),


  estimatedWeight: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Estimated weight must be a number")
  .min(0.1, "Gross weight must be at least 0.1")
  .required("Enter the Estimated Weight of the product!!! "), 

});