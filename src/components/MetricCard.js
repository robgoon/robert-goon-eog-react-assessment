import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { useSelector } from 'react-redux';

const currentMeasurementsSelector = state => {
  return state.charts.currentMeasurements;
};

export default ({ metric }) => {
  const currentMeasurement = useSelector(currentMeasurementsSelector)[metric];

  return (
    <Card>
      <CardContent>
        {metric}
        {currentMeasurement.value}
        {currentMeasurement.unit}
      </CardContent>
    </Card>
  );
};
