/**
 * NutraLive - Base de Datos Canónica de Alimentos Clínicos & Filtro Hepático MASLD
 * Propiedad exclusiva de Mauricio Uribe Maldonado
 * 
 * Catálogo exhaustivo de alimentos con categorización clínica para Esteatosis Hepática / MASLD.
 * Incluye motor heurístico universal para clasificar cualquier alimento o plato escrito por el usuario.
 */

export const FOOD_CATEGORIES = [
  'TODAS',
  'FRUTAS',
  'VERDURAS',
  'LEGUMBRES',
  'CEREALES Y TUBÉRCULOS',
  'PESCADOS Y MARISCOS',
  'CARNES Y HUEVOS',
  'LÁCTEOS Y DERIVADOS',
  'GRASAS Y FRUTOS SECOS',
  'BEBIDAS E INFUSIONES',
  'DULCES, SALSAS Y SNACKS',
  'COMIDAS RÁPIDAS Y PLATOS'
];

export const CLINICAL_FOOD_CATALOG = [
  // =========================================================================
  // 🔴 1. BEBIDAS, JUGOS Y ALCOHOL (ALERTA ROJA)
  // =========================================================================
  {
    id: 'bebida-cola-regular',
    name: 'Bebida / Refresco Cola Regular',
    brand: 'Refrescos Masivos (Coca Cola, Pepsi, etc.)',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['coca', 'cola', 'pepsi', 'gaseosa', 'refresco', 'soda', 'bebida azucarada'],
    ingredients_raw: 'Agua carbonatada, jarabe de maíz de alta fructosa (JMAF) o azúcar de caña, colorante caramelo IV, ácido fosfórico, cafeína.',
    harmful_items: [
      { name: 'Jarabe de Maíz de Alta Fructosa (JMAF / HFCS-55)', risk: 'RED', mechanism: 'El 100% de la fructosa libre viaja al hígado; sobrecarga la fructoquinasa y genera lipogénesis de novo inmediata.' },
      { name: 'Colorante Caramelo IV', risk: 'YELLOW', mechanism: 'Promueve productos finales de glicación avanzada (AGEs) y estrés oxidativo hepático.' }
    ],
    clinical_advice: 'Una lata de 350ml contiene ~39g de azúcares libres. Es el inductor dietético número 1 de esteatosis hepática pediátrica y esteatohepatitis.',
    healthy_swap: {
      product: 'Agua Gasificada Natural con Rodajas de Limón o Menta Fresca',
      reasoning: 'Sensación burbujeante idéntica sin una sola molécula de fructosa líquida ni colorantes hepatotóxicos.'
    }
  },
  {
    id: 'nectar-jugo-en-caja',
    name: "Néctar o Jugo en Caja '100% Fruta' / Infantil",
    brand: 'Línea de Jugos Infantiles (Watts, Andina, etc.)',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['jugo', 'nectar', 'jugo en caja', 'concentrado de fruta', 'jugo de manzana', 'jugo de naranja envasado'],
    ingredients_raw: 'Agua, concentrado de fruta reconstituido (manzana/uva), jarabe de glucosa-fructosa, ácido cítrico, saborizantes, sucralosa.',
    harmful_items: [
      { name: 'Concentrado de Fruta Reconstituido (Fructosa Desnuda)', risk: 'RED', mechanism: 'Al eliminar la fibra celular vegetal, la fructosa se absorbe a velocidad crítica en el sistema portal.' }
    ],
    clinical_advice: 'El hígado no distingue entre fructosa de concentrado de manzana o jarabe de maíz. Causa el mismo pico esteatógeno hepático.',
    healthy_swap: {
      product: 'Fruta Entera con Cáscara (Manzana Verde o Pera) + Vaso de Agua Pura',
      reasoning: 'La matriz intacta de pectina y fibra retiene el azúcar y nutre las bacterias protectoras del eje intestino-hígado.'
    }
  },
  {
    id: 'jugo-naranja-exprimido',
    name: 'Jugo de Naranja Natural Exprimido (Sin Fibra)',
    brand: 'Preparación Casera / Cafeterías',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['jugo de naranja', 'zumo de naranja', 'naranja exprimida', 'jugo exprimido', 'zumo natural'],
    ingredients_raw: 'Jugo exprimido de 3 a 4 naranjas colado sin pulpa.',
    harmful_items: [
      { name: 'Sobrecarga de Fructosa Líquida Rápida (24-28g)', risk: 'RED', mechanism: 'Exprimir descarta la fibra y concentra el azúcar de 4 frutas en 1 vaso bebido en 2 minutos.' }
    ],
    clinical_advice: 'Aunque sea 100% natural, carece del freno fisiológico de la fibra. Provoca saturación esteatósica en el hepatocito.',
    healthy_swap: {
      product: 'Naranja Entera en Gajos con su Hollejo y Fibra Blanca',
      reasoning: 'Requiere masticación, ralentiza el vaciado gástrico y reduce en 80% la velocidad de llegada de fructosa al hígado.'
    }
  },
  {
    id: 'cerveza-tradicional',
    name: 'Cerveza Tradicional (Con Alcohol)',
    brand: 'Cervecerías Comerciales',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['cerveza', 'birra', 'lager', 'pilsen', 'ipa', 'cerveza rubia', 'cerveza negra'],
    ingredients_raw: 'Agua, malta de cebada, lúpulo, levadura cervecera, alcohol etílico (4.5% - 6.5% ABV).',
    harmful_items: [
      { name: 'Etanol / Alcohol Etílico', risk: 'RED', mechanism: 'Tóxico celular hepático directo. Se degrada a acetaldehído y bloquea la beta-oxidación de ácidos grasos.' },
      { name: 'Maltosa y Carbohidratos Fermentables', risk: 'RED', mechanism: 'Alto índice glucémico sumado al efecto sinérgico tóxico del etanol sobre las transaminasas.' }
    ],
    clinical_advice: 'En personas con hígado graso (MASLD), cualquier consumo de alcohol acelera drásticamente la transición hacia esteatohepatitis y fibrosis.',
    healthy_swap: {
      product: 'Agua Tónica Sin Azúcar con Rodaja de Pepino o Té Helado de Hibisco',
      reasoning: 'Refrescante, ligeramente amarga, 0% alcohol y rica en polifenoles protectores.'
    }
  },
  {
    id: 'vino-tinto-blanco',
    name: 'Vino Tinto o Blanco',
    brand: 'Viñas y Bodegas',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['vino', 'vino tinto', 'vino blanco', 'cabernet', 'merlot', 'carmenere', 'sauvignon'],
    ingredients_raw: 'Uvas fermentadas, sulfitos, alcohol etílico (12% - 14.5% ABV).',
    harmful_items: [
      { name: 'Carga de Etanol Concentrado', risk: 'RED', mechanism: 'Metabolismo dependiente de CYP2E1 que dispara especies reactivas de oxígeno (ROS) hepáticas.' }
    ],
    clinical_advice: 'El supuesto beneficio de los polifenoles no compensa el daño citotóxico del alcohol en un hígado con esteatosis ya diagnosticada.',
    healthy_swap: {
      product: 'Infusión Fría de Frutos Rojos y Arándanos Silvestres',
      reasoning: 'Concentración masiva de antocianinas y resveratrol sin un solo gramo de etanol.'
    }
  },
  {
    id: 'licores-destilados',
    name: 'Destilados y Licores Fuertes (Pisco, Ron, Whisky, Vodka)',
    brand: 'Destilerías',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['pisco', 'ron', 'whisky', 'vodka', 'tequila', 'gin', 'licor', 'trago', 'piscola'],
    ingredients_raw: 'Alcohol destilado (35% - 45% ABV), agua desmineralizada, conglutinantes.',
    harmful_items: [
      { name: 'Etanol de Alta Graduación', risk: 'RED', mechanism: 'Necrosis y balonamiento hepatocitario inmediato. Multiplica el riesgo de progresión a cirrosis.' }
    ],
    clinical_advice: 'Contraindicación médica absoluta en esteatosis hepática metabólica.',
    healthy_swap: {
      product: 'Kombucha Artesanal Sin Azúcar Residual o Agua Mineral con Limón',
      reasoning: 'Bebidas botánicas vivas sin toxicidad mitocondrial.'
    }
  },
  {
    id: 'bebida-energetica',
    name: 'Bebida Energética Azucarada',
    brand: 'Monster, Red Bull, etc.',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'RED',
    keywords: ['energetica', 'monster', 'red bull', 'bebida energizante', 'score'],
    ingredients_raw: 'Agua carbonatada, sacarosa, glucosa, taurina, cafeína, inositol, vitaminas B, colorantes.',
    harmful_items: [
      { name: 'Bombardeo Glucosa + Fructosa Líquida', risk: 'RED', mechanism: 'Carga masiva que dispara insulina e inhibe la lipólisis en menos de 10 minutos.' }
    ],
    clinical_advice: 'Aporta hasta 54g de azúcares por lata. Crítico en adolescentes con sospecha o diagnóstico de hígado graso.',
    healthy_swap: {
      product: 'Café Negro de Grano o Té Matcha Japonés con Hielo',
      reasoning: 'Cafeína pura y ácido clorogénico que estimulan la autofagia hepática sin azúcares.'
    }
  },

  // =========================================================================
  // 🟢 2. BEBIDAS PROTECTORAS (VERDES)
  // =========================================================================
  {
    id: 'agua-pura-mineral',
    name: 'Agua Pura / Mineral Sin Gas o Con Gas',
    brand: 'Agua Natural',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'GREEN',
    keywords: ['agua', 'agua mineral', 'agua pura', 'agua con gas', 'agua sin gas', 'h2o'],
    ingredients_raw: 'Agua 100% pura, minerales traza (calcio, magnesio, bicarbonato).',
    harmful_items: [],
    clinical_advice: 'Es el solvente metabólico primario. Una hidratación óptima (30-35 ml/kg) reduce la viscosidad biliar y apoya la detoxificación hepatocitaria.',
    healthy_swap: null
  },
  {
    id: 'cafe-negro-grano',
    name: 'Café Negro de Grano (Sin Azúcar Añadido)',
    brand: 'Café de Especialidad / Filtrado / Espresso',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'GREEN',
    keywords: ['cafe', 'cafe negro', 'espresso', 'cafe filtrado', 'americano', 'cafe en grano'],
    ingredients_raw: '100% café arábica tostado y molido infusionado en agua caliente.',
    harmful_items: [],
    clinical_advice: 'Avalado por la Asociación Europea para el Estudio del Hígado (EASL): 2 a 3 tazas al día reducen la fibrosis hepática y normalizan enzimas ALT.',
    healthy_swap: null
  },
  {
    id: 'te-verde-matcha',
    name: 'Té Verde / Té Matcha en Hebras',
    brand: 'Té Verde Natural',
    category: 'BEBIDAS E INFUSIONES',
    traffic_light: 'GREEN',
    keywords: ['te verde', 'matcha', 'te en hebras', 'sencha', 'infusion verde'],
    ingredients_raw: 'Hojas secas de Camellia sinensis ricas en catequinas (EGCG).',
    harmful_items: [],
    clinical_advice: 'Su galato de epigalocatequina (EGCG) es uno de los antioxidantes más potentes para reducir el estrés oxidativo en esteatohepatitis.',
    healthy_swap: null
  },

  // =========================================================================
  // 🔴 3. SALSAS, CONDIMENTOS Y DULCES (ALERTA ROJA)
  // =========================================================================
  {
    id: 'ketchup-tradicional',
    name: 'Kétchup Tradicional Comercial',
    brand: 'Salsas Industriales Masivas',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'RED',
    keywords: ['ketchup', 'catsup', 'salsa de tomate dulce', 'ketchut'],
    ingredients_raw: 'Concentrado de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre, jarabe de maíz regular, sal, cebolla en polvo, especias.',
    harmful_items: [
      { name: 'Jarabe de Maíz de Alta Fructosa (JMAF)', risk: 'RED', mechanism: 'Hasta 1/3 del envase es azúcar líquido; fuente primaria oculta de fructosa en niños.' },
      { name: 'Jarabe de Maíz de Glucosa', risk: 'RED', mechanism: 'Pico glucémico agudo que frena la quema de lípidos en el hígado.' }
    ],
    clinical_advice: 'Por cada cucharada sopera de kétchup, el niño consume el equivalente a un terrón entero de azúcar refinado con fructosa libre.',
    healthy_swap: {
      product: 'Salsa Casera de Tomates Frescos con Orégano y Aceite de Oliva Extra Virgen',
      reasoning: 'Rica en licopeno natural termo-biodisponible y polifenoles sin adición de azúcares.'
    }
  },
  {
    id: 'salsa-bbq-barbacoa',
    name: 'Salsa Barbacoa / BBQ Comercial',
    brand: 'Salsas Industriales',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'RED',
    keywords: ['bbq', 'barbacoa', 'salsa bbq', 'salsa barbacoa', 'sweet baby rays'],
    ingredients_raw: 'Jarabe de maíz de alta fructosa (JMAF), puré de tomate, vinagre, melaza, almidón modificado, sal, humo líquido, colorante caramelo.',
    harmful_items: [
      { name: 'JMAF como Primer Ingrediente', risk: 'RED', mechanism: 'Supera incluso al kétchup en porcentaje de fructosa libre por porción.' }
    ],
    clinical_advice: 'Contiene hasta un 45% de carbohidratos simples. Engañosamente consumida como salsa salada de carnes.',
    healthy_swap: {
      product: 'Chimichurri Casero de Perejil, Ajo, Limón y Aceite de Oliva Extra Virgen',
      reasoning: 'Cero carbohidratos, alto en clorofila y sulfuros protectores para los hepatocitos.'
    }
  },
  {
    id: 'sirope-jarabe-agave',
    name: 'Sirope o Miel de Agave Comercial',
    brand: 'Línea Tiendas Naturales / Dietéticas',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'RED',
    keywords: ['agave', 'sirope de agave', 'miel de agave', 'nectar de agave'],
    ingredients_raw: '100% jugo concentrado de agave azul hidrolizado térmicamente.',
    harmful_items: [
      { name: 'Fructosa Libre Ultra-Concentrada (75-85%)', risk: 'RED', mechanism: 'Posee mayor concentración de fructosa pura que el propio JMAF industrial.' }
    ],
    clinical_advice: 'Uno de los mayores fraudes de la alimentación saludable: su bajo índice glucémico se debe a que la fructosa no usa insulina pero intoxica el hígado.',
    healthy_swap: {
      product: 'Puré de Manzana Horneada con Canela de Ceilán o Frutos Rojos',
      reasoning: 'Dulzor natural acompañado de fibra que no sobrecarga la enzima fructoquinasa.'
    }
  },
  {
    id: 'galletas-rellenas-crema',
    name: 'Galletas Rellenas de Crema (Oreo, Tritón, etc.)',
    brand: 'Snacks y Galletas Masivas',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'RED',
    keywords: ['galletas', 'galleta', 'oreo', 'triton', 'galletas rellenas', 'galletas dulces'],
    ingredients_raw: 'Harina de trigo enriquecida, azúcar refinada, grasa vegetal parcialmente hidrogenada (trans), jarabe de glucosa-fructosa, cacao alcalinizado.',
    harmful_items: [
      { name: 'Grasas Vegetales Hidrogenadas (Trans)', risk: 'RED', mechanism: 'Estrés oxidativo en el retículo endoplasmático de los hepatocitos y fibrosis.' },
      { name: 'Jarabe de Glucosa-Fructosa', risk: 'RED', mechanism: 'Combustible directo para la síntesis de triglicéridos hepáticos.' }
    ],
    clinical_advice: 'Sinapsis de hiperpalatabilidad que fomenta consumo compulsivo y alza continua de transaminasas ALT/GGT.',
    healthy_swap: {
      product: 'Galletas Caseras de Avena, Plátano Machacado y Cacao 100% Puro',
      reasoning: 'Aportan betaglucanos de avena que quelan y expulsan el exceso de ácidos biliares.'
    }
  },
  {
    id: 'chocolate-leche-azucar',
    name: 'Chocolate de Leche Tradicional / Golosinas',
    brand: 'Chocolates Masivos (Sahne-Nuss, Trencito, etc.)',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'RED',
    keywords: ['chocolate', 'chocolate de leche', 'trencito', 'golosina', 'barra de chocolate'],
    ingredients_raw: 'Azúcar refinada, leche entera en polvo, manteca de cacao, pasta de cacao (28%), emulsionantes (lecitina de soya).',
    harmful_items: [
      { name: 'Más de 50% de Azúcar Blanca', risk: 'RED', mechanism: 'Escaso contenido de flavanoles protectores del cacao y alto impacto glucémico.' }
    ],
    clinical_advice: 'Es fundamental diferenciar entre el cacao auténtico (medicinal) y las golosinas azucaradas con sabor a chocolate.',
    healthy_swap: {
      product: 'Chocolate Negro con 85% a 90% de Cacao Puro Sin Azúcar',
      reasoning: 'Rico en teobromina y procianidinas que mejoran la sensibilidad hepática a la insulina.'
    }
  },
  {
    id: 'miel-de-abejas-pura',
    name: 'Miel de Abejas Pura o Industrial',
    brand: 'Miel de Campo / Apícola',
    category: 'DULCES, SALSAS Y SNACKS',
    traffic_light: 'YELLOW',
    keywords: ['miel', 'miel de abeja', 'miel pura', 'miel de ulmo'],
    ingredients_raw: '100% néctar floral recolectado por abejas (contiene ~40% fructosa y 30% glucosa).',
    harmful_items: [
      { name: 'Alta Proporción de Fructosa Libre (~40%)', risk: 'YELLOW', mechanism: 'Aunque contiene micronutrientes y enzimas, su fructosa impacta directamente en el hígado si hay esteatosis.' }
    ],
    clinical_advice: 'En personas con hígado graso activo debe restringirse estrictamente. Usar como máximo media cucharadita muy esporádica.',
    healthy_swap: {
      product: 'Canela de Ceilán en Polvo o Vainilla Natural',
      reasoning: 'Aporta sensación de calidez y dulzor sin aportar un solo gramo de fructosa libre.'
    }
  },

  // =========================================================================
  // 🟢 4. FRUTAS FRESCAS Y BENEFICIOSAS (VERDES Y AMARILLAS)
  // =========================================================================
  {
    id: 'manzana-entera-verde',
    name: 'Manzana Entera con Cáscara (Verde / Fuji)',
    brand: 'Fruta Fresca de Huerto',
    category: 'FRUTAS',
    traffic_light: 'GREEN',
    keywords: ['manzana', 'manzana verde', 'manzana roja', 'fuji', 'granny smith'],
    ingredients_raw: 'Manzana fresca entera con cáscara lavada (rica en pectina, agua y quercetina).',
    harmful_items: [],
    clinical_advice: 'La pectina celular encapsula el azúcar; su fermentación en el colon genera butirato que desinflama el parénquima hepático.',
    healthy_swap: null
  },
  {
    id: 'arandanos-frescos',
    name: 'Arándanos Silvestres / Frescos',
    brand: 'Fruta Fresca / Berries',
    category: 'FRUTAS',
    traffic_light: 'GREEN',
    keywords: ['arandano', 'arandanos', 'blueberries', 'mora', 'moras'],
    ingredients_raw: 'Arándanos frescos crudos (ricos en antocianinas y polifenoles).',
    harmful_items: [],
    clinical_advice: 'Superalimento hepático comprobado: inhibe la activación de las células estrelladas hepáticas que causan fibrosis en MASLD.',
    healthy_swap: null
  },
  {
    id: 'frutillas-fresas',
    name: 'Frutillas / Fresas Frescas Enteras',
    brand: 'Fruta Fresca / Berries',
    category: 'FRUTAS',
    traffic_light: 'GREEN',
    keywords: ['frutilla', 'frutillas', 'fresa', 'fresas', 'berries'],
    ingredients_raw: 'Frutillas enteras crudas (baja carga glucémica, alta vitamina C).',
    harmful_items: [],
    clinical_advice: 'Muy bajo contenido de fructosa por porción (menos de 4g por taza) y altísima concentración de ácido elágico antiinflamatorio.',
    healthy_swap: null
  },
  {
    id: 'palta-aguacate-hass',
    name: 'Palta / Aguacate Entero (Hass)',
    brand: 'Fruta Fresca / Grasas Saludables',
    category: 'FRUTAS',
    traffic_light: 'GREEN',
    keywords: ['palta', 'aguacate', 'palta hass', 'guacamole natural'],
    ingredients_raw: 'Pulpa de palta fresca rica en ácido oleico monoinsaturado, glutatión y potasio.',
    harmful_items: [],
    clinical_advice: 'Aporta glutatión, el antioxidante maestro del hígado. Disminuye la acumulación de lípidos hepáticos y mejora el perfil lipídico.',
    healthy_swap: null
  },
  {
    id: 'platano-maduro',
    name: 'Plátano / Banana Muy Maduro',
    brand: 'Fruta Tropical',
    category: 'FRUTAS',
    traffic_light: 'YELLOW',
    keywords: ['platano', 'banana', 'platano maduro'],
    ingredients_raw: 'Plátano maduro (el almidón resistente se convierte en glucosa y fructosa de rápida absorción).',
    harmful_items: [
      { name: 'Mayor Índice Glucémico al Madurar', risk: 'YELLOW', mechanism: 'Pierde almidón resistente y concentra azúcares simples.' }
    ],
    clinical_advice: 'Consumir preferentemente cuando la punta aún está ligeramente verde (almidón resistente protector) o acompañar con nueces.',
    healthy_swap: {
      product: 'Plátano Ligeramente Verde con Mantequilla de Almendras 100% Pura',
      reasoning: 'Aporta prebióticos que nutren la microbiota y aminoran el impacto en la glucosa en sangre.'
    }
  },
  {
    id: 'uvas-frescas',
    name: 'Uvas Dulces Frescas',
    brand: 'Fruta de Mesa',
    category: 'FRUTAS',
    traffic_light: 'YELLOW',
    keywords: ['uva', 'uvas', 'uvas verdes', 'uvas rojas', 'uva moscatel'],
    ingredients_raw: 'Uvas frescas enteras (alta concentración de azúcares simples por racimo: glucosa y fructosa).',
    harmful_items: [
      { name: 'Alta Carga de Azúcares Rápidos', risk: 'YELLOW', mechanism: 'Fácil de sobreconsumir; un racimo mediano aporta hasta 25g de azúcares de rápido paso portal.' }
    ],
    clinical_advice: 'Porcionar a un puñado pequeño (10-12 uvas) y nunca consumir en forma de jugo colado.',
    healthy_swap: {
      product: 'Taza de Frutillas o Arándanos con Nueces',
      reasoning: 'Misma frescura pero con la mitad de azúcares y triple de fibra protectora.'
    }
  },

  // =========================================================================
  // 🟢 5. VERDURAS Y HORTALIZAS (MÁXIMA PROTECCIÓN HEPÁTICA)
  // =========================================================================
  {
    id: 'brocoli-cruciferas',
    name: 'Brócoli al Vapor / Crucíferas (Coliflor, Coles)',
    brand: 'Hortalizas Frescas',
    category: 'VERDURAS',
    traffic_light: 'GREEN',
    keywords: ['brocoli', 'coliflor', 'cruciferas', 'repollo', 'coles de bruselas'],
    ingredients_raw: 'Brócoli fresco (rico en sulforafano, indol-3-carbinol y fibra insoluble).',
    harmful_items: [],
    clinical_advice: 'El sulforafano activa la vía Nrf2 que induce la síntesis de enzimas desintoxicantes de Fase II en el hepatocito.',
    healthy_swap: null
  },
  {
    id: 'espinacas-hojas-verdes',
    name: 'Espinacas Frescas / Acelgas / Rúcula',
    brand: 'Hojas Verdes de Huerto',
    category: 'VERDURAS',
    traffic_light: 'GREEN',
    keywords: ['espinaca', 'espinacas', 'acelga', 'rucula', 'lechuga', 'hojas verdes'],
    ingredients_raw: 'Hojas verdes oscuras ricas en clorofila, nitratos naturales, folatos y magnesio.',
    harmful_items: [],
    clinical_advice: 'Estimula la producción de óxido nítrico endotelial mejorando la microcirculación de las sinusoides hepáticas.',
    healthy_swap: null
  },
  {
    id: 'alcachofa-fresca',
    name: 'Alcachofa / Alcaucil Cocido',
    brand: 'Hortaliza Fresca',
    category: 'VERDURAS',
    traffic_light: 'GREEN',
    keywords: ['alcachofa', 'alcaucil', 'alcachofas'],
    ingredients_raw: 'Corazón y hojas de alcachofa (fuente extraordinaria de cinarina y ácido clorogénico).',
    harmful_items: [],
    clinical_advice: 'La cinarina promueve el flujo biliar (colerético y colagogo), facilitando la emulsión y expulsión de grasas.',
    healthy_swap: null
  },
  {
    id: 'tomate-fresco-casero',
    name: 'Tomate Fresco Maduro',
    brand: 'Huerto Tradicional',
    category: 'VERDURAS',
    traffic_light: 'GREEN',
    keywords: ['tomate', 'tomates', 'jitomate', 'tomate cherry'],
    ingredients_raw: 'Tomate fresco entero (fuente estelar de licopeno y vitamina C).',
    harmful_items: [],
    clinical_advice: 'El licopeno es un carotenoide que reduce la peroxidación de lípidos y protege la membrana de los hepatocitos.',
    healthy_swap: null
  },
  {
    id: 'ajo-cebolla-condimento',
    name: 'Ajo y Cebolla Frescos',
    brand: 'Condimentos Naturales',
    category: 'VERDURAS',
    traffic_light: 'GREEN',
    keywords: ['ajo', 'cebolla', 'cebollas', 'chalota', 'puerro'],
    ingredients_raw: 'Ajo y cebolla crudos o salteados suavemente en AOVE (ricos en alicina y quercetina).',
    harmful_items: [],
    clinical_advice: 'Compuestos azufrados que potencian la sulfatación hepática y reducen la síntesis endógena de colesterol LDL.',
    healthy_swap: null
  },

  // =========================================================================
  // 🟢 6. CEREALES, GRANOS Y TUBÉRCULOS (INTEGRALES VS REFINADOS)
  // =========================================================================
  {
    id: 'avena-integral-hojuelas',
    name: 'Avena Integral Tradicional en Hojuelas',
    brand: 'Cereal Integral Puro',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'GREEN',
    keywords: ['avena', 'avena integral', 'hojuelas de avena', 'porridge', 'quaker tradicional'],
    ingredients_raw: '100% granos de avena integral aplastados en hojuela (ricos en fibra soluble betaglucano).',
    harmful_items: [],
    clinical_advice: 'El betaglucano atrapa sales biliares en el intestino obligando al hígado a consumir sus propios depósitos de grasa.',
    healthy_swap: null
  },
  {
    id: 'arroz-integral-grano',
    name: 'Arroz Integral / Salvaje / Basmati Integral',
    brand: 'Granos Enteros',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'GREEN',
    keywords: ['arroz integral', 'arroz salvaje', 'arroz negro', 'grano entero'],
    ingredients_raw: 'Arroz con su salvado y germen intacto (rico en fibra, magnesio y tiamina).',
    harmful_items: [],
    clinical_advice: 'Absorción sostenida que previene los picos insulínicos característicos del arroz blanco pulido.',
    healthy_swap: null
  },
  {
    id: 'arroz-blanco-refinado',
    name: 'Arroz Blanco Pulido Tradicional',
    brand: 'Arroz Blanco Comercial',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'YELLOW',
    keywords: ['arroz blanco', 'arroz pulido', 'arroz de grano largo blanco'],
    ingredients_raw: 'Arroz pulido desprovisto de germen y salvado (almidón de absorción rápida).',
    harmful_items: [
      { name: 'Carga Glucémica Alta por Falta de Fibra', risk: 'YELLOW', mechanism: 'Genera elevación rápida de glucosa que activa la lipogénesis si se consume en porciones grandes.' }
    ],
    clinical_advice: 'Refrigerar tras cocinar (almidón retrógrado resistente) o acompañar siempre de abundantes verduras y aceite de oliva.',
    healthy_swap: {
      product: 'Arroz Blanco Enfriado 12h (Almidón Resistente) o Arroz Integral',
      reasoning: 'El enfriamiento transforma el almidón en prebiótico no digerible que no eleva la insulina.'
    }
  },
  {
    id: 'pan-blanco-industrial',
    name: 'Pan Blanco de Molde / Marraqueta Blanca',
    brand: 'Panaderías y Supermercados',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'RED',
    keywords: ['pan blanco', 'pan de molde blanco', 'marraqueta', 'pan hallulla', 'baguette blanco'],
    ingredients_raw: 'Harina de trigo ultra-refinada, agua, levadura, sal, jarabe de maíz o azúcar añadido (en panes de molde).',
    harmful_items: [
      { name: 'Harina Blanca Ultra-Refinada', risk: 'RED', mechanism: 'Índice glucémico cercano a 85; estimula la esteatosis hepática por hiperinsulinemia.' },
      { name: 'Jarabe de Maíz Oculto (en pan de molde)', risk: 'RED', mechanism: 'Añadido para mantener la esponjosidad industrial.' }
    ],
    clinical_advice: 'Es uno de los hábitos más difíciles de cortar en familias pero de mayor impacto clínico positivo al sustituir.',
    healthy_swap: {
      product: 'Pan 100% de Grano Entero Integral con Masa Madre Auténtica',
      reasoning: 'La fermentación ácida de masa madre reduce el índice glucémico y degrada los antinutrientes del grano.'
    }
  },
  {
    id: 'papas-fritas-comerciales',
    name: 'Papas Fritas Comerciales / Snacks de Bolsa',
    brand: 'Snacks Salados (Lay\'s, Pringles, etc.)',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'RED',
    keywords: ['papas fritas', 'patatas fritas', 'papas fritas de bolsa', 'snacks de papa', 'papas de fast food'],
    ingredients_raw: 'Papas, aceite vegetal refinado reutilizado (soya/palma), sal refinada, potenciadores de sabor (glutamato), acrilamida.',
    harmful_items: [
      { name: 'Aceites Vegetales Termo-Oxidados y Trans', risk: 'RED', mechanism: 'Provocan peroxidación lipídica masiva en las membranas de los hepatocitos.' },
      { name: 'Acrilamidas y Productos de Fritura', risk: 'RED', mechanism: 'Hepatotóxicos que aceleran la inflamación enzimática.' }
    ],
    clinical_advice: 'Combinación nefasta de almidón gelatinizado de alto IG con grasas degradadas por temperatura.',
    healthy_swap: {
      product: 'Bastones de Camote / Batata o Papa Horneados con Romero y Aceite de Oliva',
      reasoning: 'Horneados a temperatura media con grasa monoinsaturada estable y fibra intacta.'
    }
  },
  {
    id: 'papas-hervidas-naturales',
    name: 'Papa / Patata Hervida con Piel',
    brand: 'Tubérculo Fresco',
    category: 'CEREALES Y TUBÉRCULOS',
    traffic_light: 'YELLOW',
    keywords: ['papa', 'papas', 'patata', 'papa hervida', 'papa cocida'],
    ingredients_raw: 'Papas enteras hervidas en agua con su piel lavada.',
    harmful_items: [
      { name: 'Índice Glucémico Moderado a Alto si se come caliente', risk: 'YELLOW', mechanism: 'El almidón hidratado caliente se absorbe velozmente.' }
    ],
    clinical_advice: 'Consumir tibia o fría en ensalada campera con huevo duro y aceite de oliva para reducir el impacto glucémico.',
    healthy_swap: {
      product: 'Ensalada Campera de Papas Enfriadas con Huevo Duro, Atún y AOVE',
      reasoning: 'La proteína y la grasa saludable aplanan la curva de glucosa en sangre.'
    }
  },

  // =========================================================================
  // 🟢 7. PESCADOS, MARISCOS Y PROTEÍNAS PROTECTORAS
  // =========================================================================
  {
    id: 'salmon-pescado-azul',
    name: 'Salmón Fresco / Pescados Azules (Jurel, Sardinas)',
    brand: 'Pescadería Fresca / Enlatados al Natural',
    category: 'PESCADOS Y MARISCOS',
    traffic_light: 'GREEN',
    keywords: ['salmon', 'jurel', 'sardinas', 'pescado azul', 'atun al natural', 'omega 3'],
    ingredients_raw: 'Pescado graso salvaje o cultivado responsablemente (fuente de ácidos grasos EPA y DHA).',
    harmful_items: [],
    clinical_advice: 'Estudios clínicos demuestran que 2 a 3 porciones semanales de omega-3 disminuyen el contenido de grasa hepática y los niveles de ALT/AST.',
    healthy_swap: null
  },
  {
    id: 'atun-al-agua-conserva',
    name: 'Atún al Agua en Conserva',
    brand: 'Conservas de Pescado',
    category: 'PESCADOS Y MARISCOS',
    traffic_light: 'GREEN',
    keywords: ['atun', 'atun al agua', 'lomo de atun', 'atun en lata'],
    ingredients_raw: 'Lomo de atún, agua, sal de mesa.',
    harmful_items: [],
    clinical_advice: 'Proteína magra de altísimo valor biológico (sin grasas añadidas). Favorece la saciedad sin elevar la insulina.',
    healthy_swap: null
  },
  {
    id: 'pechuga-pollo-pavo',
    name: 'Pechuga de Pollo o Pavo a la Plancha',
    brand: 'Carnes Blancas Magras',
    category: 'CARNES Y HUEVOS',
    traffic_light: 'GREEN',
    keywords: ['pollo', 'pechuga de pollo', 'pavo', 'pechuga de pavo', 'pollo a la plancha'],
    ingredients_raw: 'Pechuga magra de pollo o pavo cocinada a la plancha o al horno con especias naturales.',
    harmful_items: [],
    clinical_advice: 'Proteína limpia para mantener la masa muscular (fundamental para combatir la resistencia periférica a la insulina).',
    healthy_swap: null
  },
  {
    id: 'huevo-entero-gallina',
    name: 'Huevo de Gallina Entero (con Yema)',
    brand: 'Huevos Frescos de Granja',
    category: 'CARNES Y HUEVOS',
    traffic_light: 'GREEN',
    keywords: ['huevo', 'huevos', 'huevo duro', 'huevo pochado', 'omelette', 'yema de huevo', 'colina'],
    ingredients_raw: 'Huevo entero fresco (fuente primordial de colina biodisponible, luteína y albúmina).',
    harmful_items: [],
    clinical_advice: 'La colina es un nutriente esencial para sintetizar VLDL y transportar la grasa FUERA del hígado. ¡Su déficit provoca hígado graso severo!',
    healthy_swap: null
  },
  {
    id: 'vienesas-salchichas-industriales',
    name: 'Vienesas / Salchichas / Embutidos Ultraprocesados',
    brand: 'Embutidos Masivos (San Jorge, PF, Llanquihue, etc.)',
    category: 'CARNES Y HUEVOS',
    traffic_light: 'RED',
    keywords: ['vienesa', 'vienesas', 'salchicha', 'salchichas', 'chorizo', 'longaniza', 'mortadela', 'pate'],
    ingredients_raw: 'Carne separada mecánicamente, cuero de cerdo, grasa de cerdo, agua, dextrosa, nitrito de sodio, polifosfatos, humo líquido.',
    harmful_items: [
      { name: 'Nitritos y Nitrosaminas Formadas', risk: 'RED', mechanism: 'Aumentan el estrés nitrosativo y dañan el ADN mitocondrial del hepatocito.' },
      { name: 'Grasas Saturadas Pro-Inflamatorias y Dextrosa', risk: 'RED', mechanism: 'Favorecen endotoxemia metabólica intestinal.' }
    ],
    clinical_advice: 'Consumo habitual estrictamente desaconsejado en pacientes pediátricos y adultos con MASLD.',
    healthy_swap: {
      product: 'Brochetas Caseras de Pechuga de Pollo Marinadas en Pimentón y Ajo',
      reasoning: 'Misma presentación atractiva pero con 100% carne real sin nitritos ni almidones.'
    }
  },
  {
    id: 'carne-vacuno-grasa',
    name: 'Carne de Vacuno Grasa / Cortes Parrilleros Grasos',
    brand: 'Carnicerías Tradicionales',
    category: 'CARNES Y HUEVOS',
    traffic_light: 'YELLOW',
    keywords: ['carne de vacuno', 'asado de tira', 'huachalomo', 'costillar', 'carne molida comun'],
    ingredients_raw: 'Cortes de vacuno con alto porcentaje de grasa intramuscular y externa (>20% lípidos saturados).',
    harmful_items: [
      { name: 'Exceso de Ácido Palmítico Saturado', risk: 'YELLOW', mechanism: 'Lipogenicidad elevada si se consume con frecuencia.' }
    ],
    clinical_advice: 'Priorizar cortes magros (posta negra, posta rosada, filete, lomo liso) y moderar porción a 1-2 veces por semana.',
    healthy_swap: {
      product: 'Posta Negra Magra o Filete de Vacuno a la Plancha',
      reasoning: 'Hierro hemo y zinc de alta biodisponibilidad con menos de un tercio de grasa saturada.'
    }
  },

  // =========================================================================
  // 🟢 8. LEGUMBRES (FIBRA TERAPÉUTICA)
  // =========================================================================
  {
    id: 'lentejas-guisadas',
    name: 'Lentejas Tradicionales Guisadas con Verduras',
    brand: 'Legumbres Secas Tradicionales',
    category: 'LEGUMBRES',
    traffic_light: 'GREEN',
    keywords: ['lentejas', 'lenteja', 'guiso de lentejas', 'sopa de lentejas'],
    ingredients_raw: 'Lentejas cocidas en caldo de verduras con cebolla, zanahoria, ajo y un toque de comino.',
    harmful_items: [],
    clinical_advice: 'Extraordinario aporte de fibra soluble prebiótica y hierro. Alimenta a Akkermansia muciniphila, bacteria protectora contra esteatosis.',
    healthy_swap: null
  },
  {
    id: 'garbanzos-hummus',
    name: 'Garbanzos Cocidos / Hummus Casero Tradicional',
    brand: 'Legumbres / Preparación Casera',
    category: 'LEGUMBRES',
    traffic_light: 'GREEN',
    keywords: ['garbanzos', 'garbanzo', 'hummus', 'pasta de garbanzo'],
    ingredients_raw: 'Garbanzos cocidos, tahini (sésamo), jugo de limón, ajo y aceite de oliva virgen extra.',
    harmful_items: [],
    clinical_advice: 'Índice glucémico ultra-bajo (IG ~28). Excelente opción saciante para reemplazar snacks ultraprocesados.',
    healthy_swap: null
  },
  {
    id: 'porotos-frijoles-negros',
    name: 'Porotos / Frijoles Negros Tradicionales',
    brand: 'Legumbres Frescas / Secas',
    category: 'LEGUMBRES',
    traffic_light: 'GREEN',
    keywords: ['porotos', 'frijoles', 'frijol', 'judias', 'alubias'],
    ingredients_raw: 'Porotos negros o granados cocidos al vapor o en guiso con calabaza/zapallo.',
    harmful_items: [],
    clinical_advice: 'Ricos en flavonoides y fibra que frenan la velocidad de absorción de azúcares en la comida.',
    healthy_swap: null
  },

  // =========================================================================
  // 🟢 9. LÁCTEOS Y DERIVADOS
  // =========================================================================
  {
    id: 'yogurt-griego-natural-sin-azucar',
    name: 'Yogurt Griego Auténtico Natural Sin Azúcar',
    brand: 'Lácteos Fermentados Vivos',
    category: 'LÁCTEOS Y DERIVADOS',
    traffic_light: 'GREEN',
    keywords: ['yogurt griego', 'yogur natural', 'yogurt natural', 'kefir', 'yogurt sin azucar'],
    ingredients_raw: 'Leche entera o descremada pasteurizada, cultivos lácticos vivos (L. bulgaricus, S. thermophilus). Cero azúcar añadida.',
    harmful_items: [],
    clinical_advice: 'Los probióticos vivos reducen la permeabilidad intestinal, impidiendo que los lipopolisacáridos bacterianos (LPS) lleguen al hígado e inflamen las células de Kupffer.',
    healthy_swap: null
  },
  {
    id: 'yogurt-saborizado-azucarado',
    name: "Yogurt Comercial Saborizado 'Batido' o Infantil",
    brand: 'Yogures Masivos (Soprole, Nestlé, etc.)',
    category: 'LÁCTEOS Y DERIVADOS',
    traffic_light: 'RED',
    keywords: ['yogurt con sabor', 'yogurt de frutilla', 'yogurt infantil', 'yogurt con cereal', 'chamyto', 'uno al dia'],
    ingredients_raw: 'Leche, azúcar refinada (12-16g por pote), jarabe de glucosa, almidón modificado, saborizantes artificiales, colorante carmín.',
    harmful_items: [
      { name: 'Azúcar Añadido Masivo (Hasta 4 cucharaditas por pote)', risk: 'RED', mechanism: 'Transforma un alimento potencialmente saludable en un postre pro-esteatógeno.' }
    ],
    clinical_advice: 'Gran trampa dietética infantil: los padres creen dar calcio y salud, pero están administrando azúcar libre diario.',
    healthy_swap: {
      product: 'Yogurt Griego Natural al que tú mismo le agregas Frutillas Frescas o Arándanos',
      reasoning: 'Obtienes los probióticos sin un solo gramo de jarabes industriales.'
    }
  },
  {
    id: 'quesillo-queso-fresco',
    name: 'Quesillo / Queso Fresco / Ricotta Magra',
    brand: 'Lácteos Frescos',
    category: 'LÁCTEOS Y DERIVADOS',
    traffic_light: 'GREEN',
    keywords: ['quesillo', 'queso fresco', 'ricotta', 'queso cottage'],
    ingredients_raw: 'Leche pasteurizada, cuajo, sal baja.',
    harmful_items: [],
    clinical_advice: 'Alta proteína de caseína y suero sin concentración excesiva de grasas saturadas ni sodio.',
    healthy_swap: null
  },
  {
    id: 'queso-maduro-amarillo',
    name: 'Queso Amarillo Maduro (Chanco, Gouda, Cheddar)',
    brand: 'Queserías',
    category: 'LÁCTEOS Y DERIVADOS',
    traffic_light: 'YELLOW',
    keywords: ['queso mantecoso', 'queso chanco', 'queso gouda', 'queso cheddar', 'queso amarillo'],
    ingredients_raw: 'Leche entera, cultivos, cuajo, sal, colorante annatto (alto contenido de grasa láctea concentrada ~30%).',
    harmful_items: [
      { name: 'Grasas Saturadas Concentradas y Sodio', risk: 'YELLOW', mechanism: 'Aporte calórico denso; no contiene azúcares pero requiere moderación en MASLD.' }
    ],
    clinical_advice: 'Consumo aceptable en porciones moderadas (una lámina de 30g). No abusar en pacientes con sobrepeso esteatógeno.',
    healthy_swap: {
      product: 'Quesillo Fresco o Queso de Cabra Tradicional',
      reasoning: 'Grasas de cadena media más fáciles de metabolizar y menor impacto calórico.'
    }
  },

  // =========================================================================
  // 🟢 10. GRASAS SALUDABLES Y FRUTOS SECOS
  // =========================================================================
  {
    id: 'aceite-oliva-extra-virgen',
    name: 'Aceite de Oliva Virgen Extra (AOVE)',
    brand: 'Prensado en Frío',
    category: 'GRASAS Y FRUTOS SECOS',
    traffic_light: 'GREEN',
    keywords: ['aceite de oliva', 'aove', 'oliva extra virgen', 'aceite de oliva prensado en frio'],
    ingredients_raw: '100% zumo de aceitunas extraído mecánicamente en frío (ácido oleico y oleocanthal).',
    harmful_items: [],
    clinical_advice: 'Pilar de la dieta mediterránea: el oleocanthal tiene propiedades antiinflamatorias comparables al ibuprofeno celular en el hígado.',
    healthy_swap: null
  },
  {
    id: 'nueces-de-nogal',
    name: 'Nueces de Nogal Crudas',
    brand: 'Frutos Secos Naturales',
    category: 'GRASAS Y FRUTOS SECOS',
    traffic_light: 'GREEN',
    keywords: ['nueces', 'nuez', 'frutos secos', 'walnuts'],
    ingredients_raw: 'Nueces crudas sin sal ni tostar (ricas en ácido alfa-linolénico ALA y polifenoles).',
    harmful_items: [],
    clinical_advice: 'Un puñado diario (30g) mejora notablemente las enzimas hepáticas en personas con MASLD sin producir aumento de peso.',
    healthy_swap: null
  },
  {
    id: 'margarina-industrial-trans',
    name: 'Margarina Untable Industrial',
    brand: 'Grasas Vegetales Industriales',
    category: 'GRASAS Y FRUTOS SECOS',
    traffic_light: 'RED',
    keywords: ['margarina', 'margarinas', 'grasa vegetal para untar', 'manteca vegetal'],
    ingredients_raw: 'Aceites vegetales interesterificados o parcialmente hidrogenados, agua, sal, emulsionantes, aromatizantes artificiales.',
    harmful_items: [
      { name: 'Grasas Interesterificadas y Trans Ocultas', risk: 'RED', mechanism: 'Alteran la fluidez de las membranas mitocondriales hepáticas y promueven esteatohepatitis.' }
    ],
    clinical_advice: 'Eliminar completamente de la despensa. Es un ultraprocesado sintético pro-inflamatorio.',
    healthy_swap: {
      product: 'Palta / Aguacate Machacado con Sal Marina o Mantequilla Pura de Pastoreo',
      reasoning: 'Grasa celular natural de alta biodisponibilidad sin procesos químicos industriales.'
    }
  },

  // =========================================================================
  // 🔴 11. COMIDAS RÁPIDAS Y PLATOS FRECUENTES
  // =========================================================================
  {
    id: 'pizza-comercial-delivery',
    name: 'Pizza Comercial de Delivery / Congelada',
    brand: 'Cadenas de Pizza Fast Food',
    category: 'COMIDAS RÁPIDAS Y PLATOS',
    traffic_light: 'RED',
    keywords: ['pizza', 'pizzas', 'pizza delivery', 'pizza congelada', 'pepperoni'],
    ingredients_raw: 'Masa de harina blanca refinada con azúcar, salsa de tomate comercial con almidón, queso análogo procesado, embutidos (pepperoni/jamón procesado).',
    harmful_items: [
      { name: 'Suma Crítica: Harina Refinada + Grasas Saturadas + Azúcar en Salsa', risk: 'RED', mechanism: 'Bomba calórica y glucémica que satura las vías oxidativas del hepatocito por más de 12 horas.' }
    ],
    clinical_advice: 'Dispara triglicéridos posprandiales inmediatos. Inductor frecuente de transaminasas elevadas en controles de rutina.',
    healthy_swap: {
      product: 'Pizza Casera con Base de Pollo o Avena, Salsa de Tomate Natural y Quesillo',
      reasoning: '100% fibra y proteína real sin harinas blancas refinadas ni embutidos con nitritos.'
    }
  },
  {
    id: 'hamburguesa-fast-food',
    name: 'Hamburguesa de Comida Rápida con Papas y Bebida',
    brand: 'Cadenas Masivas de Comida Rápida',
    category: 'COMIDAS RÁPIDAS Y PLATOS',
    traffic_light: 'RED',
    keywords: ['hamburguesa', 'combo', 'fast food', 'mcdonalds', 'burger', 'whopper'],
    ingredients_raw: 'Carne picada con aditivos y grasa, pan con jarabe de maíz, mayonesa industrial, kétchup con JMAF, papas fritas y bebida azucarada.',
    harmful_items: [
      { name: 'Combo Hiper-Esteatógeno Completo', risk: 'RED', mechanism: 'Concentra JMAF, grasas trans, sodio extremo y harinas refinadas en una sola ingesta.' }
    ],
    clinical_advice: 'El menú de comida rápida es el paradigma del síndrome metabólico pediátrico moderno.',
    healthy_swap: {
      product: 'Hamburguesa Casera de Carne Magra en Pan Integral con Ensalada Fresca',
      reasoning: 'Proteína pura, hierro y fibra saciante sin jarabes ni aceites de fritura quemados.'
    }
  },
  {
    id: 'sushi-frito-cream-cheese',
    name: 'Sushi Frito / Tempura con Queso Crema y Teriyaki',
    brand: 'Restaurantes y Delivery de Sushi Masivo',
    category: 'COMIDAS RÁPIDAS Y PLATOS',
    traffic_light: 'RED',
    keywords: ['sushi', 'handroll', 'tempura', 'rolls fritos', 'salsa teriyaki'],
    ingredients_raw: 'Arroz blanco con vinagre azucarado (mirin/azúcar), frito en panko con aceite caliente, relleno de queso crema alto en grasa, bañado en salsa teriyaki con jarabe.',
    harmful_items: [
      { name: 'Arroz con Azúcar Añadido + Fritura Panko', risk: 'RED', mechanism: 'Falso alimento sano: aporta más calorías e índice glucémico que una hamburguesa tradicional.' },
      { name: 'Salsa Teriyaki Dulce (JMAF / Azúcar Líquido)', risk: 'RED', mechanism: 'Jarabe azucarado camuflado como aderezo japonés.' }
    ],
    clinical_advice: 'El sushi occidentalizado pierde todas las virtudes del pescado fresco tradicional.',
    healthy_swap: {
      product: 'Sashimi de Salmón Fresco con Ensalada de Pepino y Palta al Sésamo',
      reasoning: 'Omega-3 de máxima pureza, fibra y grasas monoinsaturadas con 0% azúcares refinados.'
    }
  }
];

/**
 * Normaliza cadenas de búsqueda para comparaciones insensibles a mayúsculas y acentos.
 */
function normalizeQuery(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Busca alimentos en el catálogo por nombre, categoría o ingredientes.
 * @param {string} query - Término de búsqueda
 * @param {string} categoryFilter - Categoría ('TODAS' o nombre de categoría)
 * @param {string} trafficLightFilter - Semáforo ('ALL', 'RED', 'YELLOW', 'GREEN')
 * @returns {Array<object>}
 */
export function searchFoodCatalog(query = '', categoryFilter = 'TODAS', trafficLightFilter = 'ALL') {
  const norm = normalizeQuery(query);

  let results = CLINICAL_FOOD_CATALOG;

  // Filtrar por semáforo si aplica
  if (trafficLightFilter && trafficLightFilter !== 'ALL') {
    results = results.filter(f => f.traffic_light === trafficLightFilter);
  }

  // Filtrar por categoría si aplica
  if (categoryFilter && categoryFilter !== 'TODAS') {
    results = results.filter(f => normalizeQuery(f.category) === normalizeQuery(categoryFilter));
  }

  // Si no hay texto de búsqueda, retornar la lista filtrada
  if (!norm) {
    return results;
  }

  // Búsqueda inteligente por coincidencia de palabras clave, nombre, marca y categoría
  return results.filter(f => {
    const normName = normalizeQuery(f.name);
    const normBrand = normalizeQuery(f.brand);
    const normCat = normalizeQuery(f.category);
    const normKeywords = f.keywords ? f.keywords.map(k => normalizeQuery(k)) : [];

    if (normName.includes(norm)) return true;
    if (normBrand.includes(norm)) return true;
    if (normCat.includes(norm)) return true;
    if (normKeywords.some(k => k.includes(norm) || norm.includes(k))) return true;

    // Búsqueda por palabras individuales (longitud >= 3 caracteres)
    const words = norm.split(/\s+/).filter(w => w.length >= 3);
    if (words.length > 0 && words.some(w => normName.includes(w) || normKeywords.some(k => k.includes(w)))) {
      return true;
    }

    return false;
  });
}

/**
 * Clasifica CUALQUIER alimento o plato mediante catálogo exacto o motor heurístico clínico universal.
 * Garantiza que ninguna búsqueda quede sin acción o sin veredicto.
 * 
 * @param {string} productName
 * @param {string} ingredientsText
 * @returns {object}
 */
export function classifyFoodSmart(productName = '', ingredientsText = '') {
  const nameNorm = normalizeQuery(productName);
  const ingNorm = normalizeQuery(ingredientsText);
  const fullText = `${nameNorm} ${ingNorm}`.trim();

  // 1. Intentar encontrar coincidencia directa en el catálogo clínico
  if (nameNorm) {
    const catalogMatches = searchFoodCatalog(productName);
    if (catalogMatches.length > 0) {
      // Priorizar la mejor coincidencia
      const match = catalogMatches[0];

      return {
        product_name: match.name,
        brand: match.brand,
        category: match.category,
        traffic_light: match.traffic_light,
        verdict_title:
          match.traffic_light === 'RED'
            ? 'ALERTA HEPÁTICA — No Recomendado en Esteatosis / Hígado Graso (MASLD)'
            : match.traffic_light === 'YELLOW'
            ? 'PRECAUCIÓN — Carga Glucémica o Procesamiento Moderado'
            : 'APROBADO & SEGURO — Alimento Protector Hepático',
        clinical_advice: match.clinical_advice,
        detected_harmful_count: match.harmful_items ? match.harmful_items.length : 0,
        harmful_items: match.harmful_items || [],
        beneficial_items: match.traffic_light === 'GREEN' ? [
          { name: 'Matriz Nutricional Protectora', mechanism: match.clinical_advice }
        ] : [],
        healthy_swap: match.healthy_swap,
        ingredients_raw: match.ingredients_raw,
        is_from_catalog: true,
        catalog_id: match.id
      };
    }
  }

  // 2. MOTOR HEURÍSTICO CLÍNICO UNIVERSAL (Para alimentos no listados textualmente)
  // Evalúa perfiles fisiopatológicos por patrones léxicos y toxicológicos en el hígado
  const redRules = [
    { pattern: /\b(alcohol|cerveza|vino|pisco|ron|whisky|vodka|tequila|gin|licor|trago|piscola|champagne|espumante)\b/i, name: 'Alcohol / Etanol Hepato-Tóxico', mechanism: 'Tóxico celular directo. Bloquea la beta-oxidación mitocondrial y precipita esteatohepatitis y fibrosis.' },
    { pattern: /\b(jmaf|hfcs|fructosa|jarabe de maiz|jarabe de glucosa|sirope|agave|concentrado de fruta)\b/i, name: 'Fructosa Libre o Jarabe Concentrado (JMAF)', mechanism: 'Satura la fructoquinasa hepática en menos de 20 minutos; activa la lipogénesis de novo inmediata.' },
    { pattern: /\b(frito|frita|frituras|apanado|rebozado|crispy|chicharron|tempura|panko|nugget|nuggets)\b/i, name: 'Fritura y Grasas Termo-Oxidadas', mechanism: 'Aceites sometidos a alta temperatura que generan aldehídos tóxicos y aumentan transaminasas ALT/GGT.' },
    { pattern: /\b(trans|parcialmente hidrogenado|hidrogenado|margarina|grasa vegetal hidrogenada)\b/i, name: 'Grasas Vegetales Trans / Hidrogenadas', mechanism: 'Inducen estrés en el retículo endoplasmático de los hepatocitos y aumentan la resistencia a la insulina.' },
    { pattern: /\b(gaseosa|refresco|bebida azucarada|soda|monster|red bull|energetica|nectar|jugo en caja)\b/i, name: 'Bebida Azucarada Líquida de Absorción Inmediata', mechanism: 'Líquidos de absorción portal masiva que sobrecargan de inmediato la capacidad metabólica del hígado.' },
    { pattern: /\b(ketchup|catsup|bbq|salsa barbacoa|salsa agridulce|teriyaki)\b/i, name: 'Salsa Industrial Densificada con Jarabes Azucarados', mechanism: 'Aporta hasta un 35% de su peso en azúcares libres encubiertos.' },
    { pattern: /\b(galleta|galletas|oreo|triton|chocman|golosina|caramelo|dulce de leche|manjar|nutella|helado|torta|pastel|queque|dona|donas|croissant|hojaldre)\b/i, name: 'Ultraprocesado Dulce de Alta Densidad y Harinas Refinadas', mechanism: 'Provoca hiperinsulinemia reactiva y acumulación continua de gotas lipídicas en el hepatocito.' },
    { pattern: /\b(vienesa|vienesas|salchicha|salchichas|chorizo|longaniza|mortadela|pate|embutido|embutidos|tocino|bacon)\b/i, name: 'Embutidos y Carnes Procesadas con Nitritos', mechanism: 'Aportan grasas saturadas pro-inflamatorias y conservantes nitrosados que dañan la función mitocondrial.' },
    { pattern: /\b(pizza|hamburguesa fast food|completo|italiano|chacarero|lomito mayo|fast food|comida rapida)\b/i, name: 'Comida Rápida Ultra-Calórica y Mezcla Almidón-Grasa', mechanism: 'Satura simultáneamente los receptores de lipoproteínas y dispara triglicéridos posprandiales por más de 12 horas.' }
  ];

  const yellowRules = [
    { pattern: /\b(arroz blanco|fideos blancos|pasta blanca|pure de papas|papa cocida|papas hervidas|pan blanco|marraqueta|hallulla|baguette)\b/i, name: 'Almidón Refinado de Alto Índice Glucémico', mechanism: 'Se descompone velozmente en glucosa, elevando la insulina y frenando la autofagia hepática.' },
    { pattern: /\b(queso maduro|queso chanco|queso mantecoso|queso amarillo|queso gouda|crema de leche|mantequilla|leche entera)\b/i, name: 'Lácteo Alto en Grasas Saturadas', mechanism: 'Requiere moderación de porciones para no exceder el balance calórico ni sobrecargar la bilis.' },
    { pattern: /\b(carne grasa|asado de tira|costillar|lomo vetado|carne de cerdo grasa)\b/i, name: 'Corte de Carne Graso', mechanism: 'Alta concentración de ácido palmítico saturado que favorece la esteatosis si el consumo es frecuente.' },
    { pattern: /\b(miel|azucar morena|azucar rubia|panela|chancaca)\b/i, name: 'Azúcares Naturales Concentrados', mechanism: 'Poseen fructosa natural pero libre; en MASLD debe limitarse estrictamente su empleo diario.' },
    { pattern: /\b(uva|uvas|mango|platano maduro|higos|fruta deshidratada|pasas)\b/i, name: 'Fruta Tropical o Deshidratada de Alta Concentración Glucémica', mechanism: 'Mayor concentración de azúcares por porción; debe acompañarse siempre de frutos secos o proteína.' }
  ];

  const greenRules = [
    { pattern: /\b(avena|betaglucano|quinoa|arroz integral|grano entero|salvado)\b/i, name: 'Cereales Integrales Ricos en Fibra Soluble', mechanism: 'Atrapan sales biliares y ralentizan el paso de glucosa al torrente sanguíneo.' },
    { pattern: /\b(brocoli|coliflor|espinaca|acelga|lechuga|rucula|alcachofa|esparrago|apio|pepino|calabacin|zapallo italiano)\b/i, name: 'Verduras y Crucíferas Desintoxicantes', mechanism: 'Aportan sulforafano, folatos y agua biológica que estimulan la fase II de desintoxicación hepática.' },
    { pattern: /\b(salmon|jurel|sardina|atun|pescado azul|pescado blanco|merluza|reineta|marisco|camaron)\b/i, name: 'Proteínas Marinas y Omega-3 Antiinflamatorio', mechanism: 'Los ácidos grasos EPA y DHA desactivan factores de transcripción lipogénicos (SREBP-1c).' },
    { pattern: /\b(huevo|huevos|colina|yema)\b/i, name: 'Colina y Proteínas de Alto Valor Biológico', mechanism: 'Nutriente imprescindible para que el hígado fabrique VLDL y pueda evacuar sus reservas de grasa.' },
    { pattern: /\b(oliva|aove|aceite de oliva|palta|aguacate|nuez|nueces|almendra|almendras|chia|linaza)\b/i, name: 'Grasas Monoinsaturadas y Antioxidantes', mechanism: 'Ácido oleico y polifenoles que combaten la inflamación de las células endoteliales hepáticas.' },
    { pattern: /\b(lenteja|lentejas|garbanzo|garbanzos|poroto|porotos|frijol|frijoles)\b/i, name: 'Legumbres y Fibra Prebiótica', mechanism: 'Nutren bacterias intestinales beneficiosas que fortalecen la barrera mucosa y cuidan el hígado.' },
    { pattern: /\b(manzana|arandano|arandanos|frutilla|frutillas|fresa|fresas|frambuesa|limon|kiwi|pera)\b/i, name: 'Frutas Ricas en Pectina y Polifenoles Protectores', mechanism: 'Antioxidantes que previenen la peroxidación de lípidos celulares.' },
    { pattern: /\b(cafe|te verde|matcha|infusion|agua mineral|agua pura)\b/i, name: 'Bebidas Hepato-Protectoras', mechanism: 'Ácido clorogénico y catequinas con amplia evidencia científica en reversión de MASLD.' },
    { pattern: /\b(yogurt natural|yogur natural|yogurt griego|kefir|quesillo|queso fresco|cottage)\b/i, name: 'Lácteos Fermentados y Probióticos', mechanism: 'Microbiota activa que frena la translocación de toxinas al sistema venoso portal.' }
  ];

  // Ejecutar escaneo de reglas
  const matchedRed = redRules.filter(r => r.pattern.test(fullText));
  const matchedYellow = yellowRules.filter(r => r.pattern.test(fullText));
  const matchedGreen = greenRules.filter(r => r.pattern.test(fullText));

  // Decisión de Semáforo
  if (matchedRed.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'RED',
      verdict_title: 'ALERTA HEPÁTICA — No Recomendado en Esteatosis / Hígado Graso (MASLD)',
      clinical_advice: 'Contiene inductores activos de esteatosis hepática (como fructosa rápida, alcohol, grasas trans o harinas ultra-procesadas) que estimulan la acumulación de triglicéridos en los hepatocitos.',
      detected_harmful_count: matchedRed.length,
      harmful_items: matchedRed.map(r => ({ name: r.name, risk: 'RED', mechanism: r.mechanism })),
      beneficial_items: [],
      healthy_swap: {
        product: 'Sustituto Natural Casero Rico en Fibra y Antioxidantes',
        reasoning: 'Optar por alimentos frescos no envasados, preparados al vapor o a la plancha con aceite de oliva extra virgen y fruta entera con piel.'
      },
      is_from_catalog: false
    };
  }

  if (matchedYellow.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'YELLOW',
      verdict_title: 'PRECAUCIÓN — Carga Glucémica o Procesamiento Moderado',
      clinical_advice: 'No contiene toxinas agudas como JMAF o alcohol, pero posee densidad energética o carga glucémica que puede frenar la quema de grasa hepática si se consume sin control de porción.',
      detected_harmful_count: matchedYellow.length,
      harmful_items: matchedYellow.map(y => ({ name: y.name, risk: 'YELLOW', mechanism: y.mechanism })),
      beneficial_items: [],
      healthy_swap: {
        product: 'Alternativa Integral o Combinación con Proteína y Fibra',
        reasoning: 'Reemplazar por granos enteros (quinoa, avena integral) o acompañar siempre de ensaladas verdes y grasa saludable para aplanar el pico de glucosa.'
      },
      is_from_catalog: false
    };
  }

  if (matchedGreen.length > 0) {
    return {
      product_name: productName || 'Alimento Analizado',
      traffic_light: 'GREEN',
      verdict_title: 'APROBADO & SEGURO — Alimento Protector Hepático',
      clinical_advice: 'Alimento alineado con la dieta mediterránea terapéutica para MASLD. Aporta sustratos bioactivos (omega-3, colina, polifenoles o fibra soluble) que apoyan la función y regeneración del hígado.',
      detected_harmful_count: 0,
      harmful_items: [],
      beneficial_items: matchedGreen.map(g => ({ name: g.name, mechanism: g.mechanism })),
      healthy_swap: null,
      is_from_catalog: false
    };
  }

  // Si el usuario ingresó ingredientes crudos pero ninguna regla coincidió
  if (ingredientsText.trim().length > 0) {
    return {
      product_name: productName || 'Producto Analizado por Etiqueta',
      traffic_light: 'GREEN',
      verdict_title: 'APROBADO CONDICIONAL — Sin Alertas Críticas Declaradas',
      clinical_advice: 'En la lista de ingredientes analizada no figuran jarabes de maíz (JMAF), grasas trans hidrogenadas ni azúcares simples evidentes. Es apto para consumo moderado.',
      detected_harmful_count: 0,
      harmful_items: [],
      beneficial_items: [
        { name: 'Libre de JMAF y Grasas Trans Identificadas', mechanism: 'No se encontraron inductores industriales directos de esteatosis hepática.' }
      ],
      healthy_swap: null,
      is_from_catalog: false
    };
  }

  // Si solo escribió un nombre genérico no reconocido por el diccionario
  return {
    product_name: productName || 'Alimento Consultado',
    traffic_light: 'YELLOW',
    verdict_title: 'EVALUACIÓN CLÍNICA GENERAL — Verifica su Preparación',
    clinical_advice: `Para ${productName || 'este alimento'}, la recomendación clínica consiste en verificar que no contenga azúcares líquidos añadidos (JMAF, sacarosa) ni haya sido frito en aceites industriales reutilizados. Si es una preparación casera con ingredientes frescos, su consumo es seguro.`,
    detected_harmful_count: 0,
    harmful_items: [],
    beneficial_items: [
      { name: 'Guía de Consumo Consciente', mechanism: 'Priorizar cocción al horno, vapor o plancha y evitar salsas industriales dulces.' }
    ],
    healthy_swap: {
      product: 'Versión Casera al Vapor o a la Plancha con Aceite de Oliva Extra Virgen',
      reasoning: 'Preparar en casa garantiza el control absoluto de azúcares ocultos y grasas termo-oxidadas.'
    },
    is_from_catalog: false
  };
}
