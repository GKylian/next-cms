import Page from "./components/Page";
import { getPage, getPageURLs } from "./fetching";


type Props = {
    params: {
        slug: string[],
        searchParams: any
    }
}


export default async function PageWrapper({ params }: Props) {
    let page = await getPage(params.slug.join('/'));

    if (!page) {
        return <div>Could not find page !</div>
    }

    return (
        <Page params={params} page={page} />
    )
}


export async function generateStaticParams() {
    let paths = await getPageURLs();
    return paths.map(path => ({
        params: {
            slug: path.split('/')
        }
    }));

}


export async function generateMetadata({ params }: Props) {
    let page = await getPage(params.slug.join('/'));

    if (!page) {
        return {
            notFound: true,
        }
    }

    return {
        title: page.title,
        description: page.description,
    }
}



export const dynamicParams = true;
export const revalidate = false;