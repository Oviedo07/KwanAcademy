// InvoicePDF.js
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

// Opcional: Registrar una fuente personalizada
// Font.register({ family: 'Roboto', src: 'path_to_font/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
  page: {
    // FONDO PRINCIPAL DEL PDF - Puedes cambiarlo por cualquier color o imagen
    backgroundColor: '#f8f9fa', // Gris claro - Cambia aquí para fondo diferente
    padding: 0,
    fontSize: 11,
    color: '#1a1a1a', // Color de texto principal - Negro profundo
    fontFamily: 'Helvetica',
  },
  
  // Header principal con el branding de la academia
  headerContainer: {
    backgroundColor: '#FEF3E2', // FONDO DEL HEADER - Negro profundo
    padding: 30,
    marginBottom: 0,
  },
  
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Sección del logo y nombre de la academia
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  logo: {
    width: 70, // Ajusta el tamaño del logo según necesites
    height: 70,
    marginRight: 15,
  },
  
  brandText: {
    flexDirection: 'column',
  },
  
  academyName: {
    fontSize: 24,
    color: '#000000', // COLOR PRINCIPAL - Rojo corporativo
    fontWeight: 900,
    letterSpacing: 1,
  },
  
  subtitle: {
    fontSize: 10,
    color: '#333333', // COLOR SECUNDARIO - Gris medio
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Información de la factura en el header
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  
  invoiceTitle: {
    fontSize: 16,
    color: '#000000', // Blanco para contraste en header negro
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  invoiceNumber: {
    fontSize: 14,
    color: '#333333', // COLOR SECUNDARIO - Gris medio
    marginTop: 5,
  },
  
  // Sección de información principal
  mainContent: {
    backgroundColor: '#FDF8F2', // FONDO DEL CONTENIDO - Blanco
    margin: 0,
    padding: 30,
    flexGrow: 1,
  },
  
  // Barra decorativa
  decorativeBar: {
    height: 4,
    backgroundColor: '#dc2626', // COLOR PRINCIPAL - Rojo corporativo
    marginBottom: 25,
  },
  
  // Secciones de información
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  
  infoColumn: {
    width: '48%',
  },
  
  sectionTitle: {
    fontSize: 14,
    color: '#1a1a1a', // COLOR TEXTO PRINCIPAL - Negro profundo
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '1px solid #e5e7eb', // COLOR BORDE - Gris claro
    paddingBottom: 5,
  },
  
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  
  label: {
    fontSize: 10,
    color: '#6b7280', // COLOR ETIQUETAS - Gris oscuro
    width: 100,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  
  value: {
    fontSize: 11,
    color: '#1a1a1a', // COLOR VALORES - Negro profundo
    fontWeight: 'bold',
    flex: 1,
  },
  
  // Sección del curso (destacada)
  courseSection: {
    backgroundColor: '#FDF8F2', // FONDO SECCIÓN CURSO - Gris muy claro
    padding: 20,
    marginVertical: 20,
    borderLeft: '4px solid #dc2626', // COLOR PRINCIPAL - Rojo corporativo
    borderRadius: 4,
  },
  
  courseTitle: {
    fontSize: 16,
    color: '#1a1a1a', // COLOR TEXTO PRINCIPAL - Negro profundo
    fontWeight: '700',
    marginBottom: 8,
  },
  
  courseLabel: {
    fontSize: 10,
    color: '#dc2626', // COLOR PRINCIPAL - Rojo corporativo
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
    fontWeight:800  
  },
  
  // Sección de precio (destacada)
  priceSection: {
    backgroundColor: '#FDF8F2', // FONDO SECCIÓN PRECIO - Negro profundo
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  priceLabel: {
    fontSize: 14,
    color: '#000000', // COLOR SECUNDARIO - Gris medio
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 800
  },
  
  priceValue: {
    fontSize: 24,
    color: '#dc2626', // COLOR PRINCIPAL - Rojo corporativo
    fontWeight: 'bold',
  },
  
  // Footer
  footer: {
    backgroundColor: '#f8e1bf', // FONDO FOOTER - Gris oscuro
    padding: 20,
    marginTop: 0,
  },
  
  footerText: {
    fontSize: 9,
    color: '#333333', // COLOR SECUNDARIO - Gris medio
    textAlign: 'center',
    lineHeight: 1.4,
  },
  
  // Elementos decorativos
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb', // COLOR DIVISOR - Gris claro
    marginVertical: 15,
  },
  
  accent: {
    color: '#dc2626', // COLOR PRINCIPAL - Rojo corporativo
    fontWeight: 'bold',
  },
});

const InvoicePDF = ({ buyer, course, price, date, id, logoUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header con branding */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          {/* Logo y nombre de la academia */}
          <View style={styles.brandSection}>
            {/* Logo - Descomenta y ajusta la ruta cuando tengas el logo */}
            <Image style={styles.logo} src="https://i.imgur.com/xa8TdxM.png" />
            
            <View style={styles.brandText}>
              <Text style={styles.academyName}>KWAN ACADEMY</Text>
              <Text style={styles.subtitle}>Centro de Formación</Text>
            </View>
          </View>
          
          {/* Información de factura */}
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>Factura</Text>
            <Text style={styles.invoiceNumber}>#{id}</Text>
          </View>
        </View>
      </View>
      
      {/* Contenido principal */}
      <View style={styles.mainContent}>
        <View style={styles.decorativeBar} />
        
        {/* Grid de información */}
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.sectionTitle}>Información del Cliente</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.value}>{buyer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
          </View>
          
          <View style={styles.infoColumn}>
            <Text style={styles.sectionTitle}>Detalles de Compra</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>ID Compra:</Text>
              <Text style={styles.value}>{id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={[styles.value, styles.accent]}>APROBADO</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Sección del curso */}
        <View style={styles.courseSection}>
          <Text style={styles.courseLabel}>Producto Adquirido</Text>
          <Text style={styles.courseTitle}>{course}</Text>
        </View>
        
        {/* Sección de precio */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total Pagado</Text>
          <Text style={styles.priceValue}>{price}</Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Gracias por confiar en KWAN ACADEMY. Esta factura es un comprobante oficial de tu adquisición.{'\n'}
          Para soporte técnico o consultas, contacta con nuestro equipo de atención al cliente.
        </Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;