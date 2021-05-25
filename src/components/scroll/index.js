import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";
const ScrollContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const Scroll = forwardRef((props, ref) => {
	//作为一个通用组件，scroll 组件在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹。
	const [bScroll, setBScroll] = useState();
	const scrollContainerRef = useRef();
	const { direction, click, refresh, bounceTop, bounceBottom } = props;
	const { pullUp, pullDown, onScroll } = props;

	useEffect(() => {
		//创建better-scroll
		const scroll = new BScroll(scrollContainerRef.current, {
			scrollX: direction === "horizontal",
			scrollY: direction === "vertical",
			probeType: 3,
			click: click,
			bounce: {
				top: bounceTop,
				bottom: bounceBottom,
			},
			// mouseWheel: true,//鼠标滚动，在chrome模拟滚动
		});
		setBScroll(scroll);
		return () => {
			setBScroll(null);
		};
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		//重新渲染后，刷新实例，防止无法滑动
		if (refresh && bScroll) {
			bScroll.refresh();
		}
	});

	useEffect(() => {
		//给实例绑定scroll事件
		if (!bScroll || !onScroll) return;
		bScroll.on("scroll", (scroll) => {
			onScroll(scroll);
		});
		return () => {
			bScroll.off("scroll");
		};
	}, [onScroll, bScroll]);

	useEffect(() => {
		//上拉到底了吗？上拉刷新
		if (!bScroll || !pullUp) return;
		bScroll.on("scrollEnd", () => {
			// 判断是否滑动到了底部
			if (bScroll.y <= bScroll.maxScrollY + 100) {
				pullUp();
			}
		});
		return () => {
			bScroll.off("scrollEnd");
		};
	}, [pullUp, bScroll]);

	useEffect(() => {
		//下拉到底了吗？下拉刷新
		if (!bScroll || !pullDown) return;
		bScroll.on("touchEnd", (pos) => {
			// 判断用户的下拉动作
			if (pos.y > 50) {
				pullDown();
			}
		});
		return () => {
			bScroll.off("touchEnd");
		};
	}, [pullDown, bScroll]);

	useImperativeHandle(ref, () => ({
		refresh() {
			if (bScroll) {
				bScroll.refresh();
				bScroll.scrollTo(0, 0);
			}
		},
		getBScroll() {
			if (bScroll) {
				return bScroll;
			}
		},
	}));
	return <ScrollContainer ref={scrollContainerRef}> {props.children}</ScrollContainer>;
});

Scroll.defaultProps = {
	direction: "vertical",
	click: true,
	refresh: true,
	onScroll: null,
	pullUpLoading: false,
	pullDownLoading: false,
	pullUp: null,
	pullDown: null,
	bounceTop: true,
	bounceBottom: true,
};
Scroll.propTypes = {
	direction: PropTypes.oneOf(["vertical", "horizontal"]), // 滚动的方向
	click: true, // 是否支持点击
	refresh: PropTypes.bool, // 是否刷新
	onScroll: PropTypes.func, // 滑动触发的回调函数
	pullUp: PropTypes.func, // 上拉加载逻辑
	pullDown: PropTypes.func, // 下拉加载逻辑
	pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
	pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
	bounceTop: PropTypes.bool, // 是否支持向上吸顶
	bounceBottom: PropTypes.bool, // 是否支持向下吸底
};

export default Scroll;
