import * as React from 'react'
import Room from './Room'
import { useAPI } from '../../utils/hooks/useAPI'
import { useUsername } from '../../utils/hooks/useUsername'

const { useEffect, useState } = React

const VideoChat = () => {
    const instance = useAPI()
    const username = useUsername()
    const [token, setToken] = useState('')
    const roomName = 'room'

    // const handleLogout = useCallback((event) => {
    //     setToken(null);
    // }, []);

    useEffect(() => {
        instance
            .post(
                'https://t.livecoding.me/video/token',
                {
                    identity: username,
                    room: roomName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setToken(response.data.token)
            })
    }, [])

    return <Room token={token} roomName={roomName} />
}

export default VideoChat
