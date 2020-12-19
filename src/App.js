import { createContext, useState } from "react";
import "./App.css";
import Routes from "./components/Routes/Routes";

export const AuthContext = createContext();

function App() {
   const [loggedInUser, setLoggedInUser] = useState(false);

   return (
      <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <div className="App">
            <Routes />
         </div>
      </AuthContext.Provider>
   );
}

export default App;
