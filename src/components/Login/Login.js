import "./login.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRef, useState } from "react";
const Login = (props) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailSignupRef = useRef();
  const passwordSignupRef = useRef();
  const [clicked, setClicked] = useState(false);
  const provider = new GoogleAuthProvider();
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        if (auth.currentUser.email) {
          sessionStorage.setItem("data", auth.currentUser.email);
        }
        const user = userCredential.user;
        console.log(user);
        props.login();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clickHandler = () => {
    setClicked(true);
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (passwordSignupRef.current.value.length <= 6) {
      alert("weak");
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      emailSignupRef.current.value,
      passwordSignupRef.current.value
    )
      .then((userCredential) => {
        if (auth.currentUser.email) {
          sessionStorage.setItem("data", auth.currentUser.email);
        }
        const user = userCredential.user;
        props.login();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const loginhandler = () => {
    setClicked(false);
  };
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (auth.currentUser.email) {
          sessionStorage.setItem("data", auth.currentUser.email);
        }

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(user);
        props.login();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      <div className="image">
        <img
          src="https://wallpaperaccess.com/full/271873.jpg"
          alt=""
          className="backgroundImage"
        />
      </div>
      {!clicked ? (
        <form onSubmit={submitHandler} className="loginForm">
          <span className="heading">Log in</span>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="username"
            className="email"
            ref={emailRef}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="password"
            ref={passwordRef}
            required
          />
          <div className="googleLogin" onClick={googleLogin}>
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt=""
            />

            <span>Sign in with Google</span>
          </div>
          <button className="loginButton">Log in</button>
          <span className="already">
            Don't have account? <b onClick={clickHandler}>Sign up</b>
          </span>
        </form>
      ) : (
        <form onSubmit={signupHandler} className="loginForm">
          <span className="heading">Register</span>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="username"
            className="email"
            ref={emailSignupRef}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="password"
            ref={passwordSignupRef}
            required
          />
          <button className="signupButton">Sign up</button>
          <span className="already">
            Already have account? <b onClick={loginhandler}>Login</b>
          </span>
        </form>
      )}
    </>
  );
};

export default Login;
