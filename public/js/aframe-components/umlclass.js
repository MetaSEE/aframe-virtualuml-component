/////////////////////////////////////
// UML CLASS
/////////////////////////////////////

AFRAME.registerPrimitive('a-umlclass',{
  defaultComponents: {
    'a-umlclass-component': {},
  },
  
  mappings: {
    id: 'a-umlclass-component.id',
    color: 'a-umlclass-component.color',
    association: 'a-umlclass-component.association',
    classname: 'a-umlclass-component.classname',
  }
});

AFRAME.registerComponent('a-umlclass-component', {
  schema: {
    id: {type: 'string', default: ''},
    color: {type: 'color', default: 'gray'},
    position: {type: 'vec3', default: {x:0, y:0, z:0}},
    scale: {type: 'vec3', default: {x:1.5, y:.8, z:.15}},
    association: {type:'array', default:[]},
    classname: {type: 'string', default: ''},
  },

  init: function () {
    // Do something when component first attached.

    this.self = this;

    this.self.createBox();
    this.self.createClassName();
    this.self.listenerElement();  // do something when change position
  },

  update: function () {
    // Do something when component's data is updated.

    this.self.setClassName();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  // MY FUNCTIONS

  createBox: function(){
    const box = document.createElement('a-box');

    box.setAttribute('id',this.data.id+'_box');
    box.setAttribute('color',this.data.color);
    box.setAttribute('position',this.data.position);
    box.setAttribute('scale',this.data.scale);

    this.el.appendChild(box);
  },

  setClassName: function(){
    const children = this.el.childNodes;

    for(var i=0; i<children.length; i++){
      if( children[i].tagName === 'A-TEXT' ){
        children[i].setAttribute('value',this.data.classname);
      }
    }
  },

  createClassName: function(){
    const classname = document.createElement('a-text');

    classname.setAttribute('value',this.data.classname);
    classname.setAttribute('width',5);
    classname.setAttribute('color','black');
    classname.setAttribute('align','center');
    classname.setAttribute('position',this.self.postionClassName());

    this.el.appendChild(classname);
  },

  postionClassName: function(){
    return {x:this.data.position.x, y:this.data.position.y, z:parseInt(this.data.position.z)+this.data.scale.z*.5};
  },

  vectorToString: function(vector){
    return vector.x+' '+vector.y+' '+vector.z;
  },

  listenerElement: function(){
    const mutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        //if position changes
        if( mutation.attributeName == "position" ){
          // console.log('old:', mutation.oldValue);
          // console.log('new:', mutation.target.getAttribute("position"));
          var newposition = mutation.target.getAttribute("position");

          //step 1 - identificar o elemento a-association
          for(var i=0; i < this.data.association.length; i++){
            var ass_id = this.data.association[i];
            var ass_el = document.querySelector(ass_id);
            var ass_start = document.querySelector(ass_id).getAttribute('start');
            var ass_end = document.querySelector(ass_id).getAttribute('end');

            //step 2 - descrobrir se este elemento é start ou end
            if('#'+this.data.id === ass_start){
              //step 3 - mudar o path do elemento a-association identificado
              ass_el.setAttribute('start_pos',this.self.vectorToString(newposition));
            }else if('#'+this.data.id === ass_end){
              //step 3 - mudar o path do elemento a-association identificado
              ass_el.setAttribute('end_pos',this.self.vectorToString(newposition));
            }
          }
          // console.log('mudou position',mutation.target.getAttribute("position"));
        }   
      }
    }

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this.el, { attributes: true });
  }
});


/////////////////////////////////////
// ASSOCIACION
/////////////////////////////////////

AFRAME.registerPrimitive('a-association',{
  defaultComponents: {
    'a-association-component': {},
  },

  mappings: {
    id: 'a-association-component.id',
    start: 'a-association-component.start',
    end: 'a-association-component.end',
    start_pos: 'a-association-component.start_pos',
    end_pos: 'a-association-component.end_pos',
  },
});

AFRAME.registerComponent('a-association-component', {
  schema: {
    id: {type: 'string', default: ''},
    color: {type: 'color', default: 'black'},
    lineWidth: {type: 'number', default: 8},
    start: {type: 'selector', default:null},
    end: {type: 'selector', default:null},
    start_pos: {type:'vec3', default: undefined},
    end_pos: {type:'vec3', default: undefined},
  },

  init: function () {
    // Do something when component first attached.

    this.self = this;
    this.olddata = [];
    // this.start_position = null;   // save starts position
    // this.end_position = null;     // save ends position

    this.self.createLine();
  },

  update: function (oldData) {
    // Do something when component's data is updated.
    this.olddata.push(oldData);

    if(this.olddata.length > 3){
      this.self.updateLine();
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  createLine: function(){
    if(this.data.start){
      this.el.setAttribute('start_pos',this.self.formatPositions(this.data.start));
    }

    if(this.data.end){
      this.el.setAttribute('end_pos',this.self.formatPositions(this.data.end));
    }

    if(this.data.start && this.data.end){
      this.el.setAttribute('meshline',this.self.createMeshlineAttributes(this.data.lineWidth, this.data.color, this.self.formatPathLine()));
    }
    
  },

  updateLine: function(){
    // this.el.setAttribute('start',this.self.formatPositions(this.data.start));
    // this.el.setAttribute('end',this.self.formatPositions(this.data.end));
    this.el.setAttribute('start_pos',this.self.formatPositions(this.data.start));
    this.el.setAttribute('end_pos',this.self.formatPositions(this.data.end));
    this.el.setAttribute('meshline',this.self.createMeshlineAttributes(this.data.lineWidth, this.data.color, this.self.formatPathLine()));
  },

  createMeshlineAttributes: function(lineWidth=this.data.lineWidth, color=this.data.color, path){
    return 'lineWidth:'+lineWidth+'; color:'+color+'; path:'+path+';';
  },

  setPathLine: function(){
    if(this.data.start && this.data.end){
      this.start_position = this.data.start.getAttribute('position');   
      this.end_position = this.data.end.getAttribute('position');   
    }
  },

  formatPathLine: function(){
    const start_el = this.data.start.getAttribute('position');   
    const end_el = this.data.end.getAttribute('position');   

    const start_pos = start_el.x+' '+start_el.y+' '+start_el.z;
    const end_pos = end_el.x+' '+end_el.y+' '+end_el.z;

    // return start_pos+','+end_pos;

    return this.self.formatPositions(this.data.start)+','+this.self.formatPositions(this.data.end);
  },

  formatPositions: function(element){
    if( element.hasLoaded ){
      const pos = element.getAttribute('position');
      return pos.x+' '+pos.y+' '+pos.z;
    }
  }
});
