/*
 *
 * PriceBook
 *
 */

import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Modal, Button, FormControl } from 'react-bootstrap/lib';
import { makeSelectPriceBook, save } from './selectors';
import { saveAction } from '../App/actions';
export class PriceBook extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Computer',
    };
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  save(value) {
    this.props.saveAction(this.state.selectValue);
    browserHistory.push('/EditQuote');
  }
  handleChange(e) {
    this.setState({ selectValue: e.target.value });
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
                <FormControl
                  style={{ width: '98%' }} defaultValue={'Computer'}
                  onChange={this.handleChange} componentClass="select" placeholder="select"
                >
                  <option value="Computer">Computer</option>
                  <option value="Meal">Meal</option>
                </FormControl>

              </Modal.Body>

              <Modal.Footer>
                <Button>Cancel</Button>
                <Button bsStyle="primary" onClick={this.save}>Save</Button>
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
    saveAction: (value) => {
      dispatch(saveAction(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceBook);
