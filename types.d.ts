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
    url: string,
    type: string,
    title: string,
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
    isLoading: boolean,
    isSaving: boolean,
    error: string,
    zoom: number,
    openPanes: string[]
}