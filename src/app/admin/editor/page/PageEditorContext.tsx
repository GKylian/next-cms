'use client'

import { Dispatch, SetStateAction, createContext, useState, useContext, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"


interface PageEditorContextProps {
    editor: PageEditor,
    setEditor: Dispatch<SetStateAction<PageEditor>>,
    page: PageInfo|undefined,
    setPage: Dispatch<SetStateAction<PageInfo|undefined>>,
    blocks: BlockData[],
    setBlocks: Dispatch<SetStateAction<BlockData[]>>,
    activeBlock: { block: BlockData|null, dragging: boolean },
    setActiveBlock: Dispatch<SetStateAction<{ block: BlockData|null, dragging: boolean }>>,
}

const PageEditorContext = createContext<PageEditorContextProps>({
    editor: {} as PageEditor,
    setEditor: (): PageEditor => ({} as PageEditor),
    page: {} as PageInfo|undefined,
    setPage: (): PageInfo|undefined => ({} as PageInfo),
    blocks: [],
    setBlocks: (): BlockData[] => [],
    activeBlock: { block: null, dragging: false },
    setActiveBlock: (): { block: BlockData|null, dragging: boolean } => ({ block: null, dragging: false }),
})



const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const PageEditorProvider = ({ children }: { children: React.ReactNode }) => {
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const [activeBlock, setActiveBlock] = useState<{ block: BlockData|null, dragging: boolean }>({ block: null, dragging: false });

    const [page, setPage] = useState<PageInfo>();
    const [editor, setEditor] = useState<PageEditor>({
        zoom: 1,
        openPanes: []
    });
    
    const searchParams = useSearchParams();
    const { data, error, isLoading } = useSWR(`/api/page?url=${searchParams.get('url')}`, fetcher, { refreshInterval: 0, revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false});

    useEffect(() => {
        if (!data) return;
        if (error) return;
        if (isLoading) return;
        if (data.message) return;
        setBlocks(data.blocks);
        delete data.blocks;
        console.log(data);
        setPage(data);
    }, [data]);

    useEffect(() => {
        console.log(blocks);
    }, [blocks])
    

    return (
        <PageEditorContext.Provider value={{editor, setEditor, page, setPage, blocks, setBlocks, activeBlock, setActiveBlock}}>
            {children}
        </PageEditorContext.Provider>
    )
}

export const usePageEditorContext = () => useContext(PageEditorContext)