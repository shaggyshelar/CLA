import ReactTable from '../ReactTable';
import React from 'react';

import { Button, Glyphicon, FormControl } from 'react-bootstrap/lib';
import Sidebar from 'components/Sidebar';
import messages from './messages';

class AddConfigureProductGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    }
    return (<div>
      <Glyphicon glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
      <div
        style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning
      >{cellInfo.value}</div>
    </div>);
  }

  renderActionItems(cellInfo) {
    let input;
    let title;
    if (cellInfo.original.isDependent && cellInfo.original.isExclusion) {
      title = `Required: ${cellInfo.original.dependentBy} / Exclusion: ${cellInfo.original.dependentBy}`;
    } else if (cellInfo.original.isExclusion) {
      title = `Exclusion: ${cellInfo.original.dependentBy}`;
    } else if (cellInfo.original.isDependent) {
      title = `Required: ${cellInfo.original.dependentBy}`;
    }

    if (cellInfo.original.isDisable) {
      input = (<input type="checkbox" className="check" title={title} checked={cellInfo.original.isSelected} disabled value={cellInfo.original.id} />);
    } else {
      input = (<input type="checkbox" className="check" title={title} checked={cellInfo.original.isSelected} onChange={this.props.toggleCheckboxChange} value={cellInfo.original.id} />);
    }
    return input;
  }
  render() {
    const columns = [
      {
         // Header: <input type="checkbox" className="checkAll" onChange={this.props.toggleCheckAll} />,
        accessor: 'id',
        id: 'id',
        sortable: false,
        width: 50,
        style: { textAlign: 'center' },
        Cell: this.renderActionItems,
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
    ];
    return (
      <div>
        <div className="table-wrap" id="configureGridId">
          <ReactTable
            className="-striped -highlight"
            data={this.props.products}
            columns={columns}
            defaultPageSize={this.props.products.length}
            pageSize={this.props.products.length}
            // style={{ position: 'absolute', width: '100%' }}
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

AddConfigureProductGrid.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

AddConfigureProductGrid.propTypes = {
  products: React.PropTypes.any,
  // toggleCheckAll: React.PropTypes.func,
  showFilter: React.PropTypes.func,
  toggleCheckboxChange: React.PropTypes.func,
  toggleFilter: React.PropTypes.func,
};

export default AddConfigureProductGrid;
