// SignUpModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// import './SignUpModal.css';

const SignUpModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const handleCustomerButtonClick = () => {
    closeModal('customer'); // Close the modal and pass 'customer' as userType
    navigate('/signup');
  };

  const handleButtonClick = () => {
    closeModal('restaurant'); // Close the modal and pass 'restaurant' as userType
    navigate('/ownregister');
  };

  return (
    <div className="sign-up-modal">
      <div className="sign-up-modal-content">
        <h3 className="text-center">Sign Up As:</h3>
        <div className="text-center">
          <button className="btn btn-primary mx-2" onClick={handleCustomerButtonClick}>
            Customer
          </button>
          <button className="btn btn-primary mx-2" onClick={handleButtonClick}>
            Restaurant Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
