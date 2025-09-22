import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // ตัวอย่างตรวจสอบ credential แบบง่าย
  if (email === "test@test.com" && password === "123456") {
    // return token หรือ session cookie
    return NextResponse.json({ success: true, token: "fake-jwt-token" });
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
