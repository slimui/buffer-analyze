import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  geyser,
} from '@bufferapp/components/style/color';

import {
  ChartStateNoData as NoData,
  ChartStateLoading as Loading,
} from '@bufferapp/analyze-shared-components';

import Title from '../Title';
import Header from '../Header';
import Footer from '../Footer';
import Chart from '../Chart';

const ContextualCompare = ({
  className,
  data,
  loading,
  ...props
}) => (<div style={{ margin: '0 0 1.5rem' }}>
  {data.length > 1 && !loading && <Title dailyData={data} />}
  <div className={className}>
    {loading && <Loading active text="Engagement & Audience chart loading..." />}
    {data.length === 0 && !loading && <NoData />}
    {data.length > 1 && !loading && <div>
      <Header {...props} />
      <div id="js-dom-to-png-contextual">
        <Chart {...props} data={data} />
        <Footer {...props} />
      </div>
    </div>}
  </div>
</div>);

ContextualCompare.defaultProps = {
  loading: false,
};

ContextualCompare.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    metrics: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
    })),
  })).isRequired,
  loading: PropTypes.bool,
};

const ContextualCompareStyled = styled(ContextualCompare)`
  margin: 0 auto;
  padding: 1.25rem;
  border-radius: 2px;
  border: solid
    ${({ loading, data }) => (loading || data.length === 0 ? '0' : '1px')}
    ${geyser};
  min-height: 12rem;
  position: relative;
`;

export default ContextualCompareStyled;
