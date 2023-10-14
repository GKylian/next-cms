import React from 'react'
import Flexbox from './blocks/Flexbox'
import Text from './blocks/Text'

type Props = {
    blocks: BlockData[]
    block: BlockData
}

export default function Block({ blocks, block }: Props) {
    if(block.type === "flexbox")    return <Flexbox blocks={blocks} block={block} />
    if(block.type === "text")       return <Text blocks={blocks} block={block} />
}