import Page from './[...slug]/components/Page'
import { getPage } from './[...slug]/fetching'

type Props = {
    params: {
        slug: string[]
        searchParams: any
    }
}

export default async function PageWrapper({ params }: Props) {
    let page = await getPage("");
    params.slug = [""]

    if (!page) {
        return (
            <body>
                <div>Could not find page !</div>
            </body>
        )
    }

    return <Page params={params} page={page} />
}

export async function generateMetadata({ params }: Props) {
    let page = await getPage("")

    if (!page) {
        return {
            notFound: true
        }
    }

    return {
        title: page.title,
        description: page.description
    }
}

export const dynamicParams = true
export const revalidate = false
