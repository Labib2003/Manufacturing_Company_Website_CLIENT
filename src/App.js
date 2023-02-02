import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import RequiteAuth from "./components/shared/RequiteAuth";
import RequireAdmin from "./hooks/RequireAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/shared/PageNotFound";
import { Container } from "@mui/material";
import AllProducts from "./pages/AllProducts";
import Dashboard from "./pages/Dashboard";
import Payment from "./components/Dashboard/User/Payment";
import AddReview from "./components/Dashboard/User/AddReview";
import MyOrders from "./components/Dashboard/User/MyOrders";
import ManageAllOrders from "./components/Dashboard/Admin/ManageAllOrders";
import AddNewProduct from "./components/Dashboard/Admin/AddNewProduct";
import MakeAdmin from "./components/Dashboard/Admin/MakeAdmin";
import ManageProducts from "./components/Dashboard/Admin/ManageProducts";
import MyProfile from "./components/Dashboard/MyProfile";

function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/tools/:id"
            element={
              <RequiteAuth>
                <Purchase />
              </RequiteAuth>
            }
          />
          <Route path="/all-products" element={<AllProducts />} />
          <Route
            path="/dashboard"
            element={
              <RequiteAuth>
                <Dashboard />
              </RequiteAuth>
            }
          >
            <Route index element={<MyProfile />} />
            <Route path="payment/:id" element={<Payment />} />
            <Route path="addReview" element={<AddReview />} />
            <Route path="myOrders" element={<MyOrders />} />
            <Route
              path="manageAllOrders"
              element={
                <RequireAdmin>
                  <ManageAllOrders />
                </RequireAdmin>
              }
            />
            <Route
              path="addNewProduct"
              element={
                <RequireAdmin>
                  <AddNewProduct />
                </RequireAdmin>
              }
            />
            <Route
              path="makeAdmin"
              element={
                <RequireAdmin>
                  <MakeAdmin />
                </RequireAdmin>
              }
            />
            <Route
              path="manageProducts"
              element={
                <RequireAdmin>
                  <ManageProducts />
                </RequireAdmin>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Container>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
