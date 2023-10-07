'use client'

import { useState } from 'react';
import styles from '../pageEditor.module.scss'
import { usePageEditorContext } from '../PageEditorContext';

type Props = {}
function BlocksEditor({ }: Props) {
    const { editor } = usePageEditorContext();

    return (
        <div className={styles.pagePreview} style={{ backgroundColor: 'white' }}>
            <div className={styles.blockArea} style={{ zoom: `${editor.zoom}`, width: `1920px` }}>
                <div>1 - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro explicabo aut rerum sed, repudiandae facilis pariatur soluta qui facere iste unde natus voluptatibus fugit officia fugiat placeat, rem minima accusamus?</div>

            </div>
            <div className={styles.pageBottomSpacer}></div>
        </div>
    )
}
export default BlocksEditor