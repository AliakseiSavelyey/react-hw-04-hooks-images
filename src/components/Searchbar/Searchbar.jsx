import PropTypes from 'prop-types';
import { SearchForm, SearchHeader, SearchFormInput, SearchFormButton } from './Searchbar.styled';
import {ReactComponent as AddSearch} from '../Icons/search 2 (1).svg'
import React, { useState } from 'react';


export function SearchBar ({ onSubmit }) {

  const [query, setQuery] = useState('');

  // Наблюдает за инпутом и пишет значние в стейт
  const handleChange = e => {
    setQuery( e.currentTarget.value );
  };

  // Наблюдает за отправкой и отдает значение во внешний компонент
  const handleSubmit = e => {
      e.preventDefault();
      // Запрещает отправку пустого инпута
      if (query === '') {
       
      }
      // Отдать данные внешнему компоненту
      onSubmit(query);
    
      reset();
    };
  
    const reset = () => {
      setQuery( '' );
    };
  
  return (

      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            < AddSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="query"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
        
      </SearchHeader>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
