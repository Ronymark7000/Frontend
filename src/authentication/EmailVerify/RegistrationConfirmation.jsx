import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';

const RegistrationConfirmation = ({ confirmationToken }) => {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        // Make an API call to your backend to confirm the registration
        const response = await axiosInstance.get(`/auth/confirm-account`);
        
        // Assuming your backend responds with a success message or status code
        if (response.status === 200) {
          // Update confirmation status to 'success'
          setConfirmationStatus('success');
        } else {
          // Handle other status codes or error scenarios
          setConfirmationStatus('error');
        }
      } catch (error) {
        // Handle any errors
        console.error('Error confirming registration:', error);
        setConfirmationStatus('error');
      }
    };

    if (confirmationToken) {
      // Call confirmRegistration function only if confirmationToken exists
      confirmRegistration();
    }
  }, [confirmationToken]);

  // Render different content based on confirmation status
  return (
    <div>
      {confirmationStatus === 'pending' && (
        <div>
          <h1>Confirming Registration...</h1>
          <p>Please wait while we confirm your registration.</p>
        </div>
      )}
      {confirmationStatus === 'success' && (
        <div>
          <h1>Registration Confirmed!</h1>
          <p>Your account has been successfully confirmed.</p>
          {/* You can also add a button or link to redirect the user to another page */}
        </div>
      )}
      {confirmationStatus === 'error' && (
        <div>
          <h1>Registration Confirmation Error</h1>
          <p>There was an error confirming your registration. Please try again later.</p>
          {/* You can also provide an option to retry confirmation */}
        </div>
      )}
    </div>
  );
};