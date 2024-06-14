import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const url = process.env.REACT_APP_BASE_PATH || ''
export const useTodos = () =>
	useQuery({ queryKey: ['todos'], queryFn: getTodoList })
async function getTodoList() {
	const { data } = await axios.get(url)
	return data
}

export const useCreateTodo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { task: string }) => {
			await axios.post(url, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
export const useDeleteTodo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { id: number }) => {
			await axios.delete(`${url}/${data.id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
export const useUpdateTodo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { id: number; completed: boolean }) => {
			await axios.put(`${url}/${data.id}`, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
