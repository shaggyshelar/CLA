/**
*
* ReconfigureGrid
*
*/
import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css';
import { Button, Glyphicon, FormControl } from 'react-bootstrap/lib';
import Sidebar from 'components/Sidebar';

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

      },
      isVisible: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
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
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span>{cellInfo.value}</span>);
    } else {
      return (<div>
        <Glyphicon glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
        <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div>
      </div>);
    }
  }

  renderInput(props) {
    let input;
    if (this.props.feature.DynamicAddEnabled) {
      input = (<input type="checkbox" className="check" onChange={this.props.toggleCheckboxChange} value={props.value} />);
    } else {
      input = (<a className="disabledIcon"><Glyphicon glyph="trash" onChange={this.props.toggleCheckboxChange} /></a>);
    }
    return input;
  }

  deleteProduct(product) {
    const productObj = {
      id: product.id,
      featureId: product.featureId,
      categoryId: product.categoryId,
    };
    this.props.deleteProduct(productObj);
  }
  renderActionItems(cellInfo) {
    // const discount = cellInfo.original.canShowDiscountScheduler ? <a title="View Discount Schedule" onClick={this.handleToggle.bind(this, cellInfo.index)} ><Glyphicon glyph="calendar" /></a> : '';
    // const reconfigure = cellInfo.original.canReconfigure ? <a title="Reconfigure Lines" className={cellInfo.original.isDisableReconfiguration ? 'disabled-link' : 'link'} onClick={() => { browserHistory.push('/reconfigureproducts'); }}><Glyphicon glyph="wrench" /></a> : '';
    // const bundle = cellInfo.original.isBundled ? <a title={`Required by ${cellInfo.original.name}`}><Glyphicon glyph="info-sign" /></a> : '';
    // const clone = cellInfo.original.canClone ? <a title="Clone Line" onClick={this.cloneLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="duplicate" /></a> : '';
    // const segment = cellInfo.original.canSegment ? <a onClick={this.props.segment} title="Segment / Desegment"><Glyphicon glyph="transfer" /></a> : '';
    // return (
    //   <div className="actionItems" >
    //     {/* <a><Glyphicon glyph="star-empty" /></a> */}
    //     {bundle}
    //     {discount}
    //     {reconfigure}
    //     {cellInfo.original.isProductOption ? <span></span> : clone}
    //     {cellInfo.original.isProductOption ? <span></span> : <a title="Delete Line" onClick={this.deleteLine.bind(this, cellInfo.original.id)} ><Glyphicon glyph="trash" /></a>}
    //     {segment}
    //   </div>
    // );
    let input;
    if (this.props.feature.DynamicAddEnabled) {
      input = (<a className="disabledIcon"><Glyphicon glyph="trash" onClick={this.deleteProduct.bind(this, cellInfo.original)} /></a>);
    } else {
      input = (<input type="checkbox" className="check" onChange={this.props.toggleCheckboxChange} value={cellInfo.original.id} />);
    }
    return input;
  }

  render() {
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
          Header: 'QUANTITY',
          accessor: 'quantity.value',
          id: 'quantity',
          Cell: this.renderEditable,
        }, {
          Header: 'PRODUCT CODE',
          accessor: 'code',
        },
        {
          Header: 'PRODUCT NAME',
          accessor: 'name',
        },
        {
          Header: 'PRODUCT DESCRIPTION',
          // accessor: 'type',
        },
        {
          Header: 'UNIT PRICE',
          accessor: 'listPrice.value',
          style: { textAlign: 'right' },
        },


      ],
    }];
    return (
      <div>
        <div className="table-wrap" id="configureGridId">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
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

ReconfigureGrid.propTypes = {
  products: React.PropTypes.any,
  showFilter: React.PropTypes.func,
  toggleCheckboxChange: React.PropTypes.func,
  toggleFilter: React.PropTypes.func,
  feature: React.PropTypes.any,
  deleteProduct: React.PropTypes.func,
};

export default ReconfigureGrid;
