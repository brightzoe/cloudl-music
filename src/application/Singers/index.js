import React, { useState, useEffect } from "react";
import Horizon from "@/baseUI/horizon-item";
import { typeTypes, alphaTypes } from "@/api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from "@/components/scroll";
import {
	getSingerList,
	getHotSingerList,
	changeEnterLoading,
	changePageCount,
	refreshMoreSingerList,
	changePullUpLoading,
	changePullDownLoading,
	refreshMoreHotSingerList,
} from "./store/actionCreators";
import { connect } from "react-redux";
import  LazyLoad, {forceCheck} from 'react-lazyload';


function Singers(props) {
	const [type, setType] = useState([-1,-1]);
	const [alpha, setAlpha] = useState("");

	const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
	const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

	useEffect(() => {
		getHotSingerDispatch();
	}, []);

	const handleUpdateType = (val) => {
		setType(val);
		updateDispatch(val,alpha)
	};
	const handleUpdateAlpha = (val) => {
		setAlpha(val);
		updateDispatch(type,val)
	};

	const handlePullUp = () => {
    pullUpRefreshDispatch(type, alpha, type === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(type, alpha);
  };
	const renderSingerList = () => {
    const list = singerList ? singerList.toJS(): [];
    console.log(props)
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
	return (
		<>
			<NavContainer>
				<Horizon list={typeTypes} title={"分类 (默认热门):"} handleClick={handleUpdateType} oldVal={type}></Horizon>
				<Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
			</NavContainer>
			<ListContainer>
				{" "}
				<Scroll
				 pullUp={ handlePullUp }
				 pullDown = { handlePullDown }
				 pullUpLoading = { pullUpLoading }
				 pullDownLoading = { pullDownLoading }
				 onScroll={forceCheck}
				>{renderSingerList()}</Scroll>
			</ListContainer>
		</>
	);
}
const mapStateToProps = (state) => ({
	singerList: state.getIn(["singers", "singerList"]),
	enterLoading: state.getIn(["singers", "enterLoading"]),
	pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
	pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
	pageCount: state.getIn(["singers", "pageCount"]),
});
const mapDispatchToProps = (dispatch) => {
	return {
		getHotSingerDispatch() {
			dispatch(getHotSingerList());
		},
		updateDispatch(type, alpha) {
			dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
			dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
			dispatch(getSingerList(type, alpha));
		},
		// 滑到最底部刷新部分的处理
		pullUpRefreshDispatch(type, alpha, hot, count) {
			dispatch(changePullUpLoading(true));
			dispatch(changePageCount(count + 1));
			if (hot) {
				dispatch(refreshMoreHotSingerList());
			} else {
				dispatch(refreshMoreSingerList(type, alpha));
			}
		},
		//顶部下拉刷新
		pullDownRefreshDispatch(type, alpha) {
			dispatch(changePullDownLoading(true));
			dispatch(changePageCount(0)); //属于重新获取数据
			if (type === "" && alpha === "") {
				dispatch(getHotSingerList());
			} else {
				dispatch(getSingerList(type, alpha));
			}
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
