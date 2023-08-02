import { useAuth } from '../context/AuthContext'

export function Home () {
  const { user } = useAuth()
  return (
    <main className='main-home'>
      <section className='m-h_section' style={{ color: 'red' }}>
        label 1
      </section>
      <section className='m-h_section' style={{ color: 'white' }}>
        label 2
      </section>
    </main>
  )
}
