fetch('https://blog.noomstuff.com/latest.json')
  .then(response => response.json())
  .then(post => {
    document.querySelector('.blog.tile').innerHTML = `
      <div>
        <h6>${post.date}</h6>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <a href="${post.url}" class="button bottom">Read Post<i class="fa-solid fa-chevron-right"></i></a>
      </div>
      <figure>
        <img src="${post.thumbnail}" draggable="false">
      </figure>
    `;
  })
  .catch(console.error);