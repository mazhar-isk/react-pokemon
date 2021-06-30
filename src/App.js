import { Layout } from 'antd';
import { Router, Switch, Route } from "react-router-dom";
import history from './utils/History'
import HomePage from './pages/home'
import DetailPage from './pages/detail'
import './index.css'
const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Router history={history}>
              <Switch>
                <Route path="/:id" component={DetailPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Pokemon ©2021 Created by MAzhar.isk</Footer>
      </Layout>
    </Layout>
  )
}

export default App