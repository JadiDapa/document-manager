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

    console.log(body);

    const client = await clerkClient();

    console.log(client);

    const clerkUser = await client.users.createUser({
      username,
      firstName: fullName,
      password,
    });

    const result = await prisma.user.create({
      data: {
        id: clerkUser.id,
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
