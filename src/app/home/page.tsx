import { Button, Dropdown, Input, Menu, MenuButton, MenuItem } from "@mui/joy";
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import GoogleIcon from '@mui/icons-material/Google';
export default function Page() {

    return (
        <div className="h-full w-full bg-homePage bg-no-repeat bg-cover bg-center flex items-center justify-center">
            <div className="main  w-3/6 h-3/6 min-w-[1000px] min-h-[500px]">
                <div className="searchBar  w-full h-[10%]">
                    <Input className=" opacity-70 transition text-white hover:scale-[1.01] hover:opacity-90 duration-300"
                        startDecorator={
                            <Dropdown>
                                <MenuButton size="lg">
                                    <PetsIcon />
                                </MenuButton>
                                <Menu size="lg">
                                    <MenuItem> <PetsIcon />Baidu</MenuItem>
                                    <MenuItem><GoogleIcon />Google</MenuItem>
                                </Menu>
                            </Dropdown>
                        }
                        placeholder="站内资源和搜索引擎..."
                        endDecorator={<Button size="lg"><SearchIcon />搜索</Button>}
                        sx={{
                            "--Input-radius": "50px",
                            "--Input-minHeight": "50px",
                            "--Input-decoratorChildHeight": "35px",
                            fontSize: "22px",
                            color: "white",
                            background: "black",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}