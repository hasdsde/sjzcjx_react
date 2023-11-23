"use client";

import Button from "@mui/joy/Button";
import { CssVarsProvider, useTheme } from "@mui/joy/styles";
import { Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppDiapatch } from "../_store/store";
import { useDispatch } from "react-redux";
import { openAlterDialog, openSnkckBar } from "../_store/sign-slice";
import { Api, BaseApi } from "../_config/api";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";


export default function LoginPage() {

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")

    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch<AppDiapatch>()
    const handleLogin = () => {
        if (userId == "") {
            dispatch(openAlterDialog({ title: "提示", context: "用户名为空" }))
            return
        }
        if (password == "") {
            dispatch(openAlterDialog({ title: "提示", context: "密码为空" }))
            return
        }
        Api('/puser/login', {
            method: 'post', body: JSON.stringify({
                userId: userId,
                password: password,
            })
        }).then((res: any) => {
            if (res.code == 200) {
                localStorage.removeItem("userInfo")
                localStorage.removeItem("token")
                localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
                localStorage.setItem("token", JSON.stringify(res.data.token))
                dispatch(openSnkckBar({ color: 'success', context: "登录成功" }))
                router.push('/home')
            } else {
                dispatch(openAlterDialog({ title: "错误", context: res.msg }))
            }
        })

        // dispatch(openAlterDialog({ title: "提示", context: "你打开了窗口" }))

    }
    const handleHome = () => {
        router.push("/home")
    }
    const handleRegister = () => {
        dispatch(openAlterDialog({ title: "提示", context: "注册未开放" }))
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
                        handleRegister()
                    }}>注册</Button>
                </div>
            </div>
        );
    };

    return (
        <div className={'flex justify-center items-center  h-full'}>
            <LoginComponent />
        </div>
    );
}