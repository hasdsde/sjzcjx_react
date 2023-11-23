'use client'
import AlterDialogTest from "../_component/AlterDialogTest"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <AlterDialogTest></AlterDialogTest>
        </>
    )
}