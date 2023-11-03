//export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { nextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const {pathname, origin} = req.nextUrl;
        const {token} = req.nextauth;

        if(pathname.startsWith("/dashboard") && token?.user?.role !== "admin"){
            //return nextResponse.redirect(origin)
            return new nextResponse('You are not authorized to access this page')
            
        }
    },
    {
        callback: {
            authorized: ({ token }) => {
                console.log(token);
                return !!token; // true => middleware is run
            },
        }
    }

);

export const config = {
    matcher: ["/profile:path*", "/protected/:path*", "/dashboard/:path*"]
}