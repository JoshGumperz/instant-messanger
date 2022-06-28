const loginCall = async (username, password, validEmail) => {
    let bodyToSend = validEmail ? { email: username, password: password } : { username: username, password: password };
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        const json = await response.json();
        console.log(json)
    } else {
        const json = await response.json();
        console.log(json)
    }
}

const signupCall = async (email, username, password) => {
    let bodyToSend = { email: email, username: username, password: password }
    const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        const json = await response.json();
        console.log(json)
    } else {
        const json = await response.json();
        console.log(json)
    }
}

module.exports = { loginCall, signupCall }