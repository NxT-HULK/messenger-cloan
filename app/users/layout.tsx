import Sidebar from '@/app/components/sidebar/Sidebar'
interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <Sidebar>
            <div className={` h-full `}>{children}</div>
        </Sidebar>
    )
}

export default Layout