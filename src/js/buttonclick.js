function UserAction() {
  var component1;
  var component2;
  var build1result;
  var build2result;
  var build1=$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/job/Sample/lastBuild/api/json',
    dataType: 'json',
    async: false,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    headers: {
      "Authorization": "Basic " + btoa("admin" + ":" + "admin")
   },
    success: function(build1) {
     //status = data.result;
     //alert('Jenkins Status' + ': ' + data.result + '\n' + 'URL' + ':' + data.url);
     //console.log(status);
     //console.log(build1);
     build1result = build1;
     //alert(build1.result);
    },
  //  beforeSend: function(xhr){
    //  xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    //},
    error: function(build1) {
    alert('Bhoo')
    }
  });

  var build2=$.ajax({
    type: 'GET',
    url: 'http://localhost:8080/job/TEst/lastBuild/api/json',
    dataType: 'json',
    async: false,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    headers: {
      "Authorization": "Basic " + btoa("admin" + ":" + "admin")
   },
    success: function(build2) {
     build2result = build2;
    },
    error: function(build2) {
    alert('Bhoo')
    }
  });
component1 = ('UI Status' + ':' + build1result.result);
component2 = ('Database Status' + ':'  + build2result.result);
console.log(status);
document.getElementById("component1").innerHTML = component1;
document.getElementById("component2").innerHTML = component2;
//document.write

};
