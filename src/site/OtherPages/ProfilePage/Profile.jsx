import { useEffect, useState } from "react";
import ProfilePic from "../../../assets/ProfileDefault.svg"

function Profile({handleClosePopup}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userProfile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userProfile")));
    //eslint-disable-next-line
  }, [localStorage.getItem("userProfile")]);

  const handleCancel = () => {
    handleClosePopup(); // Close the popup
};

    return(
        <>
        
        <div>
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-7">
              <div className="card mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="text-center">
                      <p className="mb-0" style={{fontSize:"20px"}}><b>User Detials</b></p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user?.firstname} {user?.lastname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">+977 {user?.contact}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0">Role</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="text-muted mb-0">{user?.role}</p>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    src={ProfilePic}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  ></img>
                  <h5 className="my-3">{user?.firstname} {user?.lastname}</h5>
                  <p className="text-muted mb-4">{user?.email}</p>
                  <div className="d-flex justify-content-center mb-2">
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-outline-primary"
                      style={{width:"270px", marginLeft:"10%", marginRight:"10%"}}
                    >
                      Close
                    </button>

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
 
        </>
    )
}

export default Profile;