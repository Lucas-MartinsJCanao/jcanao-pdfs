//drag and drop element

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

// export default App;

// test code download mas sem info dentro do pdf

// import React, { useState } from "react";
// import { PDFDocument } from "pdf-lib";
// import { useForm } from "react-hook-form";

// function App() {
//   const [pdf, setPdf] = useState(null);
//   const [fields, setFields] = useState([]);
//   const [completedPdf, setCompletedPdf] = useState(null);

//   const { register, handleSubmit } = useForm();

//   function handleFileChange(event) {
//     setPdf(event.target.files[0]);
//     console.log(event.target.files[0]);
//   }

//   async function parsePDF() {
//     const existingPdfBytes = await pdf.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const form = pdfDoc.getForm();
//     const pdfFields = form.getFields();
//     setFields(pdfFields);
//   }

//   // async function onSubmit(formData) {
//   //   const existingPdfBytes = await pdf.arrayBuffer();
//   //   const pdfDoc = await PDFDocument.load(existingPdfBytes);
//   //   const form = pdfDoc.getForm();

//   //   console.log("Form Data: ", formData);

//   //   for (const fieldName in formData) {
//   //     console.log("Setting value for field: ", fieldName);

//   //     const field = form.getField(fieldName);
//   //     if (field && typeof field.setValue === "function") {
//   //       await field.setValue(formData[fieldName]);
//   //       console.log("Value set: ", formData[fieldName]);
//   //     } else {
//   //       console.log("Field not found or setValue not defined for field.");
//   //     }
//   //   }

//   //   const pdfBytes = await pdfDoc.save();
//   //   setCompletedPdf(new Blob([pdfBytes], { type: "application/pdf" }));
//   // }

//   async function onSubmit(formData) {
//     const existingPdfBytes = await pdf.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     const form = pdfDoc.getForm();

//     console.log("Form Data: ", formData);

//     for (const fieldName in formData) {
//       console.log("Setting value for field: ", fieldName);

//       const field = form.getField(fieldName);
//       if (field && typeof field.setValue === "function") {
//         await field.setValue(formData[fieldName]);
//         console.log("Value set: ", formData[fieldName]);
//       } else {
//         console.log("Field not found or setValue not defined for field.");
//       }
//     }

//     const pdfBytes = await pdfDoc.save();
//     setCompletedPdf(new Blob([pdfBytes], { type: "application/pdf" }));
//   }

//   function handleDownloadClick() {
//     const downloadLink = document.createElement("a");
//     downloadLink.href = URL.createObjectURL(completedPdf);
//     downloadLink.download = "completed_form.pdf";
//     downloadLink.click();
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={parsePDF}>Parse PDF</button>
//       <form
//         onSubmit={handleSubmit(onSubmit, (data) => ({ dirtyFields: data }))}
//       >
//         {fields.map((field, index) => (
//           <div key={index}>
//             <label>{field.getName()}</label>
//             <input type="text" {...register(field.getName())} />
//           </div>
//         ))}
//         <input type="submit" />
//       </form>
//       {completedPdf && (
//         <div>
//           <button onClick={handleDownloadClick}>Download completed form</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function generatePdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 20;

  const title = "PDF Generated from React";
  const textWidth = font.widthOfTextAtSize(title, fontSize);
  const textHeight = font.heightAtSize(fontSize);
  page.drawText(title, {
    x: (width - textWidth) / 2,
    y: height - 50,
    size: fontSize,
    font: font,
    color: rgb(0, 0.53, 0.71),
  });

  let yOffset = 150;

  for (const [key, value] of Object.entries(data)) {
    page.drawText(`${key}: ${value}`, {
      x: 50,
      y: height - yOffset,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    yOffset += 30;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "pdfFromReact.pdf";
  link.click();
}

function App() {
  const [data, setData] = React.useState({
    name: "",
    age: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    generatePdf(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={data.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        id="age"
        value={data.age}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={data.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="message">Message:</label>
      <textarea
        name="message"
        id="message"
        value={data.message}
        onChange={handleChange}
        required
      />

      <button type="submit">Generate PDF</button>
    </form>
  );
}

export default App;
