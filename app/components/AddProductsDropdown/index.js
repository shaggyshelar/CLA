/**
*
* AddProductsDropdown
*
*/
import { browserHistory } from 'react-router';
import React from 'react';
// import styled from 'styled-components';

import { SplitButton, MenuItem } from 'react-bootstrap/lib';

const options = [
  { key: 1, text: 'Add Favourites', value: 1 },
];

class AddProductsDropdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <SplitButton title="Add Products" key="0" id={'split-button-basic-0'} onClick={() => { browserHistory.push('/ProductSelection'); }}>
        {options.map((c) => (
          <MenuItem key="{c.key}"  onClick={() => { browserHistory.push('/favourites'); }} eventKey="1">{c.text}</MenuItem>
        ))}
      </SplitButton>
    );
  }
}

AddProductsDropdown.propTypes = {

};

export default AddProductsDropdown;
