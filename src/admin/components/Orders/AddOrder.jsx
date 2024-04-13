import { Formik, Form, Field } from "formik";
import { Button, Label } from "reactstrap";
import axiosInstance from "../../../../axiosInstance";
import { useEffect, useState } from "react";
import { OrderSchema } from "../../../services/OrderValidation";
import { useNavigate } from "react-router-dom";

function AddOrder({editOrder}){
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().slice(0, 10);

    const [form, setform] = useState({
      orderDate: currentDate,
      customerName: "",
      contact: "",
      orderName: "",
      description: "",
      estimatedWeight: "",
      advancePayment: "",
      deliveryDate: null,
      orderStatus: false,    
    });

    useEffect(() => {
        if (editOrder) {
          setform((prev) => ({ ...prev, ...editOrder }));
        }
      }, [editOrder]);

      const forSubmit = async (values, { resetForm }) => {
        try {
          if (editOrder) {
            await axiosInstance.put(`/admin/order/${editOrder?.orderId}`, values);
          } else {
            await axiosInstance.post(`/admin/order`, values);
          }
          navigate("/admin/order-dashboard");
          // Reset the form after successful submission
          resetForm();
        } catch (error) {
          console.error(error);
        }
      };


  
    return(
        <>
            <div style={{width: "1090px", color: "#62605A", marginLeft: "350px", marginRight: "120px", marginTop: "40px", height: "700px", overflow: "auto"}}>
                <Formik  initialValues={ form } onSubmit={forSubmit} validationSchema={OrderSchema} enableReinitialize>
                {({ errors, touched }) => (
                    <Form style={{ width: "95%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop:"5px", marginBottom: "15px", fontSize: "35px"}}>
                                <b>Order Form</b>
                            </Label>
                        </div>

                    {/* For Order Date */}
                        <div className="orderDate"> 
                            <div style={{ width: "500px", marginLeft:"53.5%"}}>
                                <div className="form-group row mb-3 justify-content-end" style={{ width: "100%" }}>
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputOrderDate"><b>Order Date:</b></label>
                                    <div className="col-sm-6">
                                        <Field className="form-control" name="orderDate" placeholder="Select Order Date" type="date"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Customer Name and Contact Details */}
                        <div className="d-flex justify-content-between">

                            {/* Left Side of the form */}
                            <div style={{ width: "490px", marginRight: "45px" }}>
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-4 col-form-label" htmlFor="exampleInputCustomerName"><b>Customer Name:</b></label>
                                    <div className="col-sm-8">
                                        <Field className="form-control" name="customerName" placeholder="Enter customer name" type="text"/>
                                        {errors.customerName && touched.customerName ? (
                                            <div className="text-danger blockquote-footer mt-2">
                                            {errors.customerName}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side of the form */}
                            <div style={{ width: "500px"}}>
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%", marginLeft:"9.5%" }}>
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputcontact"><b>Contact No:</b></label>
                                    <div className="col-sm-6">
                                        <Field className="form-control" name="contact" placeholder="Enter contact number " type="text"/>
                                        {errors.contact && touched.contact ? (
                                            <div className="text-danger blockquote-footer mt-2">
                                            {errors.contact}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                        </div>

                    {/* For Description  */}
                        <div className="form-group row mb-3 justify-content-center" style={{ width: "40%"}}>
                            <label className="col-sm-6 col-form-label" htmlFor="exampleInputFirstName"><b>Order Name & Details:</b></label>
                        </div>

                        <div className="d-flex justify-content-between">

                            {/* Left Side of the form */}
                            
                            <div style={{ width: "490px", marginRight: "45px" }}>

                            <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputOrderName"><b>Order Name:</b></label>
                                    <div className="col-sm-9">
                                        <Field className="form-control" name="orderName" placeholder="Enter Order Name" type="text"/>
                                        {errors.orderName && touched.orderName ? (
                                            <div className="text-danger blockquote-footer mt-2">
                                            {errors.orderName}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group row mb-3" style={{ width: "100%" }}>
                                    <div className="col-sm-12">
                                        <Field className="form-control" 
                                            name="description" 
                                            placeholder="Enter order description..." 
                                            type="text"
                                            as="textarea"
                                            rows={8}/>
                                        {errors.description && touched.description ? (
                                            <div className="text-danger blockquote-footer mt-2">
                                            {errors.description}
                                            </div>
                                        ) : null}    
                                    </div>
                                </div>
                            </div>

                            {/* Right Side of the form */}
                            <div style={{ width: "500px"}}>

                                {/* Estimated Weight  */}
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-4 col-form-label" htmlFor="exampleInputEstimatedWeight"><b>Estimated Weight:</b></label>
                                    <div className="col-sm-8">
                                        <Field className="form-control" name="estimatedWeight" placeholder="Enter estimated weight in tola" type="text"/>
                                        {errors.estimatedWeight && touched.estimatedWeight ? (
                                            <div className="text-danger blockquote-footer mt-2">
                                            {errors.estimatedWeight}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                {/* Advance Pay Amount  */}
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-4 col-form-label" htmlFor="exampleInputAdvancePayment"><b>Advance Pay:</b></label>
                                    <div className="col-sm-8">
                                        <Field className="form-control" name="advancePayment" placeholder="Enter advance amount" type="text"/>
                                    </div>
                                </div>

                                {/* Delivery Date  */}
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-4 col-form-label" htmlFor="exampleInputDeliveryDate"><b>Delivery Date:</b></label>
                                    <div className="col-sm-8">
                                        <Field className="form-control" name="deliveryDate" placeholder="Enter estimated weight in tola" type="date"/>
                                    </div>
                                </div>

                                {/* Order Status  */}
                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                    <label className="col-sm-4 col-form-label" htmlFor="exampleInputOrderStatus"><b>Order Status:</b></label>
                                    <div className="col-sm-8">
                                    <Field
                                        className="form-control w-100"
                                        name="orderStatus"
                                        as="select"
                                    >
                                        <option value={false}>Pending</option>
                                        <option value={true}>Completed</option>
                                    </Field>
                                    </div>
                                </div>

                                <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                                <div className="d-flex justify-content-center mt-1">
                                    <Button color="primary m-2 w-50" type="submit" style={{ backgroundColor:"#0ba6ff", paddingLeft:"20px", paddingRight:"20px"}}>
                                        Add Order
                                    </Button>

                                    
                                </div>
                                </div>

                            </div>
                        </div>
                       
                    </Form>
                    )}
                </Formik>
                </div>
        </>
    )

}

export default AddOrder;