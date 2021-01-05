import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoggedIn:sessionStorage.getItem('isLoggedIn')
        }
      
    }

    handleClick =()=>{
        sessionStorage.clear();
        window.location.reload();
    }

    


    render(){

        if(this.state.isLoggedIn){
            return (<div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              
              <div className="navbar-header">
                  <Link className="navbar-brand" to="/home">Advisor Portal</Link>
              </div>
              

              <ul className="navbar-nav">
              <li className="nav-item">
                      <Link className="nav-link" to="/home">Home</Link>
                      </li>


                      <li className="nav-item">
                      <Link className="nav-link" to="/home/clientmanagement">Client Management</Link>
                      </li>

                      <li className="nav-item">
                      <Link className="nav-link" to="/home/insurancemanagement">Insurance Management</Link>
                      </li>


              </ul>

              <ul className="navbar-nav ml-auto">

                
                    <li className="nav-item">
                      <Link className="nav-link" to="/" onClick={this.handleClick}>Logout</Link>
                      </li>
                       
              </ul>
            
          </nav>
            </div>)
        }else{
            return(<div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              
              <div className="navbar-header">
                  <Link className="navbar-brand" to="/home">Advisor Portal</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  
              </ul>
            
          </nav>
            </div>)
        }
        
    }
}



export default Navbar;