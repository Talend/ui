import React from 'react';
import classNames from 'classnames';
import { api } from 'react-ui-abstraction';

import Icon from './Icon';

/**
 * This component show an action creator and dispatch it to redux
 * The action prop must be something like this:

```javascript
{
  "id":"streams",
  "name":"My streams",
  "creator":"myactions.send", // REQURIED, it must be registred
}
```

 */

export default class LinkAction extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event, this.props, this.context);
    }
  }
  render() {
    const linkCSS = classNames(
      'btn btn-link',
      this.props.className
    );
    let { action, icon } = this.props;
    let label;
    if (action) {
      if (typeof action === 'string') {
        action = api.action.getActionInfo(this.context, action);
      }
      label = action.name;
      if (icon) {
        icon = action.icon;
      }
    }
    return (
      <a className={linkCSS} onClick={this.onClick}>
        {icon ? <Icon name={icon} className="fa-fw" /> : null}
        {label}
      </a>
    );
  }
}
LinkAction.propTypes = {
  action: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  icon: React.PropTypes.bool,
  model: React.PropTypes.object,
  displayMode: React.PropTypes.string,
  onClick: React.PropTypes.func,

  active: React.PropTypes.bool,
  count: React.PropTypes.number,

  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};
LinkAction.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object,
  registry: React.PropTypes.object,
};
