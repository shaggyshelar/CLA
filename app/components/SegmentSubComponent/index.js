/**
*
* SegmentSubComponent
*
*/

import React from 'react';
import ReactTable from 'react-table';
import InlineEdit from 'react-edit-inline';
import { Glyphicon } from 'react-bootstrap/lib';
class SegmentSubComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    console.log(cellInfo)
    if (cellInfo.original.editable === false) {
      return (<span> {this.props.currency} {cellInfo.value}</span>);
    } else {
      return (<div>
        <InlineEdit
           className="table-edit"
           activeClassName="table-edit-input"
           text={cellInfo.value}
           paramName="message"
           change={this.dataChanged}
        />
        <Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
        {/* <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div> */}
      </div>);
    }
  }
  renderColumns() {
    const data = Object.assign({}, this.props.data);
    const columns = [
      {
        accessor: 'code',
        style: { textAlign: 'left' },
        width: 35,
      },
      {
        accessor: 'qwe',
        style: { textAlign: 'left', maxWidth: '35px' },
        width: 150,
      },
      {
        accessor: 'qweeqwe',
        style: { textAlign: 'left', maxWidth: '35px' },
        width: 50,
      },
      {
        accessor: 'name',
        style: { textAlign: 'left' },
        width: 50,
      },
      {
        accessor: 'name',
        style: { textAlign: 'left' },
      },
      {
        accessor: 'prop',
        sortable: false,
        style: { textAlign: 'left' },
      },
    ];
    data.original.segmentData.columns.map((i) => (
      columns.push({
        accessor: i.name,
        sortable: false,
        style: { textAlign: 'right' },
        Cell: this.renderEditable,
      })
    ));
    columns.push({
      accessor: 'demo',
      sortable: false,
    });
    const dataSet = [
      {
        prop: 'QUANTITY',
      },
      {
        prop: 'LIST UNIT PRICE',
      },
      {
        prop: 'UPLIFT',
      },
      {
        prop: 'ADDITIONAL DISC.',
      },
      {
        prop: 'NET UNIT PRICE',
      },
      {
        prop: 'NET TOTAL',
      },
    ];
    for (let i = 0; i < dataSet.length; i += 1) {
      console.log(data.original)
      switch (dataSet[i].prop) {
        case 'QUANTITY':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.quantity;
            dataSet[i].editable = data.original.quantity.isEditable;
            return this;
          });
          break;
        case 'LIST UNIT PRICE':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.listPrice;
            dataSet[i].editable = data.original.listPrice.isEditable;
            return this;
          });
          break;
        case 'UPLIFT':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.uplift;
            dataSet[i].editable = false;
            return this;
          });
          break;
        case 'ADDITIONAL DISC.':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.additionalDiscount;
            dataSet[i].editable = data.original.listPrice.isEditable;
            return this;
          });
          break;
        case 'NET UNIT PRICE':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.netunitPrice;
            dataSet[i].editable = false;
            return this;
          });
          break;
        case 'NET TOTAL':
          data.original.segmentData.columns.map((j) => {
            dataSet[i][j.name] = j.netTotal;
            dataSet[i].editable = false;
            return this;
          });
          break;
        default:
          return dataSet;
      }
    }


    return { columns, dataSet };
  }
  render() {
    const data = this.renderColumns();
    console.log(data.dataSet)
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
      resizable: false,
      pivot: true,
      expander: true,
      freezeWhenExpanded: true,
      selectedLine: {},
    };
    this.renderColumns();
    return (
      <div className="header">
        <ReactTable
          className="sub-component"
          data={data.dataSet}
          columns={data.columns}
          defaultPageSize={data.length}
          pageSize={data.length}
          style={{ width: '100%' }}
          {...tableOptions}
        />
      </div>
    );
  }
}

SegmentSubComponent.propTypes = {

};

export default SegmentSubComponent;
