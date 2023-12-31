import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import ConfirmEmail from "./components/ConfirmEmail";
import Contact from "./components/Contact";
import Redirect from "./components/Redirect";
import ResetPassword from "./components/ResetPassword";
import PasswordRecovery from "./components/PasswordRecovery";
import ChangePassword from "./components/ChangePassword";
import { UserContext, VoucherContext } from "./components/UserContext";
import { useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import axios from "axios";
/* import Footer from "./components/Footer"; */
import VoucherSearch from "./components/VoucherSearch";
import CategoryPage from "./components/CategoryPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SelectVoucherPage from "./components/SelectVoucherPage";
import GreetingCard from "./components/GreetingCard";
import Cart from "./components/Cart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import HotGiftsCards from "./components/HotGiftsCards"
/* import PaymentCustomize from "./components/PaymentCustomize" */
import BottomNav from "./components/BottomNav";


function App() {
  const initialOptions = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "CAPTURE"
  };

  const location = useLocation();

  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [click, setClick] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  let token;

  if (JSON.parse(localStorage.getItem("my-profile"))) {
    token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId; // Google token
  } else {
    token = JSON.parse(localStorage.getItem("my-app-token")); // Our token
  }

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* console.log("app email", email); */

  useEffect(() => {
    if (token !== null) {
      axios
        .get(
          `${process.env.REACT_APP_BE_URL}/api/user/authorize-user`,
          configuration
        )
        .then((res) => {
          setName(res.data.name);
          setAuthenticated(true);
          setUserId(res.data.userId);
          res.data.avatar
            ? setAvatar(res.data.avatar)
            : setAvatar(
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              );
        })
        .catch((err) => {
          if (err.response.status === 401)
            localStorage.removeItem("my-app-token");
          localStorage.removeItem("my-profile");
          console.log(err.message);
        });
    }
  }, []);
  

  const logoutHandler = () => {
    
    setAuthenticated(false);
    localStorage.removeItem("my-profile");
    localStorage.removeItem("my-app-token");
    setName("");
    setAvatar("");
    setClick(false);
  };

  return (

    <PayPalScriptProvider options={initialOptions}>
<UserContext.Provider
      value={[
        { authenticated: authenticated, setAuthenticated: setAuthenticated },
        { name: name, setName: setName },
        { userId: userId, setUserId: setUserId },
        { email: email, setEmail: setEmail },
        { avatar: avatar, setAvatar: setAvatar },
        { logoutHandler: logoutHandler },
        { click: click, setClick: setClick },
      ]}
    >
      <VoucherContext.Provider
        value={[
          {
            selectedVoucher: selectedVoucher,
            setSelectedVoucher: setSelectedVoucher,
          },
          { selectedPrice: selectedPrice, setSelectedPrice: setSelectedPrice },
          { selectedImage: selectedImage, setSelectedImage: setSelectedImage },
        ]}
      >
        {location.pathname !== "/" && <NavBar />}

        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/reset-password/:email/:token"
              element={<PasswordRecovery />}
            />
            <Route path="/voucher/search" element={<VoucherSearch />} />
            <Route path="home/voucher/:category" element={<CategoryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/:category/:name" element={<SelectVoucherPage />} />
            <Route path="/:category/:name/:id" element={<SelectVoucherPage />} />
            <Route path="/:category/:name/egreeting-card" element={<GreetingCard />} />
            <Route path="/:category/:name/egreeting-card/:id" element={<GreetingCard />} />
            <Route path="/shopping-cart" element={<Cart />} />  
            
            <Route path="/hot-gifts/:category" element={<HotGiftsCards/>} /> 
           {/*  <Route path="/payment-customization" element={<PaymentCustomize/>} />  */} 
          </Routes>
        </div> 
        
        {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && <BottomNav/>}
        
        {/* {location.pathname !== "/" && <Footer />} */}
      </VoucherContext.Provider>
    </UserContext.Provider>

    </PayPalScriptProvider>

   
  );
}

export default App;
