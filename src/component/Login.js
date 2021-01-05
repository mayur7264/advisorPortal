import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
    
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'red',
    },

    
    
  });



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                agentNo: "",
                password: ""
            },
            loginformErrorMessage: {
                agentNo: "",
                password: ""
            },
            loginformValid: {
                agentNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            isLoggedIn: false
            
        }
    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }


    


    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
        // console.log(this.state.loginform[name], name);
    }

    login = () => {
        const { loginform } = this.state;
        
        
        
        axios.get('/loginDB.json')
            .then(response => {
            
                console.log(response.data)
                let data = response.data;
                const myData = data.map(login=>{
                                if(Number(login.agentNo)===Number(loginform.agentNo) && login.password===loginform.password){
                                    return true
                                }else{
                                    return false
                                }
                                })
            
                let loginState = myData.filter(data=>data===true)
                if(loginState.length === 0) loginState=false
                
                if(loginState){
                    sessionStorage.setItem("isLoggedIn",true)
                    this.setState({ loadHome: true,errorMessage:''})
                    window.location.reload();
                }else{
                    this.setState({errorMessage:"Invalid Credentials"})
                }
                

            }).catch(error => {
                console.log(error);
                this.errorMessage = error.message;
                sessionStorage.clear();
            })
        console.log(this.state.loginform.agentNo, this.state.loginform.password);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        this.login();
    }

    

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "agentNo":
                let cnoRegex = /^[1-7]\d{7}$/
                if (!value || value === "") {
                    fieldValidationErrors.agentNo = "Please enter your Agent Number";
                    formValid.agentNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.agentNo = "Agent number should be a valid 8 digit number";
                    formValid.agentNo = false;
                } else {
                    fieldValidationErrors.agentNo = "";
                    formValid.agentNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                     } else if (!(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,20})/) )) {
                            fieldValidationErrors.password = "Please Enter a valid password"  //Password must contain atleast 1 Uppercase letter 1 Lowecase letter 1 digit and 1 Special Character
                            formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.agentNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        if (this.state.loadHome === true) return <Redirect to={'/home'} />
        if (this.state.loadRegister === true) return <Redirect to={'/register'} />
        const { classes } = this.props;
        return (
            <div>
                <section id="loginPage" className="loginSection">    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                            <Paper className={classes.paper} elevation={6}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <h4>Login</h4>
                            
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="uagentNo">Agent Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.loginform.agentNo}
                                            onChange={this.handleChange}
                                            id="uagentNo"
                                            name="agentNo"
                                            className="form-control"
                                            placeholder="Enter Agent Number"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.agentNo ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.agentNo}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.password ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.password}
                                    </span>)
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    

                                    <button
                                        type="submit"
                                        disabled={!this.state.loginformValid.buttonActive}
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>

                                    <br/><span className="text-danger">{this.state.errorMessage}</span>

                                </form>
                                <br />
                                
                                <button className="btn btn-primary" onClick={this.handleClick} >Click here to Register</button>
                                </Paper>
                            </div>
                        </div>
                        
                    </div>
                    
                </section>
                
            </div>

        )
    }
}

export default withStyles(styles)(Login);