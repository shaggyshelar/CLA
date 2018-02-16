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
    let code = '';
    let productFamily = '';
    const url = [];
    if (this.props.selectedData !== undefined) {
      rows = this.props.selectedData.detailedInfo.images.map((item) => (
        url.push(item)
        ));
      code = this.props.selectedData.code;
      title = this.props.selectedData.detailedInfo.title;
      productFamily = this.props.selectedData.productStructure;
      if (this.props.selectedData.detailedInfo.description === null) {
        desc = '';
      } else {
        desc = this.props.selectedData.detailedInfo.description;
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
            <Modal.Title style={{ textAlign: 'center' }}> <div className="cartFont"><span style={{ marginTop: '0px', fontSize: '20px' }}> <Glyphicon glyph="info-sign" /> {title} </span></div> </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <div className="productDetailBox">
              <h4>
                Product Code: <b>{code}</b>
                <span>Product Family: <b>{productFamily}</b></span>
              </h4>
            </div>

            <Slider images={url} isInfinite delay={5000}>
              {url.map((image, key) => <div key={key}><img src={`data:image;base64,${image}`} alt={title} style={{ height: 200, width: 200 }} /></div>)}
            </Slider>

            <div className="sliderDesc">
              {Parser(desc)}
            </div>


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
  selectedData: React.PropTypes.any,
  onHide: React.PropTypes.func,
  show: React.PropTypes.bool,
};

export default ProductDetails;
