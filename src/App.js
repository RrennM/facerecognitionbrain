import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';
import Rank from './components/Rank/rank';
import Particles from 'react-particles-js';
import './App.css';

// Variables for the particle background effect
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
      imageUrl: 'http://tysonhood.com/wp-content/uploads/2020/04/thicon10.png',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ 
      user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict( Clarifai.FACE_DETECT_MODEL, this.state.input )
      .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
        }

        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    
    this.setState({ route: route })
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
            <Particles className='particles'
                params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />
        { route === 'home' 
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm inputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} /> 
            </div>
          : ( 
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register  loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        } 
      </div>
    )}
}

export default App;
