'use client'
import AlterDialog from "../_component/AlterDialog"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <AlterDialog></AlterDialog>
        </>
    )
}