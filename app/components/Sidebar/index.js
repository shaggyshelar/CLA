import React from 'react';
import { Modal } from 'react-bootstrap/lib';
class Sidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal
        container={this.props.container} className="Sidebar right" show={this.props.isVisible} onHide={this.props.onHide}
        autoFocus keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }
}

Sidebar.propTypes = {
  title: React.PropTypes.any,
  children: React.PropTypes.any,
  container: React.PropTypes.any,
  isVisible: React.PropTypes.any,
  onHide: React.PropTypes.any,
};

export default Sidebar;
