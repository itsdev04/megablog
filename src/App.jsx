import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-50">
        <div className="w-full block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto mt-10 text-center">
          <h1>Welcome to the Mega Blog Application</h1>
          <Header />
          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
