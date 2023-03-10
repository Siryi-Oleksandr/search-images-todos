import { useState } from 'react';

import { MdAddTask } from 'react-icons/md';
import { TodoBtn, InputTodo, TodoFormStyled } from './AddTodoForm.styled';

export function AddTodoForm({ onSubmit }) {
  const [todo, setTodo] = useState('');

  const handleSearch = evt => {
    setTodo(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const todo = form.elements.todo.value;
    onSubmit(todo);
    reset();
  };

  const reset = () => {
    setTodo('');
  };

  return (
    <TodoFormStyled onSubmit={handleSubmit}>
      <TodoBtn type="submit">
        <MdAddTask size="16px" />
      </TodoBtn>
      <InputTodo
        placeholder="Create new todo"
        name="todo"
        value={todo}
        onChange={handleSearch}
        required
        autoFocus
      />
    </TodoFormStyled>
  );
}
