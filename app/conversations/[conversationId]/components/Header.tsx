"use client"
import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hook/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otheruser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.userIds.length} members`
        }

        return 'Active'

    }, [conversation])

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => { setDrawerOpen(false) }}
            />
            <div className='bg-white w-full border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 flex justify-between items-center shadow-sm'>
                <div className='flex gap-3 items-center'>
                    <Link className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                        href={'/converstaion'}>
                        <HiChevronLeft size={32} />
                    </Link>
                    <Avatar user={otheruser} />
                    <div className='flex flex-col'>
                        <div>
                            {conversation.name || otheruser.name}
                        </div>
                        <div className='text-xs font-light text-neutral-500'>
                            {statusText}
                        </div>
                    </div>
                </div>

                <HiEllipsisHorizontal size={32} onClick={() => { setDrawerOpen(true) }} className='text-sky-500 cursor-pointer hover:text-sky-600 transition' />
            </div>
        </>
    )
}

export default Header