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
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'red',
    },

    
    
  });



class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientform: {
                name:"",
                dob:"",
                
                contactno:"",
                email:"",
                activeplans:"",
                monthlycontribution:""

            },
            clientformErrorMessage: {
                name:"",
                dob:"",
                
                contactno:"",
                email:"",
                activeplans:"",
                monthlycontribution:""
            },
            clientformValid: {
                name:false,
                dob:false,
                
                contactno:false,
                email:false,
                
                monthlycontribution:false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            add:false,
            isLoggedIn:sessionStorage.getItem("isLoggedIn")
            
            
            
        }
    }

    

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { clientform } = this.state;
        this.setState({
            clientform: { ...clientform, [name]: value }
        });
        this.validateField(name, value);
        // console.log(this.state.clientform[name], name);
    }

    client = () => {
        const { clientform } = this.state;
        axios.post("./clientDB.json", clientform)
            .then(response => {
                console.log(response.data.message);
                
                
                
                this.setState({ loadHome: true})
                window.location.reload();

            }).catch(error => {
                console.log(error);
                this.errorMessage = error.message;
                sessionStorage.clear();
            })
        console.log(this.state.clientform);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.client();
        this.setState({add:true})
        alert('Client Added !');
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.clientformErrorMessage;
        let formValid = this.state.clientformValid;
        switch (fieldName) {
            

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
                let emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
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

            case "contactno":
                if (!value || value === "") {
                    fieldValidationErrors.contactno = "Please enter Contact Number";
                    formValid.contactno = false;
                     } else if (!(value.match(/^[1-9]\d{9}$/) )) {
                        fieldValidationErrors.contactno = "Contact number should be a valid 10 digit number"
                        formValid.contactno = false;
                } else {
                    fieldValidationErrors.contactno = "";
                    formValid.contactno = true;
                }
                break;

            case "dob":
                if(!value || value ===""){
                    fieldValidationErrors.dob = "Please enter Date Of Birth";
                    formValid.dob=false;
                
                }else if(!(new Date(value) <= new Date())){
                    fieldValidationErrors.dob = "Birth date cannot be today or greater than today";
                    formValid.dob=false;
                }
                else{
                    fieldValidationErrors.dob = "";
                    formValid.dob = true;
                }
                break;

            default:
                break;
        }
        formValid.buttonActive = formValid.name  && formValid.dob && formValid.contactno && formValid.email;
        this.setState({
            clientformErrorMessage: fieldValidationErrors,
            clientformValid: formValid,
            successMessage: ""
        });
    }

    render() {

        if(this.state.add){
            return <Redirect to="/home/clientmanagement"/>
        }

        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }
        
        
        const { classes } = this.props;
        return (
            <div>
                <section id="clientPage" className="clientSection">    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-5 offset-4 ">
                            <Paper className={classes.paper} elevation={6}>
                                <Avatar className={classes.avatar}>
                                    <PersonAddIcon/>
                                </Avatar>
                                <h4>Enter Client Details</h4>
                            
                                <form className="form" onSubmit={this.handleSubmit}>

                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-6">

                                                <div className="form-group">
                                                    <label htmlFor="cname">Client Name<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={this.state.clientform.name}
                                                        onChange={this.handleChange}
                                                        id="uname"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Enter Client Name"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.name ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.name}
                                                </span>)
                                                : null}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="uemail">Email<span className="text-danger">*</span></label>
                                                    <input
                                                        type="email"
                                                        value={this.state.clientform.email}
                                                        onChange={this.handleChange}
                                                        id="uemail"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter Email"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.email ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.email}
                                                </span>)
                                                : null}
                                            </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="uactiveplans">Active Plans<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={this.state.clientform.activeplans}
                                                        onChange={this.handleChange}
                                                        id="uactiveplans"
                                                        name="activeplans"
                                                        className="form-control"
                                                        placeholder="Enter Active Plans"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.activeplans ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.activeplans}
                                                </span>)
                                                : null}
                                                </div>




                                            

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="udob">Date Of Birth<span className="text-danger">*</span></label>
                                                    <input
                                                        type="date"
                                                        value={this.state.clientform.dob}
                                                        onChange={this.handleChange}
                                                        id="udob"
                                                        name="dob"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.dob ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.dob}
                                                </span>)
                                                : null}
                                                </div>

                                            </div>



                                            <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="ucontactno">Contact Number<span className="text-danger">*</span></label>
                                                    <input
                                                        type="number"
                                                        value={this.state.clientform.contactno}
                                                        onChange={this.handleChange}
                                                        id="ucontactno"
                                                        name="contactno"
                                                        className="form-control"
                                                        placeholder="Enter Contact Number"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.contactno ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.contactno}
                                                </span>)
                                                : null}
                                                </div>


                                                <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="umonthlycontribution">Monthly Contribution<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={this.state.clientform.monthlycontribution}
                                                        onChange={this.handleChange}
                                                        id="umonthlycontribution"
                                                        name="monthlycontribution"
                                                        className="form-control"
                                                        placeholder="Enter Contribution"
                                                    />
                                                </div>
                                                {this.state.clientformErrorMessage.monthlycontribution ? (<span className="text-danger">
                                                {this.state.clientformErrorMessage.monthlycontribution}
                                                </span>)
                                                : null}<br/>
                                                </div>


                                            </div>

                                            

                                    </div>    
                                    

                                    

                                    


                                    

                                    
                
                                    

                                    
                                        
                                    

                                    
                                        
                                        
                                        
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    

                                    <button
                                        type="submit"
                                        disabled={!this.state.clientformValid.buttonActive}
                                        className="btn btn-primary"
                                    >
                                        Add Client
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

export default withStyles(styles)(AddClient);