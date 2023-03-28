import { ListConstant } from "../constant";

export const addList = (title = "Primary header") => {
	return {
		type: ListConstant.ADD_LIST,
		payload: title,
	};
};

export const deleteList = (id)=>{
    console.log('remove list ',id);
	return {
		type: ListConstant.DELETE_LIST,
		payload: id,
	};
}
