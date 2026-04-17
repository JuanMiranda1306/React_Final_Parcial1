import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const COLORES_PORTADA = ['#dce8ff', '#ffecd8', '#e8f5e8', '#f5e8ff', '#fce8e8', '#e8f0ff'];

export default function ProductoCard({ producto, onEditar, onEliminar }) {
  const colorIndex = producto.id.charCodeAt(producto.id.length - 1) % COLORES_PORTADA.length;
  const colorPortada = COLORES_PORTADA[colorIndex];

  return (
    <View style={styles.card}>
      {/* Portada */}
      {producto.imagen ? (
        <Image source={{ uri: producto.imagen }} style={styles.portada} />
      ) : (
        <View style={[styles.portadaPlaceholder, { backgroundColor: colorPortada }]}>
          <Text style={styles.portadaEmoji}>📦</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{producto.nombre}</Text>

        <View style={styles.metaFila}>
          <Text style={styles.categoria}>{producto.categoria}</Text>
          <View style={styles.stockBadge}>
            <Text style={styles.stockTexto}>📦 {producto.cantidad} uds.</Text>
          </View>
        </View>

        <Text style={styles.precio}>${parseFloat(producto.precio).toFixed(2)}</Text>
      </View>

      {/* Acciones */}
      <View style={styles.acciones}>
        <TouchableOpacity style={styles.btnEditar} onPress={onEditar}>
          <Text style={styles.btnEditarTexto}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEliminar} onPress={onEliminar}>
          <Text style={styles.btnEliminarTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#e8e2d8',
    alignItems: 'center',
  },
  portada: { width: 60, height: 80, resizeMode: 'cover' },
  portadaPlaceholder: {
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portadaEmoji: { fontSize: 24 },
  info: { flex: 1, padding: 10, gap: 3 },
  titulo: { fontSize: 13, fontWeight: '600', color: '#1a1a2e' },
  metaFila: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  categoria: {
    fontSize: 10,
    color: '#6a47b5',
    backgroundColor: '#f0ebff',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: '500',
  },
  stockBadge: { backgroundColor: '#eaf6ee', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  stockTexto: { fontSize: 10, color: '#4a9a65' },
  precio: { fontSize: 15, fontWeight: '700', color: '#2d1b69', marginTop: 4 },
  acciones: { flexDirection: 'column', padding: 8, gap: 6 },
  btnEditar: {
    backgroundColor: '#f0ebff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  btnEditarTexto: { fontSize: 14 },
  btnEliminar: {
    backgroundColor: '#fff0f0',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  btnEliminarTexto: { fontSize: 14 },
});
