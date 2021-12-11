function search() {
   const searchText = document.getElementById('searchText').value;
   const towns = document.getElementById('towns').children;
   let mathches = 0;

    Array.from(towns).map(el => {
        el.style.fontWeight = '';
        el.style.textDecoration = '';
    });

   Array.from(towns).map(el => {
       if(el.textContent.includes(searchText)) {
           mathches++;
           el.style.fontWeight = 'bold';
           el.style.textDecoration = 'underline';
       }
   });

   document.getElementById('result').textContent = `${mathches} matches found`
}
