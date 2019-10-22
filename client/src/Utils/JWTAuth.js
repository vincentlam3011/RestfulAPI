import axios from 'axios';
const SERVER_URL = 'http://localhost:8080';

// const login = async (data) => {
//     const LOGIN_ENDPOINT = `${SERVER_URL}/user/login`;
//     try {
//         let res = await axios.post(LOGIN_ENDPOINT, data);
//         if (res.status === 200 && res.data.jwt && res.data.expireAt) {
//             let jwt = res.data.jwt;
//             let expireAt = res.data.expireAt;
//             localStorage.setItem("token", jwt);
//             localStorage.setItem("expr", expireAt);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// const register = async (data) => {
//     const REGISTER_ENDPOINT = `${SERVER_URL}/user/register`;
//     try {
//         let res = await axios({
//             method: 'POST',
//             responseType: 'json',
//             url: REGISTER_ENDPOINT,
//             data: data
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }

// const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expr');
// }

function register(data){
    let api = SERVER_URL + '/user/register';
    axios.post(api, { email: data.email, password: data.password }).then(function (res) {
        console.log(res)
    }).catch(function (err) { console.log(err) })
}

function login(data) {
    let api = SERVER_URL + '/user/login';
    axios.post(api, { email: data.email, password: data.password }).then(function (res) {
        console.log(res)
    }).catch(function (err) { console.log(err) })
}

function logout() {
    
}

export { login, register, logout };
