/**
*
* ProductDetails
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Modal, Button, Glyphicon } from 'react-bootstrap/lib';
import Slider from 'react-image-slider';
import Parser from 'html-react-parser';
import '../../../node_modules/react-image-slider/lib/image-slider.css';

class ProductDetails extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // const tooltip = (
    //   <Tooltip id="tooltip" bsClass="tooltip"><strong>Specifiy the discount unit: Amount or Percent</strong></Tooltip>
    // );
    let rows = [];
    let title = '';
    let desc = '';
    const url = [];
    if (this.props.detailedInfo !== undefined) {
      rows = this.props.detailedInfo.images.map((item) => (
        url.push(item)
        ));
      title = this.props.detailedInfo.title;
      if (this.props.detailedInfo.description === null) {
        desc = '';
      } else {
        desc = this.props.detailedInfo.description;
      }
    }
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
        className="productModal"
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="info-sign" /> <strong> {title} </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Slider images={url} isInfinite delay={5000}>
              {url.map((image, key) => <div key={key}><img src={`data:image;base64,${image}`} alt={title} style={{ height: 200, width: 200 }} />{Parser(desc)}</div>)}
            </Slider>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} className="cancelBtn">Cancel</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

ProductDetails.propTypes = {
  detailedInfo: React.PropTypes.any,
  onHide: React.PropTypes.func,
  show: React.PropTypes.bool,
};

export default ProductDetails;
