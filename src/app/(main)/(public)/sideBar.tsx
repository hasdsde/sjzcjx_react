'use client'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import PieChart from '@mui/icons-material/PieChart';
import PersonIcon from '@mui/icons-material/Person';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import React, { useEffect, useState } from 'react';
import { Api, BaseApi } from '@/app/_config/api';
import { useDispatch } from 'react-redux';

export default function SideBar() {
    const [currentMenu, changeCurrentMenu] = useState("1")//当前菜单选项

    const [menu, setMenu] = useState("")
    const dispatch = useDispatch()
    const handleMenuChange = (event: React.SyntheticEvent, newValue: string,) => {
        changeCurrentMenu(newValue)
        getMenus(newValue)
    }

    useEffect(() => {
        getMenus("1")
    }, []);


    function getMenus(value: string) {
        if (value == "1") {
            Api("/psort/list", { method: 'GET' }).then((res: BaseApi) => {
                const menu: any = generateMenuBar(res.data)
                setMenu(menu)
            })
        }
        if (value == "2") {
            const managerMenus: object[] = [
                {
                    name: "通用", children: [
                        { name: "URL管理" },
                        { name: "分类管理" },
                        { name: "文件管理" },
                        { name: "资源管理" },
                    ]
                }, {
                    name: "Admin", children: [
                        { name: "用户管理" },
                    ]
                },
            ]
            const menu: any = generateMenuBar(managerMenus)
            setMenu(menu)
        }
    }
    function generateMenuBar(menu: object[]) {
        return menu.map((item: any) => {
            return (
                <>
                    <ListSubheader>{item.name}</ListSubheader>
                    {
                        item.children.map((child: any) => {
                            return (
                                <ListItemButton>
                                    <ListItemDecorator>
                                        <PieChart />
                                    </ListItemDecorator>
                                    {child.name}
                                </ListItemButton>
                            )
                        })
                    }
                </>
            )
        }
        )
    }

    return (
        <>
            <Box sx={{ display: 'flex', borderRadius: 'sm', overflow: 'auto', height: "100%" }}>
                <Sheet
                    variant="solid"
                    invertedColors
                    sx={{
                        p: 2,
                    }}
                >
                    <Select
                        variant="outlined"
                        defaultValue="1"
                        size="sm"
                        startDecorator={
                            <Sheet
                                variant="solid"
                                sx={{
                                    p: 0.75,
                                    borderRadius: '50%',
                                    lineHeight: 0,
                                    alignSelf: 'center',
                                }}
                            >
                                <BubbleChartIcon sx={{ m: 0 }} />
                            </Sheet>
                        }
                        sx={{ py: 1 }}
                        //@ts-ignore 只有这样会生效
                        onChange={handleMenuChange}
                    >
                        <Option value="1">资源分类</Option>
                        <Option value="2">资源管理</Option>
                    </Select>
                    <List
                        sx={{
                            '--ListItem-radius': '8px',
                            '--List-gap': '4px',
                            flexGrow: 0,
                            minWidth: 200,
                        }}
                    >
                        {menu}
                        <ListItem nested>
                            <ListSubheader>更多</ListSubheader>
                            <List>
                                <ListItemButton>关于</ListItemButton>
                                <ListItemButton>Github</ListItemButton>
                            </List>
                        </ListItem>
                    </List>
                </Sheet>
            </Box>
        </>
    )
}