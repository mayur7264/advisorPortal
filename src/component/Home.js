import React,{ Component } from 'react';
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



class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            isClient:false,
            isInsurance:false,
            isLoggedIn:sessionStorage.getItem("isLoggedIn")
        }
    }

    handleClient=()=>{
        this.setState({isClient:true})
        
    }

    

    

    handleInsurance=()=>{
        this.setState({isInsurance:true})
    }

    


    render(){
        const { classes } = this.props;

        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }

        if(this.state.isClient){
            return <Redirect to="/home/clientmanagement"/>
        }

        if(this.state.isInsurance){
            return <Redirect to="/home/insurancemanagement"/>
        }

        return(<div className="container-fluid">

            <div className="row">
                <div className="col-md-6">
                    <Paper elevation={6} className={classes.paper}>
                        <Link to="/home/clientmanagement" className="nav-link"  onClick={this.handleClient}><h4 style={{color:'secondary'}}>Client Management</h4></Link>
                        <div>
                            <img src={'./assets/client.jpg'} alt="Not Found" height="265px" width="620px" onClick={this.handleClient}/>
                        </div>
                        
                    </Paper>
                </div>
                <div className="col-md-6">
                    <Paper elevation={6} className={classes.paper}>
                        <Link to="/home/insurancemanagement" className="nav-link" onClick={this.handleInsurance}><h4>Insurance Management</h4></Link>
                        <div>
                            <img src={'./assets/insurance.jpg'} alt="Not Found" height="265px" width="620px" onClick={this.handleInsurance}/>
                        </div>
                    </Paper>
                </div>
            </div>
            
            
            
        </div>)
    }
}



export default withStyles(styles)(Home);