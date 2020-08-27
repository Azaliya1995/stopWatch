import React from 'react';
import './App.css';

class App extends React.Component {
	
  constructor(props) { //вызывается первым
    super(props); //обработка конструктора родительского класса
    this.state = {value:0, time: {}, seconds: 0, stopped: false}; //изменяется state, компонент перерисовывается
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() { //когда компонент отрисован в ДОМ
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  resetSec = () => {
    this.setState({seconds: 0});		
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    const value = this.state.value
    return (
      <div class="container-fluid align-items-center">
        <h1 class="display-2 sec">Секундомер</h1>
        <h2 class="display-2">
          <span><kbd>{this.state.time.h} : </kbd></span>
          <span><kbd>{this.state.time.m} : </kbd></span>
          <span><kbd>{this.state.time.s} </kbd></span>
        </h2>
        <button class="display-4" onClick={this.startTimer}>Stop</button>
          &nbsp;
          <button class="display-4" onClick={this.resetSec}>Reset</button>

        <h1 class="display-2 timer">Таймер</h1>
        <input type="time" name="cron" value="00:15:00" step="1"></input>
      </div>
    );
  }
}

export default App;
/*
const INTERVAL = 100;//частота обновления таймера

class App extends React.Component {
	
  constructor(props) { //вызывается первым
    super(props); //обработка конструктора родительского класса
    this.state = {value: 0, stopped: false}; //изменяется state, компонент перерисовывается
  }

  increment(){
    if(!this.state.stopped) (this.setState({value: this.state.value + 1}));
  }

  componentDidMount() { //когда компонент отрисован в ДОМ
    this.timerID = setInterval(() => this.increment(), 1000/INTERVAL); //установка таймера
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // когда исчезает
  }

  stopContinueSec = () => {
    this.setState({stopped: !this.state.stopped});
      if(this.state.stopped){
      clearInterval(this.timerID);
    }
      else
    {
      this.timerID = setInterval(() => this.increment(), 1000/INTERVAL);
    };
  }
  
  resetSec = () => {
    this.setState({value: 0});		
  }

  changeHours = () => {
    this.setState({value: this.state.value + 1});
  }

  render() {
    const value = this.state.value
    return (
      <div class="container-fluid align-items-center">
        <h1 class="display-2 sec">Секундомер</h1>
        <h2 class="display-2">
          <span><kbd>{Math.floor(value/INTERVAL/60/60)} : </kbd></span>
          <span><kbd>{Math.floor(value/INTERVAL/60) % 60} : </kbd></span>
          <span><kbd>{Math.floor(value/INTERVAL) % 60} </kbd></span>
        </h2>
        <button class="display-4" onClick={this.stopContinueSec}>{this.state.stopped?'Continue':'Stop'}</button>
          &nbsp;
          <button class="display-4" onClick={this.resetSec}>Reset</button>

        <h1 class="display-2 timer">Таймер</h1>
        <input type="time" name="cron" value="00:15:00" step="1"></input>
      </div>
    );
  }
}

export default App;
*/