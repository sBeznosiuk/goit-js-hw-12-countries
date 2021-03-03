import './styles.css';
import countriesTemplate from './templates/countriesTemplate.hbs';
import smallListTemplate from './templates/smallListTemplate.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

const inputRef = document.querySelector('#input');
const divRef = document.querySelector('#div');

inputRef.addEventListener(
  'input',
  debounce(e => fet(e.target.value), 500),
);

function fet(query) {
  return fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(res => res.json())
    .then(updateMarkup);
}

function updateMarkup(data) {
  console.log(data);

  if (data.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 1000,
    });
  }
  if (data.length >= 2 && data.length <= 10) {
    const markup = smallListTemplate(data);
    console.log(markup);
    divRef.innerHTML = markup;
    console.log(smallListTemplate);
  }

  if (data.length === 1) {
    const markup = countriesTemplate(data);
    divRef.innerHTML = markup;
  }
  if (!data.length) {
    divRef.innerHTML = '';
  }
}
