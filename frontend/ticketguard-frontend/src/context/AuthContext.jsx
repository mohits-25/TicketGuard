import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(

        JSON.parse(localStorage.getItem("user"))

    );

    const login = (response) => {

        localStorage.setItem(

            "token",

            response.token

        );

        localStorage.setItem(

            "user",

            JSON.stringify({

                firstName: response.firstName,

                lastName: response.lastName,

                email: response.email,

                role: response.role

            })

        );

        setToken(response.token);

        setUser({

            firstName: response.firstName,

            lastName: response.lastName,

            email: response.email,

            role: response.role

        });

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                token,

                user,

                login,

                logout,

                isAuthenticated: !!token

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);