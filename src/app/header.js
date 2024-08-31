"use client"
// components/CustomLogin.js
import { signIn, signOut } from 'next-auth/react';
import styles from './header.module.css'
import { useSession } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
    const handleFacebookLogin = () => {
        signIn('facebook');
    };
    const handleLogout = async () => {

        await signOut({ redirect: true, callbackUrl: '/' });
    };
    console.log()

    return (
        <div className={styles.header}>
            {!session ?
                <div>
                    <button className={styles.btn} onClick={handleFacebookLogin}>Login</button>
                </div> :
                <div>
                    <button className={styles.btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            }
        </div>
    );
};



export default Header;