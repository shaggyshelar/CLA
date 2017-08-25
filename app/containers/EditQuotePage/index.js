
import EditQuoteGrid from 'components/EditQuoteGrid';
import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import { EditQuoteHeader } from '../EditQuoteHeader';
import { GroupQuote } from '../GroupQuote';
import { SegmentedQuote } from '../SegmentedQuote';
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
  updateGroupData,
  updateGroupValue,
  segment,
 } from '../App/actions';


export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedQuotes: [],
      segmented: false,
      segLines: [],
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.deleteCheckedLines = this.deleteCheckedLines.bind(this);
    this.cloneCheckedLines = this.cloneCheckedLines.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.quickSaveQuotes = this.quickSaveQuotes.bind(this);
    this.updateProps = this.updateProps.bind(this);
    this.ungroup = this.ungroup.bind(this);
    this.group = this.group.bind(this);
    this.segment = this.segment.bind(this);
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
    if (window.parent.Xrm !== undefined) {
      console.log(window.parent.Xrm.Page.context.getClientUrl());
      console.log(window.parent.Xrm.Page.data.entity.getId().replace('{', '').replace('}', ''));
      console.log(window.parent.Xrm.Page.data.entity.getEntityName());
    }
  }

  componentDidMount() {
    // if (!this.props.data.get('priceList')) {
    //   browserHistory.push('/PriceBook');
    // }
  }

  ungroup() {
    const data = this.props.data.toJS();
    data.lines.forEach((i) => { i.groupId = ''; });
    data.groups = [];
    data.linesGrouped = false;
    this.props.ungroup(data);
  }

  segment(id, value, isOption, parent) {
    this.props.segment(id, value, isOption, parent);
  }

  group() {
    const data = this.props.data.toJS();
    const randomID = parseInt(Math.random() * 100000, 0).toString();
    if (data.linesGrouped) {
      const name = `Group ${data.groups.length}`;
      data.groups.push({
        id: randomID,
        name,
        isOptional: false,
        description: '',
        additionaldiscount: '',
        subscriptionTerm: '',
        netTotal: this.props.data.toJS().netAmount,
      });
    } else {
      data.lines.forEach((i) => { i.groupId = randomID; });
      data.groups.push({
        id: randomID,
        name: 'Group1',
        isOptional: false,
        description: '',
        additionaldiscount: '',
        subscriptionTerm: '',
        netTotal: this.props.data.toJS().netAmount,
      });
      data.linesGrouped = true;
    }

    this.props.group(data);
  }

  checkAll(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
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
    if (!e.target.checked) {
      if (d.checked) {
        d.checked = false;
      }
    }
  }

  deleteCheckedLines() {
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (d1.length) {
      const selectedLines = _.map(d1, (i) => { if (i.checked) return i.value; });
      this.props.deleteSelectedLines(selectedLines);
      if (ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked) {
        ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked = false;
      }
      const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
      for (let i = 0; i < d.length; i += 1) {
        if (d[i].checked) {
          d[i].click();
        }
      }
    }
  }

  cloneCheckedLines() {
    const d1 = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    if (d1.length) {
      const selectedLines = _.map(d1, (i) => { if (i.checked) return i.value; });
      this.props.cloneSelectedLines(selectedLines);
      if (ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked) {
        ReactDOM.findDOMNode(this).getElementsByClassName('check')[0].checked = false;
      }
      const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
      for (let i = 0; i < d.length; i += 1) {
        if (d[i].checked) {
          d[i].click();
        }
      }
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
  //       item['NET UNIT PRICE'] = '$ ' + totalAmount.toLocaleString('en', {     minimumFractionDigits: 2 });
  //       item['NET TOTAL'] ='$ ' +totalAmount.toLocaleString('en', {     minimumFractionDigits: 2 });
  //     }
  //     return item;
  // });
    this.props.calculateSelected(this.props.data.toJS());
  }

  updateProps(updatedData) {
    this.props.updateProps(updatedData);
  }


  quickSaveQuotes() {
    this.props.quickSaveQuote(this.props.data.toJS());
  }

  render() {
    const grouped = this.props.data.toJS().linesGrouped;
    const segmented = _.filter(this.props.data.toJS().lines, { isSegmented: true }).length + _.filter(this.props.data.toJS().lines, { bundleProducts: [{ isSegmented: true }] }).length;
    // const segmentedBundle = _.filter(this.props.data.toJS().lines, { bundleProducts: [{ isSegmented: true }] }).length;

    return (
      <div>

        <Helmet
          title="EditQuotePage"
          meta={[
            { name: 'description', content: 'Description of EditQuotePage' },
          ]}
        />
        <div>
          <EditQuoteHeader
            data={this.props.data ? this.props.data.toJS() : []}
            cloneLine={this.props.cloneLine}
            deleteLine={this.deleteCheckedLines}
            cloneLine={this.cloneCheckedLines}
            clone={this.cloneCheckedLines}
            calculateTotal={this.calculateTotal}
            quickSave={this.quickSaveQuotes}
            ungroup={this.ungroup}
            group={this.group}
            grouped={grouped}
          />
        </div>
        {grouped ?

          <div className="qoute-container">
            <GroupQuote
              data={this.props.data ? this.props.data.toJS() : []}
              groups={this.props.data ? this.props.data.toJS().groups : []}
              lines={this.props.data ? this.props.data.toJS().lines : []}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.checkAll}
              toggleQuoteCheckbox={this.toggleCheckboxChange}
              updateProps={this.updateProps}
              cloneGroup={this.props.cloneGroup}
              deleteGroup={this.props.deleteGroup}
              segmented={segmented}
              segment={this.segment}
              update={this.props.update}
              updateBundle={this.props.updateBundle}
              updateSeg={this.props.updateSeg}
              updateSegBundle={this.props.updateSegBundle}
              location={this.props.location}
              updateGroupData={this.props.updateGroupData}
              updateGroupValue={this.props.updateGroupValue}
            />
          </div>
        :
          <div className="qoute-container">
            {segmented ?
              <SegmentedQuote
                 data={this.props.data ? this.props.data.toJS().lines : []}
                 cloneLine={this.props.cloneLine}
                 deleteLine={this.props.deleteLine}
                 toggleAllCheckBox={this.checkAll}
                 toggleQuoteCheckbox={this.toggleCheckboxChange}
                 updateProps={this.updateProps}
                 currency={this.props.data.get('currency')}
                 segment={this.segment}
                 update={this.props.update}
                 updateBundle={this.props.updateBundle}
                 updateSeg={this.props.updateSeg}
                 updateSegBundle={this.props.updateSegBundle}
               />
            :
                <EditQuoteGrid
                  data={this.props.data ? this.props.data.toJS().lines : []}
                  cloneLine={this.props.cloneLine}
                  deleteLine={this.props.deleteLine}
                  toggleAllCheckBox={this.checkAll}
                  toggleQuoteCheckbox={this.toggleCheckboxChange}
                  updateProps={this.updateProps}
                  currency={this.props.data.get('currency')}
                  segment={this.segment}
                  update={this.props.update}
                  updateBundle={this.props.updateBundle}
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
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

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
    deleteSelectedLines: (data) => {
      dispatch(deleteMultipleLines(data));
    },
    cloneSelectedLines: (data) => {
      dispatch(cloneMultipleLines(data));
    },
    calculateSelected: (data) => {
      dispatch(calculateSelectedData(data));
    },
    quickSaveQuote: (data) => {
      dispatch(quickSaveQuotes(data));
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
    updateBundle: (parentId, id, field, data) => {
      dispatch(updateBundle(parentId, id, field, data));
    },
    updateSeg: (id, name, field, data) => {
      dispatch(updateSeg(id, name, field, data));
    },
    updateSegBundle: (parentId, id, name, field, data) => {
      dispatch(updateSegBundle(parentId, id, name, field, data));
    },
    updateGroupData: (id, field, data) => {
      dispatch(updateGroupData(id, field, data));
    },
    updateGroupValue: (id, field, data) => {
      dispatch(updateGroupValue(id, field, data));
    },
    segment: (id, value, isOption, parent) => {
      dispatch(segment(id, value, isOption, parent));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
