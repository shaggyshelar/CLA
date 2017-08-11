/*
 *
 * EditQuoteHeader
 *
 */
// import React, { PropTypes } from 'react';
import React from 'react';
import screenfull from 'screenfull';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { Button, Glyphicon, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';

export class EditQuoteHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  handleFullScreen() {
    screenfull.toggle(document.getElementById('app'));
  }
  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <Helmet
            title="TableHeader"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <EditQuoteHeaderCard currency={this.props.data.currency} name={this.props.data.name} total={this.props.data.netAmount} />
        </Col>
        <Col xs={12} md={9} style={{ textAlign: 'right' }}>
          {this.props.grouped ?
            ''
            :
            <Button className="margin" onClick={() => { browserHistory.push('/ProductSelection'); }}>Add Products</Button>
          }
          {(!this.props.grouped && this.props.data.groups.length === 0) ?
            <Button className="margin" onClick={this.props.group}>Add Group</Button>
            :
            <ButtonGroup className="margin">
              <Button onClick={this.props.ungroup}>Ungroup</Button>
              <Button onClick={this.props.group}>Add Group</Button>
            </ButtonGroup>

          }
          <ButtonGroup className="margin">
            <Button onClick={this.props.deleteLine} bsStyle="danger">Delete Lines</Button>
            <Button >Cancel</Button>
          </ButtonGroup>
          <Button className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button>
          <ButtonGroup className="margin">
            <Button onClick={this.props.calculateTotal}>Calculate</Button>
            <Button bsStyle="primary" onClick={this.props.quickSave}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

EditQuoteHeader.propTypes = {
  data: React.PropTypes.any,
  grouped: React.PropTypes.any,
  calculateTotal: React.PropTypes.func,
  deleteLine: React.PropTypes.func,
  quickSave: React.PropTypes.func,
  group: React.PropTypes.func,
  ungroup: React.PropTypes.func,
};


export default (EditQuoteHeader);
