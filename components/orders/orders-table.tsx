'use client';

import { Order } from '@/models/order';
import { useOrderStore } from '@/stores/order-store';
import { formatDateAndTime } from '@/utils/format-date';
import { Calendar, ChevronDown, Eye, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../shared/button';
import OrderDetailsModal from './order-details-modal';

interface OrdersTableProps {
  initialOrders: Order[];
}

const tableHeaders = [
  { key: 'order', label: 'Número de orden' },
  { key: 'channel', label: 'Medio de ingreso' },
  { key: 'created', label: 'Fecha de creación' },
  { key: 'customer', label: 'Nombre del cliente' },
  { key: 'delivery', label: 'Fecha de entrega' },
  { key: 'delivery-time', label: 'Hora de entrega' },
];

const OrdersTable = ({ initialOrders }: OrdersTableProps) => {
  const {
    orders,
    currentPage,
    itemsPerPage,
    setOrders,
    deleteOrder,
    nextPage,
    prevPage,
  } = useOrderStore();
  const [activeHeader, setActiveHeader] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Initialize store with server data
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders, setOrders]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleHeaderClick = (header: string) => {
    setActiveHeader(activeHeader === header ? null : header);
  };

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este pedido?')) {
      deleteOrder(id);
    }
  };

  return (
    <div>
      {/* Date Range Input */}
      <div className='md:flex justify-between mb-3 border-t-2 border-dotted py-4'>
        <div>
          <p>
            Bienvenido{' '}
            <span className='font-bold'>Comercializadora la Noria</span>{' '}
          </p>
          <h2 className='font-bold text-2xl'>Mis pedidos</h2>
        </div>
        <div className='flex flex-col mt-2 md:mt-0'>
          <label htmlFor='date-range' className='text-left'>
            Rango de fechas
          </label>
          <div className='relative w-fit'>
            <input
              id='date-range'
              type='text'
              placeholder='DD/MM/YY - DD/MM/YY'
              className='w-[300px] px-4 py-2 border-2 rounded-md pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200'
              readOnly
            />
            <Calendar className='w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 text-simplifud' />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='border-t-2 border-simplifud'>
        <table
          className='w-full text-center text-sm'
          style={{ borderCollapse: 'separate', borderSpacing: '0 0.5em' }}
        >
          <thead className='border'>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className='p-3 text-sm font-semibold text-left cursor-pointer hover:bg-gray-100 transition-colors border-b-2 border-dotted'
                  onClick={() => handleHeaderClick(header.key)}
                >
                  <div className='flex items-center gap-2 justify-center'>
                    {header.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeHeader === header.key
                          ? 'text-simplifud rotate-180'
                          : 'text-gray-400'
                      }`}
                    />
                  </div>
                </th>
              ))}
              <th className='p-3 text-sm font-semibold text-left border-b-2 border-dotted'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => {
              const createdAtDateAndTime = formatDateAndTime(order.created_at);
              const deliveryDateAndTime = formatDateAndTime(
                order.delivery_date
              );
              return (
                <tr
                  key={order.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='p-3 border-l-2 border-t-2 border-b-2 border-gray-100 rounded-l-2xl font-bold'>
                    {order.order_num}
                  </td>
                  <td className='p-3 border-y-2 border-gray-100'>
                    {order.channel}
                  </td>
                  <td className='p-3 border-y-2 border-gray-100'>
                    {createdAtDateAndTime.date} • {createdAtDateAndTime.time}
                  </td>
                  <td className='p-3 border-y-2 border-gray-100'>
                    {order.customer_name}
                  </td>
                  <td className='p-3 border-y-2 border-gray-100'>
                    {deliveryDateAndTime.date}
                  </td>
                  <td className='p-3 border-y-2 border-gray-100'>
                    {deliveryDateAndTime.time}
                  </td>
                  <td className='p-3 border-t-2 border-r-2 border-b-2 border-gray-100 rounded-r-2xl'>
                    <div className='flex gap-2 text-center'>
                      <button
                        className='p-1 hover:bg-gray-100 rounded-md text-blue-600 border border-blue-600 w-[45px]'
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className='h-6 w-6 mx-auto' />
                      </button>
                      <button
                        className='hover:bg-gray-100 rounded-md text-red-600 border border-red-600 w-[45px]'
                        onClick={() => handleDelete(order.id)}
                      >
                        <X className='h-6 w-6 mx-auto' />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <div>
          <span className='text-sm text-gray-700'>
            Página {currentPage} de {totalPages}
          </span>
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>

      {!!selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersTable;
