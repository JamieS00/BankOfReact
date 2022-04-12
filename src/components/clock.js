import React from 'react';
import {Component} from 'react';
import axios from 'axios';


// just class def & you shuld hve only 1 render call

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date() ,firstName: '',showName: false, userName: '', selectValue: '',
      data: '' };
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

    // handleSelect = (e) =>{
    //   this.setState({selectValue:e.target.value});
    //   if (e.target.value == 'Debits'){
    //     React.useEffect(() => {
    //       axios.get('https://moj-api.herokuapp.com/debits').then((response) => { 
    //         this.setState({data:response.data});
            
    //       });
    //     }, []);
        
        
    //   } 
    //   else if (e.target.value == 'Credits'){
    //     React.useEffect(() => {
    //       axios.get('https://moj-api.herokuapp.com/credits').then((response) => { 
    //         this.setState({data:response.data});
            
    //       });
    //     }, []);
        

    //   }
    // }

    //not sure 
    async componentDidMount(){
      let response = await axios.get('https://moj-api.herokuapp.com/debits')
      let debits = response.data;
      this.setState({debits: debits});
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
          <select value={this.state.selectValue} onChange={this.handleSelect}>
            <option value="Credits">Credits</option>
            <option value="Debits">Debits</option>
          </select>

          <p>{this.state.data}</p>
          
        </div>
          
          
          
        
      );
    }
  }


  export default Clock; //export them from the file 