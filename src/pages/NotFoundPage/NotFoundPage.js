import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'
import styles from './NotFoundPage.module.css'

function NotFoundPage(props) {
    return (
        <div className={styles.wrapper}>
            <div className="flex justify-end pr-8 pt-8">
                <div>
                    <OptionsHeader />
                </div>
            </div>
            <div className='flex-1 flex justify-center items-center'><img className='h-[500px]' src="https://i.ibb.co/5vmKpmX/404.png" alt="404"></img></div>
        </div>
    )
}

export default NotFoundPage
