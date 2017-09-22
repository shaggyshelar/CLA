import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { Tabs, Tab, Glyphicon } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import SegmentedEditQuoteGrid from 'components/SegmentedEditQuoteGrid';
import makeSelectSegmentedQuote from './selectors';
import messages from './messages';
import { addQuery, removeQuery } from '../App/constants';
export class SegmentedQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderSegmentData = this.renderSegmentData.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.selectMainTab = this.selectMainTab.bind(this);
    this.state = {
      selectedTab: '',
      selectedMainTab: '1',
      isCustomModalOpen: false,
      data: [],
    };
    this.showCustomModal = this.showCustomModal.bind(this);
    this.hideCustomModalToggle = this.hideCustomModalToggle.bind(this);
    this.saveCustomSegmentData = this.saveCustomSegmentData.bind(this);
  }
  componentWillMount() {
    const lines1 = _.filter(this.props.data, { isSegmented: true, segmentData: { type: this.props.location.query.tab } });

    if (this.props.location.query.mainTab) {
      this.setState({ selectedMainTab: this.props.location.query.mainTab });
    } else {
      addQuery({ mainTab: 1 });
    }
    if (this.props.location.query.tab && lines1.length) {
      this.setState({ selectedTab: this.props.location.query.tab });
    } else {
      this.setState({ selectedTab: '' });
      addQuery({ tab: '' });
    }
  }
  componentWillReceiveProps(nextProps) {
    let lines1 = [];
    if (nextProps.location.query.tab !== '') {
      const state = nextProps.location.query.tab;
      this.setState({ selectedTab: nextProps.location.query.tab });
      lines1 = _.filter(nextProps.data, { isSegmented: true, segmentData: { type: state } });
      if (lines1.length === 0) {
        addQuery({ tab: '' });
        this.setState({ selectedTab: '' });
      }
    }
  }

  selectTab(e) {
    addQuery({ tab: e });
  }
  selectMainTab(e) {
    addQuery({ mainTab: e });
    this.setState({ selectedMainTab: e });
    // this.props.disableButton();
  }

  showCustomModal() {
    this.setState({
      isCustomModalOpen: !this.state.isCustomModalOpen,
    });
    this.props.loadCustomSegmentsData(this.state.data.CustomLines[0].segmentData.columns);
    this.props.toggleCheckAll(false);
  }

  hideCustomModalToggle() {
    this.setState({
      isCustomModalOpen: !this.state.isCustomModalOpen,
    });
    this.props.clearCustomSegmentsData();
  }

  saveCustomSegmentData(item) {
    this.setState({
      isCustomModalOpen: !this.state.isCustomModalOpen,
    });
    this.props.saveCustomSegmentData(item);
  }

  renderSegmentData() {
    const data = {};
    let bundleLines = [];
    _.map(this.props.data, (e) => {
      const a = _.filter(e.bundleProducts, { isSegmented: true });
      if (a.length) {
        bundleLines = bundleLines.concat(a);
      }
    });
    data.NormalLines = _.filter(this.props.data, { isSegmented: false });
    data.CustomLines = _.filter(this.props.data, { isSegmented: true, segmentData: { type: 'Custom' } });
    data.CustomLines = data.CustomLines.concat(_.filter(bundleLines, { segmentData: { type: 'Custom' } }));
    data.MonthlyLines = _.filter(this.props.data, { isSegmented: true, segmentData: { type: 'Monthly' } });
    data.MonthlyLines = data.MonthlyLines.concat(_.filter(bundleLines, { segmentData: { type: 'Monthly' } }));
    data.YearlyLines = _.filter(this.props.data, { isSegmented: true, segmentData: { type: 'Yearly' } });
    data.YearlyLines = data.YearlyLines.concat(_.filter(bundleLines, { segmentData: { type: 'Yearly' } }));
    data.QuaterlyLines = _.filter(this.props.data, { isSegmented: true, segmentData: { type: 'Quaterly' } });
    data.QuaterlyLines = data.QuaterlyLines.concat(_.filter(bundleLines, { segmentData: { type: 'Quaterly' } }));
    return data;
  }
  renderButton() {
    return (<div>
      <span>Custom</span>
      <Glyphicon className="customPencilIcon" glyph="pencil" onClick={this.showCustomModal} />
    </div>);
  }

  render() {
    const data = this.renderSegmentData();
    this.state.data = data;
    let selected = '';
    if (data.CustomLines.length > 0) {
      selected = 'Custom';
    } else if (data.MonthlyLines.length > 0) {
      selected = 'Monthly';
    } else if (data.QuaterlyLines.length > 0) {
      selected = 'Quaterly';
    } else if (data.YearlyLines.length > 0) {
      selected = 'Yearly';
    }

    return (
      <div className="qoute-container segmented">
        <Tabs activeKey={this.state.selectedMainTab} onSelect={this.selectMainTab} animation={false} defaultActiveKey={1} id="noanim-tab-example">
          <Tab unmountOnExit eventKey={'1'} title={this.context.intl.formatMessage({ ...messages.segment })}>

            <Tabs animation={false} activeKey={this.state.selectedTab === '' ? selected : this.state.selectedTab} onSelect={this.selectTab} id="inner-tab-example">
              { data.CustomLines.length > 0 ?
                <Tab unmountOnExit eventKey={'Custom'} tabClassName={'custom'} title={this.renderButton()}>
                  <SegmentedEditQuoteGrid
                    data={data.CustomLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                    updateSeg={this.props.updateSeg}
                    updateSegBundle={this.props.updateSegBundle}
                    selectedTab={this.selectTab}
                    updateSegSelect={this.props.updateSegSelect}
                    updateSegBundleSelect={this.props.updateSegBundleSelect}
                    currentTab={this.state.selectedTab}
                    isCustomModalOpen={this.state.isCustomModalOpen}
                    handleCustomModalToggle={this.hideCustomModalToggle}
                    loadCustomSegmentsData={this.props.loadCustomSegmentsData}
                    addCustomSegmentData={this.props.addCustomSegmentData}
                    deleteCustomSegmentData={this.props.deleteCustomSegmentData}
                    changeCustomSegmentFieldData={this.props.changeCustomSegmentFieldData}
                    saveCustomSegmentData={this.saveCustomSegmentData}
                    checkAllCustomSegmentData={this.props.checkAllCustomSegmentData}
                    checkCustomSegmentData={this.props.checkCustomSegmentData}
                    customSegments={this.props.customSegments}
                    quoteData={this.props.quoteData}
                    toggleCheckAll={this.props.toggleCheckAll}
                    isCheckAll={this.props.isCheckAll}
                  />
                </Tab>
              :
              ''
            }
              { data.MonthlyLines.length > 0 ?
                <Tab unmountOnExit eventKey={'Monthly'} tabClassName={'monthly'} title={this.context.intl.formatMessage({ ...messages.monthly })}>
                  <SegmentedEditQuoteGrid
                    data={data.MonthlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                    updateSeg={this.props.updateSeg}
                    updateSegBundle={this.props.updateSegBundle}
                    selectedTab={this.selectTab}
                    updateSegSelect={this.props.updateSegSelect}
                    updateSegBundleSelect={this.props.updateSegBundleSelect}
                    quoteData={this.props.quoteData}
                  />
                </Tab> : '' }
              {data.QuaterlyLines.length > 0 ?
                <Tab unmountOnExit eventKey={'Quaterly'} tabClassName={'quaterly'} title={this.context.intl.formatMessage({ ...messages.quaterly })}>
                  <SegmentedEditQuoteGrid
                    data={data.QuaterlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                    updateSeg={this.props.updateSeg}
                    updateSegBundle={this.props.updateSegBundle}
                    selectedTab={this.selectTab}
                    updateSegSelect={this.props.updateSegSelect}
                    updateSegBundleSelect={this.props.updateSegBundleSelect}
                    quoteData={this.props.quoteData}
                  />
                </Tab> : '' }
              { data.YearlyLines.length > 0 ?
                <Tab unmountOnExit eventKey={'Yearly'} tabClassName={'yearly'} title={this.context.intl.formatMessage({ ...messages.yearly })}>
                  <SegmentedEditQuoteGrid
                    data={data.YearlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                    updateSeg={this.props.updateSeg}
                    updateSegBundle={this.props.updateSegBundle}
                    selectedTab={this.selectTab}
                    updateSegSelect={this.props.updateSegSelect}
                    updateSegBundleSelect={this.props.updateSegBundleSelect}
                    quoteData={this.props.quoteData}
                  />
                </Tab> : '' }
            </Tabs>
          </Tab>
          <Tab unmountOnExit eventKey={'2'} title={this.context.intl.formatMessage({ ...messages.standard })}>
            <EditQuoteGrid
              data={data.NormalLines}
              cloneLine={this.props.cloneLine}
              deleteLine={this.props.deleteLine}
              toggleAllCheckBox={this.props.toggleAllCheckBox}
              toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
              updateProps={this.props.updateProps}
              currency={this.props.currency}
              segment={this.props.segment}
              update={this.props.update}
              updateBundle={this.props.updateBundle}
              updateSelect={this.props.updateSelect}
              updateSelectBundle={this.props.updateSelectBundle}
              quoteData={this.props.quoteData}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

SegmentedQuote.propTypes = {
  cloneLine: PropTypes.func.isRequired,
  deleteLine: PropTypes.func.isRequired,
  toggleAllCheckBox: PropTypes.func.isRequired,
  currency: PropTypes.any,
  segment: PropTypes.any,
  data: PropTypes.any,
  updateProps: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  updateBundle: PropTypes.func.isRequired,
  updateSegBundle: PropTypes.func.isRequired,
  updateSeg: PropTypes.func.isRequired,
  toggleQuoteCheckbox: PropTypes.func.isRequired,
  updateSegSelect: PropTypes.func.isRequired,
  updateSegBundleSelect: PropTypes.func.isRequired,
  updateSelect: PropTypes.func.isRequired,
  updateSelectBundle: PropTypes.func.isRequired,
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
  location: PropTypes.any,
};
SegmentedQuote.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
const mapStateToProps = createStructuredSelector({
  SegmentedQuote: makeSelectSegmentedQuote(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentedQuote);
