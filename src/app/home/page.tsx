'use client'
import { IconButton } from "@mui/joy";
import SearchBar from "./searchBar";
import { FavoriteBorder } from "@mui/icons-material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter()
    return (
        <div className="h-full w-full bg-homePage bg-no-repeat bg-cover bg-center flex items-center justify-center relative dark:bg-black dark:opacity-90">
            <div className=" w-4/6 h-3/6 min-w-[200px] min-h-[500px] max-w-[1000px] max-h-[400px] flex flex-wrap absolute top-[20%]">
                <SearchBar></SearchBar>
                <div className="container  flex justify-between">
                    <div className="left h-full w-6/12 p-3 min-h-[10rem] flex flex-wrap">
                        <div className="logo w-full  flex">
                            <div className="h-[120px]">
                                <img className="h-[120px]" src="https://img.hasdsd.cn/img/icon.png" alt="" />
                            </div>
                            <div className="align-middle flex flex-col justify-center dark:text-black text-white">
                                <p>
                                    石家庄学院
                                </p>
                                <p className="text-[2rem]">
                                    E朝E夕计算机协会
                                </p>
                            </div>
                        </div>

                        <div className="welcom  opacity-70 transition w-full h-2/5 text-black dark:text-white ">
                            <div className="w-5/6 cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] duration-300 bg-white dark:bg-black   h-full text-center flex justify-center items-center">
                                <span>
                                    正在建设中的社团网站....
                                </span>
                            </div>
                        </div>
                        <div className="link opacity-70">
                            <IconButton variant="soft">
                                <FavoriteBorder />
                            </IconButton>
                        </div>
                    </div>
                    <div className="right  h-full w-1/2 p-2 opacity-70 text-white">
                        <div className="top h-1/2 flex justify-around pb-2 ">
                            <div className="h-full w-[48%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white  text-center flex justify-center items-center">
                                左侧
                            </div>
                            <div className="h-full w-[48%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                right
                            </div>
                        </div>
                        <div className="bottom h-1/2 flex flex-wrap justify-around">
                            <div onClick={() => router.push("/list")} className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                <CloudDownloadIcon /> &nbsp; 资源
                            </div>
                            <div className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                <LoginIcon />  &nbsp;登录
                            </div>
                            <div className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                left
                            </div>
                            <div className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                left
                            </div>
                            <div className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                left
                            </div>
                            <div className="h-[45%] w-[31%] active:scale-[0.99] cursor-pointer rounded-md hover:scale-[1.01] hover:opacity-90 duration-300 bg-white dark:bg-black text-black dark:text-white   text-center flex justify-center items-center">
                                left
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}