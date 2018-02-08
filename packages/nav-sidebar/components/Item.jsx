import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Link,
} from '@bufferapp/components';

import {
  curiousBlueUltraLight,
} from '@bufferapp/components/style/color';

import {
  calculateStyles,
} from '@bufferapp/components/lib/utils';

const Item = ({ href, route, children, onClick, selectedProfile }) => {
  const active = href === '/' ? href === route : route.includes(href);
  const style = calculateStyles({
    default: {
      display: 'block',
      padding: '0.75rem 0.5rem',
      margin: '0 0.5rem',
      borderRadius: '4px',
    },
    active: {
      backgroundColor: curiousBlueUltraLight,
    },
  }, {
    active,
  });
  return (
    <Link
      href={href}
      unstyled
      onClick={(e) => {
        e.preventDefault();
        if (!active) {
          onClick(href, selectedProfile);
        }
      }}
    >
      <span style={style}>
        <Text color="shuttleGray" weight={active ? 'bold' : null}>{children}</Text>
      </span>
    </Link>
  );
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedProfile: PropTypes.shape({
    id: PropTypes.string,
  }),
};

Item.defaultProps = {
  active: false,
  selectedProfile: {},
};

export default Item;
