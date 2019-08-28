import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ListItem, ListInfo, LoadMore } from './style'
import { getMoreList } from '../store/actions'

class List extends PureComponent {
    render() {
        const {list, getMoreList} = this.props
        return (
            <div>
                {
                list.map((item) => {
                    return (
                        <Link key = {item.get('id')} to={'/detail/' + item.get('id')}>
                            <ListItem >
                                <img 
                                className="pic"
                                src={item.get('imgUrl')} />
                                <ListInfo>
                                    <h3 className="title">{item.get('title')}</h3>
                                    <p className="desc">{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    
                    )
                })
            }
            <LoadMore onClick={getMoreList}>More</LoadMore>
            </div> 
        )
    }
}

export default connect(
    (state) => ({
        list: state.getIn(['home', 'articleList'])
    }),
    (dispatch) => {
        return {
            getMoreList() {
                dispatch(getMoreList())
            }
        }
    }
)(List)
