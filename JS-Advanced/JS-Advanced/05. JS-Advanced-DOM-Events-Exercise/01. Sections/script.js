function create(words) {
   const divs = words.reduce((arr, word) => createDiv(arr, word),[])
   const content = document.getElementById('content');
   content.addEventListener('click', displayParagraph);
   divs.forEach(div => content.appendChild(div));

   function createDiv(arr, word) {
      const div = document.createElement('div');
      const paragraph = document.createElement('p');
      paragraph.style.display = 'none';
      paragraph.textContent = word;
      div.appendChild(paragraph)
      arr.push(div);
      return arr;
   }

   function displayParagraph(event) {
      event.target.firstElementChild.style.display = 'block';
   }
}