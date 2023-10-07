'use client'

import PageEditorHeader from './components/PageEditorHeader'
import styles from './pageEditor.module.scss'

type Props = {
    children: React.ReactNode
}
function PageEditorLayout({children}: Props) {
    return (
        <body className={styles.body}>
            <PageEditorHeader />
            <main className={styles.main}>
                {children}
            </main>
        </body>
    )
}
export default PageEditorLayout