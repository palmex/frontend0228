// import dependencies
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import React from "react";

// define & build (& export) functionality of component
export default class Car extends React.Component{

    // work with properties & states for GUI
    constructor(props){
        super(props)
        this.state = {
            buttonTitle: "Off",
            buttonStatus: false,
        }
        this.submission = this.submission.bind(this)
    }

    submission = () =>{
        if (!this.state.buttonStatus){
            this.setState({buttonTitle: "On"})
        } else {
            this.setState({buttonTitle: "Off"}) 
        }

        this.setState({buttonStatus: !this.state.buttonStatus})
        
    }

    // render our GUI
    render(){
        return(
            <View style={styles.container}>
                <Text>This is our car component</Text>
                {/* <Button title={this.state.buttonTitle}></Button> */}
                <TouchableOpacity
                    style={styles.pressable}
                    onPress={this.submission}>
                    <Text style={{color: "white"}}>{this.state.buttonTitle} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}


// use Stylesheet to style our component
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    //   borderColor: "black",
    //   borderWidth: 1,
      maxHeight: "50%",
      width: "90%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable: {
        backgroundColor: '#21397d',
        borderRadius: 5,
        padding: 15,
        margin: 10,
    }
})