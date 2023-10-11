'use client'

import { useSortable } from '@dnd-kit/sortable'
import styles from '../pageEditor.module.scss'
import Flexbox from './blocks/Flexbox';
import Text from './blocks/Text';

type Props = {
    blocks: BlockData[],
    block: BlockData,
}
function SortableBlock({ blocks, block }: Props) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: block.blockId,
        data: { type: "Block", block },
    });
    let style: any = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        // transition,
        // opacity: isDragging ? 0.5 : undefined,
    };

    if (isDragging) {
        return (
            <div ref={setNodeRef} className={styles.dragLine} style={style} {...attributes} {...listeners}>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} className={styles.sortableBlock} style={style} {...attributes} {...listeners}>
            {block.type === "flexbox" && <Flexbox blocks={blocks} block={block} />}
            {block.type === "text" && <Text blocks={blocks} block={block} />}
        </div>
    )
}
export default SortableBlock