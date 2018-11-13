import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image, Swiper, SwiperItem} from '@tarojs/components'
import {getInTheaters} from '../../service/api'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    list: [], // 广告列表
    start: 1,
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getList();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  getList = async () => {
    const params: object = {
      apikey: "0b2bdeda43b5688921839c8ecb20399b",
      start: this.state.start,
      count: 15
    };
    const res = await getInTheaters(params);
    this.setState({
      list: res.data.subjects
    });
  };

  render() {
    const {list} = this.state;
    return (
      <View className='container'>
        <View className='top'>
          <Swiper
            autoplay={true}
            duration={500}
            circular={true}
            className='swipers'
            indicatorDots={true}
            indicatorColor='yellowgreen'
          >
            {list.length && list.map((item, index) => {
              return (
                <SwiperItem key={index} className='swiper_item'>
                  <View className='big_image_wrap'>
                    <Image mode='aspectFill' className='big_image' src={item.images.small}/>
                    <View className='big_title'>{item.title}</View>
                  </View>
                </SwiperItem>
              )
            })}


          </Swiper>
        </View>
        <View className='content'>
          {list.length && list.map((item, index) => {
            return (
              <View className='list' key={index}>
                <View className='imag_wrap'>
                  <Image mode='aspectFill' className='pic' src={item.images.small}/>
                  <Text className='vip_logo'>VIP</Text>
                  <Text className='average'>{item.rating.average}</Text>
                </View>
                <View className='description'>
                  <View className='title'>{item.title}</View>
                  <View className='types'>
                    {item.genres && item.genres.map((i, v) => {
                      return (
                        <View className='type' key={v}>{i}</View>
                      )
                    })}
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

