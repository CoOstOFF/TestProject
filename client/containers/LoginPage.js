import React from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import Auth from '../Auth'
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap'

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {login: true}
    }

    onClickLoginHandler = () => {
    };

    onClickSignUpHandler = () => {
        fetch('/signup', {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({name: this.state.name, password: this.state.password})
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                this.setState({message: data.message});
                if (data.success) {
                    this.setState({login: true, name: "", password: ""})
                }
            })
    };

    onChangeNameInputHandler = (e) => {
        this.setState({name: e.target.value});
    };

    onChangePasswordInputHandler = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        let imgUrl = "http://static.tumblr.com/43467ee80971d8a4e52f15fd80a50539/nvi0dip/QCwnybas4/tumblr_static_afdblu9pkhkwosgckkcsocc4.jpg";
        return (
            <div>
                <div style={{
                    width: "100%",
                    height: "100%",
                    filter: "grayscale(50%)",
                    position: "absolute",
                    background: 'url(' + imgUrl + ') no-repeat center center fixed',
                    backgroundSize: "cover"
                }}/>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                }}>
                    <div style={{
                        width: "50%",
                        display: "block",
                        textAlign: "center"
                    }}>
                        <div>
                            <span style={{
                                color: "#FFFFFF",
                                fontSize: 40,
                            }}>Welcome to</span>
                        </div>
                        <div>
                            <span style={{color: "#FFFFFF", fontSize: 100}}>QUERY APP</span>
                        </div>
                        <div>
                        <span style={{
                            color: "#FFFFFF",
                            fontSize: 20
                        }}>This is pre-alpha version. Check all features.</span>
                        </div>
                    </div>
                    <div style={{
                        width: "50%", height: "100%", display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div className="card" style={{
                            width: "70%",
                            height: "60%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Form style={{width: "80%"}}>
                                <FormGroup style={{textAlign: "center"}}>
                            <span style={{
                                fontSize: 25,
                                width: "100%"
                            }}>{this.state.login ? "Login" : "Sign up"}</span>
                                </FormGroup>

                                <FormGroup style={{textAlign: "center"}}>
                            <span style={{
                                fontSize: 15,
                                width: "100%"
                            }}>{this.state.message}</span>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl type="input" placeholder="Name" value={this.state.name}
                                                 onChange={this.onChangeNameInputHandler}/>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" placeholder="Password" value={this.state.password}
                                                 onChange={this.onChangePasswordInputHandler}/>
                                </FormGroup>

                                <FormGroup>
                                    <Button
                                        bsStyle="primary"
                                        type="button"
                                        onClick={this.state.login ? this.onClickLoginHandler : this.onClickSignUpHandler}
                                        style={{
                                            width: "100%",
                                            marginTop: 10,
                                            borderColor: "#222222",
                                            backgroundColor: "#222222",
                                            fontColor: "#888888"
                                        }}>
                                        {this.state.login ? "Login" : "Sign up"}
                                    </Button>
                                </FormGroup>

                                <FormGroup style={{textAlign: "center"}}>
                                    {this.state.login ? "Don't have account? " : "Have account? "}
                                    <a onClick={() => {
                                        this.setState({
                                            login: !this.state.login,
                                            message: "",
                                            name: "",
                                            password: ""
                                        })
                                    }}>{this.state.login ? "Create it" : "Login"}</a>
                                    {" or "}
                                    <LinkContainer to={'/'}>
                                        <a onClick={Auth.skipAuth()}>skip it</a>
                                    </LinkContainer>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}