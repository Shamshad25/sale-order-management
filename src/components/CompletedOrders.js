import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompletedOrders,
  fetchCustomers,
} from "../redux/feature/orderSlice";
import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CompletedOrders = () => {
  const dispatch = useDispatch();
  const { completedOrders, customers, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchCompletedOrders());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.customer === customerId);
    return customer ? customer.customer_profile.name : "Unknown";
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Invoice No.</Th>
            <Th>Last Modified</Th>
          </Tr>
        </Thead>
        <Tbody>
          {completedOrders.map((order) => (
            <Tr key={order.id} p={4} borderWidth="1px" borderRadius="lg" mb={2}>
              <Td>{order.customer_id}</Td>
              <Td>{getCustomerName(order.customer_id)}</Td>
              <Td>{order.items[0].price}</Td>
              <Td>{order.invoice_no}</Td>
              <Td>{order.invoice_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default CompletedOrders;
