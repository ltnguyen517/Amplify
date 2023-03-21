import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp, login } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  document.body.style = 'background: white';

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorArr = [];

    if (username.length < 3 || username.length > 30) errorArr.push("Username must be between 3 and 30 characters")

    if (email.includes(".com") === false && email.includes(".io") === false && email.includes("@") === false) {
      errorArr.push("Invalid Email")
    }

    if (password !== confirmPassword) errorArr.push("Passwords must match!")
    setErrors(errorArr)

    if (errorArr.length) return

    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data)
    }
    if (errors.length) return
  };

  let errorDiv

  if (errors) {
    errorDiv = (
      <div className='errors' style={{ visibility: errors.length ? "visible" : "hidden", borderRadius: "100px" }}>
        <div className='icon'><i class="fa-solid fa-circle-exclamation"></i></div>
        <div>
          {errors.map((error, ind) => (
            <div style={{ marginTop: "10px", marginBottom: "10px" }} id='one-error' key={ind}>{error}</div>
          ))}
        </div>
      </div>
    )
  }
  if (errors.length) {
    return (
      <div className='signup-form-container'>
        <div className='logo-container' style={{ paddingTop: "10px" }}>

        </div>
        <br />
        <div>
          <h2 style={{ fontSize: "25px" }}>Sign up for free to start listening.</h2>
        </div>
        {
          errorDiv
        }
        <div id='demo-user-div'>
          <button id='demo-button'
            type="submit"
            onClick={async () => {
              await dispatch(login("demo@aa.io", "password"))
            }}>
            CONTINUE WITH DEMO USER
          </button>
        </div>
        <h3><span>OR</span></h3>
        <div style={{ paddingBottom: "15px", fontWeight: "700", fontSize: "18px" }}>
          Sign up with your email address
        </div>
        <form onSubmit={handleSubmit}>
          <label>What's your email address?</label>
          <div id="input-div">
            <input
              type='text'
              name='email'
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
          </div>
          <label>Create a password</label>
          <div id="input-div">
            <input
              type='password'
              name='password'
              placeholder='Create a password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
          </div>
          <label>Confirm password</label>
          <div id="input-div">
            <input
              type='password'
              name='confirm_password'
              placeholder='Enter your password again'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            ></input>
          </div>
          <label>What do you want your username to be?</label>
          <div id="input-div">
            <input
              type='text'
              name='username'
              placeholder='Enter a username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            ></input>
          </div>
          <div id="signup-button-container">
            <button id="signup-submit" type='submit'>Sign Up</button>
          </div>
        </form>
        <div id="already-have-account">
          Have an account?
          &nbsp;
          <span>
            <Link id="login-link" to="/login">Log in</Link>
            .
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='signup-form-container'>
        <div className='logo-container' style={{ paddingTop: "10px" }}>

        </div>
        <br />
        <div>
          <h2 style={{ fontSize: "25px" }}>Sign up for free to start listening.</h2>
        </div>
        <div id='demo-user-div'>
          <button id='demo-button'
            type="submit"
            onClick={async () => {
              await dispatch(login("demo@aa.io", "password"))
            }}>
            CONTINUE WITH DEMO USER
          </button>
        </div>
        <h3><span>OR</span></h3>
        <div style={{ paddingBottom: "15px", fontWeight: "700", fontSize: "18px" }}>
          Sign up with your email address
        </div>
        <form onSubmit={handleSubmit}>
          <label>What's your email address?</label>
          <div id="input-div">
            <input
              type='text'
              name='email'
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
          </div>
          <label>Create a password</label>
          <div id="input-div">
            <input
              type='password'
              name='password'
              placeholder='Create a password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
          </div>
          <label>Confirm password</label>
          <div id="input-div">
            <input
              type='password'
              name='confirm_password'
              placeholder='Enter your password again'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            ></input>
          </div>
          <label>What do you want your username to be?</label>
          <div id="input-div">
            <input
              type='text'
              name='username'
              placeholder='Enter a username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            ></input>
          </div>
          <div id="signup-button-container">
            <button id="signup-submit" type='submit'>Sign Up</button>
          </div>
        </form>
        <div id="already-have-account">
          Have an account?
          &nbsp;
          <span>
            <Link id="login-link" to="/login">Log in</Link>
            .
          </span>
        </div>
      </div>
    );
  }
//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//         </ul>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
}

export default SignupFormPage;
