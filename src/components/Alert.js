import React from "react"
import Alert from 'react-bootstrap/Alert'


function AlertDismissibleExample(props) {
    // const [show, setShow] = useState(true);
    console.log(props.text)
      return (
        <Alert variant = {props.variant}  dismissible onClose ={props.handler}>
          <Alert.Heading>{props.heading}</Alert.Heading>
          <p>
            {props.text}
          </p>
        </Alert>
      );
    
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
     
}
// ReactDOM.render(<AlertDismissibleExample />, document.getElementById('root'));

export default AlertDismissibleExample;