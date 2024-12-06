import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const fruits = [
  {
    id: '1',
    name: 'Apple',
  },
  {
    id: '2',
    name: 'Banana',
  },
  {
    id: '3',
    name: 'Mango',
  },
  {
    id: '4',
    name: 'Orange',
  },
  {
    id: '5',
    name: 'Jackfruit',
  },
]

function DragDropComponent() {
  const [fruitNames, updateFruitNames] = useState(fruits)

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(fruitNames)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateFruitNames(items)
  }

  return (
    <div className='App'>
      <h3>Drag & Drop in React</h3>
      <div className='underline'></div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <ul
              className='fruis'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {fruitNames.map(({ id, name, thumb }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DragDropComponent