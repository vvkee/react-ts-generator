/**
 * collect
 * @author zongqi wei
 * @description 高阶组件
 * @description 收集子组件的状态，props
 */
import React from 'react';

const collect = (options: {}) => (Component: React.ClassType<any, any, any>) =>
class CollectHOC extends React.Component {
  public static displayName = `CollectHOC(${Component.displayName || ''})`
  public render() {
    return <Component {...this.props} />
  }
}

export default collect;
