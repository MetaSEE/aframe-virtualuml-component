AFRAME.registerComponent('virtualumlclass', {
  schema: {
    position: {type: 'string', default:''},
    association: {type: 'array', default:[]},
    destination: {type: 'string', default:''}
  },

  init: function () {
    // Do something when component first attached.

    if(!this.data.position){
      this.data.position = this.el.getAttribute('position');
    }

    this.oldpositions = '';

    // FUNCTIONS
    this.changeOldPositions = () => {
      this.oldpositions = {
        x: this.el.getAttribute('position').x,
        y: this.el.getAttribute('position').y,
        z: this.el.getAttribute('position').z
      };  
    }

    this.vector3ToString = data => {
      return `${data.x} ${data.y} ${data.z}`;
    }

    this.returnMeshlinePath = (element, place) => {
      if(place=='origin'){
        if(element.getAttribute('meshline').path.length == 2){
          return element.getAttribute('meshline').path[0].x+' '+element.getAttribute('meshline').path[0].y+' '+element.getAttribute('meshline').path[0].z;
        }else{
          return element.getAttribute('meshline').path[0].x+' '+element.getAttribute('meshline').path[1].x+' '+element.getAttribute('meshline').path[2].x;
        }        
      }else if(place=='destination'){
        if(element.getAttribute('meshline').path.length == 2){
          return element.getAttribute('meshline').path[1].x+' '+element.getAttribute('meshline').path[1].y+' '+element.getAttribute('meshline').path[1].z;
        }else{
          return element.getAttribute('meshline').path[3].x+' '+element.getAttribute('meshline').path[4].x+' '+element.getAttribute('meshline').path[5].x;
        }          
      }
    }

  },

  update: function () {
    // Do something when component's data is updated.

    this.changeOldPositions();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.

    if(this.data.position.x !== this.oldpositions.x || this.data.position.y !== this.oldpositions.y || this.data.position.z !== this.oldpositions.z){

      //change meshline
      if(this.data.association){

        for(let i=0; i<this.data.association.length; i++){
          let meshline = document.querySelector(this.data.association[i]);

          //discovering if is origin or destination
          if( meshline.getAttribute('associations').origin === '#'+this.el.getAttribute('id') ){
  
            meshline.setAttribute('meshline','lineWidth: 20; color: black; path:'+this.vector3ToString(this.data.position)+', '+this.returnMeshlinePath(meshline,'destination'));
  
          }else{
            meshline.setAttribute('meshline','lineWidth: 20; color: black; path:'+this.returnMeshlinePath(meshline,'origin')+', '+this.vector3ToString(this.data.position));
          }
        }
      }

      this.changeOldPositions();
    }

  }
});


// "This value was evaluated upon first expanding. It may have changed since then."