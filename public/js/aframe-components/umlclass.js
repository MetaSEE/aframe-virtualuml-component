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
  }
});

AFRAME.registerComponent('a-umlclass-component', {
  schema: {
    id: {type: 'string', default: ''},
    color: {type: 'color', default: 'gray'},
    position: {type: 'vec3', default: {x:0, y:0, z:0}},
    scale: {type: 'vec3', default: {x:1.5, y:.8, z:.15}},
  },

  init: function () {
    // Do something when component first attached.

    this.self = this;

    this.self.createBox();
    this.self.createClassName();
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  createBox: function(){
    const box = document.createElement('a-box');

    box.setAttribute('id',this.data.id+'_box');
    box.setAttribute('color',this.data.color);
    box.setAttribute('position',this.data.position);
    box.setAttribute('scale',this.data.scale);

    this.el.appendChild(box);
  },

  // MY FUNCTIONS

  createClassName: function(){
    const classname = document.createElement('a-text');

    classname.setAttribute('value',this.data.id+' Class');
    classname.setAttribute('width',5);
    classname.setAttribute('color','black');
    classname.setAttribute('align','center');
    classname.setAttribute('position',this.self.postionClassName());

    console.log();

    this.el.appendChild(classname);
  },

  postionClassName: function(){
    return {x:this.data.position.x, y:this.data.position.y, z:parseInt(this.data.position.z)+this.data.scale.z*.5};
  },
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
  },
});

AFRAME.registerComponent('a-association-component', {
  schema: {
    id: {type: 'string', default: ''},
    color: {type: 'color', default: 'black'},
    lineWidth: {type: 'number', default: 8},
    start: {type: 'selector', default:null},
    end: {type: 'selector', default:null},
  },

  init: function () {
    // Do something when component first attached.

    this.self = this;
    // this.start_position = null;   // save starts position
    // this.end_position = null;     // save ends position

    this.self.createLine();
    this.self.setPathLine();
  },

  update: function () {
    // Do something when component's data is updated.

    
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  createLine: function(){
    this.el.setAttribute('meshline',this.self.createMeshlineAttributes(this.data.lineWidth, this.data.color, this.self.formatPathLine()));
  },

  createMeshlineAttributes: function(
    lineWidth=this.data.lineWidth,
    color=this.data.color,
    path
  ){
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

    return start_pos+','+end_pos;
  }
});
