import CDetails from './components/CDetails'
import VSummary from './views/VSummary'
import VContent from './views/VContent'
import './styles/index.scss'
import VIcon from './views/VIcon'

const mapArr = new Array(7).fill(1)

function App() {

  return (
    <div className={'mainContainer'}>
      <CDetails >
        <VSummary>
          <VIcon />
          VSummary
        </VSummary>
        <VContent>
          {mapArr.map((el) => {
            return <div style={{ height: "50px", width: '100%', boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)' , marginBottom: '10px', borderRadius: '10px',  }}>
            </div>
          })}
        </VContent>
      </CDetails >
    </div>
  )
}

export default App
