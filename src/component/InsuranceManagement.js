
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'



class InsuranceManagement extends Component{
    constructor(props){
        super(props)
        this.state={
            insuranceData:[],
            errorMsg:'',
            isAllocate:false,
            isLoggedIn:sessionStorage.getItem('isLoggedIn')
        }
    }

    

    view=()=>{
        axios.get("../insuranceDB.json").then(response=>{
            console.log(response.data)
            this.setState({insuranceData:response.data,errorMsg:''})
        }).catch(error=>{
            this.setState({errorMsg:error.data})
        })

    }


    componentDidMount=()=>{
        this.view()
    }

    handleAllocate=()=>{
        this.setState({isAllocate:true})
    }


    displayInsurance=()=>{
        let insuranceArray=[]
        let insuranceData = this.state.insuranceData
        for (let insurance of insuranceData){

            let element = (
                <div className="card bg-light text-dark package-card shadow col-md-5" style={{marginTop:'30px',marginLeft:'70px'}} key ={insurance.insId}>
                    <div className="card-body row">
                        <div>
                        <h4>Insurance Company Name : {insurance.companyname}</h4>
                        </div>
                        <div className="row">
                            
                        
                        <div className="col-md-6">
                            <div className="featured-text text-center text-lg-left">
                                
                                <h5 style={{marginTop:'20px'}}>Name : {insurance.name}</h5>
                                <h5>Insurance cover : {insurance.cover}</h5>
                                <h5>Policy Period : {insurance.policyperiod}</h5>
                                <h5>Premium : {insurance.premium}</h5>
                                <h5>Pay for : {insurance.payfor}</h5>
                                <h5>Members Covered : {insurance.memberscovered}</h5>
                                <button className="btn btn-primary" onClick={this.handleAllocate}>Allocate to client</button>

                            </div>
                            
                        </div>
                        
                        <div className="col-md-6">
                            <img src={"../assets/"+insurance.image} alt="Not Found" height='300px' width='200px'/>
                        </div>
                        </div>

                    </div>
                </div>
            )
            insuranceArray.push(element)
        }

        return insuranceArray
    }



    render(){

        if(this.state.isAllocate===true){
            return <Redirect to={'/home/insurancemanagement/allocateplan'}/>
        }

        if(!this.state.isLoggedIn){
            return <Redirect to="/login"/>
        }

        return(<div>
            <h1>Welcome to Insurance Management</h1>
            <div className="container-fluid">
                <div className="row">
                    {this.displayInsurance()}
                </div>
                
            </div>
            
        </div>)
    }
}


export default InsuranceManagement;