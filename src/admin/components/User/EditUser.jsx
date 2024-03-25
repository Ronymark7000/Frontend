import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import AddUser from "./addUser";


function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await axiosInstance
      .get(`/user/${id}`)
      .then((res) => res?.data)
      .catch(() => null);

    if (!response) {
      navigate("/admin/user-dashboard");
    } else {

      setUser(response?.response);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    } else {
      navigate("/admin/user-dashboard");
    }
  }, [id]);
  if (user) return <AddUser editUser={user} />;
}

export default EditUser;