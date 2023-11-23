"use client";

import Button from "@mui/joy/Button";
import { CssVarsProvider, useTheme } from "@mui/joy/styles";
import { Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@mui/joy";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import AlterDialog from "@/app/_component/AlterDialog";
import { AppDiapatch, useAppSelector } from "../_store/store";
import { useDispatch } from "react-redux";
import { setAlterDialog } from "../_store/sign-slice";
import { login } from "../_store/auth-slice";

export default function LoginPage() {

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(true)

    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch<AppDiapatch>()
    const handleLogin = () => {
        console.log(userId)
        console.log(password)
        // Api('/puser/login', {
        //     method: 'post', body: JSON.stringify({
        //         userId: userId,
        //         password: password,
        //     })
        // }).then(res => {
        //     console.log(res)
        // })

        dispatch(setAlterDialog(open))

    }
    const handleHome = () => {
        router.push("/home")
    }
    const LoginComponent = () => {
        return (
            <div
                className={"shadow-md dark:bg-gray-dark bg-gray relative  rounded-md text-center w-5/6 h-2/4 max-h-[300px] max-w-[500px] min-h-[400px] px-2 py-4"}>
                <div className={'absolute right-2 top-2'}>
                    <IconButton variant="soft" onClick={handleHome}>
                        <CloseIcon />
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
                        key={userId}
                        variant="outlined"
                        defaultValue={userId}
                        onBlur={(val) => setUserId(val.target.value)}
                    />
                    <Input
                        className={"w-4/5"}
                        placeholder="密码"
                        size="lg"
                        defaultValue={password}
                        onBlur={(val) => setPassword(val.target.value)}
                        variant="outlined"
                    />
                </div>
                <div className={"flex h-1/3 content-around justify-center flex-wrap"}>
                    <Button size="lg" className="w-4/5" variant="plain"
                        onClick={handleHome}>游客访问/返回主页</Button>
                    <Button size="lg" className="w-3/5 shadow-blue shadow-md" onClick={handleLogin}>登录</Button>
                    <Button size="lg" className={"w-1/5  shadow-md"} variant="plain" onClick={() => {
                        // setOpen(true)
                    }}>注册</Button>
                </div>
                {/* <AlterDialog setOpen={setOpen} open={open} content={'注册尚未开通'} tipInfo={'提示'} /> */}
            </div>
        );
    };

    return (
        <div className={'flex justify-center items-center  h-full'}>
            <LoginComponent />
        </div>
    );
}