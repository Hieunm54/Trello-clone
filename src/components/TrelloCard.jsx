import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteCard } from "../actions/cardActions";

const Container = styled.div`
	margin-top: 20px;
	display: flex;
	/* flex: 1; */
	justify-content: space-between;
	align-items: center;
	/* padding: 5px 10px; */
	padding: 8px;
	margin: 10px;
	border-radius: 5px;
	background-color: #f3f3f3;
	height: 50px;
`;

const Name = styled.div`
	max-width: 150px;
`;

const NameInput = styled.input`
	display: flex;
	justify-content: center;
	padding: 8px;
	max-width: 150px;
`;

const Icons = styled.div`
	display: flex;
	gap: 5px;
`;

const TrelloCard = ({ deleteCard, content, index, id }) => {
	const [cardContent, setCardContent] = useState(content);
	const [isHandleChange, setIsHandleChange] = useState(true);

	return (
		<Draggable draggableId={String(id)} index={index}>
			{(provider, snapshot) => (
				<Container
					ref={provider.innerRef}
					{...provider.draggableProps}
					{...provider.dragHandleProps}
				>
					{isHandleChange ? (
						<Name>{cardContent}</Name>
					) : (
						<NameInput
							type="text"
							value={cardContent}
							onChange={(e) => setCardContent(e.target.value)}
							onBlur={() => setIsHandleChange(true)}
						/>
					)}
					<Icons>
						<button onClick={() => setIsHandleChange(false)}>
							Edit
						</button>
						<button onClick={() => deleteCard(id)}>Delete</button>
					</Icons>
				</Container>
			)}
		</Draggable>
	);
};

export default connect(null, { deleteCard })(TrelloCard);
