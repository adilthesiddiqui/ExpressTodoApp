const num = [2,4,5,6,78,9,]

function transform(i){
     return i*2;
}

const newArr = num.map(transform);
console.log(newArr);