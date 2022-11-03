// Can't read in # of files in directory without nodeJS LOL
fetch('data.txt')
  .then(response => response.text())
  .then(text => textFileData = text)
  .then(() => main()
  )
function main(){
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
    var imageArray = []
    for (let i = 0; i < data[6*setNumber]; i++) {
      let img = document.createElement('img');
      img.style.display = "none";
      var source = 'Images/set'+setNumber+'/'+i+'.jpg';
      imageArray.push(source)
      img.setAttribute('src', source);
      img.setAttribute('id', i);
      document.getElementById("image").appendChild(img);
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
    var input = document.getElementById("myRange").value;
    if(Math.abs(input.trim() - data[6*setNumber+4].trim()) <= 0.2*data[6*setNumber+4].trim())
    {
      console.log("CORRECT!!!!!")
      // let img = document.getElementById(currentSourceDisplayed)
      // img.setAttribute('src', 'assets/good.jpg');
      let img = document.getElementById(currentSourceDisplayed)
      img.style.display = 'none';
      let price = document.getElementById("price");
      price.innerText = "Actual Price: " + data[6*setNumber+4];
      price.style.display = 'block'
      // var source = 'Images/'+currentSourceDisplayed+'.jpg';
      document.body.style.backgroundImage="url(/assets/good.jpg)"
      setTimeout(() => { 
        document.body.style.backgroundImage="url(/assets/bg.jpg)";
        img.style.display = 'block';
        price.style.display = 'none';
        currentSourceDisplayed = 0;
        document.getElementById(0).style.display = "block";
    }, 2000);
    setNumber++;
    if(setNumber < 5){
      rerender(setNumber);
    }else{
      setNumber = 0;
      rerender(setNumber)
    }
    //   $.ajax({
    //     type: "GET",
    //     url: "/main.py",
    //     success: main
    // });


    }else{
      console.log("INCORRECT!!!!!")
      // let img = document.getElementById(currentSourceDisplayed)
      // img.setAttribute('src', 'assets/bad.jpg');

      // var source = 'Images/'+currentSourceDisplayed+'.jpg';
      document.body.style.backgroundImage="url(/assets/bad.jpg)"
      setTimeout(() => { document.body.style.backgroundImage="url(/assets/bg.jpg)" }, 2000);
    }
  });

  var slider = document.getElementById("myRange");
  var output = document.getElementById("value");

  output.innerHTML = "$" + Number(slider.value).toLocaleString('en-US');

  slider.oninput = function(){
    output.innerHTML = "$" + Number(this.value).toLocaleString('en-US');
  }

  slider.addEventListener("mousemove", function(){
    var maxValue = document.getElementById("myRange").getAttribute("max")
    var x = 100*slider.value/maxValue;
    var color = 'linear-gradient(90deg, yellow ' + x + '%, gray ' + x + '%)';
    slider.style.background = color;
  })
}