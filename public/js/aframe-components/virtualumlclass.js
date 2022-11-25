AFRAME.registerComponent('virtualumlclass', {
  schema: {
    associations: {type:'array', default:[]}
  },

  init: function () {
    // Do something when component first attached.

    var self = this;


  },

  update: function (oldData) {
    // Do something when component's data is updated.

    var self = this;

    if(this.data.associations.length > 0){
      // console.log(true);
      // console.log('old', oldData);
      // console.log('new', this.data);

      console.log(self.getAssociationElements());
    }else{
      // console.log(false);
    }

    if(this.el.hasLoaded){
      self.listenerElement(self.getAssociationElements());
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.

    
  },


  //MY FUNCTIONS --------------------------------------------------------------------------

  getAssociationElements: function(){
    const elements = [];
    for(var i=0; i<this.data.associations.length; i++){
      elements.push(document.querySelector(this.data.associations[i]));
    }
    return elements;
  },


  //observe when value attribute change
  // from: https://gwtrev.medium.com/run-code-when-an-elements-attribute-changes-b0cc1a2b184c
  listenerElement: function(associations){
    const mutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        //if position changes
        if( mutation.attributeName == "position" ){
          // console.log('old:', mutation.oldValue);
          // console.log('new:', mutation.target.getAttribute("position"));
          
          newposition = mutation.target.getAttribute("position");
      
          var id = '#'+this.el.getAttribute('id');

          for(var i=0; i < associations.length; i++){
            var ass = associations[i].getAttribute('associations');
            var assOrigin = ass.origin;
            var assDestination = ass.destination;
            var assOriginPosition = ass.positionorigin;
            var assDestinationPosition  = ass.positiondestination;

            if(id ===  assOrigin){
              //MUDAR LINHAAAAAAAAAAA
              // console.log('mudaaaaaa');

              associations[i].setAttribute('associations','origin:'+id+'; destination:'+assDestination+'; positionorigin:'+newposition.x+' '+newposition.y+' '+newposition.z+'; positiondestination:'+assDestinationPosition+';');

              // console.log('origin:'+id+'; destination:'+assDestination+'; positionorigin:'+newposition.x+' '+newposition.y+' '+newposition.z+'; positiondestination:'+assDestinationPosition+';');

            }else if (id ===  assDestination){
              //MUDAR LINHAAAAAAAAAAA
              // console.log('mudaaaaaa');
              // associations[i].setAttribute('associations', 'origin:'+assOrigin+'; destination:'+id);

              associations[i].setAttribute('associations','origin:'+assOrigin+'; destination:'+id+'; positionorigin:'+assOriginPosition+'; positiondestination:'+newposition.x+' '+newposition.y+' '+newposition.z+';');
            }
          }
        }   
      }
    }

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this.el, { attributes: true });
  }
});

