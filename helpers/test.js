const fetchOneUE = require('./fetchOneUE');


async function test() {
  let ue = await fetchOneUE('MATH04');

  console.log(ue.semestre.split(' / ')[0]);
}

test();
