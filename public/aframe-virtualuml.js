/////////////////////////////////////
// UML CLASS
/////////////////////////////////////

const UMLCLASS_SCALE_Y = .7;

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
    color: {type: 'color', default: 'orange'},
    position: {type: 'vec3', default: {x:0, y:0, z:0}},
    scale: {type: 'vec3', default: {x:1.5, y:UMLCLASS_SCALE_Y, z:.15}},
    association: {type:'array', default:[]},
    classname: {type: 'string', default: ''},
  },

  init: function () {
    // Do something when component first attached.

    this.self = this;
    this.class_name_element = null;
    this.class_box_element = null;

    this.originalscale = null;    // storage scale data

    this.self.createBox();
    this.self.createClassName();
    this.self.listenerElement();  // do something when change position
  },

  update: function () {
    // Do something when component's data is updated.
    this.self.setClassName();
    this.self.changeClassWidthAccordingClassName();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  // MY FUNCTIONS

  createBox: function(){
    this.class_box_element = document.createElement('a-box');

    this.class_box_element.setAttribute('id',this.data.id+'_box');
    this.class_box_element.setAttribute('color',this.data.color);
    this.class_box_element.setAttribute('position',this.data.position);
    this.class_box_element.setAttribute('scale',this.data.scale);

    this.el.appendChild(this.class_box_element);
  },

  setClassName: function(){
    this.class_name_element.setAttribute('value',this.data.classname);
  },

  createClassName: function(){
    this.class_name_element = document.createElement('a-text');

    this.class_name_element.setAttribute('value',this.data.classname);
    this.class_name_element.setAttribute('width',5);
    this.class_name_element.setAttribute('color','black');
    this.class_name_element.setAttribute('align','center');
    this.class_name_element.setAttribute('position',this.self.postionClassName());

    this.el.appendChild(this.class_name_element);
  },

  changeClassWidthAccordingClassName: function(){
    var qtdletters = this.data.classname.length;

    if(qtdletters > 9){
      var scale = this.class_box_element.getAttribute('scale');
      var new_x = qtdletters / 7;
      var newscale = {x:new_x, y:this.data.scale.y, z:this.data.scale.z};
      this.class_box_element.setAttribute('scale',this.self.vectorToString(newscale));
    }else{
      var newscale = {x:this.data.scale.x, y:this.data.scale.y, z:this.data.scale.z};
      this.class_box_element.setAttribute('scale',this.self.vectorToString(newscale));
    }
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
// ATTRIBUTES
/////////////////////////////////////

AFRAME.registerPrimitive('a-attribute',{
  defaultComponents: {'a-attribute-component':{}},
  mappings: {
    umlclass: 'a-attribute-component.umlclass'
  },
});

AFRAME.registerComponent('a-attribute-component', {
  schema: {
    umlclass: {type: 'string', default: ''}
  },

  init: function () {
    // Do something when component first attached.
    // console.log(this.self);
    this.self = this;
  },

  update: function () {
    // Do something when component's data is updated.
    
    this.self.createBox();
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

  createBox: function(){

    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);

        // do it something
        if(this.el.hasLoaded){
          routine();
        }else{
          this.el.addEventListener('loaded', function(){
            routine();
          });
        }
      }
    }, 100);


    const routine = () => {
      
      const umlclassposition = document.querySelector(this.data.umlclass).getAttribute('position');
      let pos_y = umlclassposition.y - (UMLCLASS_SCALE_Y * 2); // UMLCLASS_SCALE_Y is scale.y of the umlclass box

      const box = document.createElement('a-box');
      
      box.setAttribute('id',box.object3D.id);
      box.setAttribute('color','#fff');
      box.setAttribute('scale','1.5 2 .15');
      box.setAttribute('position', umlclassposition.x+' '+pos_y+' '+umlclassposition.z);   // position.y = (scale.y / 2) + .4
      this.el.appendChild(box);

      // console.log(this.el.object3D.position);
    }
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
    start: 'a-association-component.start', //class start
    end: 'a-association-component.end',    //class end
    start_pos: 'a-association-component.start_pos',
    end_pos: 'a-association-component.end_pos',
  },
});

AFRAME.registerComponent('a-association-component', {
  schema: {
    id: {type: 'string', default: ''},
    color: {type: 'color', default: 'black'},
    lineWidth: {type: 'number', default: .05},
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
    
    this.self.updateLine();
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
      this.el.setAttribute('meshline', this.self.createMeshlineAttributes(this.data.lineWidth, this.data.color, this.self.formatPathLine()));
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


