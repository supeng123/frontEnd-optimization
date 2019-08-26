import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Topic from './components/Topic'
import List from './components/List'
import Writer from './components/Writer'
import Recommend from './components/Recommend'

import { HomeWrapper, HomeLeft, HomeRight } from './home-style'


class Home extends Component {
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img"
                        src="https://upload.jianshu.io/admin_banners/web_images/4709/b8781402df958bbf067a1b876b6efb13619b695d.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Writer></Writer>
                </HomeRight>
            </HomeWrapper>
        )
    }

    componentDidMount() {
        axios.get('./api/home.json')
        .then((res) => {
            const result = res.data.data
            const action = {
                type: 'change_home-data',
                topicList: result.topicList,
                articleList: result.articleList
            }
            this.props.changeHomeData(action)
        })
    }
}

export default connect((state) => ({

}),
(dispatch) => {
    return {
        changeHomeData(action) {
            dispatch(action)
        }
    }
}
)(Home)

