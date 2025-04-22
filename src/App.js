// import logo from './logo.svg';
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
