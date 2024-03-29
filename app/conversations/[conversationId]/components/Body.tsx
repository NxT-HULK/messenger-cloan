"use client"
import { FullMessageType } from '@/app/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import useConversation from '@/app/hook/useConversation'
import axios from 'axios'

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {

    const [messages, setMessage] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className='flex-1 overflow-auto'>
            {messages.map((message, i) => {
                return (
                    <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
                )
            })}
            <div ref={bottomRef} className='pt-24'></div>
        </div>
    )
}

export default Body