import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import ErrorBoundary from '../ErrorBoundary';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<
      NextLinkProps,
      | 'href'
      | 'as'
      | 'passHref'
      | 'onMouseEnter'
      | 'onClick'
      | 'onTouchStart'
      | 'preload'
    > {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    // legacyBehavior = true,
    locale,
    ...other
  } = props;

  return (
    <ErrorBoundary>
      {' '}
      <NextLink
        href={to}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
        // legacyBehavior={legacyBehavior}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    </ErrorBoundary>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = 'active',
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      replace,
      scroll,
      shallow,
      ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : 'New';

    const className = `${classNameProps ? classNameProps : ''} ${
      router.pathname === pathname ? activeClassName : ''
    }`;
    const isExternal =
      typeof href === 'string' &&
      (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
      if (noLinkStyle) {
        return (
          <Anchor className={className} href={href} ref={ref} {...other} />
        );
      }

      return <MuiLink className={className} href={href} ref={ref} {...other} />;
    }

    const linkAs = linkAsProp || as;
    const nextjsProps = {
      to: href,
      linkAs,
      replace,
      scroll,
      shallow,
      // legacyBehavior,
      locale,
    };

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref}
          {...nextjsProps}
          {...other}
        />
      );
    }

    return (
      <MuiLink
        color={router.pathname === pathname ? 'primary' : 'secondary'}
        component={NextLinkComposed}
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    );
  }
);
