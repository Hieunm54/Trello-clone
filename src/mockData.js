export const mockData = {
	items: {
		"item-1": { id: "item-1", name: "Milk" },
		"item-2": { id: "item-2", name: "ABC" },
		"item-3": { id: "item-3", name: "TEST" },
		"item-4": { id: "item-4", name: "Hieu" },
	},
	columns: {
		"column-1": {
			id: "column-1",
			title: "Store",
			itemIds: ["item-1", "item-2", "item-3"],
		},
		"column-2": {
			id: "column-2",
			title: " Local Store",
			itemIds: ["item-4", "item-2", "item-3"],
		},
	},
	columnOrder: ["column-1", "column-2"],
};
