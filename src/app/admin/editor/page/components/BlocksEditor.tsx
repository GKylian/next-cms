'use client'

import { useState } from 'react';
import styles from '../pageEditor.module.scss'

type Props = {}
function BlocksEditor({ }: Props) {
    const [zoom, setZoom] = useState(1.0);

    return (
        <div className={styles.pagePreview} style={{ backgroundColor: 'white' }}>
            <div className={styles.blockArea} style={{ zoom: `${zoom}`, width: `1920px` }}>
                <div>1 - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro explicabo aut rerum sed, repudiandae facilis pariatur soluta qui facere iste unde natus voluptatibus fugit officia fugiat placeat, rem minima accusamus?</div>

            </div>
            <div className={styles.pageBottomSpacer}></div>
        </div>
    )
}
export default BlocksEditor