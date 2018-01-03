import React from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap/lib';

class GuidedSellingModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="calendar" /> <strong> Guided Selling </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <br /> Hello World!
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Cancel</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

GuidedSellingModal.propTypes = {
  onHide: React.PropTypes.func,
  show: React.PropTypes.bool,
};

export default GuidedSellingModal;
