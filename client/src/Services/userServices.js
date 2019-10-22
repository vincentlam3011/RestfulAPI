export const userService = {
    login,
    logout,
    register,
    getAll,
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

function getAll() {
    let user = localStorage.getItem('user');
    let param;
    if (user && user.token) {
        param = { secret_token: user.token };
    } else {
        param = {};
    }
    const requestOptions = {
        method: 'GET',
        params: param
    }
    return fetch(`${apiUrl}/me`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/user/register`, requestOptions).then(handleResponse);
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