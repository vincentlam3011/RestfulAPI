import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader, Badge, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../Action/userAction';

class PersonalInfo extends React.Component {
    constructor(props) {
        if (localStorage.getItem('user') === null) {
            window.location.replace('/user/login');
        }
        console.log(JSON.parse(localStorage.getItem('user')).user)
        super(props);
        this.state = {
            user: {
                username: JSON.parse(localStorage.getItem('user')).user.username,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            changed: false,
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        console.log(JSON.parse(localStorage.getItem('user')).user)
        const { username, oldPassword, newPassword, confirmPassword } = this.state.user;
        var email = JSON.parse(localStorage.getItem('user')).user.email;
        var password = JSON.parse(localStorage.getItem('user')).user.password;
        if (oldPassword) {
            if (oldPassword === password) {
                if (newPassword && confirmPassword) {
                    if (newPassword === confirmPassword) {
                        password = newPassword;
                    }
                }
            }
        }
        var proceed = true;
        if (newPassword) {
            proceed = !oldPassword && oldPassword === JSON.parse(localStorage.getItem('user')).user.password && !confirmPassword && confirmPassword === newPassword;
        }
        console.log("Proceed:    ", proceed);
        console.log(email, username, password);
        if (proceed) {
            this.props.edit(email, username, password);
            window.location.replace('/user/login');
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
            changed: true,
        });
    }

    render() {
        const editting = this.props;
        const { user, submitted, changed } = this.state;
        const email = JSON.parse(localStorage.getItem('user')).user.email;
        const curPsw = JSON.parse(localStorage.getItem('user')).user.password;

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

        const avatar = <img class="avatar" src={(JSON.parse(localStorage.getItem('user')).user.avatarUrl) ? JSON.parse(localStorage.getItem('user')).user.avatarUrl : '../logo192.png'}></img>;

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
        return (
            <div>
                <div>
                    <Nav pills >
                        <NavItem>
                            <NavLink disabled active><a class="nav-item">Hello <b>{JSON.parse(localStorage.getItem('user')).user.username}</b>, welcome to Tic-tac-toe!</a></NavLink>
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
                                    <div class="center">{avatar}</div>
                                    <div>{emailBox}</div>
                                    <div>{usernameBox}</div>
                                    <div class="center">
                                        <Label><b>Change password</b></Label>
                                    </div>
                                    <div>{oldPswBox}</div>
                                    {submitted && user.oldPassword !== JSON.parse(localStorage.getItem('user')).user.password && user.newPassword &&
                                        <div className="help-block" class="notification-danger-text">Password does not match</div>}
                                    {submitted && !user.oldPassword && user.newPassword && <div className="help-block" class="notification-danger-text">Please input your old password</div>} <br />
                                    <div>{newPswBox}</div>
                                    <div>{confPswBox}</div>
                                    {submitted && !user.confirmPassword && user.newPassword && <div className="help-block" class="notification-danger-text">Please confrim your new password</div>}
                                    {submitted && user.newPassword && user.confirmPassword && user.newPassword !== user.confirmPassword &&
                                        <div className="help-block" class="notification-danger-text">Password does not match</div>} <br />
                                    <div class="center"><Badge color="danger">You will have to re-login after finished editting</Badge></div> <br />
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
