import React from 'react';
import { useNavigate } from 'react-router-dom';

// import './SignUpModal.css';

const LoginModal = ({ closeModal }) => {
    const navigate = useNavigate();
    const handleCustomerButtonClick = () => {
      navigate('/login' ); // Navigate to the Login page 
    };
    const handleButtonClick = () => {
      navigate('/ownlogin'); // Navigate to the owner Login page
    };

  return (
    <>
    <div className="sign-up-modal">
      <div className="sign-up-modal-content">
        <h3 className="text-center">Log In As:</h3>
        <div className="text-center">
          <button id='bbtn' className="btn btn-primary mx-2" onClick={() => {
            closeModal('customer');
            handleCustomerButtonClick ();
            }}>
            Customer
          </button>
          <button id='bbtn' className="btn btn-primary mx-2" onClick={() => {
            closeModal('restaurant'); 
            handleButtonClick();
            }}>
            Restaurant Owner
          </button>
        </div>
      </div>
    </div>
            </>
  );
};

export default LoginModal;

