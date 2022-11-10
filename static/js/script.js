var score = 0;
var Info = {
  setNumber: 0,
  set changeSetNumber(setNumber){
    this.setNumber = setNumber;
  },
  get key(){
    return 'set'+this.setNumber
  },
  get addressInfo(){
    return dictionaryListingInfo['(\''+this.key+'\', \'address\')']
  },
  get bedsInfo(){
    return dictionaryListingInfo['(\''+this.key+'\', \'beds\')']
  },
  get bathsInfo(){
    return dictionaryListingInfo['(\''+this.key+'\', \'baths\')']
  },
  get areaInfo(){
    return dictionaryListingInfo['(\''+this.key+'\', \'area\')']
  },
  get priceInfo(){
    return dictionaryListingInfo['(\''+this.key+'\', \'price\')']
  }
}
console.log('Hi from JS!')

rerender();
function rerender(){
  var images = document.getElementsByTagName('img');
  while(images.length > 0) {
      images[0].parentNode.removeChild(images[0]);
  }
  var headingDiv1 = document.getElementById("address");
  headingDiv1.innerHTML = "<H2>Address: "+Info.addressInfo+"</H2>"
  var headingDiv2 = document.getElementById("beds");
  headingDiv2.innerHTML = "<H3># of beds: "+Info.bedsInfo+"</H3>"
  var headingDiv3 = document.getElementById("baths");
  headingDiv3.innerHTML = "<H3># of baths: "+Info.bathsInfo+"</H3>"
  var headingDiv4 = document.getElementById("area");
  headingDiv4.innerHTML = "<H3>Area: "+Info.areaInfo+"</H3>"
  for (let i = 0; i < dictionaryImages[Info.key].length; i++) {
    let img = document.createElement('img');
    img.style.display = "none";
    var source = dictionaryImages[Info.key][i];
    img.setAttribute('src', source);
    img.setAttribute('id', i);
    document.getElementById("image").insertBefore(img, document.getElementById('data'))
  }
}

document.getElementById(0).style.display = "block";
var currentSourceDisplayed = 0;

document.getElementById("increment-button").addEventListener("click", event => {
    document.getElementById(currentSourceDisplayed).style.display = "none";
    if(currentSourceDisplayed == dictionaryImages[Info.key].length-1){
      currentSourceDisplayed = 0;
    }else{
      currentSourceDisplayed += 1;
    }
    document.getElementById(currentSourceDisplayed).style.display = "block";
});

document.getElementById("decrement-button").addEventListener("click", event => {
  document.getElementById(currentSourceDisplayed).style.display = "none";
  if(currentSourceDisplayed == 0){
    currentSourceDisplayed = dictionaryImages[Info.key].length-1;
  }else{
    currentSourceDisplayed -= 1;
  }
  document.getElementById(currentSourceDisplayed).style.display = "block";
});

document.getElementById("submit-button").addEventListener("click", event => {
  var priceInfo = Info.priceInfo.replaceAll("$", "");
  priceInfo = priceInfo.replaceAll(",", "");
  priceInfo = priceInfo.replaceAll("+", "");
  var input = document.getElementById("rawValue").innerText;
  var difference = Math.round(Math.abs(input.trim() - priceInfo.trim()))
  var newScore = Math.round(1000*Math.pow(Math.E, -(difference/priceInfo.trim())))
  score += newScore;
  let img = document.getElementById(currentSourceDisplayed)
  let price = document.getElementById("price");
  price.innerText = "Actual Price: " + Info.priceInfo;
  price.style.display = 'block'
  let newScore1 = document.getElementById("newscore");
  newScore1.innerText = "Score: " + newScore;
  newScore1.style.display = 'block'
  let totalScore1 = document.getElementById("totalscore");
  totalScore1.innerText = "Total score: " + score;
  totalScore1.style.display = 'block'
  calculateResult(newScore, img);
  var slider = document.getElementById("myRange");
  slider.setAttribute("value", 0);
  slider.setAttribute("max", 100)
  setTimeout(() => {
    price.style.display = 'none';
    newScore1.style.display = 'none';
    totalScore1.style.display = 'none';
    currentSourceDisplayed = 0;
    Info.setNumber += 1;
    if(Info.setNumber < 5){
      rerender();
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
function calculateResult(newScore, img){
  if(newScore > 800){
    img.setAttribute('src', 'static/assets/good.jpg');
  }else if(newScore <= 800 && newScore >= 300){
    img.setAttribute('src', 'static/assets/neutral.jpg');
  }else{
    img.setAttribute('src', 'static/assets/angry.gif');
  }
}