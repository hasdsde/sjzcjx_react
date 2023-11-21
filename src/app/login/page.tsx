"use client";

import Button from "@mui/joy/Button";
import {CssVarsProvider, useTheme} from "@mui/joy/styles";
import {Box} from "@mui/material";
import {Input} from "@mui/joy";


export default function LoginPage() {
    const theme = useTheme();
    const LoginComponent = () => {
        return (
            <div
                className={"shadow-md dark:bg-gray-dark bg-gray rounded-md text-center w-5/6 h-2/4 max-h-[300px] max-w-[500px] min-h-[400px] px-2 py-4"}>
                <div className={"text-center "}>
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
                    <Button size="lg" className="w-4/5" variant="plain">游客访问/返回主页</Button>
                    <Button size="lg" className="w-3/5">登录</Button>
                    <Button size="lg" className={"w-1/5"} variant="plain">注册</Button>
                </div>
            </div>
        );
    };

    return (
        <div className={"flex justify-center items-center  h-full"}>
            <LoginComponent/>
        </div>
    );
}