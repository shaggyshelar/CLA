import ReactTable from 'react-table';
import React, { Component } from 'react';
import 'react-table/react-table.css';

class ProductSelectionGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.renderEditable = this.renderEditable.bind(this)

    const data =
      [
        {
          "_id": "596db79f58d3f94623033cd0",
          "PRODUCT CODE": "Tillman",
          "PRODUCT NAME": "Bradley",
          "LIST PRICE": "$ 332.9494",
          "PRODUCT FAMILY": "",
          "PRODUCT DESCRIPTION": "",
          "NET UNIT PRICE": "$ 625.0061",
          "NET TOTAL": "$ 25.9874",
          "QUANTITY": 14.7428
        },
        {
          "_id": "596db79f34ec0f84605ca6a1",
          "PRODUCT CODE": "Hernandez",
          "PRODUCT NAME": "Holman",
          "LIST PRICE": "$ 700.7878",
          "PRODUCT FAMILY": "",
          "PRODUCT DESCRIPTION": "",
          "NET UNIT PRICE": "$ 506.595",
          "NET TOTAL": "$ 502.2979",
          "QUANTITY": 50.8204
        },
        {
          "_id": "596db79f10b858fe71591077",
          "PRODUCT CODE": "Burch",
          "PRODUCT NAME": "Collins",
          "LIST PRICE": "$ 964.9937",
          "PRODUCT FAMILY": "",
          "PRODUCT DESCRIPTION": "",
          "NET UNIT PRICE": "$ 269.6924",
          "NET TOTAL": "$ 305.6421",
          "QUANTITY": 47.5805
        },
        {
          "_id": "596db79f90613ebdf6dc2b7c",
          "PRODUCT CODE": "Coleman",
          "PRODUCT NAME": "Hunter",
          "LIST PRICE": "$ 833.9739",
          "PRODUCT FAMILY": "",
          "PRODUCT DESCRIPTION": "",
          "NET UNIT PRICE": "$ 942.7997",
          "NET TOTAL": "$ 72.1729",
          "QUANTITY": 82.5088
        },
        {
          "_id": "596db79f94800616a15f5ed5",
          "PRODUCT CODE": "Lorene",
          "PRODUCT NAME": "Brennan",
          "LIST PRICE": "$ 804.2955",
          "PRODUCT FAMILY": "",
          "PRODUCT DESCRIPTION": "",
          "NET UNIT PRICE": "$ 121.7662",
          "NET TOTAL": "$ 487.7556",
          "QUANTITY": 77.3144
        }
      ]
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
        freezeWhenExpanded:true
      },
      data: data
    }

    this.setTableOption = this.setTableOption.bind(this)
  }
  renderEditable(cellInfo) {
    return (<div style={{ backgroundColor: '#fafafa' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
      const data = [...this.state.data]
      data[cellInfo.index][cellInfo.column.id] = e.target.textContent
      this.setState({ data: data })
    }}>{this.state.data[cellInfo.index][cellInfo.column.id]}</div>)
  }
  setTableOption(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      tableOptions: {
        ...this.state.tableOptions,
        [name]: value
      }
    })
  }
  render() {
    const columns = [{
      columns: [{
        Header: <input type="checkbox"/>,
        accessor: 'sd',
        style:{textAlign: 'center'},
        Cell: <input type="checkbox"/>,
      }, {
        Header: 'PRODUCT CODE',

        id: 'PRODUCT CODE',
        accessor: d => d['PRODUCT CODE']
      },

      {
        Header: 'PRODUCT NAME',
        accessor: 'PRODUCT NAME'
        
      },
      {
        Header: 'PRODUCT FAMILY',
        accessor: 'PRODUCT FAMILY'
      },
      {
        Header: 'PRODUCT DESCRIPTION',
        accessor: 'PRODUCT DESCRIPTION'
      },
      {
        Header: 'LIST PRICE',
        accessor: 'LIST PRICE'
      },
      


      ]
    }]
    return (
      <div>
        <div className='table-wrap'>
          <ReactTable
            className='-striped -highlight'
            data={this.state.data}
            columns={columns}
            defaultPageSize={5}
            {...this.state.tableOptions}
            
          />
        </div>
      </div>
    );
  }
}

ProductSelectionGrid.propTypes = {

};

export default ProductSelectionGrid;
