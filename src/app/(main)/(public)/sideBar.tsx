'use client'
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import PieChart from '@mui/icons-material/PieChart';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AddIcon from '@mui/icons-material/Add';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import React from 'react';
export default function SideBar() {
    const [color, setColor] = React.useState<ColorPaletteProp>('neutral');
    return (
        <>
            <Box sx={{ display: 'flex', borderRadius: 'sm', overflow: 'auto', height: "100%" }}>
                <Sheet
                    variant="solid"
                    invertedColors
                    sx={{
                        p: 2,
                        // ...(color !== 'neutral' && {
                        //     bgcolor: `${color}.800`,
                        // }),
                        bgcolor: 'grey',
                        height: "100%"
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
                    >
                        <Option value="1">资源列表</Option>
                        <Option value="2">编辑页面</Option>
                    </Select>
                    <List
                        sx={{
                            '--ListItem-radius': '8px',
                            '--List-gap': '4px',
                            flexGrow: 0,
                            minWidth: 200,
                        }}
                    >
                        <ListItemButton>
                            <ListItemDecorator>
                                <PieChart />
                            </ListItemDecorator>
                            Dashboard
                        </ListItemButton>
                        <ListItemButton selected variant="soft">
                            <ListItemDecorator>
                                <SmsIcon />
                            </ListItemDecorator>
                            Chat
                            <Chip
                                data-skip-inverted-colors
                                size="sm"
                                color="warning"
                                variant="soft"
                                sx={{ ml: 'auto' }}
                            >
                                5
                            </Chip>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemDecorator>
                                <PersonIcon />
                            </ListItemDecorator>
                            Team
                        </ListItemButton>
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