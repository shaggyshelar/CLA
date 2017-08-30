/**
*
* CustomSegmentsModal
*
*/

import React from 'react';
// import styled from 'styled-components';
import DatePicker from 'react-bootstrap-date-picker';

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
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  handleChange(e) {
    const item = {
      field: e.target.name,
      value: e.target.value,
      id: e.target.id,
    };
    this.props.changeCustomSegmentFieldData(item);
  }

  toggleCheckboxChange(e) {
    this.props.checkCustomSegmentData(e.target.id);
  }

  toggleCheckAll() {
    this.state.isCheckAll = !this.state.isCheckAll;
    this.props.checkAllCustomSegmentData(this.state.isCheckAll);
  }

  saveCustomSegments() {
    const segment = {
      type: 'Custom',
      columns: this.props.customSegments.toJS(),
    };
    this.props.saveCustomSegmentData(segment);
  }

  handleChangeDate(item, field, value) {
    const obj = {
      field,
      value,
      id: item.id,
    };
    this.props.changeCustomSegmentFieldData(obj);
  }
  render() {
    let rows = [];
    // <input className="input-group" value={group.isOptional} id="isOptional" onChange={this.changeOptional} name={group.id} type="checkbox" checked={group.isOptional} />
    if (this.props.customSegments !== undefined) {
      rows = this.props.customSegments.toJS().map((item, index) => (<tr key={index}>
        <td>{!item.isDefault ? <input type="checkbox" className="check checkboxWidth" checked={item.isSelected} id={item.id} onChange={this.toggleCheckboxChange} /> : <input type="checkbox" className="check checkboxWidth hideSpan" />}</td>
        <td>
          <FormControl
            type="text"
            id={item.id}
            name="name"
            value={item.name}
            onChange={this.handleChange}
          />
        </td>
        <td id="datePicker">
          <DatePicker onChange={this.handleChangeDate.bind(this, item, 'startDate')} dateFormat="MM/DD/YYYY" value={item.startDate} />
        </td>
        <td id="datePicker">
          <DatePicker onChange={this.handleChangeDate.bind(this, item, 'endDate')} dateFormat="MM/DD/YYYY" value={item.endDate} />
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
                    <th>{<input type="checkbox" className="check checkboxWidth" defaultChecked={this.state.isCheckAll} onChange={this.toggleCheckAll} />}</th>
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
            <Button onClick={this.props.onHide} >Cancel</Button>
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
