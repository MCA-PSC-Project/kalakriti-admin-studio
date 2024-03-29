import LandingPage from "./pages/LandingPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProductForm from "./pages/AddProductForm";
import AuthConsumer from "./hooks/useAuth";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import LoginMobile from "./pages/auth/LoginMobile";
import ResetPassword from "./pages/reset/ResetPassword";
import LoginMotp from "./pages/auth/LoginMotp";
import { useState } from "react";
import EditProductForm from "./pages/EditProductForm";
import SearchResultsPage from "./pages/SearchResultsPage";
import ErrorPage from "./pages/error_page/ErrorPage";
import Banners from "./pages/banners/Banners";
import Categories, { SubCategories } from "./pages/categories/Categories";
import CategoryProducts from "./pages/categories/CategoryProducts";
import Sellers from "./pages/Sellers";
import Customers from "./pages/Customers";
import AddCategory from "./pages/categories/AddCategory";
import AddSubcategory from "./pages/categories/AddSubcategory ";
import AddBanner from "./pages/banners/AddBanner";

export const appName = import.meta.env.VITE_APP_NAME;

function RequireAuth({ children }) {
  const { authed } = AuthConsumer();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const App = () => {
  const [hasVisitedMobile, setHasVisitedMobile] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route exact path="/landing-page" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/login/mobile"
            element={<LoginMobile setHasVisitedMobile={setHasVisitedMobile} />}
          />
          <Route
            path="/login/motp"
            element={
              hasVisitedMobile ? <LoginMotp /> : <Navigate to="/login/mobile" />
            }
          />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/notifications"
            element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/products/add"
            element={
              <RequireAuth>
                <AddProductForm />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/products/edit"
            element={
              <RequireAuth>
                <EditProductForm />
              </RequireAuth>
            }
          />

          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route
            exact
            path="/banners"
            element={
              <RequireAuth>
                <Banners />
              </RequireAuth>
            }
          />
          <Route
            path="/banners/add"
            element={
              <RequireAuth>
                <AddBanner />
              </RequireAuth>
            }
          />

          <Route
            path="/categories"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/categories/:categoryId/subcategories"
            element={
              <RequireAuth>
                <SubCategories />
              </RequireAuth>
            }
          />

          <Route
            path="/categories/:categoryId"
            element={
              <RequireAuth>
                <CategoryProducts type="category" />
              </RequireAuth>
            }
          />
          <Route
            path="/categories/add"
            element={
              <RequireAuth>
                <AddCategory />
              </RequireAuth>
            }
          />
          <Route
            path="/subcategories/:subcategoryId"
            element={
              <RequireAuth>
                <CategoryProducts type="subcategory" />
              </RequireAuth>
            }
          />
          <Route
            path="/subcategories/add"
            element={
              <RequireAuth>
                <AddSubcategory />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/sellers"
            element={
              <RequireAuth>
                <Sellers />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/customers"
            element={
              <RequireAuth>
                <Customers />
              </RequireAuth>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
