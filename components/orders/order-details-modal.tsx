import { Order } from '@/models/order';
import { formatDateAndTime } from '@/utils/format-date';
import Button from '../shared/button';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  const createdAtDateAndTime = formatDateAndTime(order.created_at);
  const deliveryDateAndTime = formatDateAndTime(order.delivery_date);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full'>
        <h2 className='text-xl text-center font-bold mb-4'>
          Detalles de orden
        </h2>
        {order && (
          <div className='space-y-2'>
            <p>
              <strong>Número de orden:</strong> {order.order_num}
            </p>
            <p>
              <strong>Medio de ingreso:</strong> {order.channel}
            </p>
            <p>
              <strong>Fecha de creación:</strong> {createdAtDateAndTime.date} •{' '}
              {createdAtDateAndTime.time}
            </p>
            <p>
              <strong>Nombre del cliente:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Fecha de entrega:</strong> {deliveryDateAndTime.date}
            </p>
            <p>
              <strong>Hora de enterga:</strong> {deliveryDateAndTime.time}
            </p>
          </div>
        )}
        <div className='flex justify-end mt-3'>
          <Button onClick={() => onClose()}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
