/**
*
* InlineEdit
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class InlineEditCustom extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const options = this.props.select.map(
      (i) =>
      (<option key={i.id} value={i.id} selected={i.isSelected}>{i.value}</option>));
    return (
      <div className={this.props.class}>
        <input className="table-edit-input" value={this.props.value} />
        <select className="inline-select">
          {options}
        </select>
      </div>
    );
  }
}

InlineEditCustom.propTypes = {

};

export default InlineEditCustom;
