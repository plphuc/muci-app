import classNames from 'classnames'
import { useState, useContext } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { useEditPageMutation } from 'slices/pageApiSlice'
import styles from './AddIcon.module.css'
import DropdownMenu from 'common/components/DropdownMenu/DropdownMenu'
import { useSelector } from 'react-redux'
import { selectAccessToken } from 'slices/tokenSlice'
import { useSearchParams } from 'react-router-dom'
import { OwnerContext, PageContext } from '../../MainSection'
import { Popover } from 'antd'

function AddIcon(props) {
    const isOwner = useContext(OwnerContext)
    const pageInfo = useContext(PageContext)

    const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(true)
    const accessToken = useSelector(selectAccessToken)
    const [searchParams] = useSearchParams()
    const pageId = searchParams.get('id')

    const [editPage] = useEditPageMutation()

    const handleAddIcon = (e) => {}

    const handleChooseEmoji = (emojiData) => {
        if (isOwner)
            editPage({
                accessToken,
                pageId,
                content: { icon: emojiData.native },
            })
    }

    return (
        <div className={styles.wrapper}>
            <Popover
                placement="bottom"
                className={styles.emojiPickerContainer}
                trigger="click"
                title={<Picker data={data} onEmojiSelect={handleChooseEmoji} />}
                overlayInnerStyle={{boxShadow: 'none', background: 'none'}}
            >
                {pageInfo?.icon ? (
                    <div className={styles.iconContainer}>
                        {pageInfo.icon}
                            
                        </div>
                ) : (
                    <div
                        className={styles.noIconContainer}
                        onClick={handleAddIcon}
                    >
                        <div>🎄</div>
                        <button
                            className={classNames(
                                'no-border-button',
                                styles.container
                            )}
                        >
                            Add icon
                        </button>
                    </div>
                )}
            </Popover>
        </div>
    )
}

export default AddIcon
