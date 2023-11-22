"use client";

import Button from "@mui/joy/Button";
import {CssVarsProvider, useTheme} from "@mui/joy/styles";
import {Box, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {Input} from "@mui/joy";
import {useRouter} from "next/navigation";
import {Dispatch, SetStateAction, useState} from "react";
import AlterDialog from "@/app/_component/AlterDialog";


export default function LoginPage() {
    const theme = useTheme();
    const router = useRouter()

    const handleHome = () => {
        router.push("/home")
    }
    const [open, setOpen]: [boolean | undefined, Dispatch<SetStateAction<boolean | undefined>>] = useState<boolean>()
    const LoginComponent = () => {
        return (
            <div
                className={"shadow-md dark:bg-gray-dark bg-gray relative  rounded-md text-center w-5/6 h-2/4 max-h-[300px] max-w-[500px] min-h-[400px] px-2 py-4"}>
                <div className={'absolute right-2 top-2'}>
                    <IconButton variant="soft" onClick={handleHome}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className={"text-center"}>
                    <CssVarsProvider theme={theme}>
                        <Box sx={(theme) => theme.typography.h1}>登录</Box>
                    </CssVarsProvider>
                </div>
                <div className={"my-3 flex  justify-center flex-wrap h-2/5 content-around"}>
                    <Input
                        className={"w-4/5 "}
                        placeholder="账户名"
                        size="lg"
                        variant="outlined"
                    />
                    <Input
                        className={"w-4/5"}
                        placeholder="密码"
                        size="lg"
                        variant="outlined"
                    />
                </div>
                <div className={"flex h-1/3 content-around justify-center flex-wrap flex"}>
                    <Button size="lg" className="w-4/5" variant="plain"
                            onClick={handleHome}>游客访问/返回主页</Button>
                    <Button size="lg" className="w-3/5 shadow-blue shadow-md">登录</Button>
                    <Button size="lg" className={"w-1/5  shadow-md"} variant="plain" onClick={() => {
                        setOpen(true)
                    }}>注册</Button>
                </div>
                <AlterDialog setOpen={setOpen} open={open} content={'注册尚未开通'} tipInfo={'提示'}/>
            </div>
        );
    };

    return (
        <div className={'flex justify-center items-center  h-full'}>
            <LoginComponent/>
        </div>
    );
}