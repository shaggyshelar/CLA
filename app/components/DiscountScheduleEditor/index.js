/**
*
* DiscountScheduleEditor
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';

class DiscountScheduleEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.selectedLine);
    const tooltip = (
      <Tooltip id="tooltip" bsClass="tooltip"><strong>Specifiy the discount unit: Amount or Percent</strong></Tooltip>
    );

    let rows = [];
    if (this.props.selectedLine !== undefined) {
      rows = this.props.selectedLine.tiers.map((item, index) => (<tr key={item.id}>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.lowerBound}</td>
        <td>{item.upperBound}</td>
        <td>{item.discountpercent}</td>
      </tr>));
    }

    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="calendar" /> <strong> Discount Schedule Editor </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={6} style={{ textAlign: 'center' }}>
                <strong>Schedule Name </strong>
                <FormControl
                  disabled
                  type="text"
                  value={this.props.selectedLine ? this.props.selectedLine.name : ''}
                  placeholder="Volume Discount"
                />
              </Col>
              <Col md={6} style={{ textAlign: 'center' }}>
                <strong>Schedule Name</strong>
                <OverlayTrigger placement="top" overlay={tooltip}>
                  <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                </OverlayTrigger>
                <FormControl componentClass="select" placeholder="Percent" disabled>
                  <option value="select">{this.props.selectedLine !== undefined ? this.props.selectedLine.discountUnit : 'Percent'}</option>
                  {/* <option value={this.props.value ? this.props.value : ''}>{this.props.value ? this.props.value : ''}</option> */}
                </FormControl>
              </Col>
            </Row>
            <br />
            <Row className="container-modal-table">
              <Table responsive bsClass="modal-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TIER NAME</th>
                    <th>LOWER BOUND</th>
                    <th>UPPER BOUND</th>
                    <th>DISCOUNT (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
                {/* <tbody>
                  <tr>
                    <td>1</td>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                    <td>Italy</td>
                  </tr>
                </tbody> */}
              </Table>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleToggle} >Cancel</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

DiscountScheduleEditor.propTypes = {
  selectedLine: React.PropTypes.any,
  onHide: React.PropTypes.func,
  show: React.PropTypes.bool,
};

export default DiscountScheduleEditor;
