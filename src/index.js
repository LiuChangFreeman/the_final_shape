import dva from 'dva';
import "./index.css"
import 'antd-mobile-v5/es/components/tag/tag.css'

// 1. Initialize
const app = dva();

// 3. Model
app.model(require('./models/util').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
