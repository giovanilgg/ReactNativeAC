import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
//dependencias externas
import AsyncStorage from '@react-native-async-storage/async-storage';
//componentes
import ModalPaciente from './src/components/modal';
import Paciente from './src/interface/pacientes';
import PacienteComponent from './src/components/paciente';
import ModalInformacion from 'components/modalInformacion';
function App(): React.JSX.Element {
  const [modal, setModal] = useState<boolean>(false);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteEdit, setPacienteEdit] = useState<Paciente>({
    id: '',
    paciente: '',
    propietario: '',
    email: '',
    telefono: '',
    sintomas: '',
    fechaIngreso: new Date(),
  });
  const [modalPaciente, setModalPaciente] = useState<boolean>(false);
  const [paciente, setPaciente] = useState<Paciente>({
    id: '',
    paciente: '',
    propietario: '',
    email: '',
    telefono: '',
    sintomas: '',
    fechaIngreso: new Date(),
  });
  //efecto para llenar datos en async storage
  useEffect(() => {
    const obtenerData = async (): Promise<void> => {
      const pacientesStorage =
        (await AsyncStorage.getItem('PACIENTES')) ?? '[]';

      setPacientes(
        JSON.parse(pacientesStorage, (key, value) => {
          return key === 'fechaIngreso' ? new Date(value) : value;
        }),
      );
    };
    obtenerData();
  }, []);

  //Escuchando el array de pacientes
  useEffect(() => {
    const arrayModificado = async (): Promise<void> => {
      //asignar en async storage
      const jsonValue = JSON.stringify(pacientes);
      await AsyncStorage.setItem('PACIENTES', jsonValue);
    };
    arrayModificado();
  }, [pacientes]);

  //Eliminar un cliente
  const eliminarCliente = (id: string): void => {
    Alert.alert(
      'Esta seguro de eliminar este registro',
      'Esta opcion es irreversible',
      [
        {
          text: 'ok',
          onPress: async () => {
            const nuevoArreglo: Paciente[] = pacientes.filter(
              (item: Paciente) => {
                return item.id !== id;
              },
            );
            setPacientes(nuevoArreglo);
          },
        },
        {text: 'Cancelar'},
      ],
    );
  };
  //Editar un Cliente
  const editarCliente = (id: string): void => {
    const pacienteEditar: Paciente[] = pacientes.filter((item: Paciente) => {
      return item.id == id;
    });

    setPacienteEdit(pacienteEditar[0]);
  };

  return (
    <View style={styled.container}>
      <Text style={styled.titulo}>
        Administrador de citas <Text style={styled.subtitulo}>Veterinaria</Text>
      </Text>

      {}
      <Pressable style={styled.btnCita} onPress={() => setModal(true)}>
        <Text style={styled.btnCitaTexto}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styled.pacientesNoDisponible}>
          No hay pacientes por el momento
        </Text>
      ) : (
        <FlatList
          style={styled.listado}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <PacienteComponent
                eliminarCliente={eliminarCliente}
                editarCliente={editarCliente}
                item={item}
                setModal={setModal}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            );
          }}
        />
      )}
      {modal && (
        <ModalPaciente
          setPacientes={setPacientes}
          pacientes={pacientes}
          setModal={setModal}
          modal={modal}
          setPacienteEdit={setPacienteEdit}
          pacienteEdit={pacienteEdit}
        />
      )}
      {modalPaciente && (
        <ModalInformacion
          setModalPaciente={setModalPaciente}
          paciente={paciente}
        />
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    color: 'black',
    textAlign: 'center',
    margin: 20,
    fontSize: 25,
  },
  subtitulo: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  btnCita: {
    backgroundColor: '#8A2BE2',
    color: 'white',
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  btnCitaTexto: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  pacientesNoDisponible: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    fontFamily: 'lato',
  },
});

export default App;
