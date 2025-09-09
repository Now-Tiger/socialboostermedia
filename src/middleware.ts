import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const origin = req.headers.get("origin");
  console.log(`:: Middleware ::`);
  console.log(` [${req.method}] ${origin}: ${req.url}`);

  const res = NextResponse.next();

  // res.headers.append("Access-Controll-Allow-Origin", "*");
  // res.headers.append("Access-Controll-Allow-Credentials", "true");
  // res.headers.append(
  //   "Access-Controll-Allow-Methods",
  //   "GET,PUT,UPDATE,DELETE,PATCH,POST",
  // );
  // res.headers.append(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  // );
  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
