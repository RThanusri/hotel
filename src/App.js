import "./App.css";

import Navbar from "./component/Navbar/Navbar";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="app">
      
      <UserNavbar/>
      
        <SRoutes />
        

      </div>
    
  );
}

export default App;
