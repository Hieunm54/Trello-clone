import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteList } from "../actions/listsActions";
import { addCard } from "../actions/cardActions";
// import AddCardButton from "./AddCardButton";
import TrelloCard from "./TrelloCard";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #d9deea;
	border: 3;
	width: 300px;
	height: 100%;
`;

const Title = styled.h4`
	display: flex;
	justify-content: center;
	padding: 8px;
	width: 280px;
`;

const TitleInput = styled.input`
	display: flex;
	justify-content: center;
	padding: 8px;
	margin-top: 22px;
	width: 280px;
`;

const AddCardInput = styled.input`
	background-color: #d9deea;
	border: none;
	color: #99989d;
	outline: none;
	&::placeholder {
		color: #99989d;
	}
`;
const AddCard = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	width: 264px;
`;
const DeleteColumn = styled.button`
	border: 0.5px solid red;
	border-radius: 3px;
	width: 50px;
`;

const TrelloList = ({ title, cards, deleteList, id, addCard, index }) => {
	const [value, setValue] = useState("");
	const [listTitle, setListTitle] = useState(title);
	const handleAddCard = (id) => {
		addCard({ id, content: value });
		setValue("");
	};

	const [isDoubleClick, setIsDoubleClick] = useState(true);

	const handleTitleChange = () => {};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<Draggable draggableId={String(id)} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
				>
					<Droppable droppableId={String(id)}>
						{(provided, snapshot) => {
							return (
								<Container
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{isDoubleClick ? (
										<Title
											onDoubleClick={() =>
												setIsDoubleClick(false)
											}
										>
											{listTitle}
										</Title>
									) : (
										<TitleInput
											type="text"
											value={listTitle}
											onChange={(e) =>
												setListTitle(e.target.value)
											}
											onBlur={() =>
												setIsDoubleClick(true)
											}
										/>
									)}
									{cards?.map((card, index) => {
										return (
											<TrelloCard
												key={card.id}
												content={card.content}
												id={card.id}
												index={index}
											/>
										);
									})}
									<AddCard>
										<AddCardInput
											id="add_card"
											placeholder="Add task"
											type={"text"}
											value={value}
											onChange={handleChange}
										/>
										<button
											onClick={() => handleAddCard(id)}
										>
											Add
										</button>
									</AddCard>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											marginBottom: "10px",
										}}
									>
										<DeleteColumn
											onClick={() => deleteList(id)}
										>
											Delete
										</DeleteColumn>
									</div>
									{provided.placeholder}
								</Container>
							);
						}}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

export default connect(null, { deleteList, addCard })(TrelloList);
