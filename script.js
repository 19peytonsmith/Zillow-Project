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
  headingDiv1.innerHTML = "<H2>Address: "+data[1]+"</H2>"
  var headingDiv2 = document.getElementById("beds");
  headingDiv2.innerHTML = "<H3># of beds: "+data[2]+"</H3>"
  var headingDiv3 = document.getElementById("baths");
  headingDiv3.innerHTML = "<H3># of baths: "+data[3]+"</H3>"
  var headingDiv4 = document.getElementById("area");
  headingDiv4.innerHTML = "<H3>Area: "+data[5]+"</H3>"
  var imageArray = []
  for (let i = 0; i < data[0]; i++) {
    let img = document.createElement('img');
    img.style.display = "none";
    var source = 'Images/'+i+'.jpg';
    imageArray.push(source)
    img.setAttribute('src', source);
    img.setAttribute('id', i);
    document.getElementById("image").appendChild(img);
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
    var input = document.getElementById("myRange").value;
    console.log(input)
    if(Math.abs(input.trim() - data[4].trim()) <= 0.2*data[4].trim())
    {
      console.log("CORRECT!!!!!")
      // let img = document.getElementById(currentSourceDisplayed)
      // img.setAttribute('src', 'assets/good.jpg');
      let img = document.getElementById(currentSourceDisplayed)
      img.style.display = 'none';
      let price = document.getElementById("price");
      price.innerText = "Actual Price: " + data[4];
      price.style.display = 'block'
      // var source = 'Images/'+currentSourceDisplayed+'.jpg';
      document.body.style.backgroundImage="url(/assets/good.jpg)"
      setTimeout(() => { 
        document.body.style.backgroundImage="url(/assets/bg.jpg)";
    }, 2000000);
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
    console.log(x)
    var color = 'linear-gradient(90deg, yellow ' + x + '%, gray ' + x + '%)';
    slider.style.background = color;
  })
}