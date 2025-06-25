import gh from '@/icons/github-brands.svg'

function Footer () {
  return (
    <footer className='app-footer'>
      <section>
        <p>2025 - Tiny task</p>
        <a href='https://github.com/ricardo-bohorquez/tiny-task-app' target='blank'>
          <img src={gh} />
        </a>
      </section>
    </footer>
  )
}

export default Footer
