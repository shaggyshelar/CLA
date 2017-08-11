/*
 *
 * SegmentedQuote
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSegmentedQuote from './selectors';
import { Tabs, Tab } from 'react-bootstrap/lib';
import EditQuoteGrid from 'components/EditQuoteGrid';
export class SegmentedQuote extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.data)
    return (
      <div className="qoute-container segmented">
        <Tabs defaultActiveKey={1} animation id="noanim-tab-example">
          <Tab eventKey={1} title="Segmented">
            <Tabs defaultActiveKey={1} animation id="inner-tab-example">
              <Tab eventKey={1} title="Monthly">
                <EditQuoteGrid
                  data={this.props.data}
                  cloneLine={this.props.cloneLine}
                  deleteLine={this.props.deleteLine}
                  toggleAllCheckBox={this.props.toggleAllCheckBox}
                  toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                  updateProps={this.props.updateProps}
                  currency={this.props.data.currency}
                />
              </Tab>
              <Tab eventKey={2} title="Yearly">
                <EditQuoteGrid
                  data={this.props.data}
                  cloneLine={this.props.cloneLine}
                  deleteLine={this.props.deleteLine}
                  toggleAllCheckBox={this.props.toggleAllCheckBox}
                  toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                  updateProps={this.props.updateProps}
                  currency={this.props.data.currency}
                />
              </Tab>
              <Tab eventKey={3} title="Quaterly">
                <EditQuoteGrid
                  data={this.props.data}
                  cloneLine={this.props.cloneLine}
                  deleteLine={this.props.deleteLine}
                  toggleAllCheckBox={this.props.toggleAllCheckBox}
                  toggleQuoteCheckbox={this.props.toggleAllCheckBox}
                  updateProps={this.props.updateProps}
                  currency={this.props.data.currency}
                />
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey={2} title="Standard">Tab 2 content</Tab>
        </Tabs>
      </div>
    );
  }
}

SegmentedQuote.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
