import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image,ScrollView} from '@tarojs/components'
import {detail} from '../../service/api'
import './index.scss'

export default class Index extends Component {
  /* constructor(props) {
     super(props)
   }
 */
  state = {
    obj: {}, // 电影详情
    id: '',
  };
  config: Config = {
    navigationBarTitleText: '详情'
  };

  componentWillMount() {
    this.setState({
      id: this.$router.params.id,
    });
    // console.log(this.$router.params,'11111')
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
    };
    const res = await detail(this.state.id, params);
    this.setState({
      obj: res.data
    });
  };

  render() {
    const {obj} = this.state;
    return (
      <View className='container'>
        <View className='top'>
          <View className='image_wrap'>
            <Image mode='aspectFill' className='image_big' src={obj.images.medium}/>
          </View>
        </View>
        <View className='middle'>
          <View className='middle_top'>
            <View className='title_desc'>{obj.title}</View>
            <View className='des'>{obj.original_title}</View>
            <View className='descriptions'>
              <View className='lefts'>
                <View className='des_left'>2018-11-09</View>
                <View className='des_left'>片长：{obj.durations[0]}</View>
              </View>
              <View className='rights'>
                更多操作
              </View>
            </View>
          </View>
          <View className='middle_mid'>
            <View className='jianjie'>简介</View>
            <View className='jianjie_desc'>{obj.summary}</View>
            <View className='jianjie'>影人</View>
            <ScrollView
              scrollX={true}
              className='photo_wraps'>
              {obj.casts && obj.casts.map((item,index)=>{
                return(
                  <Image key={index} mode='aspectFill' className='photo' src={item.avatars.small}/>
                )
              }) }
            </ScrollView>
          </View>
        </View>
        <View className='bottom'>
          <View className='title_b'>短评</View>
          <View className='bottom_wrap'>
            {obj.popular_comments && obj.popular_comments.map((i,v)=>{
              return(
                <View className='item' key={v}>
                  <View className='item_left'><Image mode='aspectFill' className='pic' src={v.author.avatar}/></View>
                  <View className='item_right'>
                    <View className='name'>{v.author.name} 评分{v.author.rating.max}</View>
                    <View className='deatil'>{v.author.content}</View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

