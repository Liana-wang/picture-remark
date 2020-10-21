import React from 'react';
import UploadPage from './pages/UploadPage'

class App extends React.Component {
    state = {
        isShowMyHoc: true
    }

    render() {
        return (
            <div className="App">
                <UploadPage />
            </div>
        );
    }
}

export default App;