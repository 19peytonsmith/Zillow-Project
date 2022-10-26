// Can't read in # of files in directory without nodeJS LOL
fetch('data.txt')
  .then(response => response.text())
  .then(text => textFileData = text)
  .then(() => main()
  )
function main(){
  console.log('HI!')
  let data = textFileData.split("\n");
  // Strip '$' and ',' symbols from the price
  data[4] = data[4].replaceAll("$", "");
  data[4] = data[4].replaceAll(",", "");
  console.log(data[4])
  ///////////////////////////////
  // data[0] = # of images
  // data[1] = Address
  // data[2] = # of beds
  // data[3] = # of baths
  // data[4] = price
  // data[5] = area
  ///////////////////////////////
  var headingDiv1 = document.getElementById("address");
  headingDiv1.innerHTML = "<H1>Address: "+data[1]+"</H1>"
  var headingDiv2 = document.getElementById("beds");
  headingDiv2.innerHTML = "<H2># of beds: "+data[2]+"</H2>"
  var headingDiv3 = document.getElementById("baths");
  headingDiv3.innerHTML = "<H3># of baths: "+data[3]+"</H3>"
  var imageArray = []
  for (let i = 0; i < data[0]; i++) {
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
      if(currentSourceDisplayed == data[0]-1){
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
      currentSourceDisplayed = data[0]-1;
    }else{
      currentSourceDisplayed -= 1;
    }
    document.getElementById(currentSourceDisplayed).style.display = "block";
    console.log(currentSourceDisplayed);
  });

  document.getElementById("submit-button").addEventListener("click", event => {
    var input = document.getElementById("input").value;
    if(Math.abs(input.trim() - data[4].trim()) <= 0.2*data[4].trim())
    {
      console.log("CORRECT!!!!!")
      let img = document.getElementById(currentSourceDisplayed)
      img.setAttribute('src', 'assets/good.jpg');

      var source = 'Images/'+currentSourceDisplayed+'.jpg';
      setTimeout(() => { img.setAttribute('src', source) }, 2000);
    //   $.ajax({
    //     type: "GET",
    //     url: "/main.py",
    //     success: main
    // });

    }else{
      console.log("INCORRECT!!!!!")
      let img = document.getElementById(currentSourceDisplayed)
      img.setAttribute('src', 'assets/bad.jpg');

      var source = 'Images/'+currentSourceDisplayed+'.jpg';
      setTimeout(() => { img.setAttribute('src', source) }, 2000);
    }
  });
}