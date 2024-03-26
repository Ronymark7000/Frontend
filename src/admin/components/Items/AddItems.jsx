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
            <div style={{ width: "500px", color:"#62605A", marginLeft:"120px", marginRight:"120px" }}>
                <Formik initialValues={ form } onSubmit={forSubmit} >
                   
                    <Form style={{ width: "95%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop:"5px", marginBottom: "15px", fontSize: "35px"}}>
                                <b>Item Form</b>
                            </Label>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputFirstName"><b>First Name</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="firstname" placeholder="Enter first name" type="text"/>
                                
                            </div>
                        </div>

                    </Form>
                
                </Formik>
            </div>
        </>
    );
};

export default AddItems;