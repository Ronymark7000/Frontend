import React from "react";
import { Formik, Form, Field } from "formik";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import empty1 from "../../../assets/empty.png";
import { Button } from "react-bootstrap";
import { ItemSchema } from "../../../services/ItemValidation";
import {
  emitErrorToast,
  emitInfoToast,
  emitSuccessToast,
} from "../../../site/components/Toast/EmitToast";
import "./VideoInput/VideoInput.css";

function AddItems({ editItem }) {
  const navigate = useNavigate();

  const initialFormState = {
    itemName: "",
    material: "Gold",
    category: "",
    karat: "24",
    grossWeight: "",
    wastage: "",
    netWeight: "",
    goldPrice: "",
    costOfStome: "",
    manufactureCost: "",
    description: "",
    totalCost: "",
    itemImageUrl: "",
    itemVideoUrl: "",
  };

  const [form, setForm] = useState(initialFormState);

  const resetForm = () => {
    setForm(initialFormState);
    // Optionally, you can also reset other state variables here
  };

  const handleCancel = () => {
    resetForm();
    // navigate("/admin/item-dashboard"); // Assuming you want to navigate to the item dashboard after canceling
  };

  const [originalGoldPrice, setOriginalGoldPrice] = useState(""); // State to store original gold price

  useEffect(() => {
    if (editItem) {
      setForm((prev) => ({ ...prev, ...editItem }));
      setOriginalGoldPrice(editItem.goldPrice);
    }
  }, [editItem]);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setForm((prev) => ({ ...prev, itemImageUrl: image }));
  };

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setForm((prev) => ({ ...prev, itemVideoUrl: file }));
    const url = URL.createObjectURL(file); // This line causes the error
    setSource(url);
    // handleVideoChange(file); // Pass the selected video file to the parent component
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName" || name === "description" || name === "material" || name=="category") {
        // Preserve itemName, description, and material
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    } else {
        // For other fields, update normally
        let updatedForm = { ...form, [name]: value };

        if (name === "karat") {
            // Check if karat selection changed back to 24k, then set gold price to the original value
            if (value === "24") {
                updatedForm.goldPrice = originalGoldPrice;
            } else {
                // Update gold price based on selected karat
                const enteredValue = parseFloat(updatedForm.goldPrice) || 0;
                let karatMultiplier = 1; // Default multiplier for 24K

                switch (value) {
                    case "22":
                        karatMultiplier = 0.916;
                        break;
                    case "18":
                        karatMultiplier = 0.75;
                        break;
                    case "14":
                        karatMultiplier = 0.58;
                        break;
                    default:
                        break;
                }

                updatedForm.goldPrice = Math.round(enteredValue * karatMultiplier);
            }

            // Recalculate total cost when karat changes
            updatedForm.totalCost = calculateTotalCost(
                updatedForm.goldPrice,
                updatedForm.netWeight,
                updatedForm.manufactureCost,
                updatedForm.costOfStone
            );
        } else if (name === "grossWeight" || name === "wastage") {
            // Calculate net weight and total cost
            const netWeight = calculateNetWeight(
                updatedForm.grossWeight,
                updatedForm.wastage
            );
            const totalCost = calculateTotalCost(
                updatedForm.goldPrice,
                netWeight,
                updatedForm.manufactureCost,
                updatedForm.costOfStone
            );
            updatedForm = { ...updatedForm, netWeight, totalCost };
        } else if (
            name === "goldPrice" ||
            name === "manufactureCost" ||
            name === "costOfStone" ||
            name === "netWeight"
        ) {
            // Calculate total cost
            const totalCost = calculateTotalCost(
                updatedForm.goldPrice,
                updatedForm.netWeight,
                updatedForm.manufactureCost,
                updatedForm.costOfStone
            );
            updatedForm = { ...updatedForm, totalCost };
        }

        setForm(updatedForm);
    }
};


  const calculateNetWeight = (grossWeight, wastagePercentage) => {
    const grossWeightValue = parseFloat(grossWeight) || 0;
    const wastage = parseFloat(wastagePercentage) || 0;
    let netWeight = grossWeightValue + (grossWeightValue * wastage) / 100;

    // Round up the net weight to three decimal places
    netWeight = parseFloat(netWeight.toFixed(3));

    return netWeight;
  };

  const calculateTotalCost = (
    goldPrice,
    netWeight,
    manufactureCost,
    costOfStone
  ) => {
    const goldPricePerTola = parseFloat(goldPrice) || 0;
    const netWeightValue = parseFloat(netWeight) || 0;
    const manufactureCostValue = parseFloat(manufactureCost) || 0;
    const costOfStoneValue = parseFloat(costOfStone) || 0;

    let totalCost =
      goldPricePerTola * netWeightValue +
      manufactureCostValue +
      costOfStoneValue;

    // Round up the total cost
    totalCost = Math.ceil(totalCost);

    return totalCost;
  };

  const forSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "itemImageUrl" && key !== "itemVideoUrl") {
          formData.append(key, value);
        }
      });

      // Append the image file to the FormData if it exists
      if (values.itemImageUrl) {
        formData.append("itemImage", values.itemImageUrl);
      }

      // Append the video file to the FormData if it exists
      if (values.itemVideoUrl) {
        formData.append("itemVideo", values.itemVideoUrl);
      }

      if (editItem) {
        await axiosInstance.put(`/item/${editItem?.itemCode}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        emitInfoToast("Updated Item Successfully");
      } else {
        await axiosInstance.post("/item", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        emitSuccessToast("Added Item Successfully");
      }
      navigate("/admin/item-dashboard");
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error(error);
      emitErrorToast("Error Adding Item");
    }
  };

  return (
    <>
      <div
        style={{
          width: "1080px",
          color: "#62605A",
          marginLeft: "340px",
          marginRight: "120px",
          marginTop: "20px",
          height: "700px",
          overflow: "auto",
        }}
      >
        <Formik
          initialValues={form}
          onSubmit={forSubmit}
          validationSchema={ItemSchema}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%" }}>
              <div>
                <Label
                  for="exampleAbc"
                  style={{
                    marginTop: "5px",
                    marginBottom: "15px",
                    fontSize: "35px",
                  }}
                >
                  <b>Item Form</b>
                </Label>
              </div>

              <div className="d-flex justify-content-between">
                {/* Left side of the form */}

                <div style={{ width: "490px", marginRight: "45px" }}>
                  <div style={{ marginLeft: "70px", marginBottom: "15px" }}>
                    {form.itemImageUrl ? (
                      <img
                        src={URL.createObjectURL(form.itemImageUrl)}
                        alt="Selected Image"
                        style={{
                          width: "320px",
                          height: "300px",
                          marginTop: "10px",
                        }}
                      />
                    ) : (
                      <img
                        src={empty1}
                        alt="Blank Image"
                        style={{
                          width: "300px",
                          height: "280px",
                          marginTop: "10px",
                        }}
                      />
                    )}
                    <div style={{ marginLeft: "100px" }}>
                      <p>
                        <b>Image Preview</b>
                      </p>
                    </div>
                  </div>

                  <div
                    className="form-group row mb-1 "
                    style={{ width: "100%" }}
                  >
                    <input
                      style={{
                        marginLeft: "60px",
                        marginBottom: "5px",
                        width: "355px",
                      }}
                      className="form-control form-control-sm"
                      type="file"
                      id="formFile"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div
                    style={{
                      width: "490px",
                      marginLeft: "47px",
                      marginBottom: "15px",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className="VideoInput"
                      style={{ width: "360px", height: "300px" }}
                    >
                      {source ? (
                        <video
                          className="mt-1"
                          width="100%"
                          controls
                          src={source}
                        />
                      ) : (
                        <img
                          src={empty1}
                          alt="Empty Image"
                          style={{
                            marginTop: "70px",
                            width: "300px",
                            height: "300px",
                          }}
                        />
                      )}
                      <div
                        className="VideoInput_footer"
                        style={{ width: "90%", marginTop: "5px" }}
                      >
                        {source
                          ? "360° video Preview"
                          : "Select your Item Video"}
                      </div>
                      <input
                        ref={inputRef}
                        className="form-control form-control-sm mt-3 mb-2"
                        type="file"
                        onChange={handleFileChange}
                        accept=".mov,.mp4"
                      />
                    </div>
                  </div>
                </div>

                {/* Rigth Side of the form */}
                <div style={{ width: "500px", paddingTop: "5px" }}>
                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputItemName"
                    >
                      <b>Item Name</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="itemName"
                        placeholder="Enter item name"
                        type="text"
                        value={form.itemName}
                        onChange={handleInputChange}
                      />
                      {errors.itemName && touched.itemName ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.itemName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputMaterial"
                    >
                      <b>Material</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control w-100"
                        name="material"
                        as="select"
                        value={form.material}
                        onChange={handleInputChange}
                      >
                        <option>Gold</option>
                        <option>Silver</option>
                      </Field>
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputCategory"
                    >
                      <b>Category</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="category"
                        placeholder="--Select Category--"
                        as="select"
                        value={form.categroy}
                        onChange={handleInputChange}
                      >
                        <option disabled selected>--Select Category--</option>
                        <option>Ring</option>
                        <option>Necklace</option>
                        <option>Ear Ring</option>
                        <option>Pendant</option>
                        <option>Jewel Set</option>
                        <option>Diamonds</option>
                        <option>Bangles</option>
                        <option>Others</option>
                      </Field>
                      {errors.category && touched.category ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.category}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputGrossWeight"
                    >
                      <b>Gross Weight</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="grossWeight"
                        placeholder="Enter gross weight"
                        type="text"
                        value={form.grossWeight}
                        onChange={handleInputChange}
                      />
                      {errors.grossWeight && touched.grossWeight ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.grossWeight}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputWastage"
                    >
                      <b>Wastage</b>
                    </label>
                    <div className="col-sm-8">
                      <div className="input-group">
                        <Field
                          className="form-control"
                          name="wastage"
                          placeholder="Enter material wastage"
                          type="text"
                          value={form.wastage}
                          onChange={handleInputChange}
                        />
                        <span className="input-group-text">%</span>{" "}
                        {/* Display percentage symbol */}
                      </div>
                      {errors.wastage && touched.wastage ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.wastage}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputNetWeight"
                    >
                      <b>Net Weight</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="netWeight"
                        placeholder="Enter net weight"
                        type="text"
                        value={form.netWeight}
                        readOnly
                      />
                      {errors.netWeight && touched.netWeight ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.netWeight}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputNetWeight"
                    >
                      <b>Material Price</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="goldPrice"
                        placeholder="Enter material price"
                        type="text"
                        value={form.goldPrice}
                        onChange={handleInputChange}
                      />
                      {errors.goldPrice && touched.goldPrice ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.goldPrice}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputKarat"
                    >
                      <b>Karat</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control w-100"
                        name="karat"
                        as="select"
                        onChange={handleInputChange}
                      >
                        <option value="24">24k</option>
                        <option value="22">22k</option>
                        <option value="18">18k</option>
                        <option value="14">14k</option>
                      </Field>
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputNetWeight"
                    >
                      <b>Cost of Stone</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="costOfStone"
                        placeholder="Enter cost of stone"
                        type="text"
                        value={form.costOfStone}
                        onChange={handleInputChange}
                      />
                        {errors.costOfStone && touched.costOfStone ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.costOfStone}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputNetWeight"
                    >
                      <b>Manufacture Cost</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="manufactureCost"
                        placeholder="Enter manufacture cost"
                        type="text"
                        value={form.manufactureCost}
                        onChange={handleInputChange}
                      />
                      {errors.manufactureCost && touched.manufactureCost ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.manufactureCost}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputDescription"
                    >
                      <b>Description</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="description"
                        placeholder="Enter description"
                        value={form.description}
                        onChange={handleInputChange}
                        as="textarea"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div
                    className="form-group row mb-3 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="exampleInputNetWeight"
                    >
                      <b>Total Cost</b>
                    </label>
                    <div className="col-sm-8">
                      <Field
                        className="form-control"
                        name="totalCost"
                        placeholder="Enter Total cost"
                        type="text"
                        value={form.totalCost}
                        readOnly
                      />
                      {errors.totalCost && touched.totalCost ? (
                        <div className="text-danger blockquote-footer mt-1">
                          {errors.totalCost}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    style={{
                      marginLeft: "110px",
                      marginBottom: "100px",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      color="primary m-3 w-100"
                      type="submit"
                      style={{
                        backgroundColor: "#0ba6ff",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        marginTop: "20px",
                      }}
                    >
                      Save Item
                    </Button>

                    <Button
                      color="secondary m-3 w-75"
                      style={{
                        backgroundColor: "#fa5768",
                        marginTop: "20px",
                        marginLeft: "15px",
                      }}
                      onClick={handleCancel} // Attach the handleCancel function to the onClick event of the Cancel button
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddItems;
