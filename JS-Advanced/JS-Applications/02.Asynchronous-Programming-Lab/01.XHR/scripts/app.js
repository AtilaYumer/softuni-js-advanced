function loadRepos() {
   let request = new XMLHttpRequest();
   const res = document.getElementById('res');
   request.addEventListener('readystatechange', function () {
      if (request.readyState === 4 && request.status === 200) {
         res.textContent = request.responseText;
      }
   });
   request.open('GET', 'https://api.github.com/users/testnakov/repos');
   request.send();
}