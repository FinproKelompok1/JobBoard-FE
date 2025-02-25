import { NextRequest, NextResponse } from "next/server";
import axios from "./helpers/axios";

export default async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.get("jobId");

  try {
    const { data } = await axios.patch(`/preselection/active/${searchParams}`);
    if (!data.isThereTest) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/job", request.url));
  } catch (err) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/admin/preselection/:path*",
};
