export const userService = {
    login,
    logout,
    register,
    getAll,
    edit,
};

const apiUrl = 'http://localhost:8080'

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll(param) {
    const requestOptions = {
        method: 'GET',
        params: param
    }
    console.log(param);
    return fetch(`${apiUrl}/user/me?secret_token=${param}`, requestOptions).then(handleResponse).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function edit(email, username, password, avatarUrl, token) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, avatarUrl, token })
    };
    console.log(requestOptions.body)
    return fetch(`${apiUrl}/user/edit`, requestOptions).then(handleResponse).then(user => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        console.log("From service: " ,user);
        return user;
    });
}

function handleResponse(res) {
    return res.text().then(text => {
        const data = text && JSON.parse(text);
        if (!res.ok) {
            if (res.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}