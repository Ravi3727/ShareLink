import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import UserModel from "@/models/User";
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: NextRequest, { params }: { params: { linkId: string } }) {
  const linkID = params.linkId;
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
      { email: _user.email },
      { $pull: { links: { _id: linkID } } }, 
      { new: true } 
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Link ${linkID} deleted successfully`, success: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { message: 'Error deleting link', success: false },
      { status: 500 }
    );
  }
}
