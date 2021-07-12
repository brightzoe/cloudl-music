import React, { useState } from "react";
import Horizon from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";
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
		<NavContainer>
			<Horizon list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCategory} oldVal={category}></Horizon>
			<Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
		</NavContainer>
	);
}
export default React.memo(Singer);
