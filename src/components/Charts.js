import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as actions from '../store/actions';
import * as queries from '../store/queries';
import * as subscriptions from '../store/subscriptions';

const now = Date.now(); // TODO: Execute on select | other method

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurementsSelector = state => {
  return state.charts.measurements;
};

export default () => {
  return (
    <Provider value={client}>
      <Charts />
    </Provider>
  );
};

const Charts = () => {
  const dispatch = useDispatch();
  const measurements = useSelector(measurementsSelector);

  const input = {
    metricName: 'tubingPressure',
    after: now - 30 * 60 * 1000, // min * sec * milli
    before: now,
  };

  const [result] = useQuery({
    query: queries.GET_MEASUREMENTS,
    variables: {
      input,
    },
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;
    const { getMeasurements } = data;

    dispatch({ type: actions.GET_MEASUREMENTS_DATA_RECEIVED, getMeasurements });
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <div>Chart Here</div>;
};
