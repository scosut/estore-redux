import React from 'react';
import { Alert } from 'reactstrap';

const Message = ({ color, message, styling, notitle }) => {
  return (
    <Alert color={color} className={styling}>
      {notitle ? message : `MESSAGE: ${message}`}
    </Alert>
  );
}

export default Message;