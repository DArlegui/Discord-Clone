// Adjust imports
import { currentUser, User } from '@clerk/nextjs/server';
import { RedirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';

// Define the initialProfile function with proper typing
export const initialProfile = async (): Promise<typeof RedirectToSignIn | any> => {
  const user = (await currentUser()) as User | null;

  if (!user) {
    return RedirectToSignIn;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  // Assuming user has firstName, lastName, imageUrl, and emailAddresses correctly typed
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imgURL: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
