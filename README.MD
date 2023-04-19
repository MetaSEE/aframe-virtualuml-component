# aframe-virtualuml-component
Make UML class diagrams to the Metaverse.

![](https://raw.githubusercontent.com/MetaSEE/aframe-virtualuml-component/master/example-virtualuml.png?token=GHSAT0AAAAAACBFEIEISSWCAVACKDNTWKLWZBY3PYQ)

Make sure you are using **A-Frame 1.4.0** or later and **lib/THREE.MeshLine.js**. Then just include virtualuml.min.js in your HTML:
```html
<script src="dist/virtualuml.min.js">
```
and add the **a-umlclass** and **a-association** components to create your UML class diagram:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Virtual UML</title>
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  <script src="lib/THREE.MeshLine.js"></script>
  <script src="dist/virtualuml.min.js"></script>
</head>
<body>
  <a-scene background="color: #FAFAFA">
    <a-camera position="0 .5 5"></a-camera>

    <!-- First, we created 3 UML classes: #firstclass, #secondclass, and #thirdclass  -->
    <a-umlclass
      id="firstclass"
      classname="First Class"
      position="0 2 0"
    ></a-umlclass>

    <a-umlclass
      id="secondclass"
      classname="Second Class"
      position="-2 0 0"
    ></a-umlclass>

    <a-umlclass
      id="thirdclass"
      classname="Third Class"
      position="2 0 0"
    ></a-umlclass>

    <!-- Now, we created the associations between UML classes -->
    <!-- This association connect #firstclass and #secondclass -->
    <a-association
      start="#firstclass"
      end="#secondclass"
    ></a-association>

    <!-- This association connect #firstclass and #thirdclass -->
    <a-association
      start="#firstclass"
      end="#thirdclass"
    ></a-association>
  </a-scene>
</body>
</html>
```
# Help and contact
Contribuitions, suggestions, and issues are welcomed. For any questions, contact by filran@gmail.com or [@filipe.arantes](https://www.instagram.com/filipe.arantes/) on Instagram. 