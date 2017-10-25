/**
*
* AddGroupDropdown
*
*/

import React from 'react';
// import styled from 'styled-components';

import { SplitButton, MenuItem } from 'react-bootstrap/lib';

const options = [
  { key: 1, text: 'Add Favourites', value: 1 },
];

class AddGroupDropdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <SplitButton title="Add Group" key="0" id={'split-button-basic-0'}>
        {options.map((c) => (
          <MenuItem key="{c.key}" eventKey="1">{c.text}</MenuItem>
        ))}
      </SplitButton>
    );
  }
}

AddGroupDropdown.propTypes = {

};

export default AddGroupDropdown;
