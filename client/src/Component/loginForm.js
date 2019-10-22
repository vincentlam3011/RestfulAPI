import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

class loginForm extends React.Component {
    render() {
        const emailForm =
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    type="email"
                    id="loginEmailTxt"
                    placeholder="email@domain"
                />
            </FormGroup>
        const passwordForm =
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                />
            </FormGroup>
        const loginBtn = <Button outline color="primary" id="loginBtn">Log in</Button>
        const registerBtn = <Button outline color="primary" id="registerBtn">Sign up</Button>

        return (
            <div>
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
            </div>
        )
    }
}

export default loginForm;