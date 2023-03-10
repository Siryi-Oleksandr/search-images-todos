import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleSearch = evt => {
    setSearch(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const search = form.elements.search.value;
    onSubmit(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        value={search}
        onChange={handleSearch}
        required
        autoFocus
      />
    </SearchFormStyled>
  );
}
