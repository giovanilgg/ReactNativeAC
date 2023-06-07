import React from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import Paciente from 'interface/pacientes';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import formatearFecha from 'helpers/formatoFecha';
interface Props {
  setModalPaciente: React.Dispatch<React.SetStateAction<boolean>>;
  paciente: Paciente;
}
const ModalInformacion: React.FC<Props> = ({
  setModalPaciente,
  paciente,
}): React.JSX.Element => {
  return (
    <Modal animationType="fade">
      <View style={modalInformacion.contenedor}>
        <View style={modalInformacion.btnCerrar}>
          <Pressable
            onPress={() => {
              setModalPaciente(false);
            }}>
            <Image
              source={require('../assets/img/cerrar.png')}
              style={{width: 30, height: 30}}
            />
          </Pressable>
        </View>
        <View style={modalInformacion.logo}>
          <Pressable>
            <Image
              source={require('../assets/img/huella.png')}
              style={{width: 160, height: 160}}
            />
          </Pressable>
        </View>
        <View style={modalInformacion.contenido}>
          <Text style={modalInformacion.titulo}>
            Información{' '}
            <Text style={modalInformacion.tituloResaltado}>Paciente</Text>
          </Text>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Nombre:</Text>
            <Text style={modalInformacion.info}>{paciente.paciente}</Text>
          </View>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Propietario:</Text>
            <Text style={modalInformacion.info}>{paciente.propietario}</Text>
          </View>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Telefono:</Text>
            <Text style={modalInformacion.info}>{paciente.telefono}</Text>
          </View>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Correo:</Text>
            <Text style={modalInformacion.info}>{paciente.email}</Text>
          </View>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Fecha de alta:</Text>
            <Text style={modalInformacion.info}>
              {formatearFecha(paciente.fechaIngreso)}
            </Text>
          </View>
          <View style={modalInformacion.campo}>
            <Text style={modalInformacion.label}>Sintomas:</Text>
            <Text style={modalInformacion.info}>{paciente.sintomas}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalInformacion = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FAB43F',
  },
  btnCerrar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  contenido: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 40,
  },
  tituloResaltado: {
    fontWeight: 'bold',
    color: '#F3B127',
  },
  campo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  info: {},
});
export default ModalInformacion;
