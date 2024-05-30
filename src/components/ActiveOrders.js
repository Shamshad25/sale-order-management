import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveOrders,
  addOrder,
  updateOrder,
  fetchCustomers,
} from "../redux/feature/orderSlice.js";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import SaleOrderForm from "./SaleOrderForm";

const ActiveOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { activeOrders, customers, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchActiveOrders());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleAddOrder = (newOrder) => {
    dispatch(addOrder(newOrder));
    onClose();
  };

  const handleEditOrder = (updatedOrder) => {
    dispatch(updateOrder(updatedOrder));
    onCloseEdit();
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.customer === customerId);
    return customer ? customer.customer_profile.name : "Unknown";
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    onOpenEdit();
  };

  if (loading) return <Spinner />;

  return (
    <Box>
      <Button onClick={onOpen}>+ Sale Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm onSubmit={handleAddOrder} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm
              onSubmit={handleEditOrder}
              defaultValues={selectedOrder}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Invoice No.</Th>
            <Th>Last Modified</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activeOrders.map((order) => (
            <Tr key={order.id} p={4} borderWidth="1px" borderRadius="lg" mb={2}>
              <Td>{order.customer_id}</Td>
              <Td>{getCustomerName(order.customer_id)}</Td>
              <Td>{order.price ? order.price : order.items[0].price}</Td>
              <Td>{order.invoice_no}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Button onClick={() => openEditModal(order)}>...</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
