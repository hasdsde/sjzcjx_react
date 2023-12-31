let BaseUrl = "http://127.0.0.1:8080"

export type BaseApi = {
    code: number | any,
    data: object | any,
    msg: string
}

export async function FileApi(url: string, options: RequestInit = {}): Promise<any> {

    const headers = new Headers(options.headers)

    const token: string = localStorage.getItem("token") ?? ""
    if (token != "") {
        headers.set("token", token)
    }

    console.log(options.headers)

    // if (type == null) {
    //     headers.set('Content-Type', 'application/json')
    // }

    const response = await fetch(BaseUrl + url, {
        ...options, headers
    })
    if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            return response.text()
            // Manage other Content-Type cases or when Content-Type is absent
        }
    } else {
        // Handle other non-200 status codes as needed
        throw new Error(`Request failed with status ${response.status}`);
    }

}