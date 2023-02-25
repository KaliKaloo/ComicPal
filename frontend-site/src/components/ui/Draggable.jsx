import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id:props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};
  
  return (
    
    <button className='flex-shrink-0' ref={setNodeRef} style={{...style, ...props.styles}} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}