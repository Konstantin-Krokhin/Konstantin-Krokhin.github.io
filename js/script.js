const container = document.querySelector('.container');
const media = document.querySelector('.media');
const overlay = document.querySelector('.overlay');
const searchElem = document.querySelector('.form');

const getContent = (search) => {
  const url = new URL('https://itunes.apple.com/search');
  const params = { term: search, media: 'music', }
  url.search = new URLSearchParams(params);
  fetch(url, { method: 'GET'} )
    .then(results => results.json())
    .then(data => {
      results = data.results;
      const resultsHTML = results.map(
        (result, index) => `
          <div style="background-image: url(${result.artworkUrl100});" onclick="openMedia('${result.previewUrl}', '${result.trackCensoredName}')" class="result"></div> <div style = "width: 150px; height: 125px;margin-top: 30px"> <strong> ${result.trackName} </strong> <hr> <div> ${result.artistName} </div> </div> 
        `)
         .join('');

        container.innerHTML = resultsHTML;

        if (results.length > 0) document.getElementById("SongsNumber").innerHTML = results.length;
        return fetch(data.results[0].artistViewUrl)
      })

      .catch(() => container.innerHTML = '<h1>Sorry, no matches found</h1>');
      document.getElementById("SongsNumber").innerHTML = 0;
 }

const openMedia = (url, title) => {
  if (!url) return;
  media.innerHTML = `<audio controls autoplay src="${url}"></audio><p>${title}</p>`;
  media.classList.remove('hidden');
}

const closeMedia = () => {
  media.innerHTML = '';
  media.classList.add('hidden');
}

function enterpress()
{
    getContent(searchElem.value);
}

overlay.addEventListener('click', closeMedia);
searchElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') 
  {
    getContent(event.target.value);
  }
});

$(document).ready(function() {
    $('#example').DataTable( {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    } );
} );

/****************************************************************/