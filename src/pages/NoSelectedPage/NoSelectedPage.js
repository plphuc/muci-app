import styles from './NoSelectedPage.module.css'
import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'

function NoSelectedPage(props) {

    return (
        <>
            <div className=" flex justify-end mr-8 mt-8">
                <div>
                    <OptionsHeader />
                </div>
            </div>
            <div className={styles.wrapper}></div>
        </>
    )
}

export default NoSelectedPage
