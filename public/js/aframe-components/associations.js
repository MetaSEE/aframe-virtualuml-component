AFRAME.registerComponent('associations', {
  schema: {
    type: {type:'string', default:'simple'},
    origin: {type:'string', default:''},
    destination: {type:'string', default:''}
  },

  init: function () {
    // Do something when component first attached.

    this.origin = '';
    this.destination= '';

    //FUNCTIONS
    this.vector3ToString = data => {
      return `${data.x},${data.y},${data.z}`;
    }
  },

  update: function () {
    // Do something when component's data is updated.

    if(this.data.origin && this.data.destination){
      this.origin = document.querySelector(this.data.origin);
      let originPosition = this.origin.getAttribute('position');
      
      this.destination = document.querySelector(this.data.destination);     
      let destinationPosition = this.destination.getAttribute('position');

      this.el.setAttribute('meshline','lineWidth: 20; color: black; path:'+this.vector3ToString(originPosition)+','+this.vector3ToString(destinationPosition));
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.


  }
});
