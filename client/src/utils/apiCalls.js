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

// const signupCall = async (email, username, password) => {
//     let bodyToSend = { email: email, username: username, password: password }
//     const response = await fetch('/api/user/register', {
//         method: 'POST',
//         body: JSON.stringify(bodyToSend),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     return response
// }

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