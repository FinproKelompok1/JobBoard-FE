// import { verify } from "jsonwebtoken";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// interface IJwtPayload {
//   role: "user" | "admin" | "developer";
// }

// export function middleware() {
//   const token = cookies().get("token")?.value;
//   if (!token) return NextResponse.redirect(new URL("/"));
//   const decoded = <IJwtPayload>verify(token, process.env.JWT_KEY!);
//   if (decoded.role !== "admin") return NextResponse.redirect(new URL("/"));
//   return NextResponse.next();
// }

export function middleware() {
  return NextResponse.next();
}

// export const config = {
//   matcher: "/admin/:path*",
// };
