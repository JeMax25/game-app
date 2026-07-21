import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";

const privateRoutes  = ['/profile']

export const onRequest = defineMiddleware(async (context, next) => {

    const session = await auth.api.getSession({
        headers: context.request.headers,
    });

    context.locals.user = session?.user ?? null;
    context.locals.session = session?.session ?? null;

    const pathName = context.url.pathname;

    if (
        privateRoutes.includes(pathName) &&
        !session
    ) {
        return context.redirect('/login');
    } else if (
       session &&
      (pathName === "/login" || pathName === "/register")
    ) {
        return context.redirect('/')
    }



    return next();
});