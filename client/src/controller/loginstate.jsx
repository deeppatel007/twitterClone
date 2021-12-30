import { createContext, useState } from 'react';


export const LoginContext = createContext(null);

const LoginState = ({children}) => {
    const [account, setAccount] = useState('');

    return (
        <LoginContext.Provider
            value={{account, setAccount}}
        >
            {children}
        </LoginContext.Provider>

    )
}

export default LoginState;
