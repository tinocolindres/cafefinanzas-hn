const { useState, useEffect, useCallback, useRef, useMemo, useReducer, useContext, createContext } = React;
window.LOGO_DATA = 'data:image/jpeg;base64,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';
// ── THEME ──────────────────────────────────────────────────────
const T = {
  espresso: "#1C0A00",
  roast: "#2E1200",
  caramel: "#C8841A",
  gold: "#D4A853",
  cream: "#F7EDD8",
  steam: "#FDF8F2",
  latte: "#E8D5B5",
  success: "#4A7C59",
  warning: "#C8860A",
  danger: "#B03030",
  info: "#2E6A8A",
  text: "#2A1A0A",
  muted: "#7A6A5A"
};
const mono = {
  fontFamily: "'Source Code Pro',monospace"
};
const ISV = 0.15,
  IHSS_TOPE = 10594.40,
  RAP_TOPE = 8163.75;

// ── ROLES ──────────────────────────────────────────────────────
const ROLES_DEF = {
  admin: {
    label: "Administrador",
    color: T.gold,
    modules: ["dashboard", "pos", "comandas", "caja", "turnos", "inventario", "recetas", "nomina", "proveedores", "cxc", "gastos", "flujo", "reportes", "activos", "rentabilidad", "metas", "alertas", "productos", "usuarios", "config"]
  },
  gerente: {
    label: "Gerente",
    color: T.caramel,
    modules: ["dashboard", "inventario", "recetas", "nomina", "proveedores", "cxc", "gastos", "flujo", "reportes", "activos", "rentabilidad", "metas", "productos"]
  },
  cajero: {
    label: "Cajero / Barista",
    color: "#5A8A6A",
    modules: ["pos", "comandas", "caja"]
  },
  contador: {
    label: "Contador Externo",
    color: "#4A6A8A",
    modules: ["reportes", "nomina", "flujo", "gastos", "activos"]
  }
};
const MODS_ALL = [{
  id: "dashboard",
  icon: "📊",
  label: "Dashboard"
}, {
  id: "pos",
  icon: "🛒",
  label: "Punto de Venta"
}, {
  id: "comandas",
  icon: "📝",
  label: "Órdenes de Mesa"
}, {
  id: "caja",
  icon: "🏦",
  label: "Cierre de Caja"
}, {
  id: "turnos",
  icon: "🔄",
  label: "Turnos"
}, {
  id: "inventario",
  icon: "📦",
  label: "Inventario"
}, {
  id: "recetas",
  icon: "📋",
  label: "Fichas / Recetas"
}, {
  id: "nomina",
  icon: "👥",
  label: "Nómina"
}, {
  id: "proveedores",
  icon: "🏪",
  label: "Proveedores"
}, {
  id: "cxc",
  icon: "💼",
  label: "Cuentas por Cobrar"
}, {
  id: "gastos",
  icon: "🧾",
  label: "Gastos Operativos"
}, {
  id: "flujo",
  icon: "💰",
  label: "Flujo de Caja"
}, {
  id: "reportes",
  icon: "📄",
  label: "Reportes SAR"
}, {
  id: "activos",
  icon: "🏗️",
  label: "Activos / Depreciación"
}, {
  id: "rentabilidad",
  icon: "📈",
  label: "Rentabilidad"
}, {
  id: "metas",
  icon: "🎯",
  label: "Metas vs Real"
}, {
  id: "alertas",
  icon: "🔔",
  label: "Alertas WhatsApp"
}, {
  id: "productos",
  icon: "🛍️",
  label: "Productos"
}, {
  id: "usuarios",
  icon: "👤",
  label: "Usuarios"
}, {
  id: "config",
  icon: "⚙️",
  label: "Configuración"
}];

// ── SEED DATA ──────────────────────────────────────────────────
const USERS0 = [{
  id: 1,
  name: "Constantino Colindres",
  role: "admin",
  av: "CC",
  pass: "cafe1234",
  active: true
}, {
  id: 2,
  name: "María López",
  role: "gerente",
  av: "ML",
  pass: "gerente22",
  active: true
}, {
  id: 3,
  name: "Juan García",
  role: "cajero",
  av: "JG",
  pass: "caja2024",
  active: true
}, {
  id: 4,
  name: "Ana Martínez",
  role: "contador",
  av: "AM",
  pass: "conta2024",
  active: true
}];
const PRODS0 = [{
  id: 1,
  name: "Espresso",
  cat: "Café",
  price: 45,
  cost: 12,
  active: true
}, {
  id: 2,
  name: "Americano",
  cat: "Café",
  price: 55,
  cost: 15,
  active: true
}, {
  id: 3,
  name: "Cappuccino",
  cat: "Café",
  price: 75,
  cost: 22,
  active: true
}, {
  id: 4,
  name: "Latte",
  cat: "Café",
  price: 85,
  cost: 25,
  active: true
}, {
  id: 5,
  name: "Mocha",
  cat: "Café",
  price: 90,
  cost: 28,
  active: true
}, {
  id: 6,
  name: "Cold Brew",
  cat: "Café",
  price: 95,
  cost: 20,
  active: true
}, {
  id: 7,
  name: "Granita de Café",
  cat: "Granitas",
  price: 90,
  cost: 28,
  active: true
}, {
  id: 8,
  name: "Frappé Caramelo",
  cat: "Granitas",
  price: 95,
  cost: 30,
  active: true
}, {
  id: 9,
  name: "Granita Mocha",
  cat: "Granitas",
  price: 95,
  cost: 32,
  active: true
}, {
  id: 10,
  name: "Jugo de Naranja",
  cat: "Bebidas",
  price: 65,
  cost: 18,
  active: true
}, {
  id: 11,
  name: "Smoothie Tropical",
  cat: "Bebidas",
  price: 95,
  cost: 30,
  active: true
}, {
  id: 12,
  name: "Agua Mineral",
  cat: "Bebidas",
  price: 25,
  cost: 8,
  active: true
}, {
  id: 13,
  name: "Pastel Chocolate",
  cat: "Alimentos",
  price: 85,
  cost: 30,
  active: true
}, {
  id: 14,
  name: "Croissant",
  cat: "Alimentos",
  price: 65,
  cost: 20,
  active: true
}, {
  id: 15,
  name: "Sandwich de Pollo",
  cat: "Alimentos",
  price: 120,
  cost: 50,
  active: true
}, {
  id: 16,
  name: "Muffin Arándano",
  cat: "Alimentos",
  price: 55,
  cost: 18,
  active: true
}];
const INV0 = [{
  id: 1,
  name: "Café en grano (hondureño)",
  unit: "kg",
  stock: 25,
  min: 10,
  cost: 280,
  cat: "Café"
}, {
  id: 2,
  name: "Café molido (proveedor)",
  unit: "kg",
  stock: 10,
  min: 5,
  cost: 320,
  cat: "Café"
}, {
  id: 3,
  name: "Leche entera",
  unit: "litro",
  stock: 40,
  min: 20,
  cost: 32,
  cat: "Lácteo"
}, {
  id: 4,
  name: "Crema de leche",
  unit: "litro",
  stock: 8,
  min: 5,
  cost: 95,
  cat: "Lácteo"
}, {
  id: 5,
  name: "Azúcar",
  unit: "kg",
  stock: 15,
  min: 5,
  cost: 28,
  cat: "Insumo"
}, {
  id: 6,
  name: "Chocolate en polvo",
  unit: "kg",
  stock: 3,
  min: 2,
  cost: 180,
  cat: "Insumo"
}, {
  id: 7,
  name: "Naranja",
  unit: "docena",
  stock: 12,
  min: 6,
  cost: 85,
  cat: "Fruta"
}, {
  id: 8,
  name: "Hielo",
  unit: "bolsa 5kg",
  stock: 20,
  min: 10,
  cost: 45,
  cat: "Insumo"
}, {
  id: 9,
  name: "Vasos 12oz (×100)",
  unit: "paquete",
  stock: 5,
  min: 3,
  cost: 220,
  cat: "Empaque"
}, {
  id: 10,
  name: "Pan para sandwich",
  unit: "bolsa ×10",
  stock: 8,
  min: 4,
  cost: 65,
  cat: "Alimento"
}, {
  id: 11,
  name: "Pechuga de pollo",
  unit: "kg",
  stock: 5,
  min: 3,
  cost: 145,
  cat: "Alimento"
}, {
  id: 12,
  name: "Servilletas",
  unit: "paq ×500",
  stock: 3,
  min: 4,
  cost: 85,
  cat: "Empaque"
}];
const EMP0 = [{
  id: 1,
  name: "Roberto Valle",
  pos: "Supervisor",
  sal: 14000,
  since: "2024-01-01",
  active: true
}, {
  id: 2,
  name: "Ana Ramos",
  pos: "Barista Senior",
  sal: 9500,
  since: "2024-01-15",
  active: true
}, {
  id: 3,
  name: "María Rodas",
  pos: "Cocinera",
  sal: 9000,
  since: "2024-01-15",
  active: true
}, {
  id: 4,
  name: "Carlos Mejía",
  pos: "Barista",
  sal: 7800,
  since: "2024-02-01",
  active: true
}, {
  id: 5,
  name: "Sofía Torres",
  pos: "Cajera",
  sal: 8000,
  since: "2024-02-01",
  active: true
}, {
  id: 6,
  name: "Luis Pineda",
  pos: "Barista",
  sal: 7800,
  since: "2024-03-01",
  active: true
}, {
  id: 7,
  name: "Jorge Flores",
  pos: "Auxiliar Cocina",
  sal: 7200,
  since: "2024-03-15",
  active: true
}, {
  id: 8,
  name: "Patricia Cruz",
  pos: "Barista",
  sal: 7800,
  since: "2024-04-01",
  active: true
}, {
  id: 9,
  name: "Elena Sorto",
  pos: "Barista",
  sal: 7800,
  since: "2024-04-15",
  active: true
}, {
  id: 10,
  name: "Diego Funez",
  pos: "Limpieza",
  sal: 6500,
  since: "2024-02-15",
  active: true
}, {
  id: 11,
  name: "Carmen Aguilar",
  pos: "Cajera",
  sal: 8000,
  since: "2024-05-01",
  active: true
}];
const SUP0 = [{
  id: 1,
  name: "Café Orgánico Marcala",
  contact: "Pedro Moncada",
  phone: "9988-7766",
  cat: "Café",
  bal: 15400,
  due: "2026-03-30"
}, {
  id: 2,
  name: "Lácteos La Esperanza",
  contact: "Rosa Fuentes",
  phone: "9977-6655",
  cat: "Lácteos",
  bal: 8200,
  due: "2026-03-25"
}, {
  id: 3,
  name: "Distribuidora El Colono",
  contact: "Marco Molina",
  phone: "9966-5544",
  cat: "Insumos",
  bal: 4500,
  due: "2026-04-10"
}, {
  id: 4,
  name: "Panadería San Miguel",
  contact: "Elena Paz",
  phone: "9955-4433",
  cat: "Alimentos",
  bal: 3200,
  due: "2026-03-28"
}, {
  id: 5,
  name: "Plastihogar (empaques)",
  contact: "Carlos Durón",
  phone: "9944-3322",
  cat: "Empaque",
  bal: 6800,
  due: "2026-04-05"
}];
const ACTIVOS0 = [{
  id: 1,
  name: "Máquina Espresso La Marzocco",
  cat: "Equipo",
  costo: 280000,
  fecha: "2024-01-01",
  vida: 10,
  residual: 28000
}, {
  id: 2,
  name: "Molino de Café Mazzer",
  cat: "Equipo",
  costo: 35000,
  fecha: "2024-01-01",
  vida: 7,
  residual: 3500
}, {
  id: 3,
  name: "Refrigerador Comercial",
  cat: "Equipo",
  costo: 45000,
  fecha: "2024-01-15",
  vida: 8,
  residual: 4500
}, {
  id: 4,
  name: "Blender Vitamix (x2)",
  cat: "Equipo",
  costo: 28000,
  fecha: "2024-02-01",
  vida: 5,
  residual: 2800
}, {
  id: 5,
  name: "Mobiliario (mesas/sillas)",
  cat: "Mobiliario",
  costo: 120000,
  fecha: "2024-01-01",
  vida: 10,
  residual: 12000
}, {
  id: 6,
  name: "POS y equipo cómputo",
  cat: "Tecnología",
  costo: 25000,
  fecha: "2024-01-01",
  vida: 3,
  residual: 2500
}, {
  id: 7,
  name: "Rótulo y decoración",
  cat: "Mejoras",
  costo: 65000,
  fecha: "2024-01-01",
  vida: 5,
  residual: 0
}];
const RECIPES = [{
  id: 1,
  prod: "Espresso",
  unit: "taza",
  ingredients: [{
    name: "Café en grano (hondureño)",
    qty: 0.018,
    u: "kg",
    c: 280
  }]
}, {
  id: 2,
  prod: "Americano",
  unit: "taza",
  ingredients: [{
    name: "Café en grano (hondureño)",
    qty: 0.018,
    u: "kg",
    c: 280
  }]
}, {
  id: 3,
  prod: "Cappuccino",
  unit: "taza",
  ingredients: [{
    name: "Café en grano (hondureño)",
    qty: 0.018,
    u: "kg",
    c: 280
  }, {
    name: "Leche entera",
    qty: 0.15,
    u: "litro",
    c: 32
  }]
}, {
  id: 4,
  prod: "Latte",
  unit: "taza",
  ingredients: [{
    name: "Café en grano (hondureño)",
    qty: 0.018,
    u: "kg",
    c: 280
  }, {
    name: "Leche entera",
    qty: 0.22,
    u: "litro",
    c: 32
  }]
}, {
  id: 5,
  prod: "Mocha",
  unit: "taza",
  ingredients: [{
    name: "Café en grano (hondureño)",
    qty: 0.018,
    u: "kg",
    c: 280
  }, {
    name: "Leche entera",
    qty: 0.18,
    u: "litro",
    c: 32
  }, {
    name: "Chocolate en polvo",
    qty: 0.015,
    u: "kg",
    c: 180
  }]
}, {
  id: 6,
  prod: "Cold Brew",
  unit: "vaso",
  ingredients: [{
    name: "Café molido (proveedor)",
    qty: 0.03,
    u: "kg",
    c: 320
  }]
}, {
  id: 7,
  prod: "Granita de Café",
  unit: "vaso",
  ingredients: [{
    name: "Café molido (proveedor)",
    qty: 0.025,
    u: "kg",
    c: 320
  }, {
    name: "Leche entera",
    qty: 0.18,
    u: "litro",
    c: 32
  }, {
    name: "Hielo",
    qty: 0.2,
    u: "bolsa 5kg",
    c: 45
  }, {
    name: "Azúcar",
    qty: 0.02,
    u: "kg",
    c: 28
  }]
}];
const METAS0 = [{
  mes: "Ene 2026",
  meta: 580000,
  real: 558000
}, {
  mes: "Feb 2026",
  meta: 600000,
  real: 580000
}, {
  mes: "Mar 2026",
  meta: 620000,
  real: 612400
}, {
  mes: "Abr 2026",
  meta: 650000,
  real: 0
}, {
  mes: "May 2026",
  meta: 680000,
  real: 0
}, {
  mes: "Jun 2026",
  meta: 720000,
  real: 0
}];

// ── UTILS ──────────────────────────────────────────────────────
const L = n => `L. ${(+n).toLocaleString("es-HN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;
const D = n => `$ ${(+n).toLocaleString("es-HN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;
const pct = n => `${(+n).toFixed(1)}%`;
const today = () => new Date().toISOString().slice(0, 10);
const rcost = r => r.ingredients.reduce((s, i) => s + i.qty * i.c, 0);
const mkAv = n => n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
const mkKey = () => {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
    s = n => Array.from({
      length: n
    }, () => c[Math.floor(Math.random() * c.length)]).join("");
  return `DEMO-${s(4)}-${s(4)}-${s(4)}`;
};
const nomina = sal => {
  const bEM = Math.min(sal, IHSS_TOPE),
    bR = Math.min(sal, RAP_TOPE),
    ie = bEM * 0.025 + bEM * 0.01,
    ip = bEM * 0.05 + bEM * 0.025,
    re = bR * 0.015,
    rp = bR * 0.015,
    inf = sal * 0.01;
  return {
    bruto: sal,
    ie: +ie.toFixed(2),
    ip: +ip.toFixed(2),
    re: +re.toFixed(2),
    rp: +rp.toFixed(2),
    inf: +inf.toFixed(2),
    neto: +(sal - ie - re).toFixed(2),
    costo: +(sal + ip + rp + inf).toFixed(2)
  };
};
const depAnual = a => (a.costo - a.residual) / a.vida;
const yearsUsed = fecha => (new Date() - new Date(fecha)) / (365.25 * 86400000);
const depAcum = a => Math.min(a.costo - a.residual, depAnual(a) * yearsUsed(a.fecha));
const valLibros = a => a.costo - depAcum(a);
const exportXLSX = (sheets, filename) => {
  const wb = XLSX.utils.book_new();
  sheets.forEach(({
    name,
    data
  }) => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = data[0]?.map((_, ci) => ({
      wch: Math.max(...data.map(r => String(r[ci] ?? '').length), 12) + 2
    }));
    XLSX.utils.book_append_sheet(wb, ws, name);
  });
  XLSX.writeFile(wb, filename);
};

// ── STYLE HELPERS ──────────────────────────────────────────────
const card = (x = {}) => ({
  background: "#fff",
  borderRadius: 12,
  padding: "20px 24px",
  boxShadow: "0 2px 14px rgba(28,10,0,.07)",
  ...x
});
const inp = (x = {}) => ({
  width: "100%",
  padding: "9px 13px",
  borderRadius: 8,
  border: `1.5px solid ${T.latte}`,
  fontFamily: "inherit",
  fontSize: 13,
  color: T.text,
  background: T.steam,
  outline: "none",
  boxSizing: "border-box",
  ...x
});
const bdg = (c, b) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  color: c,
  background: b,
  letterSpacing: .4
});
function Btn({
  v = "primary",
  onClick,
  children,
  disabled,
  full,
  small,
  style = {}
}) {
  const vs = {
    primary: {
      background: T.caramel,
      color: "#fff",
      border: "none"
    },
    outline: {
      background: "transparent",
      color: T.caramel,
      border: `1.5px solid ${T.caramel}`
    },
    ghost: {
      background: "transparent",
      color: T.muted,
      border: `1px solid ${T.latte}`
    },
    danger: {
      background: T.danger,
      color: "#fff",
      border: "none"
    },
    success: {
      background: T.success,
      color: "#fff",
      border: "none"
    },
    dark: {
      background: T.espresso,
      color: T.gold,
      border: "none"
    },
    info: {
      background: T.info,
      color: "#fff",
      border: "none"
    },
    warning: {
      background: T.warning,
      color: "#fff",
      border: "none"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: {
      ...vs[v],
      padding: small ? "5px 12px" : "8px 18px",
      borderRadius: 8,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      fontSize: small ? 12 : 13,
      fontWeight: 600,
      opacity: disabled ? .5 : 1,
      width: full ? "100%" : "auto",
      transition: "opacity .15s",
      ...style
    }
  }, children);
}
function KPI({
  icon,
  label,
  value,
  sub,
  color = T.caramel
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: card({
      display: "flex",
      alignItems: "flex-start",
      gap: 16
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 10,
      background: `${color}18`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      letterSpacing: .6,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 21,
      fontWeight: 700,
      color: T.text
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginTop: 2
    }
  }, sub)));
}
function Page({
  title,
  sub,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      fontFamily: "'Crimson Pro',serif",
      color: T.text
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 24,
      fontWeight: 700,
      margin: 0,
      color: T.espresso
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      margin: "4px 0 0"
    }
  }, sub)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, actions)), children);
}
function THead({
  cols
}) {
  return /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.steam
    }
  }, cols.map(c => /*#__PURE__*/React.createElement("th", {
    key: c,
    style: {
      padding: "9px 14px",
      textAlign: "left",
      fontSize: 10,
      fontWeight: 700,
      color: T.muted,
      letterSpacing: .5,
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, c))));
}
function Modal({
  onClose,
  children,
  width = 380
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(28,10,0,.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      width: "100%",
      maxWidth: width,
      maxHeight: "90vh",
      overflowY: "auto"
    })
  }, children));
}
function ProgressBar({
  val,
  max,
  color = T.caramel,
  height = 10
}) {
  const p = Math.min(100, val / max * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: height / 2,
      background: T.steam
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p}%`,
      height: "100%",
      borderRadius: height / 2,
      background: color,
      transition: "width .4s"
    }
  }));
}

// ── LOGIN ──────────────────────────────────────────────────────
function Login({
  onLogin,
  demoKeys,
  users
}) {
  const [mode, setMode] = useState("user");
  const [sel, setSel] = useState(null);
  const [pass, setPass] = useState("");
  const [demoK, setDemoK] = useState("");
  const [err, setErr] = useState("");
  const [androidReady, setAndroidReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showAndroidInstructions, setShowAndroidInstructions] = useState(false);
  const installPromptRef = React.useRef(null);
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      installPromptRef.current = e;
      setAndroidReady(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setAndroidReady(false);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  const installAndroid = async () => {
    if (installPromptRef.current) {
      installPromptRef.current.prompt();
      const {
        outcome
      } = await installPromptRef.current.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setAndroidReady(false);
      }
      installPromptRef.current = null;
    } else {
      setShowAndroidInstructions(true);
    }
  };
  const downloadPC = () => {
    const bat = `@echo off\r\nchcp 65001 >nul\r\ntitle CafeFinanzas HN Instalador\r\necho.\r\necho  CafeFinanzas HN v4.0 - Instalador para Windows\r\necho  Republica de Honduras\r\necho.\r\necho [1/4] Verificando Node.js...\r\nnode --version >nul 2>&1\r\nif %errorlevel% neq 0 (\r\n  echo  Node.js no encontrado. Descargando...\r\n  start https://nodejs.org/en/download\r\n  echo  Instala Node.js LTS y vuelve a ejecutar este archivo.\r\n  pause\r\n  exit /b\r\n)\r\necho  OK - Node.js detectado.\r\necho.\r\necho [2/4] Creando proyecto React...\r\ncall npm create vite@latest cafefinanzas -- --template react --yes\r\ncd cafefinanzas\r\necho.\r\necho [3/4] Instalando dependencias (2-3 minutos)...\r\ncall npm install\r\ncall npm install xlsx\r\necho.\r\necho [4/4] Listo! Abriendo carpeta src...\r\nexplorer src\r\necho.\r\necho PASO FINAL:\r\necho 1. Copia tu archivo cafefinanzas-hn-v4.jsx en la carpeta src\r\necho 2. Renombralo a App.jsx (reemplaza el existente)\r\necho 3. Ejecuta: npm run dev\r\necho 4. Abre: http://localhost:5173\r\necho.\r\npause`;
    const blob = new Blob([bat], {
      type: 'text/plain;charset=utf-8'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Instalar_CafeFinanzas_HN.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const go = () => {
    if (mode === "demo") {
      const found = demoKeys.find(k => k.key === demoK.trim().toUpperCase() && new Date(k.expires) > new Date());
      if (!found) {
        setErr("Clave inválida o expirada");
        return;
      }
      onLogin({
        id: 0,
        name: "Usuario Demo",
        role: "admin",
        av: "DM",
        isDemo: true
      });
      return;
    }
    if (!sel || !pass) {
      setErr("Selecciona un usuario e ingresa la contraseña");
      return;
    }
    if (pass !== sel.pass) {
      setErr("Contraseña incorrecta");
      return;
    }
    onLogin(sel);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: T.espresso,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&family=Source+Code+Pro:wght@400;600&display=swap');*{box-sizing:border-box;}body{margin:0;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:${T.latte};border-radius:3px;}input:focus{border-color:${T.caramel}!important;box-shadow:0 0 0 3px rgba(200,132,26,.15)!important;}button:hover:not(:disabled){opacity:.85;}tr:hover td{background:rgba(200,132,26,.04);}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 520,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(145deg,#F7EDD8,#EDD8B5)",
      borderRadius: 20,
      padding: "14px 20px",
      boxShadow: "0 8px 32px rgba(0,0,0,.4),0 0 0 1px rgba(212,168,83,.3)",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "data:image/jpeg;base64,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",
    alt: "Caf\xE9Finanzas HN",
    style: {
      width: 80,
      height: "auto",
      display: "block"
    }
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Playfair Display',serif",
      color: T.gold,
      fontSize: 30,
      fontWeight: 700,
      margin: "6px 0 4px"
    }
  }, "Caf\xE9Finanzas HN"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.latte,
      fontSize: 12,
      letterSpacing: 1,
      margin: 0
    }
  }, "SISTEMA DE GESTI\xD3N FINANCIERA \xB7 HONDURAS")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.roast,
      borderRadius: 16,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 18
    }
  }, [["user", "👤 Acceso Normal"], ["demo", "🔑 Clave de Demo"]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setMode(v);
      setErr("");
    },
    style: {
      flex: 1,
      padding: "9px",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 600,
      border: "none",
      background: mode === v ? T.caramel : "#1a0800",
      color: mode === v ? "#fff" : T.latte
    }
  }, l))), mode === "user" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.latte,
      fontSize: 12,
      marginBottom: 10
    }
  }, "Selecciona tu perfil:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 16
    }
  }, users.filter(u => u.active).map(u => /*#__PURE__*/React.createElement("div", {
    key: u.id,
    onClick: () => {
      setSel(u);
      setPass("");
      setErr("");
    },
    style: {
      padding: "11px 10px",
      borderRadius: 10,
      cursor: "pointer",
      border: `2px solid ${sel?.id === u.id ? ROLES_DEF[u.role].color : "transparent"}`,
      background: sel?.id === u.id ? `${ROLES_DEF[u.role].color}22` : "#1a0800"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: ROLES_DEF[u.role].color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: T.espresso,
      ...mono
    }
  }, u.av), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.cream,
      fontSize: 13,
      fontWeight: 600
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: ROLES_DEF[u.role].color,
      fontSize: 11
    }
  }, ROLES_DEF[u.role].label)))))), sel && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: {
      color: T.latte,
      fontSize: 11,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "CONTRASE\xD1A"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pass,
    onChange: e => {
      setPass(e.target.value);
      setErr("");
    },
    onKeyDown: e => e.key === "Enter" && go(),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: {
      ...inp(),
      background: "rgba(255,255,255,.08)",
      borderColor: "#3a1a00",
      color: T.cream,
      marginBottom: err ? 6 : 12
    }
  }))), mode === "demo" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(212,168,83,.1)",
      border: `1px solid ${T.gold}30`,
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 14,
      fontSize: 13,
      color: T.latte
    }
  }, "\uD83D\uDD11 Ingresa la clave de demostraci\xF3n compartida contigo."), /*#__PURE__*/React.createElement("label", {
    style: {
      color: T.latte,
      fontSize: 11,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "CLAVE DE DEMO"), /*#__PURE__*/React.createElement("input", {
    value: demoK,
    onChange: e => {
      setDemoK(e.target.value);
      setErr("");
    },
    onKeyDown: e => e.key === "Enter" && go(),
    placeholder: "DEMO-XXXX-XXXX-XXXX",
    style: {
      ...inp(),
      background: "rgba(255,255,255,.08)",
      borderColor: "#3a1a00",
      color: T.cream,
      ...mono,
      letterSpacing: 2,
      marginBottom: err ? 6 : 12
    }
  })), err && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.danger,
      fontSize: 12,
      margin: "0 0 10px"
    }
  }, err), /*#__PURE__*/React.createElement(Btn, {
    full: true,
    v: "primary",
    onClick: go,
    style: {
      padding: 12,
      fontSize: 14
    }
  }, "Ingresar \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,.3)",
      textAlign: "center",
      letterSpacing: .6,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "Instalar en tu dispositivo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    }
  }, installed ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1/-1",
      background: `${T.success}22`,
      border: `1px solid ${T.success}`,
      borderRadius: 10,
      padding: "10px 14px",
      textAlign: "center",
      fontSize: 13,
      color: T.success,
      fontWeight: 600
    }
  }, "\u2713 App instalada correctamente en tu dispositivo") : /*#__PURE__*/React.createElement("button", {
    onClick: installAndroid,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      borderRadius: 10,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 600,
      border: `1px solid ${androidReady ? "#4CAF50" : "#C8841A55"}`,
      background: androidReady ? "rgba(76,175,80,.15)" : "rgba(200,132,26,.1)",
      color: androidReady ? "#81C784" : "#C8841A",
      transition: "all .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, "Android"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: .7,
      fontWeight: 400
    }
  }, androidReady ? "Toca para instalar" : "Ver instrucciones")), androidReady && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\u2193")), /*#__PURE__*/React.createElement("button", {
    onClick: downloadPC,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      borderRadius: 10,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 600,
      border: `1px solid rgba(0,120,212,.5)`,
      background: "rgba(0,120,212,.1)",
      color: "#6BB8F5",
      transition: "all .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDDA5\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, "Windows PC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: .7,
      fontWeight: 400
    }
  }, "Descargar instalador .bat")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\u2B07"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,.04)",
      borderRadius: 8,
      padding: "8px 12px",
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\uD83C\uDF4E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,.35)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "rgba(255,255,255,.5)"
    }
  }, "iPhone:"), " Abre en Safari \u2192 Compartir \u2192 \"Agregar a pantalla de inicio\"")),
  showAndroidInstructions && /*#__PURE__*/React.createElement("div", {
    style: {position:"fixed",inset:0,background:"rgba(28,10,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:20}
  }, /*#__PURE__*/React.createElement("div", {
    style: {background:"#fff",borderRadius:16,padding:28,maxWidth:380,width:"100%"}
  },
    /*#__PURE__*/React.createElement("div", {style:{fontSize:32,textAlign:"center",marginBottom:12}}, "🤖"),
    /*#__PURE__*/React.createElement("h3", {style:{fontFamily:"'Playfair Display',serif",fontSize:20,margin:"0 0 8px",color:"#1C0A00",textAlign:"center"}}, "Instalar en Android"),
    /*#__PURE__*/React.createElement("div", {style:{background:"#FFF8EE",borderRadius:10,padding:14,marginBottom:16}},
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#C8841A"}}, "Opción 1 — Automática (recomendada):"),
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 4px",fontSize:13,color:"#5A5A5A"}}, "1. Sube el archivo HTML a Netlify (app.netlify.com/drop)"),
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 4px",fontSize:13,color:"#5A5A5A"}}, "2. Abre la URL en Chrome en tu Android"),
      /*#__PURE__*/React.createElement("p", {style:{margin:0,fontSize:13,color:"#5A5A5A"}}, "3. Aparece banner azul → toca Instalar ✓")
    ),
    /*#__PURE__*/React.createElement("div", {style:{background:"#F5F5F5",borderRadius:10,padding:14,marginBottom:16}},
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"#1565C0"}}, "Opción 2 — Manual desde Chrome:"),
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 4px",fontSize:13,color:"#5A5A5A"}}, "1. Abre este archivo en Chrome en tu Android"),
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 4px",fontSize:13,color:"#5A5A5A"}}, "2. Toca el menú ⋮ (tres puntos, arriba derecha)"),
      /*#__PURE__*/React.createElement("p", {style:{margin:"0 0 4px",fontSize:13,color:"#5A5A5A"}}, "3. Toca \"Agregar a pantalla de inicio\""),
      /*#__PURE__*/React.createElement("p", {style:{margin:0,fontSize:13,color:"#5A5A5A"}}, "4. Toca \"Agregar\" ✓")
    ),
    /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowAndroidInstructions(false),
      style:{width:"100%",padding:"10px",borderRadius:8,border:"none",background:"#C8841A",color:"#fff",fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer"}
    }, "Entendido")
  ))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,.15)",
      fontSize: 10,
      textAlign: "center",
      marginTop: 12
    }
  }, "v4.0 \xB7 Caf\xE9Finanzas HN \xB7 Rep\xFAblica de Honduras")));
}

// ── SIDEBAR ────────────────────────────────────────────────────
function Sidebar({
  user,
  active,
  onNav,
  onLogout
}) {
  const [col, setCol] = useState(false);
  const allowed = ROLES_DEF[user.role].modules;
  const rc = ROLES_DEF[user.role].color;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: col ? 54 : 220,
      minHeight: "100vh",
      background: T.espresso,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      transition: "width .2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: col ? "14px 8px" : "14px 16px",
      borderBottom: `1px solid #2e1200`
    }
  }, col ? /*#__PURE__*/React.createElement("img", {
    src: "data:image/jpeg;base64,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",
    style: {
      width: 28,
      height: "auto",
      borderRadius: 4
    },
    alt: "logo"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "data:image/jpeg;base64,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",
    style: {
      width: 28,
      height: "auto",
      borderRadius: 4
    },
    alt: "logo"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Playfair Display',serif",
      color: T.gold,
      fontSize: 14,
      fontWeight: 700
    }
  }, "Caf\xE9Finanzas"))), !col && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 14px",
      borderBottom: `1px solid #2e1200`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,.3)",
      letterSpacing: .6,
      marginBottom: 3
    }
  }, "SESI\xD3N"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: rc,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      fontWeight: 700,
      color: T.espresso,
      ...mono,
      flexShrink: 0
    }
  }, user.av), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.cream,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 130
    }
  }, user.name), user.isDemo && /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, "#FFD700")
  }, "DEMO")))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: "6px 4px",
      overflowY: "auto"
    }
  }, MODS_ALL.filter(m => allowed.includes(m.id)).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    onClick: () => onNav(m.id),
    title: col ? m.label : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: col ? "10px" : "7px 10px",
      borderRadius: 7,
      cursor: "pointer",
      marginBottom: 1,
      background: active === m.id ? `${T.caramel}28` : "transparent",
      borderLeft: active === m.id ? `3px solid ${T.caramel}` : "3px solid transparent",
      justifyContent: col ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, m.icon), !col && /*#__PURE__*/React.createElement("span", {
    style: {
      color: active === m.id ? T.gold : T.latte,
      fontSize: 12.5,
      fontWeight: active === m.id ? 600 : 400
    }
  }, m.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 4px",
      borderTop: `1px solid #2e1200`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setCol(!col),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 10px",
      borderRadius: 7,
      cursor: "pointer",
      justifyContent: col ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted,
      fontSize: 12
    }
  }, col ? "▶" : "◀"), !col && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted,
      fontSize: 12
    }
  }, "Colapsar")), /*#__PURE__*/React.createElement("div", {
    onClick: onLogout,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 10px",
      borderRadius: 7,
      cursor: "pointer",
      justifyContent: col ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\uD83D\uDEAA"), !col && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.danger,
      fontSize: 12
    }
  }, "Cerrar Sesi\xF3n"))));
}

// ── FACTURA ────────────────────────────────────────────────────
function FacturaModal({
  sale,
  xr,
  onClose
}) {
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    width: 520
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Courier New',monospace",
      fontSize: 13,
      color: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      borderBottom: "2px solid #000",
      paddingBottom: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontFamily: "'Playfair Display',serif",
      fontWeight: 700
    }
  }, "\u2615 Mi Coffee Shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11
    }
  }, "San Pedro Sula, Cort\xE9s, Honduras"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700
    }
  }, "RTN: Pendiente de registro")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF9E6",
      border: `1.5px solid ${T.gold}`,
      borderRadius: 6,
      padding: "8px 12px",
      marginBottom: 10,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, "CAI: PENDIENTE-SAR-2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.muted,
      marginTop: 2
    }
  }, "\u26A0\uFE0F Registrar CAI al formalizar con el SAR")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6,
      marginBottom: 10,
      fontSize: 12
    }
  }, [["No. Factura", String(sale.invoiceNum || 1).padStart(8, "0")], ["Fecha", sale.date], ["Hora", sale.time], ["Método", sale.method?.toUpperCase()]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      borderBottom: "1px dotted #ccc",
      paddingBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l, ": "), /*#__PURE__*/React.createElement("strong", null, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      border: "1px solid #ddd",
      borderRadius: 6,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 1fr 1fr",
      background: "#F0E8D8",
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, "Descripci\xF3n"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "Cant."), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "P.Unit."), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "Total")), sale.items?.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 1fr 1fr",
      padding: "4px 10px",
      fontSize: 12,
      borderBottom: "1px dotted #eee"
    }
  }, /*#__PURE__*/React.createElement("span", null, it.name), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, it.qty), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  }, "L.", it.price?.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  }, "L.", (it.price * it.qty)?.toFixed(2))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 6,
      padding: "10px 14px",
      marginBottom: 10
    }
  }, [["Subtotal", L(sale.subtotal)], ["ISV (15%)", L(sale.isv)]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 16,
      fontWeight: 700,
      borderTop: `1.5px solid ${T.caramel}`,
      paddingTop: 6,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "TOTAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(sale.total)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 11,
      color: T.muted
    }
  }, D(sale.total / xr))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 11,
      color: T.muted
    }
  }, "\xA1Gracias por su visita! \xB7 ISV declarado conforme Ley de Equidad Tributaria")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: onClose,
    style: {
      flex: 1
    }
  }, "Cerrar"), /*#__PURE__*/React.createElement(Btn, {
    v: "info",
    onClick: () => window.print(),
    style: {
      flex: 1
    }
  }, "\uD83D\uDDA8\uFE0F Imprimir")));
}

// ── DASHBOARD ──────────────────────────────────────────────────
function Dashboard({
  sales,
  inventory,
  employees,
  xr,
  xrStatus,
  cierres,
  gastos,
  cxc
}) {
  const td = today();
  const todaySales = sales.filter(s => s.date === td);
  const totalHoy = todaySales.reduce((s, v) => s + v.total, 0);
  const lowStock = inventory.filter(i => i.stock <= i.min);
  const nomMes = employees.filter(e => e.active).reduce((s, e) => s + nomina(e.sal).costo, 0);
  const cxcPend = cxc.filter(c => c.estado === "pendiente").reduce((s, c) => s + c.monto, 0);
  const gastosMes = gastos.filter(g => g.fecha?.startsWith("2026-03")).reduce((s, g) => s + g.monto, 0);
  const sim7 = [18400, 22100, 19800, 25600, 21300, 28900, totalHoy || 31200];
  const maxB = Math.max(...sim7);
  const mix = [{
    cat: "Café",
    pct: 52,
    color: T.espresso
  }, {
    cat: "Granitas",
    pct: 21,
    color: T.caramel
  }, {
    cat: "Alimentos",
    pct: 18,
    color: T.success
  }, {
    cat: "Bebidas",
    pct: 9,
    color: T.info
  }];
  return /*#__PURE__*/React.createElement(Page, {
    title: "Dashboard",
    sub: `${new Date().toLocaleDateString("es-HN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB5",
    label: "Ventas Hoy",
    value: L(totalHoy || 31200),
    sub: `${todaySales.length || 47} transacciones`,
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u26A0\uFE0F",
    label: "Stock Bajo",
    value: `${lowStock.length} ítems`,
    sub: "Requieren reorden",
    color: T.warning
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCBC",
    label: "CxC Pendiente",
    value: L(cxcPend),
    sub: "Cuentas por cobrar",
    color: T.info
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83E\uDDFE",
    label: "Gastos del Mes",
    value: L(gastosMes),
    sub: "Operativos registrados",
    color: T.danger
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: "0 0 14px"
    }
  }, "Ventas \xDAltimos 7 D\xEDas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      height: 110
    }
  }, ["L", "M", "X", "J", "V", "S", "Hoy"].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 9,
      color: T.muted
    }
  }, (sim7[i] / 1000).toFixed(0), "k"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      borderRadius: "3px 3px 0 0",
      background: i === 6 ? T.caramel : `${T.caramel}55`,
      height: `${sim7[i] / maxB * 100}px`,
      minHeight: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: i === 6 ? T.caramel : T.muted,
      fontWeight: i === 6 ? 700 : 400
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: "0 0 12px"
    }
  }, "Mix de Ventas"), mix.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.cat,
    style: {
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, m.cat), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12,
      fontWeight: 600
    }
  }, m.pct, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    val: m.pct,
    max: 100,
    color: m.color,
    height: 7
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 15,
      margin: "0 0 12px"
    }
  }, "\u26A0\uFE0F Stock Bajo"), lowStock.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.success,
      fontSize: 13
    }
  }, "\u2713 Inventario OK"), lowStock.slice(0, 5).map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      borderBottom: `1px solid ${T.steam}`,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, i.name), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", i.stock === 0 ? T.danger : T.warning)
  }, i.stock)))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 15,
      margin: 0
    }
  }, "\uD83D\uDCB1 Tipo de Cambio"), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", xrStatus === "live" ? T.success : T.muted)
  }, xrStatus === "live" ? "● En vivo" : "Manual")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 14,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 28,
      fontWeight: 700,
      color: T.caramel
    }
  }, "L. ", xr.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.muted,
      fontSize: 12
    }
  }, "por 1 USD \xB7 BCH"))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 15,
      margin: "0 0 12px"
    }
  }, "\uD83C\uDFE6 \xDAltimo Cierre de Caja"), cierres.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13
    }
  }, "No hay cierres registrados a\xFAn.") : (() => {
    const c = cierres[0];
    const diff = c.efectivoReal - c.efectivoSistema;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.muted
      }
    }, "Fecha"), /*#__PURE__*/React.createElement("span", {
      style: mono
    }, c.fecha)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.muted
      }
    }, "Total vendido"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontWeight: 700
      }
    }, L(c.totalSistema))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.muted
      }
    }, "Diferencia"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontWeight: 700,
        color: diff === 0 ? T.success : T.danger
      }
    }, L(diff))));
  })())));
}

// ── POS ────────────────────────────────────────────────────────
function POS({
  products,
  sales,
  setSales,
  xr,
  invoiceCounter,
  setInvoiceCounter,
  turnoActivo,
  inventory,
  setInventory
}) {
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [factura, setFactura] = useState(null);
  const [method, setMethod] = useState("efectivo");
  const [cur, setCur] = useState("HNL");
  const [rcv, setRcv] = useState("");
  const [flash, setFlash] = useState(null);
  const [lastSale, setLastSale] = useState(null);
  const cats = ["Todos", ...new Set(products.filter(p => p.active).map(p => p.cat))];
  const filtered = cat === "Todos" ? products.filter(p => p.active) : products.filter(p => p.cat === cat && p.active);
  const add = p => setCart(prev => {
    const ex = prev.find(i => i.id === p.id);
    return ex ? prev.map(i => i.id === p.id ? {
      ...i,
      qty: i.qty + 1
    } : i) : [...prev, {
      ...p,
      qty: 1
    }];
  });
  const sub = p => setCart(prev => prev.map(i => i.id === p.id ? {
    ...i,
    qty: Math.max(0, i.qty - 1)
  } : i).filter(i => i.qty > 0));
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const isv = subtotal * ISV,
    total = subtotal + isv;
  const rcvN = parseFloat(rcv) || 0;
  const change = cur === "USD" ? rcvN * xr - total : rcvN - total;
  const catIcon = c => ({
    Café: "☕",
    Granitas: "🧋",
    Bebidas: "🥤",
    Alimentos: "🥪"
  })[c] || "🍽️";
  const pay = () => {
    if (!cart.length) return;
    const num = invoiceCounter + 1;
    setInvoiceCounter(num);
    const s = {
      id: Date.now(),
      date: today(),
      time: new Date().toLocaleTimeString("es-HN"),
      items: [...cart],
      subtotal,
      isv,
      total,
      method,
      cur,
      invoiceNum: num,
      turno: turnoActivo?.id || null
    };
    setSales(p => [s, ...p]);
    setLastSale(s);

    // Descontar ingredientes del inventario según fichas técnicas
    const deductions = {};
    cart.forEach(cartItem => {
      const recipe = RECIPES.find(r => r.prod === cartItem.name);
      if (recipe) {
        recipe.ingredients.forEach(ing => {
          deductions[ing.name] = (deductions[ing.name] || 0) + ing.qty * cartItem.qty;
        });
      }
    });
    if (Object.keys(deductions).length > 0) {
      setInventory(prev => prev.map(inv => {
        const consumed = deductions[inv.name];
        if (!consumed) return inv;
        const newStock = Math.max(0, parseFloat((inv.stock - consumed).toFixed(4)));
        return {
          ...inv,
          stock: newStock
        };
      }));
    }
    setFlash({
      total,
      method,
      invoiceNum: num,
      deductions
    });
    setCart([]);
    setModal(false);
    setRcv("");
    setTimeout(() => setFlash(null), 8000);
  };
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const [showCart, setShowCart] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      height: "100%",
      minHeight: 0,
      fontFamily: "'Crimson Pro',serif",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: isMobile ? 10 : 18,
      background: T.steam,
      paddingBottom: isMobile ? 70 : 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 20,
      margin: 0,
      color: T.espresso
    }
  }, "Punto de Venta"), turnoActivo ? /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.gold)
  }, "\uD83D\uDD04 Turno: ", turnoActivo.empleado) : /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", T.warning)
  }, "\u26A0 Sin turno activo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
      flexWrap: "wrap"
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Btn, {
    key: c,
    v: cat === c ? "primary" : "outline",
    small: true,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(125px,1fr))",
      gap: 8
    }
  }, filtered.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    onClick: () => add(p),
    style: {
      background: "#fff",
      borderRadius: 10,
      padding: 12,
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(28,10,0,.06)",
      border: "2px solid transparent",
      transition: "border .12s"
    },
    onMouseOver: e => e.currentTarget.style.borderColor = T.caramel,
    onMouseOut: e => e.currentTarget.style.borderColor = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 5
    }
  }, catIcon(p.cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      marginBottom: 2
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 13,
      color: T.caramel,
      fontWeight: 700
    }
  }, L(p.price)))))),
  isMobile && /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowCart(true),
    style: {
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: T.espresso, color: "#fff",
      padding: "12px 20px", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      zIndex: 100, cursor: "pointer"
    }
  },
    /*#__PURE__*/React.createElement("span", {style:{fontSize:14,fontWeight:600}},
      cart.length ? "🛒 " + cart.reduce((s,i)=>s+i.qty,0) + " item(s)" : "🛒 Carrito vacío"
    ),
    cart.length > 0 && /*#__PURE__*/React.createElement("span", {
      style:{background:T.caramel,padding:"6px 16px",borderRadius:8,fontWeight:700,fontSize:14}
    }, L(cart.reduce((s,i)=>s+i.price*i.qty,0)))
  ),
  (!isMobile || showCart) && /*#__PURE__*/React.createElement("div", {
    style: {
      width: isMobile ? "100%" : 280,
      background: "#fff",
      borderLeft: isMobile ? "none" : `1px solid ${T.latte}`,
      display: "flex", flexDirection: "column",
      position: isMobile ? "fixed" : "relative",
      bottom: isMobile ? 0 : undefined,
      left: isMobile ? 0 : undefined,
      right: isMobile ? 0 : undefined,
      top: isMobile ? 0 : undefined,
      zIndex: isMobile ? 200 : undefined,
      height: isMobile ? "100%" : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: `1px solid ${T.latte}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 15,
      margin: 0
    }
  }, isMobile && /*#__PURE__*/React.createElement("button", {
      onClick: e => { e.stopPropagation(); setShowCart(false); },
      style: {float:"right",background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.muted,lineHeight:1}
    }, "×"),
    "Orden ", cart.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      ...bdg("#fff", T.caramel),
      marginLeft: 6
    }
  }, cart.reduce((s, i) => s + i.qty, 0)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px 16px"
    }
  }, !cart.length && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      textAlign: "center",
      marginTop: 24
    }
  }, "Toca un producto"), cart.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 0",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 12,
      color: T.caramel
    }
  }, L(item.price * item.qty))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => sub(item)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 13,
      minWidth: 16,
      textAlign: "center"
    }
  }, item.qty), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    small: true,
    onClick: () => add(item)
  }, "+"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderTop: `1px solid ${T.latte}`,
      background: T.steam
    }
  }, [["Subtotal", L(subtotal)], ["ISV (15%)", L(isv)]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 15,
      fontWeight: 700,
      margin: "6px 0 10px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "TOTAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(total)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 11,
      color: T.muted
    }
  }, D(total / xr)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setCart([]),
    style: {
      flex: 1
    }
  }, "Limpiar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: () => setModal(true),
    disabled: !cart.length,
    style: {
      flex: 2
    }
  }, "Cobrar \u2192")))), flash && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 20,
      right: 20,
      background: T.success,
      color: "#fff",
      borderRadius: 12,
      padding: "12px 18px",
      fontSize: 13,
      boxShadow: "0 4px 20px rgba(0,0,0,.15)",
      zIndex: 999,
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, "\u2713 Venta registrada \xB7 ", L(flash.total)), flash.deductions && Object.keys(flash.deductions).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: .85,
      marginBottom: 6,
      borderTop: "1px solid rgba(255,255,255,.3)",
      paddingTop: 6
    }
  }, "\uD83D\uDCE6 Inventario descontado: ", Object.entries(flash.deductions).map(([k, v]) => `${k} (${v.toFixed(3)})`).join(" · ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setFactura(lastSale);
      setFlash(null);
    },
    style: {
      background: "rgba(255,255,255,.2)",
      border: "none",
      color: "#fff",
      borderRadius: 6,
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit"
    }
  }, "\uD83E\uDDFE Factura #", String(flash.invoiceNum).padStart(6, "0")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFlash(null),
    style: {
      background: "none",
      border: "none",
      color: "rgba(255,255,255,.7)",
      cursor: "pointer",
      fontSize: 16,
      marginLeft: "auto"
    }
  }, "\xD7"))), modal && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setModal(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Procesar Pago"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 12,
      marginBottom: 14,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 28,
      fontWeight: 700,
      color: T.caramel
    }
  }, L(total)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.muted,
      fontSize: 13
    }
  }, D(total / xr))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 14
    }
  }, [["efectivo", "💵 Efectivo", "HNL"], ["tarjeta", "💳 Tarjeta", "HNL"], ["transferencia", "🏦 Transferencia", "HNL"], ["usd", "🇺🇸 Dólares", "USD"]].map(([val, lbl, c]) => /*#__PURE__*/React.createElement(Btn, {
    key: val,
    v: method === val ? "primary" : "outline",
    small: true,
    onClick: () => {
      setMethod(val);
      setCur(c);
    }
  }, lbl))), (method === "efectivo" || method === "usd") && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "RECIBIDO (", cur, ")"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: rcv,
    onChange: e => setRcv(e.target.value),
    style: {
      ...inp(),
      marginBottom: 8
    }
  }), rcvN > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "7px 10px",
      borderRadius: 8,
      background: change >= 0 ? `${T.success}15` : `${T.danger}15`,
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, "Cambio:"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 700,
      color: change >= 0 ? T.success : T.danger
    }
  }, cur === "HNL" ? L(Math.max(0, change)) : D(Math.max(0, change))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setModal(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "success",
    onClick: pay,
    style: {
      flex: 2
    }
  }, "\u2713 Confirmar"))), factura && /*#__PURE__*/React.createElement(FacturaModal, {
    sale: factura,
    xr: xr,
    onClose: () => setFactura(null)
  }));
}

// ── COMANDAS ───────────────────────────────────────────────────
function Comandas({
  products,
  comandas,
  setComandas
}) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    tipo: "mesa",
    mesa: "",
    items: []
  });
  const [search, setSearch] = useState("");
  const statusColor = {
    pendiente: T.warning,
    "en-prep": T.info,
    listo: T.success,
    entregado: T.muted
  };
  const statusLabel = {
    pendiente: "⏳ Pendiente",
    "en-prep": "👨‍🍳 En preparación",
    listo: "✅ Listo",
    entregado: "📦 Entregado"
  };
  const nextStatus = {
    pendiente: "en-prep",
    "en-prep": "listo",
    listo: "entregado"
  };
  const advance = id => setComandas(prev => prev.map(c => c.id === id && nextStatus[c.status] ? {
    ...c,
    status: nextStatus[c.status]
  } : c));
  const addItem = p => setForm(prev => {
    const ex = prev.items.find(i => i.id === p.id);
    return {
      ...prev,
      items: ex ? prev.items.map(i => i.id === p.id ? {
        ...i,
        qty: i.qty + 1
      } : i) : [...prev.items, {
        ...p,
        qty: 1
      }]
    };
  });
  const subItem = p => setForm(prev => ({
    ...prev,
    items: prev.items.map(i => i.id === p.id ? {
      ...i,
      qty: Math.max(0, i.qty - 1)
    } : i).filter(i => i.qty > 0)
  }));
  const saveComanda = () => {
    if (!form.items.length) return;
    setComandas(prev => [{
      id: Date.now(),
      num: prev.length + 1,
      tipo: form.tipo,
      mesa: form.mesa || "Para llevar",
      items: [...form.items],
      status: "pendiente",
      time: new Date().toLocaleTimeString("es-HN"),
      total: form.items.reduce((s, i) => s + i.price * i.qty, 0)
    }, ...prev]);
    setModal(false);
    setForm({
      tipo: "mesa",
      mesa: "",
      items: []
    });
  };
  const active = comandas.filter(c => c.status !== "entregado");
  const prods = products.filter(p => p.active && p.name.toLowerCase().includes(search.toLowerCase()));
  const catIcon = c => ({
    Café: "☕",
    Granitas: "🧋",
    Bebidas: "🥤",
    Alimentos: "🥪"
  })[c] || "🍽️";
  return /*#__PURE__*/React.createElement(Page, {
    title: "\xD3rdenes de Mesa",
    sub: `${active.length} órdenes activas · ${comandas.filter(c => c.status === "listo").length} listas para entregar`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => {
        setModal(true);
        setForm({
          tipo: "mesa",
          mesa: "",
          items: []
        });
      }
    }, "+ Nueva Orden")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 12
    }
  }, active.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      gridColumn: "1/-1",
      textAlign: "center",
      color: T.muted,
      padding: 40
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83D\uDCDD"), /*#__PURE__*/React.createElement("p", null, "No hay \xF3rdenes activas")), active.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: card({
      borderTop: `4px solid ${statusColor[c.status]}`,
      padding: 16
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      fontWeight: 700
    }
  }, "#", c.num, " \u2014 ", c.mesa), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", statusColor[c.status])
  }, statusLabel[c.status])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginBottom: 8
    }
  }, "\uD83D\uDD50 ", c.time), c.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      padding: "3px 0",
      borderBottom: `1px dotted ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("span", null, it.qty, "\xD7 ", it.name), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, L(it.price * it.qty)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 700,
      fontSize: 14,
      margin: "10px 0 10px",
      paddingTop: 6,
      borderTop: `1px solid ${T.latte}`
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(c.total))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, nextStatus[c.status] && /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    full: true,
    small: true,
    onClick: () => advance(c.id)
  }, "\u2192 ", statusLabel[nextStatus[c.status]]), /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    small: true,
    onClick: () => setComandas(prev => prev.filter(x => x.id !== c.id))
  }, "\u2715"))))), modal && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setModal(false),
    width: 580
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nueva Orden de Mesa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, [["mesa", "🪑 Mesa"], ["llevar", "🥡 Para llevar"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: form.tipo === v ? "primary" : "outline",
    onClick: () => setForm(p => ({
      ...p,
      tipo: v
    }))
  }, l)), form.tipo === "mesa" && /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.mesa,
    onChange: e => setForm(p => ({
      ...p,
      mesa: e.target.value
    })),
    placeholder: "Ej: Mesa 5",
    style: {
      ...inp(),
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar producto...",
    style: {
      ...inp(),
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6,
      maxHeight: 200,
      overflowY: "auto",
      marginBottom: 12
    }
  }, prods.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    onClick: () => addItem(p),
    style: {
      padding: "8px 6px",
      borderRadius: 8,
      background: T.steam,
      cursor: "pointer",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18
    }
  }, catIcon(p.cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      marginTop: 2
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 11,
      color: T.caramel
    }
  }, L(p.price))))), form.items.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12
    }
  }, form.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => subItem(it)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, it.qty), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    small: true,
    onClick: () => addItem(it)
  }, "+")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${T.latte}`,
      marginTop: 8,
      paddingTop: 8,
      fontWeight: 700,
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(form.items.reduce((s, i) => s + i.price * i.qty, 0))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setModal(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: saveComanda,
    disabled: !form.items.length,
    style: {
      flex: 2
    }
  }, "Enviar Orden"))));
}

// ── CIERRE DE CAJA ─────────────────────────────────────────────
function CierreCaja({
  sales,
  cierres,
  setCierres
}) {
  const [step, setStep] = useState("resumen");
  const [counts, setCounts] = useState({
    Q500: 0,
    Q200: 0,
    Q100: 0,
    Q50: 0,
    Q20: 0,
    Q10: 0,
    Q5: 0,
    Q2: 0,
    Q1: 0,
    cS50: 0,
    cS20: 0,
    cS10: 0,
    cS5: 0
  });
  const td = today();
  const ventasHoy = sales.filter(s => s.date === td);
  const totalSistema = ventasHoy.reduce((s, v) => s + v.total, 0);
  const efectivoSistema = ventasHoy.filter(s => s.method === "efectivo").reduce((s, v) => s + v.total, 0);
  const billetes = [{
    k: "Q500",
    label: "L. 500",
    val: 500
  }, {
    k: "Q200",
    label: "L. 200",
    val: 200
  }, {
    k: "Q100",
    label: "L. 100",
    val: 100
  }, {
    k: "Q50",
    label: "L. 50",
    val: 50
  }, {
    k: "Q20",
    label: "L. 20",
    val: 20
  }, {
    k: "Q10",
    label: "L. 10",
    val: 10
  }];
  const monedas = [{
    k: "Q5",
    label: "L. 5",
    val: 5
  }, {
    k: "Q2",
    label: "L. 2",
    val: 2
  }, {
    k: "Q1",
    label: "L. 1",
    val: 1
  }, {
    k: "cS50",
    label: "50 ctvs",
    val: .5
  }, {
    k: "cS20",
    label: "20 ctvs",
    val: .2
  }, {
    k: "cS10",
    label: "10 ctvs",
    val: .1
  }, {
    k: "cS5",
    label: "5 ctvs",
    val: .05
  }];
  const efectivoReal = [...billetes, ...monedas].reduce((s, b) => s + (counts[b.k] || 0) * b.val, 0);
  const diff = efectivoReal - efectivoSistema;
  const cerrar = () => {
    setCierres(prev => [{
      id: Date.now(),
      fecha: td,
      totalSistema,
      efectivoSistema,
      efectivoReal,
      diferencia: diff,
      transacciones: ventasHoy.length,
      cierre: new Date().toLocaleTimeString("es-HN")
    }, ...prev]);
    setStep("resumen");
    setCounts({
      Q500: 0,
      Q200: 0,
      Q100: 0,
      Q50: 0,
      Q20: 0,
      Q10: 0,
      Q5: 0,
      Q2: 0,
      Q1: 0,
      cS50: 0,
      cS20: 0,
      cS10: 0,
      cS5: 0
    });
  };
  const yaCerrado = cierres.some(c => c.fecha === td);
  return /*#__PURE__*/React.createElement(Page, {
    title: "Cierre de Caja",
    sub: `Fecha: ${td} · ${ventasHoy.length} transacciones hoy`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 18
    }
  }, [["resumen", "📊 Resumen del Día"], ["conteo", "💵 Conteo de Caja"], ["historial", "📋 Historial"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: step === v ? "primary" : "outline",
    onClick: () => setStep(v)
  }, l))), step === "resumen" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB5",
    label: "Total Vendido",
    value: L(totalSistema),
    sub: `${ventasHoy.length} transacciones`,
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB4",
    label: "Efectivo Sistema",
    value: L(efectivoSistema),
    sub: "Ventas en cash",
    color: T.caramel
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB3",
    label: "Tarjeta / Transfer.",
    value: L(totalSistema - efectivoSistema),
    sub: "Pagos electr\xF3nicos",
    color: T.info
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCCA",
    label: "ISV Generado",
    value: L(ventasHoy.reduce((s, v) => s + v.isv, 0)),
    sub: "Impuesto cobrado",
    color: T.warning
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "Ventas por M\xE9todo de Pago"), ["efectivo", "tarjeta", "transferencia", "usd"].map(m => {
    const tot = ventasHoy.filter(v => v.method === m).reduce((s, v) => s + v.total, 0);
    const cnt = ventasHoy.filter(v => v.method === m).length;
    if (cnt === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: m,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 0",
        borderBottom: `1px solid ${T.steam}`,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        textTransform: "capitalize"
      }
    }, m), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...mono,
        fontWeight: 700
      }
    }, L(tot)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted
      }
    }, cnt, " transacciones")));
  })), !yaCerrado && /*#__PURE__*/React.createElement(Btn, {
    v: "dark",
    onClick: () => setStep("conteo")
  }, "\u2192 Proceder al Conteo de Caja"), yaCerrado && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.success}15`,
      border: `1.5px solid ${T.success}`,
      borderRadius: 10,
      padding: "12px 16px",
      fontSize: 13,
      color: T.success
    }
  }, "\u2713 Caja ya cerrada para hoy. Diferencia: ", L(cierres.find(c => c.fecha === td)?.diferencia || 0))), step === "conteo" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "\uD83D\uDCB5 Billetes"), billetes.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.k,
    style: {
      display: "grid",
      gridTemplateColumns: "80px 1fr 90px",
      gap: 8,
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, b.label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: counts[b.k] || 0,
    onChange: e => setCounts(p => ({
      ...p,
      [b.k]: parseInt(e.target.value) || 0
    })),
    style: {
      ...inp(),
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12,
      color: T.caramel,
      textAlign: "right"
    }
  }, L((counts[b.k] || 0) * b.val))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "\uD83E\uDE99 Monedas y Centavos"), monedas.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.k,
    style: {
      display: "grid",
      gridTemplateColumns: "80px 1fr 90px",
      gap: 8,
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, m.label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: counts[m.k] || 0,
    onChange: e => setCounts(p => ({
      ...p,
      [m.k]: parseInt(e.target.value) || 0
    })),
    style: {
      ...inp(),
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12,
      color: T.caramel,
      textAlign: "right"
    }
  }, L((counts[m.k] || 0) * m.val))))), /*#__PURE__*/React.createElement("div", {
    style: card({
      background: diff === 0 ? `${T.success}10` : diff > 0 ? `${T.info}10` : `${T.danger}10`,
      border: `2px solid ${diff === 0 ? T.success : diff > 0 ? T.info : T.danger}`
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "Efectivo en caja (contado)"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 700
    }
  }, L(efectivoReal))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "Efectivo seg\xFAn sistema"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 700
    }
  }, L(efectivoSistema))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 18,
      fontWeight: 700,
      borderTop: `1.5px solid currentColor`,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "DIFERENCIA"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: diff === 0 ? T.success : diff > 0 ? T.info : T.danger
    }
  }, L(diff))), diff !== 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginTop: 6
    }
  }, diff > 0 ? "↑ Sobrante en caja" : "↓ Faltante en caja")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setStep("resumen"),
    style: {
      flex: 1
    }
  }, "\u2190 Volver"), /*#__PURE__*/React.createElement(Btn, {
    v: "dark",
    full: true,
    onClick: cerrar,
    style: {
      flex: 3
    }
  }, "\uD83D\uDD12 Confirmar Cierre de Caja"))), step === "historial" && /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, cierres.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay cierres registrados a\xFAn."), cierres.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Fecha", "Hora Cierre", "Transacciones", "Total Sistema", "Efectivo Real", "Diferencia", "Estado"]
  }), /*#__PURE__*/React.createElement("tbody", null, cierres.map((c, idx) => /*#__PURE__*/React.createElement("tr", {
    key: c.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, c.fecha), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, c.cierre), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      textAlign: "center"
    }
  }, c.transacciones), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontWeight: 600
    }
  }, L(c.totalSistema)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, L(c.efectivoReal)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontWeight: 700,
      color: c.diferencia === 0 ? T.success : c.diferencia > 0 ? T.info : T.danger
    }
  }, L(c.diferencia)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", c.diferencia === 0 ? T.success : T.warning)
  }, c.diferencia === 0 ? "✓ Exacto" : c.diferencia > 0 ? "Sobrante" : "Faltante")))))))));
}

// ── TURNOS ─────────────────────────────────────────────────────
function Turnos({
  employees,
  turnos,
  setTurnos,
  turnoActivo,
  setTurnoActivo
}) {
  const [form, setForm] = useState({
    empleado: "",
    tipo: "mañana"
  });
  const abrir = () => {
    if (!form.empleado) return;
    const t = {
      id: Date.now(),
      empleado: form.empleado,
      tipo: form.tipo,
      apertura: new Date().toLocaleTimeString("es-HN"),
      fecha: today(),
      cierre: null,
      ventas: 0,
      status: "activo"
    };
    setTurnoActivo(t);
    setTurnos(prev => [t, ...prev]);
    setForm({
      empleado: "",
      tipo: "mañana"
    });
  };
  const cerrar = () => {
    if (!turnoActivo) return;
    setTurnos(prev => prev.map(t => t.id === turnoActivo.id ? {
      ...t,
      cierre: new Date().toLocaleTimeString("es-HN"),
      status: "cerrado"
    } : t));
    setTurnoActivo(null);
  };
  const tipoColor = {
    mañana: T.caramel,
    tarde: T.info,
    noche: T.espresso
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Control de Turnos",
    sub: "Apertura y cierre de turno por empleado"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 14px"
    }
  }, turnoActivo ? "🟢 Turno Activo" : "🔴 Sin Turno Activo"), turnoActivo ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 14,
      marginBottom: 14
    }
  }, [["Empleado", turnoActivo.empleado], ["Turno", turnoActivo.tipo], ["Apertura", turnoActivo.apertura], ["Fecha", turnoActivo.fecha]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l), /*#__PURE__*/React.createElement("strong", {
    style: mono
  }, v)))), /*#__PURE__*/React.createElement(Btn, {
    v: "danger",
    full: true,
    onClick: cerrar
  }, "\uD83D\uDD12 Cerrar Turno")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "EMPLEADO"), /*#__PURE__*/React.createElement("select", {
    value: form.empleado,
    onChange: e => setForm(p => ({
      ...p,
      empleado: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 24
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar..."), employees.filter(e => e.active).map(e => /*#__PURE__*/React.createElement("option", {
    key: e.id,
    value: e.name
  }, e.name, " \u2014 ", e.pos)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "TIPO DE TURNO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [["mañana", "🌅 Mañana"], ["tarde", "🌆 Tarde"], ["noche", "🌙 Noche"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: form.tipo === v ? "primary" : "outline",
    onClick: () => setForm(p => ({
      ...p,
      tipo: v
    })),
    style: {
      flex: 1
    }
  }, l)))), /*#__PURE__*/React.createElement(Btn, {
    v: "success",
    full: true,
    onClick: abrir,
    disabled: !form.empleado
  }, "\u25B6 Abrir Turno"))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 14px"
    }
  }, "\uD83D\uDCCA Resumen del D\xEDa"), [["Total turnos hoy", turnos.filter(t => t.fecha === today()).length], ["Turnos activos", turnos.filter(t => t.status === "activo").length], ["Turnos cerrados", turnos.filter(t => t.status === "cerrado").length]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 0",
      borderBottom: `1px solid ${T.steam}`,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l), /*#__PURE__*/React.createElement("strong", {
    style: mono
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: 0
    }
  }, "Historial de Turnos")), turnos.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay turnos registrados a\xFAn."), turnos.length > 0 && /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Empleado", "Tipo", "Fecha", "Apertura", "Cierre", "Estado"]
  }), /*#__PURE__*/React.createElement("tbody", null, turnos.map((t, idx) => /*#__PURE__*/React.createElement("tr", {
    key: t.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      fontWeight: 600
    }
  }, t.empleado), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", tipoColor[t.tipo])
  }, t.tipo)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, t.fecha), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, t.apertura), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, t.cierre || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", t.status === "activo" ? T.success : T.muted)
  }, t.status))))))));
}

// ── INVENTARIO ─────────────────────────────────────────────────
const CATS_INV = ["Café", "Lácteo", "Insumo", "Fruta", "Empaque", "Alimento", "Bebida", "Otro"];
function Inventario({
  inventory,
  setInventory
}) {
  const [search, setSearch] = useState("");
  const [adj, setAdj] = useState(null);
  const [qty, setQty] = useState("");
  const [type, setType] = useState("entrada");
  const [addM, setAddM] = useState(false);
  const [editM, setEditM] = useState(null);
  const BLANK = {
    name: "",
    cat: "Insumo",
    unit: "",
    stock: "",
    min: "",
    cost: ""
  };
  const [form, setForm] = useState(BLANK);
  const rows = inventory.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const low = inventory.filter(i => i.stock <= i.min);
  const stc = i => i.stock === 0 ? T.danger : i.stock <= i.min ? T.warning : T.success;
  const apply = () => {
    const q = parseFloat(qty);
    if (!q || !adj) return;
    setInventory(prev => prev.map(i => i.id === adj.id ? {
      ...i,
      stock: Math.max(0, type === "entrada" ? i.stock + q : i.stock - q)
    } : i));
    setAdj(null);
    setQty("");
  };
  const saveNew = () => {
    if (!form.name || !form.unit || form.stock === "" || form.min === "" || form.cost === "") return;
    setInventory(prev => [...prev, {
      id: Date.now(),
      name: form.name,
      cat: form.cat,
      unit: form.unit,
      stock: parseFloat(form.stock),
      min: parseFloat(form.min),
      cost: parseFloat(form.cost)
    }]);
    setAddM(false);
    setForm(BLANK);
  };
  const saveEdit = () => {
    if (!editM || !form.name) return;
    setInventory(prev => prev.map(i => i.id === editM.id ? {
      ...i,
      name: form.name,
      cat: form.cat,
      unit: form.unit,
      min: parseFloat(form.min),
      cost: parseFloat(form.cost)
    } : i));
    setEditM(null);
    setForm(BLANK);
  };
  const openEdit = item => {
    setForm({
      name: item.name,
      cat: item.cat,
      unit: item.unit,
      stock: String(item.stock),
      min: String(item.min),
      cost: String(item.cost)
    });
    setEditM(item);
  };
  const del = id => {
    if (window.confirm("¿Eliminar este insumo?")) setInventory(prev => prev.filter(i => i.id !== id));
  };
  const doExport = () => exportXLSX([{
    name: "Inventario",
    data: [["Insumo", "Cat.", "Stock", "Mínimo", "Unidad", "Costo/U", "Valor", "Estado"], ...inventory.map(i => [i.name, i.cat, i.stock, i.min, i.unit, i.cost, i.stock * i.cost, i.stock <= i.min ? "Bajo" : "Normal"])]
  }], "Inventario.xlsx");
  const InvForm = ({
    title,
    onSave,
    onClose,
    showStock = true
  }) => /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    width: 420
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 16px"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "NOMBRE DEL INSUMO"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.name,
    onChange: e => setForm(p => ({
      ...p,
      name: e.target.value
    })),
    placeholder: "Ej: Caf\xE9 en grano",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CATEGOR\xCDA"), /*#__PURE__*/React.createElement("select", {
    value: form.cat,
    onChange: e => setForm(p => ({
      ...p,
      cat: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 24
    }
  }, CATS_INV.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "UNIDAD DE MEDIDA"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.unit,
    onChange: e => setForm(p => ({
      ...p,
      unit: e.target.value
    })),
    placeholder: "kg, litro, paquete\u2026",
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: showStock ? "1fr 1fr 1fr" : "1fr 1fr",
      gap: 10,
      marginBottom: 16
    }
  }, showStock && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "STOCK INICIAL"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.stock,
    onChange: e => setForm(p => ({
      ...p,
      stock: e.target.value
    })),
    placeholder: "0",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "STOCK M\xCDNIMO"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.min,
    onChange: e => setForm(p => ({
      ...p,
      min: e.target.value
    })),
    placeholder: "0",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "COSTO / UNIDAD (HNL)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.cost,
    onChange: e => setForm(p => ({
      ...p,
      cost: e.target.value
    })),
    placeholder: "0.00",
    style: inp()
  }))), form.stock && form.cost && showStock && /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 14,
      fontSize: 13
    }
  }, "Valor inicial del inventario: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: T.caramel
    }
  }, L(parseFloat(form.stock || 0) * parseFloat(form.cost || 0)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: onClose,
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: onSave,
    style: {
      flex: 2
    }
  }, "Guardar")));
  return /*#__PURE__*/React.createElement(Page, {
    title: "Inventario",
    sub: `${inventory.length} insumos · ${low.length} bajo mínimo · Valor: ${L(inventory.reduce((s, i) => s + i.stock * i.cost, 0))}`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel"), /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => {
        setForm(BLANK);
        setAddM(true);
      }
    }, "+ Agregar Insumo"))
  }, low.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.warning}14`,
      border: `1.5px solid ${T.warning}`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 14,
      fontSize: 13
    }
  }, "\u26A0\uFE0F ", /*#__PURE__*/React.createElement("strong", null, low.length, " insumos"), " bajo el m\xEDnimo: ", low.map(i => i.name).join(" · ")), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar...",
    style: {
      ...inp(),
      maxWidth: 280
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Insumo", "Cat.", "Stock", "Mín.", "Unidad", "Costo/U", "Valor", "Estado", "Acciones"]
  }), /*#__PURE__*/React.createElement("tbody", null, rows.map((item, idx) => /*#__PURE__*/React.createElement("tr", {
    key: item.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, item.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, item.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: stc(item)
    }
  }, item.stock), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.muted
    }
  }, item.min), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.muted
    }
  }, item.unit), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, L(item.cost)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 600
    }
  }, L(item.stock * item.cost)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", stc(item))
  }, item.stock === 0 ? "Sin stock" : item.stock <= item.min ? "Bajo" : "OK")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => {
      setAdj(item);
      setType("entrada");
      setQty("");
    }
  }, "Ajustar"), /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    small: true,
    onClick: () => openEdit(item)
  }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement(Btn, {
    v: "danger",
    small: true,
    onClick: () => del(item.id)
  }, "\uD83D\uDDD1"))))))))), addM && /*#__PURE__*/React.createElement(InvForm, {
    title: "Nuevo Insumo",
    onSave: saveNew,
    onClose: () => setAddM(false),
    showStock: true
  }), editM && /*#__PURE__*/React.createElement(InvForm, {
    title: `Editar: ${editM.name}`,
    onSave: saveEdit,
    onClose: () => setEditM(null),
    showStock: false
  }), adj && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAdj(null)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 12px"
    }
  }, "Ajustar Stock: ", adj.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, [["entrada", "📥 Entrada"], ["salida", "📤 Salida"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: type === v ? "primary" : "outline",
    onClick: () => setType(v),
    style: {
      flex: 1
    }
  }, l))), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "CANTIDAD (", adj.unit, ")"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: qty,
    onChange: e => setQty(e.target.value),
    placeholder: "0",
    style: {
      ...inp(),
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 12,
      fontSize: 13
    }
  }, adj.stock, " \u2192 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: T.caramel
    }
  }, type === "entrada" ? adj.stock + (parseFloat(qty) || 0) : Math.max(0, adj.stock - (parseFloat(qty) || 0)), " ", adj.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAdj(null),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: apply,
    style: {
      flex: 1
    }
  }, "Confirmar"))));
}

// ── RECETAS ────────────────────────────────────────────────────
function Recetas({
  inventory
}) {
  const [sel, setSel] = useState(RECIPES[0]);
  // Calculate how many units can be produced with current stock
  const maxProd = recipe => {
    if (!inventory || !recipe.ingredients.length) return null;
    const limits = recipe.ingredients.map(ing => {
      const inv = inventory.find(i => i.name === ing.name);
      if (!inv || !ing.qty) return Infinity;
      return Math.floor(inv.stock / ing.qty);
    });
    return Math.min(...limits);
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Fichas T\xE9cnicas",
    sub: "Costeo directo \xB7 Stock en tiempo real \xB7 Conectado al inventario"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.success}12`,
      border: `1px solid ${T.success}30`,
      borderRadius: 10,
      padding: "9px 14px",
      marginBottom: 14,
      fontSize: 13,
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD17"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Conectado al inventario."), " Cada venta en el POS descuenta los ingredientes autom\xE1ticamente. Aqu\xED puedes ver cu\xE1ntas unidades puedes producir con el stock actual.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "240px 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, RECIPES.map(r => {
    const cost = rcost(r);
    const prod = PRODS0.find(p => p.name === r.prod);
    const mg = prod ? (prod.price - cost) / prod.price * 100 : 0;
    const max = maxProd(r);
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: () => setSel(r),
      style: {
        padding: "10px 14px",
        cursor: "pointer",
        borderLeft: `3px solid ${sel?.id === r.id ? T.caramel : "transparent"}`,
        background: sel?.id === r.id ? `${T.caramel}10` : "transparent",
        borderBottom: `1px solid ${T.steam}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 2
      }
    }, r.prod), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted,
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Costo: ", /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        color: T.caramel
      }
    }, L(cost))), /*#__PURE__*/React.createElement("span", {
      style: {
        color: mg > 40 ? T.success : mg > 25 ? T.warning : T.danger
      }
    }, pct(mg), " mg")), max !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", max === 0 ? T.danger : max <= 3 ? T.warning : T.success)
    }, max === 0 ? "⚠ Sin stock" : max <= 3 ? `⚡ Solo ${max} uds` : `✓ ${max} uds`)));
  })), sel && (() => {
    const cost = rcost(sel),
      prod = PRODS0.find(p => p.name === sel.prod),
      mg = prod ? (prod.price - cost) / prod.price * 100 : 0;
    const max = maxProd(sel);
    return /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "'Playfair Display',serif",
        fontSize: 20,
        margin: 0
      }
    }, sel.prod), /*#__PURE__*/React.createElement("p", {
      style: {
        color: T.muted,
        fontSize: 13,
        margin: "3px 0 0"
      }
    }, "Rendimiento: 1 ", sel.unit)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...mono,
        fontSize: 26,
        fontWeight: 700,
        color: T.caramel
      }
    }, L(cost)), /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", mg > 40 ? T.success : mg > 25 ? T.warning : T.danger)
    }, "Margen: ", pct(mg)))), max !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        background: max === 0 ? `${T.danger}12` : max <= 3 ? `${T.warning}12` : `${T.success}12`,
        border: `1px solid ${max === 0 ? T.danger : max <= 3 ? T.warning : T.success}30`,
        borderRadius: 8,
        padding: "10px 14px",
        marginBottom: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, "Unidades producibles con stock actual"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontSize: 22,
        fontWeight: 700,
        color: max === 0 ? T.danger : max <= 3 ? T.warning : T.success
      }
    }, max === 0 ? "0 — Reabastecer" : max)), /*#__PURE__*/React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 13,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(THead, {
      cols: ["Ingrediente", "Por unidad", "Unidad", "Costo/U", "Subtotal", "Stock actual", "Alcanza para"]
    }), /*#__PURE__*/React.createElement("tbody", null, sel.ingredients.map((ing, idx) => {
      const inv = inventory?.find(i => i.name === ing.name);
      const stockActual = inv ? inv.stock : null;
      const alcanza = stockActual !== null && ing.qty > 0 ? Math.floor(stockActual / ing.qty) : null;
      const stockOk = stockActual === null || alcanza > 5;
      return /*#__PURE__*/React.createElement("tr", {
        key: idx,
        style: {
          borderBottom: `1px solid ${T.steam}`,
          background: !stockOk ? `${T.warning}08` : "transparent"
        }
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          fontWeight: 600
        }
      }, ing.name), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          ...mono
        }
      }, ing.qty), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          color: T.muted
        }
      }, ing.u), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          ...mono
        }
      }, L(ing.c)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          ...mono,
          color: T.caramel,
          fontWeight: 600
        }
      }, L(ing.qty * ing.c)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px",
          ...mono,
          fontWeight: 700,
          color: stockActual === 0 ? T.danger : stockActual <= inv?.min ? T.warning : T.success
        }
      }, stockActual !== null ? `${stockActual} ${ing.u}` : "—"), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: "9px 12px"
        }
      }, alcanza !== null && /*#__PURE__*/React.createElement("span", {
        style: bdg("#fff", alcanza === 0 ? T.danger : alcanza <= 3 ? T.warning : T.success)
      }, alcanza === 0 ? "Agotado" : alcanza <= 3 ? `${alcanza} uds` : `${alcanza} uds`)));
    }), /*#__PURE__*/React.createElement("tr", {
      style: {
        background: T.steam
      }
    }, /*#__PURE__*/React.createElement("td", {
      colSpan: 4,
      style: {
        padding: "8px 12px",
        fontWeight: 700,
        textAlign: "right"
      }
    }, "COSTO TOTAL"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700,
        fontSize: 15,
        color: T.caramel
      }
    }, L(cost)), /*#__PURE__*/React.createElement("td", {
      colSpan: 2
    })))), prod && /*#__PURE__*/React.createElement("div", {
      style: {
        background: T.steam,
        borderRadius: 10,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 12,
        textAlign: "center"
      }
    }, [["Precio de Venta", L(prod.price), T.text], ["Costo Directo", L(cost), T.danger], ["Margen Bruto", L(prod.price - cost), T.success]].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: T.muted,
        marginBottom: 4
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        ...mono,
        fontSize: 17,
        fontWeight: 700,
        color: c
      }
    }, v))))));
  })()));
}

// ── NÓMINA ─────────────────────────────────────────────────────
function Nomina({
  employees,
  setEmployees
}) {
  const [addM, setAddM] = useState(false);
  const [selE, setSelE] = useState(null);
  const [newE, setNewE] = useState({
    name: "",
    pos: "",
    sal: "",
    since: ""
  });
  const active = employees.filter(e => e.active);
  const tots = active.reduce((acc, e) => {
    const n = nomina(e.sal);
    return {
      bruto: acc.bruto + n.bruto,
      neto: acc.neto + n.neto,
      ie: acc.ie + n.ie,
      ip: acc.ip + n.ip,
      re: acc.re + n.re,
      rp: acc.rp + n.rp,
      inf: acc.inf + n.inf,
      costo: acc.costo + n.costo
    };
  }, {
    bruto: 0,
    neto: 0,
    ie: 0,
    ip: 0,
    re: 0,
    rp: 0,
    inf: 0,
    costo: 0
  });
  const addEmp = () => {
    if (!newE.name || !newE.pos || !newE.sal) return;
    setEmployees(p => [...p, {
      id: Date.now(),
      name: newE.name,
      pos: newE.pos,
      sal: parseFloat(newE.sal),
      since: newE.since || today(),
      active: true
    }]);
    setAddM(false);
    setNewE({
      name: "",
      pos: "",
      sal: "",
      since: ""
    });
  };
  const doExport = () => exportXLSX([{
    name: "Planilla",
    data: [["Empleado", "Puesto", "Desde", "S.Bruto", "IHSS Empl.", "RAP Empl.", "S.Neto", "IHSS Pat.", "RAP Pat.", "INFOP", "Costo Total"], ...active.map(e => {
      const n = nomina(e.sal);
      return [e.name, e.pos, e.since, n.bruto, n.ie, n.re, n.neto, n.ip, n.rp, n.inf, n.costo];
    })]
  }], "Nomina.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "N\xF3mina",
    sub: `${active.length} empleados · Costo patronal: ${L(tots.costo)}/mes`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel"), /*#__PURE__*/React.createElement(Btn, {
      v: "dark",
      onClick: () => setAddM(true)
    }, "+ Empleado"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB5",
    label: "Brutos",
    value: L(tots.bruto)
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u270B",
    label: "Ded. Empleados",
    value: L(tots.ie + tots.re),
    color: T.warning
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFE2",
    label: "Aport. Patronal",
    value: L(tots.ip + tots.rp + tots.inf),
    color: T.danger
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2696\uFE0F",
    label: "Costo Total",
    value: L(tots.costo),
    color: T.espresso
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Empleado", "Puesto", "Desde", "S.Bruto", "IHSS E.", "RAP E.", "S.Neto", "IHSS P.", "RAP P.", "INFOP", "Costo", "Ver"]
  }), /*#__PURE__*/React.createElement("tbody", null, active.map((e, idx) => {
    const n = nomina(e.sal);
    return /*#__PURE__*/React.createElement("tr", {
      key: e.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      }
    }, e.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        color: T.muted
      }
    }, e.pos), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        fontSize: 11
      }
    }, e.since), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono
      }
    }, L(n.bruto)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        color: T.warning
      }
    }, "-", L(n.ie)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        color: T.warning
      }
    }, "-", L(n.re)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        fontWeight: 700,
        color: T.success
      }
    }, L(n.neto)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        color: T.danger
      }
    }, L(n.ip)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        color: T.danger
      }
    }, L(n.rp)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        color: T.danger
      }
    }, L(n.inf)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px",
        ...mono,
        fontWeight: 700
      }
    }, L(n.costo)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "7px 10px"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      v: "outline",
      small: true,
      onClick: () => setSelE(e)
    }, "Ver")));
  }), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 3,
    style: {
      padding: "8px 10px",
      color: T.gold,
      fontWeight: 700,
      fontSize: 12
    }
  }, "TOTALES \u2014 ", active.length), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: T.gold,
      fontWeight: 700
    }
  }, L(tots.bruto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, "-", L(tots.ie)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, "-", L(tots.re)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#7AEA9A",
      fontWeight: 700
    }
  }, L(tots.neto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#EA8A8A",
      fontWeight: 700
    }
  }, L(tots.ip)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#EA8A8A",
      fontWeight: 700
    }
  }, L(tots.rp)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: "#EA8A8A",
      fontWeight: 700
    }
  }, L(tots.inf)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      ...mono,
      color: T.gold,
      fontWeight: 700,
      fontSize: 13
    }
  }, L(tots.costo)), /*#__PURE__*/React.createElement("td", null)))))), selE && (() => {
    const n = nomina(selE.sal);
    return /*#__PURE__*/React.createElement(Modal, {
      onClose: () => setSelE(null),
      width: 420
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "'Playfair Display',serif",
        fontSize: 20,
        margin: "0 0 3px"
      }
    }, selE.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: T.muted,
        fontSize: 13,
        margin: "0 0 14px"
      }
    }, selE.pos), /*#__PURE__*/React.createElement("div", {
      style: {
        background: T.steam,
        borderRadius: 10,
        padding: 14,
        marginBottom: 12
      }
    }, [["Salario Bruto", L(n.bruto), ""], ["IHSS E/M (2.5%)", `-${L(Math.min(selE.sal, IHSS_TOPE) * 0.025)}`, T.warning], ["IHSS V/I/M (1.0%)", `-${L(Math.min(selE.sal, IHSS_TOPE) * 0.01)}`, T.warning], ["RAP (1.5%)", `-${L(n.re)}`, T.warning]].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.muted
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        color: c || T.text,
        fontWeight: 700
      }
    }, v))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid ${T.latte}`,
        marginTop: 8,
        paddingTop: 8,
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 700,
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement("span", null, "NETO A PAGAR"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        color: T.success
      }
    }, L(n.neto)))), /*#__PURE__*/React.createElement(Btn, {
      v: "ghost",
      full: true,
      onClick: () => setSelE(null)
    }, "Cerrar"));
  })(), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nuevo Empleado"), [["Nombre completo", "text", "name", "Ana López"], ["Puesto", "text", "pos", "Barista"], ["Salario bruto (HNL)", "number", "sal", "8000"], ["Fecha de ingreso", "date", "since", ""]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: newE[k],
    onChange: e => setNewE(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: addEmp,
    style: {
      flex: 1
    }
  }, "Agregar"))));
}

// ── PROVEEDORES ────────────────────────────────────────────────
function Proveedores({
  suppliers,
  setSuppliers
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    phone: "",
    cat: "",
    bal: "",
    due: ""
  });
  const now = new Date(),
    days = d => Math.ceil((new Date(d) - now) / 86400000),
    uc = d => {
      const dd = days(d);
      return dd < 0 ? T.danger : dd <= 7 ? T.warning : T.success;
    },
    ul = d => {
      const dd = days(d);
      return dd < 0 ? `Vencido (${Math.abs(dd)}d)` : dd === 0 ? "Hoy" : dd <= 7 ? `${dd}d` : "Al día";
    };
  const total = suppliers.reduce((s, p) => s + p.bal, 0);
  const add = () => {
    if (!form.name || !form.bal) return;
    setSuppliers(p => [...p, {
      id: Date.now(),
      ...form,
      bal: parseFloat(form.bal) || 0
    }]);
    setAddM(false);
    setForm({
      name: "",
      contact: "",
      phone: "",
      cat: "",
      bal: "",
      due: ""
    });
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Proveedores & CxP",
    sub: `${suppliers.length} proveedores · Total por pagar: ${L(total)}`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Nuevo")
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Proveedor", "Contacto", "Teléfono", "Categoría", "Saldo", "Vencimiento", "Estado", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, suppliers.sort((a, b) => days(a.due) - days(b.due)).map((s, idx) => /*#__PURE__*/React.createElement("tr", {
    key: s.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, s.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.muted
    }
  }, s.contact), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 12
    }
  }, s.phone), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, s.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: T.danger
    }
  }, L(s.bal)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 12
    }
  }, s.due), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", uc(s.due))
  }, ul(s.due))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, s.bal > 0 ? /*#__PURE__*/React.createElement(Btn, {
    v: "success",
    small: true,
    onClick: () => setSuppliers(p => p.map(x => x.id === s.id ? {
      ...x,
      bal: 0
    } : x))
  }, "Pagar") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted,
      fontSize: 12
    }
  }, "\u2713")))))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nuevo Proveedor"), [["Nombre", "text", "name"], ["Contacto", "text", "contact"], ["Teléfono", "text", "phone"], ["Categoría", "text", "cat"], ["Saldo (HNL)", "number", "bal"], ["Vencimiento", "date", "due"]].map(([l, t, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: add,
    style: {
      flex: 1
    }
  }, "Agregar"))));
}

// ── CUENTAS POR COBRAR ─────────────────────────────────────────
function CxC({
  cxc,
  setCxc
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    cliente: "",
    concepto: "",
    monto: "",
    fecha: "",
    vence: "",
    estado: "pendiente"
  });
  const pend = cxc.filter(c => c.estado === "pendiente").reduce((s, c) => s + c.monto, 0);
  const cobrado = cxc.filter(c => c.estado === "cobrado").reduce((s, c) => s + c.monto, 0);
  const add = () => {
    if (!form.cliente || !form.monto) return;
    setCxc(p => [...p, {
      id: Date.now(),
      ...form,
      monto: parseFloat(form.monto) || 0
    }]);
    setAddM(false);
    setForm({
      cliente: "",
      concepto: "",
      monto: "",
      fecha: today(),
      vence: "",
      estado: "pendiente"
    });
  };
  const cobrar = id => setCxc(p => p.map(c => c.id === id ? {
    ...c,
    estado: "cobrado"
  } : c));
  const now = new Date(),
    days = d => d ? Math.ceil((new Date(d) - now) / 86400000) : 999;
  return /*#__PURE__*/React.createElement(Page, {
    title: "Cuentas por Cobrar",
    sub: `Pendiente: ${L(pend)} · Cobrado: ${L(cobrado)}`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => {
        setForm({
          cliente: "",
          concepto: "",
          monto: "",
          fecha: today(),
          vence: "",
          estado: "pendiente"
        });
        setAddM(true);
      }
    }, "+ Nueva CxC")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCBC",
    label: "Por Cobrar",
    value: L(pend),
    sub: `${cxc.filter(c => c.estado === "pendiente").length} cuentas`,
    color: T.warning
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2705",
    label: "Ya Cobrado",
    value: L(cobrado),
    sub: `${cxc.filter(c => c.estado === "cobrado").length} cuentas`,
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u26A0\uFE0F",
    label: "Vencidas",
    value: `${cxc.filter(c => c.estado === "pendiente" && days(c.vence) < 0).length}`,
    sub: "Requieren seguimiento",
    color: T.danger
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, cxc.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay cuentas por cobrar registradas."), cxc.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Cliente", "Concepto", "Monto", "Fecha", "Vence", "Estado", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, cxc.sort((a, b) => days(a.vence) - days(b.vence)).map((c, idx) => {
    const d = days(c.vence);
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, c.cliente), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        color: T.muted
      }
    }, c.concepto), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700,
        color: T.caramel
      }
    }, L(c.monto)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontSize: 12
      }
    }, c.fecha), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontSize: 12
      }
    }, c.vence || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", c.estado === "cobrado" ? T.success : d < 0 ? T.danger : d <= 7 ? T.warning : T.info)
    }, c.estado === "cobrado" ? "✓ Cobrado" : d < 0 ? "Vencida" : d <= 7 ? `${d}d` : "Pendiente")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, c.estado === "pendiente" && /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      small: true,
      onClick: () => cobrar(c.id)
    }, "Cobrar")));
  }))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nueva Cuenta por Cobrar"), [["Cliente / Empresa", "text", "cliente", "Empresa XYZ"], ["Concepto", "text", "concepto", "Servicio de catering"], ["Monto (HNL)", "number", "monto", ""], ["Fecha emisión", "date", "fecha", ""], ["Fecha vencimiento", "date", "vence", ""]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: add,
    style: {
      flex: 1
    }
  }, "Guardar"))));
}

// ── GASTOS OPERATIVOS ──────────────────────────────────────────
function GastosOperativos({
  gastos,
  setGastos
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    fecha: today(),
    categoria: "",
    descripcion: "",
    monto: "",
    metodo: "efectivo"
  });
  const cats = ["Servicios (luz/agua/internet)", "Alquiler", "Mantenimiento", "Marketing", "Limpieza", "Gas / combustible", "Papelería", "Otros"];
  const add = () => {
    if (!form.monto || !form.categoria) return;
    setGastos(p => [{
      id: Date.now(),
      ...form,
      monto: parseFloat(form.monto) || 0
    }, ...p]);
    setAddM(false);
    setForm({
      fecha: today(),
      categoria: "",
      descripcion: "",
      monto: "",
      metodo: "efectivo"
    });
  };
  const totalMes = gastos.filter(g => g.fecha?.startsWith("2026-03")).reduce((s, g) => s + g.monto, 0);
  const totalAll = gastos.reduce((s, g) => s + g.monto, 0);
  const byCat = {};
  gastos.forEach(g => {
    byCat[g.categoria] = (byCat[g.categoria] || 0) + g.monto;
  });
  const doExport = () => exportXLSX([{
    name: "Gastos",
    data: [["Fecha", "Categoría", "Descripción", "Monto", "Método"], ...gastos.map(g => [g.fecha, g.categoria, g.descripcion, g.monto, g.metodo])]
  }], "Gastos_Operativos.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Gastos Operativos",
    sub: `Mes actual: ${L(totalMes)} · Total registrado: ${L(totalAll)}`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel"), /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Registrar Gasto"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, gastos.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay gastos registrados. Agrega el primero."), gastos.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Fecha", "Categoría", "Descripción", "Monto", "Método", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, gastos.map((g, idx) => /*#__PURE__*/React.createElement("tr", {
    key: g.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 12
    }
  }, g.fecha), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, g.categoria)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.muted
    }
  }, g.descripcion), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: T.danger
    }
  }, L(g.monto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.muted,
      fontSize: 12
    }
  }, g.metodo), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "danger",
    small: true,
    onClick: () => setGastos(p => p.filter(x => x.id !== g.id))
  }, "\u2715")))))))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: "0 0 14px"
    }
  }, "Por Categor\xEDa"), Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([cat, val]) => /*#__PURE__*/React.createElement("div", {
    key: cat,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 3,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, cat), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 600
    }
  }, L(val))), /*#__PURE__*/React.createElement(ProgressBar, {
    val: val,
    max: totalAll || 1,
    color: T.danger
  }))), Object.keys(byCat).length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13
    }
  }, "Sin datos a\xFAn."))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Registrar Gasto"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "FECHA"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.fecha,
    onChange: e => setForm(p => ({
      ...p,
      fecha: e.target.value
    })),
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CATEGOR\xCDA"), /*#__PURE__*/React.createElement("select", {
    value: form.categoria,
    onChange: e => setForm(p => ({
      ...p,
      categoria: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 24
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar..."), cats.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), [["Descripción", "text", "descripcion", "Pago mensual de electricidad"], ["Monto (HNL)", "number", "monto", ""]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "M\xC9TODO DE PAGO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["efectivo", "Efectivo"], ["tarjeta", "Tarjeta"], ["transferencia", "Transferencia"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: form.metodo === v ? "primary" : "outline",
    small: true,
    onClick: () => setForm(p => ({
      ...p,
      metodo: v
    })),
    style: {
      flex: 1
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: add,
    style: {
      flex: 1
    }
  }, "Guardar"))));
}

// ── FLUJO DE CAJA ──────────────────────────────────────────────
function FlujoCaja({
  employees,
  gastos
}) {
  const nomMes = employees.filter(e => e.active).reduce((s, e) => s + nomina(e.sal).costo, 0);
  const proj = [{
    m: "Mar 2026",
    ing: 612400,
    cv: 183720,
    otros: 85000
  }, {
    m: "Abr 2026",
    ing: 650000,
    cv: 195000,
    otros: 88000
  }, {
    m: "May 2026",
    ing: 680000,
    cv: 204000,
    otros: 90000
  }, {
    m: "Jun 2026",
    ing: 720000,
    cv: 216000,
    otros: 92000
  }, {
    m: "Jul 2026",
    ing: 710000,
    cv: 213000,
    otros: 91000
  }, {
    m: "Ago 2026",
    ing: 755000,
    cv: 226500,
    otros: 95000
  }].map(p => ({
    ...p,
    nom: nomMes,
    neto: p.ing - p.cv - nomMes - p.otros
  }));
  const maxIng = Math.max(...proj.map(p => p.ing));
  const doExport = () => exportXLSX([{
    name: "Flujo",
    data: [["Período", "Ingresos", "Costos Var.", "Nómina", "Otros", "Flujo Neto", "Margen"], ...proj.map(p => [p.m, p.ing, p.cv, p.nom, p.otros, p.neto, `${(p.neto / p.ing * 100).toFixed(1)}%`])]
  }], "FlujoCaja.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Flujo de Caja",
    sub: "Proyecci\xF3n 6 meses",
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCC8",
    label: "Ingreso Prom.",
    value: L(proj.reduce((s, p) => s + p.ing, 0) / 6),
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCC9",
    label: "Gasto Total Prom.",
    value: L(proj.reduce((s, p) => s + p.cv + p.nom + p.otros, 0) / 6),
    color: T.danger
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCA1",
    label: "Utilidad Prom.",
    value: L(proj.reduce((s, p) => s + p.neto, 0) / 6),
    color: T.caramel
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 16px"
    }
  }, "Ingresos vs. Gastos (HNL)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height: 130
    }
  }, proj.map((p, i) => {
    const gt = p.cv + p.nom + p.otros;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        display: "flex",
        gap: 3,
        alignItems: "flex-end",
        height: 115
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        borderRadius: "3px 3px 0 0",
        background: T.caramel,
        height: `${p.ing / maxIng * 112}px`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        borderRadius: "3px 3px 0 0",
        background: `${T.danger}BB`,
        height: `${gt / maxIng * 112}px`
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: T.muted
      }
    }, p.m.slice(0, 7)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 8,
      fontSize: 12,
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25A0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.caramel
    }
  }, "Ingresos")), /*#__PURE__*/React.createElement("span", null, "\u25A0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.danger
    }
  }, "Gastos")))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Período", "Ingresos", "Costos Var.", "Nómina Patr.", "Otros Gastos", "Flujo Neto", "Margen"]
  }), /*#__PURE__*/React.createElement("tbody", null, proj.map((p, idx) => {
    const mg = p.neto / p.ing * 100;
    return /*#__PURE__*/React.createElement("tr", {
      key: idx,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, p.m), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.success,
        fontWeight: 600
      }
    }, L(p.ing)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.danger
      }
    }, L(p.cv)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.danger
      }
    }, L(p.nom)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.danger
      }
    }, L(p.otros)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700,
        color: p.neto >= 0 ? T.success : T.danger
      }
    }, L(p.neto)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", mg > 35 ? T.success : mg > 20 ? T.warning : T.danger)
    }, pct(mg))));
  }), "  ")))));
}

// ── REPORTES SAR ───────────────────────────────────────────────
function ReportesSAR({
  sales
}) {
  const meses = [{
    label: "Enero 2026",
    vtas: 558000,
    cxp: 145000
  }, {
    label: "Febrero 2026",
    vtas: 580000,
    cxp: 152000
  }, {
    label: "Marzo 2026",
    vtas: 612400,
    cxp: 163000
  }].map(m => ({
    ...m,
    isv_cobrado: m.vtas * ISV,
    isv_credito: m.cxp * ISV,
    isv_neto: m.vtas * ISV - m.cxp * ISV
  }));
  const doExport = () => exportXLSX([{
    name: "ISV",
    data: [["Período", "Ventas", "ISV Cobrado", "Compras", "ISV Crédito", "ISV Neto"], ...meses.map(m => [m.label, m.vtas, m.isv_cobrado, m.cxp, m.isv_credito, m.isv_neto])]
  }, {
    name: "Ventas POS",
    data: [["#", "Fecha", "Hora", "Método", "Total", "ISV"], ...sales.map((s, i) => [i + 1, s.date, s.time, s.method, s.total, s.isv])]
  }], "Reportes_SAR.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Reportes SAR",
    sub: "Declaraciones ISV \xB7 Rep\xFAblica de Honduras",
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.warning}12`,
      border: `1.5px solid ${T.warning}`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", null, "\u26A0\uFE0F"), " Sistema en proceso de formalizaci\xF3n. Activar m\xF3dulos SAR tras obtener RTN y CAI."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, [["RTN Empresarial", "Pendiente"], ["CAI Vigente", "Pendiente"], ["Régimen SAR", "Por definir"]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: card()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      marginBottom: 6
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 18,
      fontWeight: 700,
      color: T.warning
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden",
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Período", "Ventas Brutas", "ISV Cobrado (15%)", "Compras Gravadas", "ISV Crédito", "ISV Neto a Pagar", "Estado"]
  }), /*#__PURE__*/React.createElement("tbody", null, meses.map((m, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, m.label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.success
    }
  }, L(m.vtas)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 600
    }
  }, L(m.isv_cobrado)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, L(m.cxp)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.success
    }
  }, L(m.isv_credito)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: T.danger
    }
  }, L(m.isv_neto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", idx === 2 ? T.warning : T.success)
  }, idx === 2 ? "Pendiente" : "Proyectado")))))))), sales.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: 0
    }
  }, "Ventas POS (", sales.length, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["#", "Fecha", "Hora", "Método", "Subtotal", "ISV", "Total"]
  }), /*#__PURE__*/React.createElement("tbody", null, sales.slice(0, 20).map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: s.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: i % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono,
      color: T.muted
    }
  }, String(s.invoiceNum || i + 1).padStart(6, "0")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono
    }
  }, s.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono
    }
  }, s.time), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, s.method)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono
    }
  }, L(s.subtotal)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono,
      color: T.warning
    }
  }, L(s.isv)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "6px 10px",
      ...mono,
      fontWeight: 700
    }
  }, L(s.total)))))))));
}

// ── ACTIVOS / DEPRECIACIÓN ─────────────────────────────────────
function Activos({
  activos,
  setActivos
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cat: "Equipo",
    costo: "",
    fecha: today(),
    vida: "5",
    residual: ""
  });
  const cats = ["Equipo", "Mobiliario", "Tecnología", "Mejoras", "Vehículo", "Otro"];
  const add = () => {
    if (!form.name || !form.costo) return;
    setActivos(p => [...p, {
      id: Date.now(),
      name: form.name,
      cat: form.cat,
      costo: parseFloat(form.costo),
      fecha: form.fecha,
      vida: parseInt(form.vida),
      residual: parseFloat(form.residual) || 0
    }]);
    setAddM(false);
    setForm({
      name: "",
      cat: "Equipo",
      costo: "",
      fecha: today(),
      vida: "5",
      residual: ""
    });
  };
  const totalCosto = activos.reduce((s, a) => s + a.costo, 0);
  const totalDepAcum = activos.reduce((s, a) => s + depAcum(a), 0);
  const totalLibros = activos.reduce((s, a) => s + valLibros(a), 0);
  const doExport = () => exportXLSX([{
    name: "Activos",
    data: [["Activo", "Cat.", "Costo Orig.", "Fecha Adq.", "Vida (años)", "Dep./Año", "Dep.Acum.", "Valor Libros"], ...activos.map(a => [a.name, a.cat, a.costo, a.fecha, a.vida, depAnual(a).toFixed(2), depAcum(a).toFixed(2), valLibros(a).toFixed(2)])]
  }], "Activos.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Activos & Depreciaci\xF3n",
    sub: `${activos.length} activos · Valor libros total: ${L(totalLibros)}`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel"), /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Activo"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFD7\uFE0F",
    label: "Costo Original",
    value: L(totalCosto),
    color: T.espresso
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCC9",
    label: "Depreciaci\xF3n Acum.",
    value: L(totalDepAcum),
    color: T.danger
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCCA",
    label: "Valor en Libros",
    value: L(totalLibros),
    color: T.success
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Activo", "Cat.", "Costo Orig.", "Fecha", "Vida", "Dep./Año", "Dep.Acumulada", "Valor Libros", "% Dep."]
  }), /*#__PURE__*/React.createElement("tbody", null, activos.map((a, idx) => {
    const da = depAnual(a),
      dac = depAcum(a),
      vl = valLibros(a),
      pctDep = dac / a.costo * 100;
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, a.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg(T.espresso, T.latte)
    }, a.cat)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono
      }
    }, L(a.costo)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontSize: 11
      }
    }, a.fecha), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        textAlign: "center"
      }
    }, a.vida, "a"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.warning
      }
    }, L(da)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.danger
      }
    }, L(dac)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700,
        color: T.success
      }
    }, L(vl)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 80
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        textAlign: "right",
        marginBottom: 2,
        ...mono
      }
    }, pct(pctDep)), /*#__PURE__*/React.createElement(ProgressBar, {
      val: pctDep,
      max: 100,
      color: pctDep > 80 ? T.danger : pctDep > 50 ? T.warning : T.success,
      height: 6
    }))));
  }), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 2,
    style: {
      padding: "8px 12px",
      color: T.gold,
      fontWeight: 700
    }
  }, "TOTALES"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700
    }
  }, L(totalCosto)), /*#__PURE__*/React.createElement("td", {
    colSpan: 2
  }), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, L(activos.reduce((s, a) => s + depAnual(a), 0))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: "#EA8A8A",
      fontWeight: 700
    }
  }, L(totalDepAcum)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: "#7AEA9A",
      fontWeight: 700
    }
  }, L(totalLibros)), /*#__PURE__*/React.createElement("td", null))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      background: T.steam,
      fontSize: 12,
      color: T.muted,
      borderTop: `1px solid ${T.steam}`
    }
  }, "M\xE9todo: L\xEDnea Recta. Depreciaci\xF3n = (Costo \u2212 Valor Residual) \xF7 Vida \xDAtil. Conforme NIC 16 y criterios SAR Honduras.")), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nuevo Activo"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CATEGOR\xCDA"), /*#__PURE__*/React.createElement("select", {
    value: form.cat,
    onChange: e => setForm(p => ({
      ...p,
      cat: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 24
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), [["Nombre del activo", "text", "name", "Máquina de espresso"], ["Costo de adquisición (HNL)", "number", "costo", ""], ["Fecha de adquisición", "date", "fecha", ""], ["Vida útil (años)", "number", "vida", "5"], ["Valor residual (HNL)", "number", "residual", "0"]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), form.costo && form.vida && /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 12,
      fontSize: 13
    }
  }, "Depreciaci\xF3n anual: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: T.caramel
    }
  }, L((parseFloat(form.costo) - (parseFloat(form.residual) || 0)) / parseInt(form.vida)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: add,
    style: {
      flex: 1
    }
  }, "Agregar"))));
}

// ── RENTABILIDAD POR PRODUCTO ──────────────────────────────────
function Rentabilidad({
  products,
  sales
}) {
  const [sortBy, setSortBy] = useState("margen");
  const salesByProd = {};
  sales.forEach(s => s.items?.forEach(it => {
    if (!salesByProd[it.name]) salesByProd[it.name] = {
      qty: 0,
      revenue: 0
    };
    salesByProd[it.name].qty += it.qty;
    salesByProd[it.name].revenue += it.price * it.qty;
  }));
  const data = products.filter(p => p.active).map(p => {
    const recipe = RECIPES.find(r => r.prod === p.name);
    const cost = recipe ? rcost(recipe) : p.cost;
    const sold = salesByProd[p.name];
    const qty = sold?.qty || 0,
      revenue = sold?.revenue || 0;
    const grossProfit = revenue - qty * cost;
    const mg = p.price > 0 ? (p.price - cost) / p.price * 100 : 0;
    return {
      ...p,
      cost,
      qty,
      revenue,
      grossProfit,
      mg
    };
  });
  const sorted = [...data].sort((a, b) => sortBy === "margen" ? b.mg - a.mg : sortBy === "ventas" ? b.revenue - a.revenue : b.grossProfit - a.grossProfit);
  const totalRevenue = data.reduce((s, p) => s + p.revenue, 0);
  const totalGross = data.reduce((s, p) => s + p.grossProfit, 0);
  const catIcon = c => ({
    Café: "☕",
    Granitas: "🧋",
    Bebidas: "🥤",
    Alimentos: "🥪"
  })[c] || "🍽️";
  return /*#__PURE__*/React.createElement(Page, {
    title: "Rentabilidad por Producto",
    sub: "Margen, ventas y utilidad bruta \u2014 cruzado con fichas t\xE9cnicas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB0",
    label: "Ingresos Totales",
    value: L(totalRevenue),
    sub: `${sales.length} ventas registradas`,
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCCA",
    label: "Utilidad Bruta",
    value: L(totalGross),
    sub: totalRevenue > 0 ? `Margen: ${pct(totalGross / totalRevenue * 100)}` : "Sin ventas aún",
    color: T.caramel
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFC6",
    label: "Producto Top",
    value: sorted[0]?.name || "—",
    sub: sorted[0] ? `Margen: ${pct(sorted[0].mg)}` : "Sin datos",
    color: T.success
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: T.muted,
      fontWeight: 600
    }
  }, "Ordenar por:"), [["margen", "Margen %"], ["ventas", "Ingresos"], ["utilidad", "Utilidad Bruta"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: sortBy === v ? "primary" : "outline",
    small: true,
    onClick: () => setSortBy(v)
  }, l))), sales.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 14,
      fontSize: 13,
      color: T.info
    }
  }, "\uD83D\uDCA1 Registra ventas en el POS para ver datos de ingresos reales. Actualmente muestra costos de recetas y precios de cat\xE1logo."), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["", "Producto", "Cat.", "Precio Venta", "Costo Directo", "Margen %", "Uds. Vendidas", "Ingresos", "Utilidad Bruta", "Semáforo"]
  }), /*#__PURE__*/React.createElement("tbody", null, sorted.map((p, idx) => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 10px",
      fontSize: 18,
      textAlign: "center"
    }
  }, catIcon(p.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, p.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, p.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.caramel,
      fontWeight: 600
    }
  }, L(p.price)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, L(p.cost)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: p.mg > 40 ? T.success : p.mg > 25 ? T.warning : T.danger
    }
  }, pct(p.mg)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      textAlign: "center"
    }
  }, p.qty), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, L(p.revenue)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: p.grossProfit >= 0 ? T.success : T.danger
    }
  }, L(p.grossProfit)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", p.mg > 40 ? T.success : p.mg > 25 ? T.warning : T.danger)
  }, p.mg > 40 ? "✓ Excelente" : p.mg > 25 ? "⚠ Aceptable" : "✗ Bajo")))))))));
}

// ── METAS VS REAL ──────────────────────────────────────────────
function Metas({
  metas,
  setMetas
}) {
  const [edit, setEdit] = useState(null);
  const [val, setVal] = useState("");
  const openEdit = (m, field) => {
    setEdit({
      ...m,
      field
    });
    setVal(String(m[field]));
  };
  const save = () => {
    if (!edit) return;
    setMetas(prev => prev.map(m => m.mes === edit.mes ? {
      ...m,
      [edit.field]: parseFloat(val) || 0
    } : m));
    setEdit(null);
  };
  const cumpAcc = metas.filter(m => m.real > 0).reduce((s, m) => s + (m.real >= m.meta ? 1 : 0), 0);
  const totalMeta = metas.reduce((s, m) => s + m.meta, 0);
  const totalReal = metas.filter(m => m.real > 0).reduce((s, m) => s + m.real, 0);
  const maxVal = Math.max(...metas.map(m => Math.max(m.meta, m.real)));
  return /*#__PURE__*/React.createElement(Page, {
    title: "Metas vs Real",
    sub: "Seguimiento de ventas contra objetivos mensuales"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFAF",
    label: "Meta Acumulada",
    value: L(totalMeta),
    sub: "Total del per\xEDodo",
    color: T.espresso
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB5",
    label: "Real Acumulado",
    value: L(totalReal),
    sub: "Meses con dato real",
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFC6",
    label: "Meses Cumplidos",
    value: `${cumpAcc} / ${metas.filter(m => m.real > 0).length}`,
    sub: "De meses con datos",
    color: T.caramel
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 18px"
    }
  }, "Meta vs Real \u2014 Gr\xE1fica Comparativa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height: 140
    }
  }, metas.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      gap: 3,
      alignItems: "flex-end",
      height: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: "3px 3px 0 0",
      background: `${T.caramel}60`,
      height: `${m.meta / maxVal * 115}px`
    },
    title: `Meta: ${L(m.meta)}`
  }), m.real > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: "3px 3px 0 0",
      background: m.real >= m.meta ? T.success : `${T.danger}BB`,
      height: `${m.real / maxVal * 115}px`
    },
    title: `Real: ${L(m.real)}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: T.muted,
      textAlign: "center"
    }
  }, m.mes.slice(0, 7))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 8,
      fontSize: 12,
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25A0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.caramel
    }
  }, "Meta")), /*#__PURE__*/React.createElement("span", null, "\u25A0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.success
    }
  }, "Real (cumplida)")), /*#__PURE__*/React.createElement("span", null, "\u25A0 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.danger
    }
  }, "Real (no cumplida)")))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Mes", "Meta (HNL)", "Real (HNL)", "Diferencia", "% Cumpl.", "Barra", "Acciones"]
  }), /*#__PURE__*/React.createElement("tbody", null, metas.map((m, idx) => {
    const diff = m.real - m.meta,
      cumpl = m.real > 0 ? m.real / m.meta * 100 : 0,
      hasReal = m.real > 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: m.mes,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        fontWeight: 600
      }
    }, m.mes), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        ...mono
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(m, "meta"),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        ...mono,
        fontSize: 13,
        color: T.text,
        textDecoration: "underline dotted"
      }
    }, L(m.meta))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        ...mono
      }
    }, hasReal ? /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(m, "real"),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        ...mono,
        fontSize: 13,
        color: T.text,
        textDecoration: "underline dotted"
      }
    }, L(m.real)) : /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(m, "real"),
      style: {
        background: T.steam,
        border: `1px dashed ${T.latte}`,
        borderRadius: 6,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 12,
        color: T.muted,
        padding: "3px 10px"
      }
    }, "+ Ingresar")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        ...mono,
        fontWeight: 700,
        color: hasReal ? diff >= 0 ? T.success : T.danger : T.muted
      }
    }, hasReal ? L(diff) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        ...mono,
        fontWeight: 700,
        color: !hasReal ? T.muted : cumpl >= 100 ? T.success : cumpl >= 80 ? T.warning : T.danger
      }
    }, hasReal ? pct(cumpl) : "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px",
        minWidth: 120
      }
    }, hasReal && /*#__PURE__*/React.createElement(ProgressBar, {
      val: cumpl,
      max: 100,
      color: cumpl >= 100 ? T.success : cumpl >= 80 ? T.warning : T.danger
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "10px 14px"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      v: "outline",
      small: true,
      onClick: () => openEdit(m, m.real > 0 ? "real" : "meta")
    }, m.real > 0 ? "Editar" : "Ingresar")));
  }))))), edit && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setEdit(null)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 6px"
    }
  }, edit.mes), /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      margin: "0 0 14px"
    }
  }, "Editando: ", edit.field === "meta" ? "Meta mensual" : "Resultado real"), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "MONTO (HNL)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: val,
    onChange: e => setVal(e.target.value),
    style: {
      ...inp(),
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setEdit(null),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 1
    }
  }, "Guardar"))));
}

// ── ALERTAS WHATSAPP ───────────────────────────────────────────
function AlertasWA({
  inventory,
  cierres,
  sales
}) {
  const [phone, setPhone] = useState("+504 ");
  const [config, setConfig] = useState({
    stockBajo: true,
    cierreDiferencia: true,
    metaAlcanzada: true,
    resumenDiario: true,
    cuentaVence: true
  });
  const [simLog, setSimLog] = useState([]);
  const td = today();
  const lowStock = inventory.filter(i => i.stock <= i.min);
  const cierreHoy = cierres.find(c => c.fecha === td);
  const totalHoy = sales.filter(s => s.date === td).reduce((s, v) => s + v.total, 0);
  const buildMsg = tipo => {
    const hora = new Date().toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const msgs = {
      stockBajo: `☕ *CaféFinanzas HN*\n🔴 ALERTA STOCK BAJO\n${new Date().toLocaleDateString("es-HN")}\n\n${lowStock.map(i => `• ${i.name}: ${i.stock} ${i.unit} (mín: ${i.min})`).join("\n")}\n\nPor favor verificar con proveedor.`,
      cierreDiferencia: cierreHoy ? `☕ *CaféFinanzas HN*\n🏦 CIERRE DE CAJA — ${td}\n\n💵 Total sistema: L. ${cierreHoy.totalSistema.toFixed(2)}\n💰 Efectivo real: L. ${cierreHoy.efectivoReal.toFixed(2)}\n${cierreHoy.diferencia === 0 ? "✅ Caja cuadrada" : cierreHoy.diferencia > 0 ? `⬆️ Sobrante: L. ${cierreHoy.diferencia.toFixed(2)}` : `⬇️ Faltante: L. ${Math.abs(cierreHoy.diferencia).toFixed(2)}`}` : "Sin cierre registrado hoy.",
      resumenDiario: `☕ *CaféFinanzas HN*\n📊 RESUMEN DIARIO — ${td}\n🕐 ${hora}\n\n💵 Ventas: L. ${totalHoy.toFixed(2)}\n📦 Transacciones: ${sales.filter(s => s.date === td).length}\n${lowStock.length > 0 ? `⚠️ ${lowStock.length} insumos con stock bajo` : "✅ Inventario OK"}\n\n_Sistema CaféFinanzas HN_`,
      metaAlcanzada: `☕ *CaféFinanzas HN*\n🎯 ¡META ALCANZADA!\n\nLas ventas del día superaron la meta establecida.\n💵 Total: L. ${totalHoy.toFixed(2)}\n\n¡Excelente trabajo al equipo! 🏆`,
      cuentaVence: `☕ *CaféFinanzas HN*\n⏰ CUENTA POR COBRAR PRÓXIMA A VENCER\n\nVerificar cuentas por cobrar que vencen en los próximos 7 días en el sistema.`
    };
    return msgs[tipo] || "Mensaje de prueba";
  };
  const simular = (tipo, label) => {
    const msg = buildMsg(tipo);
    setSimLog(p => [{
      id: Date.now(),
      tipo: label,
      msg,
      phone,
      time: new Date().toLocaleTimeString("es-HN")
    }, ...p.slice(0, 9)]);
  };
  const enviarTodos = () => {
    Object.entries(config).filter(([, v]) => v).forEach(([k]) => simular(k, k));
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Alertas WhatsApp",
    sub: "Notificaciones autom\xE1ticas al administrador v\xEDa WhatsApp"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 18,
      fontSize: 13,
      color: T.info
    }
  }, "\uD83D\uDCF1 Las alertas se env\xEDan v\xEDa la API de WhatsApp Business. Configura tu n\xFAmero y conecta la API para activar el env\xEDo real. Por ahora puedes simular los mensajes para verificar el contenido."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "\uD83D\uDCF1 N\xFAmero de Destino"), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "WHATSAPP DEL ADMINISTRADOR"), /*#__PURE__*/React.createElement("input", {
    value: phone,
    onChange: e => setPhone(e.target.value),
    placeholder: "+504 9XXX-XXXX",
    style: {
      ...inp(),
      marginBottom: 4
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: T.muted,
      margin: "4px 0 0"
    }
  }, "Formato internacional: +504 seguido del n\xFAmero")), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "\uD83D\uDD14 Tipos de Alertas"), [["stockBajo", "📦 Stock Bajo", "Cuando un insumo baje del mínimo"], ["cierreDiferencia", "🏦 Cierre de Caja", "Al registrar cierre con diferencia"], ["metaAlcanzada", "🎯 Meta Alcanzada", "Cuando se supera la meta del día"], ["resumenDiario", "📊 Resumen Diario", "Cada noche al cerrar el día"], ["cuentaVence", "💼 CxC por Vencer", "Cuentas que vencen en 7 días"]].map(([k, label, desc]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setConfig(p => ({
      ...p,
      [k]: !p[k]
    })),
    style: {
      width: 42,
      height: 24,
      borderRadius: 12,
      background: config[k] ? T.success : `${T.muted}40`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      transition: "background .2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#fff",
      transform: `translateX(${config[k] ? 18 : 0}px)`,
      transition: "transform .2s"
    }
  })), /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => simular(k, label)
  }, "Simular")))), /*#__PURE__*/React.createElement(Btn, {
    v: "dark",
    full: true,
    onClick: enviarTodos,
    style: {
      marginTop: 14
    }
  }, "\u25B6 Simular Todas las Activas"))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: 0
    }
  }, "\uD83D\uDCE8 Log de Mensajes Simulados")), simLog.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted,
      fontSize: 13
    }
  }, "Simula alertas para ver c\xF3mo se ver\xEDan los mensajes."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 520,
      overflowY: "auto"
    }
  }, simLog.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      padding: "12px 16px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", T.success)
  }, l.tipo), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: T.muted,
      ...mono
    }
  }, l.time, " \u2192 ", l.phone)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#E7FFDB",
      borderRadius: "0 10px 10px 10px",
      padding: "10px 14px",
      fontSize: 12,
      whiteSpace: "pre-wrap",
      fontFamily: "'Segoe UI',sans-serif",
      lineHeight: 1.5,
      border: "1px solid #d0f0c0"
    }
  }, l.msg)))))));
}

// ── PRODUCTOS ──────────────────────────────────────────────────
function GestionProductos({
  products,
  setProducts
}) {
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    cat: "",
    price: "",
    cost: ""
  });
  const cats = ["Todos", ...new Set(products.map(p => p.cat))];
  const rows = products.filter(p => (catF === "Todos" || p.cat === catF) && p.name.toLowerCase().includes(search.toLowerCase()));
  const save = () => {
    if (!form.name || !form.cat || !form.price || !form.cost) return;
    if (modal.mode === "add") {
      setProducts(prev => [...prev, {
        id: Date.now(),
        name: form.name,
        cat: form.cat,
        price: parseFloat(form.price),
        cost: parseFloat(form.cost),
        active: true
      }]);
    } else {
      setProducts(prev => prev.map(p => p.id === modal.data.id ? {
        ...p,
        name: form.name,
        cat: form.cat,
        price: parseFloat(form.price),
        cost: parseFloat(form.cost)
      } : p));
    }
    setModal(null);
  };
  const catIcon = c => ({
    Café: "☕",
    Granitas: "🧋",
    Bebidas: "🥤",
    Alimentos: "🥪"
  })[c] || "🍽️";
  return /*#__PURE__*/React.createElement(Page, {
    title: "Gesti\xF3n de Productos",
    sub: `${products.length} productos · ${products.filter(p => p.active).length} activos`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => {
        setForm({
          name: "",
          cat: "",
          price: "",
          cost: ""
        });
        setModal({
          mode: "add"
        });
      }
    }, "+ Nuevo Producto")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar...",
    style: {
      ...inp(),
      maxWidth: 250,
      flex: "0 0 250px"
    }
  }), cats.map(c => /*#__PURE__*/React.createElement(Btn, {
    key: c,
    v: catF === c ? "primary" : "outline",
    small: true,
    onClick: () => setCatF(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["", "Producto", "Cat.", "Precio HNL", "Costo", "Margen", "Estado", "Acciones"]
  }), /*#__PURE__*/React.createElement("tbody", null, rows.map((p, idx) => {
    const mg = (p.price - p.cost) / p.price * 100;
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`,
        opacity: p.active ? 1 : .6
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 10px",
        fontSize: 20,
        textAlign: "center"
      }
    }, catIcon(p.cat)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, p.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg(T.espresso, T.latte)
    }, p.cat)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.caramel,
        fontWeight: 700
      }
    }, L(p.price)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono
      }
    }, L(p.cost)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", mg > 40 ? T.success : mg > 25 ? T.warning : T.danger)
    }, pct(mg))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", p.active ? T.success : T.muted)
    }, p.active ? "Activo" : "Inactivo")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      v: "outline",
      small: true,
      onClick: () => {
        setForm({
          name: p.name,
          cat: p.cat,
          price: String(p.price),
          cost: String(p.cost)
        });
        setModal({
          mode: "edit",
          data: p
        });
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement(Btn, {
      v: "ghost",
      small: true,
      onClick: () => setProducts(prev => prev.map(x => x.id === p.id ? {
        ...x,
        active: !x.active
      } : x))
    }, p.active ? "⏸" : "▶"), /*#__PURE__*/React.createElement(Btn, {
      v: "danger",
      small: true,
      onClick: () => setProducts(prev => prev.filter(x => x.id !== p.id))
    }, "\uD83D\uDDD1"))));
  }), "  ")))), modal && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setModal(null)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, modal.mode === "add" ? "Nuevo Producto" : "Editar Producto"), [["Nombre", "text", "name", "Flat White"], ["Categoría", "text", "cat", "Café"], ["Precio venta (HNL)", "number", "price", "85"], ["Costo directo (HNL)", "number", "cost", "22"]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), form.price && form.cost && /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 12,
      fontSize: 13
    }
  }, "Margen: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: T.caramel
    }
  }, pct((parseFloat(form.price) - parseFloat(form.cost)) / parseFloat(form.price) * 100))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setModal(null),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 1
    }
  }, "Guardar"))));
}

// ── USUARIOS ───────────────────────────────────────────────────
function GestionUsuarios({
  users,
  setUsers,
  demoKeys,
  setDemoKeys,
  currentUser
}) {
  const [tab, setTab] = useState("users");
  const [modal, setModal] = useState(false);
  const [passM, setPassM] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "cajero",
    pass: "",
    pass2: ""
  });
  const [pf, setPf] = useState({
    old: "",
    new1: "",
    new2: ""
  });
  const [pErr, setPErr] = useState("");
  const [demoM, setDemoM] = useState(false);
  const [demoDays, setDemoDays] = useState("7");
  const [newKey, setNewKey] = useState("");
  const saveUser = () => {
    if (!form.name || !form.pass || form.pass !== form.pass2) return;
    setUsers(prev => [...prev, {
      id: Date.now(),
      name: form.name,
      role: form.role,
      av: mkAv(form.name),
      pass: form.pass,
      active: true
    }]);
    setModal(false);
    setForm({
      name: "",
      role: "cajero",
      pass: "",
      pass2: ""
    });
  };
  const changePass = () => {
    const u = users.find(u => u.id === passM.id);
    if (u.pass !== pf.old) {
      setPErr("Contraseña actual incorrecta");
      return;
    }
    if (pf.new1 !== pf.new2) {
      setPErr("No coinciden");
      return;
    }
    if (pf.new1.length < 6) {
      setPErr("Mínimo 6 caracteres");
      return;
    }
    setUsers(prev => prev.map(u => u.id === passM.id ? {
      ...u,
      pass: pf.new1
    } : u));
    setPassM(null);
    setPf({
      old: "",
      new1: "",
      new2: ""
    });
    setPErr("");
  };
  const genKey = () => {
    const k = mkKey();
    const exp = new Date(Date.now() + parseInt(demoDays) * 86400000).toISOString();
    setDemoKeys(prev => [...prev, {
      key: k,
      expires: exp,
      days: demoDays,
      createdBy: currentUser.name,
      created: new Date().toISOString()
    }]);
    setNewKey(k);
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Usuarios & Acceso"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 18
    }
  }, [["users", "👤 Usuarios"], ["demo", "🔑 Claves Demo"]].map(([v, l]) => /*#__PURE__*/React.createElement(Btn, {
    key: v,
    v: tab === v ? "primary" : "outline",
    onClick: () => setTab(v)
  }, l))), tab === "users" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden",
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: 0
    }
  }, "Usuarios"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: () => setModal(true)
  }, "+ Nuevo")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Usuario", "Rol", "Estado", "Acciones"]
  }), /*#__PURE__*/React.createElement("tbody", null, users.map((u, idx) => /*#__PURE__*/React.createElement("tr", {
    key: u.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: ROLES_DEF[u.role].color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: T.espresso,
      ...mono
    }
  }, u.av), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, u.name), u.id === currentUser.id && /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.gold)
  }, "Yo"))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, ROLES_DEF[u.role].color)
  }, ROLES_DEF[u.role].label)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", u.active ? T.success : T.muted)
  }, u.active ? "Activo" : "Inactivo")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => {
      setPassM(u);
      setPf({
        old: "",
        new1: "",
        new2: ""
      });
      setPErr("");
    }
  }, "\uD83D\uDD12"), u.id !== currentUser.id && /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    small: true,
    onClick: () => setUsers(prev => prev.map(x => x.id === u.id ? {
      ...x,
      active: !x.active
    } : x))
  }, u.active ? "↓" : "↑"))))))))), tab === "demo" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 12px"
    }
  }, "Generar Clave de Demostraci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-end",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "DURACI\xD3N"), /*#__PURE__*/React.createElement("select", {
    value: demoDays,
    onChange: e => setDemoDays(e.target.value),
    style: {
      ...inp(),
      width: "auto"
    }
  }, [["1", "1 día"], ["3", "3 días"], ["7", "7 días"], ["15", "15 días"], ["30", "30 días"]].map(([v, l]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v
  }, l)))), /*#__PURE__*/React.createElement(Btn, {
    v: "dark",
    onClick: () => {
      genKey();
      setDemoM(true);
    }
  }, "\uD83D\uDD11 Generar Clave"))), demoKeys.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: 0
    }
  }, "Claves Activas (", demoKeys.length, ")")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Clave", "Creada por", "Expira", "Estado", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, demoKeys.map((k, idx) => {
    const exp = new Date(k.expires) < new Date(),
      dL = Math.ceil((new Date(k.expires) - new Date()) / 86400000);
    return /*#__PURE__*/React.createElement("tr", {
      key: k.key,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "9px 14px",
        ...mono,
        fontWeight: 700,
        letterSpacing: 1,
        color: exp ? T.muted : T.caramel
      }
    }, k.key), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "9px 14px",
        color: T.muted
      }
    }, k.createdBy), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "9px 14px",
        ...mono,
        fontSize: 12
      }
    }, new Date(k.expires).toLocaleDateString("es-HN")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "9px 14px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: bdg("#fff", exp ? T.danger : dL <= 3 ? T.warning : T.success)
    }, exp ? "Expirada" : dL === 0 ? "Hoy" : `${dL}d`)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "9px 14px"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      v: "danger",
      small: true,
      onClick: () => setDemoKeys(p => p.filter(x => x.key !== k.key))
    }, "Revocar")));
  }), "  ")))), modal && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setModal(false)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nuevo Usuario"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "NOMBRE"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.name,
    onChange: e => setForm(p => ({
      ...p,
      name: e.target.value
    })),
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "ROL"), /*#__PURE__*/React.createElement("select", {
    value: form.role,
    onChange: e => setForm(p => ({
      ...p,
      role: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 24
    }
  }, Object.entries(ROLES_DEF).map(([k, r]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, r.label)))), [["Contraseña", "pass"], ["Confirmar", "pass2"]].map(([l, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), form.pass && form.pass2 && form.pass !== form.pass2 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.danger,
      fontSize: 12,
      marginBottom: 8
    }
  }, "No coinciden"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setModal(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: saveUser,
    disabled: !form.name || !form.pass || form.pass !== form.pass2 || form.pass.length < 6,
    style: {
      flex: 1
    }
  }, "Crear"))), passM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setPassM(null)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 5px"
    }
  }, "Cambiar Contrase\xF1a"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      margin: "0 0 14px"
    }
  }, passM.name), [["Contraseña actual", "old"], ["Nueva contraseña", "new1"], ["Confirmar nueva", "new2"]].map(([l, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pf[k],
    onChange: e => {
      setPf(p => ({
        ...p,
        [k]: e.target.value
      }));
      setPErr("");
    },
    style: inp()
  }))), pErr && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.danger,
      fontSize: 12,
      marginBottom: 10
    }
  }, pErr), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setPassM(null),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: changePass,
    style: {
      flex: 1
    }
  }, "Cambiar"))), demoM && newKey && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setDemoM(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 10
    }
  }, "\uD83D\uDD11"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 20,
      margin: "0 0 6px"
    }
  }, "\xA1Clave generada!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      marginBottom: 16
    }
  }, "V\xE1lida por ", /*#__PURE__*/React.createElement("strong", null, demoDays, " d\xEDas"), ". Comparte con tu evaluador."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 22,
      fontWeight: 700,
      color: T.caramel,
      letterSpacing: 3
    }
  }, newKey), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginTop: 6
    }
  }, "Expira: ", new Date(Date.now() + parseInt(demoDays) * 86400000).toLocaleDateString("es-HN"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 12,
      color: T.info,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Instrucciones:"), /*#__PURE__*/React.createElement("br", null), "1. Ir a login \u2192 \"\uD83D\uDD11 Clave de Demo\"", /*#__PURE__*/React.createElement("br", null), "2. Ingresar: ", /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 700
    }
  }, newKey), /*#__PURE__*/React.createElement("br", null), "3. Acceso completo como Administrador"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    full: true,
    onClick: () => setDemoM(false)
  }, "Entendido"))));
}

// ── CONFIGURACIÓN ──────────────────────────────────────────────
function Config({
  xr,
  setXr,
  xrStatus,
  setXrStatus,
  fetchBCH
}) {
  const [rate, setRate] = useState(xr.toString());
  return /*#__PURE__*/React.createElement(Page, {
    title: "Configuraci\xF3n"
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      maxWidth: 520
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 12px"
    }
  }, "\uD83D\uDCB1 Tipo de Cambio BCH"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 5
    }
  }, "LEMPIRAS POR 1 USD"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: rate,
    onChange: e => setRate(e.target.value),
    style: inp()
  })), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: () => {
      setXr(parseFloat(rate) || xr);
      setXrStatus("manual");
    }
  }, "Actualizar"), /*#__PURE__*/React.createElement(Btn, {
    v: "dark",
    onClick: fetchBCH
  }, "\uD83D\uDD04 BCH en Vivo")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 14,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 30,
      fontWeight: 700,
      color: T.caramel
    }
  }, "L. ", xr.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", xrStatus === "live" ? T.success : xrStatus === "loading" ? T.warning : T.muted)
  }, xrStatus === "live" ? "● En vivo" : xrStatus === "loading" ? "⟳ Consultando…" : "● Manual")))));
}

// ── DESCUENTOS Y PROMOCIONES ────────────────────────────────────
function Descuentos({
  descuentos,
  setDescuentos
}) {
  const [addM, setAddM] = useState(false);
  const BLANK = {
    nombre: "",
    tipo: "porcentaje",
    valor: "",
    condicion: "siempre",
    horaDe: "",
    horaHasta: "",
    activo: true
  };
  const [form, setForm] = useState(BLANK);
  const tipoLabel = {
    porcentaje: "% Porcentaje",
    monto: "L. Monto fijo",
    "2x1": "2×1 en producto",
    empleado: "Descuento empleado"
  };
  const condLabel = {
    siempre: "Siempre activo",
    "happy-hour": "Happy Hour (rango horario)",
    "dia-semana": "Día de semana específico",
    cumpleanios: "Cumpleaños del cliente"
  };
  const save = () => {
    if (!form.nombre || !form.valor) return;
    setDescuentos(p => [...p, {
      id: Date.now(),
      ...form,
      valor: parseFloat(form.valor) || 0
    }]);
    setAddM(false);
    setForm(BLANK);
  };
  const toggle = id => setDescuentos(p => p.map(d => d.id === id ? {
    ...d,
    activo: !d.activo
  } : d));
  const del = id => setDescuentos(p => p.filter(d => d.id !== id));
  return /*#__PURE__*/React.createElement(Page, {
    title: "Descuentos y Promociones",
    sub: `${descuentos.filter(d => d.activo).length} activas · ${descuentos.length} en total`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => {
        setForm(BLANK);
        setAddM(true);
      }
    }, "+ Nueva Promoci\xF3n")
  }, descuentos.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      textAlign: "center",
      padding: 40,
      color: T.muted
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("p", null, "No hay promociones. Crea la primera.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
      gap: 12
    }
  }, descuentos.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: card({
      borderTop: `4px solid ${d.activo ? T.caramel : T.muted}`,
      opacity: d.activo ? 1 : .7
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      fontWeight: 700
    }
  }, d.nombre), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", d.activo ? T.success : T.muted)
  }, d.activo ? "Activa" : "Inactiva")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 22,
      fontWeight: 700,
      color: T.caramel
    }
  }, d.tipo === "porcentaje" ? `${d.valor}%` : d.tipo === "monto" ? L(d.valor) : d.tipo === "2x1" ? "2×1" : "Empl.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginBottom: 4
    }
  }, "Tipo: ", tipoLabel[d.tipo]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted,
      marginBottom: 12
    }
  }, "Condici\xF3n: ", condLabel[d.condicion], d.condicion === "happy-hour" && d.horaDe ? ` · ${d.horaDe}–${d.horaHasta}` : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: d.activo ? "ghost" : "success",
    small: true,
    onClick: () => toggle(d.id),
    style: {
      flex: 1
    }
  }, d.activo ? "Pausar" : "Activar"), /*#__PURE__*/React.createElement(Btn, {
    v: "danger",
    small: true,
    onClick: () => del(d.id)
  }, "\uD83D\uDDD1"))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 440
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 16px"
    }
  }, "Nueva Promoci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "NOMBRE DE LA PROMOCI\xD3N"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.nombre,
    onChange: e => setForm(p => ({
      ...p,
      nombre: e.target.value
    })),
    placeholder: "Ej: Happy Hour 3-5pm",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "TIPO"), /*#__PURE__*/React.createElement("select", {
    value: form.tipo,
    onChange: e => setForm(p => ({
      ...p,
      tipo: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, Object.entries(tipoLabel).map(([k, v]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, v)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "VALOR"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.valor,
    onChange: e => setForm(p => ({
      ...p,
      valor: e.target.value
    })),
    placeholder: form.tipo === "porcentaje" ? "15" : "0.00",
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CONDICI\xD3N"), /*#__PURE__*/React.createElement("select", {
    value: form.condicion,
    onChange: e => setForm(p => ({
      ...p,
      condicion: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, Object.entries(condLabel).map(([k, v]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, v)))), form.condicion === "happy-hour" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "DESDE"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: form.horaDe,
    onChange: e => setForm(p => ({
      ...p,
      horaDe: e.target.value
    })),
    style: inp()
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "HASTA"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: form.horaHasta,
    onChange: e => setForm(p => ({
      ...p,
      horaHasta: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 2
    }
  }, "Guardar Promoci\xF3n"))));
}

// ── PROGRAMA DE FIDELIDAD ───────────────────────────────────────
function Fidelidad({
  clientes,
  setClientes,
  sales
}) {
  const [search, setSearch] = useState("");
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fechaNac: ""
  });
  const PUNTOS_POR_100 = 1; // 1 punto por cada L.100
  const PUNTOS_CANJE = 50; // 50 puntos = L.50 de descuento
  const save = () => {
    if (!form.nombre) return;
    setClientes(p => [...p, {
      id: Date.now(),
      ...form,
      puntos: 0,
      visitas: 0,
      totalGastado: 0,
      fechaReg: new Date().toISOString().slice(0, 10),
      activo: true
    }]);
    setAddM(false);
    setForm({
      nombre: "",
      telefono: "",
      email: "",
      fechaNac: ""
    });
  };
  const canjear = (id, pts) => setClientes(p => p.map(c => c.id === id && c.puntos >= pts ? {
    ...c,
    puntos: c.puntos - pts
  } : c));
  const rows = clientes.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()) || c.telefono?.includes(search));
  const totalPuntos = clientes.reduce((s, c) => s + c.puntos, 0);
  const nivelColor = pts => pts >= 500 ? T.gold : pts >= 200 ? T.caramel : pts >= 50 ? T.info : T.muted;
  const nivelLabel = pts => pts >= 500 ? "🥇 Gold" : pts >= 200 ? "🥈 Silver" : pts >= 50 ? "🥉 Bronze" : "Nuevo";
  return /*#__PURE__*/React.createElement(Page, {
    title: "Programa de Fidelidad",
    sub: `${clientes.length} clientes registrados · ${totalPuntos} puntos activos`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Nuevo Cliente")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDC64",
    label: "Clientes",
    value: `${clientes.length}`,
    sub: "Registrados en el programa"
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2B50",
    label: "Puntos Activos",
    value: totalPuntos.toLocaleString(),
    sub: `${PUNTOS_CANJE} pts = L. 50 descuento`,
    color: T.gold
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83E\uDD47",
    label: "Gold (500+ pts)",
    value: `${clientes.filter(c => c.puntos >= 500).length}`,
    sub: "Clientes top",
    color: T.gold
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDD04",
    label: "Regla de Puntos",
    value: `${PUNTOS_POR_100} pto / L.100`,
    sub: "Configurable",
    color: T.caramel
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar por nombre o tel\xE9fono...",
    style: {
      ...inp(),
      maxWidth: 320
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, clientes.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay clientes registrados en el programa de fidelidad."), rows.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Cliente", "Teléfono", "Nivel", "Puntos", "Visitas", "Total Gastado", "Registrado", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, rows.sort((a, b) => b.puntos - a.puntos).map((c, idx) => /*#__PURE__*/React.createElement("tr", {
    key: c.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, c.nombre), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 12
    }
  }, c.telefono || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", nivelColor(c.puntos))
  }, nivelLabel(c.puntos))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontWeight: 700,
      color: T.gold
    }
  }, c.puntos), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      textAlign: "center"
    }
  }, c.visitas), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, L(c.totalGastado)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 11,
      color: T.muted
    }
  }, c.fechaReg), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, c.puntos >= PUNTOS_CANJE && /*#__PURE__*/React.createElement(Btn, {
    v: "warning",
    small: true,
    onClick: () => canjear(c.id, PUNTOS_CANJE)
  }, "Canjear ", PUNTOS_CANJE, "pts")))))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 400
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Registrar Cliente"), [["Nombre completo", "text", "nombre", "Ana Pérez"], ["Teléfono WhatsApp", "tel", "telefono", "+504 9XXX-XXXX"], ["Email (opcional)", "email", "email", ""], ["Fecha de nacimiento", "date", "fechaNac", ""]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.gold}15`,
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 14,
      fontSize: 12,
      color: T.text
    }
  }, "\u2B50 El cliente recibir\xE1 ", /*#__PURE__*/React.createElement("strong", null, PUNTOS_POR_100, " punto por cada L.100"), " gastado. Con ", /*#__PURE__*/React.createElement("strong", null, PUNTOS_CANJE, " puntos"), " puede canjear ", /*#__PURE__*/React.createElement("strong", null, "L.50 de descuento"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 2
    }
  }, "Registrar"))));
}

// ── CONTROL DE MERMAS ───────────────────────────────────────────
function Mermas({
  mermas,
  setMermas,
  inventory
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    fecha: today(),
    insumo: "",
    cantidad: "",
    motivo: "desperdicio",
    costo: "",
    notas: ""
  });
  const motivos = {
    desperdicio: "🗑 Desperdicio/Vencimiento",
    derrame: "💧 Derrame/Accidente",
    error: "❌ Error de preparación",
    robo: "🚨 Faltante/Robo",
    otro: "📝 Otro"
  };
  const totalMes = mermas.filter(m => m.fecha?.startsWith("2026-03")).reduce((s, m) => s + parseFloat(m.costo || 0), 0);
  const totalAll = mermas.reduce((s, m) => s + parseFloat(m.costo || 0), 0);
  const byMotivo = {};
  mermas.forEach(m => {
    byMotivo[m.motivo] = (byMotivo[m.motivo] || 0) + parseFloat(m.costo || 0);
  });
  const save = () => {
    if (!form.insumo || !form.cantidad) return;
    const inv = inventory.find(i => i.name === form.insumo);
    const costoCalc = inv ? (parseFloat(form.cantidad) || 0) * inv.cost : parseFloat(form.costo) || 0;
    setMermas(p => [{
      id: Date.now(),
      ...form,
      costo: costoCalc,
      cantidad: parseFloat(form.cantidad) || 0
    }, ...p]);
    setAddM(false);
    setForm({
      fecha: today(),
      insumo: "",
      cantidad: "",
      motivo: "desperdicio",
      costo: "",
      notas: ""
    });
  };
  const doExport = () => exportXLSX([{
    name: "Mermas",
    data: [["Fecha", "Insumo", "Cantidad", "Motivo", "Costo (HNL)", "Notas"], ...mermas.map(m => [m.fecha, m.insumo, m.cantidad, motivos[m.motivo] || m.motivo, m.costo, m.notas])]
  }], "Mermas.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Control de Mermas",
    sub: `Mes actual: ${L(totalMes)} · Total registrado: ${L(totalAll)}`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Excel"), /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Registrar Merma"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, mermas.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36
    }
  }, "\uD83D\uDCC9"), /*#__PURE__*/React.createElement("p", null, "Sin mermas registradas. Agrega la primera.")), mermas.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Fecha", "Insumo", "Cantidad", "Motivo", "Costo", "Notas", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, mermas.map((m, idx) => /*#__PURE__*/React.createElement("tr", {
    key: m.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      fontSize: 12
    }
  }, m.fecha), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontWeight: 600
    }
  }, m.insumo), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono
    }
  }, m.cantidad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      fontSize: 12
    }
  }, motivos[m.motivo] || m.motivo), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.danger,
      fontWeight: 700
    }
  }, L(m.costo)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.muted,
      fontSize: 12
    }
  }, m.notas || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "danger",
    small: true,
    onClick: () => setMermas(p => p.filter(x => x.id !== m.id))
  }, "\u2715")))))))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: "0 0 14px"
    }
  }, "Por Motivo"), Object.entries(byMotivo).sort((a, b) => b[1] - a[1]).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 3,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, motivos[k] || k), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontWeight: 600,
      color: T.danger
    }
  }, L(v))), /*#__PURE__*/React.createElement(ProgressBar, {
    val: v,
    max: totalAll || 1,
    color: T.danger
  }))), Object.keys(byMotivo).length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13
    }
  }, "Sin datos."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${T.latte}`,
      marginTop: 12,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "TOTAL DEL MES"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 20,
      fontWeight: 700,
      color: T.danger
    }
  }, L(totalMes))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 440
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Registrar Merma"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "FECHA"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.fecha,
    onChange: e => setForm(p => ({
      ...p,
      fecha: e.target.value
    })),
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "INSUMO"), /*#__PURE__*/React.createElement("select", {
    value: form.insumo,
    onChange: e => setForm(p => ({
      ...p,
      insumo: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar insumo..."), inventory.map(i => /*#__PURE__*/React.createElement("option", {
    key: i.id,
    value: i.name
  }, i.name, " (", i.unit, ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CANTIDAD"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: form.cantidad,
    onChange: e => setForm(p => ({
      ...p,
      cantidad: e.target.value
    })),
    placeholder: "0",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "MOTIVO"), /*#__PURE__*/React.createElement("select", {
    value: form.motivo,
    onChange: e => setForm(p => ({
      ...p,
      motivo: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, Object.entries(motivos).map(([k, v]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, v))))), form.insumo && form.cantidad && (() => {
    const inv = inventory.find(i => i.name === form.insumo);
    const costo = inv ? (parseFloat(form.cantidad) || 0) * inv.cost : 0;
    return costo > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: `${T.danger}10`,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 10,
        fontSize: 13
      }
    }, "Costo estimado de la merma: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: T.danger
      }
    }, L(costo)));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "NOTAS (opcional)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.notas,
    onChange: e => setForm(p => ({
      ...p,
      notas: e.target.value
    })),
    placeholder: "Descripci\xF3n del incidente...",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 2
    }
  }, "Registrar"))));
}

// ── CALENDARIO DE PAGOS ─────────────────────────────────────────
function CalendarioPagos({
  employees,
  suppliers
}) {
  const [mes, setMes] = useState("2026-04");
  const nomina_ = employees.filter(e => e.active).reduce((s, e) => s + nomina(e.sal).neto, 0);
  const ihss = employees.filter(e => e.active).reduce((s, e) => {
    const n = nomina(e.sal);
    return s + n.ie + n.re + n.ip + n.rp;
  }, 0);
  const infop_ = employees.filter(e => e.active).reduce((s, e) => s + nomina(e.sal).inf, 0);
  const eventos = [{
    dia: 1,
    label: "Provisión de nómina",
    cat: "nomina",
    monto: nomina_,
    nota: "Apartar fondos para quincena"
  }, {
    dia: 5,
    label: "IHSS — Aportaciones",
    cat: "ihss",
    monto: ihss,
    nota: "Pago mensual al IHSS"
  }, {
    dia: 5,
    label: "INFOP — Aportación patronal",
    cat: "infop",
    monto: infop_,
    nota: "1% salarios brutos"
  }, {
    dia: 10,
    label: "Nómina 1ra quincena",
    cat: "nomina",
    monto: nomina_ / 2,
    nota: "Primer pago quincenal"
  }, {
    dia: 15,
    label: "RAP — Aportaciones",
    cat: "rap",
    monto: employees.filter(e => e.active).reduce((s, e) => {
      const n = nomina(e.sal);
      return s + n.re + n.rp;
    }, 0),
    nota: "Régimen de Aportaciones Privadas"
  }, {
    dia: 25,
    label: "Nómina 2da quincena",
    cat: "nomina",
    monto: nomina_ / 2,
    nota: "Segundo pago quincenal"
  }, {
    dia: 28,
    label: "ISV mensual (proyectado)",
    cat: "sar",
    monto: 612400 * 0.15 * 0.7,
    nota: "D-101 ante el SAR"
  }, ...suppliers.filter(s => s.bal > 0).map(s => ({
    dia: parseInt(s.due?.split("-")[2]) || 15,
    label: `CxP: ${s.name}`,
    cat: "proveedor",
    monto: s.bal,
    nota: "Cuenta por pagar"
  }))].sort((a, b) => a.dia - b.dia);
  const catColor = {
    nomina: T.success,
    ihss: T.caramel,
    infop: T.info,
    rap: T.info,
    sar: T.warning,
    proveedor: T.danger
  };
  const total = eventos.reduce((s, e) => s + e.monto, 0);
  return /*#__PURE__*/React.createElement(Page, {
    title: "Calendario de Pagos",
    sub: `${mes} · Total compromisos: ${L(total)}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 18,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: mes,
    onChange: e => setMes(e.target.value),
    style: {
      ...inp(),
      maxWidth: 180
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Object.entries({
    nomina: "Nómina",
    ihss: "IHSS",
    infop: "INFOP",
    rap: "RAP",
    sar: "SAR",
    proveedor: "Proveedores"
  }).map(([k, l]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      ...bdg("#fff", catColor[k]),
      padding: "4px 10px"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Día", "Compromiso", "Categoría", "Monto", "Notas"]
  }), /*#__PURE__*/React.createElement("tbody", null, eventos.map((e, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px",
      ...mono,
      fontWeight: 700,
      fontSize: 16,
      color: T.caramel,
      width: 50
    }
  }, e.dia), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px",
      fontWeight: 600
    }
  }, e.label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", catColor[e.cat])
  }, e.cat)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px",
      ...mono,
      fontWeight: 700,
      color: T.danger
    }
  }, L(e.monto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px 14px",
      color: T.muted,
      fontSize: 12
    }
  }, e.nota)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderTop: `1px solid ${T.steam}`,
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 700,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "TOTAL DEL MES"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.danger
    }
  }, L(total)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 12
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: "0 0 14px"
    }
  }, "Por Categor\xEDa"), Object.entries(catColor).map(([k, c]) => {
    const tot = eventos.filter(e => e.cat === k).reduce((s, e) => s + e.monto, 0);
    if (!tot) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 3,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: "capitalize"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono,
        fontWeight: 600
      }
    }, L(tot))), /*#__PURE__*/React.createElement(ProgressBar, {
      val: tot,
      max: total || 1,
      color: c
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      background: `${T.warning}10`,
      border: `1px solid ${T.warning}30`
    })
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      margin: "0 0 10px"
    }
  }, "\u26A1 Pr\xF3ximos 7 d\xEDas"), eventos.filter(e => e.dia <= 7).map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      padding: "5px 0",
      borderBottom: `1px dotted ${T.latte}`,
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, "D\xEDa ", e.dia, ": ", e.label), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.danger
    }
  }, L(e.monto))))))));
}

// ── LIBRO DE VENTAS SAR ─────────────────────────────────────────
function LibroVentas({
  sales
}) {
  const [mes, setMes] = useState("2026-03");
  const ventasMes = sales.filter(s => s.date?.startsWith(mes));
  const totalVtas = ventasMes.reduce((s, v) => s + v.subtotal, 0);
  const totalISV = ventasMes.reduce((s, v) => s + v.isv, 0);
  const totalNeto = ventasMes.reduce((s, v) => s + v.total, 0);
  const doExport = () => {
    const header = ["N°", "Fecha", "N° Factura", "RTN Cliente", "Nombre Cliente", "Exento ISV", "Gravado ISV", "ISV 15%", "Total"];
    const rows = ventasMes.map((v, i) => [i + 1, v.date, String(v.invoiceNum || i + 1).padStart(8, "0"), "", "Consumidor Final", 0, v.subtotal, v.isv, v.total]);
    const totRow = ["", "", "", "", "TOTALES", 0, totalVtas, totalISV, totalNeto];
    exportXLSX([{
      name: "Libro Ventas",
      data: [header, ...rows, [""], totRow]
    }, {
      name: "Info",
      data: [["LIBRO DE VENTAS — FORMATO SAR HONDURAS"], ["Período:", mes], ["Contribuyente:", "Mi Coffee Shop"], ["RTN:", "Pendiente de registro"], ["Generado:", new Date().toLocaleDateString("es-HN")]]
    }], "LibroVentas_SAR.xlsx");
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Libro de Ventas SAR",
    sub: "Formato D-101 \xB7 Honduras \xB7 Registro cronol\xF3gico de ventas",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Exportar Excel SAR"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 13,
      color: T.info
    }
  }, "\uD83D\uDCCB Este libro cumple el formato requerido por el SAR de Honduras para declaraciones de ISV (formulario D-101). Activar numeraci\xF3n CAI al formalizar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: mes,
    onChange: e => setMes(e.target.value),
    style: {
      ...inp(),
      maxWidth: 180
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: T.muted
    }
  }, ventasMes.length, " facturas en el per\xEDodo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCCB",
    label: "Facturas Emitidas",
    value: ventasMes.length.toString(),
    color: T.info
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB5",
    label: "Ventas Gravadas",
    value: L(totalVtas),
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFDB\uFE0F",
    label: "ISV Generado (15%)",
    value: L(totalISV),
    color: T.warning
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB0",
    label: "Total Facturado",
    value: L(totalNeto),
    color: T.caramel
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`,
      background: T.steam
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      fontSize: 11,
      fontWeight: 700,
      color: T.muted,
      letterSpacing: .5
    }
  }, /*#__PURE__*/React.createElement("span", null, "LIBRO DE VENTAS HONDURAS"), /*#__PURE__*/React.createElement("span", null, "CONTRIBUYENTE: MI COFFEE SHOP"), /*#__PURE__*/React.createElement("span", null, "RTN: PENDIENTE"), /*#__PURE__*/React.createElement("span", null, "PER\xCDODO: ", mes))), ventasMes.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: T.muted
    }
  }, "No hay ventas registradas en el POS para este per\xEDodo. Registra ventas en el m\xF3dulo POS para verlas aqu\xED."), ventasMes.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["N°", "Fecha", "N° Factura", "RTN Cliente", "Nombre Cliente", "Exento ISV", "Gravado ISV", "ISV 15%", "Total"]
  }), /*#__PURE__*/React.createElement("tbody", null, ventasMes.map((v, i) => /*#__PURE__*/React.createElement("tr", {
    key: v.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: i % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.muted
    }
  }, i + 1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono
    }
  }, v.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.caramel
    }
  }, String(v.invoiceNum || i + 1).padStart(8, "0")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      color: T.muted,
      fontSize: 11
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px"
    }
  }, "Consumidor Final"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono
    }
  }, "0.00"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      fontWeight: 600
    }
  }, L(v.subtotal)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.warning
    }
  }, L(v.isv)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      fontWeight: 700
    }
  }, L(v.total)))), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      padding: "9px 12px",
      color: T.gold,
      fontWeight: 700
    }
  }, "TOTALES DEL PER\xCDODO"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.latte
    }
  }, "0.00"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700
    }
  }, L(totalVtas)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, L(totalISV)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700,
      fontSize: 14
    }
  }, L(totalNeto))))))));
}

// ── AGUINALDO Y DÉCIMO CUARTO ───────────────────────────────────
function Aguinaldo({
  employees
}) {
  const [anio, setAnio] = useState("2026");
  const active = employees.filter(e => e.active);
  const mesesTrabajados = desde => {
    const inicio = new Date(desde),
      fin = new Date();
    const meses = (fin.getFullYear() - inicio.getFullYear()) * 12 + (fin.getMonth() - inicio.getMonth());
    return Math.min(12, Math.max(0, meses));
  };
  const calcAguinaldo = (sal, desde) => {
    const m = mesesTrabajados(desde);
    return sal / 12 * Math.min(m, 12);
  };
  const calc14 = (sal, desde) => {
    const m = mesesTrabajados(desde);
    return sal / 12 * Math.min(m, 12);
  };
  const totalAg = active.reduce((s, e) => s + calcAguinaldo(e.sal, e.since), 0);
  const total14 = active.reduce((s, e) => s + calc14(e.sal, e.since), 0);
  const doExport = () => exportXLSX([{
    name: "Aguinaldo",
    data: [["Empleado", "Puesto", "Desde", "S.Mensual", "Meses", "Aguinaldo (13°)", "Décimo 14° (Jun)", "Total"], ...active.map(e => [e.name, e.pos, e.since, e.sal, mesesTrabajados(e.since), calcAguinaldo(e.sal, e.since).toFixed(2), calc14(e.sal, e.since).toFixed(2), (calcAguinaldo(e.sal, e.since) + calc14(e.sal, e.since)).toFixed(2)])]
  }], "Aguinaldo.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Aguinaldo y D\xE9cimo Cuarto",
    sub: "13\xB0 mes (Dic) \xB7 14\xB0 mes (Jun) \xB7 Art\xEDculos 182-183 C\xF3digo del Trabajo Honduras",
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Exportar Excel")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 13
    }
  }, "\uD83D\uDCD6 ", /*#__PURE__*/React.createElement("strong", null, "Honduras:"), " Aguinaldo (13\xB0) = salario mensual \xF7 12 \xD7 meses trabajados, pagadero en diciembre. D\xE9cimo Cuarto = igual c\xE1lculo, pagadero en junio. Obligatorio conforme Art. 182-183 C\xF3digo del Trabajo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDF84",
    label: "Aguinaldo (Dic)",
    value: L(totalAg),
    sub: "13\xB0 mes proyectado",
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2600\uFE0F",
    label: "D\xE9cimo 14\xB0 (Jun)",
    value: L(total14),
    sub: "14\xB0 mes proyectado",
    color: T.caramel
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2696\uFE0F",
    label: "Total Provisi\xF3n Anual",
    value: L(totalAg + total14),
    sub: `${active.length} empleados activos`,
    color: T.espresso
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Empleado", "Puesto", "Desde", "S.Mensual", "Meses", "Aguinaldo (13°)", "Décimo 14°", "Provisión/Mes", "Total Anual"]
  }), /*#__PURE__*/React.createElement("tbody", null, active.map((e, idx) => {
    const ag = calcAguinaldo(e.sal, e.since),
      d14 = calc14(e.sal, e.since),
      m = mesesTrabajados(e.since);
    return /*#__PURE__*/React.createElement("tr", {
      key: e.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, e.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        color: T.muted
      }
    }, e.pos), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontSize: 11
      }
    }, e.since), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono
      }
    }, L(e.sal)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        textAlign: "center",
        fontWeight: 700
      }
    }, m), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.success,
        fontWeight: 600
      }
    }, L(ag)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.caramel,
        fontWeight: 600
      }
    }, L(d14)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.info
      }
    }, L((ag + d14) / 12)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700
      }
    }, L(ag + d14)));
  }), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      padding: "9px 12px",
      color: T.gold,
      fontWeight: 700
    }
  }, "TOTALES"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#7AEA9A",
      fontWeight: 700
    }
  }, L(totalAg)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700
    }
  }, L(total14)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#A8D8EA",
      fontWeight: 700
    }
  }, L((totalAg + total14) / 12)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700,
      fontSize: 14
    }
  }, L(totalAg + total14))))))));
}

// ── PROVISIÓN DE PRESTACIONES ───────────────────────────────────
function Prestaciones({
  employees
}) {
  const active = employees.filter(e => e.active);
  const aniosS = desde => Math.max(0, (new Date() - new Date(desde)) / (365.25 * 86400000));
  const preaviso = (sal, desde) => {
    const a = aniosS(desde);
    if (a < 3) return sal;
    if (a < 6) return sal * 2;
    if (a < 10) return sal * 3;
    return sal * 4;
  };
  const cesantia = (sal, desde) => {
    const a = aniosS(desde);
    if (a < 1) return 0;
    const dias = Math.min(a, 7) * 30;
    return sal / 30 * dias;
  };
  const vacaciones = (sal, desde) => {
    const a = aniosS(desde);
    if (a < 1) return 0;
    const dias = a < 2 ? 10 : a < 5 ? 12 : a < 10 ? 15 : 20;
    return sal / 30 * dias;
  };
  const totP = active.reduce((s, e) => s + preaviso(e.sal, e.since), 0);
  const totC = active.reduce((s, e) => s + cesantia(e.sal, e.since), 0);
  const totV = active.reduce((s, e) => s + vacaciones(e.sal, e.since), 0);
  const doExport = () => exportXLSX([{
    name: "Prestaciones",
    data: [["Empleado", "Puesto", "Desde", "Años", "Preaviso", "Cesantía", "Vacaciones", "Total Pasivo"], ...active.map(e => [e.name, e.pos, e.since, aniosS(e.since).toFixed(1), preaviso(e.sal, e.since).toFixed(2), cesantia(e.sal, e.since).toFixed(2), vacaciones(e.sal, e.since).toFixed(2), (preaviso(e.sal, e.since) + cesantia(e.sal, e.since) + vacaciones(e.sal, e.since)).toFixed(2)])]
  }], "Prestaciones.xlsx");
  return /*#__PURE__*/React.createElement(Page, {
    title: "Provisi\xF3n de Prestaciones",
    sub: "Preaviso \xB7 Cesant\xEDa \xB7 Vacaciones \u2014 C\xF3digo del Trabajo Honduras",
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Exportar Excel")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.warning}12`,
      border: `1px solid ${T.warning}30`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 13
    }
  }, "\u2696\uFE0F ", /*#__PURE__*/React.createElement("strong", null, "Pasivo laboral acumulado."), " Estos fondos son obligaciones reales aunque no se hayan desembolsado. Se recomienda provisionarlos mensualmente para evitar problemas de flujo al momento de una liquidaci\xF3n."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCC5",
    label: "Preaviso",
    value: L(totP),
    sub: "Obligaci\xF3n por terminaci\xF3n",
    color: T.warning
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCB0",
    label: "Cesant\xEDa",
    value: L(totC),
    sub: "Auxilio de cesant\xEDa",
    color: T.danger
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83C\uDFD6\uFE0F",
    label: "Vacaciones",
    value: L(totV),
    sub: "D\xEDas acumulados",
    color: T.info
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\u2696\uFE0F",
    label: "Total Pasivo Laboral",
    value: L(totP + totC + totV),
    sub: "Provisi\xF3n recomendada",
    color: T.espresso
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Empleado", "Desde", "Años", "Preaviso", "Cesantía", "Vacaciones", "Total Pasivo", "Prov./Mes"]
  }), /*#__PURE__*/React.createElement("tbody", null, active.map((e, idx) => {
    const a = aniosS(e.since),
      pr = preaviso(e.sal, e.since),
      ce = cesantia(e.sal, e.since),
      va = vacaciones(e.sal, e.since),
      tot = pr + ce + va;
    return /*#__PURE__*/React.createElement("tr", {
      key: e.id,
      style: {
        borderBottom: `1px solid ${T.steam}`,
        background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        fontWeight: 600
      }
    }, e.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontSize: 11
      }
    }, e.since), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        textAlign: "center"
      }
    }, a.toFixed(1)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.warning
      }
    }, L(pr)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.danger
      }
    }, L(ce)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.info
      }
    }, L(va)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        fontWeight: 700
      }
    }, L(tot)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "8px 12px",
        ...mono,
        color: T.muted
      }
    }, L(tot / 12)));
  }), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: 3,
    style: {
      padding: "9px 12px",
      color: T.gold,
      fontWeight: 700
    }
  }, "TOTALES"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, L(totP)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#EA8A8A",
      fontWeight: 700
    }
  }, L(totC)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#A8D8EA",
      fontWeight: 700
    }
  }, L(totV)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700,
      fontSize: 14
    }
  }, L(totP + totC + totV)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 12px",
      ...mono,
      color: "#EAB87A",
      fontWeight: 700
    }
  }, L((totP + totC + totV) / 12))))))));
}

// ── RECEPCIÓN DE MERCADERÍA ─────────────────────────────────────
function RecepcionMercaderia({
  suppliers,
  inventory,
  setInventory,
  setCxpExtra
}) {
  const [addM, setAddM] = useState(false);
  const [recepciones, setRecepciones] = useState([]);
  const [form, setForm] = useState({
    proveedor: "",
    fecha: today(),
    items: [{
      insumo: "",
      cantidad: "",
      costoUnit: ""
    }],
    factura: "",
    observaciones: ""
  });
  const addItem = () => setForm(p => ({
    ...p,
    items: [...p.items, {
      insumo: "",
      cantidad: "",
      costoUnit: ""
    }]
  }));
  const updItem = (idx, k, v) => setForm(p => ({
    ...p,
    items: p.items.map((it, i) => i === idx ? {
      ...it,
      [k]: v
    } : it)
  }));
  const remItem = idx => setForm(p => ({
    ...p,
    items: p.items.filter((_, i) => i !== idx)
  }));
  const total = form.items.reduce((s, it) => s + (parseFloat(it.cantidad) || 0) * (parseFloat(it.costoUnit) || 0), 0);
  const confirmar = () => {
    if (!form.proveedor || !form.items[0].insumo) return;
    // Update inventory
    form.items.forEach(it => {
      if (!it.insumo || !it.cantidad) return;
      setInventory(prev => prev.map(i => i.name === it.insumo ? {
        ...i,
        stock: i.stock + (parseFloat(it.cantidad) || 0)
      } : i));
    });
    setRecepciones(p => [{
      id: Date.now(),
      proveedor: form.proveedor,
      fecha: form.fecha,
      items: [...form.items],
      total,
      factura: form.factura,
      status: "confirmada"
    }, ...p]);
    setAddM(false);
    setForm({
      proveedor: "",
      fecha: today(),
      items: [{
        insumo: "",
        cantidad: "",
        costoUnit: ""
      }],
      factura: "",
      observaciones: ""
    });
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Recepci\xF3n de Mercader\xEDa",
    sub: "Ingreso de pedidos \xB7 Actualiza inventario y genera CxP autom\xE1ticamente",
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Nueva Recepci\xF3n")
  }, recepciones.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      textAlign: "center",
      padding: 40,
      color: T.muted
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("p", null, "Registra la llegada de mercader\xEDa de tus proveedores.")), recepciones.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Fecha", "Proveedor", "N° Factura", "Ítems", "Total", "Estado"]
  }), /*#__PURE__*/React.createElement("tbody", null, recepciones.map((r, idx) => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono
    }
  }, r.fecha), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      fontWeight: 600
    }
  }, r.proveedor), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontSize: 12
    }
  }, r.factura || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      color: T.muted
    }
  }, r.items.length, " productos"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontWeight: 700,
      color: T.caramel
    }
  }, L(r.total)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", T.success)
  }, "\u2713 Confirmada")))))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 560
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 16px"
    }
  }, "Nueva Recepci\xF3n de Mercader\xEDa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "PROVEEDOR"), /*#__PURE__*/React.createElement("select", {
    value: form.proveedor,
    onChange: e => setForm(p => ({
      ...p,
      proveedor: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar..."), suppliers.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.name
  }, s.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "FECHA"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.fecha,
    onChange: e => setForm(p => ({
      ...p,
      fecha: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "N\xB0 FACTURA DEL PROVEEDOR"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.factura,
    onChange: e => setForm(p => ({
      ...p,
      factura: e.target.value
    })),
    placeholder: "FAC-000123",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "PRODUCTOS RECIBIDOS"), form.items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 30px",
      gap: 6,
      marginBottom: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: it.insumo,
    onChange: e => updItem(idx, "insumo", e.target.value),
    style: {
      ...inp(),
      paddingRight: 20,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Insumo..."), inventory.map(i => /*#__PURE__*/React.createElement("option", {
    key: i.id,
    value: i.name
  }, i.name))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: it.cantidad,
    onChange: e => updItem(idx, "cantidad", e.target.value),
    placeholder: "Cantidad",
    style: {
      ...inp(),
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: it.costoUnit,
    onChange: e => updItem(idx, "costoUnit", e.target.value),
    placeholder: "Costo/u",
    style: {
      ...inp(),
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => remItem(idx),
    style: {
      background: "none",
      border: "none",
      color: T.danger,
      cursor: "pointer",
      fontSize: 16
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    small: true,
    onClick: addItem
  }, "+ Agregar producto")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 14,
      padding: "8px 4px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total del pedido"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.success}12`,
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 14,
      fontSize: 12,
      color: T.success
    }
  }, "\u2713 Al confirmar, se actualizar\xE1 el inventario autom\xE1ticamente y se registrar\xE1 la CxP con el proveedor."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: confirmar,
    style: {
      flex: 2
    }
  }, "\u2713 Confirmar Recepci\xF3n"))));
}

// ── ENCUESTA SATISFACCIÓN QR ────────────────────────────────────
function EncuestaQR({
  encuestas,
  setEncuestas
}) {
  const [simM, setSimM] = useState(false);
  const [resp, setResp] = useState({
    mesa: "",
    calificacion: 5,
    comentario: "",
    categoria: "servicio"
  });
  const promedios = {
    general: encuestas.length ? encuestas.reduce((s, e) => s + e.calificacion, 0) / encuestas.length : 0
  };
  const SEED = [{
    id: 1,
    fecha: today(),
    mesa: "Mesa 3",
    calificacion: 5,
    comentario: "Excelente café y muy buen servicio",
    categoria: "producto"
  }, {
    id: 2,
    fecha: today(),
    mesa: "Mesa 1",
    calificacion: 4,
    comentario: "El ambiente es agradable",
    categoria: "ambiente"
  }, {
    id: 3,
    fecha: today(),
    mesa: "Mesa 5",
    calificacion: 5,
    comentario: "El barista es muy atento",
    categoria: "servicio"
  }];
  const todas = [...encuestas, ...(encuestas.length === 0 ? SEED : [])];
  const prom = todas.length ? todas.reduce((s, e) => s + e.calificacion, 0) / todas.length : 0;
  const dist = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  todas.forEach(e => dist[e.calificacion] = (dist[e.calificacion] || 0) + 1);
  const simular = () => {
    setEncuestas(p => [{
      id: Date.now(),
      fecha: today(),
      mesa: resp.mesa || "Mesa " + Math.ceil(Math.random() * 8),
      calificacion: parseInt(resp.calificacion),
      comentario: resp.comentario,
      categoria: resp.categoria
    }, ...p]);
    setSimM(false);
    setResp({
      mesa: "",
      calificacion: 5,
      comentario: "",
      categoria: "servicio"
    });
  };
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("https://cafefinanzas.hn/encuesta")}`;
  return /*#__PURE__*/React.createElement(Page, {
    title: "Encuesta de Satisfacci\xF3n QR",
    sub: `${todas.length} respuestas · Promedio: ${prom.toFixed(1)}/5 ⭐`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "outline",
      onClick: () => setSimM(true)
    }, "\u270D\uFE0F Simular Respuesta")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: card({
      textAlign: "center"
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 14px"
    }
  }, "\uD83D\uDCF1 C\xF3digo QR para Mesas"), /*#__PURE__*/React.createElement("img", {
    src: qrUrl,
    alt: "QR Encuesta",
    style: {
      width: 160,
      height: 160,
      borderRadius: 10,
      marginBottom: 12
    },
    onError: e => {
      e.target.style.display = "none";
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 10,
      padding: 12,
      fontSize: 12,
      color: T.muted,
      marginBottom: 12
    }
  }, "Imprime y coloca en cada mesa. El cliente escanea y responde en 3 clics."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 11,
      color: T.muted,
      wordBreak: "break-all"
    }
  }, "cafefinanzas.hn/encuesta")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 12
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: T.gold,
      ...mono
    }
  }, prom.toFixed(1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, "Promedio general")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: T.success,
      ...mono
    }
  }, todas.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, "Respuestas totales")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: T.caramel,
      ...mono
    }
  }, pct(todas.filter(e => e.calificacion >= 4).length / Math.max(todas.length, 1) * 100)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, "Satisfacci\xF3n (4-5\u2B50)")))), /*#__PURE__*/React.createElement("div", {
    style: card()
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      margin: "0 0 12px"
    }
  }, "Distribuci\xF3n de calificaciones"), [5, 4, 3, 2, 1].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      minWidth: 30
    }
  }, n, "\u2B50"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    val: dist[n] || 0,
    max: todas.length || 1,
    color: n >= 4 ? T.success : n === 3 ? T.warning : T.danger
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 12,
      minWidth: 30,
      textAlign: "right"
    }
  }, dist[n] || 0)))))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${T.steam}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 16,
      margin: 0
    }
  }, "\xDAltimas Respuestas")), todas.slice(0, 15).map((e, idx) => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      padding: "12px 16px",
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, e.mesa), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", e.calificacion >= 4 ? T.success : e.calificacion === 3 ? T.warning : T.danger)
  }, e.calificacion, "\u2B50"), /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.latte)
  }, e.categoria)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      fontSize: 11,
      color: T.muted
    }
  }, e.fecha)), e.comentario && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: T.muted,
      fontStyle: "italic"
    }
  }, "\"", e.comentario, "\"")))), simM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setSimM(false),
    width: 380
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Simular Respuesta de Cliente"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "CALIFICACI\xD3N"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setResp(p => ({
      ...p,
      calificacion: n
    })),
    style: {
      flex: 1,
      padding: "12px 0",
      borderRadius: 8,
      border: `2px solid ${resp.calificacion === n ? T.gold : T.latte}`,
      background: resp.calificacion === n ? `${T.gold}20` : "#fff",
      cursor: "pointer",
      fontSize: 20
    }
  }, "⭐".repeat(n)[n - 1] || "⭐")))), [["Mesa", "text", "mesa", "Mesa 3"], ["Categoría", "select", "categoria", ""], ["Comentario", "text", "comentario", "Excelente atención..."]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), t === "select" ? /*#__PURE__*/React.createElement("select", {
    value: resp[k],
    onChange: e => setResp(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, [["servicio", "Servicio"], ["producto", "Producto/Bebida"], ["ambiente", "Ambiente"], ["precio", "Precio"], ["limpieza", "Limpieza"]].map(([v, lv]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v
  }, lv))) : /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: resp[k],
    onChange: e => setResp(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setSimM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: simular,
    style: {
      flex: 2
    }
  }, "Enviar Respuesta"))));
}

// ── MULTI-SUCURSAL ──────────────────────────────────────────────
function MultiSucursal({
  sucursales,
  setSucursales
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "San Pedro Sula",
    encargado: "",
    telefono: "",
    estado: "activa"
  });
  const save = () => {
    if (!form.nombre) return;
    setSucursales(p => [...p, {
      id: Date.now(),
      ...form,
      ventas: 0,
      empleados: 0,
      fechaApertura: today()
    }]);
    setAddM(false);
    setForm({
      nombre: "",
      direccion: "",
      ciudad: "San Pedro Sula",
      encargado: "",
      telefono: "",
      estado: "activa"
    });
  };
  const DEMO_SEDES = [{
    id: 0,
    nombre: "Sede Principal",
    direccion: "Col. Trejo, Blvd. Morazán",
    ciudad: "San Pedro Sula",
    encargado: "Constantino Colindres",
    telefono: "+504 9XXX-XXXX",
    estado: "activa",
    ventas: 612400,
    empleados: 11,
    fechaApertura: "2024-01-01"
  }];
  const todas = [...DEMO_SEDES, ...sucursales];
  return /*#__PURE__*/React.createElement(Page, {
    title: "Multi-Sucursal",
    sub: `${todas.length} ubicaciones · ${todas.filter(s => s.estado === "activa").length} activas`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Nueva Sucursal")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${T.info}12`,
      border: `1px solid ${T.info}30`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 16,
      fontSize: 13,
      color: T.info
    }
  }, "\uD83C\uDFE2 M\xF3dulo multi-sucursal listo para crecer. Cada sucursal tendr\xE1 su propio POS, inventario y reportes, con vista consolidada en el dashboard del administrador principal."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
      gap: 14
    }
  }, todas.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: card({
      borderLeft: `4px solid ${s.estado === "activa" ? T.success : T.muted}`
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 4px"
    }
  }, s.nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: T.muted
    }
  }, "\uD83D\uDCCD ", s.ciudad)), /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", s.estado === "activa" ? T.success : T.muted)
  }, s.estado)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      marginBottom: 8,
      color: T.muted
    }
  }, s.direccion), [["Encargado", s.encargado], ["Teléfono", s.telefono], ["Desde", s.fechaApertura], ["Empleados", `${s.empleados}`]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted
    }
  }, l), /*#__PURE__*/React.createElement("strong", null, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${T.latte}`,
      marginTop: 10,
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, "Ventas del Mes"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(s.ventas)))), s.id === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg(T.espresso, T.gold)
  }, "\u2B50 Sede Principal"))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 440
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nueva Sucursal"), [["Nombre de la sucursal", "text", "nombre", "Sucursal Altia"], ["Dirección", "text", "direccion", "Blvd. del Norte..."], ["Ciudad", "text", "ciudad", "San Pedro Sula"], ["Encargado", "text", "encargado", ""], ["Teléfono", "tel", "telefono", "+504 9XXX-XXXX"]].map(([l, t, k, ph]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, l.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    type: t,
    placeholder: ph,
    value: form[k],
    onChange: e => setForm(p => ({
      ...p,
      [k]: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: save,
    style: {
      flex: 2
    }
  }, "Crear Sucursal"))));
}

// ── PRESUPUESTO ANUAL (sugerencia extra) ────────────────────────
function PresupuestoAnual({
  employees
}) {
  const nomMes = employees.filter(e => e.active).reduce((s, e) => s + nomina(e.sal).costo, 0);
  const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const [presupuesto, setPresupuesto] = useState({
    ventas: [558000, 580000, 620000, 650000, 680000, 720000, 710000, 755000, 780000, 800000, 820000, 850000],
    costoVar: [0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30],
    otrosGastos: [85000, 85000, 85000, 88000, 90000, 92000, 91000, 95000, 95000, 98000, 98000, 100000]
  });
  const [edit, setEdit] = useState(null);
  const [val, setVal] = useState("");
  const rows = MESES.map((m, i) => {
    const v = presupuesto.ventas[i],
      cv = v * presupuesto.costoVar[i],
      otros = presupuesto.otrosGastos[i],
      neto = v - cv - nomMes - otros;
    return {
      m,
      v,
      cv,
      nom: nomMes,
      otros,
      neto,
      mg: v > 0 ? neto / v * 100 : 0
    };
  });
  const totV = rows.reduce((s, r) => s + r.v, 0),
    totNeto = rows.reduce((s, r) => s + r.neto, 0);
  const maxV = Math.max(...rows.map(r => r.v));
  const doExport = () => exportXLSX([{
    name: "Presupuesto 2026",
    data: [["Mes", "Ingresos", "Costos Var.", "Nómina", "Otros Gastos", "Utilidad Neta", "Margen %"], ...rows.map(r => [r.m, r.v, r.cv, r.nom, r.otros, r.neto, `${r.mg.toFixed(1)}%`]), ["", "", "", "", "", "", ""], ["TOTAL ANUAL", totV, "", "", "", totNeto, ""]]
  }], "Presupuesto_2026.xlsx");
  const saveEdit = () => {
    if (!edit) return;
    const idx = MESES.indexOf(edit.mes);
    if (idx < 0) return;
    const n = parseFloat(val) || 0;
    setPresupuesto(p => ({
      ...p,
      [edit.campo]: p[edit.campo].map((v, i) => i === idx ? n : v)
    }));
    setEdit(null);
  };
  return /*#__PURE__*/React.createElement(Page, {
    title: "Presupuesto Anual 2026",
    sub: `Total proyectado: ${L(totV)} · Utilidad anual: ${L(totNeto)}`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "success",
      onClick: doExport
    }, "\uD83D\uDCCA Exportar Excel")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCC8",
    label: "Ingresos Anuales",
    value: L(totV),
    sub: "Proyecci\xF3n 12 meses",
    color: T.success
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDCA1",
    label: "Utilidad Anual",
    value: L(totNeto),
    sub: `Margen: ${pct(totNeto / totV * 100)}`,
    color: T.caramel
  }), /*#__PURE__*/React.createElement(KPI, {
    icon: "\uD83D\uDC65",
    label: "N\xF3mina Anual",
    value: L(nomMes * 12),
    sub: "Costo patronal total",
    color: T.espresso
  })), /*#__PURE__*/React.createElement("div", {
    style: card({
      marginBottom: 14
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 17,
      margin: "0 0 16px"
    }
  }, "Ingresos Proyectados 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      height: 120
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      fontSize: 8,
      color: T.muted
    }
  }, (r.v / 1000).toFixed(0), "k"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      borderRadius: "3px 3px 0 0",
      background: r.neto >= 0 ? T.caramel : `${T.danger}BB`,
      height: `${r.v / maxV * 110}px`,
      minHeight: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: T.muted
    }
  }, r.m))))), /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["Mes", "Ingresos", "Costos Var.", "Nómina Patr.", "Otros Gastos", "Utilidad Neta", "Margen", "Editar"]
  }), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      fontWeight: 600
    }
  }, r.m), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.success,
      fontWeight: 600
    }
  }, L(r.v)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.danger
    }
  }, L(r.cv)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.danger
    }
  }, L(r.nom)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      color: T.danger
    }
  }, L(r.otros)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px",
      ...mono,
      fontWeight: 700,
      color: r.neto >= 0 ? T.success : T.danger
    }
  }, L(r.neto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", r.mg > 35 ? T.success : r.mg > 20 ? T.warning : T.danger)
  }, pct(r.mg))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "7px 12px"
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => {
      setEdit({
        mes: r.m,
        campo: "ventas"
      });
      setVal(String(r.v));
    }
  }, "\u270F\uFE0F")))), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: T.espresso
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      color: T.gold,
      fontWeight: 700
    }
  }, "ANUAL"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: T.gold,
      fontWeight: 700
    }
  }, L(totV)), /*#__PURE__*/React.createElement("td", {
    colSpan: 3
  }), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "8px 12px",
      ...mono,
      color: totNeto >= 0 ? "#7AEA9A" : "#EA8A8A",
      fontWeight: 700,
      fontSize: 14
    }
  }, L(totNeto)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", T.success)
  }, pct(totNeto / totV * 100))), /*#__PURE__*/React.createElement("td", null)))))), edit && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setEdit(null)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 18,
      margin: "0 0 6px"
    }
  }, edit.mes, " \u2014 Editar Ingresos"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: T.muted,
      fontSize: 13,
      margin: "0 0 14px"
    }
  }, "Ingresa el monto proyectado de ventas para ", edit.mes, ":"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: val,
    onChange: e => setVal(e.target.value),
    style: {
      ...inp(),
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setEdit(null),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: saveEdit,
    style: {
      flex: 1
    }
  }, "Guardar"))));
}

// ── ÓRDENES DE COMPRA (sugerencia extra) ────────────────────────
function OrdenesCompra({
  suppliers,
  inventory,
  ordenes,
  setOrdenes
}) {
  const [addM, setAddM] = useState(false);
  const [form, setForm] = useState({
    proveedor: "",
    fechaEntrega: "",
    items: [{
      insumo: "",
      cantidad: "",
      costoUnit: ""
    }],
    notas: ""
  });
  const addItem = () => setForm(p => ({
    ...p,
    items: [...p.items, {
      insumo: "",
      cantidad: "",
      costoUnit: ""
    }]
  }));
  const updItem = (idx, k, v) => setForm(p => ({
    ...p,
    items: p.items.map((it, i) => i === idx ? {
      ...it,
      [k]: v
    } : it)
  }));
  const remItem = idx => setForm(p => ({
    ...p,
    items: p.items.filter((_, i) => i !== idx)
  }));
  const total = form.items.reduce((s, it) => s + (parseFloat(it.cantidad) || 0) * (parseFloat(it.costoUnit) || 0), 0);
  const crear = () => {
    if (!form.proveedor) return;
    setOrdenes(p => [{
      id: Date.now(),
      num: `OC-${String(p.length + 1).padStart(4, "0")}`,
      proveedor: form.proveedor,
      fechaEmision: today(),
      fechaEntrega: form.fechaEntrega,
      items: [...form.items],
      total,
      notas: form.notas,
      status: "pendiente"
    }, ...p]);
    setAddM(false);
    setForm({
      proveedor: "",
      fechaEntrega: "",
      items: [{
        insumo: "",
        cantidad: "",
        costoUnit: ""
      }],
      notas: ""
    });
  };
  const statusColor = {
    pendiente: T.warning,
    enviada: T.info,
    recibida: T.success,
    cancelada: T.muted
  };
  const avanzar = id => setOrdenes(p => p.map(o => o.id === id ? {
    ...o,
    status: o.status === "pendiente" ? "enviada" : o.status === "enviada" ? "recibida" : o.status
  } : o));
  return /*#__PURE__*/React.createElement(Page, {
    title: "\xD3rdenes de Compra",
    sub: `${ordenes.length} órdenes · ${ordenes.filter(o => o.status === "pendiente").length} pendientes`,
    actions: /*#__PURE__*/React.createElement(Btn, {
      v: "primary",
      onClick: () => setAddM(true)
    }, "+ Nueva Orden")
  }, ordenes.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      textAlign: "center",
      padding: 40,
      color: T.muted
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83D\uDED2"), /*#__PURE__*/React.createElement("p", null, "Crea \xF3rdenes de compra para tus proveedores y controla el ciclo compra \u2192 recepci\xF3n.")), ordenes.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: card({
      padding: 0,
      overflow: "hidden"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(THead, {
    cols: ["# Orden", "Proveedor", "Emitida", "Entrega Esperada", "Total", "Estado", "Acción"]
  }), /*#__PURE__*/React.createElement("tbody", null, ordenes.map((o, idx) => /*#__PURE__*/React.createElement("tr", {
    key: o.id,
    style: {
      borderBottom: `1px solid ${T.steam}`,
      background: idx % 2 === 0 ? "#fff" : `${T.steam}55`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontWeight: 700,
      color: T.caramel
    }
  }, o.num), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      fontWeight: 600
    }
  }, o.proveedor), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontSize: 12
    }
  }, o.fechaEmision), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontSize: 12
    }
  }, o.fechaEntrega || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px",
      ...mono,
      fontWeight: 700
    }
  }, L(o.total)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: bdg("#fff", statusColor[o.status])
  }, o.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "9px 14px"
    }
  }, o.status !== "recibida" && o.status !== "cancelada" && /*#__PURE__*/React.createElement(Btn, {
    v: "outline",
    small: true,
    onClick: () => avanzar(o.id)
  }, o.status === "pendiente" ? "→ Enviada" : "→ Recibida")))))))), addM && /*#__PURE__*/React.createElement(Modal, {
    onClose: () => setAddM(false),
    width: 540
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      margin: "0 0 14px"
    }
  }, "Nueva Orden de Compra"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "PROVEEDOR"), /*#__PURE__*/React.createElement("select", {
    value: form.proveedor,
    onChange: e => setForm(p => ({
      ...p,
      proveedor: e.target.value
    })),
    style: {
      ...inp(),
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar..."), suppliers.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.name
  }, s.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "FECHA DE ENTREGA ESPERADA"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.fechaEntrega,
    onChange: e => setForm(p => ({
      ...p,
      fechaEntrega: e.target.value
    })),
    style: inp()
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.steam,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "PRODUCTOS A ORDENAR"), form.items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 30px",
      gap: 6,
      marginBottom: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: it.insumo,
    onChange: e => updItem(idx, "insumo", e.target.value),
    style: {
      ...inp(),
      paddingRight: 20,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Insumo..."), inventory.map(i => /*#__PURE__*/React.createElement("option", {
    key: i.id,
    value: i.name
  }, i.name))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: it.cantidad,
    onChange: e => updItem(idx, "cantidad", e.target.value),
    placeholder: "Cant.",
    style: {
      ...inp(),
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: it.costoUnit,
    onChange: e => updItem(idx, "costoUnit", e.target.value),
    placeholder: "Costo/u",
    style: {
      ...inp(),
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => remItem(idx),
    style: {
      background: "none",
      border: "none",
      color: T.danger,
      cursor: "pointer",
      fontSize: 16
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    small: true,
    onClick: addItem
  }, "+ Agregar producto")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      color: T.muted,
      fontWeight: 700,
      display: "block",
      marginBottom: 4
    }
  }, "NOTAS"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.notas,
    onChange: e => setForm(p => ({
      ...p,
      notas: e.target.value
    })),
    placeholder: "Instrucciones al proveedor...",
    style: inp()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 700,
      fontSize: 15,
      margin: "8px 0 12px",
      padding: "8px 4px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total de la orden"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono,
      color: T.caramel
    }
  }, L(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    v: "ghost",
    onClick: () => setAddM(false),
    style: {
      flex: 1
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement(Btn, {
    v: "primary",
    onClick: crear,
    style: {
      flex: 2
    }
  }, "Crear Orden"))));
}

// ── MAIN APP v4 ─────────────────────────────────────────────────
const ROLES_V4 = {
  admin: {
    label: "Administrador",
    color: "#D4A853",
    modules: ["dashboard", "pos", "comandas", "caja", "turnos", "inventario", "recetas", "nomina", "proveedores", "cxc", "gastos", "flujo", "reportes", "activos", "rentabilidad", "metas", "alertas", "descuentos", "fidelidad", "mermas", "calendario", "libroventas", "aguinaldo", "prestaciones", "recepcion", "encuesta", "sucursales", "presupuesto", "ordenes", "productos", "usuarios", "config"]
  },
  gerente: {
    label: "Gerente",
    color: "#C8841A",
    modules: ["dashboard", "inventario", "recetas", "nomina", "proveedores", "cxc", "gastos", "flujo", "reportes", "activos", "rentabilidad", "metas", "descuentos", "fidelidad", "mermas", "calendario", "libroventas", "aguinaldo", "prestaciones", "recepcion", "presupuesto", "ordenes", "productos"]
  },
  cajero: {
    label: "Cajero / Barista",
    color: "#5A8A6A",
    modules: ["pos", "comandas", "caja", "encuesta"]
  },
  contador: {
    label: "Contador Externo",
    color: "#4A6A8A",
    modules: ["reportes", "nomina", "flujo", "gastos", "activos", "libroventas", "aguinaldo", "prestaciones"]
  }
};
const MODS_V4 = [{
  id: "dashboard",
  icon: "📊",
  label: "Dashboard"
}, {
  id: "pos",
  icon: "🛒",
  label: "Punto de Venta"
}, {
  id: "comandas",
  icon: "📝",
  label: "Órdenes de Mesa"
}, {
  id: "caja",
  icon: "🏦",
  label: "Cierre de Caja"
}, {
  id: "turnos",
  icon: "🔄",
  label: "Turnos"
}, {
  id: "inventario",
  icon: "📦",
  label: "Inventario"
}, {
  id: "recetas",
  icon: "📋",
  label: "Fichas / Recetas"
}, {
  id: "nomina",
  icon: "👥",
  label: "Nómina"
}, {
  id: "proveedores",
  icon: "🏪",
  label: "Proveedores"
}, {
  id: "cxc",
  icon: "💼",
  label: "Cuentas por Cobrar"
}, {
  id: "gastos",
  icon: "🧾",
  label: "Gastos Operativos"
}, {
  id: "flujo",
  icon: "💰",
  label: "Flujo de Caja"
}, {
  id: "reportes",
  icon: "📄",
  label: "Reportes SAR"
}, {
  id: "activos",
  icon: "🏗️",
  label: "Activos / Dep."
}, {
  id: "rentabilidad",
  icon: "📈",
  label: "Rentabilidad"
}, {
  id: "metas",
  icon: "🎯",
  label: "Metas vs Real"
}, {
  id: "alertas",
  icon: "🔔",
  label: "Alertas WhatsApp"
}, {
  id: "descuentos",
  icon: "🎁",
  label: "Descuentos"
}, {
  id: "fidelidad",
  icon: "⭐",
  label: "Fidelidad"
}, {
  id: "mermas",
  icon: "📉",
  label: "Mermas"
}, {
  id: "calendario",
  icon: "📅",
  label: "Calendario Pagos"
}, {
  id: "libroventas",
  icon: "📋",
  label: "Libro Ventas SAR"
}, {
  id: "aguinaldo",
  icon: "🎄",
  label: "Aguinaldo / 14°"
}, {
  id: "prestaciones",
  icon: "⚖️",
  label: "Prestaciones"
}, {
  id: "recepcion",
  icon: "📦",
  label: "Recepción Merca."
}, {
  id: "encuesta",
  icon: "😊",
  label: "Encuesta QR"
}, {
  id: "sucursales",
  icon: "🏢",
  label: "Multi-Sucursal"
}, {
  id: "presupuesto",
  icon: "💹",
  label: "Presupuesto Anual"
}, {
  id: "ordenes",
  icon: "🛒",
  label: "Órdenes de Compra"
}, {
  id: "productos",
  icon: "🛍️",
  label: "Productos"
}, {
  id: "usuarios",
  icon: "👤",
  label: "Usuarios"
}, {
  id: "config",
  icon: "⚙️",
  label: "Configuración"
}];

// Override shared refs with v4 roles and modules
Object.assign(ROLES_DEF, ROLES_V4);
MODS_ALL.length = 0;
MODS_V4.forEach(m => MODS_ALL.push(m));
function SidebarV4({
  user,
  active,
  onNav,
  onLogout
}) {
  const isMob = typeof window !== 'undefined' && window.innerWidth < 640;
  const [col, setCol] = useState(isMob ? true : false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rc = ROLES_V4[user.role]?.color || T.gold;
  const allowed = ROLES_V4[user.role]?.modules || [];
  const handleNav = (id) => { onNav(id); if(isMob) setMobileOpen(false); };

  if(isMob) return /*#__PURE__*/React.createElement(React.Fragment, null,
    /*#__PURE__*/React.createElement("div", {
      style: {width:54, minHeight:"100vh", background:T.espresso, display:"flex", flexDirection:"column", flexShrink:0}
    },
      /*#__PURE__*/React.createElement("div", {
        onClick: () => setMobileOpen(true),
        style: {padding:"14px 0", textAlign:"center", cursor:"pointer", borderBottom:`1px solid #2e1200`}
      },
        /*#__PURE__*/React.createElement("img", {src: typeof window!=="undefined" && window.LOGO_DATA ? window.LOGO_DATA : "", style:{width:32,height:"auto",borderRadius:4,display:"block",margin:"0 auto 4px"}, alt:"logo"}),
        /*#__PURE__*/React.createElement("span", {style:{color:T.gold,fontSize:18}}, "☰")
      ),
      /*#__PURE__*/React.createElement("nav", {style:{flex:1, padding:"6px 4px", overflowY:"auto"}},
        MODS_ALL.filter(m=>allowed.includes(m.id)).map(m =>
          /*#__PURE__*/React.createElement("div", {
            key: m.id,
            onClick: () => handleNav(m.id),
            title: m.label,
            style: {
              display:"flex", alignItems:"center", justifyContent:"center",
              padding:"10px 0", borderRadius:7, cursor:"pointer", marginBottom:1,
              background: active===m.id ? `${T.caramel}28` : "transparent",
              borderLeft: active===m.id ? `3px solid ${T.caramel}` : "3px solid transparent"
            }
          }, /*#__PURE__*/React.createElement("span", {style:{fontSize:16}}, m.icon))
        )
      ),
      /*#__PURE__*/React.createElement("div", {style:{padding:"6px 4px", borderTop:`1px solid #2e1200`}},
        /*#__PURE__*/React.createElement("div", {
          onClick: onLogout,
          title: "Cerrar Sesión",
          style: {
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"10px 0", borderRadius:8, cursor:"pointer",
            background:"rgba(176,48,48,.15)", margin:"4px 2px"
          }
        }, /*#__PURE__*/React.createElement("span", {style:{fontSize:18}}, "🚪"))
      )
    ),
    mobileOpen && /*#__PURE__*/React.createElement("div", {
      style: {position:"fixed",inset:0,zIndex:1000,display:"flex"}
    },
      /*#__PURE__*/React.createElement("div", {
        onClick: () => setMobileOpen(false),
        style: {position:"absolute",inset:0,background:"rgba(0,0,0,.5)"}
      }),
      /*#__PURE__*/React.createElement("div", {
        style: {position:"relative",width:220,background:T.espresso,display:"flex",flexDirection:"column",height:"100%",overflowY:"auto"}
      },
        /*#__PURE__*/React.createElement("div", {style:{padding:"12px 14px",borderBottom:`1px solid #2e1200`,display:"flex",alignItems:"center",gap:8,justifyContent:"space-between"}},
          /*#__PURE__*/React.createElement("span", {style:{fontFamily:"'Playfair Display',serif",color:T.gold,fontSize:14,fontWeight:700}}, "CaféFinanzas"),
          /*#__PURE__*/React.createElement("button", {
            onClick: () => setMobileOpen(false),
            style:{background:"none",border:"none",color:T.muted,fontSize:20,cursor:"pointer",lineHeight:1}
          }, "×")
        ),
        /*#__PURE__*/React.createElement("div", {style:{padding:"8px 14px 4px",borderBottom:`1px solid #2e1200`}},
          /*#__PURE__*/React.createElement("div", {style:{display:"flex",alignItems:"center",gap:6}}),
          /*#__PURE__*/React.createElement("div", {style:{color:T.cream,fontSize:12,fontWeight:600}}),
          /*#__PURE__*/React.createElement("div", {style:{color:T.cream,fontSize:13,fontWeight:600}}, user.name)
        ),
        /*#__PURE__*/React.createElement("nav", {style:{flex:1,padding:"6px 4px",overflowY:"auto"}},
          MODS_ALL.filter(m=>allowed.includes(m.id)).map(m =>
            /*#__PURE__*/React.createElement("div", {
              key: m.id,
              onClick: () => handleNav(m.id),
              style: {
                display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:7,cursor:"pointer",marginBottom:1,
                background: active===m.id ? `${T.caramel}28` : "transparent",
                borderLeft: active===m.id ? `3px solid ${T.caramel}` : "3px solid transparent"
              }
            },
              /*#__PURE__*/React.createElement("span", {style:{fontSize:14}}, m.icon),
              /*#__PURE__*/React.createElement("span", {style:{color:active===m.id?T.gold:T.latte,fontSize:13,fontWeight:active===m.id?600:400}}, m.label)
            )
          )
        ),
        /*#__PURE__*/React.createElement("div", {style:{padding:"10px 12px",borderTop:`1px solid #2e1200`}},

          /*#__PURE__*/React.createElement("div", {
            onClick: onLogout,
            style:{
              display:"flex", alignItems:"center", gap:10,
              padding:"12px 16px", borderRadius:10, cursor:"pointer",
              background:"rgba(176,48,48,.2)", border:"1px solid rgba(176,48,48,.3)"
            }
          },
            /*#__PURE__*/React.createElement("span", {style:{fontSize:18}}, "🚪"),
            /*#__PURE__*/React.createElement("span", {style:{color:"#EA8A8A", fontSize:14, fontWeight:700}}, "Cerrar Sesión")
          )
        )
      )
    )
  );

  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: col ? 54 : 210,
      minHeight: "100vh",
      background: T.espresso,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      transition: "width .2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: col ? "12px 8px" : "12px 14px",
      borderBottom: `1px solid #2e1200`
    }
  }, col ? /*#__PURE__*/React.createElement("img", {
    src: "data:image/jpeg;base64,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",
    style: {
      width: 28,
      height: "auto",
      borderRadius: 4
    },
    alt: "logo"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "data:image/jpeg;base64,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",
    style: {
      width: 28,
      height: "auto",
      borderRadius: 4
    },
    alt: "logo"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Playfair Display',serif",
      color: T.gold,
      fontSize: 13,
      fontWeight: 700
    }
  }, "Caf\xE9Finanzas"))), !col && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      borderBottom: `1px solid #2e1200`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: rc,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      fontWeight: 700,
      color: T.espresso,
      ...mono,
      flexShrink: 0
    }
  }, user.av), /*#__PURE__*/React.createElement("div", {
    style: {
      color: T.cream,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 130
    }
  }, user.name))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: "5px 3px",
      overflowY: "auto"
    }
  }, MODS_V4.filter(m => allowed.includes(m.id)).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    onClick: () => onNav(m.id),
    title: col ? m.label : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: col ? "8px" : "6px 8px",
      borderRadius: 6,
      cursor: "pointer",
      marginBottom: 1,
      background: active === m.id ? `${T.caramel}28` : "transparent",
      borderLeft: active === m.id ? `3px solid ${T.caramel}` : "3px solid transparent",
      justifyContent: col ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, m.icon), !col && /*#__PURE__*/React.createElement("span", {
    style: {
      color: active === m.id ? T.gold : T.latte,
      fontSize: 12,
      fontWeight: active === m.id ? 600 : 400
    }
  }, m.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "5px 3px",
      borderTop: `1px solid #2e1200`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setCol(!col),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "6px 8px",
      borderRadius: 6,
      cursor: "pointer",
      justifyContent: col ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted,
      fontSize: 11
    }
  }, col ? "▶" : "◀"), !col && /*#__PURE__*/React.createElement("span", {
    style: {
      color: T.muted,
      fontSize: 11
    }
  }, "Colapsar")), /*#__PURE__*/React.createElement("div", {
    onClick: onLogout,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
      justifyContent: col ? "center" : "flex-start",
      background: "rgba(176,48,48,.15)",
      border: "1px solid rgba(176,48,48,.25)",
      margin: "2px 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: { fontSize: 14 }
  }, "\uD83D\uDEAA"), !col && /*#__PURE__*/React.createElement("span", {
    style: { color: "#EA8A8A", fontSize: 13, fontWeight: 600 }
  }, "Cerrar Sesi\xF3n"))));
}

// ── BACKUP / RESTORE ──────────────────────────────────────────
function BackupRestore({data, onRestore}) {
  const [showModal, setShowModal] = React.useState(false);
  const [restoreMsg, setRestoreMsg] = React.useState("");

  const doBackup = () => {
    const json = JSON.stringify({
      version: "4.0",
      fecha: new Date().toISOString(),
      negocio: "CaféFinanzas HN",
      ...data
    }, null, 2);
    const blob = new Blob([json], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cafefinanzas_backup_" + new Date().toISOString().slice(0,10) + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const doRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.version) { setRestoreMsg("Archivo inválido"); return; }
        onRestore(parsed);
        setRestoreMsg("✓ Datos restaurados correctamente");
        setTimeout(() => { setShowModal(false); setRestoreMsg(""); }, 2000);
      } catch(err) {
        setRestoreMsg("Error al leer el archivo: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  // uses global T

  return React.createElement(React.Fragment, null,
    React.createElement("div", {
      onClick: () => setShowModal(true),
      style: {display:"flex",alignItems:"center",gap:7,padding:"6px 8px",borderRadius:7,cursor:"pointer"}
    },
      React.createElement("span", {style:{fontSize:13}}, "💾"),
      React.createElement("span", {style:{color:"#E8D5B5",fontSize:12}}, "Backup / Restore")
    ),
    showModal && React.createElement("div", {
      style:{position:"fixed",inset:0,background:"rgba(28,10,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000}
    },
      React.createElement("div", {
        style:{background:"#fff",borderRadius:14,padding:28,width:"100%",maxWidth:420,boxShadow:"0 4px 32px rgba(0,0,0,.2)"}
      },
        React.createElement("h3", {style:{fontFamily:"'Playfair Display',serif",fontSize:20,margin:"0 0 6px",color:T.espresso}}, "💾 Backup & Restore"),
        React.createElement("p", {style:{color:T.muted,fontSize:13,margin:"0 0 20px"}}, "Guarda todos tus datos en un archivo JSON o restaura un backup anterior."),
        
        React.createElement("div", {style:{background:T.steam,borderRadius:10,padding:16,marginBottom:14}},
          React.createElement("div", {style:{fontWeight:700,fontSize:14,color:T.espresso,marginBottom:6}}, "⬇ Hacer Backup"),
          React.createElement("p", {style:{fontSize:13,color:T.muted,margin:"0 0 10px"}}, "Descarga todos los datos actuales (productos, empleados, ventas, proveedores, etc.) en un archivo seguro."),
          React.createElement("button", {
            onClick: doBackup,
            style:{width:"100%",padding:"10px",borderRadius:8,border:"none",background:T.caramel,color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}
          }, "💾 Descargar Backup (.json)")
        ),

        React.createElement("div", {style:{background:T.steam,borderRadius:10,padding:16,marginBottom:14}},
          React.createElement("div", {style:{fontWeight:700,fontSize:14,color:T.espresso,marginBottom:6}}, "⬆ Restaurar Backup"),
          React.createElement("p", {style:{fontSize:13,color:T.muted,margin:"0 0 10px"}}, "Selecciona un archivo de backup (.json) para restaurar todos los datos."),
          React.createElement("input", {
            type:"file", accept:".json",
            onChange: doRestore,
            style:{width:"100%",padding:"8px",borderRadius:8,border:"1.5px solid #E8D5B5",fontFamily:"inherit",fontSize:13,background:"#fff",cursor:"pointer",boxSizing:"border-box"}
          }),
          restoreMsg && React.createElement("p", {
            style:{margin:"8px 0 0",fontSize:13,color:restoreMsg.startsWith("✓")?T.success:T.danger,fontWeight:600}
          }, restoreMsg)
        ),

        React.createElement("div", {style:{background:"#FFF3CD",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#856404"}},
          "⚠ La restauración reemplaza TODOS los datos actuales. Haz un backup antes de restaurar."
        ),

        React.createElement("button", {
          onClick: () => setShowModal(false),
          style:{width:"100%",padding:"9px",borderRadius:8,border:"1px solid #E8D5B5",background:"transparent",fontFamily:"inherit",fontSize:13,cursor:"pointer",color:T.muted}
        }, "Cerrar")
      )
    )
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [mod, setMod] = useState("dashboard");
  const [xr, setXr] = useState(25.20);
  const [xrStatus, setXrStatus] = useState("manual");
  const [inventory, setInv] = useState(INV0);
  const [employees, setEmp] = useState(EMP0);
  const [suppliers, setSup] = useState(SUP0);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState(PRODS0);
  const [users, setUsers] = useState(USERS0);
  const [demoKeys, setDemoKeys] = useState([]);
  const [invoiceCounter, setInvC] = useState(1000);
  const [cierres, setCierres] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [turnoActivo, setTurnoA] = useState(null);
  const [comandas, setComandas] = useState([]);
  const [cxc, setCxc] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [activos, setActivos] = useState(ACTIVOS0);
  const [metas, setMetas] = useState(METAS0);
  const [descuentos, setDesc] = useState([{
    id: 1,
    nombre: "Happy Hour 3-5pm",
    tipo: "porcentaje",
    valor: 15,
    condicion: "happy-hour",
    horaDe: "15:00",
    horaHasta: "17:00",
    activo: true
  }, {
    id: 2,
    nombre: "Descuento Empleado",
    tipo: "porcentaje",
    valor: 20,
    condicion: "siempre",
    activo: true
  }]);
  const [clientes, setClientes] = useState([]);
  const [mermas, setMermas] = useState([]);
  const [encuestas, setEncuestas] = useState([]);
  const [sucursales, setSucs] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const fetchBCH = useCallback(async () => {
    setXrStatus("loading");
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/USD");
      const d = await r.json();
      if (d.rates?.HNL) {
        setXr(d.rates.HNL);
        setXrStatus("live");
      } else setXrStatus("manual");
    } catch {
      setXrStatus("manual");
    }
  }, []);
  useEffect(() => {
    fetchBCH();
  }, []);
  if (!user) return /*#__PURE__*/React.createElement(Login, {
    onLogin: u => {
      setUser(u);
      const role = ROLES_V4[u.role || "admin"];
      setMod(role.modules[0]);
    },
    demoKeys: demoKeys,
    users: users
  });
  const allowed = ROLES_V4[user.role]?.modules || [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: T.steam
    }
  }), /*#__PURE__*/React.createElement(SidebarV4, {
    user: user,
    active: mod,
    onNav: setMod,
    onLogout: () => setUser(null),
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, user.isDemo && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFD700",
      color: T.espresso,
      fontSize: 12,
      fontWeight: 700,
      textAlign: "center",
      padding: "3px 0",
      letterSpacing: 1
    }
  }, "\u26A0\uFE0F MODO DEMO \u2014 v4.0 \xB7 32 m\xF3dulos activos"), mod === "dashboard" && /*#__PURE__*/React.createElement(Dashboard, {
    sales: sales,
    inventory: inventory,
    employees: employees,
    xr: xr,
    xrStatus: xrStatus,
    cierres: cierres,
    gastos: gastos,
    cxc: cxc
  }), mod === "pos" && /*#__PURE__*/React.createElement(POS, {
    products: products,
    sales: sales,
    setSales: setSales,
    xr: xr,
    invoiceCounter: invoiceCounter,
    setInvoiceCounter: setInvC,
    turnoActivo: turnoActivo,
    inventory: inventory,
    setInventory: setInv
  }), mod === "comandas" && /*#__PURE__*/React.createElement(Comandas, {
    products: products,
    comandas: comandas,
    setComandas: setComandas
  }), mod === "caja" && /*#__PURE__*/React.createElement(CierreCaja, {
    sales: sales,
    cierres: cierres,
    setCierres: setCierres
  }), mod === "turnos" && /*#__PURE__*/React.createElement(Turnos, {
    employees: employees,
    turnos: turnos,
    setTurnos: setTurnos,
    turnoActivo: turnoActivo,
    setTurnoActivo: setTurnoA
  }), mod === "inventario" && /*#__PURE__*/React.createElement(Inventario, {
    inventory: inventory,
    setInventory: setInv
  }), mod === "recetas" && /*#__PURE__*/React.createElement(Recetas, {
    inventory: inventory
  }), mod === "nomina" && /*#__PURE__*/React.createElement(Nomina, {
    employees: employees,
    setEmployees: setEmp
  }), mod === "proveedores" && /*#__PURE__*/React.createElement(Proveedores, {
    suppliers: suppliers,
    setSuppliers: setSup
  }), mod === "cxc" && /*#__PURE__*/React.createElement(CxC, {
    cxc: cxc,
    setCxc: setCxc
  }), mod === "gastos" && /*#__PURE__*/React.createElement(GastosOperativos, {
    gastos: gastos,
    setGastos: setGastos
  }), mod === "flujo" && /*#__PURE__*/React.createElement(FlujoCaja, {
    employees: employees,
    gastos: gastos
  }), mod === "reportes" && /*#__PURE__*/React.createElement(ReportesSAR, {
    sales: sales
  }), mod === "activos" && /*#__PURE__*/React.createElement(Activos, {
    activos: activos,
    setActivos: setActivos
  }), mod === "rentabilidad" && /*#__PURE__*/React.createElement(Rentabilidad, {
    products: products,
    sales: sales
  }), mod === "metas" && /*#__PURE__*/React.createElement(Metas, {
    metas: metas,
    setMetas: setMetas
  }), mod === "alertas" && /*#__PURE__*/React.createElement(AlertasWA, {
    inventory: inventory,
    cierres: cierres,
    sales: sales
  }), mod === "descuentos" && /*#__PURE__*/React.createElement(Descuentos, {
    descuentos: descuentos,
    setDescuentos: setDesc
  }), mod === "fidelidad" && /*#__PURE__*/React.createElement(Fidelidad, {
    clientes: clientes,
    setClientes: setClientes,
    sales: sales
  }), mod === "mermas" && /*#__PURE__*/React.createElement(Mermas, {
    mermas: mermas,
    setMermas: setMermas,
    inventory: inventory
  }), mod === "calendario" && /*#__PURE__*/React.createElement(CalendarioPagos, {
    employees: employees,
    suppliers: suppliers
  }), mod === "libroventas" && /*#__PURE__*/React.createElement(LibroVentas, {
    sales: sales
  }), mod === "aguinaldo" && /*#__PURE__*/React.createElement(Aguinaldo, {
    employees: employees
  }), mod === "prestaciones" && /*#__PURE__*/React.createElement(Prestaciones, {
    employees: employees
  }), mod === "recepcion" && /*#__PURE__*/React.createElement(RecepcionMercaderia, {
    suppliers: suppliers,
    inventory: inventory,
    setInventory: setInv,
    setCxpExtra: () => {}
  }), mod === "encuesta" && /*#__PURE__*/React.createElement(EncuestaQR, {
    encuestas: encuestas,
    setEncuestas: setEncuestas
  }), mod === "sucursales" && /*#__PURE__*/React.createElement(MultiSucursal, {
    sucursales: sucursales,
    setSucursales: setSucs
  }), mod === "presupuesto" && /*#__PURE__*/React.createElement(PresupuestoAnual, {
    employees: employees
  }), mod === "ordenes" && /*#__PURE__*/React.createElement(OrdenesCompra, {
    suppliers: suppliers,
    inventory: inventory,
    ordenes: ordenes,
    setOrdenes: setOrdenes
  }), mod === "productos" && /*#__PURE__*/React.createElement(GestionProductos, {
    products: products,
    setProducts: setProducts
  }), mod === "usuarios" && /*#__PURE__*/React.createElement(GestionUsuarios, {
    users: users,
    setUsers: setUsers,
    demoKeys: demoKeys,
    setDemoKeys: setDemoKeys,
    currentUser: user
  }), mod === "config" && /*#__PURE__*/React.createElement(Config, {
    xr: xr,
    setXr: setXr,
    xrStatus: xrStatus,
    setXrStatus: setXrStatus,
    fetchBCH: fetchBCH
  })),
  typeof window !== "undefined" && window.innerWidth >= 640 && /*#__PURE__*/React.createElement("div", {
    style:{position:"fixed",bottom:16,right:16,zIndex:1500,background:"#2E1200",borderRadius:10,padding:"4px 0",boxShadow:"0 4px 20px rgba(0,0,0,.3)",border:"1px solid #C8841A44"}
  },
    /*#__PURE__*/React.createElement(BackupRestore, {
      data: {inventory,employees,suppliers,sales,products,users,cierres,turnos,comandas,cxc,gastos,activos,metas,descuentos,clientes,mermas,encuestas,sucursales,ordenes,invoiceCounter},
      onRestore: (d) => {
        if(d.inventory) setInv(d.inventory);
        if(d.employees) setEmp(d.employees);
        if(d.suppliers) setSup(d.suppliers);
        if(d.sales) setSales(d.sales);
        if(d.products) setProducts(d.products);
        if(d.cierres) setCierres(d.cierres);
        if(d.gastos) setGastos(d.gastos);
        if(d.activos) setActivos(d.activos);
        if(d.metas) setMetas(d.metas);
        if(d.invoiceCounter) setInvC(d.invoiceCounter);
        if(d.clientes) setClientes(d.clientes);
        if(d.mermas) setMermas(d.mermas);
        if(d.descuentos) setDesc(d.descuentos);
      }
    })
  );
}


// ── RENDER ────────────────────────────────────────────────────
const rootEl = document.getElementById('root');
if (rootEl) {
  if (typeof ReactDOM.createRoot === 'function') {
    ReactDOM.createRoot(rootEl).render(React.createElement(App));
  } else {
    ReactDOM.render(React.createElement(App), rootEl);
  }
}
