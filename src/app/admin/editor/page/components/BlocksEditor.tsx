'use client'

import styles from '../pageEditor.module.scss'
import { usePageEditorContext } from '../PageEditorContext';
import { SortableContext } from '@dnd-kit/sortable';
import { getChildren, getChildrenIds } from './blocks';
import SortableBlock from './SortableBlock';
import { useEffect, useState } from 'react';

type Props = {}
function BlocksEditor({ }: Props) {
    const { editor, blocks, setBlocks } = usePageEditorContext();

    const [previewWidth, setPreviewWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setPreviewWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className={styles.pagePreview} style={{ backgroundColor: 'white', width: `${previewWidth*editor.zoom}px`}}>
            <div className={styles.blockArea} style={{ transform: `scale(${editor.zoom})`, width: `${previewWidth}px` }}>
                <SortableContext items={getChildrenIds(blocks, undefined)} strategy={() => null}>
                    {
                        getChildren(blocks, "").map((block, index) => (
                            <SortableBlock key={block.blockId} blocks={blocks} block={block} />
                        ))
                    }
                </SortableContext>
                <div className={styles.pageBottomSpacer}></div>
            </div>
        </div>
    )
}
export default BlocksEditor