/*
 *
 * PriceBook
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Modal, Button, FormControl } from 'react-bootstrap/lib';
import { makeSelectPriceBook, save } from './selectors';
import { saveAction } from './actions';
export class PriceBook extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.hideMe = this.hideMe.bind(this);
  }
  hideMe() {
    this.props.hideMe();
  }
  render() {
    return (
      <div>
        <Helmet
          title="PriceBook"
          meta={[
            { name: 'description', content: 'Description of PriceBook' },
          ]}
        />
        <div>
          <Modal
            show
            style={{ display: 'inline-flex' }}
          >
            <Modal.Dialog >
              <Modal.Header>
                <Modal.Title style={{ textAlign: 'center' }}>Choose Price Book</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <FormControl style={{ width: '98%' }} componentClass="select" placeholder="select">
                  <option value="select">Computer</option>
                  <option value="other">Meal</option>
                </FormControl>

              </Modal.Body>

              <Modal.Footer>
                <Button>Cancel</Button>
                <Button bsStyle="primary" onClick={this.hideMe}>Save</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      </div>
    );
  }
}

PriceBook.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PriceBook: makeSelectPriceBook(),
  ShowPriceBook: save(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    hideMe: (data = { data: 'aa' }) => {
      dispatch(saveAction(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceBook);
