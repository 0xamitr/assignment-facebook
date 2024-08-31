"use client"
// components/CustomLogin.js
import { signIn, signOut } from 'next-auth/react';

const Header = () => {
    const handleFacebookLogin = () => {
        signIn('facebook'); // This triggers the OAuth flow with Facebook
    };
    const handleLogout = async () => {
        // Perform any additional logic if needed
        // For example, clear local storage or other states

        await signOut({ redirect: true, callbackUrl: '/' }); // Redirect after logout
    };

    return (
        <>
            <div>
                <button onClick={handleFacebookLogin}>Login with Facebook</button>
            </div>
            <div>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    );
};



export default Header;