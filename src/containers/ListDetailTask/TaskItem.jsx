import React from "react";
import DetailItem from "./DetailItem";

function TaskItem({ item, onUpdate, onDelete, onDetail, onUpdateDetail }) {
  return (
    <>
      <div className="card">
        <div className="card-name">
          <input
            type="checkbox"
            id={item.id}
            checked={item.isChecked}
            onChange={(e) =>
              onUpdate({
                ...item,
                isChecked: e.target.checked,
              })
            }
          />
          <label
            htmlFor={item.id}
            className={`${item.isChecked ? "checked" : ""} lb-title`}
          >
            {item.taskTitle}
          </label>
        </div>
        <div className="card-action">
          <button className="btn btn-info" onClick={() => onDetail(item)}>
            Detail
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
            Remove
          </button>
        </div>
      </div>
      {item.isDetail && <DetailItem item={item} onUpdateDetail={onUpdateDetail} />}
    </>
  );
}
export default TaskItem;
