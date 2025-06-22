// PayPalButton.js - Abre PDF de Drive en nueva pestaña y permite descargar factura
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { CheckCircle2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { BlobProvider } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import styles from "./PayPalButton.module.css";
import { useAuth } from "../context/AuthContext";
import api from "../axios.js";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const PayPalButton = ({ price, courseId, courseName, courseInstructor }) => {
  const { user } = useAuth();
  const paypalRef = useRef();
  const initialized = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Link del PDF de Drive en formato para abrir en otra pestaña
  // const pdfDriveUrl = "https://drive.google.com/file/d/1m3nYfsA6YOrEgtNZeJ22bDI4UozNE94I/preview";

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
        onApprove: async (data, actions) => {
          setLoading(true);
          try {
            const details = await actions.order.capture();
            const facturaId = uuidv4().split("-")[0].toUpperCase();

            const compraData = {
              id_usuario: user?.id,
              id_curso: courseId,
              precio: parseFloat(price),
              numero_factura: facturaId,
              detalles_pago: {
                paypal_order_id: details.id,
                payer_email: details.payer?.email_address,
                transaction_id: details.purchase_units[0]?.payments?.captures[0]?.id,
              },
            };

            await api.post("/api/compras/registrar", compraData);

            const receipt = {
              id: facturaId,
              buyer: details.payer.name.given_name || user?.primer_nombre || "Usuario",
              course: courseName,
              instructor: courseInstructor,
              price: `$${price}`,
              date: new Date().toLocaleString(),
            };

            setReceiptData(receipt);
            setShowModal(true);

          } catch (error) {
            console.error("Error al procesar la compra:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error al procesar la compra',
              text: 'Por favor, inicia sesión.',
              confirmButtonColor: '#d33',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/SignIn');
              }
            });
          } finally {
            setLoading(false);
          }

        },
        onError: (err) => {
          console.error("Error en el pago:", err);
          setLoading(false);
        },
      }).render(paypalRef.current);
    }
  }, [price, courseId, courseName, courseInstructor, user, navigate]);

  // Cierra el modal y abre el PDF de Drive en otra pestaña
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/PanelUser';
  };

  return (
    <>
      <div className={styles.paypalButtonContainer}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <p>Procesando compra...</p>
          </div>
        )}
        <div ref={paypalRef}></div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
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
                instructor={receiptData.instructor}
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
