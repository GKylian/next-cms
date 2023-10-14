import { getChildren } from "@/app/admin/editor/page/components/blocks"
import Block from "./Block"

type Props = {
    params: {
        slug: string[],
        searchParams: any
    },
    page: PageData
}

export default function Page({ params, page }: Props) {
    return (
        <body className="page">
            {getChildren(page.blocks, "").map((block, i) => (
                <Block key={block.blockId} blocks={page.blocks} block={block} />
            ))}
        </body>
    )
}
