import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

type EditorProps = {
  value: string,
  onChange(content:string): void,
}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], //헤딩(heading) 옵션
      [{ font: [] }], //글꼴 패밀리
      [{ size: ["small", false, "large", "huge"] }], //글꼴 크기
      [{ align: [] }], //텍스트 정렬
      ["bold", "italic", "underline", "strike", "blockquote"], //기본 텍스트 포맷 옵션
      [{ list: "ordered" }, { list: "bullet" }, "link"], //리스트 옵션
      [{ color: [] }, { background: [] }], //텍스트 색상 및 배경색 옵션
      ["image", "video"], //이미지 및 비디오 삽입
      ["clean"], //포맷 제거
    ],
  },
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <>
      <ReactQuill value={value} onChange={onChange} modules={modules} />
    </>
  );
};

export default Editor;