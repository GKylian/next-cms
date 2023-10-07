'use client'

import { Dispatch, SetStateAction, createContext, useState, useContext } from "react"
import { testData } from "./test-data"


interface PageEditorContextProps {
    editor: PageEditor,
    setEditor: Dispatch<SetStateAction<PageEditor>>,
    page: PageInfo,
    setPage: Dispatch<SetStateAction<PageInfo>>,
    blocks: BlockData[],
    setBlocks: Dispatch<SetStateAction<BlockData[]>>,
}

const PageEditorContext = createContext<PageEditorContextProps>({
    editor: {} as PageEditor,
    setEditor: (): PageEditor => ({} as PageEditor),
    page: {} as PageInfo,
    setPage: (): PageInfo => ({} as PageInfo),
    blocks: [],
    setBlocks: (): BlockData[] => [],
})



export const PageEditorProvider = ({ children }: { children: React.ReactNode }) => {
    let {blocks: pageBlocks, ...pageInfo} = testData
    const [blocks, setBlocks] = useState<BlockData[]>(pageBlocks)
    const [page, setPage] = useState<PageInfo>(pageInfo);
    const [editor, setEditor] = useState<PageEditor>({
        zoom: 1,
        openPanes: []
    });

    return (
        <PageEditorContext.Provider value={{editor, setEditor, page, setPage, blocks, setBlocks}}>
            {children}
        </PageEditorContext.Provider>
    )
}

export const usePageEditorContext = () => useContext(PageEditorContext)