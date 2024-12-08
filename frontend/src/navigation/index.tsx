import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import ErrorBoundary from "../components/ErrorBoundary";

const DashboardPage = React.lazy(() => import('../pages/dashboard'));
const Layout = React.lazy(() => import('../components/Layout'));
const RecommendationsPage = React.lazy(() => import('../pages/recommendations'));
const LoginPage = React.lazy(() => import('../pages/login'));

function RootNavigation() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="login" element={<LoginPage/>}/>
          <Route element={<Layout/>}>
            <Route path="" element={<DashboardPage title="Dashboard"/>}/>
            <Route path="policies" element={<DashboardPage title="Policies"/>}/>
            <Route path="events" element={<DashboardPage title="Events"/>}/>
            <Route path="waivers" element={<DashboardPage title="Waivers"/>}/>
            <Route path="recommendations" element={<RecommendationsPage archived={false}/>}/>
            <Route path="recommendations/archive" element={<RecommendationsPage archived={true}/>}/>
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default RootNavigation;
