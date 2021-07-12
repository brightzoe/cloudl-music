import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import Scroll from "../../components/scroll/index";
import { PropTypes } from "prop-types";
import style from "../../assets/global-style";

const List = styled.div`
	display: flex;
	align-items: center;
	height: 30px;
	overflow: hidden;
	> span:first-of-type {
		/* display: inline-block; */
		flex: 0 0 auto;
		padding: 5px 0;
		margin-right: 5px;
		color: grey;
		font-size: ${style["font-size-m"]};
		vertical-align: middle;
	}
`;
const ListItem = styled.span`
	flex: 0 0 auto;
	font-size: ${style["font-size-m"]};
	padding: 5px 8px;
	border-radius: 10px;
	&.selected {
		color: ${style["theme-color"]};
		border: 1px solid ${style["theme-color"]};
		opacity: 0.8;
	}
`;

function Horizon(props) {
	const { list, oldVal, title } = props;
	const { handleClick } = props;
	const Category = useRef(null);

	useEffect(() => {
		let categoryDOM = Category.current;
		let tagElems = categoryDOM.querySelectorAll("span");
		let totalWidth = 0;
		Array.from(tagElems).forEach((i) => (totalWidth += i.offsetWidth));
		categoryDOM.style.width = `${totalWidth}px`;
	}, []);

	return (
		<Scroll direction="horizontal">
			<div ref={Category}>
				<List>
					<span>{title}</span>
					{list.map((item) => {
						return (
							<ListItem key={item.key} className={`${oldVal === item.key ? "selected" : ""}`} onClick={() => handleClick(item.key)}>
								{item.name}
							</ListItem>
						);
					})}
				</List>
			</div>
		</Scroll>
	);
}

Horizon.defaultProps = {
	list: [],
	oldVal: "",
	title: "",
	handleClick: null,
};

Horizon.propTypes = {
	list: PropTypes.array, //接受的列表数据
	oldVal: PropTypes.string, //当前的 item 值
	title: PropTypes.string, //列表左边的标题
	handleClick: PropTypes.func, //点击不同的 item 执行的方法
};
export default memo(Horizon);
