import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import Rank from './components/Rank/rank';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 250
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'c43619b16dc449b493a59ff252b3af4a'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: 'http://tysonhood.com/wp-content/uploads/2020/04/thicon10.png'
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    console.log('button clicked. input: ', this.state.input)
    app.models
      .predict(
        Clarifai.COLOR_MODEL,
        // URL
        this.state.input
      )
      .then(
      function(response) {
        console.log(response)
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="App">
            <Particles className='particles'
                params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        inputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={imageUrl} />
      </div>
    )}
}

export default App;
