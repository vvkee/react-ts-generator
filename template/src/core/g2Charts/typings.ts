/**
 * g2 process typings
 * @author zongqi wei
 */
import G2 from '@antv/g2';

export interface IChart {
  chart: G2.Chart,
  instance: HTMLDivElement
}
export interface ICharts {
  [chartId: string]: IChart
}

export type ICreateChart = (chartId: string, props: G2.ChartProps, force?: boolean) => G2.Chart;

export type IDestroyChart = (chartId: string) => boolean;