import React, { useState } from "react";
import Horizon from "@/baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "@/api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from "@/components/scroll";

const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
	return {
		picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
		name: "隔壁老樊",
		accountId: 277313426,
	};
});

const renderSingerList = () => {
	return (
		<List>
			{singerList.map((item, index) => {
				return (
					<ListItem key={item.accountId + "" + index}>
						<div className="img_wrapper">
							<img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
						</div>
						<span className="name">{item.name}</span>
					</ListItem>
				);
			})}
		</List>
	);
};

function Singer() {
	const [category, setCategory] = useState("");
	const [alpha, setAlpha] = useState("");

	const handleUpdateCategory = (val) => {
		setCategory(val);
	};
	const handleUpdateAlpha = (val) => {
		setAlpha(val);
	};

	return (
		<>
			<NavContainer>
				<Horizon list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCategory} oldVal={category}></Horizon>
				<Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
			</NavContainer>
			<ListContainer>
				{" "}
				<Scroll>{renderSingerList()}</Scroll>
			</ListContainer>
		</>
	);
}
export default React.memo(Singer);
