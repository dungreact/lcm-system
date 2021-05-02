import React from 'react'
import { Participant } from 'twilio-video'
import useParticipantNetworkQualityLevel from '../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel'

const STEP = 3
const BARS_ARRAY = [0, 1, 2, 3, 4]

export default function NetworkQualityLevel({
    participant,
}: {
    participant: Participant
}) {
    const networkQualityLevel = useParticipantNetworkQualityLevel(participant)

    if (networkQualityLevel === null) return null

    return (
        <div>
            <div>
                {BARS_ARRAY.map((level) => (
                    <div
                        key={level}
                        style={{
                            height: `${STEP * (level + 1)}px`,
                            background:
                                networkQualityLevel > level
                                    ? 'white'
                                    : 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
