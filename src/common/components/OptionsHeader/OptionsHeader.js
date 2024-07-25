import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetToken } from 'slices/tokenSlice'
import { logoutUser } from 'slices/userSlice'

export default function OptionsHeader({ items = [] }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(resetToken())
        navigate('/')
    }
    
    const headerItems = useMemo(() => [    
            ...items, 
            {
                key: '0',
                label: (<p
                        className="min-w-28 font-semibold text-2xl"
                        onClick={handleLogout}
                    >
                        Log out
                    </p>
                ),
            }
        ], [items])

    return (
        <Dropdown placement="bottomLeft" menu={{items: headerItems}}>
            <MoreOutlined
                className="cursor-pointer"
                rotate={90}
                style={{ fontSize: '20px' }}
            />
        </Dropdown>
    )
}
