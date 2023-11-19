import React from "react";

export default function Page({children}:{children:React.ReactNode}) {
    return (
        <>
            <div>管理页侧栏</div>
            {children}
        </>
    )
}