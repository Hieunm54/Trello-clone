import { CardConstant } from "../constant/CardConstant";

export const addCard = (content = "default") => {
	return {
		type: CardConstant.ADD_CARD,
		payload: content,
	};
};

export const deleteCard = (id) => {
	return {
		type: CardConstant.DELETE_CARD,
		payload: id,
	};
};
