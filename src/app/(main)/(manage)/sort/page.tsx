'use client'
import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import { Api, BaseApi } from '@/app/_config/api';
import { useDispatch } from 'react-redux';
import { openAlterDialog, openSnkckBar } from '@/app/_store/sign-slice';
function createData(
    id: number,
    sortName: string,
    name: string,
    children: object
) {
    return {
        id,
        name,
        sortName,
        children: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}
function Row(props: { row: ReturnType<typeof createData>; initialOpen?: boolean }) {
    const { row } = props;
    const [open, setOpen] = React.useState(props.initialOpen || false);

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
                        <Button size="sm" variant="plain" color="neutral">
                            Edit
                        </Button>
                        <Button size="sm" variant="soft" color="danger">
                            Delete
                        </Button>
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
                                borderAxis="bothBetween"
                                size="sm"
                                aria-label="purchases"
                                sx={{
                                    '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                                        { textAlign: 'right' },
                                    '--TableCell-paddingX': '0.5rem',
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Total price ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.children.map((child) => (
                                        <tr key={child.date}>
                                            <th scope="row">{child.date}</th>
                                            <td>{child.customerId}</td>
                                            <td>{child.amount}</td>
                                            <td>
                                                {Math.round(child.amount * 100) / 100}
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

export default function Page() {
    const dispatch = useDispatch()
    const [tableData, setTableData] = React.useState([])

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
                <Button startDecorator={<Add />} color="primary" sx={{ marginRight: ".5rem" }} >新增</Button>
                <Button startDecorator={<CloudSyncIcon />} color="success" sx={{ marginRight: ".5rem" }}>修改</Button>
                <Button startDecorator={<DeleteForeverIcon />} color="danger" sx={{ marginRight: ".5rem" }}>删除</Button>
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
                        <th>id&nbsp;(g)</th>
                        <th>操作</th>
                        <th
                            aria-label="last"
                            style={{ width: 'var(--Table-lastColumnWidth)' }}
                        />
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row: any, index) => (
                        <Row key={row.name} row={row} initialOpen={index === 0} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}