'use client'

import { SortableContext } from "@dnd-kit/sortable"
import styles from '../../pageEditor.module.scss'
import { getChildren, getChildrenIds } from "../blocks"
import SortableBlock from "../SortableBlock"

type Props = {
    blocks: BlockData[],
    block: BlockData,
}
function Flexbox({ blocks, block }: Props) {

    return (
        <div className={`${styles.container} ${styles.flexbox}`}>
            <SortableContext items={getChildrenIds(blocks, block.blockId)} strategy={() => null}>
                {getChildren(blocks, block.blockId).map((child, index) => (
                    <SortableBlock key={child.blockId} blocks={blocks} block={child} />
                ))}
            </SortableContext>
        </div>
    )
}
export default Flexbox