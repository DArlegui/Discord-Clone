import {
  authMiddleware,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/(.)*']);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect();
  publicRoutes: ['/api/uploadthing'];
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
