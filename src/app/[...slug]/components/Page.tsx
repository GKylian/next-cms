type Props = {
    params: {
        slug: string[],
        searchParams: any
    },
    page: PageData
}
export default function Page({ params, page }: Props) {
    return (
        <body>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
        </body>
    )
}
