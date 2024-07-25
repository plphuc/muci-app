import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'
import styles from './NotFoundPage.module.css'

function NotFoundPage(props) {
    return (
        <div className={styles.wrapper}>
            <div className=" flex justify-end mr-8 mt-8">
                <div>
                    <OptionsHeader />
                </div>
            </div>
            <img className='h-full w-full' src="https://i.ibb.co/5vmKpmX/404.png" alt="404"></img>
        </div>
    )
}

export default NotFoundPage
