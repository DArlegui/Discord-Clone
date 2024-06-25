import { v4 as uuidv4 } from 'uuid';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

export async function POST(req: Request, res: Response) {
  console.log('Creating a server');
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageURL: imageUrl,
        inviteCode: uuidv4(),
        Channel: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        Member: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log('[SERVERS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
