import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIAS = ['Electrónica', 'Alimentos', 'Limpieza', 'Ropa', 'Otros'];

export default function FormScreen({ navigation, route }) {
  const productoExistente = route.params?.producto;
  const onGuardar = route.params?.onGuardar;

  const [nombre, setNombre] = useState(productoExistente?.nombre || '');
  const [precio, setPrecio] = useState(productoExistente?.precio || '');
  const [cantidad, setCantidad] = useState(productoExistente?.cantidad || '');
  const [categoria, setCategoria] = useState(productoExistente?.categoria || 'Electrónica');
  const [imagen, setImagen] = useState(productoExistente?.imagen || null);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const guardar = () => {
    if (!nombre.trim() || !precio.trim() || !cantidad.toString().trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos obligatorios.');
      return;
    }
    if (isNaN(parseFloat(precio)) || parseFloat(precio) < 0) {
      Alert.alert('Precio inválido', 'Ingresa un precio numérico válido.');
      return;
    }
    if (isNaN(parseInt(cantidad)) || parseInt(cantidad) < 0) {
      Alert.alert('Cantidad inválida', 'Ingresa una cantidad entera válida.');
      return;
    }

    onGuardar({
      id: productoExistente?.id || null,
      nombre: nombre.trim(),
      precio,
      cantidad,
      categoria,
      imagen,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Imagen */}
      <TouchableOpacity style={styles.imagenContainer} onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.imagenPreview} />
        ) : (
          <View style={styles.imagenPlaceholder}>
            <Text style={styles.imagenIcono}>📷</Text>
            <Text style={styles.imagenTexto}>Toca para agregar imagen del producto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <Campo label="Nombre *" value={nombre} onChangeText={setNombre} placeholder="Ej. Laptop Dell" />

        <View style={styles.fila}>
          <View style={styles.mitad}>
            <Campo
              label="Precio * ($)"
              value={precio}
              onChangeText={setPrecio}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.mitad}>
            <Campo
              label="Cantidad *"
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="0"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Selector de categoría */}
        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.categoriasGrid}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaOpcion,
                categoria === cat && styles.categoriaOpcionActiva,
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text
                style={[
                  styles.categoriaOpcionTexto,
                  categoria === cat && styles.categoriaOpcionTextoActivo,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
          <Text style={styles.botonTexto}>
            {productoExistente ? '💾 Guardar cambios' : '➕ Agregar producto'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Campo({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f5f0' },
  imagenContainer: { marginBottom: 4 },
  imagenPreview: { width: '100%', height: 180, resizeMode: 'cover' },
  imagenPlaceholder: {
    height: 120,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#ede8e0',
    borderWidth: 1.5,
    borderColor: '#c8b89a',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  imagenIcono: { fontSize: 28 },
  imagenTexto: { color: '#aaa', fontSize: 12 },
  form: { padding: 16, gap: 4 },
  fila: { flexDirection: 'row', gap: 12 },
  mitad: { flex: 1 },
  campoContainer: { marginBottom: 12 },
  label: { fontSize: 12, color: '#888', marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoriaOpcion: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#ede8e0',
  },
  categoriaOpcionActiva: { backgroundColor: '#2d1b69' },
  categoriaOpcionTexto: { fontSize: 12, color: '#888', fontWeight: '500' },
  categoriaOpcionTextoActivo: { color: '#fff' },
  botonGuardar: {
    backgroundColor: '#2d1b69',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botonTexto: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
