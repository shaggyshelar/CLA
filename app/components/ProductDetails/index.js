/**
*
* ProductDetails
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Modal, Button, Glyphicon } from 'react-bootstrap/lib';
import ReactHtmlParser from 'react-html-parser';
import Slider from 'react-image-slider';
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
      desc = this.props.detailedInfo.description;
    }
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex', width: 500 }}
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="info-sign" /> <strong> {title} </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Slider images={url} isInfinite delay={5000}>
              {url.map((image, key) => <div key={key}><img src={`data:image;base64,${image}`} alt={title} style={{ height: 200, width: 200 }} /></div>)}
            </Slider>

            {ReactHtmlParser(desc)}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Cancel</Button>
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
