AFRAME.registerComponent('meshline', {
  schema: {
    lineWidth: {type: 'float', default:.05},
    path: {type:'array', default:[]},
    color: {type: 'color', default: 'black'}
  },
  
  init: function () {
    // Do something when component first attached.
    
    this.line = new MeshLine();
    this.createline(this.el, this.convertPathToVector3());
  },

  update: function () {
    // Do something when component's data is updated.
    this.updateLine(this.convertPathToVector3());
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
    
  createline: function(el, points){
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.line.setGeometry(geometry);
    this.line.setPoints(points);

    const material = new MeshLineMaterial({
      lineWidth:this.data.lineWidth,
      color:this.data.color
    });

    const mesh = new THREE.Mesh(this.line, material);
    mesh.raycast = this.line.raycast // enable raycaster

    el.setObject3D('mesh', mesh);    
  },

  updateLine: function(points){
    this.line.setPoints(points);
  },
  
  convertPathToVector3: function(){    
    let resp = [];
    
    for(let p of this.data.path){
      let vectors = p.split(' ');
      resp.push(new THREE.Vector3(vectors[0], vectors[1], vectors[2]));
    }
    
    return resp;
  }  
  
});
