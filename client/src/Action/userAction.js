import { userConstants } from '../Constants/users';
import { userService } from '../Services/userServices';
import { alertActions } from './alertAction';
import { request } from 'https';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    edit
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function edit(email, username, password, avatar) {
    return dispatch => {
        dispatch(request(email, username, password, avatar));

        userService.edit(email, username, password, avatar)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success('Edit successful'));
            },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };
    function request(user) { return { type: userConstants.EDIT_REQUEST, user } }
    function success(user) {
        var user = JSON.stringify(user);
        user = JSON.parse(user).user;
        user = JSON.stringify(user);
        user = { user: user};
        var token = JSON.parse(localStorage.getItem('user')).token;
        var payload = { user, token };
        console.log(payload);
        localStorage.setItem('user', JSON.stringify(payload));
        console.log("Local after edit success             ", JSON.parse(localStorage.getItem('user')));
        return { type: userConstants.EDIT_SUCCESS, user };
    }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error } }
}

function getAll(param) {
    return dispatch => {
        dispatch(request(param));

        userService.getAll(param)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) {
        // console.log("The user is:   ", users );
        var user = JSON.stringify(users);
        // console.log(param);
        user = JSON.parse(user).user;
        var payload = { user: user, token: param };
        // console.log(payload);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(payload));
        console.log("The local user is now:      ", JSON.parse(localStorage.getItem('user')));
        return { type: userConstants.GETALL_SUCCESS, users };
    }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

