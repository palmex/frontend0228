// import dependencies
import { StyleSheet, Text, View,Alert, Modal, Button,TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React from "react";

// define & build (& export) functionality of component
export default class Car extends React.Component{

    // work with properties & states for GUI
    constructor(props){
        super(props)
        this.state = {
            buttonTitle: "Submit",
            buttonStatus: false,
            make: "",
            model: "",
            year: "",
            odometer: "",
            carsArray: [],
            error: false
        }
        this.submission = this.submission.bind(this)
        this.testAlert = this.testAlert.bind(this)
        this.query = this.query.bind(this)
        // remember to add a new state & bind the new function
    }

    async submission(){
        console.log("state: ", this.state)
        if(isNaN(this.state.year)){
            alert("Please enter a correct year")
            return
        }
        
        // if (!this.state.make.match(/^([a-z]{5,})$/)) {
        //     alert("Please enter correct make!");
                // return
        // }
        if (this.state.model == "") {
            alert("Please enter a model!");
            return
        }

        const newCar = await addNewCar(this.state.make,this.state.model,this.state.year,this.state.odometer)
        console.log('response from server!', newCar)
        // if (!this.state.buttonStatus){
        //     this.setState({buttonTitle: "On"})
        // } else {
        //     this.setState({buttonTitle: "Off"}) 
        // }
        // this.setState({buttonStatus: !this.state.buttonStatus})
    }

    async query(){
        console.log("state: ", this.state)
        const cars = await getCars()
        console.log('response from server!', cars)
        this.setState({carsArray: cars})
        // if (!this.state.buttonStatus){
        //     this.setState({buttonTitle: "On"})
        // } else {
        //     this.setState({buttonTitle: "Off"}) 
        // }
        // this.setState({buttonStatus: !this.state.buttonStatus})
    }

    testAlert(){
        console.log("alert")
        alert('alert!');
    }

    // we need another function here

    // render our GUI
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.header}>{this.props.header}</Text>

                <ScrollView style={{backgroundColor: "white"}}>
                    <Text style={styles.inputTitle}>Make</Text>       
                    <TextInput 
                    style={styles.input}
                    value={this.state.make}
                    onChangeText={(e) => this.setState({make: e})}
                    />

                    <Text style={styles.inputTitle}>Model</Text>       
                    <TextInput 
                        style={styles.input}
                        value={this.state.model}
                        onChangeText={(e) => this.setState({model: e})}
                    />

                    <Text style={styles.inputTitle}>Year</Text>       
                    <TextInput 
                    style={styles.input}
                    value={this.state.year}
                    onChangeText={(e) => this.setState({year: e})}
                    />

                    <Text style={styles.inputTitle}>Odometer</Text>       
                    <TextInput 
                        style={styles.input}
                        value={this.state.odometer}
                        onChangeText={(e) => this.setState({odometer: e})}
                    />

                    
                </ScrollView> 
                {this.state.carsArray.map((car) => 
                         <Text key={car.car_id}>{car.make} {car.model} - {car.year} with {car.odometer} miles.</Text>
                    )}

                <TouchableOpacity
                    style={styles.pressable}
                    onPress={this.submission}>
                    <Text style={{color: "white"}}>{this.state.buttonTitle} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.pressable}
                    onPress={this.query}>
                    <Text style={{color: "white"}}>Query </Text>
                </TouchableOpacity>
                {/* <Button onPress={this.testAlert} title={"testAlert"}></Button> */}

                {/* <ScrollView style={{backgroundColor: "white"}}> */}
                    
                {/* </ScrollView> */}
                
                {/* 1. Add a new button that fetches all cars */}
                {/* 2. Take the response and render it to the user */}
                {/* we'll need a mapping function to render the respones array */}
            </View>
        )
    }
}


// fetch API Calls
// we need another fetch call here



async function getCars(){

    let reqHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'http://localhost:3000/*',
    }


    return fetch("http://localhost:3000/cars/all", {
        method: 'GET', 
        withCredentials: true,
        headers: reqHeaders,
    }).then(response => {
        if (response.ok){
            return response.json()
        } else {
            var error = new Error(response.status + ":"  + response.statusText)
            error.response = response
            throw error
        }

    }, error => {
        var errmess = new Error(error.message)
        throw errmess
    })
}

async function addNewCar(make, model, year, odometer){

    let reqHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'http://localhost:3000/*',
    }

    let reqBody = {
        "make":make,
        "model":model,
        "year":year,
        "odometer":odometer
    }

    return fetch("http://localhost:3000/cars/new", {
        method: 'POST', 
        withCredentials: true,
        headers: reqHeaders,
        body: JSON.stringify(reqBody)
    }).then(response => {
        if (response.ok){
            return response.json()
        } else {
            var error = new Error(response.status + ":"  + response.statusText)
            error.response = response
            throw error
        }

    }, error => {
        var errmess = new Error(error.message)
        throw errmess
    })
}

// use Stylesheet to style our component
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    //   borderColor: "black",
    //   borderWidth: 1,
      maxHeight: "90%",
      width: "90%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable: {
        backgroundColor: '#21397d',
        borderRadius: 5,
        padding: 15,
        margin: 10,
    }, 
    input:{
        backgroundColor: "white",
        borderRadius: 2,
        borderWidth: 1,
        margin: 3,
    },
    inputTitle:{
       marginTop: 10,
    },
    header: {
        fontSize: 18,
    }
})