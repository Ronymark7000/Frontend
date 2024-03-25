import { Formik, Form, Field } from "formik";
import { Button, Label } from "reactstrap";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../../services/UserValidation";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function AddUser({editUser}) {
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
          } else {
            await axiosInstance.post(`/user`, values);
          }
          navigate("/admin/user-dashboard");
          // Reset the form after successful submission
          resetForm();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div style={{ width: "1000px", color:"#62605A"}}>
                <Formik initialValues={ form } onSubmit={forSubmit} validationSchema={UserSchema} enableReinitialize>
                    {({ errors, touched }) => (
                    <Form style={{ width: "100%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop: "20px", fontSize: "35px"}}>
                                <b>Add User Details</b>
                            </Label>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputFirstName"><b>First Name</b></label>
                            <div className="col-sm-6">
                                <Field className="form-control" name="firstname" placeholder="Enter first name" type="text"/>
                                    {errors.firstname && touched.firstname ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.firstname}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputLastName"><b>Last Name</b></label>
                            <div className="col-sm-6">
                                <Field className="form-control" name="lastname" placeholder="Enter last name" type="text"/>
                                    {errors.lastname && touched.lastname ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.lastname}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputContact"><b>Contact</b></label>
                            <div className="col-sm-6">
                                <Field className="form-control" name="contact" placeholder="Enter contact number" type="text"/>
                                    {errors.contact && touched.contact ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.contact}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputEmail"><b>Email</b></label>
                            <div className="col-sm-6">
                                <Field className="form-control" name="email" placeholder="Enter e-mail address" type="text"/>
                                    {errors.email && touched.email ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.email}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputPassword"><b>Password</b></label>
                            <div className="col-sm-6">
                                <Field className="form-control" name="password" placeholder="Enter password" type="text"/>
                                    {errors.password && touched.password ? (
                                    <div className="text-danger blockquote-footer mt-1">
                                        {errors.password}
                                    </div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "80%" }}>
                            <label className="col-sm-2 col-form-label" htmlFor="exampleInputRole"><b>Role</b></label>
                            <div className="col-sm-6 d-flex justify-content-center align-items-center">
                                <Field className="form-control m-2 w-75" name="role" as="select">
                                    <option>User</option>
                                    <option>Admin</option>
                                </Field>
                            </div>
                        </div>

                        <div>
                        <Button color="primary m-2 w-100" type="submit">
                            Save
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