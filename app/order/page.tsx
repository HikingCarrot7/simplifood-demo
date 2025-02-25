import OrdersTable from '@/components/orders/orders-table';
import Button from '@/components/shared/button';
import { logout } from '@/services/auth/logout.service';
import { getOrders } from '@/services/order.service';

export default async function Order() {
  const orders = await getOrders();

  return (
    <div className='mx-auto p-4'>
      <form action={logout} className='flex justify-end mb-4'>
        <Button type='submit'>Cerrar sesión</Button>
      </form>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
