export default {
    async redirects() {
      return [
        {
          source: '/(.*)',
          destination: 'https://assignment-facebook.vercel.app/$1',
          permanent: true,
          has: [
            {
              type: 'host',
              value: 'assignment-facebook.vercel.app',
            },
          ],
        },
      ];
    },
  
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            // Content Security Policy
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self';
                script-src 'self' https://trusted-cdn.com;
                style-src 'self' 'unsafe-inline';
                img-src 'self' data:;
                connect-src 'self';
                font-src 'self';
              `.replace(/\n/g, ''),
            },
            // X-Frame-Options to prevent clickjacking
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            // X-Content-Type-Options to prevent MIME-type sniffing
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // Referrer-Policy to control the information sent with navigations
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            // Permissions-Policy to restrict the use of browser features
            {
              key: 'Permissions-Policy',
              value: 'geolocation=(self), microphone=()',
            },
          ],
        },
      ];
    },
  };
  