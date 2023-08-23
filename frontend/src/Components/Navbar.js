import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../image/main-logo.jpg';
import userIcon from '../image/Profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import SignUpModal from './Comp-Buttons/SignupModelbtn';
import LoginModal from './Comp-Buttons/LoginModelbtn';

function Navbar({loggedIn, userType}) {
  
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (userType === 'Customer') {
      window.alert("Go to Your Profile");
      navigate('/profile');
    } else if (userType === 'Restaurant Owner') {
      window.alert("Go to Your Own Profile");
      navigate('/ownprofile');
    }
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  return (
    <div className='nav-shad'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/"><img src={logo} alt='logo' className='main_img'></img></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav " id='nav'>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
        </li>
        

        {loggedIn ? (
                <li className="nav-item">
                  <div className="nav-link" onClick={handleProfileClick}>
                    <img src={userIcon} alt='user' />
                  </div>
                </li>
              ) : (
                <> 
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={openLoginModal}>Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" onClick={openSignUpModal}>SignUp</NavLink>
                  </li>
                </>
              )}

      </ul>
    </div>
  </div>
</nav>
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}

    </div>
  )
}

export default Navbar
