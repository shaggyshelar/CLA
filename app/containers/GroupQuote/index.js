/*
 *
 * GroupQuote
 *
 */
import { generateGuid, addQuery } from 'containers/App/constants';
import React, { PropTypes } from 'react';
import CKEditor from 'react-ckeditor-component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RIEInput } from 'riek';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { Button, Glyphicon, Modal, ButtonGroup, Col, Row, DropdownButton, MenuItem, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import { SegmentedQuote } from '../SegmentedQuote';
import messages from './messages';

export class GroupQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: null,
      showEditor: false,
      showDelete: false,
      desc: '',
    };
    this.changeGroup = this.changeGroup.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.changeOptional = this.changeOptional.bind(this);
    this.cloneGroupIn = this.cloneGroupIn.bind(this);
    this.deleteGroupIn = this.deleteGroupIn.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.editorTextChange = this.editorTextChange.bind(this);
    this.descUpdate = this.descUpdate.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }
  componentWillMount() {
    const groupLen = _.find(this.props.groups, { id: this.props.location.query.groupId });
    if (this.state.selectedGroup === null) {
      if (this.props.location.query.groupId && groupLen) {
        this.setState({ selectedGroup: this.props.location.query.groupId });
        addQuery({ groupId: this.props.location.query.groupId });
      } else {
        this.setState({ selectedGroup: this.props.groups[0].id, desc: this.props.groups[0].description });
        addQuery({ groupId: this.props.groups[0].id });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const groupLen = _.find(nextProps.groups, { id: this.props.location.query.groupId });
    if (this.state.selectedGroup !== null && groupLen) {
      if (this.props.location.query.groupId && !groupLen) {
        this.setState({ selectedGroup: this.props.groups[0].id, desc: this.props.groups[0].description });
        addQuery({ groupId: this.props.groups[0].id });
      }
    }
  }
  changeGroup(e) {
    addQuery({ groupId: e });
    this.setState({ desc: '' });
    this.props.changeGroup(e);
  }
  toggleEditor() {
    this.setState({ showEditor: !this.state.showEditor });
  }
  cloneGroupIn() {
    const groupLines = Object.assign([],
      _.filter(this.props.lines, { groupId: this.state.selectedGroup }));
    const group = Object.assign({},
      _.filter(this.props.groups, { id: this.state.selectedGroup })[0]);
    const randomID = generateGuid();
    const lines = this.props.lines;
    const groups = this.props.groups;
    group.id = randomID;
    groupLines.forEach((i) => {
      const groupLine = Object.assign({}, i);
      groupLine.groupId = randomID;
      groupLine.id = generateGuid();
      lines.push(groupLine);
    });

    groups.push(group);
    this.props.cloneGroup(lines, groups);
  }
  toggleDelete() {
    this.setState({ showDelete: !this.state.showDelete });
  }
  deleteGroupIn() {
    const group = Object.assign({},
      _.filter(this.props.groups, { id: this.props.selectedGroup !== '' ? this.props.selectedGroup : this.state.selectedGroup })[0]);
    const lines = this.props.lines;
    const groups = this.props.groups;
    _.filter(lines, (i) => i.groupId === group.id).map((j) => { j.isDeleted = true; });
    _.filter(groups, (j) => j.id === group.id).map((j) => { j.isDeleted = true; });
    addQuery({ groupId: _.filter(this.props.groups, { isDeleted: false })[0].id });
    this.setState({ selectedGroup: _.filter(this.props.groups, { isDeleted: false })[0].id });
    this.setState({ showDelete: !this.state.showDelete, desc: '' });
    this.props.deleteGroup(lines, groups);
  }
  descUpdate() {
    this.toggleEditor();
    this.props.updateGroupData(this.props.selectedGroup !== '' ? this.props.selectedGroup : this.state.selectedGroup, 'description', this.state.desc);
  }
  addProducts() {
    let url = `/ProductSelection${this.props.location.search}`;
    if (!('PriceBookId' in this.props.location.query)) {
      url += `&PriceBookId=${this.props.data.priceBookId}`;
    }
    if (!('QuoteId' in this.props.location.query)) {
      url += `&QuoteId=${this.props.data.id}`;
    }
    browserHistory.push(url);
  }
  dataChanged(e) {
    const key = Object.keys(e)[0];
    const value = isNaN(parseFloat(e[key])) ? e[key] : parseFloat(e[key]);
    const data = key.split('*($)*');
    if (value !== '') {
      this.props.updateGroupData(data[0], data[1], value);
    }
  }
  changeOptional(e) {
    this.props.updateGroupData(e.target.name, e.target.id, e.target.checked);
  }
  validate(string) {
    const number = parseFloat(string);
    if (isNaN(number) || !isFinite(number)) return false;
    return !isNaN(number);
  }
  editorTextChange(e) {
    this.setState({ desc: e.editor.getData() });
  }
  render() {
    let group = {};
    let groupLines = [];
    groupLines = _.filter(this.props.lines, { groupId: this.props.selectedGroup !== '' ? this.props.selectedGroup : this.state.selectedGroup });
    group = _.filter(this.props.groups, { id: this.props.selectedGroup !== '' ? this.props.selectedGroup : this.state.selectedGroup })[0];
    // const optionalTooltip = (
    //   <Tooltip id="tooltip" bsClass="tooltip"><strong>{this.context.intl.formatMessage({ ...messages.optionalTT })}</strong></Tooltip>
    // );
    const discountTooltip = (
      <Tooltip id="dtooltip" bsClass="tooltip"><strong>{this.context.intl.formatMessage({ ...messages.addDiscountTT })}</strong></Tooltip>
    );
    const subscriptionTooltip = (
      <Tooltip id="stooltip" bsClass="tooltip"><strong>{this.context.intl.formatMessage({ ...messages.subTermTT })}</strong></Tooltip>
    );
    const segmented = _.filter(groupLines, { isSegmented: true }).length;
    return (
      <div className="group">
        <Modal
          show={this.state.showEditor}
          onHide={this.toggleEditor}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" style={{ textAlign: 'center' }}>Edit Description for {group.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body className="group-des-edit">
            <CKEditor
              content={group.description} events={{
                change: this.editorTextChange,
              }}
            ></CKEditor>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleEditor}>Close</Button>
            <Button onClick={this.descUpdate} bsStyle="primary">Save</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showDelete}
          onHide={this.toggleDelete}
          className="confirm-delete-modal"
          style={{ width: '50%' }}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body className="confirm-delete">
            <span>Are you sure you want to delete <b>{group.name}</b> ?</span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleDelete}>No</Button>
            <Button onClick={this.deleteGroupIn} bsStyle="primary">Yes</Button>
          </Modal.Footer>
        </Modal>
        <div className="group-card">
          <Row>
            <Col md={3} sm={6} xs={12} className="containers">
              {/* <Badge pullleft>{this.props.groups.length}</Badge> */}
              <DropdownButton title="" id="bg-nested-dropdown" className="changeGroup" >
                {this.props.groups.map((item, index) => (
                  <MenuItem onSelect={this.changeGroup} key={index} eventKey={item.id} value={item.id}>{item.name}</MenuItem>
                  ))
                  }
              </DropdownButton>
              <div className="group-header-div">
                <RIEInput
                  className="group-header group-edit"
                  classEditing="group-edit-on"
                  value={group.name}
                  propName={`${group.id}*($)*name`}
                  change={this.dataChanged}
                /><Glyphicon glyph="pencil" className="inline-edit" />
              </div>
              <br /><span className="group-total" >Group Total: {this.props.data.currency} {group.netTotal.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} </span>

            </Col>
            <Col md={3} sm={6} xs={12} className="containers" style={{ paddingTop: '10px' }}>

              <label className="desc" title={group.description.trim()}>
                {group.description.trim() === '' ? 'No Description' : group.description}
              </label><hr />
              <span
                className="group-description"
                onClick={this.toggleEditor}
              >
                {this.context.intl.formatMessage({ ...messages.editDesc })}
              </span>
            </Col>
            <Col md={3} sm={6} xs={12} className="containers">
              {/* <Row>
                <Col md={8} sm={8} xs={8}>

                  <span className="group-label" >{this.context.intl.formatMessage({ ...messages.optional })}</span>
                  <OverlayTrigger placement="top" overlay={optionalTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                </Col>
                <Col md={4} sm={4} xs={4}>
                  <input className="input-group" value={group.isOptional} id="isOptional" onChange={this.changeOptional} name={group.id} type="checkbox" checked={group.isOptional} />
                </Col>
              </Row> */}
              <Row>
                <Col md={8} sm={8} xs={8} style={{ height: '25px' }}>
                  <OverlayTrigger placement="top" overlay={discountTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                  <span className="group-label" >Group Discount (%)</span>

                </Col>
                <Col md={4} sm={4} xs={4} style={{ paddingTop: '4px' }} >
                  <RIEInput
                    className="group-input"
                    classEditing="input-group input-text"
                    value={group.additionaldiscount === '' ? '0' : group.additionaldiscount.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    propName={`${group.id}*($)*additionaldiscount`}
                    change={this.dataChanged}
                    validate={this.validate}
                    isDisabled={groupLines.length <= 0}
                  /><Glyphicon glyph="pencil" className="inline-edit" />

                  {/* <input className="input-group input-text" step="0.1" onChange={this.valueChanged} id="additionaldiscount" type="text" name={group.id} value={group.additionaldiscount.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} /> */}
                </Col>
              </Row>
              <Row>

                <Col md={8} sm={8} xs={8} style={{ height: '25px' }}>
                  <OverlayTrigger placement="top" overlay={subscriptionTooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                  <span className="group-label" >{this.context.intl.formatMessage({ ...messages.subTerm })}</span>

                </Col>
                <Col md={4} sm={4} xs={4} style={{ paddingTop: '5px' }}>
                  <RIEInput
                    className="group-input"
                    classEditing="input-group input-text"
                    value={group.subscriptionTerm === '' ? '0' : group.subscriptionTerm.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    propName={`${group.id}*($)*subscriptionTerm`}
                    change={this.dataChanged}
                    validate={this.validate}
                    isDisabled={groupLines.length <= 0}
                  /><Glyphicon glyph="pencil" className="inline-edit" />

                </Col>
              </Row>
            </Col>
            <Col md={3} sm={6} xs={12} className="containers">
              <div>
                <Button className="margin" title={this.context.intl.formatMessage({ ...messages.addProducts })} onClick={this.addProducts}>{this.context.intl.formatMessage({ ...messages.addProducts })}</Button>
                <ButtonGroup className="margin">
                  {/* <Button onClick={this.cloneGroupIn} title={this.context.intl.formatMessage({ ...messages.cloneGroup })}>{this.context.intl.formatMessage({ ...messages.cloneGroup })}</Button> */}
                  <Button onClick={this.toggleDelete} bsStyle="danger" title={this.context.intl.formatMessage({ ...messages.deleteGroup })} disabled={this.props.groups.length === 1}>{this.context.intl.formatMessage({ ...messages.deleteGroup })}</Button>
                </ButtonGroup>
              </div>
            </Col>

          </Row>
        </div>
        <div>
          {segmented ?
            <SegmentedQuote
              data={groupLines}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.props.toggleAllCheckBox}
              toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
              updateProps={this.props.updateProps}
              currency={this.props.data.currency}
              disableButton={this.props.disableButton}
              segment={this.props.segment}
              update={this.props.update}
              location={this.props.location}
              updateBundle={this.props.updateBundle}
              updateSeg={this.props.updateSeg}
              updateSegBundle={this.props.updateSegBundle}
              updateSelect={this.props.updateSelect}
              updateSelectBundle={this.props.updateSelectBundle}
              updateSegSelect={this.props.updateSegSelect}
              updateSegBundleSelect={this.props.updateSegBundleSelect}
              loadCustomSegmentsData={this.props.loadCustomSegmentsData}
              addCustomSegmentData={this.props.addCustomSegmentData}
              deleteCustomSegmentData={this.props.deleteCustomSegmentData}
              changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
              saveCustomSegmentData={this.props.saveCustomSegmentData}
              checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
              checkCustomSegmentData={this.props.checkCustomSegmentData}
              customSegments={this.props.customSegments}
              clearCustomSegmentsData={this.props.clearCustomSegmentsData}
              quoteData={this.props.quoteData}
              toggleCheckAll={this.props.toggleCheckAll}
              isCheckAll={this.props.isCheckAll}
              toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
              toggleSuggestionStatus={this.props.toggleSuggestionStatus}
            />
          :
              <EditQuoteGrid
                data={groupLines}
                cloneLine={this.props.cloneLine}
                deleteLine={this.props.deleteLine}
                toggleAllCheckBox={this.props.toggleAllCheckBox}
                toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                updateProps={this.props.updateProps}
                currency={this.props.data.currency}
                segment={this.props.segment}
                update={this.props.update}
                updateBundle={this.props.updateBundle}
                updateSelect={this.props.updateSelect}
                updateSelectBundle={this.props.updateSelectBundle}
                quoteData={this.props.quoteData}
                location={this.props.location}
                toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
                toggleSuggestionStatus={this.props.toggleSuggestionStatus}
              />
          }
        </div>
      </div>
    );
  }
}

GroupQuote.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
GroupQuote.propTypes = {
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  cloneGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  data: PropTypes.any,
  groups: PropTypes.any,
  selectedGroup: PropTypes.any,
  lines: PropTypes.any,
  toggleAllCheckBox: PropTypes.func,
  updateProps: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
  updateBundle: PropTypes.func,
  update: PropTypes.func,
  segment: PropTypes.func,
  updateSegBundle: PropTypes.func,
  updateSeg: PropTypes.func,
  updateGroupData: PropTypes.func,
  location: PropTypes.any,
  updateSelectBundle: PropTypes.func,
  updateSegSelect: PropTypes.func,
  updateSegBundleSelect: PropTypes.func,
  updateSelect: PropTypes.func,
  loadCustomSegmentsData: PropTypes.func,
  addCustomSegmentData: PropTypes.func,
  deleteCustomSegmentData: PropTypes.func,
  changeCustomSegmentFieldData: PropTypes.func,
  saveCustomSegmentData: PropTypes.func,
  checkAllCustomSegmentData: PropTypes.func,
  checkCustomSegmentData: PropTypes.func,
  customSegments: PropTypes.any,
  clearCustomSegmentsData: PropTypes.any,
  quoteData: PropTypes.any,
  toggleCheckAll: PropTypes.func,
  isCheckAll: PropTypes.any,
  disableButton: PropTypes.any,
  toggleReconfigureLineStatus: PropTypes.func,
  toggleSuggestionStatus: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupQuote);
