import React from "react";
import Horizon from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";
function Singer(props) {
	return (
		<NavContainer>
			<Horizon list={categoryTypes} title={"分类 (默认热门):"}></Horizon>
			<Horizon list={alphaTypes} title={"首字母:"}></Horizon>
		</NavContainer>
	);
}
export default React.memo(Singer);
