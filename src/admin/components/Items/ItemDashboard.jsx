import { Button } from "react-bootstrap";

function ItemDashboard(){
    return(
    <>
    <div>
        <div style={{marginLeft:"20px"}}>
            {/* <Link to={"/admin/add-user"}> */}
            <Button color="primary m-2 w-100" onClick={() => { setOpenPopup(true); setIsEditing(false); }} >Add User </Button>
            {/* </Link> */}
              
        </div>
    </div>
    </>
    );
};

export default ItemDashboard;