import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import {NavLink} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarsIcon from '@mui/icons-material/Stars';
// import slider1 from "../image/Slider-3.webp";
// import slider2 from "../image/Slider-2.webp";
// import slider3 from "../image/Slider-1.webp";
// import slider4 from "../image/Slider-4.webp";
// import slider5 from "../image/Slider-5.webp";
// import slider6 from "../image/Slider-6.webp";
// import image1 from "../image/image1.jpg";
// import image2 from "../image/image2.webp";
// import image3 from "../image/image3.webp";
// import image4 from "../image/image4.jpeg";


const Home = ({onSetdelivery}) => {
  // const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch restaurant data from the backend API
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('/home_recuire_details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }); // Update the endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setRestaurantData(data.restaurantDetails);
        } else {
          console.log('Error fetching restaurant data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurantData();
  }, []);
////////////**********This is Method One from many For Passing value**********///////////////
  const handleGoOnMenu = (restaurantName,email, openingTime, closingTime, deliveryTime) => {
    // Calculate the total amount

      const RestaurantNamePass = restaurantName;
      const EmailPass = email;
      const OpeningTimePass = openingTime;
      const ClosingTimePass = closingTime;
      const deliveryTimePass = deliveryTime
      console.log(RestaurantNamePass, EmailPass, ClosingTimePass, OpeningTimePass, deliveryTimePass)
      const data = {RestaurantNamePass, EmailPass,OpeningTimePass, ClosingTimePass, deliveryTimePass};
    
      const handleClick = () => {
        navigate('/showMenuItem', { state: data });//////For Pass data one component to another component///////
      };
      data? handleClick():console.log("data is not available");
    };
    

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <div className="first-section">
        <h1 className='welcome-text'>Welcome to Food Delivery!</h1>
        <p className='welcome-text'>Order delicious food from your favorite restaurants.</p>
          <div className="slider-container" >
            <Slider {...sliderSettings}>

            <div className="slider-item ">
              <NavLink to="/collections/56407?type=rcv2">
                <img  className="first-imgmr" style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/a12ee9373f3069620189cfc2ec9a2d29" alt="Slider Image 1" />
              </NavLink>
            </div>
            <div className="slider-item">
              <NavLink to="/collections/56413?type=rcv2">
                <img style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/bacfa330da4d140c4c049d8beed9fdd6"  />
              </NavLink>
            </div>
            <div className="slider-item">
              <NavLink to="/collections/56414?type=rcv2">
                <img style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/44770208829cccbe2039cc3f72914c86"  alt="Slider Image 3" />
              </NavLink>
            </div>
            <div className="slider-item">
              <NavLink to="/collections/56410?type=rcv2">
                <img style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/v1672128074/creativetopical/Radhe_Dhokla_60.png"  alt="Slider Image 4" />
              </NavLink>
            </div>
            <div className="slider-item">
            <NavLink to="/collections/56421?type=rcv2">
              <img style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/v1672144142/creativetopical/Urban_Punjab_60.png"  alt='Slider Image 5'/></NavLink>
            </div>
            <div className="slider-item">
            <NavLink to="/collections/11740?type=rcv2">
              <img style={{width:"450px", height:"300px", marginRight:"15px", marginLeft:"15px", borderRadius:"22px"}} src= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/071d07e5d5deb5e3da47feef18fb14fc"  alt="Slider Image 6"/></NavLink>
            </div>
            </Slider>
          </div>
        </div>
        {/* ///////// Main Page ////////// */}
        <div className="page">
        <div className="row-container">
          {restaurantData.map((restaurant, index) => (
            // <NavLink to='/menuPage'>
            <div className="image-container" key={index} onClick={()=>handleGoOnMenu(restaurant.restaurantName, restaurant.email, restaurant.openingTime, restaurant.closingTime, restaurant.deliveryTime)}>
              <div className="image-section">
                {/* Render the restaurant's profileImg */}
                <img src={restaurant.profileImg} alt="Restaurant Profile" />
              </div>
              <div className="info-section">
                <h3>{restaurant.restaurantName}</h3>
                <p className="rateIcon">
                  <StarsIcon/>4
                </p>
                <p>{restaurant.deliveryTime}</p>
                {/* Other restaurant details */}
              </div>
            </div>
            // </NavLink>
          ))}
        </div>
      </div>
          {/* <div className="page">
            <div className="row-container">
              <div className="image-container">
                <div className="image-section">
                  <img src={image1} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image2} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image3} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image4} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>
            </div>
            <div className="row-container">
              <div className="image-container">
                <div className="image-section">
                  <img src={image1} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image2} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image3} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image4} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>
            </div>            
            <div className="row-container">
              <div className="image-container">
                <div className="image-section">
                  <img src={image1} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image2} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image3} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>

              <div className="image-container">
                <div className="image-section">
                  <img src={image4} alt="Food Image" />
                </div>
                <div className="info-section">
                  <h4>Food Name</h4>
                  <br></br>
                  <h4>Restaurant Name</h4>
                  <p>Delivery Timing</p>
                </div>
              </div>
            </div>
          </div> */}

            {/* <img src = {logo1} alt="img"></img>
            <img src = {logo2} alt="img"></img>
            <img src = {logo3} alt="img"></img>
            <img src = {logo4} alt="img"></img> */}
    </div>
  );
};

export default Home;
