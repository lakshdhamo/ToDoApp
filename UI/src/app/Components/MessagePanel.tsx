import React from "react";
import { IMessage } from "../Objects/IMessage";
import {Alert} from 'react-bootstrap';
import { faExclamationTriangle, faCircleCheck, faSpinner  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessagePanel = (props: IMessage) => {
    
  return (
    <>
        <Alert key={props.type} variant={ props.type === 'loading' ? 'info' : props.type} show={props.show}>
          <FontAwesomeIcon 
              icon={props.type === 'danger'? faExclamationTriangle : 
                props.type === 'loading'? faSpinner : faCircleCheck } 
              className="pe-2" /> 
          {props.message}
        </Alert>
    </>
  );
};

export default MessagePanel;