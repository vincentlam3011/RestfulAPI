import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader } from 'reactstrap';
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
        // if (this.state.user.password === this.state.user.confirmPassword) {
        //     register(this.state.user);
        // }
        this.setState({ submitted: true });
        const user = this.state.user;
        if (user.email && user.password && user.confirmPassword) {
            this.props.register(user);
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
                <Label for="exampleEmail">Email</Label>
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
                <Label for="examplePassword">Password</Label>
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
                <Label for="examplePassword">Confirm password</Label>
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

        return (
            <div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardBody>
                                <CardTitle className="text-center"><label class="title">USER REGISTRATION</label></CardTitle>
                                <div class="form">
                                    <div>{emailForm}</div>
                                    <div>{passwordForm}</div>
                                    <div>{confirmPasswordForm}</div>
                                    <div class="wrapper">
                                        {/* <div id="loginBtnDiv">{loginBtn}</div> */}
                                        <Link to='/user/login'>
                                            <div id="registerBtnDiv" class="nextBtn">{registerBtn}</div>
                                            {registering && 'registering'}
                                        </Link>
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
    return state.registering;
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(registerForm);
export { connectedRegisterPage as registerForm };