import { usePageEditorContext } from '../PageEditorContext';
import styles from '../pageEditor.module.scss'

type Props = {}
function ErrorPageEditor({ }: Props) {
    const { editor } = usePageEditorContext();

    return (
        <div className={styles.errorPage}>
            <h1>Could not fetch page from database</h1>
            <p className={styles.errorMessage}>
                {editor.error}
            </p>
        </div>
    )
}
export default ErrorPageEditor
