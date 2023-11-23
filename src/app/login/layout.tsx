'use client'
import AlterDialog from "../_component/AlterDialog"
import SnackBar from "../_component/SnackBar"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <AlterDialog></AlterDialog>
            <SnackBar></SnackBar>
        </>
    )
}