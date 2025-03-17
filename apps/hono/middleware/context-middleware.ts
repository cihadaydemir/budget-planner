import * as schema from "../src/db/schema";

import { AppContext } from "../src";
import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
import { getAuth } from './../src/lib/auth/auth';

export const contextMiddleware = createMiddleware<AppContext>(async (c, next) => {

  try{

    const db = drizzle(c.env.DB,{schema})
    c.set("db",db)
  }catch(e){
    console.log("db init error",e)
  }

  

  // you don't really need any of this last part
  try{

    const auth = getAuth(c);
  //   const cookie = getCookie(c,"session")
  //   const {data:session} = await betterFetch<Session>("/api/auth/get-session", {
	// 	baseURL: "http://localhost:3000",
	// 	headers: {
	// 		//get the cookie from the request
	// 		cookie: "",
	// 	},
	// })
    const session = await auth.api.getSession({headers:c.req.raw.headers});
      console.log("session",session)
    
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }
  
    c.set("user", session.user);
    c.set("session", session.session);
    await next()
  }catch(e){
    console.log("auth init error",e)
    // console.log("header",c.req.raw.headers)
    // console.log("originUrl",c.req.url)

  }
});
