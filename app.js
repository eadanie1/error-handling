import express from 'express';
import Joi from 'joi';
import { tryCatch } from './global-logic/try-catch.js';
import { errorHandler } from './global-logic/error-handler.js';
import { CustomErrors } from './app-error.js';
import { LOGIN_FAILED, NOT_FOUND, SUCCESS_CODE, USER_NOT_AUTHORIZED } from './constants/status-codes.js';
import { putRoutes } from './middleware/put-routes.js';
import { productsMiddleware } from './middleware/products-middleware.js';
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    email: 'joe@joes.com',
    // email: '',
    password: 'joespassword'
  };
  next();
});
app.use(putRoutes());
app.use('/products', productsMiddleware);

const getProducts = async () => [
  {product_id: 1,
  product_name: 'small t-shirt',
  quantity: 4},
  {product_id: 2,
  product_name: 'medium t-shirt',
  quantity: 9}
];
// const getProducts = async () => undefined;
const getUser = async () => ({
  username: 'joemcjoe',
  // username: '',
  auth: true
  // auth: false
});

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/)
    .required(),
  auth: Joi.boolean()
});

export const accountSettingsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required()
});

app.get(
  '/products', 
  tryCatch(async (req, res) => {
    const products = await getProducts();

    if (!products) {
      throw new CustomErrors(NOT_FOUND, 'Products list could not be retrieved', 404);
    }
    console.log(products);
    return res.send(products);
}));

app.post(
  '/login', 
  tryCatch(async (req, res) => {
    const user = await getUser();
    const { error, value } = userSchema.validate(user);
    if (error) throw error;

    if (!user) {
      throw new CustomErrors(LOGIN_FAILED, 'Login was unsuccessful, please try again', 401);
    }
    console.log('Login successful');
    return res.status(200).send('Login successful');
}));

app.post(
  '/member-access',
  tryCatch(async (req, res) => {
    const user = await getUser();
    
    if (!user.auth) {
      throw new CustomErrors(USER_NOT_AUTHORIZED, 'Access denied, authorization failed', 403);
    }
    console.log(`message: Authorization successful (StatusCode: ${SUCCESS_CODE})`);
    return res.status(SUCCESS_CODE).json({
      statusCode: SUCCESS_CODE,
      message: 'Authorization successful'});
  })
);

app.put(
  '/account-settings', 
  tryCatch(async (req, res) => {
  const user = await getUser();

  return res.status(SUCCESS_CODE).send('Successfully changed account details');
}));

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running on port 4000');
});