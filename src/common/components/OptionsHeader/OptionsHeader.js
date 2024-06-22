import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

export default function OptionsHeader({ items }) {
    return (
        <Dropdown placement="bottomLeft" menu={{ items }} className="mr-8 mt-8">
            <MoreOutlined
                className="cursor-pointer"
                rotate={90}
                style={{ fontSize: '20px' }}
            />
        </Dropdown>
    )
}
