import { getProviderOrders } from "../../_actions/providerPostAction";
import OrderActions from "../../_components/orderaction";
// import OrderActions from "./OrderActions";

type ProviderOrder = {
  id: string;
  customer?: {
    name?: string | null;
    email?: string | null;
  } | null;
  items: {
    id: string;
    gearItem?: {
      name?: string | null;
    } | null;
    quantity: number;
  }[];
  startDate: string | Date;
  endDate: string | Date;
  totalAmount: number | string;
  payment?: {
    status?: string | null;
  } | null;
  status: string;
};

const OrderManagement = async () => {
  const result = await getProviderOrders();
  const orders = (result.data || []) as ProviderOrder[];

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">
        Order Management
      </h1>

      <p className="mb-6 text-gray-500">
        Manage incoming rental orders and update their status.
      </p>

      {!result.success && (
        <p className="mb-4 text-red-500">{result.message}</p>
      )}

      {orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-lg font-semibold">No orders found</h2>
          <p className="mt-2 text-gray-500">
            Incoming rental orders will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              {/* Card Header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customer: {order.customer?.name || "Unknown"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.customer?.email}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {order.status}
                </span>
              </div>

              {/* Order Details */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Gear</p>

                  {order.items.map((item) => (
                    <p key={item.id} className="font-medium">
                      {item.gearItem?.name || "Unknown gear"}
                    </p>
                  ))}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Quantity</p>

                  {order.items.map((item) => (
                    <p key={item.id} className="font-medium">
                      {item.quantity}
                    </p>
                  ))}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Rental Dates</p>

                  <p className="font-medium">
                    {new Date(order.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>

                  <p className="font-semibold text-lg">
                    €{order.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>

                  <p className="font-medium">
                    {order.payment?.status || "UNPAID"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 border-t pt-4">
                <p className="mb-3 text-sm font-semibold">
                  Update Order
                </p>

                <OrderActions
                  orderId={order.id}
                  status={order.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;