import './styles.css'

type Props = {
  filterString: string,
  setFilterString: (newFilterString: string) => void,
  placeholder: string
}

export default function FilterInput ({
  filterString,
  setFilterString,
  placeholder
}: Props) {
  return <input
    className="FilterInput"
    value={filterString}
    onChange={event => setFilterString(event.target.value)}
    placeholder={placeholder}
  />
}
