import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className='header'>
      <img src={logo} alt='' />
      <nav>
        <Link to='/shop'>Shop</Link>
        <Link to='/review'>Order Review</Link>
        <Link to='/orders'>Inventory Management</Link>
        <button onClick={() => setLoggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
