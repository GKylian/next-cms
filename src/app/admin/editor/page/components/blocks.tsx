
export function isContainer(block: BlockData): boolean {
    return block.type === "flexbox";
}

export function getChildren(blocks: BlockData[], parentId: string|undefined): BlockData[] {
    if (parentId === undefined) return blocks;
    return blocks.filter((block) => block.parentId === parentId);
}

export function getChildrenIds(blocks: BlockData[], parentId: string | undefined): string[] {
    if (parentId === undefined) return blocks.map((block) => block.blockId);
    return getChildren(blocks, parentId).map((block) => block.blockId);
}

export function getChildrenIndices(blocks: BlockData[], parentId: string | undefined): number[] {
    if (parentId === undefined) return blocks.map((block, index) => index);
    return blocks.map((block, index) => index).filter((index) => blocks[index].parentId === parentId);
}

export function getBlockIndex(blocks: BlockData[], blockId: string): number {
    return blocks.findIndex((block) => block.blockId === blockId);
}