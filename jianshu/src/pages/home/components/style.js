import styled from 'styled-components'

export const TopicWrapper = styled.div`
    padding: 20px 0 10px 0;
    overflow: hidden;
    margin-left: -18px;
`

export const TopicItem = styled.div`
    float: left;
    background-color: #f7f7f7;
    line-height: 32px;
    font-size: 14px;
    height: 32px;
    color: #000;
    padding-right: 10px;
    margin-left: 18px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    .topic-pic {
        width: 32px;
        height: 32px;
        display: block;
        float: left;
        margin-right: 10px;
    }
`

export const ListItem = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #dcdcdc;
    overflow: hidden;
    .pic {
        display: block;
        width: 125px;
        height: 100px;
        float: right;
        border-radius: 10px;
    }
`

export const ListInfo = styled.div`
    width: 500px;
    float: left;
    .title {
        line-height: 27px;
        font-weight: bold;
        font-size: 18px;
        color: #333
    }
    .desc {
        line-height: 24px;
        font-size: 13px;
        color: #999;
    }
`