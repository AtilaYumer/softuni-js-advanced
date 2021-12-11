solve = (data, criteria) => {
    let cr = criteria === 'all' ? 'all' : criteria.split('-');

    JSON.parse(data).filter(e => {
        if (cr === 'all') {
            return true;
        } else {
            return e[cr[0]] === cr[1];
        }
    }).forEach((e, i) => {
        console.log(`${i}. ${e.first_name} ${e.last_name} - ${e.email}`);
    });
}

solve(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female')