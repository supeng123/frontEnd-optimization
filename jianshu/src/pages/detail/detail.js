import React, { PureComponent } from 'react'
import {connect } from 'react-redux'
import { withRouter}  from 'react-router-dom'

import { Header, DetailWrapper, Content } from './style'
import { getDetail } from './store/actions'
class Detail extends PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{__html: content}}>
                </Content>
            </DetailWrapper>
        )
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
    }
}

export default connect((state) => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
}),
(dispatch) => {
    return {
        getDetail(id) {
            dispatch(getDetail(id))
        },
    }
}
)(withRouter(Detail))