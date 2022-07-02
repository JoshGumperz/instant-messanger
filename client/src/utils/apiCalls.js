import { getToken } from "./auth";

const loginCall = async (username, password, validEmail) => {
    let bodyToSend = validEmail ? { email: username, password: password } : { username: username, password: password };
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    return response
}

const signupCall = async (email, username, password) => {
    let bodyToSend = { email: email, username: username, password: password }
    const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    return response
}

const logoutCall = async () => {
    const token = getToken()
    try {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
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

export { loginCall, signupCall, logoutCall }