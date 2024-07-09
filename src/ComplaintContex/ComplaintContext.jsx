// src/context/ComplaintContext.jsx
import { createContext, useState } from 'react';

export const ComplaintContext = createContext();

// eslint-disable-next-line react/prop-types
export function ComplaintProvider({ children }) {
    const [complaints, setComplaints] = useState([]);

    const addComplaint = (complaint) => {
        setComplaints([...complaints, complaint]);
    };

    return (
        <ComplaintContext.Provider value={{ complaints, addComplaint }}>
            {children}
        </ComplaintContext.Provider>
    );
}
