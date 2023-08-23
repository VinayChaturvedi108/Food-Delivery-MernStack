import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useState } from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Home from './Components/Home';
import About from "./Components/About";
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import OwnerRegistration from './Components/OwnerSignup';
import OwnerLogin from './Components/OwnerLogin';
import Profile from './Components/Profile';
import OwnProfile from './Components/OwnerProfile';
import MenuPage from './Components/MenuPage';
// import Menu from './Components/Menu';
import PaymentPage from './Components/Payment';
import ForgetPassword from './Components/ForgetPassword';
import OwnerForgetPassword from './Components/OwnerForgetPassword';

// import UserLogo from './Components/UserLogo';



function App() {
  const [loggedIn, setLoggedIn] = useState(false)  
  const [userType, setUserType] =useState('');
  const [location, setLocation]= useState("");
  const [deliveryTime, setDeliveryTime]= useState("");

  const handleSetUserType = (type) =>{
    setUserType(type);
  }
  const handleSetLoggedIn = (status) =>{
    setLoggedIn(status);
  }
  const handleSetLocation = (address) =>{
    setLoggedIn(address);
  }
  const handleSetdeliveryTime = (min) =>{
    setLoggedIn(min);
  }
  return (
    <div className="App">
      <Router>
        <Navbar userType={userType} loggedIn={loggedIn}/>
        <div className="con">
        <Routes>
          <Route exact path="/" element={<Home onSetdelivery={handleSetdeliveryTime}/>}>
          </Route>
          <Route exact path="/about" element={<About/>}>
          </Route>
          <Route exact path="/contact" element={<Contact/>}> 
          </Route>
          <Route exact path="/login" element={<Login onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/signup" element={<Signup onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/ownregister" element={<OwnerRegistration onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/ownlogin" element={<OwnerLogin onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/profile" element={<Profile onSetLoggedIn={handleSetLoggedIn} onSetLocation={handleSetLocation}/>}>
          </Route>
          <Route exact path="/ownprofile" element={<OwnProfile onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/updatePassword" element={<ForgetPassword onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/updateOwnPassword" element={<OwnerForgetPassword onSetUserType={handleSetUserType} onSetLoggedIn={handleSetLoggedIn}/>}>
          </Route>
          <Route exact path="/showMenuItem" element={<MenuPage onSetLoggedIn={handleSetLoggedIn}/>}></Route>
          {/* <Route exact path="/showMenuItem" element={<Menu onSetLoggedIn={handleSetLoggedIn}/>}></Route> */}
          <Route exact path="/paymentPage" element={<PaymentPage location_1 = {location} deliveryTime={deliveryTime} onSetLoggedIn={handleSetLoggedIn}/>}></Route>

      </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
// App.js
