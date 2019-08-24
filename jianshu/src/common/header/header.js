import React, { Component } from 'react'
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

import { searchFocus, searchBlur, getList } from './store/header-action-types'

class Header extends Component {

    getListArea = () => {
        if (this.props.focused) {
            return (
                <SearchInfo>
                        <SearchInfoTitle>
                            Hottest topic
                            <SearchSwitchInfo>Change other topics</SearchSwitchInfo>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {
                                this.props.list.map((item) => {
                                    return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                                })
                            }
                            
                        </SearchInfoList>
                        
                    </SearchInfo>
            )
        } else {
            return null
        }
    }

    render() {
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
                        in={this.props.focused}
                        timeout={200}
                        classNames="slide">
                        <NavSearch
                            className={this.props.focused ? 'focused' : ''}
                            onFocus = {this.props.handleInputFocus}
                            onBlur = {this.props.handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={this.props.focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
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
        list: state.getIn(['header', 'list'])
    }),

    (dispatch) => {
        return {
            handleInputBlur() {
                dispatch(searchBlur())
            },
            handleInputFocus() {
                dispatch(getList())
                dispatch(searchFocus())
            }
        }
    }
    
)(Header)

