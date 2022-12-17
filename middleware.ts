export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };
//"/" denotes the url that is being accessed here being the home page
//person is redirected to sign in page if not signed in as soon as they try to access the page
