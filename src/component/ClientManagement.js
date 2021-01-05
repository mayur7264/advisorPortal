import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect,Link } from 'react-router-dom';



const styles = theme => ({
    
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height:'350px',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    

    
    
  });



class ClientManagement extends Component{
    constructor(props){
        super(props)
        this.state={
            isView:false,
            isAdd:false,
            isLoggedIn:sessionStorage.getItem("isLoggedIn")
        }
    }

    handleView=()=>{
        this.setState({isView:true})
    }

    handleAdd=()=>{
        this.setState({isAdd:true})
    }


    render(){

        const { classes } = this.props;

        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }

        if(this.state.isView){
            return <Redirect to="/home/clientmanagement/viewclient"/>
        }

        if(this.state.isAdd){
            return <Redirect to="/home/clientmanagement/addclient"/>
        }

        return(<div className="container-fluid">
                <h1>Welcome to Client Management</h1>
            <div className="row">
                <div className="col-md-6">
                    
                    <Paper elevation={6} className={classes.paper}>
                        <Link to="/home/clientmanagement/viewclient" className="nav-link" onClick={this.handleView}> <h4>View Clients</h4></Link>
                        <div style={{marginTop:"45px"}}>
                            <img src={'../assets/viewclient.png'} alt="Not Found" height="200px" width="520px" onClick={this.handleView}/>
                        </div>
                        
                    </Paper>
                </div>
                <div className="col-md-6">
                    <Paper elevation={6} className={classes.paper}>
                        <Link to="/home/clientmanagement/addclient" onClick={this.handleAdd} className="nav-link"><h4>Add a Client</h4></Link>
                        <div style={{marginTop:"45px"}}>
                            <img src={'../assets/addclient.jpg'} alt="Not Found" height="200px" width="520px" onClick={this.handleAdd}/>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
        )
    }
}


export default withStyles(styles)(ClientManagement);