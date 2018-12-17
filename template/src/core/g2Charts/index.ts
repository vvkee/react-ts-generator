/**
 * g2 process
 * @author zongqi wei
 */
import G2 from '@antv/g2';
import {
  ICharts,
  ICreateChart,
  IDestroyChart
} from './typings'

/**
 * @description key为chartId，根据chartId找到g2chart
 */
const charts: ICharts = {};

/**
 * @description 创建g2 chart
 * @param chartId 
 * @param props g2所需要的参数，不包含container
 * @param force 是否强制创建，如果是则会把原有的chart清空
 */
export const createChart: ICreateChart = (chartId, props, force) => {
  if (charts[chartId] && !force) {
    return charts[chartId].chart;
  }
  if (charts[chartId] && force) {
    destroyChart(chartId);
  }
  const $el = document.createElement('div');
  const chart = new G2.Chart({
    ...props,
    container: $el
  });
  charts[chartId] = {
    chart,
    instance: $el
  };
  return chart;
};

/**
 * @description 销毁g2 chart
 * @param chartId 
 */
export const destroyChart: IDestroyChart = (chartId) => {
  if (!charts[chartId]) {
    return true;
  }
  const chart = charts[chartId];
  chart.chart.destroy();
  chart.instance = null;
  delete charts[chartId];
  return true;
};
