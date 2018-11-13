import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {getInTheaters} from '../../service/api'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
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
    const params = {
      apikey: "0b2bdeda43b5688921839c8ecb20399b",
      city: "上海",
      start: this.state.start,
      count: 15
    };
    const res = await getInTheaters(params);
    console.log(res, 'http://www.cnblogs.com/oskyhg/p/9749373.html')
  };

  render() {
    return (
      <View className='index'>
        <Text>这是一个首页 </Text>
      </View>
    )
  }
}

