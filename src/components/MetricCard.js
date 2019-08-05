import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  card: {
    marginBottom: '1rem',
    marginRight: '1rem',
    minWidth: 250,
  },
});

const currentMeasurementsSelector = state => {
  return state.charts.currentMeasurements;
};

export default ({ metric }) => {
  const classes = useStyles();
  const currentMeasurement = useSelector(currentMeasurementsSelector)[metric];
  const { unit, value } = currentMeasurement;

  return (
    <Card className={classes.card}>
      <CardHeader title={metric} subheader={unit} />
      <CardContent>
        <Typography variant="h3">{value}</Typography>
      </CardContent>
    </Card>
  );
};
