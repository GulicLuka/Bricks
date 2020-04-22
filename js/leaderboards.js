var div;
var array = SortLocalStorage();
var j = 0;

function SortLocalStorage() {

  if(localStorage.length > 0){
    var localStorageArray = new Array();
    for (i=0;i<localStorage.length;i++){
      localStorageArray[i] = localStorage.getItem(localStorage.key(i)) + "," +localStorage.key(i);
    }
  }
  var sortedArray = localStorageArray.sort();
  return sortedArray;
}

console.log(array);

for(let i = array.length-1; i>-1;i--){
    j++;
    var arraySplit = array[i].split(',');
    console.log(arraySplit);
    div = document.createElement("div");
    div.className = 'blockLeader';
    div.innerHTML = "<span>"+j+".</span><span>"+/*localStorage.key(i)*/arraySplit[1]+"</span>"+"<span>Score: " + /*localStorage.getItem(localStorage.key(i))*/arraySplit[0]+"</span>";
    document.getElementById("showLeaderboards").appendChild(div);
}

//console.log(localStorage.getItem('luka'));

//console.log(localStorage.key(i)+" tocke: " + localStorage.getItem(localStorage.key(i)));