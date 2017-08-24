/*
 *
 * SegmentedQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { Tabs, Tab } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
import SegmentedEditQuoteGrid from 'components/SegmentedEditQuoteGrid';
import makeSelectSegmentedQuote from './selectors';
export class SegmentedQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderSegmentData = this.renderSegmentData.bind(this);
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
  render() {
    const data = this.renderSegmentData();
    return (
      <div className="qoute-container segmented">
        <Tabs defaultActiveKey={1} animation id="noanim-tab-example">
          <Tab eventKey={1} title="Segmented">
            <Tabs animation id="inner-tab-example">
              { data.CustomLines.length > 0 ?
                <Tab eventKey={'custom'} title="Custom">
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
                  />
                </Tab>
              :
              ''
            }
              { data.MonthlyLines.length > 0 ?
                <Tab eventKey={'monthly'} title="Monthly">
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
                  />
                </Tab> : '' }
              {data.QuaterlyLines.length > 0 ?
                <Tab eventKey={'quaterly'} title="Quaterly">
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
                  />
                </Tab> : '' }
              { data.YearlyLines.length > 0 ?
                <Tab eventKey={'yearly'} title="Yearly">
                  <SegmentedEditQuoteGrid
                    data={data.YearlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleQuoteCheckbox}
                    updateProps={this.props.updateProps}
                    currency={this.props.data.currency}
                    segment={this.props.segment}
                    updateSeg={this.props.updateSeg}
                    updateSegBundle={this.props.updateSegBundle}
                  />
                </Tab> : '' }
            </Tabs>
          </Tab>
          <Tab eventKey={2} title="Standard">
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
