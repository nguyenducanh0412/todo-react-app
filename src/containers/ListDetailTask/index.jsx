import React from "react";
import TaskItem from "./TaskItem";

function ListDetailTask({
  datasource,
  onUpdate,
  onDelete,
  onDetail,
  onUpdateDetail,
}) {
  return (
    <>
      {datasource &&
        datasource.map((item) => (
          <TaskItem
            item={item}
            key={item.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onDetail={onDetail}
            onUpdateDetail={onUpdateDetail}
          />
        ))}
    </>
  );
}
export default ListDetailTask;
