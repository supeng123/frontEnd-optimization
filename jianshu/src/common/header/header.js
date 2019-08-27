import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfoTitle,
    SearchSwitchInfo,
    SearchInfoList,
    SearchInfoItem,
    SearchInfo
} from './header-style'

import { searchFocus, searchBlur, getList, mouseEnter, mouseLeave, changePageList } from './store/header-action-types'

class Header extends PureComponent {
    
    getListArea = () => {
        const {focused, page, totalPage, list, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props
        const pageList = []
        const newList = list.toJS()

        if (newList.length>1) {
            for (let i = ((page-1)*2); i < page * 2; i++ ) {
                pageList.push(
                    <SearchInfoItem key={i} >{newList[i]}</SearchInfoItem>
                )
            }
        }
        
        if (focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <SearchInfoTitle>
                            Hottest topic
                            <SearchSwitchInfo key = 'none' onClick={() => handleChangePage(page, totalPage)}>Change other topics</SearchSwitchInfo>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {
                                pageList
                            }
                            
                        </SearchInfoList>
                        
                    </SearchInfo>
            )
        } else {
            return null
        }
    }

    render() {
        const {focused, page, handleInputFocus, handleInputBlur} = this.props
        return (
        <HeaderWrapper>
            <Logo></Logo>
            <Nav>
                <NavItem className='left active'>Home</NavItem>
                <NavItem className='left'>Download</NavItem>
                <NavItem className='right'>Login</NavItem>
                <NavItem className='right'>Aa</NavItem>
                <SearchWrapper>
                    <CSSTransition
                        in={focused}
                        timeout={200}
                        classNames="slide">
                        <NavSearch
                            className={focused ? 'focused' : ''}
                            onFocus = {handleInputFocus}
                            onBlur = {handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
                    {this.getListArea()}
                </SearchWrapper>
                
            </Nav>
            <Addition>
                <Button className='reg'>
                <i className='iconfont'>&#xe615;</i>
                Registing
                </Button>
                <Button className='writting'>Writting</Button>
            </Addition>
    </HeaderWrapper>
        )
    }
}


export default connect( 
    (state) => ({
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage'])
    }),

    (dispatch) => {
        return {
            handleInputBlur() {
                dispatch(searchBlur())
            },
            handleInputFocus() {
                dispatch(getList())
                dispatch(searchFocus())
            },
            handleMouseEnter() {
                dispatch(mouseEnter())
            },
            handleMouseLeave() {
                dispatch(mouseLeave())
            },
            handleChangePage(page, totalPage) {
                if (page < totalPage) {
                    dispatch(changePageList(page + 1))
                } else {
                    dispatch(changePageList(1))
                }
                
            }
        }
    }
    
)(Header)

