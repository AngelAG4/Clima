import { FC } from 'react'; 
// Functional component cuando se utiliza esta indicando que el App es componente funcional 
//no afecta utilizando este
import Weather from './components/Weather'; 

const App: FC = () => {
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;


