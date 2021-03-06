import styled from 'styled-components'
import logoPic from '../../assets/logo.png'

export const HeaderWrapper = styled.div`
    position: relative;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.a.attrs({
    href: '/'
})`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100px;
    height: 56px;
    background: url(${logoPic});
    background-size: contain;

`

export const Nav = styled.div`
    width: 960px;
    height: 100%;
    margin: 0 auto;
    padding-right: 70px;
    box-sizing: border-box;
`

export const NavItem = styled.div`
    line-height: 56px;
    padding: 0 15px;
    font-size: 17px;
    color: #333;
    &.left {
        float: left;
    }
    &.right {
        float: right;
        color: #969696;
    }
    &.active {
        color: #ea6f5a;
    }
`

export const SearchWrapper = styled.div`
    position: relative;
    float: left;
    .slide-enter {
        transition: all .2s ease-out;
    }
    .slide-enter-active {
        width: 240px;
    }
    .slide-exit {
        transition: all .2s ease-out;
    }
    .slide-exit-active {
        width: 160px;
    }
    .iconfont {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;
        &.focused {
            background-color: #777;
        }
    }
`

export const NavSearch = styled.input.attrs({
    placeholder: 'Search'
})`
    width: 160px;
    height: 38px;
    border: none;
    outline: none;
    border-radius: 19px;
    margin-top: 9px;
    padding 0 30px 0 20px;
    box-sizing: border-box;
    background-color: #eee;
    font-size: 14px;
    margin-left: 20px;
    color: #777;
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 200px;
    }
`

export const SearchInfo = styled.div`
    position: absolute;
    left: 0;
    top: 56px;
    width: 240px;
    padding: 0 20px;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    background-color: #eee;
`

export const SearchInfoTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 15px;
    line-height: 20px;
    font-size: 14px;
    color: #969696;
`
export const SearchSwitchInfo = styled.span`
    float: right;
    font-size: 13px;
`

export const SearchInfoList = styled.div`
    overflow: hidden
`

export const SearchInfoItem = styled.a`
    font-size: 12px;
    line-height: 20px;
    padding: 0 5px;
    border: 1px solid #ddd;
    color: #787878;
    border-radius: 3px;
    display: block;
    float: left;
    marign-right 10px;
    margin-bottom: 10px;
`

export const Addition = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 56px;
`

export const Button = styled.div`
    float: right;
    line-height: 38px;
    margin-top: 9px;
    border: 1px solid #ec6149;
    border-radius: 19px;
    margin-right: 20px;
    padding: 0 20px;
    font-size: 14px;
    &.reg {
        color: #ec6149;
    }
    &.writting {
        color: #fff;
        background-color: #ec6149;
    }
`