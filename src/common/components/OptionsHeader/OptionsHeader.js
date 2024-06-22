import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

export default function OptionsHeader({ items }) {
    return (
        <Dropdown placement="bottomLeft" menu={{ items }}>
            <MoreOutlined
                className="cursor-pointer"
                rotate={90}
                style={{ fontSize: '20px' }}
            />
        </Dropdown>
    )
}
