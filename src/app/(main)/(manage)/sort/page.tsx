'use client'
import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import { Api, BaseApi } from '@/app/_config/api';
import { useDispatch } from 'react-redux';
import { openAlterDialog, openConfirmDialog, openSnkckBar } from '@/app/_store/sign-slice';
import { AppDiapatch, useAppSelector } from '@/app/_store/store';
import { setInitForm, setSort } from '@/app/_store/form-slice';
import { useRouter } from 'next/navigation';
function createData(
    id: string,
    sortName: string,
    name: string,
    children: {
        id: string,
        name: string,
        sortName: string,
        parent: number,
        createdAt: string
    }[]
) {
    return {
        id,
        name,
        sortName,
        children
    };
}



function Row(props: {
    row: ReturnType<typeof createData>;
    initialOpen?: boolean, openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
}) {
    const { row } = props;
    const [open, setOpen] = React.useState(props.initialOpen || false);
    const dispatch = useDispatch<AppDiapatch>()
    const deletehandler = () => {
        console.log("点击删除");
    }


    return (
        <React.Fragment>
            <tr>
                <td>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <th scope="row">{row.name}</th>
                <td>{row.sortName}</td>
                <td>{row.id}</td>
                <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="sm" variant="solid" color="primary" sx={{ marginRight: ".2rem" }} onClick={() => {
                            props.setTitle("新增")
                            dispatch(setSort({ id: "", name: "", sortName: "", parent: row.id }))
                            props.setOpenDialog(true)
                        }}>新增</Button>
                        <Button size="sm" variant="solid" color="success" sx={{ marginRight: ".2rem" }}
                            onClick={() => {
                                props.setTitle("修改")
                                dispatch(setSort({ id: row.id, name: row.name, sortName: row.sortName, parent: "" }))
                                props.setOpenDialog(true);
                            }}
                        >修改</Button>
                        <Button size="sm" variant="solid" color="danger" sx={{ marginRight: ".2rem" }}
                            onClick={() => {
                                dispatch(openConfirmDialog({ title: "确认", context: "确定要删除吗", url: "/sort/delete", id: row.id }))
                            }}>删除</Button>
                    </Box>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {open && (
                        <Sheet
                            variant="soft"
                            sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
                        >
                            <Typography level="title-md" component="div">
                                该分类下的子类
                            </Typography>
                            <Table
                                borderAxis="none"
                                size="sm"
                                aria-label="purchases"
                            >
                                <thead>
                                    <tr>
                                        <th >分类名称</th>
                                        <th >英文名</th>
                                        <th>id</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.children.map((child) => (
                                        <tr key={child.id}>
                                            <th>{child.name}</th>
                                            <td>{child.sortName}</td>
                                            <td>{child.id}</td>
                                            <td>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button size="sm" variant="plain" color="success" sx={{ marginRight: ".2rem" }}
                                                        onClick={() => {
                                                            props.setTitle("修改")
                                                            dispatch(setSort({ id: child.id, name: child.name, sortName: child.sortName, parent: row.id }))
                                                            props.setOpenDialog(true);
                                                        }}>修改</Button>
                                                    <Button size="sm" variant="plain" color="danger" sx={{ marginRight: ".2rem" }}
                                                        onClick={() => {
                                                            dispatch(openConfirmDialog({ title: "确认", context: "确定要删除吗", url: "/sort/delete", id: child.id }))
                                                        }}>删除</Button>
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}
function Dialog(title: string, open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    const dispatch = useDispatch<AppDiapatch>()
    const router = useRouter()
    const sortForm = useAppSelector((state) => state.formReducer.value.sort)
    return (
        <Modal open={open} onClose={() => setOpen(false)} >
            <ModalDialog>
                <DialogTitle>{title}</DialogTitle>
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        setOpen(false);

                        //@ts-ignore 无语
                        const name: any = event.target[0].value
                        //@ts-ignore 无语
                        const sortName: any = event.target[1].value
                        //@ts-ignore 无语
                        const parent = event.target[2].value
                        if (title == "新增") {
                            Api("/sort/create", {
                                method: "POST", body: JSON.stringify({
                                    name: name,
                                    parent: parent,
                                    sortName: sortName
                                })
                            }).then((res: BaseApi) => {
                                if (res.code == 200) {
                                    dispatch(openSnkckBar({ color: "success", context: "操作成功" }))
                                    location.reload()
                                }
                            })
                        }
                        if (title == "修改") {
                            //@ts-ignore 无语
                            const id = event.target[3].value
                            Api("/sort/update", {
                                method: "PUT", body: JSON.stringify({
                                    name: name,
                                    parent: parent,
                                    sortName: sortName,
                                    id: id
                                })
                            }).then((res: BaseApi) => {
                                if (res.code == 200) {
                                    dispatch(openSnkckBar({ color: "success", context: "操作成功" }))
                                    location.reload()
                                }
                            })
                        }

                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>分类名称</FormLabel>
                            <Input autoFocus required name='name' defaultValue={sortForm.name} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>英文名</FormLabel>
                            <Input autoFocus required name='sortName' defaultValue={sortForm.sortName} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>父级</FormLabel>
                            <Input autoFocus required name='name' disabled={true} defaultValue={sortForm.parent} />
                        </FormControl>
                        {
                            title == '修改' && <FormControl>
                                <FormLabel>ID</FormLabel>
                                <Input autoFocus required name='name' disabled={true} defaultValue={sortForm.id} />
                            </FormControl>
                        }
                        <Button type="submit">提交</Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    )
}
export default function Page() {
    const dispatch = useDispatch()
    const [tableData, setTableData] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>('新增');
    const router = useRouter()

    useEffect(() => {
        getTableData()
    }, [])

    function getTableData() {
        Api("/psort/list", { method: 'GET' }).then((res: BaseApi) => {
            console.log(res)
            if (res.code == 200) {
                setTableData(res.data)
            } else {
                dispatch(openSnkckBar({ color: 'danger', context: res.msg }))
            }
        })
    }


    return (
        <div>
            <div className='buttons pb-2 flex'>
                <Button startDecorator={<Add />} color="primary" sx={{ marginRight: ".5rem" }} onClick={() => {
                    setTitle("新增")
                    dispatch(setInitForm())
                    setOpenDialog(true);
                }}>新增</Button>
            </div>
            <Table
                className="shadow-md"
                aria-label="collapsible table"
            >
                <thead>
                    <tr>
                        <th style={{ width: 40 }} aria-label="empty" />
                        <th style={{ width: '40%' }}>分类名称</th>
                        <th>英文名</th>
                        <th>id</th>
                        <th>操作</th>
                        <th
                            aria-label="last"
                            style={{ width: 'var(--Table-lastColumnWidth)' }}
                        />
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row: any, index) => (
                        <Row key={row.name} row={row} initialOpen={index === 0} openDialog={openDialog} setOpenDialog={setOpenDialog} setTitle={setTitle} />
                    ))}
                </tbody>
            </Table>
            <div>
                {Dialog(title, openDialog, setOpenDialog)}
            </div>
        </div>
    )
}

