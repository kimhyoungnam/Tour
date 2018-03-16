
  document.querySelector('.sendData').addEventListener('click',function(){

    var email = document.forms[0].elements[0].value;
    var password= document.forms[0].elements[1].value;
    sendData('http://127.0.0.1:9999/login/form',email,password);
    });





  sendData = function(url,email,password){

  var data = {'email':email, 'password':password};
  data = JSON.stringify(data);
  console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.open('POST',url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(data);
  xhr.addEventListener('load',function(){
  var result = JSON.parse(xhr.responseText);
  console.log(result);
  });
  };
  
  
  