// Can't read in # of files in directory without nodeJS LOL
fetch('./static/files/data.txt')
.then(response => response.text())
.then(text => textFileData = text)
.then(() => main()
)
function main(){
  var score = 0;
  var setNumber = 0;
  console.log('HI!')
  let data = textFileData.split("\n");
  // Strip '$' and ',' symbols from the each data set
  for(let i = 0; i < 5; i++){
    data[6*i+4] = data[6*i+4].replaceAll("$", "");
    data[6*i+4] = data[6*i+4].replaceAll(",", "");
    data[6*i+4] = data[6*i+4].replaceAll("+", "");
  }
  rerender(setNumber);
  ///////////////////////////////
  // data[0] = # of images
  // data[1] = Address
  // data[2] = # of beds
  // data[3] = # of baths
  // data[4] = price
  // data[5] = area
  ///////////////////////////////
  function rerender(setNumber){
    var images = document.getElementsByTagName('img');
    while(images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
    }
    var headingDiv1 = document.getElementById("address");
    headingDiv1.innerHTML = "<H2>Address: "+data[6*setNumber+1]+"</H2>"
    var headingDiv2 = document.getElementById("beds");
    headingDiv2.innerHTML = "<H3># of beds: "+data[6*setNumber+2]+"</H3>"
    var headingDiv3 = document.getElementById("baths");
    headingDiv3.innerHTML = "<H3># of baths: "+data[6*setNumber+3]+"</H3>"
    var headingDiv4 = document.getElementById("area");
    headingDiv4.innerHTML = "<H3>Area: "+data[6*setNumber+5]+"</H3>"
    key = 'set'+setNumber;
    for (let i = 0; i < data[6*setNumber]; i++) {
      let img = document.createElement('img');
      img.style.display = "none";
      var source = dictionaryImages[key][i];
      img.setAttribute('src', source);
      img.setAttribute('id', i);
      document.getElementById("image").insertBefore(img, document.getElementById('data'))
    }
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
      if(currentSourceDisplayed == data[6*setNumber]-1){
        currentSourceDisplayed = 0;
      }else{
        currentSourceDisplayed += 1;
      }
      document.getElementById(currentSourceDisplayed).style.display = "block";
  });
  
  document.getElementById("decrement-button").addEventListener("click", event => {
    document.getElementById(currentSourceDisplayed).style.display = "none";
    if(currentSourceDisplayed == 0){
      currentSourceDisplayed = data[6*setNumber]-1;
    }else{
      currentSourceDisplayed -= 1;
    }
    document.getElementById(currentSourceDisplayed).style.display = "block";
  });

  document.getElementById("submit-button").addEventListener("click", event => {
    var input = document.getElementById("rawValue").innerText;
    console.log(input);
    var difference = Math.round(Math.abs(input.trim() - data[6*setNumber+4].trim()))
    var newScore = Math.round(1000*Math.pow(Math.E, -(difference/data[6*setNumber+4].trim())))
    score += newScore;
    console.log(score)
    let img = document.getElementById(currentSourceDisplayed)
    let price = document.getElementById("price");
    price.innerText = "Actual Price: " + data[6*setNumber+4];
    price.style.display = 'block'
    let newScore1 = document.getElementById("newscore");
    newScore1.innerText = "Score: " + newScore;
    newScore1.style.display = 'block'
    let totalScore1 = document.getElementById("totalscore");
    totalScore1.innerText = "Total score: " + score;
    totalScore1.style.display = 'block'
    if(newScore > 800){
      img.setAttribute('src', 'static/files/assets/good.jpg');
    }else if(newScore <= 800 && newScore >= 300){
      img.setAttribute('src', 'static/files/assets/bad.jpg');
    }else{
      img.setAttribute('src', 'static/files/assets/angry.gif');
    }
    var slider = document.getElementById("myRange");
    slider.setAttribute("value", 0);
    slider.setAttribute("max", 100)
    setTimeout(() => {
      price.style.display = 'none';
      newScore1.style.display = 'none';
      totalScore1.style.display = 'none';
      currentSourceDisplayed = 0;
      setNumber++;
      if(setNumber < 5){
        rerender(setNumber);
        document.getElementById(0).style.display = "block";
      }else{
        window.location.href = "./finished"
      }
    }, 5000);
  });

  var slider = document.getElementById("myRange");
  var output = document.getElementById("value");
  var rawOutput = document.getElementById("rawValue");

  output.innerHTML = "$" + Number(slider.value).toLocaleString('en-US');
  slider.oninput = function(){
    if(slider.value <= 50){
      output.innerHTML = "$" + (20000*slider.value).toLocaleString('en-US');
      rawOutput.innerHTML = (20000*slider.value);
    }else{
      output.innerHTML = "$" + (380000*slider.value - 18000000).toLocaleString('en-US');
      rawOutput.innerHTML = (380000*slider.value - 18000000);
    }  
  }
  var maxValue = document.getElementById("myRange").getAttribute("max")
  var x = 100*slider.value/maxValue;
  var color = 'linear-gradient(90deg, yellow ' + x + '%, gray ' + x + '%)';
  slider.style.background = color;
  slider.addEventListener("mousemove", function(){
    var maxValue = document.getElementById("myRange").getAttribute("max")
    var x = 100*slider.value/maxValue;
    var color = 'linear-gradient(90deg, yellow ' + x + '%, gray ' + x + '%)';
    slider.style.background = color;
  })
}