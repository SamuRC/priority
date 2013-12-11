favoritos = new Meteor.Collection("favoritos");
if (Meteor.isClient) {
  /*
  Template.hello.greeting = function () {
    return "Mis favoritos.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  */
  Template.categories.favoritos = function(){
    return favoritos.find({}, {sort: {Category: 1}});
  }

  //Vamos a declarar el flag 'adding_category'
  Session.set('adding_category', false);

  //Esto devuelve true si adding_category le ha asignado un valor de true
  Template.categories.new_cat = function(){
    return Session.equals('adding_category', true);
  }
  Template.categories.events({
    'click #btnNewCat': function(e,t){
      Session.set('adding_category', true);
      Meteor.flush();
      focusText(t.find("#add-category"));
    },
    'keyup #add-category': function(e,t){
      console.log(e.which)
      if(e.which === 13){
        var catVal = String(e.target.value || "");
        if (catVal){
          favoritos.insert({Category:catVal});
          Session.set('adding_category', false);
        }
      }
    },
    'focusout #add-category': function(e,t){
      Session.set('adding_category', false);
    }

  });
  //Funciones Helper genericas//
  function focusText(i){
    i.focus();
    i.select();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
