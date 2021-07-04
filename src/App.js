import React,{ useState } from 'react'
import './App.css'

const App = ()=>{

  const [boxes,setBoxes] = useState( [
    { id: 1, name: "BOX1", color: "red" },
    { id: 2, name: "BOX2", color: "green" },
    { id: 3, name: "BOX3", color: "blue" },
    { id: 4, name: "BOX4", color: "orange" },
    { id: 5, name: "BOX5", color: "pink" },
    { id: 6, name: "BOX6", color: "yellow" }
  ])

  const handleDragStart = data => event => {
    let fromBox = JSON.stringify({ id: data.id });
    event.dataTransfer.setData("dragContent", fromBox);
  };

  const handleDragOver = data => event => {
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };

  const handleDrop = data => event => {
    event.preventDefault();
  
    let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toBox = { id: data.id };
  
    swapBoxes(fromBox, toBox);
    return false;
  };

  const swapBoxes = (fromBox, toBox) => {
    let tempboxes = boxes.slice();
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < tempboxes.length; i++) {
      if (tempboxes[i].id === fromBox.id) {
        fromIndex = i;
      }
      if (tempboxes[i].id === toBox.id) {
        toIndex = i;
      }
    }
    if (fromIndex !== -1 && toIndex !== -1) {
      let { fromId, ...fromRest } = tempboxes[fromIndex];
      let { toId, ...toRest } = tempboxes[toIndex];
      tempboxes[fromIndex] = { id: fromBox.id, ...toRest };
      tempboxes[toIndex] = { id: toBox.id, ...fromRest };

      setBoxes(tempboxes)
    }
  };

  React.useEffect(()=>{

  },[boxes])

  return( 
    <div className="boxGroup">
  {boxes.map((box)=>{
    return(
      <div key={box.id}
      draggable="true"
      onDragStart={handleDragStart({id:box.id})}
      onDragOver={handleDragOver({id:box.id})}
      onDrop={handleDrop({id:box.id})}
      className="box">
        <div className="content">{box.name}</div>
      </div>
    )
  })}
  </div>
  )
}

export default App;