import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AcademicDataProvider } from "./context/AcademicDataContext";
import Loader from "./components/Loader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/Notfound"));

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin01";

  return (
    <AcademicDataProvider>
      <div className="min-h-screen bg-white">
        {!hideNavbar && <Navbar />}

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin01"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </AcademicDataProvider>
  );
};

export default App;
