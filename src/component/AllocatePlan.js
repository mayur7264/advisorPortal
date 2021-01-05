import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
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
    

    
    
  });



class AllocatePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allocateform: {
                clientId: "",
                clientName: ""
            },
            allocateformErrorMessage: {
                clientId: "",
                clientName: ""
            },
            allocateformValid: {
                clientId: false,
                clientName: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadinsurance: false,
            isLoggedIn:sessionStorage.getItem("isLoggedIn")
            
            
        }
    }

    




    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { allocateform } = this.state;
        this.setState({
            allocateform: { ...allocateform, [name]: value }
        });
        this.validateField(name, value);
        // console.log(this.state.allocateform[name], name);
    }

    allocate = () => {
        const { allocateform } = this.state;

        
        axios.post('/allocate', allocateform)
            .then(response => {
                console.log(response);
                
                
                
                window.location.reload();

            }).catch(error => {
                console.log(error);
                this.errorMessage = error.message;
                
            })
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loadinsurance: true })
        this.allocate();
        alert('Allocated Successfully !')
    }

    

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.allocateformErrorMessage;
        let formValid = this.state.allocateformValid;
        switch (fieldName) {
            case "clientId":
                
                if (!value || value === "") {
                    fieldValidationErrors.clientId = "Please enter client Id";
                    formValid.clientId = false;
                }else {
                    fieldValidationErrors.clientId = "";
                    formValid.clientId = true;
                }
                break;
            case "clientName":
                if (!value || value === "") {
                    fieldValidationErrors.clientName = "Please enter client name";
                    formValid.clientName = false;
                     } else {
                    fieldValidationErrors.clientName = "";
                    formValid.clientName = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.clientId && formValid.clientName;
        this.setState({
            allocateformErrorMessage: fieldValidationErrors,
            allocateformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        if (this.state.loadinsurance === true) return <Redirect to={'/home/insurancemanagement'} />

        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }
        
        const { classes } = this.props;
        return (
            <div>
                
                <section id="allocatePage" className="allocateSection">    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                            <Paper className={classes.paper} elevation={6}>
                                <h1>Allocate</h1>
                            
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="uid">Client Id<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.allocateform.clientId}
                                            onChange={this.handleChange}
                                            id="uid"
                                            name="clientId"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.allocateformErrorMessage.clientId ? (<span className="text-danger">
                                        {this.state.allocateformErrorMessage.clientId}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uname">Client Name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.allocateform.clientName}
                                            onChange={this.handleChange}
                                            id="uname"
                                            name="clientName"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.allocateformErrorMessage.clientName ? (<span className="text-danger">
                                        {this.state.allocateformErrorMessage.clientName}
                                    </span>)
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    

                                    <button
                                        type="submit"
                                        disabled={!this.state.allocateformValid.buttonActive}
                                        className="btn btn-primary"
                                    >
                                        Allocate Plan
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

export default withStyles(styles)(AllocatePlan);