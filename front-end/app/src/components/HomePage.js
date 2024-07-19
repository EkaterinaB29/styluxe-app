import React, { Component } from 'react';
import '../css/HomePage.css';

class HomePage extends Component {
  componentDidMount() {
    
    window.particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 50,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 150,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  render() {
    return (
      <div>
        <div className="Landing">
          <div className="pageheader">
            <h1>Styluxe App</h1>
            <p></p>
            <h2>Let us help you create comfort in your home.</h2>
            <p></p>
            <div className="buttons-container">
              <div className="button">
                <div class="top">
                  <div class="text">
                      <span>R</span>
                      <span>E</span>
                      <span>G</span>
                      <span>I</span>
                      <span>S</span>
                      <span>T</span>
                      <span>E</span>
                      <span>R</span>
                  </div>
                </div>
              </div>
        
              <div className="button">
              <div class="top">
                  <div class="text">
                      <span>L</span>
                      <span>O</span>
                      <span>G</span>
                      <span> </span>
                      <span>I</span>
                      <span>N</span>
                     
                  </div>
                </div>
              
              </div>
              </div>
          </div>
          
          
        </div>
        
        <div id="particles-js"></div>
        
        <div className="background"></div>
        
        
      </div>
    );
  }
}




export default HomePage;
