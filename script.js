// Can't read in # of files in directory without nodeJS LOL
fetch('length.txt')
  .then(response => response.text())
  .then(text => length = text)
  .then(() => main()
  )
function main(){
  var imageArray = []
  for (let i = 0; i < length; i++) {
    let img = document.createElement('img');
    img.style.display = "none";
    var source = 'Images/'+i+'.jpg';
    imageArray.push(source)
    img.setAttribute('src', source);
    img.setAttribute('id', i);
    document.body.appendChild(img);
    const target = document.querySelector('#decrement-button')
    target.parentNode.insertBefore(img, target)
  }
  
  // let btn = document.createElement('button');
  // btn.setAttribute('id', "decrement-button");
  // btn.setAttribute('class', "btn btn-1 btn-1e");
  // btn.setAttribute('value', "Previous");
  
  // let btn2 = document.createElement('button');
  // btn.setAttribute('id', "increment-button");
  // btn.setAttribute('class', "btn btn-1 btn-1e");
  // btn.setAttribute('value', "Next");
  
  // MAIN SCRIPT
  document.getElementById(0).style.display = "block";
  var currentSourceDisplayed = 0;
  
  document.getElementById("increment-button").addEventListener("click", event => {
      document.getElementById(currentSourceDisplayed).style.display = "none";
      if(currentSourceDisplayed == length-1){
        currentSourceDisplayed = 0;
      }else{
        currentSourceDisplayed += 1;
      }
      document.getElementById(currentSourceDisplayed).style.display = "block";
      console.log(currentSourceDisplayed);
  });
  
  document.getElementById("decrement-button").addEventListener("click", event => {
    document.getElementById(currentSourceDisplayed).style.display = "none";
    if(currentSourceDisplayed == 0){
      currentSourceDisplayed = length-1;
    }else{
      currentSourceDisplayed -= 1;
    }
    document.getElementById(currentSourceDisplayed).style.display = "block";
    console.log(currentSourceDisplayed);
  });
}