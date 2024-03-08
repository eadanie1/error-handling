import express from 'express';
import Joi from 'joi';
import { tryCatch } from './global-logic/try-catch.js';
import { errorHandler } from './global-logic/error-handler.js';
import { CustomErrors } from './app-error.js';
import { USER_NOT_AUTHORIZED } from './constants/error-codes.js';
const app = express();

app.use(express.json());

// const products = [
//   {product_id: 1,
//   product_name: 'small t-shirt',
//   quantity: 4},
//   {product_id: 1,
//   product_name: 'medium t-shirt',
//   quantity: 9}
// ];

const getProducts = async () => undefined;
const userLogin = async () => undefined;
const getUser = async () => ({
  // username: 'joe-mc-joe',
  // username: '-joe-mc-joe',
  // username: '12',
  // username: '',
  // auth: true,
  auth: false
});

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/)
    .required(),
  // userEmail: Joi.string().email().required()
  auth: Joi.boolean()
});

app.get(
  '/products', 
  tryCatch(async (req, res) => {
    const products = await getProducts();
    if (!products) {
      throw new CustomErrors()
      // throw new Error('Products list could not be retrieved');
    }
    return res.send(products);
}));

app.post(
  '/login', 
  tryCatch(async (req, res) => {
    const user = await getUser();
    const { error, value } = userSchema.validate(user);
    if (error) throw error;
    if (!user) {
      throw new Error('Login was unsuccessful, please try again');
    }
    console.log('Login was successful');
    return res.status(200).send('Login was successful');
}));

app.post(
  '/access',
  tryCatch(async (req, res) => {
    const user = await getUser();
    
    if (!user.auth) {
      throw new CustomErrors(USER_NOT_AUTHORIZED, 'Access denied, authorization failed', 401);
    }
    console.log('Authorization successful');
    return res.send('Authorization successful')
  })
);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running on port 4000');
});