
import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap/lib';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DDButton(props) {
  return (
    <div style={{ margin: '15px', display: 'inline' }}>
      <SplitButton title={props.title} key="0" id={`split-button-basic-0`}>
        {props.menuItems.map(c => (
          <MenuItem key="{c.title}" eventKey="1">{c.title}</MenuItem>
        ))}
      </SplitButton>
    </div>
  );
}

DDButton.propTypes = {

};

export default DDButton;
