import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import PaymentPage from './Payment';
// import './MenuPage.css'; // Make sure to create this CSS file

const MenuPage = ({onSetLoggedIn}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const homeData = location.state;
  // const [extractedMenuItems, setExtractedMenuItems] = useState([]);
  // const [ownData, setOwnData] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const restaurantMenus = {
    FoodTreat : [
    { name: 'Burger', price: 10, image: 'https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=2048x2048&w=is&k=20&c=wydysVEp52o1ULrj9XWI_f8M2lZ06qm8xlBl6GmjTSQ=' },
    { name: 'Combo+', price: 150, image: 'https://media.istockphoto.com/id/1326120476/photo/burger-combo-with-cola-soda-beverage-glass-and-disposable-french-fries-in-kraft-paper-box-on.jpg?s=2048x2048&w=is&k=20&c=nZIXQId9-OAcb5XeDCPJp9KGuzgk1OEKMBf4FNnxGmk='},
    { name: 'Frech Fries', price: 50, image: 'https://media.istockphoto.com/id/1316070459/photo/french-fries-and-fresh-rosemary-on-wooden-table-copy-space.jpg?s=2048x2048&w=is&k=20&c=a_hcOUtNlPGLZLw5mrFkU1G2GFjJtNo-bWNxxZcnI3M='},
    { name: 'Chowmin', price: 60, image: 'https://media.istockphoto.com/id/1144503197/photo/chicken-hakka-schezwan-noodles-served-in-a-bowl-with-chopsticks-selective-focus.jpg?s=2048x2048&w=is&k=20&c=Ncwd7SaEvmHZD7X2TYa1flUuORoCL49DWj3Wktv0Poc=' },
    // Add more food items here
    ],
    PizzaHut : [
      { name: 'Burger', price: 10, image: 'https://images.unsplash.com/photo-1617343267017-e344bdc7ec94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { name: 'Pizza', price: 150, image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80'},
    { name: 'Pizza', price: 150, image: 'https://images.unsplash.com/photo-1602932228690-c08241c46ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'},
    { name: 'Pizza', price: 150, image: 'https://media.istockphoto.com/id/1331340544/photo/pizza-with-yellow-and-green-bell-pepper-and-pepperoni.jpg?s=1024x1024&w=is&k=20&c=thcMzEDg8MHERaW8lZcoekSroeySpInD4aXvz19ECm0=' },
    { name: 'Pizza', price: 150, image: 'https://media.istockphoto.com/id/1043604390/photo/butter-chicken-pizza.jpg?s=1024x1024&w=is&k=20&c=kxTVFHnosD2cyvOcba9wQtyE7_jDSEONu9LRjE62MhQ=' },
    { name: 'Pizza', price: 150, image: 'https://media.istockphoto.com/id/1209036460/photo/pepperoni-pizza.jpg?s=1024x1024&w=is&k=20&c=-jkv_gYVqwVcQOFkeXmZvem-X6Qyv8MelRoP230StpY=' },

    
    // Add more food items here
    ],
    JagdambaRasoi : [
    // Add more food items here
    { name: 'Nan-Paneer', price: 10, image: 'https://media.istockphoto.com/id/1305516603/photo/shahi-paneer-or-paneer-kadai.jpg?s=2048x2048&w=is&k=20&c=CxempyVj0MQh8vSBWErp4oBF-mqw1i3284aC9IEyss8='},
    { name: 'Sahi Paneer', price: 10, image: 'https://media.istockphoto.com/id/666569534/photo/kadai-paneer-matar-or-jafrezi-curry-indian-food.jpg?s=1024x1024&w=is&k=20&c=GD4oL1nmC7a_AIviu-hPPO42NwaR1TU3yvXPeiqQppg='},
    { name: 'Dosa', price: 10, image: 'https://media.istockphoto.com/id/909906350/photo/masala-dosa-south-indian-food.jpg?s=2048x2048&w=is&k=20&c=4EPw7qJOI5oaOkYGsNig-fgGDQk0rhfInsqi-rKG7hE='},
    { name: 'Onion Pizza', price: 10, image: 'https://media.istockphoto.com/id/1209036460/photo/pepperoni-pizza.jpg?s=1024x1024&w=is&k=20&c=-jkv_gYVqwVcQOFkeXmZvem-X6Qyv8MelRoP230StpY='},
    { name: 'Capcicum Pizza', price: 10, image: 'https://media.istockphoto.com/id/1331340544/photo/pizza-with-yellow-and-green-bell-pepper-and-pepperoni.jpg?s=1024x1024&w=is&k=20&c=thcMzEDg8MHERaW8lZcoekSroeySpInD4aXvz19ECm0='},
    { name: 'Soya Pizza', price: 10, image: 'https://media.istockphoto.com/id/1043604390/photo/butter-chicken-pizza.jpg?s=1024x1024&w=is&k=20&c=kxTVFHnosD2cyvOcba9wQtyE7_jDSEONu9LRjE62MhQ='},
    { name: 'Corn Pizza', price: 10, image: 'https://media.istockphoto.com/id/1185698684/photo/closeup-of-organic-pizza-with-vegetables-and-cheese.jpg?s=1024x1024&w=is&k=20&c=KRP0Q7lkC0_FhKMaN3P86vbfxmXMJyV_0mIcFMGVtsk='}
    ],
    
  };
  
  
  
  const addToCart = (item) => {
    setShowCart(true);
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
  };
  
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 0) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
    }else{
        removeFromCart()
      }
  };

  // useEffect(() => {
    //   // Fetch data from backend API
  //   const fetchMenuData = async () => {
  //     try {
        
    //       ////////////////////////////////////////////////////////////////////////
  //       // Fetch menu item data from the backend API
  //       const response = await fetch('/showMenuItem', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token') 
  //         },
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data.itemDetails); // Log the fetched data
  //         setExtractedMenuItems(data.itemDetails); // Update state with fetched data
  //       } else {
  //         console.log('Error fetching menu items:', response.statusText); // Log other error statuses
  //       }
  //     } catch (error) {
  //       console.error('Error fetching menu items:', error); // Log any exceptions
  //     }
  //   };
  //   fetchMenuData();
  // }, [navigate]);

  
//   useEffect(() => {
//     const fetchProfileData = async () => {
//     try {
//       // Fetch user's profile data from the backend API
//       const response = await fetch('/ownprofile', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + localStorage.getItem('token') // Set the token in the Authorization header
//         },
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data)
//         setOwnData(data);
//         onSetLoggedIn(true)
//       } else if (response.status === 401) {
//         navigate('/ownlogin'); // Redirect to login page if not authenticated
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchProfileData();
// }, [navigate, onSetLoggedIn]);

const handleCheckout = (locate) => {
  // Calculate the total amount
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const time = locate
    // Construct the items array to pass to payment page
    const itemsForPayment = cart.map(item => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity
      };
    });

    // const time = deliveryTime;
    console.log(itemsForPayment, totalAmount,  time)
    const data = {itemsForPayment, totalAmount, time};
  
    const handleClick = () => {
      navigate('/paymentPage', { state: data });//////For Pass data one component to another component///////
    };
    data? handleClick():console.log("data is not available");
  };
  
  if (!homeData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="menu-page">
      <div className="restaurant-info">
        <h1>{homeData.RestaurantNamePass}</h1>
        <span className="opening-hours">{homeData.OpeningTimePass} - {homeData.ClosingTimePass}</span>
        <p>{homeData.deliveryTimePass}</p>
      </div>
      <div className="menu-items-container">
        {restaurantMenus[homeData.RestaurantNamePass] ? restaurantMenus[homeData.RestaurantNamePass].map((item, index) => (
        // {extractedMenuItems ? extractedMenuItems.map((item, index) => (
          <div className="menu-item-row" key={index}>
            <div className="menu-item-info">
              <div className="item-image">
                <span>
                    <img src={item.image} alt={item.name} />
                </span>
              </div>
              <div className="item-details">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-price">${item.price}</p>
              </div>
            </div>
            <button className="add-button" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>)):<p>Loading...</p>
}
        {showCart && (
          <div className="cart">


            <div className="cart-header">
                <div className="heading">
                    <h2>Cart Items</h2>
                </div>
                <div className="close-btn">
                    <button className="close-button" onClick={() => setShowCart(false)}>Close</button>
                </div>
            </div>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="quantity-controls">
                      <button className="quantity-button" onClick={() => decreaseQuantity(index)}>-</button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button className="quantity-button" onClick={() => increaseQuantity(index)}>+</button>
                    <span className="cart-item-price">${item.price * item.quantity}</span>
                    <div className="remove-btn">
                        <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
                    </div>

                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
            {/* <p style={{display:"none"}}>
              <PaymentPage  Total={cart.reduce((total, item) => total + item.price * item.quantity, 0)} />
            </p> */}
            <button className="checkout-button" onClick={()=> handleCheckout(homeData.deliveryTimePass)}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;

