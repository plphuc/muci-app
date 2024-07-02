import { Button, Card, TimePicker } from 'antd'
import OptionsHeader from 'common/components/OptionsHeader/OptionsHeader'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetToken } from 'slices/tokenSlice'
import { logoutUser } from 'slices/userSlice'
import './TimerFeature.css'
import { useState } from 'react'

const { useTimer } = require('react-timer-hook')
const DEFAULT_RESTART_TIME = 1500

function TimerFeature() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const expiryTimestamp = new Date().setSeconds(
        new Date().getSeconds() + DEFAULT_RESTART_TIME
    )
    const [restartTime, setRestartTime] = useState(DEFAULT_RESTART_TIME)

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(resetToken())
        navigate('/')
    }

    const handleChooseTime = (e) => {
        const time = new Date()
        if (!e) {
            time.setSeconds(time.getSeconds() + 0)
            setRestartTime('')
        } else {
            const chosenSeconds = e.$H * 3600 + e.$m * 60 + e.$s
            setRestartTime(chosenSeconds)
            time.setSeconds(time.getSeconds() + chosenSeconds)
        }
        restart(time)
        pause()
    }

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

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        autoStart: false,
        onExpire: () => console.warn('onExpire called'),
    })

    return (
        <div className="h-full flex flex-col">
            <div className=" flex justify-end mr-8 mt-8">
                <div>
                    <OptionsHeader items={items} />
                </div>
            </div>
            <div className="flex flex-col flex-1 ">
                <div className="flex justify-start ml-20 items-center">
                    <p className="font-semibold">Choose Time: &nbsp;</p>
                    <TimePicker onChange={handleChooseTime} showNow={false} />
                </div>
                <div className="text-center flex-1 flex justify-center items-center flex-col -mt-10">
                    <p className="font-semibold text-9xl">Timer</p>
                    <div className="flex justify-center items-center gap-5 my-12 font-semibold">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p>Hours</p>
                            <Card className="shadow-xl w-40 text-7xl">
                                {hours}
                            </Card>
                        </div>
                        <p className="text-5xl">:</p>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p>Minutes</p>
                            <Card className="shadow-xl w-40 text-7xl">
                                {minutes}
                            </Card>
                        </div>
                        <p className="text-5xl">:</p>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p>Seconds</p>
                            <Card className="shadow-xl w-40 text-7xl">
                                {seconds}
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-3 pt-4 feature-btn justify-center">
                        <Button
                            className="font-medium text-2xl bg-gray-200 border-none shadow-md"
                            onClick={resume}
                        >
                            Start
                        </Button>
                        <Button
                            className="font-medium text-2xl bg-gray-200 border-none shadow-md"
                            onClick={pause}
                        >
                            Pause
                        </Button>
                        <Button
                            className="font-medium text-2xl bg-gray-200 border-none shadow-md"
                            onClick={() => {
                                const time = new Date()
                                time.setSeconds(time.getSeconds() + restartTime)
                                restart(time)
                                pause()
                            }}
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimerFeature
