/**
*
* CustomSegmentsModal
*
*/

import React from 'react';
// import styled from 'styled-components';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { Modal, Button, Glyphicon, Row, FormControl, Table } from 'react-bootstrap/lib';
import messages from './messages';

class CustomSegmentsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      customSegmentedLines: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCustomSegments = this.saveCustomSegments.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
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
    this.props.toggleCheckAll(!this.props.isCheckAll);
    this.props.checkAllCustomSegmentData(!this.props.isCheckAll);
  }

  saveCustomSegments() {
    const customSegments = this.props.customSegments.toJS();
    const nameArray = customSegments.map((item) => item.name);
    const isDuplicate = nameArray.some((item, id) => nameArray.indexOf(item) !== id);
    const currentIndex = _.findIndex(customSegments, { name: '' });
    let startDateEndDateError = false;
    let dateError = false;
    let isDateNull = false;
    for (let index = 0; index <= customSegments.length - 1; index++) {
      if (customSegments[index].startDate === null || customSegments[index].startDate === '' || customSegments[index].endDate === null || customSegments[index].endDate === '') {
        isDateNull = true;
        break;
      }
      const currentStartDate = new Date(customSegments[index].startDate);
      const currentEndDate = new Date(customSegments[index].endDate);
      if (currentStartDate.getTime() > currentEndDate.getTime()) {
        startDateEndDateError = true;
        break;
      }
      if (index !== customSegments.length - 1) {
        const endDate = new Date(customSegments[index].endDate);
        endDate.setDate(endDate.getDate() + 1);
        const startDate = new Date(customSegments[index + 1].startDate);
        if (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() !== new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()) {
          dateError = true;
          break;
        }
      }
      customSegments[index].startDate = new Date(customSegments[index].startDate).toISOString();
      customSegments[index].endDate = new Date(customSegments[index].endDate).toISOString();
    }
    if (isDateNull) {
      toast.error(this.context.intl.formatMessage({ ...messages.dateEmptyValidation }), {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if (startDateEndDateError) {
      toast.error(this.context.intl.formatMessage({ ...messages.startDateEndDateError }), {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if ((currentIndex > -1 || isDuplicate) && dateError) {
      toast.error(this.context.intl.formatMessage({ ...messages.startDateSegementLabelError }), {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if ((currentIndex > -1 || isDuplicate)) {
      toast.error(this.context.intl.formatMessage({ ...messages.segmentLabelError }), {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if (dateError) {
      toast.error(this.context.intl.formatMessage({ ...messages.startDateError }), {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      const customLines = [];
      const quote = {};
      quote.id = this.props.quoteData.id;
      this.props.customLines.forEach((item) => {
        const line = {
          id: item.id,
          productId: item.productId,
          code: item.code,
          name: item.name,
          segmentData: {
            type: item.type,
            columns: customSegments,
          },
        };
        customLines.push(line);
      }, this);
      quote.lines = customLines;
      this.props.saveCustomSegmentData(quote);
    }
  }

  render() {
    let rows = [];
    if (this.props.customSegments !== undefined) {
      rows = this.props.customSegments.toJS().map((item, index) => (<tr key={index}>
        <td>{!item.isDefault ? <input type="checkbox" className="check" checked={item.isSelected} id={item.id} onChange={this.toggleCheckboxChange} /> : <input type="checkbox" className="check hideSpan" />}</td>
        <td>
          <FormControl
            type="text"
            id={item.id}
            name="name"
            value={item.name}
            className="customSegmentsInput"
            onChange={this.handleChange}
          />
        </td>
        <td id="datePicker">
          <FormControl
            type="date"
            id={item.id}
            name="startDate"
            value={item.startDate}
            className="customSegmentsInput"
            onChange={this.handleChange}
          />
        </td>
        <td id="datePicker">
          <FormControl
            type="date"
            id={item.id}
            name="endDate"
            value={item.endDate}
            className="customSegmentsInput"
            onChange={this.handleChange}
          />
        </td>
      </tr>));
    }

    return (
      <Modal
        show={this.props.showModal} onHide={this.props.onHide}
        style={{ display: 'inline-flex' }}
        className="customModal customSegModal"
      >
        <Modal.Dialog >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="pencil" /> <strong> {this.context.intl.formatMessage({ ...messages.customSegments })} </strong></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="container-modal-table">
              <Table responsive bsClass="modal-table">
                <thead>
                  <tr>
                    <th>{<input type="checkbox" className="check checkboxWidth" checked={this.props.isCheckAll} onChange={this.toggleCheckAll} />}</th>
                    <th className="upper-case">{this.context.intl.formatMessage({ ...messages.segmentLabel })}</th>
                    <th className="upper-case">{this.context.intl.formatMessage({ ...messages.startDate })}</th>
                    <th className="upper-case">{this.context.intl.formatMessage({ ...messages.endDate })}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>

              </Table>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >{this.context.intl.formatMessage({ ...messages.cancel })}</Button>
            <Button onClick={this.props.addCustomSegmentData} >{this.context.intl.formatMessage({ ...messages.add })}</Button>
            <Button onClick={this.props.deleteCustomSegmentData} >{this.context.intl.formatMessage({ ...messages.delete })}</Button>
            <Button onClick={this.saveCustomSegments} >{this.context.intl.formatMessage({ ...messages.save })}</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

CustomSegmentsModal.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

CustomSegmentsModal.propTypes = {
  onHide: React.PropTypes.func,
  showModal: React.PropTypes.bool,
  addCustomSegmentData: React.PropTypes.func,
  deleteCustomSegmentData: React.PropTypes.func,
  changeCustomSegmentFieldData: React.PropTypes.func,
  saveCustomSegmentData: React.PropTypes.func,
  checkAllCustomSegmentData: React.PropTypes.func,
  checkCustomSegmentData: React.PropTypes.func,
  customSegments: React.PropTypes.any,
  customLines: React.PropTypes.any,
  quoteData: React.PropTypes.any,
  toggleCheckAll: React.PropTypes.func,
  isCheckAll: React.PropTypes.any,
};

export default CustomSegmentsModal;
