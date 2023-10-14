import React from 'react'
import { getChildren } from '@/app/admin/editor/page/components/blocks'
import Block from '../Block'

type Props = {
    blocks: BlockData[]
    block: BlockData
}
export default function Flexbox({ blocks, block }: Props) {
    return (
        <div className="flexbox">
            {getChildren(blocks, block.blockId).map((block, i) => (
                <Block blocks={blocks} block={block} />
            ))}
        </div>
    )
}