'use client'

import styles from '../pageEditor.module.scss'
import { usePageEditorContext } from '../PageEditorContext';
import { SortableContext } from '@dnd-kit/sortable';
import { getChildren, getChildrenIds } from './blocks';
import SortableBlock from './SortableBlock';

type Props = {}
function BlocksEditor({ }: Props) {
    const { editor, blocks, setBlocks } = usePageEditorContext();

    return (
        <div className={styles.pagePreview} style={{ backgroundColor: 'white' }}>
            <div className={styles.blockArea} style={{ zoom: `${editor.zoom}`, width: `1920px` }}>
                <SortableContext items={getChildrenIds(blocks, undefined)} strategy={() => null}>
                    {
                        getChildren(blocks, "").map((block, index) => (
                            <SortableBlock key={block.blockId} blocks={blocks} block={block} />
                        ))
                    }
                </SortableContext>
            </div>
            <div className={styles.pageBottomSpacer}></div>
        </div>
    )
}
export default BlocksEditor