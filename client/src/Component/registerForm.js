import React from 'react';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader, Nav, NavLink, NavItem } from 'reactstrap';
// import { register } from '../Utils/JWTAuth';
import { connect } from 'react-redux';
import { userActions } from '../Action/userAction';


class registerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.email && user.password && user.confirmPassword) {
            if (user.password === user.confirmPassword) {
                this.props.register(user);
                // window.location.replace('/user/login');
                window.location.reload();
            }
        }
    }

    handleChange(e) {
        const { id, value } = e.target;
        const user = this.state.user;
        this.setState({
            user: {
                ...user,
                [id]: value
            }
        });
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;

        const emailForm =
            <FormGroup>
                <Label for="exampleEmail"><b>Email</b></Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="email@domain"
                    onChange={this.handleChange}
                    value={user.email}
                />
            </FormGroup>
        const passwordForm =
            <FormGroup>
                <Label for="examplePassword"><b>Password</b></Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="Your password"
                    onChange={this.handleChange}
                    value={user.password}
                />
            </FormGroup>
        const confirmPasswordForm =
            <FormGroup>
                <Label for="examplePassword"><b>Confirm password</b></Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    onChange={this.handleChange}
                    value={user.confirmPassword}
                />
            </FormGroup>
        // const loginBtn = <Button outline color="primary" id="loginBtn">Log in</Button>
        const registerBtn = <Button outline color="primary" id="registerBtn">Sign me up</Button>

        const usernameForm =
            <FormGroup>
                <Label for="exampleEmail"><b>Username</b></Label>
                <Input
                    type="text"
                    // required
                    id="username"
                    placeholder="Your display name"
                    onChange={this.handleChange}
                    value={user.username}
                />
            </FormGroup>

        return (
            <div>
                <div class="container">
                    <Nav pills >
                        <NavItem>
                            <NavLink href="/game" active><a class="nav-item">Hello, welcome to Tic-tac-toe!</a></NavLink>
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
                                <CardTitle className="text-center"><label class="title">USER REGISTRATION</label></CardTitle>
                                <div class="form">
                                    <div>{emailForm}</div>
                                    {submitted && !user.email &&
                                        <div className="help-block" class="notification-danger-text">Email is required</div>
                                    }
                                    <br></br>
                                    <div>{usernameForm}</div>
                                    {submitted && !user.username &&
                                        <div className="help-block" class="notification-danger-text">Username is required</div>
                                    }
                                    <br></br>
                                    <div>{passwordForm}</div>
                                    {submitted && !user.password &&
                                        <div className="help-block" class="notification-danger-text">Password is required</div>
                                    }
                                    <br></br>
                                    <div>{confirmPasswordForm}</div>
                                    {submitted && !user.password &&
                                        <div className="help-block" class="notification-danger-text">Reconfirm password</div>
                                    }
                                    {submitted && user.password !== user.confirmPassword &&
                                        <div className="help-block" class="notification-danger-text">Password does not match</div>
                                    }
                                    <br></br>
                                    <div class="wrapper">
                                        {/* <div id="loginBtnDiv">{loginBtn}</div> */}
                                        {/* <Link to='/user/login'> */}
                                        <div id="registerBtnDiv" class="nextBtn">{registerBtn}</div>
                                        {/* </Link> */}
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

// export default registerForm;

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(registerForm);
export { connectedRegisterPage as registerForm };