
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'



class ViewClient extends Component{
    constructor(props){
        super(props)
        this.state={
            clientData:[],
            errorMsg:'',
            searchData:'',
            isSearch:false,
            isView:false,
            sData:[],
            isLoggedIn:sessionStorage.getItem('isLoggedIn')
        }
    }

    

    view=()=>{
        axios.get("/clientDB.json").then(response=>{
            
            this.setState({clientData:response.data,errorMsg:''})
        }).catch(error=>{
            this.setState({errorMsg:error})
        })

    }


    componentDidMount=()=>{
        this.view()
    }


    displayClient=(data)=>{
        let clientArray=[]
        

        if(data.length === 0){
            return <div><h1>Data not found</h1></div>
        }
        
        for (let client of data){

            let element = (
                <div className="card bg-light text-dark package-card shadow col-md-5" style={{marginTop:'30px',marginLeft:'70px'}} key ={client.clientId}>
                    <div className="card-body row">
                        <div className="col-md-6">
                            <div className="featured-text text-center text-lg-left">
                                <h5>Client Name : {client.name}</h5>
                                <h5>Age : {client.age}</h5>
                                <h5>Date Of Birth : {client.dob}</h5>
                                <h5>Email : {client.email}</h5>
                                <h5>Contact No : {client.contactno}</h5>
                                <h5>Plans : <ul>
                                    {client.activePlans.map(plan=>{
                                        return <li>{plan}</li>
                                    })}
                                    </ul></h5>
                                <h5>Monthly Contribution : {client.monthlyContribution}</h5>

                            </div>
                            
                        </div>
                        <div className="col-md-6">
                            <img src={client.image} alt="Not Found" height='350px' width='250px'/>
                        </div>

                    </div>
                </div>
            )
            clientArray.push(element)
        }

        return clientArray
    }

    handleChange=(event)=>{
        let searchValue = event.target.value;
        this.setState({searchData:searchValue})
    }

    handleSearch=()=>{
        let searchValue = this.state.searchData;
        let clientData = this.state.clientData;
        
        let data = clientData.filter(client=> client.clientId===searchValue || client.name===searchValue)
        this.setState({isSearch:true, sData:data})
        

    }

    handleAll=()=>{
        this.state.isView ? this.setState({isView:false}) : this.setState({isView:true});
    }



    render(){
        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }
        return(<div>
            <h1>Welcome to view Client</h1>

            <div className="container-fluid">
                <div className="card bg-light text-dark package-card shadow">
                    <div className="card-body row">
                        <div style={{alignItems:'center'}}>
                            <input type="text" placeholder="Search a Client" onChange={this.handleChange}></input>
                        
                        
                            <button className="btn btn-primary" style={{marginLeft:'20px'}} onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>

                </div>
                
                
            </div>

            {this.state.isSearch ?
            <div className="container-fluid">
            <div className="row">
                {this.displayClient(this.state.sData)}
                
            </div>
            
        </div> : null}


        <div className="container-fluid" style={{marginTop:'20px'}}>
                <div className="card bg-light text-dark package-card shadow">
                    <div className="card-body row">
                        <div style={{alignItems:'center'}}>
                            <button className="btn btn-primary" onClick={this.handleAll}>View All Clients</button>
                        </div>
                    </div>

                </div>
                
                
            </div>



        
        {this.state.isView ?
            <div className="container-fluid">
            <div className="row">
                {this.displayClient(this.state.clientData)}
                
            </div>
            
        </div> : null}

            
            
        </div>)
    }
}


export default ViewClient;