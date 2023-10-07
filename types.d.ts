type BlockData = {
    blockId: string,
    parentId: string,
    type: string,
    id: string,
    class: string[],
    properties: {
        [key: string]: any
    }
}


type PageData = {
    type: string,
    title: string,
    id: string,
    description: string,
    keywords: string[],
    author: string,
    iconURL: string,
    createdAt: string,
    updatedAt: string,
    properties: {
        [key: string]: any
    }
    blocks: BlockData[]
}

type PageInfo = Omit<PageData, "blocks">


type PageEditor = {
    zoom: number,
    openPanes: string[]
}