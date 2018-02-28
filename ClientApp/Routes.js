import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import GridExample from './components/GridExample';
import GridExample2 from './components/GridExample2';

const Routes = ()=>{
  return (
    <Layout>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/gridexample2" component={GridExample2}/>
      </div>
    </Layout>
  );
};

export default Routes;
