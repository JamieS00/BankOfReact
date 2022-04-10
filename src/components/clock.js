import React from 'react';
import {Component} from 'react';
//import {TextInput} from 'react'


// just class def & you shuld hve only 1 render call

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date() ,firstName: '',showName: false, userName: '' };
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

  
    displayNameHandler = (e) => {
      let updatedName = e.target.value;
      this.setState({ firstName: updatedName });
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        showName: true,
        userName: this.state.firstName
      });
    }
    
    //what is actually going to print out to the screen !
    render() {
      return (
        <div>
          <h1>Hello {this.state.showName && <span> {this.state.userName}</span>}  welcome to Bank of React!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>

          <h3>Update your username & Customize your profile below ! </h3>
          
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Enter Username</label>
              <input type="text" name="firstName" onChange={this.displayNameHandler} value={this.state.firstName} />
              <button type="submit" onClick={this.handleSubmit}>Submit</button>
              
          </form>
          </div>

          <h4>Select an option to view Credits or Debits</h4>
          <select value={this.state.selectValue} onChange={this.handleChange}>
            <option value="Credits">Credits</option>
            <option value="Debits">Debits</option>
          </select>
          
        </div>
          
          
          
        
      );
    }
  }


  export default Clock; //export them from the file 