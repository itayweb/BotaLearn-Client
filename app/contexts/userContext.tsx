import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { IUser, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>({ fullname: '', email: '', username: '' , plants: []});

    // const applyUser = (fullName: string, email: string, username: string) => {
    //     setUser({ fullName: fullName, email: email, username: username });
    // }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context)
        throw new Error("useUserContext must be within a UserProvider");

    return context;
};

// export default UserContext