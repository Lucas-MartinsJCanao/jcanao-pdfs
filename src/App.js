// import React from "react";
// import Navbar from "./components/AppBar";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
// import Stack from "@mui/material/Stack";
// import DropFileInput from "./components/drop-file-input";
// import "./App.css";
// function App() {
//   return (
//     <>
//       <Navbar />
//       <div>
//         <div
//           className="pdfContainer"
//           style={{
//             margin: "auto",
//             width: "50%",
//             marginTop: "10%",
//             borderRadius: "10px",
//             boxShadow: "0 0 10px 0 rgba(0,0,0.2,0.2)",
//             padding: "20px",
//             backgroundColor: "white",
//           }}
//         ></div>
//         <div
//           style={{
//             margin: "auto",
//             width: "50%",
//             marginTop: "2%",
//           }}
//         >
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" endIcon={<SendIcon />}>
//               Send
//             </Button>
//           </Stack>
//         </div>
//       </div>

//       <div className="box">
//         <DropFileInput />
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { useForm } from "react-hook-form";

function App() {
  const [pdf, setPdf] = useState(null);
  const [fields, setFields] = useState([]);

  const { register, handleSubmit } = useForm();

  function handleFileChange(event) {
    setPdf(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  async function parsePDF() {
    const existingPdfBytes = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    const pdfFields = form.getFields();
    setFields(pdfFields);
  }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={parsePDF}>Parse PDF</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index}>
            <label>{field.getName()}</label>
            <input type="text" {...register(field.getName())} />
          </div>
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
