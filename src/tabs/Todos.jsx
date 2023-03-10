import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, AddTodoForm, EditForm, Text, Todo } from 'components';

export function Todos() {
  const [todos, setTodos] = useState([]);

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
