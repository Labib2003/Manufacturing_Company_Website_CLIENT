import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddReview from './components/pages/Dashboard/User/AddReview';
import AddNewProduct from './components/pages/Dashboard/Admin/AddNewProduct';
import MakeAdmin from './components/pages/Dashboard/Admin/MakeAdmin';
import ManageAllOrders from './components/pages/Dashboard/Admin/ManageAllOrders';
import ManageProducts from './components/pages/Dashboard/Admin/ManageProducts';
import Dashboard from './components/pages/Dashboard/Dashboard';
import MyOrders from './components/pages/Dashboard/User/MyOrders';
import MyProfile from './components/pages/Dashboard/MyProfile';
import Payment from './components/pages/Dashboard/User/Payment';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/Register';
import Purchase from './components/pages/Purchase/Purchase';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import RequiteAuth from './components/shared/RequiteAuth';
import RequireAdmin from './hooks/RequireAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './components/pages/Home/AllProducts';
import PageNotFound from './components/shared/PageNotFound';

function App() {
  return (
    <div className="w-full p-5 md:w-4/5 md:p-0 mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/tools/:id' element={<RequiteAuth><Purchase></Purchase></RequiteAuth>}></Route>
        <Route path='/allProducts' element={<AllProducts></AllProducts>}></Route>
        <Route path='/dashboard' element={<RequiteAuth><Dashboard></Dashboard></RequiteAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='addReview' element={<AddReview></AddReview>}></Route>
          <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
          <Route path='manageAllOrders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>}></Route>
          <Route path='addNewProduct' element={<RequireAdmin><AddNewProduct></AddNewProduct></RequireAdmin>}></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
        </Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </div>
  );
}

export default App;
