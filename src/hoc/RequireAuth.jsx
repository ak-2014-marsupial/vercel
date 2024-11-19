import React from 'react';

const RequireAuth = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export  {RequireAuth};