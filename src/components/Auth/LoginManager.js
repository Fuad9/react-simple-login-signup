import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
   if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
   }
};

// to configure JWT token
const storeAuthToken = () => {
   firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
         sessionStorage.setItem("token", idToken);
      })
      .catch((error) => {
         console.log(error);
      });
};

// google sign in
export const handleGoogleSignIn = () => {
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
         const signedInUser = {
            isSignedIn: true,
            name: res.user.displayName,
            email: res.user.email,
            photo: res.user.photoURL,
            success: true,
         };
         storeAuthToken();
         return signedInUser;
      })
      .catch((err) => {
         console.log(err);
         console.log(err.message);
      });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
         const newUserInfo = res.user;
         newUserInfo.error = "";
         newUserInfo.success = true;
         updateUserName(name);
         // verifyEmail();
         storeAuthToken();
         return newUserInfo;
      })
      .catch((error) => {
         const newUserInfo = {};
         newUserInfo.error = error.message;
         newUserInfo.success = false;
         return newUserInfo;
      });
};

// to update use profile
const updateUserName = (name) => {
   firebase
      .auth()
      .currentUser.updateProfile({
         displayName: name,
      })
      .then(() => {
         console.log("user name updated successfully");
      })
      .catch((err) => {
         console.log(err);
      });
};

//to sign in user
export const signInWithEmailAndPassword = (email, password) => {
   return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
         const newUserInfo = res.user;
         newUserInfo.success = true;
         newUserInfo.error = "";
         return newUserInfo;
      })
      .catch((error) => {
         const newUserInfo = {};
         newUserInfo.error = error.message;
         newUserInfo.success = false;
         return newUserInfo;
      });
};

// sign out
export const handleSignOut = () => {
   return firebase
      .auth()
      .signOut()
      .then(() => {
         const signedOutUser = {
            isSignedOut: false,
            name: "",
            email: "",
            photo: "",
            error: "",
            success: false,
         };
         return signedOutUser;
      })
      .catch((err) => {
         console.log(err);
         console.log(err.message);
      });
};

// // verification email
// const verifyEmail = () => {
//   const user = firebase.auth().currentUser;

//   user
//     .sendEmailVerification()
//     .then(() => {
//       console.log("verification email sent successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log(err.message);
//     });
// };
