"use client"

import clss from './page.module.css'
import React from "react";
import { TypeBoard, TypeCard } from './type';
import { getTodos } from './getItems';

export default function Home() {
  const [currentBoard, setCurrentBoard] = React.useState<TypeBoard | undefined>()
  const [currentItem, setCurrentItem] = React.useState<TypeCard | undefined>()

  const [boards, setBoards] = React.useState<TypeBoard[]>([
    {id: "1", title: 'Сделать', items: []},
    {id: "2", title: 'Проверить', items: []},
    {id: "3", title: 'Сделано', items: []},
  ])

  function dragEndHandler(): void {}
  function dragLeaveHandler(): void{}

  function dragStartHandler(item: TypeCard, board: TypeBoard): void {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragOverHandler(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault()
  }

  function dropCardHandler (board: TypeBoard){
    board.items.push(currentItem!)
    const currentIndex = currentBoard?.items.indexOf(currentItem!)
    currentBoard!.items.splice(currentIndex!, 1)

    setBoards(boards.map((elem: TypeBoard) => {
      elem.id === board.id && board
      return elem
    }))
  }

  React.useEffect(() =>{
    getTodos().then((text) => setBoards(text))
  },[])

  return (
    <div className={clss.app}>
      {boards.map((board: TypeBoard) => 
        <div 
          className={clss.board}
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={() => dropCardHandler(board)}
          key={board.id}
        >
          <div 
            className={clss.board__title}
            key={board.id}
          >
            {board.title}
          </div>

          {board.items.map(item =>
            <div 
              className={clss.item}
              draggable={true}
              onDragStart={() => dragStartHandler(item, board)}
              onDragEnd={() => dragEndHandler()}
              onDragOver={(event) => dragOverHandler(event)}
              onDragLeave={() => dragLeaveHandler()}
              key={item.id}
            >
              {item.title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
