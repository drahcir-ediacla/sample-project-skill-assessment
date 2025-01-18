import React, { ReactNode } from 'react'
import AdminHeader from './AdminHeader';
interface Props {
    children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    return (
        <>
            <AdminHeader />
            <div>{children}</div>
        </>
    )
}

export default AdminLayout