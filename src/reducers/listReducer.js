import { v4 as uuidv4 } from "uuid";
import { CardConstant } from "../constant/CardConstant";
import { ListConstant } from "../constant/ListConstant";

const initialState = [
	{
		id: 1,
		title: "Grocery Store",
		cards: [
			{
				id: 3,
				content: "Italian Bread",
			},
			{
				id: 4,
				content: "Spaghetti",
			},
		],
	},
	{
		id: 2,
		title: "Calc III",
		cards: [
			{
				id: 5,
				content: "Chapter 15 homework",
			},
			{
				id: 6,
				content: "Mid term practice",
			},
			{
				id: 7,
				content: "Mid term practice 2",
			},
		],
	},
];

export const listReducer = (state = initialState, action) => {
	switch (action.type) {
		case ListConstant.ADD_LIST: {
			const newColumn = {
				id: uuidv4(),
				title: action.payload,
				cards: [],
			};
			return [...state, newColumn];
		}
		case ListConstant.DELETE_LIST: {
			const newList = [...state];
			return newList.filter((item) => item.id !== action.payload);
		}
		case CardConstant.ADD_CARD: {
			const newState = [...state];
			const newItem = { id: uuidv4(), content: action.payload.content };
			const newList = newState.map((list) => {
				if (list.id === action.payload.id) {
					return { ...list, cards: [...list.cards, newItem] };
				} else {
					return list;
				}
			});
			return newList;
		}
		case ListConstant.RE_ORDER: {
			const {
				destinationId,
				destinationIndex,
				sourceId,
				sourceIndex,
				draggableId,
				type,
			} = action.payload;

			const newState = [...state];
			// same list

			if (type === "list") {
				console.log("drag list");
				const newState = [...state];
				const [reOderList] = newState.splice(sourceIndex, 1);
				newState.splice(destinationIndex, 0, reOderList);
				return newState;
			}

			if (destinationId === sourceId) {
				const list = newState.find(
					(list) => String(list.id) === destinationId
				);

				const [reOrderItem] = list.cards.splice(sourceIndex, 1);
				list.cards.splice(destinationIndex, 0, reOrderItem);
			} else {
				// different list

				const newState = [...state];

				const startList = newState.find(
					(list) => String(list.id) === sourceId
				);

				const [reOrderItem] = startList.cards.splice(sourceIndex, 1);

				const endList = newState.find(
					(list) => String(list.id) === destinationId
				);

				endList.cards.splice(destinationIndex, 0, reOrderItem);
			}

			return newState;
		}
		case CardConstant.DELETE_CARD: {
			const newState = [...state];
			const result = newState.map((list) => {
				return {
					...list,
					cards: list.cards.filter(
						(item) => item.id !== action.payload
					),
				};
			});
			return result;
		}
		default:
			return state;
	}
};
