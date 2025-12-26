import Button from '@mui/material/Button';
import { getLocalStorage, STORE_CONFIG } from '@store/local-storage';
import { isValidArray } from '@utils/Helper';
import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';
import { useInfo } from '@voguish/module-theme/Layout/Header/Provider/InfoProvider';
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';
import { createElement, FC } from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface HtmlToNextComponentsProps {
  htmlString: string;
}

const HtmlToNextComponents: FC<HtmlToNextComponentsProps> = ({
  htmlString,
}) => {
  let bannerCounter = 0;
  let tagCounter = 0;
  const storeData = getLocalStorage(STORE_CONFIG, true) || {};

  const baseUrl = storeData?.base_url;
  const getImageUrl = (input: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, alt, ...remaining } = input;
    const cleanedSrc = Object.keys(remaining).join('/').split('"');

    const cleanedUrl = isValidArray(Object.keys(remaining))
      ? `${baseUrl}/media/${cleanedSrc?.[0]}`
      : null;
    return cleanedUrl;
  };

  const constructPath = (obj: {}) => {
    const keys = Object.keys(obj);
    const htmlKey = keys
      ?.find((key) => key?.endsWith('.html"'))
      ?.replace(/}}/, '')
      .replace(/"/g, '')
      .replace(/\.html$/, '');
    return htmlKey;
  };
  // Utility function to convert URLs
  const { data } = useInfo();
  const UrlCreate = (url: string): string => {
    const urlArray = constructPath(url);
    const isCategory = data?.megaMenu?.find(
      (item: { url_key: string }) => item?.url_key === urlArray
    )
      ? 'category'
      : 'product';
    return `/catalog/${isCategory}/${urlArray}`;
  };

  // Function to replace specific tags with Next.js components
  const replaceTags = (node: any) => {
    if (!node || !node.attribs) return null;

    const { name, attribs, children } = node;
    const uniqueClass = `tag-${tagCounter++}`;

    // Transform attributes
    const transformedAttribs = Object.keys(attribs).reduce(
      (acc: Record<string, any>, key: string) => {
        acc[key === 'class' ? 'className' : key] = attribs[key];
        return acc;
      },
      {}
    );

    switch (name) {
      case 'a': {
        const href = attribs.href && UrlCreate(attribs);
        return (
          <ErrorBoundary>
            <Link
              className={`${uniqueClass} ${transformedAttribs.className || ''}`}
              href={href}
              passHref
              key={uniqueClass}
            >
              {domToReact(children, { replace: replaceTags })}
            </Link>
          </ErrorBoundary>
        );
      }

      case 'button':
        return (
          <ErrorBoundary>
            <Button
              variant="contained"
              className={`${uniqueClass} ${transformedAttribs.className || ''}`}
              key={uniqueClass}
            >
              {domToReact(children, { replace: replaceTags })}
            </Button>
          </ErrorBoundary>
        );

      case 'img': {
        const { alt } = transformedAttribs;
        const url = attribs.src && getImageUrl(attribs);
        return (
          <ErrorBoundary>
            <Thumbnail
              className={`${uniqueClass} ${transformedAttribs.className || ''}`}
              thumbnail={url || ''}
              priority={true}
              alt={alt || uniqueClass || ''}
              fill
              key={uniqueClass}
            />
          </ErrorBoundary>
        );
      }

      case 'br':
        return (
          <ErrorBoundary>
            <br key={uniqueClass} />
          </ErrorBoundary>
        );

      default:
        return createElement(
          name,
          { className: uniqueClass, ...transformedAttribs },
          domToReact(children, { replace: replaceTags })
        );
    }
  };

  // Function to process banners
  const processBanners = (node: any) => {
    if (!node) return null;
    if (node.name === 'a' && node.attribs && node.attribs) {
      const href = node.attribs.href ? UrlCreate(node.attribs) : '#';

      return (
        <ErrorBoundary>
          <div
            className={`banner-${bannerCounter++}`}
            key={`banner-${bannerCounter}`}
          >
            <ErrorBoundary>
              <Link href={href} passHref>
                {domToReact(node.children, { replace: replaceTags })}
              </Link>
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      );
    }

    return Array.isArray(node.children)
      ? domToReact(node.children, { replace: processBanners })
      : null;
  };
  const removeUnparsedElements = (html: string): string => {
    // Remove elements starting with {{widget type
    return html.replace(/{{widget type[^}]+}}/g, '');
  };

  // Parse and clean the HTML string
  const cleanedHtmlString = removeUnparsedElements(htmlString);
  const parsedHtml = parse(cleanedHtmlString, {
    replace: (node) => processBanners(node as Element),
  } as HTMLReactParserOptions);

  return <ErrorBoundary>{parsedHtml}</ErrorBoundary>;
};

export default HtmlToNextComponents;
