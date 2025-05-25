interface TitleBarProps {
    title: string,
}

export default function TitleBar({ title, }: TitleBarProps,) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}