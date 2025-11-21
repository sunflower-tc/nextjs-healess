import { isMarketplaceEnable } from '@utils/Helper';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
export const config = {
  matcher: [
    '/customer/account/address',
    '/customer/account/product-compare',
    '/customer/account/profile',
    '/wishlist/:path*',
    '/sales/:path*',
    '/marketplace/:path*',
  ],
};

const sellerUrls = ['marketplace'];

const checkAuthPages = (pathName: string) => {
  return (
    pathName.endsWith('/customer/account/login') ||
    pathName.endsWith('/customer/account/create') ||
    pathName.endsWith('/customer/account/forgot-password')
  );
};
// Validating Seller Path
const isValidSellerPath = (pathName: string) =>
  sellerUrls.find((url) => pathName.startsWith(url));

/**
 * Validating the location and is seller or not.
 * @param {*} req
 * @returns NextResponse Redirection
 */
const fromMiddleware = async (req: any) => {
  const marketplaceIsActive = await isMarketplaceEnable();
  const token = req.nextauth.token;

  let pathName = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  if (token && checkAuthPages(pathName)) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if (pathName.startsWith('next/')) {
    return NextResponse.next();
  }

  pathName = pathName.split('/')[1];

  if (!marketplaceIsActive && isValidSellerPath(pathName)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    const response = NextResponse.redirect(url, 302);
    return response;
  }
  return NextResponse.next();
};

export default withAuth(
  function middleware(req) {
    return fromMiddleware(req);
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        let pathName = req.nextUrl.pathname;
        if (
          !token &&
          checkAuthPages(pathName) === false &&
          !pathName.includes('marketplace')
        ) {
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: '/customer/account/login',
      error: '/500',
    },
  }
);
