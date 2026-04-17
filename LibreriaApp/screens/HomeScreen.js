import { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView,
} from 'react-native';
import ProductoCard from '../components/ProductoCard';

const CATEGORIAS = ['Todos', 'Electrónica', 'Alimentos', 'Limpieza', 'Ropa', 'Otros'];

export default function HomeScreen({ navigation }) {
  const [productos, setProductos] = useState([
    {
      id: '1', nombre: 'Laptop Dell Inspiron',
      precio: '15500', cantidad: '12', categoria: 'Electrónica', imagen: null,
    },
    {
      id: '2', nombre: 'Manzanas (1kg)',
      precio: '45', cantidad: '50', categoria: 'Alimentos', imagen: null,
    },
    {
      id: '3', nombre: 'Detergente Líquido',
      precio: '150', cantidad: '20', categoria: 'Limpieza', imagen: null,
    },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
    return coincideBusqueda && coincideCategoria;
  });

  const guardarProducto = (nuevoProducto) => {
    if (nuevoProducto.id) {
      setProductos((prev) =>
        prev.map((p) => (p.id === nuevoProducto.id ? nuevoProducto : p))
      );
    } else {
      setProductos((prev) => [
        ...prev,
        { ...nuevoProducto, id: Date.now().toString() },
      ]);
    }
  };

  const eliminarProducto = (id) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setProductos((prev) => prev.filter((p) => p.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar por nombre..."
          placeholderTextColor="#aaa"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Filtro por categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasScroll}
        contentContainerStyle={styles.categoriasContent}
      >
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoriaChip,
              categoriaActiva === cat && styles.categoriaChipActiva,
            ]}
            onPress={() => setCategoriaActiva(cat)}
          >
            <Text
              style={[
                styles.categoriaTexto,
                categoriaActiva === cat && styles.categoriaTextoActiva,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contador */}
      <Text style={styles.contador}>
        {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
      </Text>

      {/* Lista */}
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductoCard
            producto={item}
            onEditar={() =>
              navigation.navigate('Form', { producto: item, onGuardar: guardarProducto })
            }
            onEliminar={() => eliminarProducto(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTexto}>No se encontraron productos</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Form', { onGuardar: guardarProducto })}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f5f0' },
  searchContainer: {
    backgroundColor: '#2d1b69',
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 6,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 9,
    color: '#fff',
    fontSize: 14,
  },
  categoriasScroll: { maxHeight: 48 },
  categoriasContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  categoriaChip: {
    backgroundColor: '#ede8e0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  categoriaChipActiva: { backgroundColor: '#2d1b69' },
  categoriaTexto: { fontSize: 12, color: '#888', fontWeight: '500' },
  categoriaTextoActiva: { color: '#fff' },
  contador: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48 },
  emptyTexto: { color: '#aaa', marginTop: 8, fontSize: 14 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e8a045',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabTexto: { color: '#fff', fontSize: 28, lineHeight: 32 },
});
