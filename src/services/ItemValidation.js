import * as Yup from "yup";

export const ItemSchema = Yup.object().shape({

  
  itemName: Yup.string()
    .min(3, "Item Name too Short!")
    .max(30, "Item Name very Long!")
    .required("Enter the item name!!! "),

  grossWeight: Yup.string()
  .min(0.1, "Gross weight must be at least 0.1")
  .required("Enter the Gross Weight of the product!!! "), 

  wastage: Yup.string()
  .test('is-min-wastage', 'Wastage must be at least 4 percent.', function (value) {
    // Convert the value to a number and check if it's at least 4
    const wastagePercentage = parseFloat(value);
    return wastagePercentage >= 4;
  })
  .required("Enter the wastage value of the product!!!"),

  netWeight: Yup.string()
  .min(0.1, "Net weight must be at least 0.1")
  .required("Enter the Net Weight of the product!!! "), 

  goldPrice: Yup.string()
  .min(1, "Material's Price must be at least 1")
  .required("Enter the Material's Price of the product!!! "), 

  manufactureCost: Yup.string()
  .required("Enter the Manufacture Price of the product!!! "), 

  totalCost: Yup.string()
  .min(0.1, "Final Price must be at least 0.1")
  .required("Enter the total Cost of the product!!! "), 

});