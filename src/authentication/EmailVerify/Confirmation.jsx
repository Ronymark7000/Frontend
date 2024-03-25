import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';

function Confirmation() {
  // Get the confirmation token from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const confirmationToken = searchParams.get('ctoken');

const [confirmationStatus, setConfirmationStatus] = useState(false);

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        // Make an API call to your backend to confirm the registration
        const response = await axiosInstance.post(`/auth/confirm-account?ctoken=${confirmationToken}`);
        
        // Assuming your backend responds with a success message or status code
        if (response.status === 200) {
          // Update confirmation status to 'success'
          setConfirmationStatus(true);
        } else {
          // Handle other status codes or error scenarios
          setConfirmationStatus(false);
        }
      } catch (error) {
        // Handle any errors
        console.error('Error confirming registration:', error);
        setConfirmationStatus(false);
      }
    };

    if (confirmationToken) {
        // Call confirmRegistration function only if confirmationToken exists
        confirmRegistration();
      }
    }, [confirmationToken]);

  return (
    <div className="App">
      {confirmationStatus && (
        <div>
          <h1>Succcess Registration...</h1>
          <p>Close this tab and login to access your shoping spree
          </p>
        </div>
      )}
    </div>
  );
}

export default Confirmation;