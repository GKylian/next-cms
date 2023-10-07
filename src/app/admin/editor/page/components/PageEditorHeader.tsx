import styles from '../pageEditor.module.scss'
import LogoMenu from '/public/bars-solid.svg'
import LogoBlocks from '/public/cube-solid.svg'
import LogoHierarchy from '/public/layer-group-solid.svg'
import LogoStyling from '/public/fill-drip-solid.svg'
import LogoCaret from '/public/angle-down-solid.svg'

type Props = {}
function PageEditorHeader({ }: Props) {
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
                <input type="text" name="pageNameInput" id="pageNameInput" placeholder="Page Name..." />
            </div>
            <div className={styles.flexGroup}>
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
