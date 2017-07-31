/*
 *
 * FavouriteLookup
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { browserHistory } from 'react-router';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from 'exampleData';
import { Glyphicon, Row, Col, Button, ButtonGroup, Modal, FormControl } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
import { createStructuredSelector } from 'reselect';

import makeSelectFavouriteLookup from './selectors';
export class FavouriteLookup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    const tableOptions = {
      loading: false,
      showPagination: false,
      showPageSizeOptions: false,
      showPageJump: false,
      collapseOnSortingChange: false,
      collapseOnPageChange: true,
      collapseOnDataChange: true,
      filterable: false,
      sortable: true,
      resizable: true,
      pivot: true,
      expander: true,
      freezeWhenExpanded: true,

    };
    const data =
      [
        {
          'FAVOURITE NAME': 'Tillman',
          'OWNER NAME': 'Bradley',
          DESCRIPTION: '$ 332.9494',
        },
        {
          'FAVOURITE NAME': 'Hernandez',
          'OWNER NAME': 'Holman',
          DESCRIPTION: '$ 700.7878',
        },
        {
          'FAVOURITE NAME': 'Burch',
          'OWNER NAME': 'Collins',
          DESCRIPTION: '$ 964.9937',
        },
        {
          'FAVOURITE NAME': 'Coleman',
          'OWNER NAME': 'Hunter',
          DESCRIPTION: '$ 833.9739',
        },
      ];
    const columns = [{
      columns: [{
        Header: <input type="checkbox" />,
        accessor: 'sd',
        style: { textAlign: 'center' },
        Cell: <input type="checkbox" />,
      }, {
        Header: 'FAVOURITE NAME',

        id: 'FAVOURITE NAME',
        accessor: (d) => d['FAVOURITE NAME'],
      },

      {
        Header: 'DESCRIPTION',
        accessor: 'DESCRIPTION',

      },
      {
        Header: 'OWNER NAME',
        accessor: 'OWNER NAME',
      },
      ],
    }];
    return (
      <div>
        <div >
          <Row className="show-grid">
            <Col xs={12} md={3}>
              <div className="card  margin" >
                <div className="card-icon"><Glyphicon className="cartIcon" glyph="star" /></div>
                <div className="card-detail">
                  <div>
                    <div className="cartFont">Q-00116</div>
                  </div>
                  <div>
                    <div className="cartFont" ><h4 style={{ marginTop: '0px' }}>Favorite Lookup</h4></div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={9} style={{ textAlign: 'right' }}>
              <ButtonGroup className="margin">
                <Button><Glyphicon glyph="search" /></Button>
                <Button onClick={this.handleToggle}>Share</Button>
                <Button>Delete</Button>
              </ButtonGroup>
              <ButtonGroup className="margin">
                <Button>Select</Button>
                <Button>Select and Add More</Button>
                <Button onClick={() => { browserHistory.push('/EditQuote'); }}>Cancel</Button>
              </ButtonGroup>

            </Col>

          </Row>
        </div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={data}
            columns={columns}
            defaultPageSize={data.length}
            {...tableOptions}

          />
        </div>
        <Modal
        container ={this}
          show={this.state.isModalOpen} onHide={this.handleToggle}
          style={{ display: 'inline-flex' }}
          bsClass="small-modal modal"
        >
          <Modal.Dialog >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="star" />Share Favourites </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Typeahead
                labelKey="name"
                bsSize="small"
                options={options}
                placeholder="Enter a name or group"
                clearButton={true}
                maxResults={5}

              />
              <FormControl componentClass="select" multiple>
                <option value="select">User1</option>
                <option value="other">USer2</option>
              </FormControl>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleToggle} >Cancel</Button>
              <Button bsStyle="primary" >Share</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>

      </div>
    );
  }
}


FavouriteLookup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  FavouriteLookup: makeSelectFavouriteLookup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteLookup);
