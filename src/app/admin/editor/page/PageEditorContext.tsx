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
    activeBlock: { block: BlockData|null, dragging: boolean },
    setActiveBlock: Dispatch<SetStateAction<{ block: BlockData|null, dragging: boolean }>>,
}

const PageEditorContext = createContext<PageEditorContextProps>({
    editor: {} as PageEditor,
    setEditor: (): PageEditor => ({} as PageEditor),
    page: {} as PageInfo,
    setPage: (): PageInfo => ({} as PageInfo),
    blocks: [],
    setBlocks: (): BlockData[] => [],
    activeBlock: { block: null, dragging: false },
    setActiveBlock: (): { block: BlockData|null, dragging: boolean } => ({ block: null, dragging: false }),
})



export const PageEditorProvider = ({ children }: { children: React.ReactNode }) => {
    let {blocks: pageBlocks, ...pageInfo} = testData;
    const [blocks, setBlocks] = useState<BlockData[]>(pageBlocks);
    const [activeBlock, setActiveBlock] = useState<{ block: BlockData|null, dragging: boolean }>({ block: null, dragging: false });

    const [page, setPage] = useState<PageInfo>(pageInfo);
    const [editor, setEditor] = useState<PageEditor>({
        zoom: 1,
        openPanes: []
    });

    return (
        <PageEditorContext.Provider value={{editor, setEditor, page, setPage, blocks, setBlocks, activeBlock, setActiveBlock}}>
            {children}
        </PageEditorContext.Provider>
    )
}

export const usePageEditorContext = () => useContext(PageEditorContext)