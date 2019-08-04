import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import {
  Chip,
  FormControl,
  Input,
  LinearProgress,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as actions from '../store/actions';
import * as queries from '../store/queries';

const client = createClient({
  url: queries.url,
});

const metricsSelector = state => {
  return state.charts.metrics;
};

const selectedMetricsSelector = state => {
  return state.charts.selectedMetrics;
};

const ChartsSelect = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(metricsSelector);
  const selectedMetrics = useSelector(selectedMetricsSelector);
  // const [selectedMetrics, setSelectedMetrics] = useState([]);

  const [result] = useQuery({
    query: queries.GET_METRICS,
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;
    const { getMetrics } = data;

    dispatch({ type: actions.GET_METRICS_DATA_RECEIVED, getMetrics });
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  const handleChange = event =>
    dispatch({
      type: actions.SET_SELECTED_METRICS,
      selectedMetrics: event.target.value,
    });

  return (
    <FormControl>
      <Select
        multiple
        value={selectedMetrics}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {metrics.map(metric => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <ChartsSelect />
    </Provider>
  );
};
