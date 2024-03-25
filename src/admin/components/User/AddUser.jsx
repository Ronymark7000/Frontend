import { Formik, Form, Field } from "formik";
import { Button, Label } from "reactstrap";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../../services/UserValidation";
import { useEffect, useState } from "react";
import { emitInfoToast, emitSuccessToast } from "../../../site/components/Toast/EmitToast";

function AddUser({editUser, handleClosePopup}) {
    const navigate = useNavigate();
    
    const [form, setform] = useState({
      username: "",
      password: "",
      email: "",
      role: "User",
    });

    useEffect(() => {
        if (editUser) {
          setform((prev) => ({ ...prev, ...editUser }));
        }
      }, [editUser]);

    const forSubmit = async (values, { resetForm }) => {
        try {
          if (editUser) {
            await axiosInstance.put(`/user/${editUser?.userId}`, values);
            emitInfoToast("Updated User Successfully")
          } else {
            await axiosInstance.post(`/user`, values);
            emitSuccessToast("User Added Successfully")
          }
          navigate("/admin/user-dashboard");
          handleClosePopup();
          resetForm();
        } catch (error) {
          console.error(error);
        }
      };

    const handleCancel = () => {
        handleClosePopup(); // Close the popup
    };

    return (
        <>
            <div style={{ width: "500px", color:"#62605A", marginLeft:"120px", marginRight:"120px" }}>
                <Formik initialValues={ form } onSubmit={forSubmit} validationSchema={UserSchema} enableReinitialize>
                    {({ errors, touched }) => (
                    <Form style={{ width: "95%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop:"5px", marginBottom: "15px", fontSize: "35px"}}>
                                <b>User Form</b>
                            </Label>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputFirstName"><b>First Name</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="firstname" placeholder="Enter first name" type="text"/>
                                    {errors.firstname && touched.firstname ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.firstname}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputLastName"><b>Last Name</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="lastname" placeholder="Enter last name" type="text"/>
                                    {errors.lastname && touched.lastname ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.lastname}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputContact"><b>Contact</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="contact" placeholder="Enter contact number" type="text"/>
                                    {errors.contact && touched.contact ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.contact}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputEmail"><b>Email</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="email" placeholder="Enter e-mail address" type="text"/>
                                    {errors.email && touched.email ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.email}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputPassword"><b>Password</b></label>
                            <div className="col-sm-8">
                                <Field className="form-control" name="password" placeholder="Enter password" type="text"/>
                                    {errors.password && touched.password ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.password}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                            <label className="col-sm-4 col-form-label" htmlFor="exampleInputRole"><b>Role</b></label>
                            <div className="col-sm-8 d-flex justify-content-center align-items-center">
                                <Field className="form-control m-2 w-75" name="role" as="select">
                                    <option>User</option>
                                    <option>Admin</option>
                                </Field>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button color="primary m-2 w-100" type="submit" style={{ backgroundColor:"#0ba6ff", paddingLeft:"20px", paddingRight:"20px"}}>
                                Save
                            </Button>

                            <Button color="secondary m-2 w-75" onClick={handleCancel} style={{ backgroundColor:"#fa5768"}}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default AddUser;