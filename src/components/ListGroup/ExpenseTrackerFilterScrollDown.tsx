interface Props {
  onSelectCategory: (selectedCategory: string) => void,
}


export default function ExpenseTrackerFilterScrollDown({ onSelectCategory }: Props) {
  return (
    <>
      <select className="from-select" onChange={(event) => onSelectCategory(event.target.value)}>
        <option value="">All Categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </>
  )
}
