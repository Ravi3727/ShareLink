import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import UserModel from "@/models/User";
import { authOptions } from '../../auth/[...nextauth]/options';

export async function PUT(request: NextRequest, { params }: { params: { linkId: string } }) {
  const linkID = params.linkId;
  const { title, url } = await request.json();  
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { email: _user.email, "links._id": linkID }, 
      { $set: { "links.$.title": title, "links.$.url": url } },  
      { new: true }  
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User or link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Link ${linkID} updated successfully`, success: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json(
      { message: 'Error updating link', success: false },
      { status: 500 }
    );
  }
}
