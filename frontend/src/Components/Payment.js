import React from 'react';
import { useLocation } from 'react-router-dom';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
// import './PaymentPage.css'; // Import your CSS file

const PaymentPage = ({onSetLoggedIn}) => {
  const location = useLocation(); // Get the location object
  const data = location.state;
  const sendStatus = () =>{
    onSetLoggedIn(true)
  }

  data?sendStatus():console.log("data does not get from menu page")
  // Retrieve the passed data from location.state
  // useEffect(() => {
  //   // Fetch restaurant data from the backend API
  //   const fetchRestaurantData = async () => {
  //     try {
  //       const response = await fetch('/home_recuire_details', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       }); // Update the endpoint
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data)
  //         setDeliveryTime(data.restaurantDetails);
  //       } else {
  //         console.log('Error fetching restaurant data');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRestaurantData();
  // }, []);
 
  return (
    <div className="payment-page">
      <div className="content-sections">
        <div className="address-section">
          <div className="address">
        <span>
          <PinDropRoundedIcon/>
        </span>
          "Rohtak Gate, Vardan Hospital, Bhiwani, Haryana"
          </div>
          {/* ... */}
        {/* {deliveryTime.map((restaurantTime, i) => ( */}
        <div className="deliveryTime" >
          {data.time}
        </div>
        {/* ))} */}
        </div>

        <div className="payment-method-section">
          {/* ... */}
          <h3>Choose Payment Method </h3>
          <div className="pay">
            <button className="payment-button">Payment</button>
          </div>
        </div>
      </div>

      <div className="side-section">
        <h2>Payment Details</h2>
      <div className="BillDetails">

        <div className="item-list">
            <h4>Items:</h4>
            <ul>
            {data.itemsForPayment.map((item, index) => (
                <li key={index} className='payment-itemDetails'>
                  <h5>{item.name}</h5>
                  <p>{item.price}</p>
                </li>
            ))}
            </ul>
        </div>
        <div className="total-amount">
        {/* <div className="bill"> (This is the div for add more ammount in Total)
            <h5>Total Amount:</h5>
            <p>${data.totalAmount}</p>
          </div> */}
          <div className="bill">
            <h5>Total Amount:</h5>
            <p>${data.totalAmount}</p>
          </div>
        </div>
          </div>
          <div className="apply-Coupon">
            Apply Coupon
          </div>
          <div className="charityBox">
            <p>
            <input type='checkbox'className='checkbox'></input>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut nobis officia quibusdam, cupiditate dolorem tempora dolore temporibus, iste vero, nesciunt inventore! Facilis, eaque commodi deserunt veritatis perspiciatis similique dolorum sunt sed nobis quod explicabo corrupti.
            </p>
          </div>

        </div>
    </div>
  );
};

export default PaymentPage;
