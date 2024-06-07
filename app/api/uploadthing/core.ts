// https://docs.uploadthing.com/getting-started/appdir

import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@clerk/nextjs/dist/types/server';

const f = createUploadthing();

const handleAuth = () => {
  const userId = auth();
  if (!userId) throw new UploadThingError('Unauthorized');
  return { userId: userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f({}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
