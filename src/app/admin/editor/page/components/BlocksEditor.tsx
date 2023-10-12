'use client'

import styles from '../pageEditor.module.scss'
import { usePageEditorContext } from '../PageEditorContext';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { getBlockIndex, getChildren, getChildrenIds, getChildrenIndices, isContainer } from './blocks';
import SortableBlock from './SortableBlock';
import { useEffect, useRef, useState } from 'react';
import { ClientRect, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';

type Props = {}
function BlocksEditor({ }: Props) {
    if (typeof window === "undefined") return <div></div>;
    const { editor, blocks, setBlocks, activeBlock, setActiveBlock } = usePageEditorContext();

    const mousePos = useRef({ x: 0, y: 0 });
    const [previewWidth, setPreviewWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setPreviewWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    
    useDndMonitor({
        onDragStart: (event: DragStartEvent) => {
            if(event.active.data.current?.type !== "Block") return;
            setActiveBlock({block: event.active.data.current.block, dragging: true});
        },

        onDragEnd: (event: DragEndEvent) => {
            setActiveBlock(val => ({block: val.block, dragging: false}));
        },

        onDragMove: (event: DragMoveEvent) => {
            const { active, over, collisions } = event;
            if (!active.data.current?.block) return;
            if (active.data.current.block.blockId === over?.data?.current?.block?.blockId) return;

            /**
             * 1. If over the same block, return
             * 2. If not over a block, put in root, return
             * 3. It's a block → check if it's a container
             *   3.1 If yes, we're in the drop area and it's not already our parent, move to that container, return
             * 4. It's a block and not a container → check if we're at the top/bottom (sort area) of the block
             *   4.1 If at the top, move to before the block
             *   4.2 If at the bottom, move to after the block
             */


            if (!over && active.data.current.block.parentId !== "") {
                setParent(active.data.current.block.blockId, "");
                return;
                //TODO: move to the end of the root ?
            }
            if (!over?.data?.current?.block) return;
            const activeBlock: BlockData = active.data.current.block;
            const overBlock: BlockData = over.data.current.block;

            // Transfer to container
            if (isContainer(overBlock) && isInDragArea(over.rect, mousePos.current.x, mousePos.current.y)) {
                if (activeBlock.parentId === overBlock.blockId) return;
                const activePosition = getBlockIndex(blocks, activeBlock.blockId);
                let lastChildIndex = -1;
                if (mousePos.current.y < over.rect.top + over.rect.height / 2)
                    lastChildIndex = getChildrenIndices(blocks, overBlock.blockId)[0];
                else
                    lastChildIndex = getChildrenIndices(blocks, overBlock.blockId).pop() ?? -1;

                moveBlockTo(activeBlock, overBlock.blockId, activePosition, (lastChildIndex!==-1) ? lastChildIndex + 1 : activePosition);
                return;
            }

            // Near the top of the block -> move before (or outside of container)
            if (mousePos.current.y < over.rect.top + Math.min(16, over.rect.height / 3)) {
                const activePosition = getBlockIndex(blocks, activeBlock.blockId);
                const overPosition = getBlockIndex(blocks, overBlock.blockId);
                if(activeBlock.parentId === overBlock.blockId) {
                    moveBlockTo(activeBlock, overBlock.parentId, activePosition, overPosition+(activePosition > overPosition ? 0 : -1)); // Otherwise there's a double shift (arrayMove & +1)
                    return;
                }
                if (activePosition <= overPosition - 1) return; // Already before
                
                moveBlockTo(activeBlock, overBlock.parentId, activePosition, overPosition);
                return;
            }
            
            // Near the bottom of the block -> move after (or outside of container)
            else if (mousePos.current.y > over.rect.bottom - Math.min(16, over.rect.height / 3)) {
                const activePosition = getBlockIndex(blocks, active.data.current.block.blockId);
                const overPosition = getBlockIndex(blocks, over.data.current.block.blockId);
                if(activeBlock.parentId === overBlock.blockId) {
                    moveBlockTo(activeBlock, overBlock.parentId, activePosition, overPosition+(activePosition < overPosition ? 0 : 1));
                    return;
                }
                if (activePosition >= overPosition+1) return; // Already after
                
                moveBlockTo(activeBlock, overBlock.parentId, activePosition, overPosition);
                return;
            }
        }
    })





    return (
        <div className={styles.pagePreview} style={{ backgroundColor: 'white', width: `${previewWidth*editor.zoom}px`}}
            onMouseMove={(e) => mousePos.current = {x: e.clientX, y: e.clientY}}>
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
            {createPortal(
                <DragOverlay >
                    {(activeBlock.dragging && activeBlock.block) && <SortableBlock key={activeBlock.block.blockId} blocks={blocks} block={activeBlock.block}/>}
                </DragOverlay>
            , document.body)}
        </div>
    )



    function setParent(blockId: string, parentId: string) {
        if (blockId === parentId || !blockId) return;
        setBlocks((cblocks) => {
            return cblocks.map((block) => {
                if (block.blockId === blockId) return { ...block, parentId };
                return block;
            });
        })
    }

    function moveBlockTo(movedBlock: BlockData, newParentId: string, oldPosition: number, newPosition: number) {
        if(movedBlock.parentId === newParentId)
            setBlocks((cblocks) => arrayMove(cblocks, oldPosition, newPosition));
        else {
            setBlocks((cblocks) => {
                return arrayMove(cblocks, oldPosition, newPosition).map((block) => {
                    if (block.blockId === movedBlock.blockId) return { ...block, parentId: newParentId };
                    return block;
                });
            })
        }
    }

}
export default dynamic(() => Promise.resolve(BlocksEditor), { ssr: false });



function isInDragArea(rect: ClientRect, x: number, y: number) {
    return x > rect.left+Math.min(16, rect.width/3) && x < rect.right-Math.min(16, rect.width/3)
        && y > rect.top+Math.min(16, rect.height/3) && y < rect.bottom-Math.min(16, rect.height/3);
}