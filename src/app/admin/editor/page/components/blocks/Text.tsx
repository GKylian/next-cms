'use client'

import { SortableContext } from "@dnd-kit/sortable"
import styles from '../../pageEditor.module.scss'
import { getChildren, getChildrenIds } from "../blocks"
import SortableBlock from "../SortableBlock"
import { useEffect, useRef, useState } from "react"

type Props = {
    blocks: BlockData[],
    block: BlockData,
}
function Flexbox({ blocks, block }: Props) {
    const type = {type: block.properties.type || "p"};

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(block.properties.text || "This is a text block. Click here to edit it.");

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(!isEditing || !inputRef.current) return;
        adjustInputHeight();
    }, [isEditing])

    const adjustInputHeight = () => {
        if(!inputRef.current) return;
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
    
    return (
        <type.type className={`${styles.text}`}
            onDoubleClick={() => setIsEditing(true)}>
            {isEditing ? (
                <textarea className={`${styles.text}`} value={text} ref={inputRef}
                    onChange={(e) => { setText(e.target.value); adjustInputHeight(); } }
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => { if(e.key==="Escape") e.currentTarget.blur(); } }/>
            ) : (
                <>{text}</>
            )}
        </type.type>
    )
}
export default Flexbox