import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const result = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, fullName, role, password } = body;

    const client = await clerkClient();

    // 1. Cek user di Clerk berdasarkan username
    const existingUsers = await client.users.getUserList({
      username: [username],
      limit: 1,
    });

    let clerkUser;

    if (existingUsers.data.length > 0) {
      // 👉 User sudah ada di Clerk
      clerkUser = existingUsers.data[0];
    } else {
      // 👉 User belum ada → buat baru di Clerk
      clerkUser = await client.users.createUser({
        username,
        firstName: fullName,
        password,
      });
    }

    // 2. Cek apakah user sudah ada di database
    const existingDbUser = await prisma.user.findUnique({
      where: { id: clerkUser.id },
    });

    if (existingDbUser) {
      return NextResponse.json(existingDbUser, { status: 200 });
    }

    // 3. Simpan ke database
    const result = await prisma.user.create({
      data: {
        id: clerkUser.id, // pakai ID dari Clerk
        username,
        fullName,
        role,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
