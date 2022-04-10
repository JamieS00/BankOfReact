import React from 'react';
import {Component} from 'react';
//import {TextInput} from 'react'


// just class def & you shuld hve only 1 render call

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),1000 //1000 ms, which is in seconds
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
    
    //what is actually going to print out to the screen !
    render() {
      return (
        <div>
          <h1>Hello ... Welcome to Bank of React!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>


          <h3>Customize your profile</h3>
          <h4>Update your username below ! </h4>
          <input type="text" value={this.state.value} onChange={this.handleChange}/> 
          <input type="submit" value="Submit" /> 
          
          
        </div>
      );
    }
  }


  export default Clock; //export them from the file 