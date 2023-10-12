'use client'

import styles from '../../pageEditor.module.scss'
import { useEffect, useRef, useState } from "react"
import { usePageEditorContext } from "../../PageEditorContext"

type Props = {
    blocks: BlockData[],
    block: BlockData,
}
function Text({ blocks, block }: Props) {
    const type = {type: block.properties.type || "p"};

    const { activeBlock, setActiveBlock } = usePageEditorContext();

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(block.properties.text || "This is a text block. Click here to edit it.");

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(!isEditing || !inputRef.current) return;
        adjustInputHeight();
    }, [isEditing])

    useEffect(() => {
        if(isEditing && activeBlock.block?.blockId !== block.blockId) {
            setIsEditing(false);
        }
    }, [activeBlock])

    const adjustInputHeight = () => {
        if(!inputRef.current) return;
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }

    const setEditing = (editing: boolean) => {
        if(editing) {
            setActiveBlock({block, dragging: false});
            setIsEditing(true);
        }
        else {
            setIsEditing(false);
            setActiveBlock({block: null, dragging: false});
        }
    }
    
    return (
        <type.type className={`${styles.text}`}
            onDoubleClick={() => setEditing(true)}>
            {isEditing ? (
                <textarea className={`${styles.text}`} value={text} ref={inputRef}
                    onChange={(e) => { setText(e.target.value); adjustInputHeight(); } }
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => { if(e.key==="Escape") setIsEditing(false); } }/>
            ) : (
                <>{text}</>
            )}
        </type.type>
    )
}
export default Text