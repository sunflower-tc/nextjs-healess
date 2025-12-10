import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CATEGORY_QUERY from '@voguish/module-catalog/graphql/Category.graphql';
import { Category as CategoryItemProps } from '@voguish/module-theme/Layout/Header/SideBar';
import { useQuery } from '@apollo/client';
const CategoryItem = ({ item }: { item: CategoryItemProps }) => {
    const { data } = useQuery(CATEGORY_QUERY, {
        variables: {
            search: '',
            filters: { url_key: { eq: item?.url_key } },
        },
    })
    const productCount: string | number = data?.categoryList?.at(0)?.product_count ?? '';
    return (<Link className='block text-base my-1 text-brand hover:underline ' href={`/catalog/category/${item?.url_key}`} key={item?.url_key}>{item?.title + ` (${productCount})`} </Link>)
}
export const SubCategory = ({ subCategoryItem }: any) => {
    const route = useRouter()
    const categoryName: string | any = route?.asPath.split('/').at(-1)
    const categoryImg: string | any = subCategoryItem.find((item: any) => item?.image_url)
    return (
        <div className='-mt-16'>
            <h2 className='mb-2 lg:text-4xl md:text-4xl text-2xl capitalize'>{categoryName}</h2>
            {
                categoryImg?.image_url && (
                    <Image src={categoryImg?.image_url} alt={categoryImg?.title} width={200} height={200} />
                )
            }
            <div>
                <h4 className='my-1 font-semibold text-base'>{('Category')}</h4>
                {subCategoryItem?.map((item: CategoryItemProps) => <CategoryItem item={item} key={item?.url_key} />)}
            </div>
        </div>
    )
}
