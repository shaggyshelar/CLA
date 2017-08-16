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
    data.NormalLines = _.filter(this.props.data, { canSegment: false });
    data.CustomLines = _.filter(this.props.data, { canSegment: true, segmentData: { type: 'Custom' } });
    data.MonthlyLines = _.filter(this.props.data, { canSegment: true, segmentData: { type: 'Monthly' } });
    data.YearlyLines = _.filter(this.props.data, { canSegment: true, segmentData: { type: 'Yearly' } });
    data.QuaterlyLines = _.filter(this.props.data, { canSegment: true, segmentData: { type: 'Quaterly' } });
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
                <Tab eventKey={1} title="Custom">
                  <SegmentedEditQuoteGrid
                    data={data.CustomLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                  />
                </Tab>
              :
              ''
            }
              { data.MonthlyLines.length > 0 ?
                <Tab eventKey={2} title="Monthly">
                  <SegmentedEditQuoteGrid
                    data={data.MonthlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                  />
                </Tab> : '' }
              {data.QuaterlyLines.length > 0 ?
                <Tab eventKey={3} title="Quaterly">
                  <SegmentedEditQuoteGrid
                    data={data.QuaterlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                    updateProps={this.props.updateProps}
                    currency={this.props.currency}
                    segment={this.props.segment}
                  />
                </Tab> : '' }
              { data.YearlyLines.length > 0 ?
                <Tab eventKey={4} title="Yearly">
                  <SegmentedEditQuoteGrid
                    data={data.YearlyLines}
                    cloneLine={this.props.cloneLine}
                    deleteLine={this.props.deleteLine}
                    toggleAllCheckBox={this.props.toggleAllCheckBox}
                    toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                    updateProps={this.props.updateProps}
                    currency={this.props.data.currency}
                    segment={this.props.segment}
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
              toggleQuoteCheckbox={this.props.toggleAllCheckBox}
              updateProps={this.props.updateProps}
              currency={this.props.data.currency}
              segment={this.props.segment}
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
