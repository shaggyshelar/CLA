
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
import { cloneLine,
  deleteLine,
  deleteMultipleLines,
  calculateSelectedData,
  quickSaveQuotes,
  updateProps,
  cloneGroup,
  deleteGroup,
  ungroup,
  group,
 } from '../App/actions';


export class EditQuotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedQuotes: [],
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.deleteCheckedLines = this.deleteCheckedLines.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.quickSaveQuotes = this.quickSaveQuotes.bind(this);
    this.updateProps = this.updateProps.bind(this);
    this.ungroup = this.ungroup.bind(this);
    this.group = this.group.bind(this);
  }
  componentWillMount() {
    // this.props.getAllData();
    // this.props.getXrmData();
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
  group() {
    const data = this.props.data.toJS();
    const randomID = parseInt(Math.random() * 100000, 0);
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
        d[i].click();
      } else if (d[i].checked && !e.target.checked) {
        d[i].click();
      }
    }
  }

  toggleCheckboxChange(e) {
    const d = ReactDOM.findDOMNode(this).getElementsByClassName('checkAll')[0];
    // const data = this.state.selectedQuotes;
    if (!e.target.checked) {
      _.remove(this.state.selectedQuotes, (n) => n === e.target.value);
      if (d.checked) {
        d.checked = false;
      }
    } else {
      this.state.selectedQuotes.push(e.target.value);
    }
  }

  deleteCheckedLines() {
    const dataObj = this.props.data.toJS();

    // let allProducts=this.props.data.get('lines').toJS();
    let indexArr = [];
    indexArr = dataObj.lines.map((item, index) => {
      if (this.state.selectedQuotes.includes(item.id)) {
        return index;
      }
      return undefined;
    }).filter((item) => item !== undefined);
    indexArr.sort((a, b) => b - a);
    indexArr.forEach((item) => {
      dataObj.lines.splice(item, 1);
    }, this);
    this.props.deleteSelectedLines(dataObj.lines);

    const d = ReactDOM.findDOMNode(this).getElementsByClassName('check');
    for (let i = 0; i < d.length; i += 1) {
      if (d[i].checked) {
        d[i].click();
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
  //       item['NET UNIT PRICE'] = '$ ' + totalAmount.toFixed(2);
  //       item['NET TOTAL'] ='$ ' +totalAmount.toFixed(2);
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
            calculateTotal={this.calculateTotal}
            quickSave={this.quickSaveQuotes}
            grouped={grouped}
            ungroup={this.ungroup}
            group={this.group}
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
            />
          </div>
        :
          <div className="qoute-container">
            <EditQuoteGrid
              data={this.props.data ? this.props.data.toJS().lines : []}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.checkAll}
              toggleQuoteCheckbox={this.toggleCheckboxChange}
              updateProps={this.updateProps}
              currency={this.props.data.get('currency')}
            />
            {this.props.data.toJS().lines.length > 0 ?
              <div className="sub-footer">
                Sub Total : {this.props.data.get('currency')}{this.props.data.get('netAmount')}
              </div>
              :
              <div className="sub-footer"></div>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuotePage);
