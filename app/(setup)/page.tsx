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
          id: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return <div>Create a Server</div>;
};

export default SetupPage;
