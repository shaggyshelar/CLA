/**
*
* EditQuoteHeaderCard
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Comment, Icon } from 'semantic-ui-react';

class EditQuoteHeaderCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src="/assets/images/avatar/small/joe.jpg" />
          <Comment.Content>
            <Comment.Author>Q-000087</Comment.Author>
            <Comment.Text>
              Edit Quote
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              <Comment.Action>Save</Comment.Action>
              <Comment.Action>Hide</Comment.Action>
              <Comment.Action>
                <Icon name="expand" />
                Full-screen
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    );
  }
}

EditQuoteHeaderCard.propTypes = {

};

export default EditQuoteHeaderCard;
