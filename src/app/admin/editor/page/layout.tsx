'use client'

import styles from './pageEditor.module.scss'

type Props = {
    children: React.ReactNode
}
function PageEditorLayout({children}: Props) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}
export default PageEditorLayout