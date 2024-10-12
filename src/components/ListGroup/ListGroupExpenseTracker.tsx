import './ListGroupExpenseTracker.css'

interface ItemContent {
  description: string,
  amount: number,
  category: string
}


interface Props {
  items: ItemContent[];
  onDelete: (data: ItemContent) => void
}

export default function ListGroupExpenseTracker({ items = [], onDelete }: Props) {

  if (items.length === 0) return (<p>No Item found</p>);

  return (
    <>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item"><strong>Description</strong></li>
        <li className="list-group-item"><strong>Amount</strong></li>
        <li className="list-group-item"><strong>Category</strong></li>
        <li className="list-group-item"><strong>Action</strong></li>
      </ul>
      {items.map((item, index) => (
        <ul key={index} className="list-group list-group-horizontal">
          <li className="list-group-item">{item.description}</li>
          <li className="list-group-item">{item.amount}</li>
          <li className="list-group-item">{item.category}</li>
          <li className="list-group-item">
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(item)}>Delete</button>
          </li>
        </ul>
      ))}
      <ul className="list-group list-group-horizontal">
        <li className='list-group-item'><strong>Total</strong></li>
        <li className='list-group-item'><strong>${items.reduce((accumulator, currentItem) => accumulator + currentItem.amount, 0)}</strong></li>
        <li className='list-group-item'></li>
        <li className='list-group-item'></li>
      </ul>
    </>
  )
}
