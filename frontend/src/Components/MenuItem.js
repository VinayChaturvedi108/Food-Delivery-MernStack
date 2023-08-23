import React from 'react'

const MenuItem = ({onSetLoggedIn, item}) => {
  const pass = ()=>{
    onSetLoggedIn(true)
  }
    // console.log(tokn)
  return (
    <div className="menu-item-row">
      <div className="menu-item-info">
        <div className="item-image">
          {<img src={item.itemImage} alt={item.itemName} /> ? pass : null}
        </div>
        <div className="item-details">
          <h2 className="item-name">{item.itemName}</h2>
          <p className="item-price">${item.itemPrice}</p>
        </div>
      </div>
    </div>
  );
};
export default MenuItem