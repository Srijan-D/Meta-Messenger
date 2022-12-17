/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com","scontent.fbom3-1.fna.fbcdn.net","localhost" ],
   // Got an error Invalid src prop ('here is a link') on `next/image`
   // to resolve this issue I am adding "localhost" to the domains 
  },
  experimental: {
    appDir: true,
  }
}
