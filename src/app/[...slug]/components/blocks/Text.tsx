import React from 'react'
import styles from '../../page.module.scss'

type Props = {
    blocks: BlockData[]
    block: BlockData
}
export default function Text({ blocks, block }: Props) {
    const type = {type: block.properties.type || "p"};

    return (
        <type.type>
            {block.properties.text || "Enter text here..."}
        </type.type>
    )
}