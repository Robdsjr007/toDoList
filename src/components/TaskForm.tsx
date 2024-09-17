import styles from "./taskForm.module.sass";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

// interfaces
import { ITask } from "../interfaces/Task";

type Props = {
	btnText: string;
	taskList: ITask[];
	setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
	task?: ITask | null;
	handleUpdate?(id: number, title: string, difficulty: number): void;
};

const TaskForm = ({
	handleUpdate,
	btnText,
	taskList,
	setTaskList,
	task,
}: Props) => {
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [difficulty, setDifficulty] = useState<number>(0);

	useEffect(() => {
		if (task) {
			setId(task.id);
			setTitle(task.title);
			setDifficulty(task.difficulty);
		}
	}, [task]);

	const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (handleUpdate) {
			handleUpdate(id, title, difficulty);
		} else {
			const id = Math.floor(Math.random() * 1000);

			const newTask: ITask = { id, title, difficulty };

			setTaskList!([...taskList, newTask]);

			setTitle("");

			setDifficulty(0);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		} else {
			const value = e.target.value;
			setDifficulty(value === "" ? 0 : parseInt(value));
		}
	};

	return (
		<form onSubmit={addTaskHandler} className={styles.form}>
			<div className={styles.input_container}>
				<label htmlFor="title">Titulo:</label>
				<input
					type="text"
					name="title"
					placeholder="Digitar tarefa"
					value={title}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.input_container}>
				<label htmlFor="difficulty">Dificuldade:</label>
				<input
					type="text"
					name="difficulty"
					placeholder="Digite a dificuldade"
					value={difficulty}
					onChange={handleChange}
				/>
			</div>
			<input type="submit" value={btnText} />
		</form>
	);
};

export default TaskForm;
