export default function fillArray(lastPage){
    const arr = []; 
    for (let i = 0; i < lastPage; i++){
      arr.push(i+1);
    }
    return arr; 
  }