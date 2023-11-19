export default function Page({params}:{params:{name:number}}) {
    return (
        <>
            <div>
                item详情页ID：{params.name}
            </div>
        </>
    )
}