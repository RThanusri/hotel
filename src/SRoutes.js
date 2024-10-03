import { Route,Routes } from "react-router-dom"
import SignIn from "./component/User/SignIn"
import SignUp from "./component/User/SignUp"
import Search from "./component/Hotel/Search"
import HotelListing from "./component/Hotel/HotelListing"
import RoomListing from "./component/Hotel/RoomListing"


import AddHotel from "./component/Admin/Hotel/AddHotel"
import HotelReviews from "./component/Hotel/HotelReviews"
import HotelDetails from "./component/Hotel/HotelDetails"
import AddReview from "./component/Hotel/AddReview"
import Home from "./component/Home/Home"
import AllHotels from "./component/Hotel/AllHotels"
import Booking from "./component/Admin/Booking/Booking"
import AddRoom from "./component/Admin/Room/AddRoom"
import AddBooking from "./component/Hotel/AddBooking"
import HotelOwner from "./component/Admin/HotelOwner/HotelOwner"
import User from "./component/Admin/User/User"
import Admin from "./component/Admin/Admin"
import About from "./component/About/About"
import Contact from "./component/Contact/Contact"
import AdminReview from "./component/Admin/Review/AdminReview"
import Hotel from "./component/Admin/Hotel/Hotel";
import Room from "./component/Admin/Room/Room"
import AdminHome from "./component/Home/AdminHome.js"
import ExploreHotelListings from "./component/Home/ExploreHotelListing.js"
import ExploreRoomListing from "./component/Home/ExploreRoomListing.js"
import UserNavbar from "./component/User/UserNavBar.js"
import ViewBooking from "./component/Hotel/ViewBooking.js"
import OwnerNavbar from "./component/HotelOwner/OwnerNavBar/OwnerNavBar.js"
import HotelByOwner from "./component/HotelOwner/Hotel/Hotel.js"
import Owner from "./component/HotelOwner/Owner.js"
import PrivacyPolicy from "./component/Footer/PrivacyPolicy.js"
import TermsOfService from "./component/Footer/TermsOfService.js"
import Sitemap from "./component/Footer/SiteMap.js"
import CompanyDetails from "./component/Footer/CompanyDetails.js"
import OwnerHome from "./component/Home/OwnerHome.js"



const SRoutes=()=>
{
  return(<>
  
  <Routes>
   <Route path="/SignIn" element ={<SignIn/>}/>
   <Route path="/SignUp" element ={<SignUp/>}/>
   <Route path="/Search" element ={<Search/>}/>
   <Route path="/Hotel" element={<Hotel />} />
   <Route path='/explorehotellistings' element={<ExploreHotelListings/>}/>
   <Route path='/exploreroomlistings/:hotelId' element={<ExploreRoomListing/>}/>
   <Route path="/hotelListings" element={<HotelListing />} />
   <Route path="/roomlistings/:hotelId" element ={<RoomListing/>}/>
   <Route path="/" element ={<Home/>}/>
  
   <Route path="/adminNavbar" element ={<Admin/>}/>
   <Route path="/hotelsModifications" element ={<AddHotel/>}/>
   <Route path="/reviews/:hotelId" element ={<HotelReviews/>}/>
   <Route path="/hotelDetails/:hotelId" element ={<HotelDetails/>}/>
   <Route path="/addReview/:hotelId" element={<AddReview/>}></Route>
   <Route path="/AllHotels" element ={<AllHotels/>}/>
   <Route path="/addRoom" element={<AddRoom/>}/>
   <Route path="/Hotel" element={<Hotel />} />
      <Route path="/addHotel" element={<AddHotel/>}/>
      <Route path="/room/:hotelId" element={<Room/>} />
      <Route path="/addRoom" element={<AddRoom/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/addBooking" element={<AddBooking/>}/>
      <Route path="/HotelOwner" element={<OwnerHome/>}/>
      <Route path="/users" element={<User/>}/>
      <Route path="/AdminReview" element={<AdminReview/>}/>
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/UserNavBar" element={<UserNavbar/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/viewBooking" element={<ViewBooking/>}/>
      <Route path="/ownerNavBar" element={<OwnerNavbar/>}/>
      <Route path="/hotelByOwner" element={<HotelByOwner/>}/>
      <Route path="/owner" element={<Owner/>}/>
      <Route path="/privacy" element={<PrivacyPolicy/>}/>
      <Route path="/terms" element={<TermsOfService/>}/>
      <Route path="/sitemap" element={<Sitemap/>}/>
      <Route path ="/company-details" element={<CompanyDetails/>}/>
      <Route path="/HotelOwners" element={<HotelOwner/>}/>
      



  </Routes>
  </>)

}
export default SRoutes