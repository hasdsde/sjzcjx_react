'use client'
import Button from '@mui/joy/Button';

export default function LoginPage() {

    const LoginComponent = () =>{
        return (
            <div className={'w-5/6 h-2/4 max-h-[400px] max-w-[600px] min-h-[300px]'}>
               <div>登录</div>
                <Button variant="solid" color="primary">Button</Button>
            </div>
        )
    }

    return (
        <div className={'flex justify-center items-center  h-full'}>
            <LoginComponent/>
        </div>
    )
}