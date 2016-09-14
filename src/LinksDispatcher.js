import React from 'react';
import { api } from 'react-cmf';

import LinkDispatcher from './LinkDispatcher';

export default class LinksDispatcher extends React.Component {

  render() {
    const actions = api.action.getContentTypeActions(
      this.context,
      this.props.contentType,
      this.props.category
    );
    return (
      <div>
        {actions.map((action, i) => (
          <LinkDispatcher
            action={action}
            key={i}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

LinksDispatcher.propTypes = {
  contentType: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  icon: React.PropTypes.bool,
};

LinksDispatcher.contextTypes = {
  store: React.PropTypes.object,
};
