import Link from 'next/link'

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href="/editorPage">React-Quill Editor</Link>
        </li>
        <li>
          <Link href="/infinityScrollPage">무한 스크롤</Link>
        </li>
      </ul>
    </>
  );
}
