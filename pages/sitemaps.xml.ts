import { graphqlRequest } from '@utils/Fetcher';
import { isValidArray } from '@utils/Helper';
import CATEGORIES_QUERY from '@voguish/module-catalog/graphql/Categories.graphql';
import PRODUCT_QUERY from '@voguish/module-catalog/graphql/ProductsPath.graphql';
import {
  CategoryItem,
  ProductItemInterface,
} from '@voguish/module-catalog/types';
import SELLER_PATHS_QUERY from '@voguish/module-marketplace/graphql/SellerPaths.graphql';
import { FooterLink, SubLinks } from '@voguish/module-theme/Layout/Footer/type';
import Footer_Query from '@voguish/module-theme/graphql/footer.graphql';
import { GetServerSideProps } from 'next';
const URL = process.env.APP_URL;
async function generateSiteMap(
  data1: { products: { items: ProductItemInterface[] } },
  data2: { categoryList: CategoryItem[] },
  data3: { footerLinks: FooterLink[] },
  data4: { sellersList: any }
) {
  const parseLink = (option: SubLinks) => {
    if (option.type === 'category') {
      return `catalog/category/${option.url_key}`;
    }
    if (option.type === 'page') {
      return `${option.url_key}.html`;
    }
    return `${option.url_key}`;
  };
  const productsList = (data1?.products?.items as ProductItemInterface[]) || [];
  const sellers = (data4?.sellersList as any) || [];
  const categoryUrl = (data2?.categoryList as CategoryItem[]) || [];
  const footerLink = (data3?.footerLinks as FooterLink[]) || [];
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       
     </url>

     <url>
     <loc>${URL}customer/account/login</loc>
     
   </url>
   <url>
     <loc>${URL}customer/account/forgetpassword</loc>
     
   </url>
   <url>
     <loc>${URL}customer/account/create</loc>
     
   </url>
     ${
       isValidArray(productsList) &&
       productsList
         ?.map(({ url_key }: { url_key: string }) => {
           return `
           <url>
               <loc>${`${URL}catalog/product/${url_key}`}</loc>
               
           </url>
         `;
         })
         .join('')
     }
       ${
         isValidArray(categoryUrl) &&
         categoryUrl
           ?.map(({ url_key }: { url_key: string }) => {
             return `
              <url>
                <loc>${URL}catalog/category/${url_key}</loc>
              </url>
            `;
           })
           .join('')
       }
         ${
           isValidArray(footerLink?.[0]?.subLinks) &&
           footerLink?.[0]?.subLinks
             ?.map((option) => {
               return `
               <url>
                 <loc>${URL}${parseLink(option)}</loc>
               </url>
             `;
             })
             .join('')
         }
          ${
            isValidArray(footerLink?.[1]?.subLinks) &&
            footerLink?.[1]?.subLinks
              ?.map((option) => {
                return (
                  option.url_key !== 'sitemap.xml' &&
                  `
                 <url>
                   <loc>${URL}${parseLink(option)}</loc>
                 </url>
               `
                );
              })
              .join('')
          }
            ${
              isValidArray(footerLink?.[2]?.subLinks) &&
              footerLink?.[2]?.subLinks
                ?.map((option) => {
                  return `
                   <url>
                     <loc>${URL}${parseLink(option)}</loc>
                   </url>
                 `;
                })
                .join('')
            }
              ${
                isValidArray(footerLink?.[3]?.subLinks) &&
                footerLink?.[3]?.subLinks
                  ?.map((option) => {
                    return `
                     <url>
                       <loc>${URL}${parseLink(option)}</loc>
                     </url>
                   `;
                  })
                  .join('')
              }
                ${
                  isValidArray(sellers?.items) &&
                  sellers?.items
                    ?.map((option: { shop_url: string }) => {
                      return `
                       <url>
                         <loc>${URL}marketplace/seller/collection/shop/${option.shop_url}</loc>
                       </url>
                     `;
                    })
                    .join('')
                }
   </urlset>
 `;
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const data1 = await graphqlRequest({
    query: PRODUCT_QUERY,
    variables: { search: '', filters: {} },
    options: {
      fetchPolicy: 'no-cache',
    },
  });
  const data2 = await graphqlRequest({
    query: CATEGORIES_QUERY,
    variables: { search: '', filters: {} },
    options: {
      fetchPolicy: 'no-cache',
    },
  });

  const data3 = await graphqlRequest({
    query: Footer_Query,
    options: {
      fetchPolicy: 'no-cache',
    },
  });

  const data4 = await graphqlRequest({
    query: SELLER_PATHS_QUERY,
    variables: {
      filter: { is_seller: { eq: '1' } },
      sort: {},
    },
    options: {
      fetchPolicy: 'no-cache',
    },
  });

  const sitemaps = await generateSiteMap(data1, data2, data3, data4);
  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemaps);
  res.end();
  return {
    props: {},
  };
};
export default function SiteMap() {}
