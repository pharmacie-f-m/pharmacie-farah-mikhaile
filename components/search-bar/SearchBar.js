import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Form, Input, Button } from './SearchBar-styles'
import { ToastContainer, toast } from 'react-toastify'

export default function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()
  return (
    <Form>
      <ToastContainer position='bottom-center' draggable />
      <Input placeholder='e.g. Biogesic' value={keyword} type='text' onChange={e => setKeyword(e.target.value)} />
      <Button
        // disabled={keyword === ''}
        onClick={e => {
          e.preventDefault()
          if (keyword === '') {
            toast.error('Enter something')
          } else {
            router.push(`/search?keyword=${keyword}`)
          }
        }}>
        <span>Search</span>
      </Button>
    </Form>
  )
}

SearchBar.Container = function SearchBarContainer({ children, ...restPrpos }) {
  return <Container {...restPrpos}>{children}</Container>
}
