"use client"

import clsx from "clsx"
import useConversation from "../hook/useConversation"
import EmptyState from "../components/EmptyState"

const Page = () => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx(`lg:pl-80 h-full lg:block`,
            isOpen ? 'block' : 'hidden'
        )}>
            <EmptyState />
        </div>
    )
}

export default Page