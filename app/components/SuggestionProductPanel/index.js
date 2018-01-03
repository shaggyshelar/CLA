import React from 'react';
import SuggestionProductGrid from 'components/SuggestionProductGrid';
// import styled from 'styled-components';


class SuggestionProductPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const crossSellList = [];
    const accessoryList = [];
    const upSellList = [];
    const substituteList = [];
    let name = '';
    const suggestionsData = this.props.suggestionsData.toJS();
    if (suggestionsData && suggestionsData.productRelatedData) {
      name = suggestionsData.productRelatedData.name;
      suggestionsData.productRelatedData.relatedProducts.forEach((item) => {
        if (item.suggestionType === 'CrossSell') {
          crossSellList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'Accessory') {
          accessoryList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'UpSell') {
          upSellList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'Substitute') {
          substituteList.push(item.relatedProduct);
        }
      }, this);
    }
    return (
      <div>
        <div className="qoute-container reconfigureContainer">
          <div>
            <span className="categoryLabel">{name}</span>
          </div>
          <div className="panel-group" id="suggestionAccordion">
            <div className="panel suggestionPanel">
              <div className="panel-heading">
                <h4 className="panel-title suggestionProductLabel">
                  <a data-toggle="collapse" data-parent="#suggestionAccordion" href="#croosShellAccordion">
                    CrossSell
                  </a>
                </h4>
              </div>
              <div id="croosShellAccordion" className="panel-collapse collapse in">
                <div className="panel-body suggestionPanelbody">
                  <SuggestionProductGrid
                    suggestionsData={crossSellList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </div>
              </div>
            </div>

            <div className="panel suggestionPanel">
              <div className="panel-heading">
                <h4 className="panel-title suggestionProductLabel">
                  <a data-toggle="collapse" data-parent="#suggestionAccordion" href="#accessoryAccordion">
                    Accessory
                  </a>
                </h4>
              </div>
              <div id="accessoryAccordion" className="panel-collapse collapse">
                <div className="panel-body suggestionPanelbody">
                  <SuggestionProductGrid
                    suggestionsData={accessoryList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </div>
              </div>
            </div>

            <div className="panel suggestionPanel">
              <div className="panel-heading">
                <h4 className="panel-title suggestionProductLabel">
                  <a data-toggle="collapse" data-parent="#suggestionAccordion" href="#upshellAccordion">
                    UpSell
                  </a>
                </h4>
              </div>
              <div id="upshellAccordion" className="panel-collapse collapse">
                <div className="panel-body suggestionPanelbody">
                  <SuggestionProductGrid
                    suggestionsData={upSellList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </div>

              </div>

            </div>

            <div className="panel suggestionPanel">
              <div className="panel-heading">
                <h4 className="panel-title suggestionProductLabel">
                  <a data-toggle="collapse" data-parent="#suggestionAccordion" href="#substituteAccordion">
                    Substitute
                  </a>
                </h4>
              </div>
              <div id="substituteAccordion" className="panel-collapse collapse">
                <div className="panel-body suggestionPanelbody">
                  <SuggestionProductGrid
                    suggestionsData={substituteList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

SuggestionProductPanel.propTypes = {
  suggestionsData: React.PropTypes.any,
  toggleCheckboxChange: React.PropTypes.any,
  updateField: React.PropTypes.any,
};

export default SuggestionProductPanel;
