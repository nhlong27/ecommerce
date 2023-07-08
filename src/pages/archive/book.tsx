import { redis } from '@/lib/redis'
import { addBookMutationFn } from '@/mutations'
import { getBooksQuery } from '@/queries'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-hot-toast'

const BookPage = () => {
  const { data, error } = useQuery({ ...getBooksQuery() })
  const [title, setTitle] = React.useState('')
  const queryClient = useQueryClient()
  const addBook = useMutation({
    mutationFn: addBookMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['books'])
    },
    onError(err: Error) {
      toast.error(err.message)
    }
  })
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addBook.mutate({ title: title })
        }}
      >
        <input
          className="text-black"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button type="submit">Add book</button>
      </form>
      {data ? (
        <pre>{JSON.stringify(data, null, '\t')}</pre>
      ) : error ? (
        <>
          {(error as any).response.errors.map((err: any) =>
            {toast.error(err.message); return 'error'}
          )}
        </>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}

export default BookPage

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['books'], getBooksQuery().queryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
