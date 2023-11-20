import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/providers";

const inter = Inter({subsets: ['latin']})
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer base, mixins, components, modifiers, layout;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `
                }}
            />
        </head>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
