import styles from '../pageEditor.module.scss'

type Props = {}
function LoadingPageEditor({ }: Props) {
    return (
        <div className={styles.loadingPage}>
            <div className={styles.loadingContainer}>
                <div className={styles.loadingCircle}></div>
                <div className={styles.loadingText}>loading</div>
            </div>
        </div>
    )
}
export default LoadingPageEditor