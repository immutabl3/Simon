import express from 'express';
import home from './home';

const app = express();

app.use('/public', express.static('dist'));
app.use(home);

app.listen(process.env.PORT, () => {
	console.log('hello');
});