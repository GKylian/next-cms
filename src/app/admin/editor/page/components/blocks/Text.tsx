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
        <p className={`${styles.text}`}>
            {block.properties.text || "This is a text block. Click here to edit it."}
        </p>
    )
}
export default Flexbox