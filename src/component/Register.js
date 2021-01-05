import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
    
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'red',
      marginLeft:'275px'
    },

    
    
  });



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerform: {
                agentNo: "",
                password: "",
                name:"",
                dob:"",
                email:"",
                cpassword:""

            },
            registerformErrorMessage: {
                agentNo: "",
                password: "",
                name:"",
                dob:"",
                email:"",
                cpassword:""
            },
            registerformValid: {
                agentNo: false,
                password: false,
                name: false,
                dob: false,
                email: false,
                cpassword:false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            
            
            isRegister:false
            
        }
    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registerform } = this.state;
        this.setState({
            registerform: { ...registerform, [name]: value }
        });
        this.validateField(name, value);
        // console.log(this.state.registerform[name], name);
    }

    register = () => {
        const { registerform } = this.state;
        axios.post('/register', registerform)
            .then(response => {
                console.log(response);
                
                
                sessionStorage.setItem("userName", response.data.name);;
                this.setState({ loadHome: true})
                window.location.reload();

            }).catch(error => {
                console.log(error);
                this.errorMessage = error.message;
                sessionStorage.clear();
            })
        console.log(this.state.registerform.agentNo, this.state.registerform.password);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.register();
        alert('Registered Successfully !')
        this.setState({isRegister:true})
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registerformErrorMessage;
        let formValid = this.state.registerformValid;
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

            case "name":
                if(!value || value === ""){
                    fieldValidationErrors.name = "Please enter your Name";
                    formValid.name = false;
                }else if(!value.match(/^[A-z]+([ ][A-z]+)*$/)){
                    fieldValidationErrors.name="Invalid Name";
                    formValid.name=false;
                } 
                else {
                    fieldValidationErrors.name = "";
                    formValid.name = true;
                }
                break;

            
            case "email":
                let emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/;
                if(!value || value === ""){
                    fieldValidationErrors.email = "Please enter your Email";
                    formValid.email = false;
                }else if(!value.match(emailRegex)){
                    fieldValidationErrors.email = "Please enter a valid Email";
                    formValid.email = false;
                }else {
                    fieldValidationErrors.email = "";
                    formValid.email = true;
                }
                break

            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                     } else if (!(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,20})/) )) {
                        fieldValidationErrors.password = "Password must contain atleast 1 Uppercase letter 1 Lowecase letter 1 digit and 1 Special Character"
                        formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;

            case "cpassword":
                if(!value || value ===""){
                    fieldValidationErrors.cpassword = "Please confirm password";
                    formValid.cpassword=false;
                }else if(value!==this.state.registerform.password){
                    fieldValidationErrors.cpassword = "Please enter correct password";
                    formValid.cpassword = false;
                }else{
                    fieldValidationErrors.cpassword = "";
                    formValid.cpassword = true;
                }
                break;

            default:
                break;
        }
        formValid.buttonActive = formValid.agentNo && formValid.password;
        this.setState({
            registerformErrorMessage: fieldValidationErrors,
            registerformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        
        if (this.state.isRegister === true) return <Redirect to={'/login'} />
        const { classes } = this.props;
        return (
            <div>
                <section id="registerPage" className="registerSection">    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 offset-3 ">
                            <Paper className={classes.paper} elevation={6}>
                                <Avatar className={classes.avatar}>
                                    <PersonAddIcon/>
                                </Avatar>
                                <h4>Register</h4>
                                <form className="form" onSubmit={this.handleSubmit}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="uagentNo">Agent Number<span className="text-danger">*</span></label>
                                                <input
                                                type="number"
                                                value={this.state.registerform.agentNo}
                                                onChange={this.handleChange}
                                                id="uagentNo"
                                                name="agentNo"
                                                className="form-control"
                                                placeholder="Enter Agent Number"
                                                />
                                            </div>
                                        {this.state.registerformErrorMessage.agentNo ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.agentNo}
                                        </span>)
                                        : null}
                                        </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="uname">Name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.registerform.name}
                                            onChange={this.handleChange}
                                            id="uname"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.name ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.name}
                                    </span>)
                                        : null}
                                    </div>
                                    </div>   
                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="uemail">Email<span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            value={this.state.registerform.email}
                                            onChange={this.handleChange}
                                            id="uemail"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.email ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.email}
                                    </span>)
                                        : null}
                                    
                
                                    </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="udob">Date Of Birth<span className="text-danger">*</span></label>
                                        <input
                                            type="date"
                                            value={this.state.registerform.dob}
                                            onChange={this.handleChange}
                                            id="udob"
                                            name="dob"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.dob ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.dob}
                                    </span>)
                                        : null}
                                        
                                    </div>
                                    </div>



                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.registerform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.password ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.password}
                                    </span>)
                                        : null}
                                        </div>


                                    <div className="col-md-6">    
                                    <div className="form-group">
                                        <label htmlFor="uCpass">Confirm Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.registerform.cpassword}
                                            onChange={this.handleChange}
                                            id="uCpass"
                                            name="cpassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.cpassword ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.cpassword}
                                    </span>)
                                        : null}<br/>
                                        
                                        </div>
                                        </div>

                                    </div>
                                
                                
                                    

                                    
                                        
                                        
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    

                                    <button
                                        type="submit"
                                        disabled={!this.state.registerformValid.buttonActive}
                                        className="btn btn-primary"
                                    >
                                        Register
                                    </button>
                                </form>
                                <br />
                                
                               
                                </Paper>
                            </div>
                        </div>
                        
                    </div>
                    
                </section>
                
            </div>

        )
    }
}

export default withStyles(styles)(Register);