import "./App.css";
import styled from "styled-components";
import TrelloList from "./components/TrelloList";
import { connect } from "react-redux";
import { addList, deleteList, reOrder } from "./actions/listsActions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #153255;
	height: 100vh;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: #00adf1;
	padding: 5px 20px;
	align-items: center;
	height: 100px;
`;
const SignOutButton = styled.div`
	width: 100px;
	height: 24px;
	border: 1px solid black;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Main = styled.div`
	/* background-color: #153255; */
	display: flex;
	gap: 10px;
	padding: 20px 50px;
	/* height: 100%; */
`;

const AddColumn = styled.button`
	border-radius: 50%;
	width: 50px;
	height: 50px;
	background-color: #009ecb;
	border: none;
`;

function App({ lists, addList, reOrder }) {
	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}

		reOrder(
			destination.droppableId,
			destination.index,
			source.droppableId,
			source.index,
			draggableId,
			type
		);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				<Header>
					<h2>Trello-Clone</h2>
					<SignOutButton>Sign out</SignOutButton>
				</Header>
				<Droppable
					droppableId="column-id"
					direction="horizontal"
					type="list"
				>
					{(provided, snapshot) => (
						<Main
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{lists?.map((l, index) => {
								return (
									<TrelloList
										key={l.id}
										title={l.title}
										id={l.id}
										cards={l.cards}
										index={index}
									/>
								);
							})}
							<AddColumn onClick={() => addList()}>Add</AddColumn>
							{provided.placeholder}
						</Main>
					)}
				</Droppable>
			</Container>
		</DragDropContext>
	);
}

const mapStateToProps = (state) => {
	const lists = state.lists;
	return {
		lists,
	};
};

export default connect(mapStateToProps, { addList, deleteList, reOrder })(App);
