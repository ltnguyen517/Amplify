import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  document.body.style = 'background: white';
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login("demo@aa.io", "password"))
  }

  let errorDiv

  if (errors) {
    errorDiv = (
      <div className='errors' style={{ visibility: errors.length ? "visible" : "hidden", borderRadius: "100px" }}>
        <div className='icon'><i class="fa-solid fa-circle-exclamation"></i></div>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }} id='one-error'>{errors}</div>
        </div>
      </div>
    )
  }
  if (errors.length) {
    return (
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div id='continue'>
            To continue, log in to Amplify.
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
            <br />
          </div>
          <h3 style={{ width: "400px" }}><span>OR</span></h3>
          <br />
          <label htmlFor='email'>Email address</label>
          <div className='input-div'>
            <input
              name='email'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='input-div'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id='login-button-container'>
            <button id='login-button' type='submit'>LOG  IN</button>
          </div>
        </form>
        <div id="no-account">
          Don't have an account?
          <div id="signup-button-container">
            <button id="signup-button" onClick={(e) => history.push("/signup")}>SIGN UP FOR AMPLIFY</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='form-container'>
        <div id='continue'>
          To continue, log in to Amplify.
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
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email address</label>
          <div className='input-div'>
            <input
              name='email'
              type='text'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='input-div'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id='login-button-container'>
            <button id='login-button' type='submit'>LOG  IN</button>
          </div>
        </form>
        <div id="no-account">
          Don't have an account?
          <div id="signup-button-container">
            <button id="signup-button" onClick={(e) => history.push("/signup")}>SIGN UP FOR AMPLIFY</button>
          </div>
        </div>
      </div>
    )
  }
//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
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
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
}

export default LoginFormPage;
