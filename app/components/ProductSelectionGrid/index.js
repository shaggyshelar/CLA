import ReactTable from 'react-table';
import React, { Component } from 'react';
import 'react-table/react-table.css';
import Sidebar from 'components/Sidebar';
import { Button, Glyphicon, Row, Col, ButtonGroup, FormControl } from 'react-bootstrap/lib';
class ProductSelectionGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        headerStyle: { textAlign: 'center' },
        Cell: (props) => <input type="checkbox" className="check" onChange={this.props.toggleCheckboxChange} value={props.value} />,
      }, 
        {
          Header: () => <span title="PRODUCT CODE">PRODUCT CODE</span>,
          accessor: 'code',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },

        {
          Header: () => <span title="PRODUCT NAME">PRODUCT NAME</span>,
          accessor: 'name',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: () => <span title="PRODUCT FAMILY">PRODUCT FAMILY</span>,
          accessor: 'type',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: () => <span title="PRODUCT DESCRIPTION">PRODUCT DESCRIPTION</span>,
          style: { textAlign: 'left' },
          accessor: 'description',
          headerStyle: { textAlign: 'left', title: 'PRODUCT DESCRIPTION' },
        },
        {
          Header: () => <span title="LIST PRICE">LIST PRICE</span>,
          accessor: 'netUnitPrice',
          style: { textAlign: 'right' },
          headerStyle: { textAlign: 'right' },
          Cell: (props) => <span>₹ {props.value.toFixed(2)}</span>,
        },


      ],
    }];
    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length}
            style={{ width: '100%', position: 'fixed' }}
            {...this.state.tableOptions}

          />
          <div className="filter">
          <Sidebar container={this} title="Product Filter" side="left" isVisible={this.props.showFilter} onHide={this.props.toggleFilter}>
            <h4>FG</h4>
            <FormControl type="text" placeholder="" style={{ width: '80%' }} />
            <br /> <br /> <br />
            <Button bsStyle="primary">Apply</Button>
            <a className="clear">Clear Fields</a>
          </Sidebar>
          </div>
        </div>
      </div>
    );
  }
}

ProductSelectionGrid.propTypes = {
  data: React.PropTypes.any,
  products: React.PropTypes.any,
};

export default ProductSelectionGrid;
