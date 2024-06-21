import InitialModel from '@/components/modals/initial-modal';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/inital-profile';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  const profile = await initialProfile();

  if (profile === RedirectToSignIn) {
    return <RedirectToSignIn />;
  }

  const server = await db.server.findFirst({
    where: {
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialModel />;
};

export default SetupPage;
