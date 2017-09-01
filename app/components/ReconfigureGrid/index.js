/**
*
* ReconfigureGrid
*
*/
import ReactTable from 'react-table';
import React from 'react';
import _ from 'lodash';
import 'react-table/react-table.css';
import { RIEInput } from 'riek';
import { Button, Glyphicon, FormControl } from 'react-bootstrap/lib';
import Sidebar from 'components/Sidebar';
import messages from './messages';

class ReconfigureGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        selectedLine: {},
      },
      isVisible: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
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

  dataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const value = data[key];
    const productObj = {
      id: field[0],
      field: field[1],
      value: parseFloat(value),
      categoryId: this.props.categoryId,
      featureId: this.props.feature.id,
    };
    this.props.updateField(productObj);
  }

  validate(text) {
    const decimal = /^([0-9]+(\.[0-9]+)?|Infinity)$/;
    return (decimal.test(text) && (parseFloat(text) > 0));
  }

  deleteProduct(product) {
    const productObj = {
      id: product.id,
      featureId: this.props.feature.id,
      categoryId: this.props.categoryId,
    };
    this.props.deleteProduct(productObj);
  }

  toggleCheckboxChange(product) {
    const productObj = {
      id: product.id,
      featureId: this.props.feature.id,
      categoryId: this.props.categoryId,
    };
    this.props.toggleCheckboxChange(productObj);
  }

  renderEditable(cellInfo) {
    if (this.props.feature.DynamicAddEnabled || cellInfo.original.isSelected) {
      return (
        <div>
          <RIEInput
            className={cellInfo.column.id === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            classEditing="table-edit-input"
            value={cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}
            propName={`${cellInfo.original.id}*(&)*${cellInfo.column.id}`}
            staticElement="div"
            change={this.dataChanged}
            validate={this.validate}
            title={cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}
            id={cellInfo.original.id}
          />
          <div className="edit-icon"><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        </div>);
    }
    return (<span>{cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>);
  }


  renderActionItems(cellInfo) {
    let input;
    if (this.props.feature.DynamicAddEnabled) {
      if (cellInfo.original.isRequired) {
        input = (<a title={this.context.intl.formatMessage({ ...messages.deleteLine })} className="disabled-link"><Glyphicon glyph="trash" /></a>);
      } else {
        input = (<a title={this.context.intl.formatMessage({ ...messages.deleteLine })} onClick={this.deleteProduct.bind(this, cellInfo.original)} ><Glyphicon glyph="trash" style={{ color: '#C9302C' }} /></a>);
      }
      return input;
    }
    input = (<input type="checkbox" className="check" defaultChecked={cellInfo.original.isSelected} onChange={this.toggleCheckboxChange.bind(this, cellInfo.original)} value={cellInfo.original.id} />);
    return input;
  }

  render() {
    const products = _.filter(this.props.products, { isDeleted: false });
    const columns = [{
      columns: [{
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        Cell: this.renderActionItems,
      },
        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.quantity })}>{this.context.intl.formatMessage({ ...messages.quantity })}</span>,
          accessor: 'quantity.value',
          id: 'quantity',
          className: 'table-edit-row',
          style: { textAlign: 'right' },
          headerStyle: { textAlign: 'right' },
          Cell: this.renderEditable,
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
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.productDescription })}>{this.context.intl.formatMessage({ ...messages.productDescription })}</span>,
          // accessor: '',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: () => <span className="upper-case" title={this.context.intl.formatMessage({ ...messages.unitPrice })}>{this.context.intl.formatMessage({ ...messages.unitPrice })}</span>,
          accessor: 'listPrice.value',
          id: 'listPrice',
          style: { textAlign: 'right' },
          headerStyle: { textAlign: 'right' },
        },
      ],
    }];

    return (
      <div>
        <div className="table-wrap" id="configureGridId">
          <ReactTable
            className="-striped -highlight"
            data={products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length}
            style={{ width: '100%' }}
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

ReconfigureGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

ReconfigureGrid.propTypes = {
  products: React.PropTypes.any,
  showFilter: React.PropTypes.func,
  toggleCheckboxChange: React.PropTypes.func,
  toggleFilter: React.PropTypes.func,
  feature: React.PropTypes.any,
  categoryId: React.PropTypes.any,
  deleteProduct: React.PropTypes.func,
  updateField: React.PropTypes.func,
};

export default ReconfigureGrid;
