import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import './App.css';

export default function App() {
  const url = 'http://localhost:3001/todos'
  const [value, setValue] = useState('New Task')

  const query = useQuery({ queryKey: ['todos'], queryFn: getTodoList })

  const queryClient = useQueryClient()

  async function getTodoList() {
    const { data } = await axios.get(url)
    return data
  }

  const addMutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(url, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: async ({id}) => {
      return await axios.delete(`${url}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return await axios.put(`${url}/${data.id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <h2>TODO LIST</h2>
      {query.data?.map((todo) => <table>
        <tr key={todo.id}><td>
        <input type="checkbox" 
          checked={todo.completed}
          onChange={() => {
            updateMutation.mutate({
              id: todo.id,
              completed: !todo.completed,
            })
          }}
        />
        </td><td>{todo.task}</td><td>
        <button
          onClick={() => {
            deleteMutation.mutate({
              id: todo.id,
            })
          }}
        > 
          Delete
        </button>
        <br /></td></tr>
      </table>)}
      <br />
      <input type='text' value = {value} onChange={(e) => setValue(e.target.value)}></input>
      <button onClick={() => {
          addMutation.mutate({
            task: value,
          })
        }}
      > 
        Add Todo
      </button>
    </div>
  )
}
