import ReactTable from 'react-table';
import React, { Component } from 'react';
import _ from 'lodash';
import 'react-table/react-table.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Table extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.renderEditable = this.renderEditable.bind(this)

    const data =
      [
        {
          "_id": "596db79f58d3f94623033cd0",
          "PRODUCT CODE": "Tillman",
          "PRODUCT NAME": "Bradley",
          "LIST UNIT PRICE": "$ 332.9494",
          "balance": "$2,234.27",
          "ADDITIONAL DISC.": "",
          "NET UNIT PRICE": "$ 625.0061",
          "NET TOTAL": "$ 25.9874",
          "QUANTITY": 14.7428
        },
        {
          "_id": "596db79f34ec0f84605ca6a1",
          "PRODUCT CODE": "Hernandez",
          "PRODUCT NAME": "Holman",
          "LIST UNIT PRICE": "$ 700.7878",
          "balance": "$2,407.24",
          "ADDITIONAL DISC.": "",
          "NET UNIT PRICE": "$ 506.595",
          "NET TOTAL": "$ 502.2979",
          "QUANTITY": 50.8204
        },
        {
          "_id": "596db79f10b858fe71591077",
          "PRODUCT CODE": "Burch",
          "PRODUCT NAME": "Collins",
          "LIST UNIT PRICE": "$ 964.9937",
          "balance": "$2,023.00",
          "ADDITIONAL DISC.": "",
          "NET UNIT PRICE": "$ 269.6924",
          "NET TOTAL": "$ 305.6421",
          "QUANTITY": 47.5805
        },
        {
          "_id": "596db79f90613ebdf6dc2b7c",
          "PRODUCT CODE": "Coleman",
          "PRODUCT NAME": "Hunter",
          "LIST UNIT PRICE": "$ 833.9739",
          "balance": "$2,644.06",
          "ADDITIONAL DISC.": "",
          "NET UNIT PRICE": "$ 942.7997",
          "NET TOTAL": "$ 72.1729",
          "QUANTITY": 82.5088
        },
        {
          "_id": "596db79f94800616a15f5ed5",
          "PRODUCT CODE": "Lorene",
          "PRODUCT NAME": "Brennan",
          "LIST UNIT PRICE": "$ 804.2955",
          "balance": "$1,677.35",
          "ADDITIONAL DISC.": "",
          "NET UNIT PRICE": "$ 121.7662",
          "NET TOTAL": "$ 487.7556",
          "QUANTITY": 77.3144
        }
      ]
    this.state = {
      tableOptions: {
        loading: false,
        showPagination: true,
        showPageSizeOptions: true,
        showPageJump: true,
        collapseOnSortingChange: true,
        collapseOnPageChange: true,
        collapseOnDataChange: true,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: true,
        resizable: true
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
        Header: 'ID',
        accessor: '_id',
        Cell: this.renderEditable
      },
      {
        Header: 'PRODUCT NAME',
        accessor: 'PRODUCT NAME',
        Cell: this.renderEditable
      }, {
        Header: 'PRODUCT CODE',

        id: 'PRODUCT CODE',
        accessor: d => d['PRODUCT CODE'],
        Cell: this.renderEditable

      },
      {
        Header: 'LIST UNIT PRICE',
        accessor: 'LIST UNIT PRICE'
      },
      {
        Header: 'ADDITIONAL DISC.',
        accessor: 'ADDITIONAL DISC.'
      },
      {
        Header: 'QUANTITY',
        accessor: 'QUANTITY',
        Footer: (
          <span><strong>Subtotal: </strong>
          </span>
        )
      },
      {
        Header: 'NET UNIT PRICE',
        accessor: 'NET UNIT PRICE',
        Footer: (
          <span><strong>$ 123 </strong>
          </span>
        )
      },
      {
        Header: 'NET TOTAL',
        accessor: 'NET TOTAL',
        Footer: (
          <span><strong>Quote Total: </strong>
          </span>
        )
      },

      {
        Header: 'Actions',
        Footer: (
          <span><strong>$ 12345</strong>
          </span>
        )
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
            defaultPageSize={10}
            {...this.state.tableOptions}
            SubComponent={(row) => {
              return (
                <div style={{ "padding-left": '35px' }}>
                  <ReactTable
                    data={this.state.data}
                    columns={columns}
                    defaultPageSize={3}
                    showPagination={false}
                  />
                </div>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

Table.propTypes = {

};

export default Table;
