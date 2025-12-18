import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/utils/file-upload";
import { DocumentTypeEnum, FileTypeEnum } from "@/lib/types/document";

export async function GET() {
  try {
    const result = await prisma.document.findMany({
      orderBy: {
        id: "desc",
      },
      include: { item: true },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as DocumentTypeEnum;
    const fileType = formData.get("fileType") as FileTypeEnum;
    const fileUrl = formData.get("fileUrl") as File;
    const itemId = formData.get("itemId") as string;
    const views = formData.get("views") as string;

    let filePath: string | null = null;

    if (fileUrl && fileUrl.name) {
      const filename = await fileUpload(fileUrl, "uploads");
      filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${filename}`;
    }

    const result = await prisma.document.create({
      data: {
        title,
        description,
        type,
        fileType,
        fileUrl: filePath as string,
        itemId,
        views: Number(views),
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Something went wrong!", error: (error as Error).message },
      { status: 500 }
    );
  }
}
