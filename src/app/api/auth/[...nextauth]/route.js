import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            authorization: {
                params: {
                    scope: 'email,public_profile,ads_read,pages_read_engagement' // add necessary scopes here
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    basePath: "/api/auth",
});

export { handler as GET, handler as POST };