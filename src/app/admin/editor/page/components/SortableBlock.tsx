'use client'

import { useSortable } from '@dnd-kit/sortable'
import styles from '../pageEditor.module.scss'
import Flexbox from './blocks/Flexbox';
import Text from './blocks/Text';
import { usePageEditorContext } from '../PageEditorContext';

type Props = {
    blocks: BlockData[],
    block: BlockData,
}
function SortableBlock({ blocks, block }: Props) {
    const { activeBlock, setActiveBlock } = usePageEditorContext();

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: block.blockId,
        data: { type: "Block", block },
    });
    let style: any = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    const isSelected = !activeBlock.dragging && activeBlock.block?.blockId === block.blockId;

    const select = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!e || activeBlock.dragging) return;
        setActiveBlock({block, dragging: false});
        e.stopPropagation();
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} className={styles.dragLine} style={style} {...attributes} {...listeners}>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} className={`${styles.sortableBlock}`+ (isSelected ? " "+styles.selected : "")}
            style={style} {...attributes} {...listeners}
            onClick={select}>
            {block.type === "flexbox" && <Flexbox blocks={blocks} block={block} />}
            {block.type === "text" && <Text blocks={blocks} block={block} />}
        </div>
    )
}
export default SortableBlock