import React , {Component} from "react";

import Webcam from 'webcam-easy';

import axios from"axios";

import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button'; 
import Alert from "./Alert"
class MaskDetector extends Component
{
    constructor() 
    {
        super()
        this.state = {
            webcamObject: null,
            blob: "",
            showAlert:false 
        
        }
        this.takePhoto = this.takePhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.predict = this.predict.bind(this);
        this.alertHandler = this.alertHandler.bind(this)
    }
    alertHandler()
    {
        this.setState(
            {
            showAlert:false
            }
        )
    }

    takePhoto() 
    {
        let picture = this.state.webcamObject.snap();
        
        let imageData = picture.substring(22,picture.length);
        
        this.setState(
            { 
            blob:imageData,
            
            },
            ()=>{
                const cameraContainer = document.getElementById('camera-container');
                cameraContainer.style.display = "none";   
                const imageContainer = document.getElementById('image-container');
                imageContainer.style.display = "block"; 
            }
           
        )
      

    }
    
    deletePhoto()
    {
        this.setState(
            {
                blob:"",
            },
            ()=>{
                const cameraContainer = document.getElementById('camera-container');
                cameraContainer.style.display = "block"; 
                const imageContainer = document.getElementById('image-container');
                imageContainer.style.display = "none";
            }
        )
    }
    
    predict(event)
    {
        event.preventDefault();
        
        console.log("submit called");

        if (this.state.blob === "") {
            this.setState(
                {
                    showAlert: true,
                    alertMessage: "Please Take a Picture First",
                    alertVariant: "warning",
                    alertHeading: "Warning Alert!!"
                })

        }
        else{
            console.log(this.state)
            const formData = {blob: this.state.blob}

            axios.post('http://127.0.0.1:8000/detect_mask',formData)
            .then( response =>
            {
                console.log(response.data)

                if (response.data.error)
                {
                   
                    this.setState(
                        {
                            showAlert: true,
                            alertMessage: response.data.errorMessage,
                            alertVariant: "warning",
                            alertHeading: "Warning Alert!!"
                        })
                }
                else
                {
                    if (response.data.maskDetected)
                    {                    
                        this.setState(
                            {
                                showAlert: true,
                                alertMessage: "Mask Detected",
                                alertVariant: "success",
                                alertHeading: "We have a response!!"
                            }
                        )
                      

                    }
                    else{
                        this.setState(
                            {
                                showAlert: true,
                                alertMessage: "MASK NOT DETECTED",
                                alertVariant: "success",
                                alertHeading: "We have a response!!"
                            }
                        )
                    
                    }
                }
            }

            )
            .catch(
                (error =>{
                    this.setState(
                        {
                            showAlert: true,
                            alertMessage: "BACKEND NOT REACHABLE . Please Try again Later",
                            alertVariant: "danger",
                            alertHeading: "You got an Error!"
                        }
                    )
                    // alert("BACKEND NOT REACHABLE . Please Try again Later")
                    console.log(error)
                })
            )

        }
    }

    
    componentDidMount()
    {   
        

        const imageContainer = document.getElementById('image-container');
        imageContainer.style.display = "none"; 

        const webcamElement = document.getElementById('webcam');
        const canvasElement = document.getElementById('canvas');
        const snapSoundElement = document.getElementById('snapSound');
    
    const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    this.setState(
        {
            webcamObject:webcam
        }
                )
        
    webcam.start()
            .then(result =>{
                console.log("webcam started");
            })
            .catch(err => {
                    console.log(err);
                        });
   

    }



    render()
    {
        return(
            <div >
                {this.state.showAlert && <Alert text ={this.state.alertMessage} heading={this.state.alertHeading} variant = {this.state.alertVariant} handler={this.alertHandler}/>}
                    <h1> Welcome to Mask Detector</h1> 
            
            <div id = "camera-container">
                 <video id="webcam" autoPlay playsInline width="640" height="480"></video>
                <canvas id="canvas" className="d-none"></canvas>
            
            </div>
           
            <div id="image-container">  
                        <img src={`data:image/jpeg;base64,${this.state.blob}`} alt="Sample " width="640" height="480" />
            
            </div >
            
            <div>
            
                <Button onClick = {this.takePhoto} variant="secondary" size="lg" > SNAP</Button>
                <Button onClick = {this.deletePhoto} variant="secondary" size="lg" > DELETE </Button>
                <Button onClick = {this.predict} variant="success" size="lg" > PREDICT </Button>
            </div>

        </div>


            
        )
        

        
    }
}
export default MaskDetector;