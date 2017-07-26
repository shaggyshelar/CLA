import ReactTable from 'react-table';
import React, { PropTypes, Component } from 'react';
import { Modal,Button, Checkbox, Icon, Table } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
class EditQuoteGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.renderEditable = this.renderEditable.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    
      
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
        freezeWhenExpanded: true

      },
      data: this.props.data,
      isModalOpen: false
    }

    this.setTableOption = this.setTableOption.bind(this)
  }
  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  renderEditable(cellInfo) {
    return (<div style={{ backgroundColor: '#fafafa' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
      const data = [...this.props.data]
      data[cellInfo.index][cellInfo.column.id] = e.target.textContent
      this.setState({ data: data })
    }}>{this.props.data[cellInfo.index][cellInfo.column.id]}</div>)
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
        Header: <input type="checkbox" />,
        accessor: 'sd',
        style: { textAlign: 'center' },
        Cell: <input type="checkbox" />,
      },
      {
        Header: 'ID',
        accessor: '_id',
        Cell: ({ value }) => <a onClick={this.handleToggle}style={{ color: 'darkred' }}>{value}</a>
      }, {
        Header: 'PRODUCT CODE',

        id: 'PRODUCT CODE',
        accessor: d => d['PRODUCT CODE'],
        Cell: this.renderEditable

      },

      {
        Header: 'PRODUCT NAME',
        accessor: 'PRODUCT NAME',
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
      }


      ]
    }]
    return (
      <div>
        <div className='table-wrap'>
          <ReactTable
            className='-striped -highlight'
            data={this.props.data}
            columns={columns}
            defaultPageSize={5}
            {...this.state.tableOptions}
            SubComponent={(row) => {
              return (
                <div style={{ "padding-left": '35px' }}>
                  <ReactTable
                    data={this.props.data}
                    columns={columns}
                    defaultPageSize={3}
                    showPagination={false}
                  />
                </div>
              )
            }}
          />
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleToggle} style={{display:'inline-flex'}}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title style={{textAlign:'center'}}>Discount Schedule Editor</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              One fine body...
      </Modal.Body>

            <Modal.Footer>
              <Button>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  }
}

EditQuoteGrid.propTypes = {
  data: PropTypes.any,
};

export default EditQuoteGrid;
