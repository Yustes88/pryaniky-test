import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./api/login";
import MainPage from "./components/MainPage";

const RequireAuth: React.FC<{element: React.ReactElement}> = ({element}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/ru/data/v3/testmethods/docs/userdocs/get', {
      headers: {
        'x-auth': token,
      },
    })
        .then(response => {
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('authToken');
            navigate('/login');
          }
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          navigate('/login');
        });
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return element;
};


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<RequireAuth element={<MainPage />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
