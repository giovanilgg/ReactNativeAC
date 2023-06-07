import React from 'react';
import Paciente from '../interface/pacientes';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import formatearFecha from '../helpers/formatoFecha';
interface Props {
  item: Paciente;
  eliminarCliente: any;
  editarCliente: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalPaciente: React.Dispatch<React.SetStateAction<boolean>>;
  setPaciente: React.Dispatch<React.SetStateAction<Paciente>>;
}
const PacienteComponent: React.FC<Props> = ({
  item,
  eliminarCliente,
  setModal,
  editarCliente,
  setModalPaciente,
  setPaciente,
}): React.JSX.Element => {
  const {paciente, fechaIngreso, id} = item;

  return (
    <View style={card.contenedor}>
      <Text style={card.label}>Paciente:</Text>
      <Text style={card.texto}>{paciente}</Text>
      <Text style={card.fecha}>{formatearFecha(fechaIngreso)}</Text>
      <View style={card.btnContenedor}>
        <Pressable
          style={card.btnVer}
          onPress={() => {
            setModalPaciente(true);
            setPaciente(item);
          }}>
          <Text style={card.textBotones}>Ver</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            editarCliente(id);
            setModal(true);
          }}
          style={card.btnEditar}>
          <Text style={card.textBotones}>Editar</Text>
        </Pressable>

        <Pressable
          style={card.btnEliminar}
          onPress={() => {
            eliminarCliente(id);
          }}>
          <Text style={card.textBotones}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const card = StyleSheet.create({
  contenedor: {
    backgroundColor: '#EDEDF2',
    padding: 22,
    marginTop: 20,
    borderRadius: 10,
  },
  label: {
    color: 'black',
    textTransform: 'capitalize',
    fontWeight: '600',
    marginBottom: 10,
    fontSize:16
  },
  texto: {
    marginBottom: 15,
    fontSize:25,
    color: '#6D28D9',
    fontWeight:'bold',
    textTransform:'capitalize'
  },
  fecha: {
    fontWeight: '600',
    marginBottom:10
  },
  btnContenedor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnEditar: {
    backgroundColor: '#4A73D1',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
  },
  btnEliminar: {
    backgroundColor: '#B81D1B',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
  },
  textBotones: {
    color: '#fff',
  },
  btnVer: {
    backgroundColor: '#F8BA36',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 3,
  },
});
export default PacienteComponent;
