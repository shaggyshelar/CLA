import ReactTable from 'react-table';
import React, { Component } from 'react';
import 'react-table/react-table.css';
import Sidebar from 'components/Sidebar';
import { Button, Glyphicon, Row, Col, ButtonGroup, FormControl } from 'react-bootstrap/lib';
class ProductSelectionGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
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

      },
      isVisible: false,
    };

    this.setTableOption = this.setTableOption.bind(this);
  }
  setTableOption(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      tableOptions: {
        ...this.state.tableOptions,
        [name]: value,
      },
    });
  }
  render() {
    const columns = [{
      columns: [{
        Header: <input type="checkbox" className="checkAll" onChange={this.props.toggleCheckAll} />,
        accessor: '_id',
        id: '_id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        Cell: (props) => <input type="checkbox" className="check" onChange={this.props.toggleCheckboxChange} value={props.value} />,
      }, {
        Header: 'PRODUCT CODE',

        id: 'PRODUCT CODE',
        accessor: (d) => d['PRODUCT CODE'],
      },

        {
          Header: 'PRODUCT NAME',
          accessor: 'PRODUCT NAME',

        },
        {
          Header: 'PRODUCT FAMILY',
          accessor: 'PRODUCT FAMILY',
        },
        {
          Header: 'PRODUCT DESCRIPTION',
          accessor: 'PRODUCT DESCRIPTION',
        },
        {
          Header: 'LIST PRICE',
          accessor: 'LIST PRICE',
        },


      ],
    }];
    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={this.props.data}
            columns={columns}
            defaultPageSize={this.props.data.length}
            style={{ width: '100%', position: 'fixed' }}
            {...this.state.tableOptions}

          />
          <Sidebar container={this} title="Product Filter" side="left" isVisible={this.props.showFilter} onHide={this.props.toggleFilter}>
            <h4>FG</h4>
            <FormControl type="text" placeholder="" style={{ width: '80%' }} />
            <br /> <br /> <br />
            <Button bsStyle="primary">Apply</Button>
            <a className="clear">Clear Fields</a>
          </Sidebar>
        </div>
      </div>
    );
  }
}

ProductSelectionGrid.propTypes = {
  data: React.PropTypes.any,
};

export default ProductSelectionGrid;
