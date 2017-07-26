/**
*
* Sidebar
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Modal } from 'react-bootstrap/lib';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Sidebar extends React.Component {
	render() {
  	return (
    	<Modal className='Sidebar right' show={ this.props.isVisible } onHide={this.props.onHide} 
      	 autoFocus keyboard
      >
      	<Modal.Header closeButton>
        	<Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
      	<Modal.Body>
      		{ this.props.children }
        </Modal.Body>
      </Modal>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
