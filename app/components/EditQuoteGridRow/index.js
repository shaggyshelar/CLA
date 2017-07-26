/**
*
* EditQuoteGridRow
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Checkbox, Table } from 'semantic-ui-react';

function EditQuoteGridRow(props) {

  //props.data.map((item,index) => {});

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox />
      </Table.Cell>
      <Table.Cell>{ this.props.data.FirstName }</Table.Cell>
      <Table.Cell>September 14, 2013</Table.Cell>
      <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
      <Table.Cell>No</Table.Cell>
    </Table.Row>
  );
}

EditQuoteGridRow.propTypes = {
  data: React.propTypes.array,
};

export default EditQuoteGridRow;
