// src/screens/AdminViews/utils/FunctionsHomeAdmin.js

import { Home as  Target, Users, Globe, Award, CheckCircle, Zap } from 'lucide-react';


export const colors = {
    cream: '#FEF3E2',
    yellow: '#FAB12F',
    orange: '#FA812F',
    red: '#FA4032'
  };

export const features = [
    {
      icon: Target,
      title: "Misión",
      description: "Empoderar administradores con nuestro sitio web moderno.",
      color: colors.red
    },
    {
      icon: Users,
      title: "Aprenides En Desarrollo",
      description: "Aprendices comprometidos con la innovación y la responsabilidad.",
      color: colors.orange
    },
    {
      icon: Globe,
      title: "Alcance Local",
      description: "Soluciones adaptadas para plataformas educativas de escala baja.",
      color: colors.yellow
    }
  ];

export const values = [
    {
      icon: Award,
      title: "Calidad",
      description: "Comprometidos con un desarrollo organizado."
    },
    {
      icon: CheckCircle,
      title: "Transparencia",
      description: "Comunicación clara y procesos abiertos."
    },
    {
      icon: Zap,
      title: "Innovación",
      description: "Mejora continua para nuestros usuarios."
    }
  ];  