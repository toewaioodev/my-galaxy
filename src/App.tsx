import React from 'react';
import './index.css';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <Overlay />
                <Scene />
            </div>
        </ErrorBoundary>
    );
}

export default App;
