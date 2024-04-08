import * as Yup from "yup";

export const ItemSchema = Yup.object().shape({

  
  itemName: Yup.string()
    .min(3, "Item Name too Short!")
    .max(30, "Item Name very Long!")
    .required("Enter the item name!!! "),

  category:Yup.string()
  .required("Select the item category"),

  grossWeight: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Gross weight must be a number")
  .min(0.1, "Gross weight must be at least 0.1")
  .required("Enter the Gross Weight of the product!!! "), 

  wastage: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Wastage must be a number")
  .test('is-min-wastage', 'Wastage must be at least 4 percent.', function (value) {
    // Convert the value to a number and check if it's at least 4
    const wastagePercentage = parseFloat(value);
    return wastagePercentage >= 4;
  })
  .required("Enter the wastage value of the product!!!"),

  netWeight: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Net weight must be a number")
  .min(0.1, "Net weight must be at least 0.1")
  .required("Enter the Net Weight of the product!!! "), 

  goldPrice: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Material Price must be a number")
  .min(1, "Material's Price must be at least 1")
  .required("Enter the Material's Price of the product!!! "), 

  costOfStone: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Please check your cost value")
  .transform((value, originalValue) => {
    // If value is null or undefined, set it to 0
    return originalValue === null || originalValue === undefined ? 0 : value;
  })
  .min(0, "Cost of stone cannot be negative"),

  manufactureCost: Yup.string()
  .matches(/^[0-9]+(\.[0-9]+)?$/, "Manufacture Cost must be a number")
  .required("Enter the Manufacture Price of the product!!! "), 

  totalCost: Yup.string()
  .min(0.1, "Final Price must be at least 0.1")
  .required("Enter the total Cost of the product!!! "), 

});