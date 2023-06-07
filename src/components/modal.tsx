//React && ReactNative
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
//externos
import DatePicker from 'react-native-date-picker';
//interface
import Paciente from '../interface/pacientes';
//dependencias externas
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
  pacientes: Paciente[];
  setPacienteEdit: React.Dispatch<React.SetStateAction<Paciente>>;
  pacienteEdit: Paciente;
}

const ModalPaciente: React.FC<Props> = ({
  modal,
  setModal,
  setPacientes,
  pacientes,
  pacienteEdit,
  setPacienteEdit,
}): React.JSX.Element => {
  //estados de formulario
  const [id, setId] = useState<string>('');
  const [paciente, setPaciente] = useState<string>('');
  const [propietario, setPropietario] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [sintomas, setSintomas] = useState<string>('');
  const [fechaIngreso, setFechaIngreso] = useState<Date>(new Date());
  //escucha cambios en pacienteEDit
  useEffect(() => {
    if (pacienteEdit.id !== '') {
      setId(pacienteEdit.id);
      setPaciente(pacienteEdit.paciente);
      setPropietario(pacienteEdit.propietario);
      setEmail(pacienteEdit.email);
      setTelefono(pacienteEdit.telefono);
      setSintomas(pacienteEdit.sintomas);
      setFechaIngreso(pacienteEdit.fechaIngreso);
    }
    return () => {};
  }, []);

  const handleCita = async (): Promise<void> => {
    //validando datos de formulario
    if ([paciente, propietario, email, sintomas, fechaIngreso].includes('')) {
      //encabezado,cuerpo y el array de btn [{text:'cancel},{text:"ok"}]
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    //creando mi objeto paciente
    const Paciente: Paciente = {
      id: Date.now().toString(),
      paciente,
      propietario,
      email,
      telefono,
      sintomas,
      fechaIngreso,
    };
    //verificar si vamos a editar o agregar nuevo paciente
    if (id) {
      Paciente.id = id;
      const pacientesActualizados: Paciente[] = pacientes.map(
        pacienteAntiguo => {
          return pacienteAntiguo.id === Paciente.id
            ? Paciente
            : pacienteAntiguo;
        },
      );
      setPacientes(pacientesActualizados);

      setPacienteEdit({
        id: '',
        paciente: '',
        propietario: '',
        email: '',
        telefono: '',
        sintomas: '',
        fechaIngreso: new Date(),
      });
    } else {
      const valores = [...pacientes, Paciente];
      setPacientes(valores);
    }

    //reseteo informacion
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setSintomas('');
    setFechaIngreso(new Date());
    setTimeout(() => {
      setModal(false);
    }, 200);
  };
  return (
    <Modal animationType="slide">
      <View style={modalNuevoPaciente.modal}>
        <ScrollView>
          <View style={modalNuevoPaciente.btnCerrar}>
            <Pressable
              onPress={() => {
                setModal(false);
                setPacienteEdit({
                  id: '',
                  paciente: '',
                  propietario: '',
                  email: '',
                  telefono: '',
                  sintomas: '',
                  fechaIngreso: new Date(),
                });
                setId('');
                setPaciente('');
                setPropietario('');
                setEmail('');
                setTelefono('');
                setSintomas('');
                setFechaIngreso(new Date());
              }}>
              <Image
                source={require('../assets/img/cerrar.png')}
                style={{width: 25, height: 25}}
              />
            </Pressable>
          </View>
          <Text style={modalNuevoPaciente.titulo}>
            {pacienteEdit.id ? 'Actualizar Paciente' : 'Nueva Cita'}
          </Text>

          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Nombre Paciente</Text>
            <TextInput
              style={modalNuevoPaciente.input}
              placeholder="Ingresa el nombre del paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}></TextInput>
          </View>
          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Nombre Propietario</Text>
            <TextInput
              style={modalNuevoPaciente.input}
              placeholder="Ingresa el nombre del propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}></TextInput>
          </View>
          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Email Propietario</Text>
            <TextInput
              style={modalNuevoPaciente.input}
              keyboardType="email-address"
              placeholder="Ingresa el tu email"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={setEmail}></TextInput>
          </View>
          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Telefono Propietario</Text>
            <TextInput
              style={modalNuevoPaciente.input}
              keyboardType="number-pad"
              placeholder="Ingresa tu telefono"
              placeholderTextColor={'#666'}
              value={telefono}
              onChangeText={setTelefono}></TextInput>
          </View>
          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Fecha de ingreso</Text>
            <DatePicker
              style={modalNuevoPaciente.fecha}
              androidVariant="iosClone"
              locale="es"
              mode="date"
              date={fechaIngreso}
              onDateChange={date => setFechaIngreso(date)}
            />
          </View>
          <View style={modalNuevoPaciente.campo}>
            <Text style={modalNuevoPaciente.label}>Sintomas</Text>
            <TextInput
              style={modalNuevoPaciente.input}
              placeholderTextColor={'#666'}
              value={sintomas}
              multiline={true}
              numberOfLines={5}
              onChangeText={setSintomas}></TextInput>
          </View>
          <Pressable style={modalNuevoPaciente.btn} onPress={handleCita}>
            <Text style={modalNuevoPaciente.btnText}>
              {' '}
              {pacienteEdit.id ? 'Actualizar' : 'Agregar'}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};
const modalNuevoPaciente = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#5B4EDA',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  btn: {
    backgroundColor: '#D3A631',
    marginHorizontal: 100,
    padding: 10,
    marginTop: 15,
    marginBottom: 35,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  btnCerrar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  fecha: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default ModalPaciente;
