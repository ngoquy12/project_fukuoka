import React from "react";
import { useParams } from "react-router-dom";

export default function FormEmployee({ mode }) {
  console.log("Mode: ", mode);

  const { id } = useParams();

  console.log("Id: ", id);

  return (
    <div>
      <h3>{id ? "Form cập nhật nhân viên" : "Form thêm mới nhân viên"}</h3>
    </div>
  );
}
