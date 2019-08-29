import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import Topic from './components/Topic'
import List from './components/List'
import Writer from './components/Writer'
import Recommend from './components/Recommend'

import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './home-style'
import { getHomeInfo, toggleTopShow } from './store/actions'


class Home extends PureComponent {

    handleScrollTop() {
        window.scrollTo(0, 0)
    }

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
                {
                    this.props.showScroll ? <BackTop onClick={this.handleScrollTop.bind(this)}>back to top</BackTop> : null
                }
                
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvent();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    bindEvent() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}

export default connect((state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
}),
(dispatch) => {
    return {
        changeHomeData() {
            const action = getHomeInfo()
            dispatch(action)
        },
        changeScrollTopShow(e) {
            if (document.documentElement.scrollTop > 400 ) {
                dispatch(toggleTopShow(true))
            } else {
                dispatch(toggleTopShow(false))
            }
        }
    }
}
)(Home)

