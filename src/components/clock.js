//import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import React,{useState} from 'react'


// just class def & you shuld hve only 1 render call

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date() ,firstName: '',showName: false, userName: '', selectValue: '',
      data: '',bg_color: '', tempbg_color:'',textColor:'', temptext_color:'',click: true };
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


    componentDidUpdate(){
      document.body.style.background = this.state.bg_color;
      document.body.style.color= this.state.textColor;
    }

  
    displayNameHandler = (e) => {
      let updatedName = e.target.value;
      this.setState({ firstName: updatedName });
    }

    displayColorHandler = (e) => {
      let updated_color = e.target.value;
      this.setState({ tempbg_color: updated_color });
    }

    displayTextColorHandler = (e) => {
      let t_color = e.target.value;
      this.setState({ temptext_color: t_color });
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        showName: true,
        userName: this.state.firstName,
        bg_color: this.state.tempbg_color,
        textColor: this.state.temptext_color,
        click: true
      });
    }
    handleClickOnCustomize = (e) => {
      //let bool= e.target.value;
      this.setState({click:false});
      
    }

    handleSelect = (e) =>{
      this.setState({selectValue:e.target.value});
      if (e.target.value == 'Debits'){
        React.useEffect(() => {
          axios.get('https://moj-api.herokuapp.com/debits').then((response) => { 
            this.setState({data:response.data});
            console.log(response.data)
            
          });
        }, []);
        
        
      } 
      else if (e.target.value == 'Credits'){
        React.useEffect(() => {
          axios.get('https://moj-api.herokuapp.com/credits').then((response) => { 
            this.setState({data:response.data});
            console.log(response.data)
            
          });
        }, []);
        

      }


   

    }
  

    
    //what is actually going to print out to the screen !
    render() {
      return (
        
        <div>
          <h1>Hello {this.state.showName && <span> {this.state.userName}</span>},  welcome to Bank of React!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>

        
          {/* Credit/Debit drop down list*/}
          <h4>Select an option to view Credits or Debits</h4>
          <select value={this.state.selectValue} onChange={this.handleSelect}>
            <option value="Credits">Credits</option>
            <option value="Debits">Debits</option>
          </select>

          <p>{this.state.data}</p>




          {/* Profile button - needs to display the form (where users enters name,
          enter a hex value for background color and text color& this form should dissappear once submitted*/}
          
          <button onClick={this.handleClickOnCustomize}>CUSTOMIZE YOUR PROFILE</button>
        
          {/*Username*/}
          <div>
          {!this.state.click && <div> 
            <form onSubmit={this.handleSubmit} >
              <label>Update username </label>
              <input type="text" name="firstName" onChange={this.displayNameHandler} value={this.handleChange} />
              {/* <button type="submit" onClick={this.handleSubmit}>Submit</button> */}
            </form>
          </div>}
          </div>

          {/*Background color*/}
          <div>
          {!this.state.click && <div>
            <form onSubmit={this.handleSubmit}>
              <label>Update background</label>
              <input type="text" name="bg_color" onChange={this.displayColorHandler} value={this.handleChange} />       
            </form>
         </div>}
         </div>

          {/*Text color*/}
          <div>
          {!this.state.click &&<div>
            <form onSubmit={this.handleSubmit}>
              <label>Update text color</label>
              <input type="text" name="textColor"  onChange={this.displayTextColorHandler} value={this.handleChange}/>        
                
            </form>
         </div>}
         </div>

          <div>
          {!this.state.click &&<div>
          <button type="submit" onClick={this.handleSubmit}>SUBMIT</button>
          </div>}
          </div>
         




        </div>
          
        
          
        
      );
    }
  }


  export default Clock; //export them from the file 