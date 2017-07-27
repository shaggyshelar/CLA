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
// import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';
import AddProductsDropdown from '../../components/AddProductsDropdown';
import AddGroupDropdown from '../../components/AddGroupDropdown';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import { makeSelectData, makeSelectError, makeSelectLoading } from './selectors';

export class EditQuoteHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
constructor(props) {
    super(props)
    this.handleFullScreen = this.handleFullScreen.bind(this)
}
 cloneLine(index,e) {
    var data = this.props.data
    data.splice(index, 0, data[index]);
    this.props.cloneLine(data)
  }
 handleFullScreen(d) {
  if(d.requestFullscreen) {
    d.requestFullscreen();
  } else if(d.mozRequestFullScreen) {
    d.mozRequestFullScreen();
  } else if(d.webkitRequestFullscreen) {
    d.webkitRequestFullscreen();
  } else if(document.documentElement.msRequestFullscreen) {
    d.msRequestFullscreen();
  }
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
        <Col xs={12} md={9} style={{textAlign:"right"}}>
          <AddProductsDropdown />
          <AddGroupDropdown />
          <Button className="margin">Delete Lines</Button>
           <ButtonGroup className="margin">
          <Button>Quick Save</Button>
          <Button onClick={this.cloneLine.bind(this,1)}>Calculate</Button>
           </ButtonGroup>
          <Button className="margin">Cancel</Button>
          <Button className="margin" onClick={this.handleFullScreen}><Glyphicon glyph='fullscreen' /></Button>
          <Button className="margin" bsStyle="primary">Save</Button>
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
  data: React.PropTypes.any,
};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {

  return {
    // dispatch,   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuoteHeader);
