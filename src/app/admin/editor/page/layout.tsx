'use client'

import { PageEditorProvider } from './PageEditorContext'
import PageEditorHeader from './components/PageEditorHeader'
import styles from './pageEditor.module.scss'

type Props = {
    children: React.ReactNode
}
function PageEditorLayout({ children }: Props) {
    return (
        <body className={styles.body}>
            <PageEditorProvider>                
                <PageEditorHeader />
                <main className={styles.main}>
                    {children}
                </main>
            </PageEditorProvider>
        </body>
    )
}
export default PageEditorLayout