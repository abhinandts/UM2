import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/user/home", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                console.log(res)
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? children : <Navigate to="/userAuth" />;
};

export default PrivateRoute;