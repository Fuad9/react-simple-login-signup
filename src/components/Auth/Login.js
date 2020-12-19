import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import "./Login.css";
import {
   createUserWithEmailAndPassword,
   handleGoogleSignIn,
   handleSignOut,
   initializeLoginFramework,
   signInWithEmailAndPassword,
} from "./LoginManager";
import { useForm } from "react-hook-form";
import GoogleIcon from "./GoogleIcon.png";

export const Login = () => {
   // const [newUser, setNewUser] = useState(false);
   const { register, handleSubmit, errors } = useForm();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const [user, setUser] = useState({
      isSignedIn: false,
      name: "",
      email: "",
      photo: "",
      password: "",
      confirmPassword: "",
   });

   // context api
   const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

   initializeLoginFramework();

   const history = useHistory();
   const location = useLocation();
   let { from } = location.state || { from: { pathname: "/" } };

   // to sign in via google
   const googleSignIn = () => {
      handleGoogleSignIn().then((res) => {
         handleResponse(res, true);
      });
   };

   // to sign out from all account
   const signOut = () => {
      handleSignOut().then((res) => {
         handleResponse(res, false);
      });
   };

   const handleBlur = (e) => {
      let isFieldValid = true;
      const { name, value: defaultValue } = e.target;
      if (name === "name") {
         setName(defaultValue);
      }
      if (name === "email") {
         setEmail(defaultValue);
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if (name === "password") {
         setPassword(defaultValue);
         const isPasswordValid = e.target.value.length > 6;
         const passwordHasNumber = /\d{1}/.test(e.target.value);
         isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if (name === "confirmPassword") {
         setConfirmPassword(defaultValue);
         const isPasswordValid = e.target.value.length > 6;
         const passwordHasNumber = /\d{1}/.test(e.target.value);
         isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if (isFieldValid) {
         const newUserInfo = { ...user };
         newUserInfo[e.target.name] = e.target.value;
         setUser(newUserInfo);
      }
   };

   const handleSignUp = () => {
      if (password === confirmPassword) {
         if (user.name && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password).then((res) => {
               handleResponse(res, true);
            });
         }
      } else {
         alert("pasword didn't matched");
      }
   };

   const handleSignIn = () => {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
         handleResponse(res, true);
         console.log(res.displayName);
      });
   };

   const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if (redirect) {
         history.push("/");
      }
   };

   return (
      <>
         {user.isSignedIn ? (
            <button onClick={signOut}>Sign out</button>
         ) : (
            <div className="auth my-3">
               <button onClick={googleSignIn}>
                  <img src={GoogleIcon} alt="" />
                  Continue with Google
               </button>
            </div>
         )}

         {!loggedInUser ? (
            <div className="container">
               <form onSubmit={handleSubmit(handleSignUp)}>
                  <p className="text-danger">
                     * Your password must be at least six characters long and must have at least one
                     number
                  </p>
                  <div className="inputBox">
                     <input
                        ref={register({ required: true })}
                        onBlur={handleBlur}
                        type="text"
                        name="name"
                        defaultValue={name}
                        placeholder="First Name"
                     />
                     {errors.name && <span className="text-danger">Name is required</span>}
                  </div>

                  <div className="inputBox">
                     <input
                        onBlur={handleBlur}
                        type="text"
                        name="name"
                        defaultValue={name}
                        placeholder="Last Name"
                     />
                  </div>

                  <div className="inputBox">
                     <input
                        ref={register({ required: true })}
                        onBlur={handleBlur}
                        type="email"
                        name="email"
                        defaultValue={email}
                        placeholder="Username or Email"
                     />
                     {errors.email && <span className="text-danger">Email is required</span>}
                  </div>

                  <div className="inputBox">
                     <input
                        ref={register({ required: true })}
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        defaultValue={password}
                        placeholder="Enter Your Password"
                     />
                     {errors.password && <span className="text-danger">Password is required</span>}
                  </div>
                  <div className="inputBox">
                     <input
                        ref={register({ required: true })}
                        onBlur={handleBlur}
                        type="password"
                        name="confirmPassword"
                        defaultValue={confirmPassword}
                        placeholder="Confirm Password"
                     />
                     {errors.confirmPassword && (
                        <span className="text-danger">
                           Please confirm your password before submitting
                        </span>
                     )}
                  </div>

                  <input type="submit" value="SignUp" />
                  <br />
                  <label className="label" onClick={() => setLoggedInUser(true)}>
                     Already have an account?
                  </label>
               </form>
            </div>
         ) : (
            <div className="container">
               <form onSubmit={handleSubmit(handleSignIn)}>
                  <div className="inputBox">
                     <input
                        md="12"
                        lg="12"
                        onBlur={handleBlur}
                        type="email"
                        name="email"
                        defaultValue={email}
                        ref={register({ required: true })}
                        placeholder="Email"
                     />
                     {errors.email && <span className="text-danger">Email is required</span>}
                  </div>

                  <div className="inputBox">
                     <input
                        md="12"
                        lg="12"
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        defaultValue={password}
                        ref={register({ required: true })}
                        placeholder="Password"
                     />
                     {errors.password && <span className="text-danger">Password is required</span>}
                  </div>

                  <input type="submit" value="Login" />
                  <br />
                  <span className="label mt-2" onClick={() => setLoggedInUser(false)}>
                     Create New Account
                  </span>
               </form>
            </div>
         )}
         <p className="text-danger">{user.error}</p>
         {user.success && (
            <p className="text-success">Account Created successfully, you can now login</p>
         )}
      </>
   );
};

export default Login;
