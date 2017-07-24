/**
*
* AddProductsDropdown
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Dropdown, Menu } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
];

class AddProductsDropdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Menu compact>
        <Dropdown text="Add Products" options={options} simple item />
      </Menu>
    );
  }
}

AddProductsDropdown.propTypes = {

};

export default AddProductsDropdown;
