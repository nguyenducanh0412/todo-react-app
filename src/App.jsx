import { useEffect, useState } from "react";
import "./App.css";
import { KEY_TODO, LOCAL_STORAGE } from "./utils";
import { v4 as uuidv4 } from "uuid";
import AddTask from "./containers/AddTask";
import ListDetailTask from "./containers/ListDetailTask";
import CollapseItem from "./containers/ListDetailTask/CollapseItem";

function App() {
  const [datasource, setDatasource] = useState([]);

  useEffect(() => {
    const lcData = LOCAL_STORAGE.getItem(KEY_TODO);
    setDatasource(!lcData ? [] : JSON.parse(lcData));
  }, []);

  const handleSubmitItem = (item) => {
    const newItem = [...datasource, item];
    LOCAL_STORAGE.setItem(KEY_TODO, JSON.stringify(newItem));
    setDatasource(newItem);
  };

  const handleUpdateItem = (item) => {
    const findItem = [...datasource];
    findItem.forEach((v) => {
      if (v.id === item.id) {
        v.isChecked = item.isChecked;
      }
    });
    LOCAL_STORAGE.setItem(KEY_TODO, JSON.stringify(findItem));
    setDatasource(findItem);
  };

  const handleDeleteItem = (id) => {
    const findItem = [...JSON.parse(LOCAL_STORAGE.getItem(KEY_TODO))].filter((v) => v.id !== id);
    LOCAL_STORAGE.setItem(KEY_TODO, JSON.stringify(findItem));
    setDatasource(findItem);
  };

  const handleSearchItem = (e) => {
    if (e.target.value === "") {
      setDatasource(JSON.parse(LOCAL_STORAGE.getItem(KEY_TODO)));
      return;
    }
    const findItem = [...datasource].filter((v) =>
      v.taskTitle.toLowerCase().includes(e.target.value)
    );
    setDatasource(findItem);
  };

  const handleViewItem = (item) => {
    const newItem = [...datasource];
    newItem.forEach((v) => {
      if (v.id === item.id) {
        v.isDetail = !item.isDetail;
      }
    });
    setDatasource(newItem);
  };

  const handleUpdateDetail = (item) => {
    const findItem = [...JSON.parse(LOCAL_STORAGE.getItem(KEY_TODO))];
    findItem.forEach((v) => {
      if (v.id === item.id) {
        v.taskTitle = item.taskTitle;
        v.taskDescription = item.taskDescription;
        v.dueDate = item.dueDate;
        v.piority = item.piority;
        v.isChecked = item.isChecked;
      }
    });
    LOCAL_STORAGE.setItem(KEY_TODO, JSON.stringify(findItem));
    setDatasource(findItem);
  };

  const handleDeleteMultiple = (lstId) => {
    const findItem = [...JSON.parse(LOCAL_STORAGE.getItem(KEY_TODO))].filter(
      (v) => !lstId.includes(v.id)
    );
    LOCAL_STORAGE.setItem(KEY_TODO, JSON.stringify(findItem));
    setDatasource(findItem);
  };

  return (
    <div className="app-container">
      <AddTask onSubmit={handleSubmitItem} />
      {/* Listing */}
      <div className="list-task">
        <h4 className="title">To Do List</h4>
        <div className="form-content">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              onChange={handleSearchItem}
              placeholder="Search ..."
            />
          </div>
          <ListDetailTask
            datasource={datasource}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
            onDetail={handleViewItem}
            onUpdateDetail={handleUpdateDetail}
            key={uuidv4()}
          />
        </div>
        {datasource.some((v) => v.isChecked === true) && (
          <CollapseItem
            datasource={datasource}
            onDeleteMultiple={handleDeleteMultiple}
          />
        )}
      </div>
    </div>
  );
}

export default App;
