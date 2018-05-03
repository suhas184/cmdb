App = {
  web3Provider: null,
  contracts: {},

//init

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
    }
  );

      $.getJSON('../pets2.json', function(data) {
        var petsRow = $('#petsRow2');
        var petTemplate = $('#petTemplate2');
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
      }
    );
  //  });

    return App.initWeb3();
  },

//initweb3

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
	   App.web3Provider = web3.currentProvider;
	} else {
	   App.web3Provider = Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

// initContract

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
	var AdoptionArtifact = data;
    App.contracts.Adoption = TruffleContract(AdoptionArtifact);
	App.contracts.Adoption.setProvider(App.web3Provider);
	return App.markAdopted();
	});
    return App.bindEvents();
  },

// bindevents

  bindEvents: function() {
    $(document).on('click', '.btn-complete', App.handleAdopt);
    $(document).on('click', '.btn-change', App.handleChange);
  },

// markAdopted

  markAdopted: function(adopters, account) {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          // $('.panel-pet').eq(i).find('button[type=Submit]').text('Success').attr('disabled', true);
		}
	  }
	}).catch(function(err) {
	  console.log(err.message);
	});
	},

// handleChange

  handleChange: function(event) {
    event.preventDefault();
    var uId = parseInt($(event.target).data('id'));
    if (uId == 0){
    console.log("you are first");
    var descriptionField = $("#textDescription[data-id*='"+uId+"']").val();
    var timeField = $("#timeDescription[data-id*='"+uId+"']").val();
    var newRAMField = $("#ramNew[data-id*='"+uId+"']").val();
    var oldRAMField = $("#ramOld[data-id*='"+uId+"']").val();
    $("#textDescription[data-id*='"+uId+"']").hide();
    $("#buttonDescription[data-id*='"+uId+"']").hide();
    $("#timeDescription[data-id*='"+uId+"']").hide();
    $("#ramNew[data-id*='"+uId+"']").hide();
    $("#ramOld[data-id*='"+uId+"']").hide();

    console.log(descriptionField);
    console.log(timeField);
    console.log(newRAMField);
    console.log(oldRAMField);

    $("#myDescriptionPH[data-id*='"+uId+"']").html(descriptionField);
    $("#myTimePH[data-id*='"+uId+"']").html(timeField);
    $("#newRAMPH[data-id*='"+uId+"']").html(newRAMField);
    $("#oldRAMPH[data-id*='"+uId+"']").html(oldRAMField);

  }
},
/*
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
*/

//handleAdopt

  handleAdopt: function(event) {
    event.preventDefault();
    var petId = parseInt($(event.target).data('id'));
    //console.log(petId);
    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }
  var account = accounts[0];
    App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;
    //var test1 = $("#myDescriptionPH").text();
    //console.log(test1);
    //return adoptionInstance.changeRequest(petId, $("#myDescriptionPH[data-id*='"+petId+"']").text(), $("#myTimePH[data-id*='"+petId+"']").text(), $("#newRAMPH[data-id*='"+petId+"']").text(), $("#oldRAMPH[data-id*='"+petId+"']").text(), {from: account});
    return adoptionInstance.changeRequest(petId, $("#myDescriptionPH").text(), $("#myTimePH").text(), $("#newRAMPH").text(), $("#oldRAMPH").text(), {from: account});
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
