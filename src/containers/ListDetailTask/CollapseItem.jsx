import React from "react";

function CollapseItem({ datasource, onDeleteMultiple }) {
  return (
    <div className="card-bottom">
      <div className="card-name">
        <label className="lb-bulk-action">Bulk Action:</label>
      </div>
      <div className="card-action">
        <button className="btn btn-info">Done</button>
        <button
          className="btn btn-danger"
          onClick={() =>
            onDeleteMultiple(
              datasource.filter((v) => v.isChecked === true).map((v) => v.id)
            )
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
}
export default CollapseItem;
