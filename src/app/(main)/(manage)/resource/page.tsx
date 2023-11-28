'use client'
import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import { Box, Button, Chip, DialogTitle, FormControl, FormLabel, Input, List, ListDivider, ListItem, ListItemDecorator, Modal, ModalDialog, Select, Stack, SvgIcon, Typography, listItemDecoratorClasses, styled } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { Api, BaseApi } from '@/app/_config/api';
import { useDispatch } from 'react-redux';
import { openAlterDialog, openConfirmDialog, openSnkckBar } from '@/app/_store/sign-slice';
import { AppDiapatch, useAppSelector } from '@/app/_store/store';
import { setInitForm, setResource, setSort } from '@/app/_store/form-slice';
import { useRouter } from 'next/navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FileApi } from '@/app/_config/fileApi';
import { Check } from '@mui/icons-material';
import Option, { optionClasses } from '@mui/joy/Option';
function createData(
    id: string,
    name: string,
    iconId: string,
    otherName: string,
    sortId: string,
    uploader: string,
    createdAt: string,
    updatedAt: string,
    comment: string
) {
    return {
        id,
        name,
        iconId,
        otherName,
        sortId,
        uploader,
        createdAt,
        updatedAt,
        comment
    };
}



function Row(props: {
    row: ReturnType<typeof createData>;
    initialOpen?: boolean, openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
}) {
    const { row } = props;
    const dispatch = useDispatch<AppDiapatch>()
    const [sorts, setSorts]: any = React.useState("")

    useEffect(() => {
        getSortData();
    }, [])
    function getSortData() {
        Api("/psort/list").then((res: BaseApi) => {
            setSorts(res.data)
        })
    }
    return (
        <React.Fragment>
            <tr>
                <th >{row.id}</th>
                <th >{row.name}</th>
                <td>{row.otherName}</td>
                <td>{row.comment}</td>
                <td>
                    {row.sortId}
                    {Object.entries(sorts).map((sort: any, index) => (
                        sort[1].children.map(child => {
                            <div>{child.name}</div>
                        })
                    ))}
                </td>

                <td>{row.uploader}</td>
                <td>
                    <img className='w-[50px] h-[50px]' src={row.iconId} alt="" />
                </td>
                <td>{row.createdAt}</td>
                <td>{row.updatedAt}</td>
                <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="sm" variant="solid" color="success" sx={{ marginRight: ".2rem" }}
                            onClick={() => {
                                props.setTitle("修改")
                                dispatch(setResource({
                                    id: row.id, name: row.name, otherName: row.otherName, comment: row.comment, uploader: row.uploader, iconId: row.iconId, sortId: row.sortId
                                }))
                                props.setOpenDialog(true);
                            }}
                        >修改</Button>
                        <Button size="sm" variant="solid" color="danger" sx={{ marginRight: ".2rem" }}
                            onClick={() => {
                                dispatch(openConfirmDialog({ title: "确认", context: "确定要删除吗", url: "/resource/delete", id: row.id }))
                            }}>删除</Button>
                    </Box>
                </td>
            </tr>
        </React.Fragment>
    );
}
function Dialog(title: string, open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        getSortData()
    }, [])

    const dispatch = useDispatch<AppDiapatch>()
    const sortForm = useAppSelector((state) => state.formReducer.value.resource)
    const [iconUrl, setIconUrl] = React.useState("")
    const [sorts, setSorts]: any = React.useState("")

    const handleImgUpload = (e: any) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        FileApi("/file/upload", { method: 'POST', body: formData }).then((res: BaseApi) => {
            if (res.code == 200) {
                setIconUrl(res.data)
            } else {
                dispatch(openSnkckBar({ color: "warning", context: res.msg }))
            }
        })
    }


    function getSortData() {
        Api("/psort/list").then((res: BaseApi) => {
            setSorts(res.data)
        })
    }

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
                        const otherName: any = event.target[1].value
                        //@ts-ignore 无语
                        const comment: any = event.target[2].value
                        //@ts-ignore 无语
                        const uploader: any = event.target[3].value
                        //@ts-ignore 无语
                        const sortId: any = event.target[5].id
                        if (title == "新增") {
                            Api("/resource/save", {
                                method: "POST", body: JSON.stringify({
                                    name: name,
                                    otherName: otherName,
                                    comment: comment,
                                    iconId: iconUrl,
                                    uploader: uploader,
                                    sortId: sortId,
                                }
                                )
                            }).then((res: BaseApi) => {
                                if (res.code == 200) {
                                    dispatch(openSnkckBar({ color: "success", context: "操作成功" }))
                                    location.reload()
                                }
                            })
                        }
                        if (title == "修改") {
                            //@ts-ignore 无语
                            const id: any = event.target[6].value
                            const params: any = {
                                name: name,
                                otherName: otherName,
                                comment: comment,
                                uploader: uploader,
                                sortId: sortId,
                                id: id
                            }
                            if (iconUrl != "") {
                                params.iconId = iconUrl
                            }
                            Api("/resource/update", {
                                method: "PUT", body: JSON.stringify(
                                    params
                                )
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
                            <FormLabel>名称</FormLabel>
                            <Input autoFocus required defaultValue={sortForm.name} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>别名</FormLabel>
                            <Input autoFocus required defaultValue={sortForm.otherName} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>备注</FormLabel>
                            <Input autoFocus required defaultValue={sortForm.comment} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>大小</FormLabel>
                            <Input autoFocus required defaultValue={sortForm.uploader} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>图标</FormLabel>
                            <Input type='file' variant="outlined" onChange={(e) => handleImgUpload(e)} />
                            {iconUrl != "" && '文件已上传'}
                        </FormControl>
                        <FormControl>
                            <FormLabel>分类</FormLabel>
                            <Select
                                defaultValue={sortForm.sortId}
                                placeholder="选择分类"
                                slotProps={{
                                    listbox: {
                                        component: 'div',
                                        sx: {
                                            maxHeight: 240,
                                            overflow: 'auto',
                                            '--List-padding': '0px',
                                            '--ListItem-radius': '0px',
                                        },
                                    },
                                }}
                            >
                                {Object.entries(sorts).map((sort: any, index) => (
                                    <div key={sort.id}>
                                        {index !== 0 && <ListDivider role="none" />}
                                        <List
                                            aria-labelledby={`select-group-${sort[1].name}`}
                                            sx={{ '--ListItemDecorator-size': '28px' }}
                                        >
                                            <ListItem id={`select-group-${sort[1].name}`} sticky>
                                                <Typography level="body-xs" textTransform="uppercase">
                                                    {sort[1].name}
                                                    {/* ({sort.children.length}) */}
                                                </Typography>
                                            </ListItem>
                                            {sort[1].children.map((anim: any) => (
                                                <Option
                                                    key={anim.id}
                                                    value={anim.id}
                                                    id={anim.id}
                                                    label={
                                                        <div>
                                                            <Chip
                                                                size="sm"
                                                                sx={{ borderRadius: 'xs', mr: 1 }}
                                                            >
                                                                {sort[1].name}
                                                            </Chip>{' '}
                                                            {anim.name}
                                                        </div>
                                                    }
                                                >
                                                    <ListItemDecorator sx={{ opacity: 0 }}>
                                                        <Check />
                                                    </ListItemDecorator>
                                                    {anim.name}
                                                </Option>
                                            ))}
                                        </List>
                                    </div>
                                ))}
                            </Select>
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
        </Modal >
    )
}
export default function Page() {
    const dispatch = useDispatch()
    const [tableData, setTableData] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>('新增');


    useEffect(() => {
        getTableData();
    }, [])

    function getTableData() {
        Api("/presource/list", { method: 'GET' }).then((res: BaseApi) => {
            console.log(res.data)
            if (res.code == 200) {
                setTableData(res.data.data)
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
                        <th>ID</th>
                        <th>名字</th>
                        <th>别名</th>
                        <th>备注</th>
                        <th>分类</th>
                        <th>大小</th>
                        <th>图标</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                        <th>操作</th>
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

