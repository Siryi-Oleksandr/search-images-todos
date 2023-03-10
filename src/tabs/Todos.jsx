import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, AddTodoForm, Text, Todo } from 'components';

const LS_KEY = 'my-todos';

export function Todos() {
  let savedData = JSON.parse(window.localStorage.getItem(LS_KEY));
  const [todos, setTodos] = useState(savedData ?? []);

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const onAddTodo = newTodo => {
    setTodos(todos => [...todos, { id: nanoid(), text: newTodo }]);
  };

  const onDeleteTodo = todoId => {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  };

  const onEditTodo = (todoId, newText) => {
    setTodos(todos =>
      todos.map(todo => {
        if (todo.id === todoId) {
          return { id: todo.id, text: newText };
        }
        return todo;
      })
    );
  };

  return (
    <>
      <AddTodoForm onSubmit={onAddTodo} />
      <Grid>
        {todos.map(({ id, text }, ind) => (
          <GridItem key={id}>
            <Todo
              index={ind + 1}
              text={text}
              id={id}
              onDeleteTodo={onDeleteTodo}
              onEditTodo={onEditTodo}
            />
          </GridItem>
        ))}
      </Grid>
      {todos.length === 0 && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
}
