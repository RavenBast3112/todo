import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TodoList } from './TodoList'

import './App.css'

export const App: React.FC = () => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<TodoList />
		</QueryClientProvider>
	)
}
