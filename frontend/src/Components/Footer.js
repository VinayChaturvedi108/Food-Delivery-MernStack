import React from 'react';
import  logo from '../image/chef.jpeg';
import  fb from '../image/fb.png';
import  insta from '../image/instagram.png';
import { NavLink } from 'react-bootstrap';

export default function Footer() {
  return (
    <div className='Down'>
      <footer >
        <div className="style">
            <div className="left">
                <a href="/">
                    <img src={logo} alt='Footer-logo'className='f_img'></img>
                </a>
            </div>
            <p>© 2023 Food Delivery. All Rights Reserved</p>
            <div className="id-link">
                <a href='https://m.facebook.com'>
                    <img src={fb} alt='facbooklogo' className='fb_img'></img>
                </a>
                <a href='https://www.instagram.com'>
                    <img src={insta} alt="instagramlogo" className='insta_img'></img>
                </a>
            </div>
        </div>
      </footer>
    </div>
  )
}
