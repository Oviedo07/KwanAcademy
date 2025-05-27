// PayPalButton.js
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { CheckCircle2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { BlobProvider } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import styles from "./PayPalButton.module.css";

Modal.setAppElement("#root");

const PayPalButton = ({ price, courseName }) => {
  const paypalRef = useRef();
  const initialized = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    if (window.paypal && !initialized.current) {
      initialized.current = true;
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "silver",
          shape: "pill",
          label: "paypal",
          height: 45,
          tagline: false,
          width: 500,
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price.toString(),
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            const receipt = {
              id: uuidv4().split("-")[0].toUpperCase(),
              buyer: details.payer.name.given_name,
              course: courseName,
              price: `$${price}`,
              date: new Date().toLocaleString(),
            };
            setReceiptData(receipt);
            setShowModal(true);
          });
        },
        onError: (err) => {
          console.error("Error en el pago:", err);
        },
      }).render(paypalRef.current);
    }
  }, [price, courseName]);

  return (
    <>
      <div className={styles.paypalButtonContainer}>
        <div ref={paypalRef}></div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <CheckCircle2 className={styles.successIcon} />
        <h2 className={styles.successTitle}>¡Compra exitosa!</h2>
        <p className={styles.successText}>
          Gracias por tu compra, {receiptData?.buyer}.
        </p>
        <p className={styles.successTextSmall}>
          ID de Recibo: <strong>{receiptData?.id}</strong>
        </p>
        {receiptData && (
          <BlobProvider
            document={
              <InvoicePDF
                buyer={receiptData.buyer}
                course={receiptData.course}
                price={receiptData.price}
                date={receiptData.date}
                id={receiptData.id}
              />
            }
          >
            {({ url }) => (
              <a href={url} download={`Factura_Kwan_Academy_${receiptData.id}.pdf`}>
                <button className={styles.printButton}>
                  Descargar factura
                </button>
              </a>
            )}
          </BlobProvider>
        )}
      </Modal>
    </>
  );
};

export default PayPalButton;
