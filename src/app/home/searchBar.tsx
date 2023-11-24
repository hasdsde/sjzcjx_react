'use client'
import { Button, Dropdown, Input, Menu, MenuButton, MenuItem } from "@mui/joy";
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import GoogleIcon from '@mui/icons-material/Google';
export default function SearchBar() {
    return (
        <div className="searchBar  w-full h-[10%]">
            <Input className=" opacity-70 transition  bg-black hover:scale-[1.01] hover:opacity-90 duration-300"
                startDecorator={
                    <Dropdown>
                        <MenuButton>
                            <PetsIcon />
                        </MenuButton>
                        <Menu >
                            <MenuItem> <PetsIcon />Baidu</MenuItem>
                            <MenuItem><GoogleIcon />Google</MenuItem>
                        </Menu>
                    </Dropdown>
                }
                placeholder="站内资源"
                endDecorator={<Button ><SearchIcon /><span className="hidden lg:inline ">搜索</span></Button>}
                sx={{
                    "--Input-radius": "50px",
                    "--Input-minHeight": "3rem",
                    "--Input-decoratorChildHeight": "2.2rem",
                    fontSize: "1.3rem",
                }}
            />
        </div>
    )
}