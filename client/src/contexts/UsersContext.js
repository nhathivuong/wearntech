import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const url = `/users`; 

    useEffect(() => {
    const fetchUsers = async () => {
        const response = await fetch(url);
        const { data } = await response.json();
        setUsers(data);
    };

    fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{users}}>
            {children}
        </UserContext.Provider>
    );
};

// Export the context and provider
export default UserProvider;
