import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap/lib';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ButtonB(props) {
  return (
    <Button style={{ margin: '15px' }} bsStyle={props.bsStyle}>{props.title}</Button>
  );
}

ButtonB.propTypes = {

};

export default ButtonB;
