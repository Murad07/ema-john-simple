import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleSignOut,
  handleFBLogin,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from './loginManager';

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { form: { pathname: '/' } };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleOnBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  initializeLoginFramework();

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFBLogin().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {user.isSignIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {user.isSignIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt='' />
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type='checkbox'
        onChange={() => setNewUser(!newUser)}
        name='newUser'
        id=''
      />
      <label htmlFor='newUser'>New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            onBlur={handleOnBlur}
            required
          />
        )}
        <br />
        <input
          type='text'
          name='email'
          onBlur={handleOnBlur}
          placeholder='Your Email Address'
          required
        />
        <br />
        <input
          type='password'
          name='password'
          onBlur={handleOnBlur}
          id=''
          placeholder='Your Password'
          required
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && (
        <p style={{ color: 'green' }}>
          {newUser ? 'Create User' : 'Login In'} Succesfuly
        </p>
      )}
    </div>
  );
};

export default Login;
