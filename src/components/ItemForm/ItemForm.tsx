import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  description: z.string().min(1, { message: "Description needs to be filled." }),
  amount: z.coerce.number().positive({ message: "Must be positive" }),
  category: z.enum(["Groceries", "Utilities", "Entertainment"], {
    errorMap: () => ({ message: 'Category is required.' })
  })
})

type FormData = z.infer<typeof schema>

interface Props {
  onSubmit: (data: FormData) => void
}

export default function ItemForm({ onSubmit }: Props) {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  // If correct add it to the list  


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input {...register('description')} type="text" className="form-control" />
          {errors.description && <p className='text-danger'>{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input {...register('amount')} type="number" className="form-control" />
          {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
        </div>
        <label className="form-label">Category</label>
        <div className="input-group mb-3">
          <select {...register('category')} defaultValue={""} className="form-select" id="inputGroupSelect01">
            <option value=""></option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        {errors.category && <p className='text-danger'>{errors.category.message}</p>}

        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </>
  )
}
