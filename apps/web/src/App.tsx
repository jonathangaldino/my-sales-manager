import { Suspense } from 'react';
import './globals.css';
import Router from './modules/router';

function App() {
  return (
    <Suspense>
      <Router />
    </Suspense>
  );
}

export default App;
