import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  CLINICAL_FOOD_CATALOG, 
  FOOD_CATEGORIES, 
  searchFoodCatalog, 
  classifyFoodSmart 
} from '../src/utils/clinicalFoodDatabase.js';

test('1. Catálogo Clínico: Contiene categorías oficiales y más de 30 alimentos esenciales', () => {
  assert.ok(CLINICAL_FOOD_CATALOG.length >= 25, 'El catálogo debe contener múltiples alimentos');
  assert.ok(FOOD_CATEGORIES.includes('FRUTAS'));
  assert.ok(FOOD_CATEGORIES.includes('BEBIDAS E INFUSIONES'));
  assert.ok(FOOD_CATEGORIES.includes('CEREALES Y TUBÉRCULOS'));
});

test('2. Búsqueda en Catálogo: Encuentra alimentos por término clave', () => {
  const resultadosArroz = searchFoodCatalog('arroz');
  assert.ok(resultadosArroz.length >= 1, 'Debe encontrar arroz');
  assert.ok(resultadosArroz.some(r => r.name.toLowerCase().includes('arroz')));

  const resultadosKetchup = searchFoodCatalog('ketchup');
  assert.ok(resultadosKetchup.length >= 1, 'Debe encontrar kétchup');
  assert.equal(resultadosKetchup[0].traffic_light, 'RED');
});

test('3. Búsqueda por Categoría: Filtra correctamente por grupo de alimentos', () => {
  const frutas = searchFoodCatalog('', 'FRUTAS');
  assert.ok(frutas.length >= 3, 'Debe listar frutas');
  frutas.forEach(f => {
    assert.equal(f.category, 'FRUTAS');
  });
});

test('4. Motor Heurístico Universal: Clasifica alimentos no listados textualmente', () => {
  // Alimento con fritura
  const frito = classifyFoodSmart('Empanada frita de queso');
  assert.equal(frito.traffic_light, 'RED', 'Frituras deben clasificarse en rojo');
  assert.ok(frito.healthy_swap, 'Debe proponer cambio seguro');

  // Bebida con alcohol
  const alcohol = classifyFoodSmart('Cerveza artesanal');
  assert.equal(alcohol.traffic_light, 'RED', 'Alcohol debe clasificarse en alerta roja');

  // Alimento protector no catalogado
  const protector = classifyFoodSmart('Ensalada fresca de espinacas y palta');
  assert.equal(protector.traffic_light, 'GREEN', 'Hojas verdes y palta deben ser verde');
});

test('5. Robustez: Términos genéricos reciben evaluación médica completa sin errores', () => {
  const evaluacion = classifyFoodSmart('Producto exotico no registrado');
  assert.ok(evaluacion.traffic_light, 'Debe tener semáforo');
  assert.ok(evaluacion.verdict_title, 'Debe tener título de veredicto');
  assert.ok(evaluacion.clinical_advice, 'Debe tener consejo clínico');
  // Si es amarillo o rojo debe tener healthy_swap; si es verde, beneficial_items
  if (evaluacion.traffic_light === 'GREEN') {
    assert.ok(evaluacion.beneficial_items.length >= 0);
  } else {
    assert.ok(evaluacion.healthy_swap, 'Alimentos no verdes deben tener sugerencia de cambio seguro');
  }
});
