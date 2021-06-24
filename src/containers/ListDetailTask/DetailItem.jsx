import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";

function DetailItem({ item, onUpdateDetail }) {
  const initialValues = {
    taskTitle: item.taskTitle,
    taskDescription: item.taskDescription,
    dueDate: item.dueDate,
    piority: item.piority,
  };
  const yupSchema = Yup.object().shape({
    taskTitle: Yup.string().required("Task title is a required field."),
  });
  return (
    <div className="detail-task">
      <div className="form-content-detail">
        <Formik
          initialValues={initialValues}
          validationSchema={yupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onUpdateDetail({
              ...values,
              id: item.id,
              isChecked: item.isChecked,
              isDetail: item.isDetail,
            });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <Field
                  type="text"
                  name="taskTitle"
                  className="form-control"
                  placeholder="Task title ..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taskTitle}
                />
                <ErrorMessage
                  name="taskTitle"
                  component="div"
                  className="invalid-field"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <Field
                  as="textarea"
                  cols="30"
                  rows="6"
                  name="taskDescription"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taskDescription}
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Due Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="dueDate"
                    min={moment(new Date()).format("yyyy-MM-DD")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dueDate}
                  />
                </div>
                <div className="form-group">
                  <label>Piority</label>
                  <Field as="select" className="form-control" name="piority">
                    <option value="nomal">Nomal</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </Field>
                </div>
              </div>
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default DetailItem;
