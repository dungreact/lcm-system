import React from 'react'
import Icon from '@ant-design/icons'

const svg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
        >
            <path
                fill="#707578"
                fillRule="evenodd"
                d="M15.003 7c.665 0 1.206.542 1.206 1.207v1.349l3.58-1.789c.301-.15.652.04.704.358l.007.082v7.866c0 .365-.385.603-.711.44l-3.58-1.79v1.35c0 .623-.476 1.138-1.083 1.2l-.123.006H5.707c-.665 0-1.207-.542-1.207-1.206V8.207C4.5 7.542 5.042 7 5.707 7zm0 .983H5.707c-.122 0-.224.102-.224.224v7.866c0 .121.102.223.224.223h9.296c.122 0 .223-.102.223-.223V8.207c0-.122-.101-.224-.223-.224zm4.513 1.019l-3.307 1.654v2.968l3.307 1.653V9.002z"
            />
        </svg>
    )
}

const VideoOnIcon = () => {
    return <Icon component={svg} />
}

export default VideoOnIcon
