import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line
  interface Session {
    user: {
      firstname: string;
      lastname: string;
      token: string;
    } & DefaultSession['user'];
  }
}
