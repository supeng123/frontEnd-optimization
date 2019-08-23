import React from 'react'
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
    SearchWrapper
} from './header-style'

const Header = (props) => {
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
                    in={props.focused}
                    timeout={200}
                    classNames="slide">
                    <NavSearch
                        className={props.focused ? 'focused' : ''}
                        onFocus = {props.handleInputFocus}
                        onBlur = {props.handleInputBlur}
                    ></NavSearch>
                </CSSTransition>
                <i className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
                
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

export default connect(
    (state) => ({
        focused: state.focused
    }),

    (dispatch) => {
        return {
            handleInputBlur() {
                const action = {
                    type: 'search_blur'
                }
                console.log('search_blur')
                dispatch(action)
            },
            handleInputFocus() {
                const action = {
                    type: 'search_focused'
                }
                dispatch(action)
            }
        }
    }
    
)(Header)
