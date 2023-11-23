import { useAppSelector } from "@/app/_store/store";

let BaseUrl = "http://127.0.0.1:8080"

export async function Api(url: string, options: RequestInit = {}): Promise<any> {

    const headers = new Headers(options.headers)

    // if (userInfo.value.token != "") {
    //     headers.set("token", userInfo.value.token)
    // }
    headers.set('Content-Type', 'application/json')

    const response = await fetch(BaseUrl + url, {
        ...options, headers
    })

    if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text()
            // Manage other Content-Type cases or when Content-Type is absent
        }
    } else {
        // Handle other non-200 status codes as needed
        throw new Error(`Request failed with status ${response.status}`);
    }

}