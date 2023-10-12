'use client'

import styles from '../pageEditor.module.scss'
import LogoMenu from '/public/bars-solid.svg'
import LogoBlocks from '/public/cube-solid.svg'
import LogoHierarchy from '/public/layer-group-solid.svg'
import LogoStyling from '/public/fill-drip-solid.svg'
import LogoCaret from '/public/angle-down-solid.svg'
import { usePageEditorContext } from '../PageEditorContext'
import { useEffect, useState } from 'react'

type Props = {}
function PageEditorHeader({ }: Props) {
    
    const { editor, setEditor, page, setPage } = usePageEditorContext();

    const [zoom, setZoom] = useState<string>(Math.round(editor.zoom * 100) + "%");
    
    const updateEditorZoom = (newZoom: number) => {
        newZoom = clampZoom(newZoom); //FIXME: Currently not allowing zooming out because of rendering issues (overflow computed before transform: scale())
        if (!isNaN(newZoom))
            setEditor((_editor) => ({..._editor, zoom: newZoom}));
        setZoom(Math.round(newZoom * 100) + "%");
    }

    const clampZoom = (newZoom: number) => Math.max(1.0, Math.min(5.0, newZoom));

    return (
        <header className={styles.header}>
            <div className={styles.flexGroup}>
                <button className={styles.icon}>
                    <LogoMenu />
                </button>
                <button className={styles.icon}>
                    <LogoBlocks />
                </button>
                <button className={styles.icon}>
                    <LogoHierarchy />
                </button>
            </div>

            <div className={styles.flexGroup}>
                <input className={styles.titleInput} type="text" name="pageNameInput" id="pageNameInput" placeholder="Page Name..."
                    value={page.title} onChange={(e) => setPage((_page) => ({..._page, title: e.target.value || _page.title}))} />
            </div>

            <div className={styles.flexGroup}>
                <div className={styles.zoomControls}>
                    <button onClick={(e) => updateEditorZoom(editor.zoom-0.1)}>&minus;</button>
                    <input type="text" inputMode='numeric' name="zoomInput" id="zoomInput" placeholder="1.0"
                        value={zoom} onChange={(e) => setZoom(e.target.value)}
                        onBlur={(e) => updateEditorZoom(parseInt(e.target.value) / 100.0)}
                        onKeyDown={(e) => {if(e.key==="Enter") updateEditorZoom(parseInt(e.currentTarget.value) / 100.0)}}/>
                    <button onClick={(e) => updateEditorZoom(editor.zoom+0.1)}>+</button>
                </div>
                <button className={styles.icon}>
                    <LogoStyling />
                </button>
                <button className={styles.saveBtn}>
                    <p>Save</p>
                    <LogoCaret />
                </button>
            </div>
        </header>  
    )
}
export default PageEditorHeader
