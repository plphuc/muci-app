import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, message } from 'antd'
import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetToken } from 'slices/tokenSlice';
import { logoutUser } from 'slices/userSlice';

const { useTimer } = require('react-timer-hook')

function TimerFeature() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetToken());
    navigate('/');
  };
    const items = [
        {
            key: '1',
            label: (
                <p
                    className="min-w-28 font-semibold text-2xl"
                    onClick={handleLogout}
                >
                    Log out
                </p>
            ),
        },
    ]
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 600)
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('onExpire called'),
    })

    return (
        <div className='h-full flex justify-center items-center relative'>
            <div className="flex justify-end absolute top-0 right-0">
                <OptionsHeader items={items}/>
            </div>
            <div style={{ textAlign: 'center' }}>
                <p className='font-semibold text-9xl'>Timer</p>
                <div className='flex justify-center items-center gap-5 my-12 font-semibold'>
                    <Card className='shadow-xl w-40 text-7xl'>{days}</Card>
                    <p className='text-5xl'>:</p>
                    <Card className='shadow-xl w-40 text-7xl'>{hours}</Card>
                    <p className='text-5xl'>:</p>
                    <Card className='shadow-xl w-40 text-7xl'>{minutes}</Card>
                    <p className='text-5xl'>:</p>
                    <Card className='shadow-xl w-40 text-7xl'>{seconds}</Card>
                </div>
                <div className='grid grid-cols-4 grid-rows-1 gap-3 pt-4'>
                    <Button className='font-medium text-2xl bg-gray-100 hover:bg-green-100 hover:ring-0s' onClick={start}>Start</Button>
                    <Button onClick={pause}>Pause</Button>
                    <Button onClick={resume}>Resume</Button>
                    <Button
                        onClick={() => {
                            const time = new Date()
                            message.success(time.getSeconds() + 600)
                            time.setSeconds(time.getSeconds() + 3600)
                            restart(time)
                        }}
                    >
                        Restart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TimerFeature
