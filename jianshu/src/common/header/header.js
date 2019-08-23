import React, { Component } from 'react'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button
} from './header-style'

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <Logo></Logo>
                <Nav>
                    <NavItem className='left active'>Home</NavItem>
                    <NavItem className='left'>Download</NavItem>
                    <NavItem className='right'>Login</NavItem>
                    <NavItem className='right'>Aa</NavItem>
                    <NavSearch></NavSearch>
                    <i className='iconfont'>&#xe614;</i>
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

export default Header
