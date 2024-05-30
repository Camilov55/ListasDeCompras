import React, { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import {
  getListNames,
  getLists,
  createListName,
  createList,
  deleteListName,
  deleteList,
  updateList,
} from "../api/api";

const ListBuy = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const listNames = await getListNames();
    const lists = await getLists();
    const formattedLists = listNames.map((ln) => ({
      id: ln.id,
      title: ln.name,
      tasks: lists.filter((list) => list.listName === ln.id),
      totalPrice: lists
        .filter((list) => list.listName === ln.id)
        .reduce((acc, list) => acc + list.value, 0),
    }));
    setProducts(formattedLists);
  };

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (title === "") {
        setTitle(price);
        setPrice("");
      } 
      else {
        const [taskText, taskValue] = price.split(",");
        if (taskText && taskValue) {
          const value = parseInt(taskValue.trim(), 10);
          if (!isNaN(value)) {
            setProduct([
              ...product,
              { text: taskText.trim(), value, completed: false },
            ]);
            setTotalPrice(totalPrice + value);
          }
        }
        setPrice("");
      }
    }
  };

  const pressSave = async () => {
    if (title && product.length > 0) {
      const listName = await createListName(title);
      for (let task of product) {
        await createList(task.text, task.value, listName.id, task.completed);
      }
      setTitle("");
      setProduct([]);
      setPrice("");
      setTotalPrice(0);
      fetchLists();
    }
  };

  const pressDelete = async (setIndex) => {
    const listNameId = products[setIndex].id;
    await deleteListName(listNameId);
    fetchLists();
  };

  const pressDone = async (setIndex, taskIndex) => {
    const updatedTaskSets = [...products];
    const task = updatedTaskSets[setIndex].tasks[taskIndex];
    task.done = !task.done;

    // Actualiza el estado en el servidor
    await updateList(task.id, task.done);

    setProducts(updatedTaskSets);
  };

  return (
    <div className="flex flex-row h-screen font-serif">
      <div className="w-3/4 flex flex-col h-screen">
        <header className="h-40 flex justify-between flex-col">
          <div className="h-3/4 flex justify-center items-center">
            <input
              className="w-3/4 h-12 rounded-l-xl bg-slate-200 border-transparent pl-4 focus:outline-none"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyPress={pressEnter}
              placeholder="Ingrese el nombre de la compra y los productos"
            />
            <button
              className="bg-indigo-500 h-12 w-24 rounded-r-xl font-serif text-lg text-slate-100"
              onClick={pressSave}
            >
              Guardar
            </button>
          </div>
          <h1 className="text-xl text-blue-800 ml-24">Todas las listas</h1>
        </header>
        <section className="bg-slate-200 h-screen overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {products.map((set, setIndex) => (
              <div className="w-60" key={setIndex}>
                <div className="flex justify-between px-3 border border-indigo-500 rounded-t-xl">
                  <h3 className="text-blue-800">{set.title}</h3>
                  <button onClick={() => pressDelete(setIndex)}>
                    <MdOutlineClear className="text-indigo-500" />
                  </button>
                </div>
                <ul>
                  {set.tasks.map((task, taskIndex) => (
                    <li
                      className="flex px-3 border border-indigo-500 border-t-0"
                      key={taskIndex}
                    >
                      <input
                        className="flex-none"
                        type="checkbox"
                        checked={task.done}
                        onChange={() =>
                          pressDone(setIndex, taskIndex)
                        }
                      />
                      <span className="flex-1 ml-1">{task.name}</span>
                      <span className="flex-none w-14 flex justify-end">
                        ${task.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between px-3 border border-indigo-500 rounded-b-xl border-t-0">
                  <span>Precio total:</span>
                  <span>${set.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="w-1/4 bg-indigo-500 flex justify-center overflow-y-auto">
        <ul className="w-11/12 my-12">
          <h2 className="flex justify-center border border-white rounded-t-xl text-white">
            {title}
          </h2>

          {product.map((task, index) => (
            <li
              key={index}
              className="flex px-3 border border-white border-t-0"
            >
              <input
                type="checkbox"
                className="flex-none"
                checked={task.completed}
                onChange={() => {
                  const updatedTasks = [...product];
                  updatedTasks[index].completed =
                    !updatedTasks[index].completed;
                  setProduct(updatedTasks);
                }}
              />
              <span className="flex-1 ml-1">{task.text}</span>
              <span className="flex-none w-14 flex justify-end">
                ${task.value}
              </span>
            </li>
          ))}
          <div className="flex justify-between px-3 border border-white rounded-b-xl border-t-0">
            <span>Precio total</span>
            <span>${totalPrice}</span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ListBuy;
