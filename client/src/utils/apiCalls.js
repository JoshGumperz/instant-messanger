const loginCall = async (username, password, validEmail) => {
    let bodyToSend = validEmail ? { email: username, password: password } : { username: username, password: password };
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json()
    return json
}

const signupCall = async (email, username, password) => {
    let bodyToSend = { email: email, username: username, password: password }
    const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json()
    if(response.ok) {
        const obj = {...json, ok: true}
        console.log(obj)
        return obj
    } else {
        return {...json, ok: false}
    }
}

module.exports = { loginCall, signupCall }