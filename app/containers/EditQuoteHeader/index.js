/*
 *
 * EditQuoteHeader
 *
 */
// import React, { PropTypes } from 'react';
import React from 'react';
import screenfull from 'screenfull';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap/lib';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import { tempQuoteId } from '../App/constants';

import EditQuoteHeaderCard from '../../components/EditQuoteHeaderCard';

export class EditQuoteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.languageChange = this.languageChange.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleFullScreen() {
    screenfull.toggle(document.getElementById('app'));
  }
  cancel() {
    const location = Object.assign({}, browserHistory.getCurrentLocation());
    location.query = {};
    browserHistory.push(location);
    let quoteId = '';
    if (process.env.NODE_ENV === 'production') {
      if (window.parent.Xrm !== undefined) {
        quoteId = window.parent.Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
      }
    }
    if (process.env.NODE_ENV === 'development') {
      quoteId = tempQuoteId;
    }
    this.props.getAllData(quoteId);
  }
  addProducts() {
    let url = `/ProductSelection${this.props.location.search}`;
    if (!('PriceBookId' in this.props.location.query)) {
      if (Object.keys(this.props.location.query).length) {
        url += `&PriceBookId=${this.props.data.priceBookId}`;
      } else {
        url += `?PriceBookId=${this.props.data.priceBookId}`;
      }
      if (!('QuoteId' in this.props.location.query)) {
        url += `&QuoteId=${this.props.data.id}`;
      }
    }
    browserHistory.push(url);
  }
  languageChange(e) {
    this.props.languageChange(e.target.value);
  }
  render() {
    return (
      <Row className="show-grid">
        <Col xs={12} sm={12} md={4}>
          <Helmet
            title="CPQ - Edit Quote"
            meta={[
              { name: 'description', content: 'Description of TableHeader' },
            ]}
          />
          <EditQuoteHeaderCard dataChanged={this.props.dataChanged} currency={this.props.data.currency} name={this.props.data.name} total={this.props.data.netAmount} />
        </Col>
        <Col xs={12} sm={12} md={8} style={{ textAlign: 'right' }}>
          {this.props.grouped ?
            ''
            :
            <Button title={this.context.intl.formatMessage({ ...messages.addProducts })} className="margin" onClick={this.addProducts}><FormattedMessage {...messages.addProducts} /></Button>
          }
          {(!this.props.grouped && _.filter(this.props.data.groups, { isDeleted: false }).length === 0) ?
            <Button title={this.context.intl.formatMessage({ ...messages.addGroup })} className="margin" onClick={this.props.group}><FormattedMessage {...messages.addGroup} /></Button>
            :
            <ButtonGroup className="margin">
              <Button title={this.context.intl.formatMessage({ ...messages.ungroup })} onClick={this.props.ungroup}><FormattedMessage {...messages.ungroup} /></Button>
              <Button title={this.context.intl.formatMessage({ ...messages.addGroup })} onClick={this.props.group}><FormattedMessage {...messages.addGroup} /></Button>
            </ButtonGroup>

          }
          <ButtonGroup className="margin">
            {/* <Button disabled={this.props.disabledButton} title={this.context.intl.formatMessage({ ...messages.cloneLines })} onClick={this.props.cloneLine} ><FormattedMessage {...messages.cloneLines} /></Button> */}
            <Button disabled={this.props.disabledButton} title={this.context.intl.formatMessage({ ...messages.deleteLines })} onClick={this.props.deleteLine} bsStyle="danger"><FormattedMessage {...messages.deleteLines} /></Button>
            <Button onClick={this.cancel} title={this.context.intl.formatMessage({ ...messages.cancel })} ><FormattedMessage {...messages.cancel} /></Button>
          </ButtonGroup>
          {/* <Button title="Go to Full Screen" className="margin" bsStyle="primary" onClick={this.handleFullScreen}><Glyphicon glyph="fullscreen" /></Button> */}
          <ButtonGroup className="margin">
            <Button disabled={!this.props.dataChanged} bsStyle={this.props.dataChanged ? 'primary' : 'default'} title={this.context.intl.formatMessage({ ...messages.calculate })} onClick={this.props.calculateTotal}><FormattedMessage {...messages.calculate} /></Button>
            <Button title={this.context.intl.formatMessage({ ...messages.save })} onClick={this.props.quickSave}><FormattedMessage {...messages.save} /></Button>
          </ButtonGroup>
          {/* <select className="lang" onChange={this.languageChange} value={this.props.language}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select> */}
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
  cloneLine: React.PropTypes.func,
  languageChange: React.PropTypes.func,
  language: React.PropTypes.any,
  disabledButton: React.PropTypes.bool,
  dataChanged: React.PropTypes.any,
};
EditQuoteHeader.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};


export default injectIntl(EditQuoteHeader);
