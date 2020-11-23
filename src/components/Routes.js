import history from "./history"

import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import MaskDetector from "./MaskDetector"
import Alert from "./Alert"
class Routes extends Component {
    render() {
        return (
            

            <Router history={history}>
                
                <Switch>

                    <Route path  = "/mask_detector" component = {MaskDetector}/>
                    
                    <Route path  = "/alert" > <Alert text= "I am text "></Alert> </Route>
                    
                </Switch>
            </Router>
            
        
            )
    }
}
export default Routes;