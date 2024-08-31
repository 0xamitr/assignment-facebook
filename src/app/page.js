"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function Home() {
  const { data: session } = useSession();
  const [pagesdata, setPagesdata] = useState();
  useEffect(() => {
    if (session) {
      const accessToken = session.accessToken;

      async function getFacebookAccounts() {
        try {
          const response = await axios.get('https://graph.facebook.com/me/accounts', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('Facebook Accounts:', response.data.data);
          setPagesdata(response.data.data)
        } catch (error) {
          console.error('Failed to fetch data from Facebook API:', error);
        }
      }
      getFacebookAccounts();
    }
  }, [session]);

  return (
    <main >
      {
        session &&
        <>
          <img src={session.user.image} />
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <div>
            <h2>Pages</h2>
            {
              pagesdata &&
              pagesdata.map((e, index)=>{
                return(
                  <p key={index}>
                    {e.name}
                  </p>
                )
              })
            }
          </div>
        </>
      }
    </main>
  );
}
