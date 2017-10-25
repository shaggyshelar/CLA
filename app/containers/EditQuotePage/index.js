
import EditQuoteGrid from 'components/EditQuoteGrid';
import React, { PropTypes } from 'react';
import _ from 'lodash';
import { generateGuid, removeQuery, addQuery } from 'containers/App/constants';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { getLanguage, makeDataChanged, makeSelectData, makeSelectError, makeSelectLoading, getCustomSegments, getCheckAll } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import { GroupQuote } from '../GroupQuote';
import { SegmentedQuote } from '../SegmentedQuote';
import { changeLocale } from '../LanguageProvider/actions';
import { cloneLine,
  deleteLine,
  deleteMultipleLines,
  cloneMultipleLines,
  calculateSelectedData,
  quickSaveQuotes,
  updateProps,
  cloneGroup,
  deleteGroup,
  ungroup,
  group,
  update,
  updateBundle,
  updateSeg,
  updateSegBundle,
  updateSegSelect,
  updateSegBundleSelect,
  updateGroupData,
  updateGroupValue,
  updateSelect,
  updateSelectBundle,
  saveAppCustomSegmentData,
  segment,
  loadData,
  toggleReconfigureLineStatus,
 } from '../App/actions';

import { loadCustomSegmentsData, addCustomSegmentData, deleteCustomSegmentData, changeCustomSegmentFieldData, saveCustomSegmentData, checkAllCustomSegmentData, checkCustomSegmentData, clearCustomSegmentsData, toggleCheckAll } from './actions';


export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedQuotes: [],
      segmented: false,
      segLines: [],
      loading: false,
      disabledButton: true,
      selectedGroup: '',
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.deleteCheckedLines = this.deleteCheckedLines.bind(this);
    this.cloneCheckedLines = this.cloneCheckedLines.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.quickSaveQuoteLines = this.quickSaveQuoteLines.bind(this);
    this.updateProps = this.updateProps.bind(this);
    this.ungroup = this.ungroup.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.group = this.group.bind(this);
    this.segment = this.segment.bind(this);
    this.saveCustomSegmentData = this.saveCustomSegmentData.bind(this);
  }
  componentWillMount() {
    // this.props.getAllData();
    // this.props.getXrmData();
    const segLines = _.filter(this.props.data.toJS().lines, { isSegmented: true });
    if (segLines.length) {
      this.setState({
        segmented: true,
      });
    }
    // if (window.parent.Xrm !== undefined) {
    //   console.log(window.parent.Xrm.Page.getAttribute('').getValue());
    //   console.log(window.parent.Xrm.Page.data.entity.getId().replace('{', '').replace('}', ''));
    //   console.log(window.parent.Xrm.Page.data.entity.getEntityName());
    // }
  }
  deleteGroup(lines, groups) {
    this.setState({
      selectedGroup: '',
    });
    this.props.deleteGroup(lines, groups);
  }
  changeGroup(groupId) {
    this.setState({ selectedGroup: groupId });
  }
  ungroup() {
    const data = this.props.data.toJS();
    // data.lines.forEach((i, index) => { data.lines[index].groupId = null; });
    data.groups.map((j, index) => { data.groups[index].isDeleted = true; return this; });
    data.linesGrouped = false;
    removeQuery('groupId');
    this.props.ungroup(data);
  }

  segment(id, value) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    for (let i = 0; i < d.length; i += 1) {
      if (d[i].checked) {
        d[i].checked = false;
      }
    }
    d1.checked = false;
    if (_.filter(d, { checked: true }).length) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    this.props.segment(id, value);
  }

  group() {
    const data = this.props.data.toJS();
    const randomID = generateGuid();
    const groupLength = _.filter(data.groups, { isDeleted: false }).length;
    if (data.linesGrouped) {
      const name = `New Group #${groupLength + 1}`;
      data.groups.push({
        id: randomID,
        name,
        isOptional: false,
        isDeleted: false,
        description: '',
        additionaldiscount: '',
        subscriptionTerm: '',
        netTotal: '0.00',
      });
      addQuery({ groupId: randomID });
      this.setState({ selectedGroup: randomID });
    } else {
      data.lines.forEach((i, index) => { data.lines[index].groupId = randomID; });
      data.groups.push({
        id: randomID,
        name: 'Group 1',
        isOptional: false,
        isDeleted: false,
        description: '',
        additionaldiscount: '',
        subscriptionTerm: '',
        netTotal: this.props.data.toJS().netAmount,
      });
      addQuery({ groupId: randomID });
      this.setState({ selectedGroup: randomID });
      data.linesGrouped = true;
    }
    this.props.group(data);
  }

  checkAll(e) {
    const d = Object.assign([], ReactDOM.findDOMNode(this).getElementsByClassName('check'));
    for (let i = 0; i < d.length; i += 1) {
      if (!d[i].checked && e.target.checked) {
        d[i].checked = true;
      } else if (d[i].checked && !e.target.checked) {
        d[i].checked = false;
      }
    }
  }

  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (_.filter(d1, { checked: true }).length) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    if (!e.target.checked) {
      if (d.checked) {
        d.checked = false;
      }
    }
  }

  deleteCheckedLines() {
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (d1.length) {
      const selectedLines = [];
      _.map(d1, (i) => {
        if (i.checked && typeof i !== 'undefined') {
          selectedLines.push(i.value);
        }
        return this;
      });

      this.props.deleteSelectedLines(selectedLines);

      if (ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked) {
        ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked = false;
      }
      const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
      for (let i = 0; i < d.length; i += 1) {
        if (d[i].checked) {
          d[i].checked = false;
        }
      }
      const d2 = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
      if (d2.checked) {
        d2.checked = false;
      }
      this.setState({ disabledButton: true });
    }
  }

  cloneCheckedLines() {
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (d1.length) {
      // const selectedLines = _.map(d1, (i) => { if (i.checked) return i.value; });
      const selectedLines = _.reduce(d1, (results, i) => {
        if (i.checked) {
          results.push(i.value);
        }
        return results;
      }, []);
      const d2 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
      for (let i = 0; i < d2.length; i += 1) {
        if (d2[i].checked) {
          d2[i].checked = false;
        }
      }
      const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
      if (d.checked) {
        d.checked = false;
      }
      this.props.cloneSelectedLines(selectedLines);
      // if (ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked) {
      //   ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked = false;
      // }
    }
  }

  calculateTotal() {
  //   let productsData=this.props.data.get('products').toJS().map((item, index) => {
  //     let listUnitPrice = 0.0;
  //     if (item['LIST UNIT PRICE'].indexOf('$') >= 0) {
  //       listUnitPrice = parseFloat(item['LIST UNIT PRICE'].split('$ ')[1]);
  //     }
  //     const additionalDiscount = item['ADDITIONAL DISC.'];

  //     if (additionalDiscount !== '') {
  //       const totalDiscount = listUnitPrice -((parseFloat(additionalDiscount) / 100) * listUnitPrice);
  //       const totalAmount=totalDiscount*parseInt(item['QUANTITY']);
  //       item['NET UNIT PRICE'] = '$ ' + totalAmount.toLocaleString('en', {     minimumFractionDigits: 0, maximumFractionDigits: 2 });
  //       item['NET TOTAL'] ='$ ' +totalAmount.toLocaleString('en', {     minimumFractionDigits: 0, maximumFractionDigits: 2 });
  //     }
  //     return item;
  // });
    this.props.calculateSelected(this.props.data.toJS());
  }

  updateProps(updatedData) {
    this.props.updateProps(updatedData);
  }

  saveCustomSegmentData(segmentData) {
    this.props.saveCustomSegmentData(segmentData);
    this.props.saveAppCustomSegmentData();
  }
  disabledButton() {
    this.setState({ disabledButton: true });
  }
  quickSaveQuoteLines() {
    this.props.quickSaveQuote();
  }
  render() {
    let quoteData = {};
    const data = this.props.data.toJS();
    if (data) {
      quoteData = data;
    }
    if (this.props.loading) {
      return (<div className="loader" style={style}></div>);
    }
    const grouped = this.props.data.toJS().linesGrouped;
    const segmented = _.filter(this.props.data.toJS().lines, { isSegmented: true, isDeleted: false }).length + _.filter(this.props.data.toJS().lines, { bundleProducts: [{ isSegmented: true, isDeleted: false }] }).length;
    // const segmentedBundle = _.filter(this.props.data.toJS().lines, { bundleProducts: [{ isSegmented: true }] }).length;
    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    return (
      <div>
        <div className="loader" style={style}></div>
        <Helmet
          title="CPQ - Edit Quote"
          meta={[
            { name: 'description', content: 'Description of EditQuotePage' },
          ]}
        />
        <div className="header-container">
          <EditQuoteHeader
            data={this.props.data ? this.props.data.toJS() : []}
            cloneLine={this.cloneCheckedLines}
            deleteLine={this.deleteCheckedLines}
            dataChanged={this.props.dataChanged}
            getAllData={this.props.getAllData}
            clone={this.cloneCheckedLines}
            calculateTotal={this.calculateTotal}
            quickSave={this.quickSaveQuoteLines}
            ungroup={this.ungroup}
            group={this.group}
            grouped={grouped}
            location={this.props.location}
            language={this.props.language}
            languageChange={this.props.changeLocale}
            disabledButton={this.state.disabledButton}
            toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
          />
        </div>
        {grouped ?

          <div className="qoute-container table-container">
            <GroupQuote
              data={this.props.data ? this.props.data.toJS() : []}
              groups={this.props.data ? _.filter(this.props.data.toJS().groups, { isDeleted: false }) : []}
              lines={this.props.data ? _.filter(this.props.data.toJS().lines, { isDeleted: false }) : []}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.checkAll}
              toggleQuoteCheckbox={this.toggleCheckboxChange}
              updateProps={this.updateProps}
              cloneGroup={this.props.cloneGroup}
              deleteGroup={this.deleteGroup}
              segmented={segmented}
              segment={this.segment}
              selectedGroup={this.state.selectedGroup}
              disableButton={this.disabledButton}
              changeGroup={this.changeGroup}
              update={this.props.update}
              updateBundle={this.props.updateBundle}
              updateSeg={this.props.updateSeg}
              updateSegBundle={this.props.updateSegBundle}
              location={this.props.location}
              updateGroupData={this.props.updateGroupData}
              updateGroupValue={this.props.updateGroupValue}
              updateSelect={this.props.updateSelect}
              updateSelectBundle={this.props.updateSelectBundle}
              updateSegSelect={this.props.updateSegSelect}
              updateSegBundleSelect={this.props.updateSegBundleSelect}
              loadCustomSegmentsData={this.props.loadCustomSegmentsData}
              addCustomSegmentData={this.props.addCustomSegmentData}
              deleteCustomSegmentData={this.props.deleteCustomSegmentData}
              changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
              saveCustomSegmentData={this.saveCustomSegmentData}
              checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
              checkCustomSegmentData={this.props.checkCustomSegmentData}
              customSegments={this.props.customSegments}
              clearCustomSegmentsData={this.props.clearCustomSegmentsData}
              quoteData={quoteData}
              toggleCheckAll={this.props.toggleCheckAll}
              isCheckAll={this.props.isCheckAll}
              toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
            />
          </div>
        :
          <div className="qoute-container table-container">
            {segmented ?
              <SegmentedQuote
                data={this.props.data ? _.filter(this.props.data.toJS().lines, { isDeleted: false }) : []}
                cloneLine={this.props.cloneLine}
                deleteLine={this.props.deleteLine}
                disableButton={this.disabledButton}
                toggleAllCheckBox={this.checkAll}
                toggleQuoteCheckbox={this.toggleCheckboxChange}
                updateProps={this.updateProps}
                currency={this.props.data.get('currency')}
                segment={this.segment}
                update={this.props.update}
                location={this.props.location}
                updateBundle={this.props.updateBundle}
                updateSelect={this.props.updateSelect}
                updateSelectBundle={this.props.updateSelectBundle}
                updateSeg={this.props.updateSeg}
                updateSegBundle={this.props.updateSegBundle}
                updateSegSelect={this.props.updateSegSelect}
                updateSegBundleSelect={this.props.updateSegBundleSelect}
                loadCustomSegmentsData={this.props.loadCustomSegmentsData}
                addCustomSegmentData={this.props.addCustomSegmentData}
                deleteCustomSegmentData={this.props.deleteCustomSegmentData}
                changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
                saveCustomSegmentData={this.saveCustomSegmentData}
                checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
                checkCustomSegmentData={this.props.checkCustomSegmentData}
                customSegments={this.props.customSegments}
                clearCustomSegmentsData={this.props.clearCustomSegmentsData}
                quoteData={quoteData}
                toggleCheckAll={this.props.toggleCheckAll}
                isCheckAll={this.props.isCheckAll}
                toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
              />
            :
                <EditQuoteGrid
                  data={this.props.data ? _.filter(this.props.data.toJS().lines, { isDeleted: false }) : []}
                  cloneLine={this.props.cloneLine}
                  deleteLine={this.props.deleteLine}
                  toggleAllCheckBox={this.checkAll}
                  toggleQuoteCheckbox={this.toggleCheckboxChange}
                  updateProps={this.updateProps}
                  currency={this.props.data.get('currency')}
                  segment={this.segment}
                  update={this.props.update}
                  updateBundle={this.props.updateBundle}
                  updateSelect={this.props.updateSelect}
                  updateSelectBundle={this.props.updateSelectBundle}
                  quoteData={quoteData}
                  location={this.props.location}
                  toggleReconfigureLineStatus={this.props.toggleReconfigureLineStatus}
                />
            }
          </div>
        }
      </div>
    );
  }
}

EditQuotePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  cloneLine: PropTypes.func,
  deleteLine: PropTypes.func,
  data: PropTypes.any,
  deleteSelectedLines: PropTypes.func,
  calculateSelected: PropTypes.func,
  quickSaveQuote: PropTypes.func,
  updateProps: PropTypes.func,
  deleteGroup: PropTypes.func,
  cloneGroup: PropTypes.func,
  ungroup: PropTypes.func,
  group: PropTypes.func,
  segment: PropTypes.any,
  update: PropTypes.func,
  updateBundle: PropTypes.func,
  updateSeg: PropTypes.func,
  updateSegBundle: PropTypes.func,
  loading: PropTypes.any,
  location: PropTypes.any,
  updateGroupData: PropTypes.func,
  updateGroupValue: PropTypes.func,
  updateSelect: PropTypes.func,
  updateSelectBundle: PropTypes.func,
  updateSegSelect: PropTypes.func,
  updateSegBundleSelect: PropTypes.func,
  cloneSelectedLines: PropTypes.func,
  loadCustomSegmentsData: PropTypes.func,
  addCustomSegmentData: PropTypes.func,
  deleteCustomSegmentData: PropTypes.func,
  changeCustomSegmentFieldData: PropTypes.func,
  saveCustomSegmentData: PropTypes.func,
  checkAllCustomSegmentData: PropTypes.func,
  checkCustomSegmentData: PropTypes.func,
  customSegments: PropTypes.any,
  clearCustomSegmentsData: PropTypes.func,
  saveAppCustomSegmentData: PropTypes.func,
  toggleCheckAll: PropTypes.func,
  isCheckAll: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
  toggleReconfigureLineStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  dataChanged: makeDataChanged(),
  error: makeSelectError(),
  customSegments: getCustomSegments(),
  isCheckAll: getCheckAll(),
  language: getLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cloneLine: (data) => {
      dispatch(cloneLine(data));
    },
    deleteLine: (data) => {
      dispatch(deleteLine(data));
    },
    getAllData: (quoteId) => {
      dispatch(loadData(quoteId));
    },
    deleteSelectedLines: (data) => {
      dispatch(deleteMultipleLines(data));
    },
    cloneSelectedLines: (data) => {
      dispatch(cloneMultipleLines(data));
    },
    calculateSelected: (data) => {
      dispatch(calculateSelectedData(data));
    },
    quickSaveQuote: () => {
      dispatch(quickSaveQuotes());
    },
    updateProps: (data) => {
      dispatch(updateProps(data));
    },
    cloneGroup: (lines, groups) => {
      dispatch(cloneGroup(lines, groups));
    },
    deleteGroup: (lines, groups) => {
      dispatch(deleteGroup(lines, groups));
    },
    ungroup: (data) => {
      dispatch(ungroup(data));
    },
    group: (data) => {
      dispatch(group(data));
    },
    update: (id, data, field) => {
      dispatch(update(id, data, field));
    },
    updateSelectBundle: (parentLineId, id, field, data) => {
      dispatch(updateSelectBundle(parentLineId, id, field, data));
    },
    updateSelect: (id, data, field) => {
      dispatch(updateSelect(id, data, field));
    },
    updateBundle: (parentLineId, id, field, data) => {
      dispatch(updateBundle(parentLineId, id, field, data));
    },
    updateSeg: (id, name, field, data) => {
      dispatch(updateSeg(id, name, field, data));
    },
    updateSegBundle: (parentLineId, id, name, field, data) => {
      dispatch(updateSegBundle(parentLineId, id, name, field, data));
    },
    updateSegSelect: (id, name, field, data) => {
      dispatch(updateSegSelect(id, name, field, data));
    },
    updateSegBundleSelect: (parentLineId, id, name, field, data) => {
      dispatch(updateSegBundleSelect(parentLineId, id, name, field, data));
    },
    updateGroupData: (id, field, data) => {
      dispatch(updateGroupData(id, field, data));
    },
    updateGroupValue: (id, field, data) => {
      dispatch(updateGroupValue(id, field, data));
    },
    segment: (id, value) => {
      dispatch(segment(id, value));
    },
    loadCustomSegmentsData: (customSegments) => {
      dispatch(loadCustomSegmentsData(customSegments));
    },
    addCustomSegmentData: () => {
      dispatch(addCustomSegmentData());
    },
    deleteCustomSegmentData: () => {
      dispatch(deleteCustomSegmentData());
    },
    changeCustomSegmentFieldData: (item) => {
      dispatch(changeCustomSegmentFieldData(item));
    },
    saveCustomSegmentData: (segmentData) => {
      dispatch(saveCustomSegmentData(segmentData));
    },
    checkAllCustomSegmentData: (isCheckAll) => {
      dispatch(checkAllCustomSegmentData(isCheckAll));
    },
    checkCustomSegmentData: (id) => {
      dispatch(checkCustomSegmentData(id));
    },
    clearCustomSegmentsData: (id) => {
      dispatch(clearCustomSegmentsData(id));
    },
    saveAppCustomSegmentData: () => {
      dispatch(saveAppCustomSegmentData());
    },
    toggleCheckAll: (isCheckAll) => {
      dispatch(toggleCheckAll(isCheckAll));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
    toggleReconfigureLineStatus: (reconfigureObj) => {
      dispatch(toggleReconfigureLineStatus(reconfigureObj));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
