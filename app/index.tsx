import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import "../global.css";
import { database } from "@/constants/database";

export default function FormularioProducto() {

  //! ya no me quedo tiempo de pasarlo a un hook
  const [errors, setErrors] = useState({
    code: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [producto, setProducto] = useState({
    code: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
    date: new Date(),
    observaciones: "",
  });

  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);



 
  const validateForm = () => {
    console.log(JSON.stringify(producto, null, 2));
    
    let errors = {
      code: "",
      name: "",
      category: "",
      quantity: "",
      price: "",
      date: "",
    };
    console.log(JSON.stringify(errors, null, 2));

    if (producto.code == "") {
      errors.code = "El codigo es requerido";
    }

    if (producto.name == "") {
      errors.name = "El nombre del producto es requerido";
    }

    if (producto.category == "") {
      errors.category = "La categoria es requerida.";
    }

    if (producto.quantity == "") {
      errors.quantity = "La cantidad es requerida.";
    }

    if (producto.quantity < "1") {
      errors.quantity = "La cantidad debe ser un número entero positivo";
    }

    if (!/^\d+(\.\d{1,2})?$/.test(producto.price)) {
      errors.price =
        "El precio debe ser un número positivo con hasta dos decimales";
    }



    

    // setear errores y actualizar validex
    setErrors(errors);
    setIsFormValid(Object.values(errors).every(value => value === ""));
    // setIsFormValid(false);
    console.log("Es valido? (fuera if)", isFormValid);
  };

  const manejarEnvio = () => {
    // const myTimeout = setTimeout(myGreeting, 5000);
    if (isFormValid) {
      
      Alert.alert("Éxito", "Producto registrado correctamente");
      setProducto({
        code: "",
        name: "",
        category: "",
        quantity: "",
        price: "",
        date: new Date(),
        observaciones: "",
      });
    }
  };

  return (
    <ScrollView className="px-6">
      <Text className="text-3xl text-center font-bold mt-7 mb-4 ">
        Registro de Producto
      </Text>

      <Text style={styles.label}>Código de Producto</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={producto.code}
        onChangeText={(text) => {
          setProducto({ ...producto, code: text });
          validateForm();
        }}
        onBlur={validateForm}
        maxLength={10}
      />
      {errors.code && (
        <Text className="text-sm text-red-400 my-2">{errors.code}</Text>
      )}

      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput
        keyboardType="ascii-capable"
        style={styles.input}
        value={producto.name}
        onChangeText={(text) => {
          setProducto({ ...producto, name: text });
          validateForm();
        }}
        onBlur={validateForm}
      />
      {errors.name && (
        <Text className="text-sm text-red-400 my-2">{errors.name}</Text>
      )}

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker
          onBlur={validateForm}
          selectedValue={producto.category}
          onValueChange={(value) => {
            // setProducto({ ...producto, category: value });
            producto.category = value;
            validateForm();
          }}
        >
          {database.categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.value} value={cat.value} />
          ))}
        </Picker>
      </View>
      {errors.category && (
        <Text className="text-sm text-red-400 my-2">{errors.category}</Text>
      )}

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        value={producto.quantity}
        onChangeText={(text) => {
          setProducto({ ...producto, quantity: text });
          validateForm();
        }}
        onBlur={validateForm}
        keyboardType="numeric"
      />
      {errors.quantity && (
        <Text className="text-sm text-red-400 my-2">{errors.quantity}</Text>
      )}

      <Text style={styles.label}>Precio Unitario</Text>
      <TextInput
        style={styles.input}
        onBlur={validateForm}
        value={producto.price}
        onChangeText={(text) => {
          setProducto({ ...producto, price: text });
          validateForm();
        }}
        keyboardType="decimal-pad"
      />
      {errors.price && (
        <Text className="text-sm text-red-400 my-2">{errors.price}</Text>
      )}

      <Text style={styles.label}>Fecha de Ingreso</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarDatePicker(true)}
      >
        <Text>{producto.date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {mostrarDatePicker && (
        <DateTimePicker
          value={producto.date}
          mode="date"
          onChange={(event, selectedDate) => {
            setMostrarDatePicker(false);
            if (selectedDate) {
              // eliminando la diferencia de zona horaria
              const localDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
                // Se ignora por si las moscas
              );

              setProducto((prevState) => ({ ...prevState, date: localDate }));
            }
          }}
        />
      )}

      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        style={styles.input}
        className="h-24 align-top"
        value={producto.observaciones}
        onChangeText={(text) =>
          setProducto({ ...producto, observaciones: text })
        }
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        className={`w-full rounded-lg = p-2 ${isFormValid ? "bg-indigo-500" : "bg-gray-500"}`}
        disabled={!isFormValid}
        onPress={manejarEnvio}
      >
        <Text className="text-center text-xl text-white font-semibold">
          Registrar Producto
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
  },
  dateButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
