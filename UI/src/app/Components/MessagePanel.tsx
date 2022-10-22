import React from "react";
import { IMessage } from "../Objects/IMessage";
import {Alert} from 'react-bootstrap';

const MessagePanel = (props: IMessage) => {
    
  return (
    <>
    <Alert key={props.type} variant={ props.type.toString()} show={props.show}>
          {props.message}
        </Alert>
        </>
  );
};

export default MessagePanel;