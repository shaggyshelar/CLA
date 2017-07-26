/*
 *
 * EditQuoteHeader
 *
 */
// import React, { PropTypes } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectData, makeSelectError, makeSelectLoading } from '../App/selectors';
import { loadData } from './actions';
import AddProductsDropdown from '../../components/AddProductsDropdown';
import AddGroupDropdown from '../../components/AddGroupDropdown';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';


export class EditQuoteHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    console.log(this.props);
    debugger;
      //this.props.getAllData();
      this.props.getOnLoadData();
  }
  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data,
    };

    return (
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <Helmet
            title="TableHeader"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <EditQuoteHeaderCard />
        </Col>
        <Col xs={12} md={9}>
          <AddProductsDropdown />
          <AddGroupDropdown />
          <Button className="margin">Delete Lines</Button>
           <ButtonGroup className="margin">
          <Button>Quick Save</Button>
          <Button>Calculate</Button>
           </ButtonGroup>
          <Button className="margin">Cancel</Button>
          <Button className="margin"><Glyphicon glyph='fullscreen' /></Button>
          <Button onClick={() => this.props.getOnLoadData()} className="margin" bsStyle="primary">Save</Button>
        </Col>
      </Row>
    );
  }
}

EditQuoteHeader.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  data: React.PropTypes.object,
  //getAllData: React.PropTypes.func,
  getOnLoadData: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // ApiPage: makeSelectApiPage(),
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {

  return {
    // dispatch,
   
    // getAllData: () => {
    //   dispatch(loadData());
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);
