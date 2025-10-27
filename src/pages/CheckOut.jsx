import { use, useContext, useEffect, useState } from "react";
import { cartContext } from "../components/contexts/CartContextProvider";
import { Link, useNavigate } from "react-router";
import CartEmpty from "../components/CartEmpty";
import axios from "axios";
import { message } from "antd";

function CheckOut() {
  const [messageApi, contextHolder] = message.useMessage();
  // state
  let { cartItems, setCartItems } = useContext(cartContext);
  let [total, setTotal] = useState(0);
  let [subtotal, setSubtotal] = useState(0);
  let [tax, setTax] = useState(0);
  let [shipping_address, setShippingAddress] = useState("");
  let [notes, setNotes] = useState("");
  let [screen_shot, setScreenShot] = useState(null);
  let [order_products, setOrderProducts] = useState([]);

  useEffect(() => {
    let items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  // Add more items as needed
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    let newCartItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };
  useEffect(() => {
    let sub_total = 0;
    const taxRate = 0.1;

    if (cartItems?.length) {
      cartItems.forEach((item) => {
        sub_total += item.price * item.quantity;
      });
    }

    const tax = sub_total * taxRate;
    const _total = sub_total + tax;
    setSubtotal(sub_total);
    setTotal(_total);
    setTax(tax);

    let orderItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
    setOrderProducts(orderItems);
  }, [cartItems]);

  // for order submit
  let orderSubmit = async (e) => {
    e.preventDefault();
    let orderData = {
      total_amount: total,
      order_products: order_products,
      shipping_address: shipping_address,
      notes: notes,
      screen_shot: screen_shot,
    };
    if (order_products.length == 0) return;
    try {
      let orderUrl = "http://react-ecommerce-api-main.test/api/orders";
      let res = await axios.post(orderUrl, orderData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode == 1) {
        setCartItems([]);
        setTotal(0);
        setOrderProducts([]);
        setShippingAddress("");
        setNotes("");
        setScreenShot(null);
        localStorage.removeItem("cartItems");

        messageApi.open({
          type: "success",
          content: res.data.message,
        });
      }
    } catch (e) {
      if (e.status == 422) {
        messageApi.open({
          type: "error",
          content: e.response.data.errors,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.length < 1 ? (
                <CartEmpty />
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-24 h-24">
                        <Link to={"/product/" + item.id}>
                          <img
                            src={item.images[0]?.url}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </Link>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <span className="text-xs text-blue-800 bg-blue-100 font-semibold rounded px-2 py-1">
                              {item.category.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-800 border-x">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xl font-bold text-gray-900">
                            $ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Shipping Info UI Section */}
              <div className="bg-white rounded-lg shadow-md p-6 ">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Shipping Information
                </h2>
                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div className="relative">
                    <textarea
                      id="shipping_address"
                      name="shipping_address"
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-transparent placeholder-transparent resize-none"
                      placeholder=" "
                      rows={3}
                      value={shipping_address}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                    <label
                      htmlFor="shipping_address"
                      className={`
                      absolute left-4 transition-all duration-200 bg-white px-1 pointer-events-none
                      ${
                        shipping_address
                          ? "-top-3 text-xs text-blue-600"
                          : "top-3 text-base text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600"
                      }
                    `}
                    >
                      Address
                    </label>
                  </div>
                  {/* Notes */}
                  <div className="relative">
                    <textarea
                      id="notes"
                      name="notes"
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition bg-transparent placeholder-transparent resize-none"
                      placeholder=" "
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <label
                      htmlFor="notes"
                      className={`
                      absolute left-4 transition-all duration-200 bg-white px-1 pointer-events-none
                      ${
                        notes
                          ? "-top-3 text-xs text-blue-600"
                          : "top-3 text-base text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600"
                      }
                    `}
                    >
                      Notes (optional)
                    </label>
                  </div>
                  {/* Screen Shot Upload */}
                  <div>
                    <label
                      className="block mb-2 text-gray-700 font-medium"
                      htmlFor="screen_shot"
                    >
                      Screenshot (optional)
                    </label>
                    <input
                      type="file"
                      id="screen_shot"
                      name="screen_shot"
                      accept="image/*"
                      value={screen_shot}
                      onChange={(e) => {
                        setScreenShot(e.target.files[0]);
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span>$ {tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                      <span>Total</span>
                      <span>$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={orderSubmit}
                  className="w-full mt-6 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
