import 'antd/dist/antd.min.js';
import 'antd/dist/antd.dark.min.css';
import './App.css';
import AppLayout from './layout/AppLayout';
import { ConfigProvider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <AppLayout></AppLayout>
      </ConfigProvider>
      <ToastContainer  />
    </div>
  );
}

export default App;
