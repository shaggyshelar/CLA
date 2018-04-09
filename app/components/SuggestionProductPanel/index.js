import React from 'react';
import SuggestionProductGrid from 'components/SuggestionProductGrid';
// import styled from 'styled-components';
import { Panel } from 'react-bootstrap/lib';
import { Modal, Button, Glyphicon, Tab, Row, Col, Nav, NavItem, FormGroup, Radio, Checkbox, ControlLabel, FormControl, FieldGroup } from 'react-bootstrap/lib';

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
    const crossSellPanel = crossSellList.length === 0 ? 'panel-body suggestionNoRecordPanel' : 'panel-body suggestionPanelbody';
    const accessoryPanel = accessoryList.length === 0 ? 'panel-body suggestionNoRecordPanel' : 'panel-body suggestionPanelbody';
    const upSellPanel = upSellList.length === 0 ? 'panel-body suggestionNoRecordPanel' : 'panel-body suggestionPanelbody';
    const substitutePanel = substituteList.length === 0 ? 'panel-body suggestionNoRecordPanel' : 'panel-body suggestionPanelbody';
    return (
      <div>
        <div className="quote-container reconfigureContainer">
          <div>
            <span className="categoryLabel">{name}</span>
          </div>
          <div className="panel-group" id="suggestionAccordion">
            <Panel id="panelCrossSell" className="productAccordian">
              <Panel.Heading className="panel-heading">              
                <Panel.Title toggle>
                  CrossSell <Glyphicon glyph="chevron-down" />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <SuggestionProductGrid
                    suggestionsData={crossSellList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>

            <Panel id="panelAccessory" className="productAccordian">
              <Panel.Heading className="panel-heading">
                <Panel.Title toggle>
                Accessory <Glyphicon glyph="chevron-down" />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <SuggestionProductGrid
                    suggestionsData={accessoryList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>

            <Panel id="panelUpSell" className="productAccordian">
              <Panel.Heading className="panel-heading">
                <Panel.Title toggle>
                UpSell <Glyphicon glyph="chevron-down" />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <SuggestionProductGrid
                    suggestionsData={upSellList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>

            <Panel id="panelSubstitute" className="productAccordian">
              <Panel.Heading className="panel-heading">
                <Panel.Title toggle>
                Substitute <Glyphicon glyph="chevron-down" />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <SuggestionProductGrid
                    suggestionsData={substituteList}
                    toggleCheckboxChange={this.props.toggleCheckboxChange}
                    updateField={this.props.updateField}
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
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
