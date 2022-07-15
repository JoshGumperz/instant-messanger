import { getToken } from "./auth";

const publicRequest = async (url, method, body) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        });
        return response
    } catch (err) {
        console.log(err)
        return err
    }

}

const userRequest = async (url, method, body) => {
    const token = getToken()
    try {
        const response = await fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`
            },
        });
        return response
    } catch (err) {
        console.log(err)
        return err
    }
    
}

export { publicRequest, userRequest }