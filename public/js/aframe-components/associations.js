AFRAME.registerComponent('associations', {
  schema: {
    origin: {type:'string', default:''},
    destination: {type:'string', default:''},
    positionorigin: {type:'array', default:[]},
    positiondestination: {type:'array', default:[]},
  },

  init: function () {
    // Do something when component first attached.
  },

  update: function (oldData) {
    // Do something when component's data is updated.

    var self = this;

    if(this.data.origin !== '' && this.data.destination !== ''){
      //test
      // console.assert(this.data.origin === '#class1', true);
      // console.assert(this.data.destination === '#class2', true);

      self.addMeshline(self.getPositions(this.data.origin), self.getPositions(this.data.destination));
    }

    if(this.data.positionorigin.length > 0 && this.data.positiondestination.length > 0){
      self.addMeshline(self.getPositionsArray(this.data.positionorigin), self.getPositionsArray(this.data.positiondestination));
    }

    // console.log('changed');
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  //MY FUNCTIONS
  getPositions: function(element){
    const positions = document.querySelector(element).getAttribute('position');
    return positions.x+' '+positions.y+' '+positions.z;
  }, 

  getPositionsArray: function(element){
    return element[0]+' '+element[1]+' '+element[2];
  },

  addMeshline: function(posOrigin, posDestination){
    this.el.setAttribute('meshline','lineWidth:20; color:black; path:'+posOrigin+','+posDestination);
  }
});
