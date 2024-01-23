"use client";
import Editor from "@/components/Editor/Editor";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function EditorPage() {
  const [value, setValue] = useState("");

  const handleOnChange = (content: string) => {
    console.log(content)
    const sanitizedHTML = DOMPurify.sanitize(content);
    setValue(sanitizedHTML);
  } ;

  return (
    <>
      <Editor value={value} onChange={handleOnChange} />
      <div dangerouslySetInnerHTML={{__html: value}}></div>
    </>
  );
}