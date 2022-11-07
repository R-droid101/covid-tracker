import "./login.css";
import React from "react";
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
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailSignupRef = useRef();
  const passwordSignupRef = useRef();
  const [clicked, setClicked] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

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

  // const submitHandler1 = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(
  //     auth,
  //     emailRef.current.value,
  //     passwordRef.current.value
  //   )
  //     .then((userCredential) => {
  //       if (auth.currentUser.email) {
  //         sessionStorage.setItem("data", auth.currentUser.email);
  //       }
  //       const user = userCredential.user;
  //       console.log(user);
  //       props.login();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   navigate("/NGOhomepage");
  // };

  const clickHandler = () => {
    setClicked(true);
  };
  const clickHandler1 = () => {
    setClicked(true);
  };

  const signupHandler = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      emailSignupRef.current.value,
      passwordSignupRef.current.value
    )
      .then((userCredential) => {
        fetch("http://localhost:8800/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email: emailSignupRef.current.value,
            password: passwordSignupRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => console.log(res));

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

  const signupHandler1 = (e) => {
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
    navigate("/NGOhomepage");
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
        const user = result.user;
        console.log(user);
        props.login();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="imageDiv">
        <img
          src="https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?w=1800&t=st=1666184041~exp=1666184641~hmac=38e7627434b9c8bbbea94f2e098bd828e1a2e6cb6e7fd4b6273c4702d8c55229"
          alt=""
          className="backgroundImage"
        />
      </div>

      {!clicked ? (
        <>
          <form onSubmit={submitHandler} className="loginForm">
            <span className="heading">Log in as user</span>
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

              <span className="googleButton">Sign in with Google</span>
            </div>
            <button className="loginButton">Log in</button>
            <span className="already">
              Don't have account? <b onClick={clickHandler}>Sign up</b>
            </span>
          </form>
          {/* ###########################3333333333333333########################################## */}
          {/* <form onSubmit={submitHandler1} className="loginForm1">
            <span className="heading">Log in as an NGO</span>
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
              Don't have account? <b onClick={clickHandler1}>Sign up</b>
            </span>
          </form> */}
          {/* ##################################################################################### */}
        </>
      ) : (
        <>
          <form onSubmit={signupHandler} className="loginForm">
            <span className="heading">Register as user</span>
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

          {/* ########################################################################################### */}
          {/* <form onSubmit={signupHandler1} className="loginForm1">
            <span className="heading">Register as an NGO</span>
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
          </form> */}
        </>
      )}
    </>
  );
};

export default Login;
