'use client'
import Link from "next/link";
import {usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments} from "next/navigation";
import {Router} from "next/router";

export default function Page() {
    const pathname = usePathname();
    // TODO: 查看文档更多书签
    return (
        <>
            <div>
                <h2>Not Found</h2>
                <div>当前路径:{pathname}</div>
                <p>Could not find requested resource</p>
                <Link href="/home">Return Home</Link>
            </div>
        </>
    )
}