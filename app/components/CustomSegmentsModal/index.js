/**
*
* CustomSegmentsModal
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';

class CustomSegmentsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      customSegmentedLines: [],
      isCheckAll: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCustomSegments = this.saveCustomSegments.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    // this.checkAll = this.checkAll.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
  }

  componentDidMount() {
    console.log('this.props.selectedLine.segmentData.columns', this.props.selectedLine.segmentData.columns);
    this.props.loadCustomSegmentsData(this.props.selectedLine.segmentData.columns);
  }
  handleChange(item, e) {
    this.props.changeCustomSegmentFieldData();
  }

  toggleCheckboxChange(e, item) {
    this.props.checkCustomSegmentData(item);
  }

  toggleCheckAll() {
    this.setState({ isCheckAll: !this.state.isCheckAll });
    this.props.checkAllCustomSegmentData(this.state.isCheckAll);
  }

  saveCustomSegments() {
    this.props.saveCustomSegmentData(this.props.customSegments);
  }

  render() {
    console.log('this.props.customSegments', this.props.customSegments);
    let rows = [];
    if (this.props.customSegments !== undefined) {
      console.log('this.props.customSegments', this.props.customSegments);
      rows = this.props.customSegments.map((item, index) => (<tr key={index}>
        <td>{<input type="checkbox" className="check" defaultChecked={item.isSelected} onChange={this.toggleCheckboxChange.bind(this, item)} />}</td>
        <td>
          <FormControl
            type="text"
            value={item.name}
            onChange={this.handleChange.bind(this, item)}
          />
        </td>
        <td>
          <FormControl
            type="text"
            value={item.startDate}
          />
        </td>
        <td>
          <FormControl
            type="text"
            value={item.endDate}
          />
        </td>
      </tr>));
    }

    return (
      <Modal
        show={this.props.showModal} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="pencil" /> <strong> Custom Segments </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="container-modal-table">
              <Table responsive bsClass="modal-table">
                <thead>
                  <tr>
                    <th>{<input type="checkbox" className="check" defaultChecked={this.state.isCheckAll} onChange={this.toggleCheckAll.bind(this)} />}</th>
                    <th>SEGMENT LABEL</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>

              </Table>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleToggle} >Cancel</Button>
            <Button onClick={this.props.addCustomSegmentData} >Add</Button>
            <Button onClick={this.props.deleteCustomSegmentData} >Delete</Button>
            <Button onClick={this.saveCustomSegments} >Save</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

CustomSegmentsModal.propTypes = {
  selectedLine: React.PropTypes.any,
  onHide: React.PropTypes.func,
  showModal: React.PropTypes.bool,
  loadCustomSegmentsData: React.PropTypes.func,
  addCustomSegmentData: React.PropTypes.func,
  deleteCustomSegmentData: React.PropTypes.func,
  changeCustomSegmentFieldData: React.PropTypes.func,
  saveCustomSegmentData: React.PropTypes.func,
  checkAllCustomSegmentData: React.PropTypes.func,
  checkCustomSegmentData: React.PropTypes.func,
  customSegments: React.PropTypes.any,
};

export default CustomSegmentsModal;
