App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
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

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

App = {  
  web3Provider: null,  
  contracts: {},  
  
  initWeb3: async function() {  
    // Modern dapp browsers...  
    if (window.ethereum) {  
      App.web3Provider = window.ethereum;  
      try {  
        // Request account access  
        await window.ethereum.enable();  
      } catch (error) {  
        // User denied account access...  
        console.error("User denied account access")  
      }  
    }  
    // Legacy dapp browsers...  
    else if (window.web3) {  
      App.web3Provider = window.web3.currentProvider;  
    }  
    // If no injected web3 instance is detected, fall back to Ganache  
    else {  
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');  
    }  
    // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');  
    web3 = new Web3(App.web3Provider);  
  
    return App.initContract();  
  },  

initContract: function() {  
    $.getJSON('news.json', function(data) {  
      // Get the necessary contract artifact file and instantiate it with truffle-contract  
      App.contracts.news = TruffleContract(data);  
      
      // Set the provider for our contract  
      App.contracts.news.setProvider(App.web3Provider);  
      
      // Use our contract to retrieve and mark the adopted pets  
      // return App.markAdopted();  
      return App.init();  
  
    });  
  
    // return App.bindEvents();  
      return App.AddNewsButton();  
  
  },  

AddNewsButton: function() {  
    $(document).on('click', '.addNews', App.AddNews);  
  },  
  AddNews:function(event){  
    var post = document.getElementById('post').value  
    var postInstance;  
    App.contracts.news.deployed().then(function(instance){  
      postInstance = instance;  
      return postInstance.addnews(post);  
    });   
    console.log("News posted");  
  },  
};  

  init: async function() {  
    // Load Products.  
    var postInstance;  
  
    App.contracts.news.deployed().then(function(instance){  
      postInstance = instance;  
      return postInstance.newsCount();  
    }).then(function(result){  
  
      var counts = result.c[0];  
      console.log("Total News : "+counts);  
  
      for (var i = 1; i <= counts; i ++) {  
        postInstance.newsfeeds(i).then(function(result)  
        {  
          console.log("Publisher Address:" +result[0]);  
          console.log("News:" +result[1]);  
  
          var newsRow = $('#newsRow');  
          var postTemplate = $('#postTemplate');  
  
          postTemplate.find('.panel-title').text(result[0]);  
          postTemplate.find('.desc').text(result[1]);  
          newsRow.append(postTemplate.html());  
         });  
      }  
    });   
},