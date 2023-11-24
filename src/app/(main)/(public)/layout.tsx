'use client'
import { Badge, Box, Button, Chip, ColorPaletteProp, Dropdown, IconButton, Input, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem, Sheet, Typography } from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeIcon from '@mui/icons-material/Home';
import React from "react";
import SideBar from "./sideBar";

export default function Page({ children }: { children: React.ReactNode }) {
    const [color, setColor] = React.useState<ColorPaletteProp>('primary');
    return (
        <div className="h-full flex flex-col">
            <div className="Header">
                <Sheet
                    variant="solid"
                    color={color}
                    invertedColors
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        p: 2,
                        borderRadius: { xs: 0, sm: 'sm' },
                        minWidth: 'min-content',
                        ...(color !== 'warning' && {
                            background: (theme) =>
                                `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
                        }),
                    }}
                >
                    <IconButton
                        variant="soft"
                        size="sm"
                        onClick={() => {
                            const colors: ColorPaletteProp[] = [
                                'primary',
                                'neutral',
                                'danger',
                                'success',
                                'warning',
                            ];
                            const nextColorIndex = colors.indexOf(color) + 1;
                            setColor(colors[nextColorIndex] ?? colors[0]);
                        }}
                    >
                        <HomeIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
                        <Dropdown>
                            <MenuButton
                                sx={{
                                    '--Button-radius': '1.5rem',
                                }}
                                variant="outlined"
                                endDecorator={<KeyboardArrowDownIcon />}
                            >
                                资源
                            </MenuButton>
                            <Menu
                                variant="outlined"
                                placement="bottom-start"
                                disablePortal
                                size="sm"
                                sx={{
                                    '--ListItemDecorator-size': '24px',
                                    '--ListItem-minHeight': '40px',
                                    '--ListDivider-gap': '4px',
                                    minWidth: 200,
                                }}
                            >
                                <MenuItem>
                                    <ListItemDecorator>
                                        <CloudDownloadIcon />
                                    </ListItemDecorator>
                                    资源
                                </MenuItem>
                                <MenuItem>
                                    <ListItemDecorator>
                                        <MenuBookIcon />
                                    </ListItemDecorator>
                                    博客
                                </MenuItem>
                                <ListDivider />
                            </Menu>
                        </Dropdown>
                    </Box>
                    <Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
                        <Input
                            placeholder="Search"
                            variant="soft"
                            size="sm"
                            endDecorator={
                                <Typography
                                    component="span"
                                    variant="outlined"
                                    level="body-xs"
                                    sx={{ bgcolor: 'background.surface', mx: 0 }}
                                >
                                    Enter
                                </Typography>
                            }
                            sx={{
                                '--Input-paddingInline': '12px',
                                width: 240,
                                display: { xs: 'none', lg: 'flex' },
                            }}
                        />
                        <Button
                            startDecorator={<AddIcon />}
                            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                        >
                            登录
                        </Button>

                    </Box>
                </Sheet>
            </div>
            <div className="main flex-1">
                <SideBar />
                {children}
            </div>
        </div>

    )
}