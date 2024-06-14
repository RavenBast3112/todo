import React, { useRef, useState } from 'react'

import { useCreateTodo, useDeleteTodo, useTodos, useUpdateTodo } from './Query'

export const TodoList: React.FC = () => {
	const ref = useRef(null)
	const [value, setValue] = useState('New Task')
	const { data: todoQuery, isLoading } = useTodos()
	const createTodoMutation = useCreateTodo()
	const updateTodoMutation = useUpdateTodo()
	const deleteTodoMutation = useDeleteTodo()

	return (
		<main className="main overflow-y-auto" ref={ref}>
			{isLoading ? (
				''
			) : (
				<>
					<h1 className="h">TODO LIST</h1>
					{todoQuery?.map(
						(todo: {
							id: number
							completed: boolean
							task: string | undefined
						}) => (
							<div className="todo" key={todo.id}>
								<input
									className="checkbox"
									type="checkbox"
									checked={todo.completed}
									onChange={() => {
										updateTodoMutation.mutate({
											id: todo.id,
											completed: !todo.completed,
										})
									}}
								/>
								<text id="col-2" className="h">
									{todo.task}
								</text>
								<button
									className="btn-todo"
									onClick={() => {
										deleteTodoMutation.mutate({
											id: todo.id,
										})
									}}
								>
									Delete
								</button>
							</div>
						),
					)}
					<input
						className="todo-add h"
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					></input>
					<button
						className="btn"
						onClick={() => {
							createTodoMutation.mutate({
								task: value,
							})
						}}
					>
						Add Todo
					</button>
				</>
			)}
		</main>
	)
}
