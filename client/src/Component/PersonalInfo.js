import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader, Badge, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../Action/userAction';
import { storage } from '../Firebase/index';
import { isUndefined } from 'util';
// import * as $ from 'jquery';

var $ = require('jquery');

class PersonalInfo extends React.Component {
    componentDidMount() {
        var param = JSON.parse(localStorage.getItem('user')).token;
        this.props.getUser(param);
        console.log("Cur props: ", param);
        console.log("Current:  ", JSON.parse(localStorage.getItem('user')));
    }
    // componentDidUpdate() {
    //     console.log("Next: ", JSON.parse(localStorage.getItem('user')));
    //     console.log("Next state: ", this.state);
    // }
    constructor(props) {
        if (localStorage.getItem('user') === null) {
            window.location.replace('/user/login');
        }
        console.log("Current local: ", JSON.stringify(localStorage.getItem('user')))
        console.log(JSON.parse(localStorage.getItem('user')).user.avatarUrl)

        super(props);
        var avatarUrl = null;
        if (isUndefined(JSON.parse(localStorage.getItem('user')).user.avatarUrl)) {
            avatarUrl = JSON.parse(localStorage.getItem('user')).user.avatar;
        }
        else {
            avatarUrl = JSON.parse(localStorage.getItem('user')).user.avatarUrl;
        }
        this.state = {
            user: {
                username: JSON.parse(localStorage.getItem('user')).user.username,
                oldPassword: null,
                newPassword: null,
                confirmPassword: null,
                // previewImg: (JSON.parse(localStorage.getItem('user')).user.avatarUrl) !== null ? JSON.parse(localStorage.getItem('user')).user.avatarUrl : 'https://miro.medium.com/max/300/0*WK_vAxJo4O7Kdq3j.png',
                previewImg: avatarUrl ? avatarUrl : 'https://miro.medium.com/max/300/0*WK_vAxJo4O7Kdq3j.png',
            },
            submitted: false,
            selectedFile: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImgPreview = this.handleImgPreview.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        console.log(JSON.parse(localStorage.getItem('user')).user)
        const { username, oldPassword, newPassword, confirmPassword, previewImg } = this.state.user;
        var email = JSON.parse(localStorage.getItem('user')).user.email;
        var password = JSON.parse(localStorage.getItem('user')).user.password;
        console.log("Email: ", email);
        console.log("password: ", password);

        if (oldPassword) {
            if (oldPassword === password) {
                if (newPassword && confirmPassword) {
                    if (newPassword === confirmPassword) {
                        password = newPassword;
                    }
                }
            }
        }
        console.log("NEW PASS:   ", newPassword);
        console.log(isUndefined(newPassword))
        var proceed = true;
        console.log(oldPassword);
        console.log(JSON.parse(localStorage.getItem('user')).user.password)
        console.log(newPassword === null)
        if (!(newPassword === null || newPassword === '' || isUndefined(newPassword))) {
            proceed = oldPassword !== '' && oldPassword === JSON.parse(localStorage.getItem('user')).user.password && confirmPassword !== '' && confirmPassword === newPassword;
            console.log(oldPassword !== '');
            console.log(oldPassword === JSON.parse(localStorage.getItem('user')).user.password);
            console.log(confirmPassword === newPassword);
        }
        console.log("Proceed:    ", proceed);
        if (proceed) {
            console.log("Is exist:   ", this.state.selectedFile !== null);
            if (this.state.selectedFile !== null) {
                const upload = storage.ref(`images/${this.state.selectedFile.name}`).put(this.state.selectedFile);
                upload.on('state_changed',
                    (snapshop) => {

                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage.ref('images').child(this.state.selectedFile.name).getDownloadURL().then
                            (url => {
                                console.log("DOWNLOAD LINK:              ", url);
                                var newUrl = url;
                                console.log("The new URL: ", newUrl);
                                let doTask = async () => { await this.props.edit(email, username, password, newUrl, JSON.parse(localStorage.getItem('user')).token) };
                                doTask();
                                setTimeout(() => { window.location.reload() }, 3000);
                            });
                    }
                );
            }
            else {
                // let doTask = async () => { await this.props.edit(email, username, password, previewImg, JSON.parse(localStorage.getItem('user')).token) };
                // doTask();
                this.props.edit(email, username, password, previewImg, JSON.parse(localStorage.getItem('user')).token);
                setTimeout(() => { window.location.reload() }, 2000);
            }
            // this.props.edit(email, username, password, this.state.user.previewImg);
            // var newUsername = JSON.parse(localStorage.getItem('user')).user.username;
            // var newPreviewImg = JSON.parse(localStorage.getItem('user')).user.avatarUrl;
            // setTimeout(console.log("after edit clicked: ", localStorage.getItem('user')), 2000);
            // if (this.state.submitted === true)
            //     this.setState({ user: { username: this.state.username, oldPassword: null, newPassword: null, confirmPassword: null, previewImg: newPreviewImg }, selectedFile: null, submitted: false });

        }
    }
    handleChange(e) {
        const { id, value } = e.target;
        const user = this.state.user;
        this.setState({
            user: {
                ...user,
                [id]: value
            },
        });
    }

    handleImgPreview(e) {
        var username = this.state.user.username;
        var oldPassword = this.state.user.oldPassword;
        console.log("Why change: ", newPassword)
        var newPassword = this.state.newPassword;
        var confirmPassword = this.state.confirmPassword;
        if (e.target.files[0]) {
            const img = e.target.files[0];
            this.setState({
                user: { previewImg: URL.createObjectURL(img), username: username, oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword }, selectedFile: img, submitted: false
            })
        }
    }

    render() {
        console.log("PREVIEW                           ", JSON.parse(localStorage.getItem('user')).user);
        console.log("After render: ", this.state.user);
        const editting = this.props;

        const { user, submitted, } = this.state;
        const emailBox = <FormGroup>
            <Label><b>Email</b></Label>
            <Input
                type="email"
                id="email"
                value={JSON.parse(localStorage.getItem('user')).user.email}
                readOnly
            />
        </FormGroup>

        const usernameBox = <FormGroup>
            <Label><b>Display name</b></Label>
            <Input
                type="text"
                id="username"
                onChange={this.handleChange}
                value={user.username}
            />
        </FormGroup>

        const avatar = <img class="avatar" id="avatar" src={this.state.user.previewImg} alt="your image"></img>;

        const oldPswBox = <FormGroup>
            <Label><b>Old password</b></Label>
            <Input
                type="password"
                id="oldPassword"
                onChange={this.handleChange}
                value={user.oldPassword}
            />
        </FormGroup>

        const newPswBox = <FormGroup>
            <Label><b>New password</b></Label>
            <Input
                type="password"
                id="newPassword"
                onChange={this.handleChange}
                value={user.newPassword}
            />
        </FormGroup>

        const confPswBox = <FormGroup>
            <Label><b>Confirm new password</b></Label>
            <Input
                type="password"
                id="confirmPassword"
                onChange={this.handleChange}
                value={user.confirmPassword}
            />
        </FormGroup>

        const saveBtn = <Button color="primary" id="saveBtn">Save changes</Button>
        const cancelBtn = <Button color="warning" id="cancelBtn">Cancel</Button>

        const uploadBtn = <Button color="primary">
            <input onChange={this.handleImgPreview} type='file' accept="image/*" id="imgInp" />
        </Button>

        return (
            <div >
                <div class="container">
                    <Nav pills >
                        <NavItem>
                            <NavLink href="/game" active><a class="nav-item">Hello <b>{JSON.parse(localStorage.getItem('user')).user.username}</b>, welcome to Tic-tac-toe!</a></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/user/me"><a class="nav-item">Profile</a></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/user/register"><a class="nav-item">Register</a></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/user/login"><a class="nav-item">Logout</a></NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardBody>
                                <CardTitle className="text-center"><label class="title">Personalization</label></CardTitle>
                                <div class="form">
                                    <div class="center">{avatar}</div><br />
                                    <div class="center">{uploadBtn}</div><br />
                                    <div>{emailBox}</div>
                                    <div>{usernameBox}</div>
                                    <div class="center">
                                        <Label><b>Change password</b></Label>
                                    </div>
                                    <div>{oldPswBox}</div>
                                    {/* {submitted && user.oldPassword !== JSON.parse(localStorage.getItem('user')).user.password && user.newPassword !== '' &&
                                        <div className="help-block" class="notification-danger-text">Password does not match</div>} */}
                                    {submitted && user.oldPassword === '' && user.newPassword !== '' && <div className="help-block" class="notification-danger-text">Please input your old password</div>} <br />
                                    <div>{newPswBox}</div>
                                    <div>{confPswBox}</div>
                                    {submitted && user.confirmPassword === '' && user.newPassword !== '' && <div className="help-block" class="notification-danger-text">Please confrim your new password</div>}
                                    {submitted && user.newPassword && user.confirmPassword && user.newPassword !== user.confirmPassword &&
                                        <div className="help-block" class="notification-danger-text">Password does not match</div>} <br />
                                    <div class="center">{submitted && <Badge color="danger">Processing... Please wait!</Badge>}</div> <br />
                                    <div class="wrapper">
                                        <div id="loginBtnDiv">{saveBtn}</div>
                                        <div id="registerBtnDiv">
                                            <Link to="/game">
                                                {cancelBtn}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </form>
            </div>
        )
    }

}
// export {PersonalInfo as personalInfo};

function mapState(state) {
    const { editting } = state.personalization;
    return { editting };
}

const actionCreators = {
    edit: userActions.edit,
    getUser: userActions.getAll
}

const connectedPersonalizationPage = connect(mapState, actionCreators)(PersonalInfo);
export { connectedPersonalizationPage as personalInfo };
