/**
 * chart wrapper
 * @author zongqi wei
 */
import React from 'react';
import createId from '../../utils/createId'

export default class Chart extends React.Component {
  private chartId: string = createId('chart');
  constructor(props: {}) {
    super(props);
    console.log('this.chartId', this.chartId)
  }
  public render() {
    return (
      <div />
    )
  }
}
