"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import styles from './page.module.css'
import { signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [pagesdata, setPagesdata] = useState();
  const [individualpage, setIndividualpage] = useState();
  const [activepage, setActivepage] = useState()

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
  async function getInfo(e) {
    setActivepage(e.name)
    try {
      const response = await axios.get(`https://graph.facebook.com/v13.0/${e.id}/insights`, {
        headers: {
          Authorization: `Bearer ${e.access_token}`,
        },
        params: {
          metric: 'page_follows,page_impressions,page_post_engagements,page_actions_post_reactions_total'
        },
      });
      console.log('Page Data:', response.data.data);
      setIndividualpage(response.data.data);
    } catch (error) {
      console.error('Failed to fetch data from Facebook API:', error.response || error);
    }
  }


  return (
    <main >
      {
        session ?
          <>
            <img className={styles.img} src={session.user.image} />
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <div>
              <h2>Pages</h2>
              {
                pagesdata &&
                pagesdata.map((e, index) => {
                  return (
                    <p className={styles.pages} onClick={() => getInfo(e)} key={index}>
                      {index+1}.  {e.name}
                    </p>
                  )
                })
              }
              {individualpage &&
                <>
                  <h2>{activepage}</h2>
                  <div className={styles.container}>
                    <div className={styles.box}>
                      <h3>Followers: {individualpage[1].values[1].value || 0}</h3>
                      {/* <p>LifeTime: </p>
                  <p>This Month: </p>
                  <p>This Week: </p>
                  <p>Past Day: </p> */}
                    </div>
                    <div className={styles.box}>
                      <h3>Page Reactions</h3>
                      <p>LifeTime: {individualpage[0].values[0].value.value || 0}</p>
                      <p>This Month: {individualpage[10].values[1].value.value || 0}</p>
                      <p>This Week: {individualpage[7].values[1].value.value || 0}</p>
                      <p>Past Day: {individualpage[4].values[1].value.value || 0}</p>
                    </div>
                    <div className={styles.box}>
                      <h3>Page Impressions</h3>
                      <p>This Month: {individualpage[8].values[1].value || 0}</p>
                      <p>This Week: {individualpage[5].values[1].value || 0}</p>
                      <p>Past Day: {individualpage[2].values[1].value || 0}</p>
                    </div>
                    <div className={styles.box}>
                      <h3>Page Engagements</h3>
                      <p>This Month: {individualpage[9].values[1].value || 0}</p>
                      <p>This Week: {individualpage[6].values[1].value || 0}</p>
                      <p>Past Day: {individualpage[3].values[1].value || 0}</p>
                    </div>
                  </div>
                </>
              }
            </div>
          </> :
          <>
            <button onClick={()=> signIn('facebook')} className={styles.mainbtn}>
              <img
                loading="lazy"
                height="24"
                width="24"
                id="provider-logo"
                src="https://authjs.dev/img/providers/facebook.svg"
                alt="Facebook Logo"
              />
              <span>Sign in with Facebook</span>
            </button>
          </>
}
    </main>
  );
}
