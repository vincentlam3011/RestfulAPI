import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { userActions } from '../Action/userAction';

class loginForm extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        const emailForm =
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="email@domain"
                    value={this.handleChange}
                />
            </FormGroup>
        const passwordForm =
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="password placeholder"
                    value={this.handleChange}
                />
            </FormGroup>
        const loginBtn = <Button outline color="primary" id="loginBtn">Log in</Button>
        const registerBtn = <Button outline color="primary" id="registerBtn">Sign up</Button>

        return (
            <div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardBody>
                                <CardTitle className="text-center"><label class="title">LOG IN</label></CardTitle>
                                <div class="form">
                                    <div>{emailForm}</div>
                                    <div>{passwordForm}</div>
                                    <div class="wrapper">
                                        <div id="loginBtnDiv">{loginBtn}</div>
                                        <div id="registerBtnDiv" class="nextBtn">
                                            <Link to="/user/register">
                                                {registerBtn}
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

// export default loginForm;

function mapState(state) {
    return state;
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(loginForm);
export { connectedLoginPage as loginForm };