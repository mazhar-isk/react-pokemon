import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPokemon } from '../actions/Pokemon';
import {
  Row, Col,
  Statistic, Typography,
  PageHeader, Empty, Card,
} from 'antd';
import { startCase, isEmpty } from 'lodash';
import ImageGallery from 'react-image-gallery';
import history from '../utils/History';

class Detail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getPokemon(id)
  }
  render() {
    const { detail, isFetching } = this.props.pokemon
    const dataImg = []
    if (!isFetching && !isEmpty(detail.sprites)) {
      Object.keys(detail.sprites).reverse().forEach(item => {
        if (
          item !== 'other' && item !== 'versions' &&
          !item.includes('shiny') && detail.sprites[item]
        ) {
          dataImg.push({
            original: detail.sprites[item],
            thumbnail: detail.sprites[item],
            description: startCase(item.split('_').join(' ')),
          })        
        }
      })
    }
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => history.goBack()}
          title="Back to List"
        />
        {detail
          ? (
            <Card
              style={{ borderRadius: '1rem' }}
              loading={isFetching}
            >
              <Row gutter={[16, 16]}>
                {/* Left Card: Galleries */}
                <Col xs={24} lg={8} xxl={6}>
                  <ImageGallery
                    showNav={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    items={dataImg}
                  />
                </Col>

                {/* Right Card: Details */}
                <Col xs={24} lg={14} xxl={16}>
                  <Typography.Title>{startCase(detail.name)}</Typography.Title>
                  <Row gutter={[16, 16]}>
                    {/* Upper Content */}
                    <Col span={24}>
                      <Row gutter={[16, 16]}>
                        {/* Base Experience */}
                        <Col xs={24} md={12} xl={8}>
                          <Card style={{ borderRadius: '1rem' }}>
                            <Typography.Title level={4}>Base Experience</Typography.Title>
                            <Statistic value={detail.base_experience} />
                          </Card>
                        </Col>

                        {/* Types */}
                        <Col xs={24} md={12} xl={8}>
                          <Card style={{ borderRadius: '1rem' }}>
                            <Typography.Title level={4}>Type</Typography.Title>
                            <Row gutter={[16, 16]}>
                              {(detail.types || []).map(item => (
                                <Col key={Math.random()}>
                                  <Statistic value={startCase(item.type.name)} />
                                </Col>
                              ))}
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>

                    {/* Lower Content */}
                    <Col span={24}>
                      <Card style={{ borderRadius: '1rem' }}>
                        <Typography.Title level={4}>Stats</Typography.Title>
                        <Row gutter={[16, 16]}>
                          {/* Detail Stat */}
                          {(detail.stats || []).map(item => (
                            <Col key={Math.random()} sm={24} md={12} xl={8}>
                              <Card style={{ borderRadius: '1rem' }}>
                                <Typography.Title level={5}>{startCase(item.stat.name)}</Typography.Title>
                                <Row gutter={16}>
                                  <Col>
                                    <Statistic
                                      title="Base Stat"
                                      value={item.base_stat}
                                    />
                                  </Col>
                                  <Col>
                                    <Statistic
                                      title="Effort"
                                      value={item.effort}
                                    />
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          ))}

                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          )
          : <Empty description="Pokemon not found" />
        }
      </div>
    )
  }
}

export default withRouter(connect(
  ({ pokemon }) => ({ pokemon }),
  { getPokemon },
)(Detail))