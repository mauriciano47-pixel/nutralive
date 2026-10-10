/**
 * NutraLive - Base de Datos Canónica de Alimentos Clínicos & Filtro Hepático MASLD
 * Propiedad exclusiva de Mauricio Uribe Maldonado
 * 
 * Permite autocompletar, seleccionar y clasificar alimentos por nombre,
 * analizando inductores de Lipogénesis de Novo (JMAF/Fructosa), grasas trans,
 * carga glucémica y proponiendo el "Cambio Seguro" (Healthy Swap).
 */

export const CLINICAL_FOOD_CATALOG = [
  // ==========================================
  // 🔴 ALERTA HEPÁTICA (ROJO) - PROHIBIDOS EN MASLD
  // ==========================================
  {
    id: 'ketchup-comercial',
    name: 'Kétchup Tradicional Comercial',
    brand: 'Marcas Masivas de Supermercado',
    category: 'Salsas & Condimentos',
    traffic_light: 'RED',
    keywords: ['ketchup', 'catsup', 'ketchut', 'salsa de tomate dulce'],
    ingredients_raw: 'Concentrado de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre destilado, jarabe de maíz, sal, cebolla en polvo, especias.',
    harmful_items: [
      { name: 'Jarabe de Maíz de Alta Fructosa (JMAF)', term: 'JMAF', risk: 'RED', mechanism: 'El 100% de la fructosa libre se metaboliza en el hígado; activa la lipogénesis de novo y genera esteatosis acelerada.' },
      { name: 'Jarabe de Maíz Regular', term: 'Jarabe de maíz', risk: 'RED', mechanism: 'Añade glucosa de altísimo índice glucémico que dispara la insulina y bloquea la quema de grasa hepática.' }
    ],
    clinical_advice: 'Hasta un 33% del peso de este producto es azúcar líquido concentrado. Es una de las vías más comunes de ingesta oculta de JMAF en niños.',
    healthy_swap: {
      product: 'Salsa Casera de Tomate al Orégano y AOVE',
      reasoning: 'Elaborada en 10 minutos con tomates naturales triturados, aceite de oliva virgen extra y hierbas provenzales. 0% fructosa añadida.'
    }
  },
  {
    id: 'bebida-cola-comercial',
    name: 'Bebida / Refresco Cola Tradicional',
    brand: 'Marcas de Refrescos Gasificados',
    category: 'Bebidas & Jugos',
    traffic_light: 'RED',
    keywords: ['coca', 'cola', 'pepsi', 'bebida', 'gaseosa', 'refresco', 'soda'],
    ingredients_raw: 'Agua carbonatada, jarabe de maíz de alta fructosa (JMAF) o azúcar, colorante caramelo IV, ácido fosfórico, cafeína.',
    harmful_items: [
      { name: 'Jarabe de Maíz de Alta Fructosa (JMAF / HFCS-55)', term: 'JMAF / Azúcar libre', risk: 'RED', mechanism: 'Satura la fructoquinasa hepática en menos de 15 minutos, convirtiéndose directamente en gotas de triglicéridos en los hepatocitos.' },
      { name: 'Colorante Caramelo IV', term: 'Caramelo IV', risk: 'YELLOW', mechanism: 'Subproducto con compuestos avanzados de glicación que promueven estrés oxidativo hepático.' }
    ],
    clinical_advice: 'Una sola lata contiene más de 39g de azúcares libres. Es el factor dietético #1 asociado a esteatohepatitis no alcohólica en menores de edad.',
    healthy_swap: {
      product: 'Agua Gasificada Natural con Rodajas de Cítricos o Frutos Rojos',
      reasoning: 'Mantiene la sensación burbujeante refrescante sin una sola gota de fructosa libre ni edulcorantes hepatotóxicos.'
    }
  },
  {
    id: 'galletas-rellenas',
    name: 'Galletas Dulces Rellenas de Crema',
    brand: 'Snacks y Golosinas Industriales',
    category: 'Snacks & Galletas',
    traffic_light: 'RED',
    keywords: ['galletas', 'galleta', 'oreo', 'triton', 'rellenas', 'obleas', 'dulces'],
    ingredients_raw: 'Harina de trigo enriquecida, azúcar, grasa vegetal hidrogenada (aceite de palma parcialmente hidrogenado), jarabe de glucosa-fructosa, cacao, lecitina de soya.',
    harmful_items: [
      { name: 'Grasas Vegetales Hidrogenadas (Grasas Trans)', term: 'Aceite parcialmente hidrogenado', risk: 'RED', mechanism: 'Inducen estrés en el retículo endoplasmático de los hepatocitos, acelerando la fibrosis hepática.' },
      { name: 'Jarabe de Glucosa-Fructosa', term: 'Jarabe de glucosa-fructosa', risk: 'RED', mechanism: 'Combinación ultraprocesada diseñada para hiperpalatabilidad que maximiza la esteatosis hepática.' }
    ],
    clinical_advice: 'Combinación crítica de grasas inflamatorias y azúcares de absorción rápida. Promueve esteatohepatitis activa y elevación persistente de ALT/AST.',
    healthy_swap: {
      product: 'Galletas Caseras de Avena, Plátano y Cacao Puro (100%)',
      reasoning: 'Horneadas en 15 minutos con fibra de avena soluble (betaglucano) y antioxidantes del cacao sin grasas hidrogenadas ni jarabes.'
    }
  },
  {
    id: 'nectar-jugo-caja',
    name: "Jugo / Néctar en Caja 'Sin Azúcar Añadido'",
    brand: 'Línea Jugos Infantiles Comerciales',
    category: 'Bebidas & Jugos',
    traffic_light: 'RED',
    keywords: ['jugo', 'nectar', 'jugo en caja', 'watts', 'andina', 'tutti', 'concentrado de fruta'],
    ingredients_raw: 'Agua, concentrado de manzana y uva reconstituido, ácido cítrico, saborizantes idénticos al natural, sucralosa, vitamina C.',
    harmful_items: [
      { name: 'Concentrado de Fruta Reconstituido (Fructosa Libre)', term: 'Concentrado de fruta', risk: 'RED', mechanism: 'Al retirar la pulpa y la fibra vegetal, la fructosa queda libre y se absorbe masivamente en el sistema portal hepático.' }
    ],
    clinical_advice: "Los concentrados de fruta actúan bioquímicamente igual que el azúcar refinado: el hígado no distingue si la fructosa vino de una manzana destilada o de un jarabe.",
    healthy_swap: {
      product: 'Fruta Entera con Piel (Manzana verde / Pera) + Agua Pura',
      reasoning: 'La matriz de fibra intacta ralentiza la absorción intestinal y alimenta la microbiota protectora del eje intestino-hígado.'
    }
  },
  {
    id: 'cereal-infantil-azucarado',
    name: 'Cereal Infantil Azucarado de Desayuno',
    brand: 'Cereales de Caja Masivos',
    category: 'Panadería & Cereales',
    traffic_light: 'RED',
    keywords: ['cereal', 'cereales', 'chocapic', 'froot loops', 'corn flakes', 'zucaritas', 'estrellitas'],
    ingredients_raw: 'Harina de maíz, azúcar refinada, jarabe de glucosa, maltodextrina, aceite de palma, sal, colorantes artificiales.',
    harmful_items: [
      { name: 'Maltodextrina y Jarabe de Glucosa', term: 'Maltodextrina', risk: 'RED', mechanism: 'Índice glucémico superior a 110. Causa hiperinsulinemia que frena la beta-oxidación hepática de ácidos grasos.' },
      { name: 'Azúcares Añadidos Refinados', term: 'Azúcar refinada', risk: 'RED', mechanism: 'Acelera la acumulación de triglicéridos en el parénquima hepático.' }
    ],
    clinical_advice: 'Provoca picos masivos de glucosa e insulina a primera hora de la mañana, condicionando la lipogénesis durante todo el día escolar.',
    healthy_swap: {
      product: 'Porridge Tibio de Avena Integral con Canela y Semillas',
      reasoning: 'Aporta energía sostenida de bajo índice glucémico y estimula la producción de ácidos grasos de cadena corta antiinflamatorios.'
    }
  },
  {
    id: 'pan-blanco-molde',
    name: 'Pan de Molde Blanco Industrial',
    brand: 'Panaderías Industriales',
    category: 'Panadería & Cereales',
    traffic_light: 'RED',
    keywords: ['pan', 'pan blanco', 'pan de molde', 'pan bimbo', 'pan lactal', 'pan tostado'],
    ingredients_raw: 'Harina de trigo refinada, agua, jarabe de maíz, levadura, grasa vegetal refinada, sal, conservantes (propionato de calcio).',
    harmful_items: [
      { name: 'Jarabe de Maíz Añadido', term: 'Jarabe de maíz', risk: 'RED', mechanism: 'Se utiliza en panadería industrial para dar suavidad y coloración rápida, introduciendo fructosa en un alimento salado.' },
      { name: 'Harina de Trigo Ultra-Refinada', term: 'Harina refinada', risk: 'YELLOW', mechanism: 'Carente de fibra, genera picos glucémicos elevados.' }
    ],
    clinical_advice: 'Muchos panes de molde industriales contienen jarabes de maíz ocultos. Revisa siempre que la lista de ingredientes no contenga jarabes.',
    healthy_swap: {
      product: 'Pan 100% Integral de Grano Entero o Masa Madre Auténtica',
      reasoning: 'La fermentación lenta de masa madre disminuye el índice glucémico y mejora la sensibilidad hepática a la insulina.'
    }
  },
  {
    id: 'nuggets-pollo-congelados',
    name: 'Nuggets de Pollo Congelados Industriales',
    brand: 'Congelados de Supermercado',
    category: 'Carnes & Congelados',
    traffic_light: 'RED',
    keywords: ['nuggets', 'nugget', 'pollo frito', 'apanado', 'patitas de pollo'],
    ingredients_raw: 'Carne de pollo separada mecánicamente, agua, harina de trigo, aceite de soya parcialmente hidrogenado, dextrosa, almidón modificado, sal, fosfatos.',
    harmful_items: [
      { name: 'Aceite Parcialmente Hidrogenado (Trans)', term: 'Parcialmente hidrogenado', risk: 'RED', mechanism: 'Grasas termo-oxidadas que aumentan las transaminasas hepáticas y los marcadores de inflamación TNF-alfa.' },
      { name: 'Dextrosa Oculta en Rebozado', term: 'Dextrosa', risk: 'YELLOW', mechanism: 'Azúcar simple añadido al empanizado para acelerar el dorado en fritura.' }
    ],
    clinical_advice: 'Ultraprocesado con grasa de baja calidad y almidones refinados. Un disparador directo de transaminasas ALT/TGP en controles pediátricos.',
    healthy_swap: {
      product: 'Nuggets Caseros NutraLive de Pechuga Real Horneados con Avena',
      reasoning: '100% pechuga de pollo magra rebozada en avena integral triturada y dorada al horno con un toque de aceite de oliva.'
    }
  },
  {
    id: 'sirope-agave',
    name: 'Sirope o Néctar de Agave Comercial',
    brand: 'Dietéticas y Tiendas Naturales',
    category: 'Endulzantes & Mieles',
    traffic_light: 'RED',
    keywords: ['agave', 'sirope de agave', 'miel de agave', 'nectar de agave'],
    ingredients_raw: '100% jarabe concentrado de agave hidrolizado térmicamente.',
    harmful_items: [
      { name: 'Fructosa Libre Ultra-Concentrada (75-90%)', term: 'Fructosa concentrada', risk: 'RED', mechanism: 'Aunque se vende como natural o de bajo índice glucémico, contiene más fructosa pura que el propio azúcar de mesa. Tóxico para el hígado graso.' }
    ],
    clinical_advice: 'Es uno de los mayores mitos dietéticos: su bajo índice glucémico se debe precisamente a que no contiene glucosa, sino fructosa que satura directamente el hígado.',
    healthy_swap: {
      product: 'Canela de Ceilán en Polvo o Extracto Puro de Vainilla sin Azúcar',
      reasoning: 'La canela de Ceilán ha demostrado mejorar la sensibilidad hepática a la insulina sin aportar fructosa.'
    }
  },
  {
    id: 'crema-cacao-avellanas',
    name: 'Crema de Cacao y Avellanas Comercial',
    brand: 'Untables Dulces Industriales',
    category: 'Snacks & Galletas',
    traffic_light: 'RED',
    keywords: ['nutella', 'crema de cacao', 'untable dulce', 'avellanas con chocolate'],
    ingredients_raw: 'Azúcar (55%), aceite de palma vegetal, avellanas (13%), leche descremada en polvo, cacao desgrasado, lecitina de soya, vainillina.',
    harmful_items: [
      { name: 'Azúcar Refinada Masiva (55%)', term: 'Azúcar 55%', risk: 'RED', mechanism: 'Cada porción de 2 cucharadas aporta más de 20g de azúcares simples inductores de esteatosis.' },
      { name: 'Aceite de Palma Refinado', term: 'Aceite de palma', risk: 'RED', mechanism: 'Alto en ácido palmítico saturado que favorece la apoptosis celular en los hepatocitos.' }
    ],
    clinical_advice: 'Más de la mitad del frasco es azúcar pura disuelta en grasa de palma. Debe eliminarse por completo de la dieta familiar en MASLD.',
    healthy_swap: {
      product: 'Crema Casera de Avellanas 100% Natural con Cacao Amargo Puro',
      reasoning: 'Avellanas tostadas trituradas al natural con cacao puro y una pizca de eritritol o stevia. Rica en vitamina E protectora.'
    }
  },
  {
    id: 'salsa-bbq-comercial',
    name: 'Salsa Barbacoa (BBQ) Comercial',
    brand: 'Salsas Industriales',
    category: 'Salsas & Condimentos',
    traffic_light: 'RED',
    keywords: ['bbq', 'barbacoa', 'salsa bbq', 'salsa barbacoa'],
    ingredients_raw: 'Puré de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre destilado, melaza, sal, almidón modificado, humo líquido, colorante caramelo.',
    harmful_items: [
      { name: 'Jarabe de Maíz de Alta Fructosa', term: 'JMAF', risk: 'RED', mechanism: 'La salsa BBQ es prácticamente un jarabe azucarado saborizado; hasta 16g de azúcar por porción.' }
    ],
    clinical_advice: 'Condimento de alto riesgo oculto. Dos cucharadas sobre la carne equivalen al azúcar de un postre industrial.',
    healthy_swap: {
      product: 'Chimichurri Casero al Limón con Hierbas Frescas y AOVE',
      reasoning: 'Perejil, ajo, orégano, jugo de limón natural y aceite de oliva virgen extra. Aporta polifenoles antiinflamatorios.'
    }
  },

  // ==========================================
  // 🟡 PRECAUCIÓN / CONSUMO MODERADO (AMARILLO)
  // ==========================================
  {
    id: 'yogur-frutilla-light',
    name: "Yogur Batido Frutilla 'Light / 0% Grasa'",
    brand: 'Lácteos Comerciales',
    category: 'Lácteos & Postres',
    traffic_light: 'YELLOW',
    keywords: ['yogur', 'yogurt', 'yoghurt', 'yogur light', 'yogur descremado'],
    ingredients_raw: 'Leche descremada pasteurizada, almidón modificado de maíz, concentrado de frutilla, maltodextrina, sucralosa, colorante carmín.',
    harmful_items: [
      { name: 'Maltodextrina y Almidón Modificado', term: 'Maltodextrina', risk: 'YELLOW', mechanism: 'Se añaden para dar textura al retirar la grasa, compensando con carbohidratos de absorción ultrarrápida.' }
    ],
    clinical_advice: 'Los productos "light" suelen compensar la falta de grasa con almidones y jarabes. Consumir con moderación y revisar la etiqueta.',
    healthy_swap: {
      product: 'Yogur Griego Natural Entero Sin Azúcar + Arándanos Frescos',
      reasoning: 'Proteína láctea de alta calidad (10g+), probióticos vivos y antioxidantes naturales sin maltodextrinas.'
    }
  },
  {
    id: 'galletas-agua-soda',
    name: 'Galletas de Agua / Soda / Crackers',
    brand: 'Snacks Salados de Supermercado',
    category: 'Snacks & Galletas',
    traffic_light: 'YELLOW',
    keywords: ['galletas de agua', 'galletas de soda', 'crackers', 'galletas saladas'],
    ingredients_raw: 'Harina de trigo enriquecida, aceite vegetal de palma, sal, bicarbonato de sodio, emulsionantes.',
    harmful_items: [
      { name: 'Harina Refinada sin Fibra', term: 'Harina de trigo refinada', risk: 'YELLOW', mechanism: 'Alto índice glucémico a pesar de no saber dulces. Se convierten rápidamente en glucosa sanguínea.' }
    ],
    clinical_advice: 'Falsamente consideradas saludables por no tener azúcar visible. Su digestión rápida eleva la glucosa posprandial.',
    healthy_swap: {
      product: 'Tostadas de Trigo Sarraceno o Semillas de Lino Horneadas',
      reasoning: 'Ricas en lignanos y fibra mucilaginosa que disminuyen la absorción de carbohidratos en el tracto digestivo.'
    }
  },
  {
    id: 'granola-comercial-miel',
    name: 'Granola Comercial con Frutas Deshidratadas',
    brand: 'Cereales Saludables Comerciales',
    category: 'Panadería & Cereales',
    traffic_light: 'YELLOW',
    keywords: ['granola', 'muesli', 'cereal granola', 'avena tostada con miel'],
    ingredients_raw: 'Avena laminada, jarabe de glucosa, miel industrial, pasas de uva, aceite de maravilla, coco rallado.',
    harmful_items: [
      { name: 'Jarabes Aglutinantes y Fruta Deshidratada Concentrada', term: 'Jarabe / Miel / Pasas', risk: 'YELLOW', mechanism: 'Las frutas deshidratadas concentran hasta 4 veces más fructosa que la fruta fresca.' }
    ],
    clinical_advice: 'Moderar las porciones (máximo 2 cucharadas) y preferir versiones sin jarabes aglutinantes ni azúcares añadidos.',
    healthy_swap: {
      product: 'Granola Casera de Sartén con Avena Integral, Nueces y Canela',
      reasoning: 'Tostada al fuego en 5 minutos solo con un toque de aceite de oliva, nueces trituradas y canela. 0% jarabes.'
    }
  },
  {
    id: 'arroz-blanco-pulido',
    name: 'Arroz Blanco Tradicional Pulido',
    brand: 'Granos y Cereales Masivos',
    category: 'Panadería & Cereales',
    traffic_light: 'YELLOW',
    keywords: ['arroz', 'arroz blanco', 'arroz grado 1', 'arroz grano largo'],
    ingredients_raw: '100% arroz blanco pulido descascarillado.',
    harmful_items: [
      { name: 'Almidón de Rápida Digestión', term: 'Almidón pulido', risk: 'YELLOW', mechanism: 'Al perder el salvado y el germen, su digestión enzimática es inmediata, elevando la insulina.' }
    ],
    clinical_advice: 'Se recomienda enfriar en el refrigerador durante 12-24 horas antes de consumir para generar "almidón resistente" tipo 3, beneficioso para la microbiota.',
    healthy_swap: {
      product: 'Arroz Integral, Quinoa Real o Arroz Blanco Enfriado (Almidón Resistente)',
      reasoning: 'El almidón resistente fermenta en el colon produciendo butirato que desinflama el hepatocito.'
    }
  },

  // ==========================================
  // 🟢 APROBADO & PROTECTORES HEPÁTICOS (VERDE)
  // ==========================================
  {
    id: 'avena-integral-copos',
    name: 'Avena Integral en Copos Enteros',
    brand: 'NutraLive Escudo Hepático',
    category: 'Panadería & Cereales',
    traffic_light: 'GREEN',
    keywords: ['avena', 'avena integral', 'copos de avena', 'oats', 'quaker integral'],
    ingredients_raw: '100% copos de avena integral seleccionada de grano entero.',
    harmful_items: [],
    clinical_advice: 'Alimento estrella anti-esteatosis. Su betaglucano reduce activamente el colesterol LDL y los triglicéridos hepáticos.',
    healthy_swap: {
      product: 'Alimento Óptimo de Consumo Diario Recomendado',
      reasoning: 'Consumir en desayunos, batidos o como sustituto de pan rallado para milanesas y albóndigas al horno.'
    }
  },
  {
    id: 'aceite-oliva-virgen-extra',
    name: 'Aceite de Oliva Virgen Extra (AOVE)',
    brand: 'Prensado en Frío',
    category: 'Aceites & Grasas Saludables',
    traffic_light: 'GREEN',
    keywords: ['aceite de oliva', 'aove', 'oliva virgen extra', 'aceite extra virgen'],
    ingredients_raw: '100% zumo de aceitunas obtenido únicamente por procedimientos mecánicos en frío.',
    harmful_items: [],
    clinical_advice: 'Rico en ácido oleico y polifenoles como el hidroxitirosol. Mejora la función mitocondrial hepática y revierte la esteatosis.',
    healthy_swap: {
      product: 'Grasa Protectora de Referencia',
      reasoning: 'Utilizar 1 a 2 cucharadas soperas diarias en crudo sobre ensaladas y platos calientes al servir.'
    }
  },
  {
    id: 'huevo-entero-con-yema',
    name: 'Huevo de Campo Entero (con Yema)',
    brand: 'Proteína Fresca Natural',
    category: 'Proteínas & Huevos',
    traffic_light: 'GREEN',
    keywords: ['huevo', 'huevos', 'huevo duro', 'yema', 'huevo revuelto'],
    ingredients_raw: '100% huevo de gallina entero fresco.',
    harmful_items: [],
    clinical_advice: 'Contiene la mayor concentración biológica de colina (fosfatidilcolina). La colina es obligatoria para sintetizar VLDL y sacar la grasa fuera del hígado.',
    healthy_swap: {
      product: 'Excelente Opción Protectora (1-2 huevos/día)',
      reasoning: 'Consumir hervido, pochado o revuelto con aceite de oliva. La yema es donde se encuentra el 100% de la colina anti-esteatosis.'
    }
  },
  {
    id: 'salmon-pescado-azul',
    name: 'Salmón Fresco / Pescado Azul (Sardina, Trucha)',
    brand: 'Pescados & Mariscos',
    category: 'Proteínas & Pescados',
    traffic_light: 'GREEN',
    keywords: ['salmon', 'salmón', 'sardinas', 'pescado', 'atun natural', 'trucha'],
    ingredients_raw: '100% filete de pescado azul fresco.',
    harmful_items: [],
    clinical_advice: 'Fuente insuperable de ácidos grasos Omega-3 de cadena larga (EPA y DHA). Reduce la inflamación hepática y la esteatosis en ensayos clínicos.',
    healthy_swap: {
      product: 'Consumo Recomendado 2 a 3 veces por semana',
      reasoning: 'Cocinar al horno o a la plancha con limón y hierbas. Evitar frituras industriales.'
    }
  },
  {
    id: 'arandanos-frutos-rojos',
    name: 'Arándanos y Frutos Rojos Frescos',
    brand: 'Frutas Protectoras',
    category: 'Frutas & Vegetales',
    traffic_light: 'GREEN',
    keywords: ['arandanos', 'arándanos', 'frutos rojos', 'frambuesas', 'moras', 'frutillas'],
    ingredients_raw: '100% bayas frescas lavadas.',
    harmful_items: [],
    clinical_advice: 'Tienen un índice de fructosa intrínseca sumamente bajo y un contenido altísimo de antocianinas que neutralizan radicales libres en el hígado.',
    healthy_swap: {
      product: 'La Mejor Fruta Diaria para Pacientes con Hígado Graso',
      reasoning: 'Consumir 1 taza al día con yogur griego o como snack de media tarde para niños.'
    }
  },
  {
    id: 'palta-aguacate-entero',
    name: 'Palta / Aguacate Entero Fresco',
    brand: 'Vegetales & Grasas Naturales',
    category: 'Frutas & Vegetales',
    traffic_light: 'GREEN',
    keywords: ['palta', 'aguacate', 'avocado', 'guacamole casero'],
    ingredients_raw: '100% pulpa de palta entera fresca.',
    harmful_items: [],
    clinical_advice: 'Aporta grasas monoinsaturadas saludables, glutatión antioxidante y fibra prebiótica que ralentiza la digestión de carbohidratos.',
    healthy_swap: {
      product: 'Excelente Sustituto de Mantequillas y Mayonesas',
      reasoning: 'Reemplaza la mayonesa y los untables industriales en sándwiches y ensaladas familiares.'
    }
  },
  {
    id: 'brocoli-cruciferas',
    name: 'Brócoli al Vapor y Verduras Crucíferas',
    brand: 'Vegetales Protectores',
    category: 'Frutas & Vegetales',
    traffic_light: 'GREEN',
    keywords: ['brocoli', 'brócoli', 'coliflor', 'repollo', 'coles de bruselas'],
    ingredients_raw: '100% ramilletes de brócoli fresco.',
    harmful_items: [],
    clinical_advice: 'Contiene sulforafano e indol-3-carbinol, compuestos bioactivos que activan las enzimas de detoxificación de fase II en el hígado.',
    healthy_swap: {
      product: 'Vegetal Protector de Base',
      reasoning: 'Cocinar al vapor ligero (4-5 minutos) para preservar intacta la enzima mirosinasa que libera el sulforafano.'
    }
  },
  {
    id: 'semillas-chia-lino',
    name: 'Semillas de Chía y Lino Hidratadas',
    brand: 'Superalimentos Protectores',
    category: 'Cereales & Granos',
    traffic_light: 'GREEN',
    keywords: ['chia', 'chía', 'lino', 'linaza', 'semillas'],
    ingredients_raw: '100% semillas enteras de chía y lino.',
    harmful_items: [],
    clinical_advice: 'Ricas en ácido alfa-linolénico (ALA) y fibra soluble mucilaginosa que capta ácidos biliares y reduce la resistencia insulínica.',
    healthy_swap: {
      product: 'Adición Diaria en Desayunos y Batidos',
      reasoning: 'Dejar hidratar en agua durante 15 minutos antes de consumir para liberar sus mucílagos protectores.'
    }
  }
];

/**
 * Normaliza cadenas de texto para búsqueda clínica flexible.
 */
function normalizeQuery(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Busca alimentos en el catálogo por nombre o palabra clave.
 * @param {string} query
 * @param {string} filterTrafficLight - 'ALL', 'RED', 'YELLOW', 'GREEN'
 * @returns {Array<object>}
 */
export function searchFoodCatalog(query = '', filterTrafficLight = 'ALL') {
  const norm = normalizeQuery(query);

  let results = CLINICAL_FOOD_CATALOG;

  if (filterTrafficLight && filterTrafficLight !== 'ALL') {
    results = results.filter(f => f.traffic_light === filterTrafficLight);
  }

  if (!norm) {
    return results;
  }

  return results.filter(f => {
    const normName = normalizeQuery(f.name);
    const normCat = normalizeQuery(f.category);
    const normKeywords = f.keywords ? f.keywords.map(k => normalizeQuery(k)) : [];

    if (normName.includes(norm)) return true;
    if (normCat.includes(norm)) return true;
    if (normKeywords.some(k => k.includes(norm) || norm.includes(k))) return true;

    // Buscar si alguna palabra del query está contenida
    const words = norm.split(' ').filter(w => w.length >= 3);
    if (words.some(w => normName.includes(w) || normKeywords.some(k => k.includes(w)))) {
      return true;
    }

    return false;
  });
}

/**
 * Clasifica un alimento ya sea por su NOMBRE, por sus INGREDIENTES, o por ambos.
 * @param {string} productName
 * @param {string} ingredientsText
 * @returns {object}
 */
export function classifyFoodSmart(productName = '', ingredientsText = '') {
  const nameNorm = normalizeQuery(productName);
  const ingNorm = normalizeQuery(ingredientsText);

  // 1. Intentar encontrar coincidencia exacta o cercana en el catálogo clínico
  if (nameNorm) {
    const catalogMatches = searchFoodCatalog(productName);
    if (catalogMatches.length > 0) {
      const match = catalogMatches[0];

      return {
        product_name: match.name,
        brand: match.brand,
        category: match.category,
        traffic_light: match.traffic_light,
        verdict_title:
          match.traffic_light === 'RED'
            ? 'ALERTA HEPÁTICA — No Recomendado en Esteatosis / Hígado Graso'
            : match.traffic_light === 'YELLOW'
            ? 'PRECAUCIÓN — Carga Glucémica o Ultraprocesamiento Moderado'
            : 'APROBADO & SEGURO — Alimento Protector Hepático',
        clinical_advice: match.clinical_advice,
        detected_harmful_count: match.harmful_items.length,
        harmful_items: match.harmful_items,
        beneficial_items: match.traffic_light === 'GREEN' ? [
          { name: 'Matriz Nutricional Protectora', mechanism: match.clinical_advice }
        ] : [],
        healthy_swap: match.healthy_swap,
        ingredients_raw: match.ingredients_raw,
        is_from_catalog: true
      };
    }
  }

  // 2. Si no hubo coincidencia de catálogo, clasificar por análisis de texto de ingredientes
  const textToScan = `${nameNorm} ${ingNorm}`.trim();

  // Detección de palabras clave de alto riesgo en el nombre o ingredientes
  const redFlags = [
    { term: 'jmaf', name: 'Jarabe de Maíz de Alta Fructosa', mechanism: 'Inductor directo de lipogénesis de novo hepática.' },
    { term: 'hfcs', name: 'Jarabe de Maíz de Alta Fructosa (HFCS)', mechanism: 'Fructosa libre que satura los hepatocitos.' },
    { term: 'fructosa', name: 'Fructosa Libre / Concentrada', mechanism: 'Metabolismo exclusivo hepático sin regulación por fosfofructoquinasa.' },
    { term: 'agave', name: 'Jarabe de Agave Concentrado', mechanism: 'Concentración masiva de fructosa libre (hasta 85%).' },
    { term: 'trans', name: 'Grasas Vegetales Trans', mechanism: 'Estrés del retículo endoplásmico y esteatohepatitis.' },
    { term: 'hidrogenado', name: 'Aceite Hidrogenado / Parcialmente Hidrogenado', mechanism: 'Grasas alteradas que aumentan inflamación celular.' },
    { term: 'gaseosa', name: 'Bebida Azucarada Gasificada', mechanism: 'Líquidos de absorción inmediata que saturan el hígado.' },
    { term: 'cola', name: 'Refresco Cola Tradicional', mechanism: 'Concentración extrema de jarabes azucarados.' },
    { term: 'ketchup', name: 'Kétchup Industrial', mechanism: 'Salsa densa en jarabes de maíz añadidos.' },
    { term: 'bbq', name: 'Salsa Barbacoa', mechanism: 'Jarabe de maíz encubierto en condimento salado.' },
    { term: 'nutella', name: 'Untable Dulce de Cacao y Palma', mechanism: 'Más de 50% de azúcares y grasas saturadas pro-inflamatorias.' }
  ];

  const yellowFlags = [
    { term: 'maltodextrina', name: 'Maltodextrina', mechanism: 'Índice glucémico superior a 110 con hiperinsulinemia reactiva.' },
    { term: 'dextrosa', name: 'Dextrosa', mechanism: 'Glucosa simple que bloquea la lipólisis mitocondrial.' },
    { term: 'almidon modificado', name: 'Almidón Modificado', mechanism: 'Espesante sintético de absorción acelerada.' },
    { term: 'light', name: 'Producto Comercialmente Catalogado Light', mechanism: 'Suele sustituir grasa con almidones y jarabes.' },
    { term: 'arroz blanco', name: 'Arroz Blanco Pulido', mechanism: 'Carga glucémica moderada sin fibra amortiguadora.' }
  ];

  const greenFlags = [
    { term: 'avena', name: 'Avena Integral', mechanism: 'Betaglucano que limpia el exceso de triglicéridos.' },
    { term: 'oliva', name: 'Aceite de Oliva Virgen Extra', mechanism: 'Ácido oleico y polifenoles antioxidantes.' },
    { term: 'aove', name: 'Aceite de Oliva Virgen Extra (AOVE)', mechanism: 'Potente antiinflamatorio hepático.' },
    { term: 'huevo', name: 'Huevo Entero (con Colina)', mechanism: 'Aporte de colina esencial para expulsar grasa hepática.' },
    { term: 'salmon', name: 'Salmón / Pescado Azul', mechanism: 'Omega-3 EPA/DHA protector contra la fibrosis.' },
    { term: 'arandano', name: 'Arándanos Frescos', mechanism: 'Antocianinas que combaten la peroxidación lipídica.' },
    { term: 'palta', name: 'Palta / Aguacate Entero', mechanism: 'Grasas monoinsaturadas y glutatión protector.' },
    { term: 'aguacate', name: 'Aguacate Fresco', mechanism: 'Grasas saludables y fibra.' },
    { term: 'brocoli', name: 'Brócoli y Crucíferas', mechanism: 'Sulforafano que activa la detoxificación celular.' },
    { term: 'chia', name: 'Semillas de Chía', mechanism: 'Omega-3 vegetal y mucílagos saciantes.' },
    { term: 'cafe', name: 'Café Negro Sin Azúcar', mechanism: 'Ácido clorogénico con fuerte evidencia médica en MASLD.' }
  ];

  const detectedRed = redFlags.filter(f => textToScan.includes(f.term));
  const detectedYellow = yellowFlags.filter(f => textToScan.includes(f.term));
  const detectedGreen = greenFlags.filter(f => textToScan.includes(f.term));

  if (detectedRed.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'RED',
      verdict_title: 'ALERTA HEPÁTICA — No Recomendado en Esteatosis / Hígado Graso',
      clinical_advice: 'Contiene ingredientes o perfiles inductores de lipogénesis de novo o grasas hidrogenadas que sobrecargan el hepatocito.',
      detected_harmful_count: detectedRed.length,
      harmful_items: detectedRed.map(r => ({ name: r.name, risk: 'RED', mechanism: r.mechanism })),
      beneficial_items: [],
      healthy_swap: {
        product: 'Sustituto Protector Casero o Natural',
        reasoning: 'Optar por alimentos enteros con fibra intacta o cocinar versiones caseras libres de jarabes industriales.'
      },
      is_from_catalog: false
    };
  }

  if (detectedYellow.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'YELLOW',
      verdict_title: 'PRECAUCIÓN — Carga Glucémica o Ultraprocesamiento Moderado',
      clinical_advice: 'No se identificó JMAF directo, pero contiene almidones refinados o aditivos que pueden elevar la insulina y retrasar la reversión del hígado graso.',
      detected_harmful_count: detectedYellow.length,
      harmful_items: detectedYellow.map(y => ({ name: y.name, risk: 'YELLOW', mechanism: y.mechanism })),
      beneficial_items: [],
      healthy_swap: {
        product: 'Versión Integral No Refinada',
        reasoning: 'Priorizar cereales enteros y moderar las porciones para evitar picos de glucosa posprandial.'
      },
      is_from_catalog: false
    };
  }

  if (detectedGreen.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'GREEN',
      verdict_title: 'APROBADO & SEGURO — Alimento Protector Hepático',
      clinical_advice: 'Alimento alineado con la dieta mediterránea modificada para MASLD. Aporta antioxidantes y sustratos protectores celulares.',
      detected_harmful_count: 0,
      harmful_items: [],
      beneficial_items: detectedGreen.map(g => ({ name: g.name, mechanism: g.mechanism })),
      healthy_swap: null,
      is_from_catalog: false
    };
  }

  // Si no coincide con nada conocido pero el usuario escribió ingredientes
  if (ingredientsText.trim().length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'GREEN',
      verdict_title: 'APROBADO CONDICIONAL — Sin Inductores Críticos Detectados',
      clinical_advice: 'La lista de ingredientes no contiene menciones explícitas de JMAF, grasas trans ni maltodextrina. Apto para consumo moderado.',
      detected_harmful_count: 0,
      harmful_items: [],
      beneficial_items: [
        { name: 'Sin Jarabes Declarados', mechanism: 'No se identificó fructosa libre añadida.' }
      ],
      healthy_swap: null,
      is_from_catalog: false
    };
  }

  // Si solo escribió un nombre genérico no identificado
  return {
    product_name: productName || 'Alimento Analizado',
    traffic_light: 'YELLOW',
    verdict_title: 'REVISIÓN RECOMENDADA — Verifica la Etiqueta',
    clinical_advice: `No tenemos este alimento específico en el catálogo clínico de alta frecuencia. Te recomendamos verificar si en su etiqueta figura Jarabe de Maíz (JMAF), maltodextrina o grasas parcialmente hidrogenadas.`,
    detected_harmful_count: 0,
    harmful_items: [],
    beneficial_items: [],
    healthy_swap: {
      product: 'Ingrediente Fresco sin Empaquetar',
      reasoning: 'Los alimentos frescos sin código de barras son siempre la opción más segura para el hígado.'
    },
    is_from_catalog: false
  };
}
