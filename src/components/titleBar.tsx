import Link from "next/link";

interface TitleBarProps {
    title: string,
    isHome?: boolean,
}

export default function TitleBar({ title, isHome }: TitleBarProps) {
  return (
    <div>
      <h1>{title}</h1>
      { !isHome ? <Link href="/">Back to home</Link> : undefined }
    </div>
  )
}