import Taro, {Component, Config} from '@tarojs/taro'
import {View, Input, Image, Button} from '@tarojs/components'
import {getInTheaters} from '../../service/api'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    list: [], // 广告列表
    start: 1,
    inputValue:''
  };

  config: Config = {
    navigationBarTitleText: '搜索'
  };

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
  onInput = (e) => {
    this.setState({
      inputValue:e.target.value
    })
  };
  submit=async()=>{
    // const res=await
  }

  render() {
    const {list} = this.state;
    return (
      <View className='container'>
        <View className='top'>
          <Input className='input' onInput={this.onInput} placeholder={'电影/导演/演员'}/>
          {/*<Button onClick={this.submit}>搜索</Button>*/}
        </View>
        <View className='content'>
          {
            list && list.map((v, i) => {
              return (
                <View className='list' key={i}>
                  <View className='pic'>
                    <Image className='pics' mode='aspectFill' src={v.images.small}/>
                  </View>
                  <View className='middle'>
                    <View className='title'>
                      {v.title}
                    </View>
                    <View className='texts'>
                      评分:{v.rating.average}
                    </View>
                    <View className='texts'>
                      导演:{v.directors[0].name}
                    </View>
                  </View>
                </View>
              )
            })
          }

        </View>
      </View>
    )
  }
}

