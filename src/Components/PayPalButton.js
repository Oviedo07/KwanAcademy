import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { CheckCircle2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // UUID para ID único
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
                    color: "gold",
                    shape: "pill",
                    label: "paypal",
                    height: 45,
                    tagline: false,
                    // AUMENTA EL ANCHO AQUÍ ⬇⬇⬇
                    width: 450 // Prueba con 340px o más para alargar
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

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
  <html>
    <head>
      <title>Recibo de compra</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          background-color: #f9fafb;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: #fff;
          border-radius: 12px;
          padding: 40px 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          border-top: 6px solid #dc2626;
        }
        .icon {
          font-size: 48px;
          color: #dc2626;
          margin-bottom: 16px;
        }
        h2 {
          font-size: 24px;
          color: #111827;
          margin: 0 0 12px;
        }
        p {
          font-size: 16px;
          color: #4b5563;
          margin: 4px 0;
        }
        .receipt-id {
          font-weight: bold;
          color: #1e3a8a;
          margin-top: 10px;
        }
        .button {
          margin-top: 24px;
          padding: 12px 24px;
          background-color: #dc2626;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #b91c1c;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon"></div>
        <h2>¡Compra exitosa!</h2>
        <p>Gracias por tu compra, ${receiptData.buyer}.</p>
        <p class="receipt-id">ID de Recibo: ${receiptData.id}</p>
        <button class="button" onclick="window.print()">Imprimir recibo</button>
      </div>
    </body>
  </html>
`);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // ...todo igual hasta el return

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
                <button className={styles.printButton} onClick={handlePrint}>
                    Imprimir recibo
                </button>
            </Modal>
        </>
    );

};

export default PayPalButton;
