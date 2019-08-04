/* global Plotly */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { LinearProgress } from '@material-ui/core';
import createPlotlyComponent from 'react-plotly.js/factory';
import ChartsSelect from './ChartsSelect';
import * as actions from '../store/actions';
import * as queries from '../store/queries';
import * as subscriptions from '../store/subscriptions';

const now = Date.now(); // TODO: Execute on select | other method
const Plot = createPlotlyComponent(Plotly);

const client = createClient({
  url: queries.url,
});

const measurementsSelector = state => {
  return state.charts.measurements;
};

const unpack = (rows, key, isDateTime) =>
  rows.map(row => (isDateTime ? new Date(row[key]) : row[key]));

const Charts = () => {
  const dispatch = useDispatch();
  const measurements = useSelector(measurementsSelector);
  const axesValues = {};

  if (Object.keys(measurements).length !== 0) {
    const yaxis = {};
    let yaxisIdCount = 0;

    // measurements.a1 = measurements.tubingPressure.map(data => ({
    //   ...data,
    // }));
    // measurements.a1[0].unit = 'unit1';

    Object.keys(measurements).forEach(metric => {
      const { unit } = measurements[metric][0];
      yaxis[unit] = yaxis[unit] ? yaxisIdCount : (yaxisIdCount += 1);

      axesValues[metric] = {
        x: unpack(measurements[metric], 'at', true),
        y: unpack(measurements[metric], 'value'),
        unit,
        yaxisId: yaxis[unit],
      };
    });
  }

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

  const plotData = Object.keys(axesValues).map(metric => {
    const { x, y, unit, yaxisId } = axesValues[metric];

    return {
      name: metric,
      x,
      y,
      yaxis: `y${yaxisId}`,
      type: 'scatter',
      mode: 'lines',
      line: { width: 1 },
      hoverinfo: 'all',
      hovertext: unit,
    };
  });

  const plotLayout = {};

  Object.keys(axesValues).forEach(metric => {
    const { unit, yaxisId } = axesValues[metric];

    if (!plotLayout[`yaxis${yaxisId}`]) {
      plotLayout[`yaxis${yaxisId}`] = {
        title: unit,
      };
    }
  });

  return (
    <div>
      <ChartsSelect />
      <Plot
        data={plotData}
        layout={plotLayout}
        // style={{ display: 'block' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <Charts />
    </Provider>
  );
};
