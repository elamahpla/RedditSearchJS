import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById('limit').value;
  if(searchTerm === '') {
    showMessage('Please add a search term', 'alert-danger');
  }
  searchInput.value = '';
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      let output = `<div class="card-columns">`;
      results.forEach(post => {
        const image = post.preview ? post.preview.images[0].source.url : `https://lh3.googleusercontent.com/J41hsV2swVteoeB8pDhqbQR3H83NrEBFv2q_kYdq1xp9vsI1Gz9A9pzjcwX_JrZpPGsa=w300`;
        output += `
        <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-secondary">Score: ${post.score}</span>
          </div>
      </div>
      `;
      })
      output += `</div>`;
      document.getElementById('results').innerHTML = output;
    });
  event.preventDefault();
});

function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  searchContainer.insertBefore(div, search);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function truncateText(text, limit) {
  const shorthand = text.indexOf(' ', limit);
  if(shorthand == -1) return text;
  return text.substring(0, shorthand);
}