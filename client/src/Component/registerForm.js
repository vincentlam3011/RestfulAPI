import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { FormGroup, Label, Input, Card, CardTitle, Button, CardBody, CardHeader } from 'reactstrap';

class registerForm extends React.Component {
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
                    placeholder="Your password"
                />
            </FormGroup>
        const confirmPasswordForm =
            <FormGroup>
                <Label for="examplePassword">Confirm password</Label>
                <Input
                    type="password"
                    placeholder="Re-enter your password"
                />
            </FormGroup>
        // const loginBtn = <Button outline color="primary" id="loginBtn">Log in</Button>
        const registerBtn = <Button outline color="primary" id="registerBtn">Sign me up</Button>

        return (
            <div>
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
                                    <div id="registerBtnDiv" class="nextBtn">{registerBtn}</div>
                                </div>
                            </div>
                        </CardBody>
                    </CardHeader>
                </Card>
            </div>
        )
    }
}

export default registerForm;