import { newApiInstance } from './axios.service';

export async function getOrders() {
  'use server';

  const apiInstance = await newApiInstance();
  const response = await apiInstance.get('/api/v1/order');
  return response.data;
}
