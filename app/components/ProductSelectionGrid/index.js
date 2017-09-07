import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css';
import Sidebar from 'components/Sidebar';
import { Button, FormControl } from 'react-bootstrap/lib';
import messages from './messages';
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
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productCode })}>{this.context.intl.formatMessage({ ...messages.productCode })}</span>,
          accessor: 'code',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },

        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productName })}>{this.context.intl.formatMessage({ ...messages.productName })}</span>,
          accessor: 'name',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productFamily })}>{this.context.intl.formatMessage({ ...messages.productFamily })}</span>,
          accessor: 'type',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productDescription })}>{this.context.intl.formatMessage({ ...messages.productDescription })}</span>,
          style: { textAlign: 'left' },
          accessor: 'description',
          headerStyle: { textAlign: 'left', title: 'PRODUCT DESCRIPTION' },
        },
        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.listPrice })}>{this.context.intl.formatMessage({ ...messages.listPrice })}</span>,
          accessor: 'netUnitPrice',
          style: { textAlign: 'right' },
          headerStyle: { textAlign: 'right' },
          Cell: (props) => <span>₹ {props.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
        },


      ],
    }];
    return (
      <div>
        <div className="table-wrap productTopPadding">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length}
            style={{ width: '100%' }}
            {...this.state.tableOptions}

          />
        </div>
      </div>
    );
  }
}
ProductSelectionGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
ProductSelectionGrid.propTypes = {
  products: React.PropTypes.any,
  showFilter: React.PropTypes.any,
  toggleFilter: React.PropTypes.any,
  toggleCheckAll: React.PropTypes.any,
  toggleCheckboxChange: React.PropTypes.any,
};

export default ProductSelectionGrid;
