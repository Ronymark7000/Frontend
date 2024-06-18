import ESewaQR from "../../../assets/ESewaQR.jpeg";
import BankQR from "../../../assets/JyotiBikasBankQR.jpeg";
import eSewaLogo from "../../../assets/eSewaLogo.png";
import JyotiBankLogo from "../../../assets/JyotiBankLogo.png";

function Payment () {
    return (
        <>
        <div className="d-flex justify-content-between">
            <div style={{ 
                        width: "500px", 
                        marginRight: "45px", 
                        marginTop: "50px",
                        marginLeft: "50px",
                        minHeight:"80vh",
                        backgroundColor:"#E0DBD3"
                        }}>
                {/* QR Scan for bank account */}
                <br/>
                <div style={{marginLeft:"20%", marginTop:"30px"}}>
                    <img src={BankQR} alt="ESewaQR"/>
                </div>

                <div className="form-group row mt-4 mb-3" style={{paddingLeft:"30px", margin:"80px"}}>
                        <p style={{fontSize:"15px", marginLeft:"-1px"}}>
                        <img src={JyotiBankLogo} alt="ESewaLogo" style={{width:"250px"}}/>
                        </p>
                        <br/>

                        <div style={{marginTop:"10px"}}>
                            <p style={{fontSize:"20px", marginLeft:"35px"}}><b>SUNCHADI GAHANA</b></p>  
                            <p style={{fontSize:"18px", marginLeft:"-5px"}}>Acc.no: 02400100377632000001</p>
                        </div>
                        <br/>
                        <p style={{fontSize:"12px", marginLeft:"23px", marginTop:"45px"}}>Scan QR code for Payment via Banking</p>
                </div>
            </div>
            
            <div style={{ 
                        width: "500px", 
                        marginRight: "45px", 
                        marginTop: "50px",
                        marginLeft: "0px",
                        minHeight:"",
                        backgroundColor:"#E0DBD3"
                        }}>

                {/* QR Scan for Esewa */}
                <br/>
                <div style={{marginLeft:"20%", marginTop:"40px"}}>
                    <img src={ESewaQR} alt="ESewaQR"/>
                </div>

                <div className="form-group row mt-4 mb-3" style={{paddingLeft:"30px", margin:"80px"}}>
                        <p style={{fontSize:"15px", marginLeft:"55px"}}>
                        <img src={eSewaLogo} alt="ESewaLogo" style={{width:"130px"}}/>
                        </p>
                        <br/>

                        <div style={{marginTop:"10px"}}>
                            <p style={{fontSize:"20px", marginLeft:"35px"}}>Mana Ratna Shakya</p>  
                            <p style={{fontSize:"18px", marginLeft:"65px"}}>9851093577</p>
                        </div>
                        <br/>
                        <p style={{fontSize:"12px", marginLeft:"10px", marginTop:"45px"}}>Scan QR code for Payment through E-Sewa</p>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Payment;