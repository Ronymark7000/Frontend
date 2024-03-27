import { Formik, Form, Field } from "formik";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";

function AddItems({editItem}){
    const navigate = useNavigate();  

    const [form, setForm] = useState({
        itemName: "",
        material: "",
        karat:"",
        grossWeight:"",
        wastage:"",
        netWeight:"",
        goldPrice:"",
        costOfStome:"",
        manufactureCost:"",
        description: "",
        totalCost: "",
      }
    );

    useEffect(() => {
        if (editItem) {
          setform((prev) => ({ ...prev, ...editItem }));
        }
      },
    [editItem]);

    const forSubmit = async (values, { resetForm }) => {
        try {
          if (editItem) {
             await axiosInstance.put(`/item/${editItem?.itemCode}`, values);
           } else {
             await axiosInstance.post("/item", values);
           }
          navigate("/admin/item-dashboard");
          // Reset the form after successful submission
          resetForm();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div style={{ width: "1000px", color:"#62605A", marginLeft:"380px", marginRight:"120px", marginTop:"20px"}}>
                
                <Formik initialValues={ form } onSubmit={forSubmit} >
                  
                    <Form style={{width: "100%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop:"5px", marginBottom: "15px", fontSize: "35px"}}>
                                <b>Item Form</b>
                            </Label>
                        </div>

                  <div className="d-flex justify-content-between">
                  {/* Left side of the form */}
                   
                      <div style={{ width:"390px", marginRight:"45px", paddingTop:"10px"}}>
                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputItemName"><b>Item Name</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="itemName" placeholder="Enter item name" type="text"/>
                                    {/* {errors.itemName && touched.itemName ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.itemName}
                                    </div>
                                    ) : null} */}
                            </div>
                        </div>
                      </div>
                        
                    {/* Rigth Side of the form */}
                      <div style={{ width:"500px", paddingTop:"5px"}}>

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputItemName"><b>Item Name</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="itemName" placeholder="Enter item name" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div>    

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputMaterial"><b>Material</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control w-100" name="material" as="select">
                              <option>Gold</option>
                              <option>Silver</option>
                            </Field>
                          </div>
                        </div>

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputKarat"><b>Karat</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control w-100" name="karat" as="select">
                              <option>24K</option>
                              <option>22K</option>
                              <option>20K</option>
                              <option>18K</option>
                            </Field>
                          </div>
                        </div>

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputGrossWeight"><b>Gross Weight</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="grossWeight" placeholder="Enter gross weight" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputWastage"><b>Wastage</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="wastage" placeholder="Enter material wastage" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Net Weight</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="netWeight" placeholder="Enter net weight" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Gold Price</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="goldPrice" placeholder="Enter gold price" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Cost of Stone</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="costOfStone" placeholder="Enter cost of stone" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Manufacture Cost</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="manufactureCost" placeholder="Enter manufacture cost" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 

                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputDescription"><b>Description</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="description" placeholder="Enter description" as="textarea" rows={3} />
                            {/* {errors.description && touched.description ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.description}
                              </div>
                            ) : null} */}
                          </div>
                        </div>
                        
                        <div className="form-group row mb-2 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Total Cost</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="manufactureCost" placeholder="Enter manufacture cost" type="text"/>
                            {/* {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null} */}
                          </div>
                        </div> 



                      </div>
                    </div>

                    </Form>
                
                </Formik>
            </div>
        </>
    );
};

export default AddItems;