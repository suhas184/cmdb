App = {
  web3Provider: null,
  contracts: {},
  build1 : '',


  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');
      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-complete').attr('data-id', data[i].id);
        petTemplate.find('.status').attr('data-id', data[i].id);
        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
	   App.web3Provider = web3.currentProvider;
	} else {
	   App.web3Provider = Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
	var AdoptionArtifact = data;
    App.contracts.Adoption = TruffleContract(AdoptionArtifact);
	App.contracts.Adoption.setProvider(App.web3Provider);
	return App.markAdopted();
	});
    return App.bindEvents();
  },

  bindEvents: function() {
//    $(document).on('click', '.btn-adopt', App.handleChange);
    $(document).on('click', '.btn-complete', App.handleAdopt);
    $(document).on('click', '.btn-change', App.handleChange);
  //  $(document).on('click', '.btn-complete', App.handleAPI);
  },



  markAdopted: function(adopters, account) {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
         //adoptionInstance.setValue("SUCCESS");
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button[type=Submit]').text('Success').attr('disabled', true);
		}
	  }

	}).catch(function(err) {
	  console.log(err.message);
	});
	  },

/*
  handleAPI: function(event)  {
    event.preventDefault();
    var status;
    var adoptionInstance;
    var uId = parseInt($(event.target).data('id'));
    var url='';
    //var url2='';
    if(uId=="0"){
      url='http://localhost:8080/job/Component%201/lastBuild/api/json'
    }else if(uId=="1"){
        url='http://localhost:8080/job/Component%202/lastBuild/api/json'
      }
      else if(uId=="6"){
          url='http://localhost:8080/job/Component%202/lastBuild/api/json'
        }
    var build1=$.ajax({
      type: 'GET',
      url: url,
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
       console.log(build1.result);
       $("[data-id*='"+uId+"']").parent().find('label').html("Jenkins Build Name : " + build1.fullDisplayName + '<br\>' + "Jenkins Build Status : " + build1.result);
       //console.log(status);
       labelText = $("#myLabel[data-id*='"+uId+"']").text();
       //labelText = $("#myLabel").text();
       console.log(labelText);
      },
      error: function(build1) {
      alert('Bhoo')
      }
    });
  },

*/



  handleChange: function(event) {
    event.preventDefault();
    var uId = parseInt($(event.target).data('id'));
    if (uId == 0){
    console.log("you are first");
    var descriptionField = $("#textDescription[data-id*='"+uId+"']").val();
    var timeField = $("#timeDescription[data-id*='"+uId+"']").val();
    var newRAMField = $("#ramNew[data-id*='"+uId+"']").val();
    var oldRAMField = $("#ramOld[data-id*='"+uId+"']").val();
    // var a = "you are first";

    //$("[data-id*='"+uId+"']").parent().find('label').html(a);
    //$("#myDescription[data-id*='"+uId+"']").hide();
    $("#textDescription[data-id*='"+uId+"']").hide();
    $("#buttonDescription[data-id*='"+uId+"']").hide();
    $("#timeDescription[data-id*='"+uId+"']").hide();
    $("#ramNew[data-id*='"+uId+"']").hide();
    $("#ramOld[data-id*='"+uId+"']").hide();
    //$("#newRAM[data-id*='"+uId+"']").hide();
    //$("#oldRAM[data-id*='"+uId+"']").hide();
    //$("#myTime[data-id*='"+uId+"']").hide();
    //$("#myLabel[data-id*='"+uId+"']").html(descriptionField);
    //$("#myLabel[data-id*='"+uId+"']").html(timeField);
    console.log(descriptionField);
    console.log(timeField);
    console.log(newRAMField);
    console.log(oldRAMField);

    $("#myDescriptionPH[data-id*='"+uId+"']").html(descriptionField);
    $("#myTimePH[data-id*='"+uId+"']").html(timeField);
    $("#newRAMPH[data-id*='"+uId+"']").html(newRAMField);
    $("#oldRAMPH[data-id*='"+uId+"']").html(oldRAMField);

  }
  else if (uId == 1){
    console.log("you are second");
    var a = "you are second";
    $("[data-id*='"+uId+"']").parent().find('label').html(a);
  }
  else{
    console.log("you are third");
    var a = "you are third";
    $("[data-id*='"+uId+"']").parent().find('label').html(a);
  }
  },

  handleAdopt: function(event) {
    event.preventDefault();
    var petId = parseInt($(event.target).data('id'));
    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }
  var account = accounts[0];
  //App.contracts.Adoption.deployed().then(function(instance) {
  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;
    // Execute adopt as a transaction by sending account
    //return adoptionInstance.adopt(petId, $("#myLabel[data-id*='"+petId+"']").text() , {from: account});
    return adoptionInstance.changeRequest(petId, $("#myDescriptionPH[data-id*='"+petId+"']").text(), $("#myTimePH[data-id*='"+petId+"']").text(), $("#newRAMPH[data-id*='"+petId+"']").text(), $("#oldRAMPH[data-id*='"+petId+"']").text(), {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
