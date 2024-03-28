import { Formik, Form, Field } from "formik";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import empty1 from "../../../assets/empty.png";
import { Button } from "react-bootstrap";

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

    const handleImageChange = (event) => {
      const image = event.target.files[0];
      setForm((prev) => ({ ...prev, selectedImage: image }));
    };

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
                   
                      <div style={{ width:"490px", marginRight:"45px"}}>
                        <div style={{marginLeft:"70px", marginBottom:"15px"}}>
                        {form.selectedImage ? (
                          <img
                            src={URL.createObjectURL(form.selectedImage)}
                            alt="Selected Image"
                            style={{ width: "320px", height: "300px", marginTop: "10px" }}
                          />
                        ) : (
                          <img
                            src={empty1}
                            alt="Blank Image"
                            style={{ width: "320px", height: "300px", marginTop: "10px" }}
                          />
                        )}
                          <div style={{marginLeft:"100px"}}>
                            <p><b>Image Preview</b></p>
                          </div>
                        </div>

                        <div className="form-group row mb-3 " style={{ width: "100%" }}>
                    
                          <input style={{ marginLeft: "60px" }} className="form-control form-control-sm w-75" type="file" id="formFile" onChange={handleImageChange} />              
                        </div>


                        <div style={{marginLeft:"160px", marginTop:"52px"}}>
                            <p><b>Select 360 Image</b></p>
                          </div>

                        <div className="form-group row mb-3 " style={{ width: "100%" }}>
                          <input style={{ marginLeft: "60px" }} className="form-control form-control-sm w-75" type="file" id="formFile" />              
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
                            <Field className="form-control" name="description" placeholder="Enter description" as="textarea" rows={2} />
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

                    <div>
                      <Button color="primary m-3 w-100" type="submit" style={{ backgroundColor:"#0ba6ff", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px"}}>
                        Save Item
                      </Button>

                      <Button color="secondary m-3 w-75"  style={{ backgroundColor:"#fa5768", marginTop:"20px", marginLeft:"15px"}}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Formik>
            </div>
        </>
    );
};

export default AddItems;