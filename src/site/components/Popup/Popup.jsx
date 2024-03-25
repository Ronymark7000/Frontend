import { Dialog, DialogContent } from "@mui/material";
import React from "react";



export default function Popup(props) {
    const { children, openPopup, setOpenPopup } = props;
    
    return (
        <div className="popup1">
        <Dialog open={openPopup} maxWidth="md" sx={{ "& .MuiDialog-paper": { background: "linear-gradient(45deg, #B38E40, #FAFAB8, #CBB266, #FAFAB8)",borderRadius: "20px" } }}>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
        </div>
    );
}
