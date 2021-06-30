import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPokemon } from '../actions/Pokemon';
import history from '../utils/History';
import {
  List, Card, Image, Skeleton,
  PageHeader, Typography, Input,
} from 'antd';
import { startCase } from 'lodash';

class Detail extends Component {
  state = {
    page: 1,
    pageSize: 30,
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    const { page, pageSize } = this.state
    const payload = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }
    this.props.getPokemon(false, payload)
  }
  async onChangePage(page) {
    await this.setState({ page })
    this.getData()
  }
  async onSearch(keyword) {
    history.push(keyword)
  }
  render() {
    const { pageSize } = this.state
    const { data, totalData, isFetching } = this.props.pokemon
    const imgPlaceholder = "https://www.kindpng.com/picc/m/107-1075263_transparent-pokeball-png-pokemon-ball-2d-png-download.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit"
    const imgError = "data:image/jpeg;base64,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"
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Pokemon"
          subTitle="This is a list of Pokemon"
          extra={[
            <Input.Search
              key={Math.random()}
              onSearch={val => this.onSearch(val)}
              loading={isFetching}
              placeholder="Search Pokemon"
              enterButton
              allowClear
            />
          ]}
        />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 6,
          }}
          pagination={{
            onChange: page => this.onChangePage(page) ,
            pageSize,
            total: totalData,
            showSizeChanger: false,
          }}
          loading={isFetching}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <Image
                    src={isFetching ? imgPlaceholder : item.image}
                    placeholder={ <Image preview={false} src={imgPlaceholder} />}
                    fallback={imgError}
                  />
                }
                style={{ borderRadius: '1rem', overflow: 'hidden' }}
              >
                <Card.Meta
                  title={
                    isFetching
                      ? <Skeleton.Button active style={{ width: 200 }} />
                      : <Typography.Title level={3}>{startCase(item.name)}</Typography.Title>
                  }
                  style={{ textAlign: 'center' }}
                  onClick={() => history.push(item.name)}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default withRouter(connect(
  ({ pokemon }) => ({ pokemon }),
  { getPokemon },
)(Detail))
