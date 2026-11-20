import React, { useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { useAppData } from '../context/AppContext';
import { Card, COLORS, EmptyState, Field, FormModal, Pill, PrimaryButton, Screen, SectionTitle, SecondaryAction } from '../components/UI';

function navigateToRootRoute(navigation, routeName) {
  let root = navigation;
  while (root.getParent?.()) root = root.getParent();
  root.reset({ index: 0, routes: [{ name: routeName }] });
}

function QuickExit({ navigation }) {
  return (
    <Pressable onPress={() => navigateToRootRoute(navigation, 'Fitness')} style={{ borderWidth: 1, borderColor: '#F2CACA', backgroundColor: '#FFF6F6', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14, alignItems: 'center' }}>
      <Text style={{ color: COLORS.red, fontSize: 12, fontWeight: '900', letterSpacing: 0.4 }}>SAÍDA RÁPIDA</Text>
    </Pressable>
  );
}

function SupportShortcut({ icon, title, description, onPress, danger = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ padding: 15, backgroundColor: danger ? COLORS.paleRed : COLORS.white, borderRadius: 13, borderWidth: 1, borderColor: danger ? '#F3C6C6' : '#D5E8DA', flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.82 : 1 })}>
      <Text style={{ fontSize: 24 }}>{icon}</Text>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={{ color: danger ? COLORS.red : COLORS.green, fontSize: 15, fontWeight: '800' }}>{title}</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12 }}>{description}</Text>
      </View>
      <Text style={{ color: danger ? COLORS.red : COLORS.green, fontSize: 20, fontWeight: '800' }}>›</Text>
    </Pressable>
  );
}

export function SupportHomeScreen({ navigation }) {
  return (
    <Screen support>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ color: COLORS.green, fontSize: 25, fontWeight: '900' }}>Central de apoio</Text>
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>Rede segura • dados demonstrativos</Text>
        </View>
        <Text style={{ fontSize: 27 }}>🛡️</Text>
      </View>
      <Card style={{ backgroundColor: '#EAF5ED', borderColor: '#D1E8D7' }}>
        <Text style={{ color: COLORS.green, fontWeight: '800', fontSize: 16 }}>Você não está sozinha.</Text>
        <Text style={{ color: '#526B5A', fontSize: 12, lineHeight: 18 }}>Este protótipo acadêmico demonstra recursos de apoio. Use somente dados fictícios durante os testes.</Text>
      </Card>
      <SupportShortcut icon="👥" title="Contatos de confiança" description="Pessoas da sua rede de apoio" onPress={() => navigation.navigate('Contatos')} />
      <SupportShortcut icon="📝" title="Ocorrências" description="Registros demonstrativos e privados" onPress={() => navigation.navigate('Ocorrências')} />
      <SupportShortcut icon="📍" title="Pontos de apoio" description="Referências para buscar atendimento" onPress={() => navigation.navigate('Pontos de apoio')} />
      <SupportShortcut icon="🆘" title="SOS" description="Opções de ajuda e emergência" danger onPress={() => navigation.navigate('SOS')} />
      <Card>
        <Text style={{ color: COLORS.text, fontWeight: '900', fontSize: 13 }}>CANAIS OFICIAIS</Text>
        <Text style={{ color: COLORS.text, fontSize: 13 }}>180 — Central de Atendimento à Mulher</Text>
        <Text style={{ color: COLORS.text, fontSize: 13 }}>190 — Polícia Militar (emergências)</Text>
      </Card>
      <QuickExit navigation={navigation} />
    </Screen>
  );
}

export function ContactsScreen({ navigation }) {
  const { contacts, addContact, updateContact, deleteContact } = useAppData();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('1');

  const openForm = (contact = null) => {
    setEditing(contact);
    setName(contact?.name || '');
    setRelation(contact?.relation || '');
    setPhone(contact?.phone || '');
    setPriority(String(contact?.priority || '1'));
    setVisible(true);
  };
  const save = async () => {
    if (!name.trim() || !phone.trim()) return Alert.alert('Campos obrigatórios', 'Informe pelo menos o nome e o telefone.');
    const data = { name: name.trim(), relation: relation.trim() || 'Não informada', phone: phone.trim(), priority: String(Math.max(1, Math.min(5, Number(priority) || 1))) };
    try {
      if (editing) await updateContact(editing.id, data); else await addContact(data);
      setVisible(false);
    } catch (err) { Alert.alert('Erro ao salvar contato na API', err.message); }
  };
  const confirmDelete = (contact) => Alert.alert('Excluir contato?', `Deseja remover ${contact.name} dos dados simulados?`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: async () => { try { await deleteContact(contact.id); } catch(err) { Alert.alert('Erro ao excluir contato', err.message); } } },
  ]);

  return (
    <Screen support>
      <Text style={{ color: COLORS.green, fontSize: 22, fontWeight: '900' }}>Contatos de confiança</Text>
      <Text style={{ color: COLORS.muted, fontSize: 13 }}>Exemplos fictícios. Não use contatos reais durante a demonstração.</Text>
      <PrimaryButton title="+ NOVO CONTATO" tone="green" onPress={() => openForm()} />
      {contacts.length === 0 ? <EmptyState text="Nenhum contato cadastrado. Adicione uma pessoa de confiança." /> : contacts.map((contact) => (
        <Card key={contact.id} style={{ borderColor: '#D5E8DA' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{contact.name}</Text>
              <Text style={{ color: COLORS.muted, fontSize: 12 }}>{contact.relation} • {contact.phone}</Text>
            </View>
            <Pill tone="green">Prioridade {contact.priority}</Pill>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SecondaryAction title="Editar" onPress={() => openForm(contact)} />
            <SecondaryAction title="Excluir" danger onPress={() => confirmDelete(contact)} />
          </View>
        </Card>
      ))}
      <QuickExit navigation={navigation} />
      <FormModal visible={visible} title={editing ? 'Editar contato' : 'Novo contato'} onCancel={() => setVisible(false)} onSave={save}>
        <Field label="Nome" value={name} onChangeText={setName} placeholder="Nome fictício" />
        <Field label="Relação" value={relation} onChangeText={setRelation} placeholder="Ex.: Amiga" />
        <Field label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="(00) 00000-0000" />
        <Field label="Prioridade (1 a 5)" value={priority} onChangeText={setPriority} keyboardType="numeric" />
      </FormModal>
    </Screen>
  );
}

export function IncidentsScreen({ navigation }) {
  const { incidents, addIncident, updateIncident, deleteIncident } = useAppData();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('1');

  const openForm = (incident = null) => {
    setEditing(incident);
    setDate(incident?.date || new Date().toLocaleDateString('pt-BR'));
    setType(incident?.type || '');
    setDescription(incident?.description || '');
    setSeverity(String(incident?.severity || '1'));
    setVisible(true);
  };
  const save = async () => {
    if (!type.trim() || !description.trim()) return Alert.alert('Campos obrigatórios', 'Informe o tipo e a descrição do registro.');
    const data = { date: date.trim() || 'Data não informada', type: type.trim(), description: description.trim(), severity: String(Math.max(1, Math.min(5, Number(severity) || 1))) };
    try {
      if (editing) await updateIncident(editing.id, data); else await addIncident(data);
      setVisible(false);
    } catch (err) { Alert.alert('Erro ao salvar ocorrência na API', err.message); }
  };
  const confirmDelete = (incident) => Alert.alert('Excluir registro?', 'Este registro de demonstração será removido do banco de dados.', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: async () => { try { await deleteIncident(incident.id); } catch(err) { Alert.alert('Erro ao excluir ocorrência', err.message); } } },
  ]);

  return (
    <Screen support>
      <Text style={{ color: COLORS.green, fontSize: 22, fontWeight: '900' }}>Ocorrências</Text>
      <Text style={{ color: COLORS.muted, fontSize: 13 }}>CRUD de ocorrências: registros persistidos na API/SQLite, com dados exclusivamente fictícios.</Text>
      <Text style={{ color: COLORS.muted, fontSize: 12 }}>{incidents.length} ocorrência(s) carregada(s) do servidor</Text>
      <PrimaryButton title="+ NOVA OCORRÊNCIA" tone="green" onPress={() => openForm()} />
      {incidents.length === 0 ? <EmptyState text="Não há registros. Use o botão acima para criar um registro de demonstração." /> : incidents.map((incident) => (
        <Card key={incident.id} style={{ borderColor: '#E0E5ED' }}>
          <Text style={{ color: COLORS.text, fontWeight: '800' }}>{incident.date}</Text>
          <Text style={{ color: COLORS.text, fontSize: 15, fontWeight: '700' }}>{incident.type}</Text>
          <Text style={{ color: COLORS.muted, fontSize: 12, lineHeight: 18 }}>{incident.description}</Text>
          <Pill tone="red">Gravidade: {incident.severity}/5</Pill>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SecondaryAction title="Editar" onPress={() => openForm(incident)} />
            <SecondaryAction title="Excluir" danger onPress={() => confirmDelete(incident)} />
          </View>
        </Card>
      ))}
      <QuickExit navigation={navigation} />
      <FormModal visible={visible} title={editing ? 'Editar ocorrência' : 'Nova ocorrência'} onCancel={() => setVisible(false)} onSave={save}>
        <Field label="Data" value={date} onChangeText={setDate} placeholder="DD/MM/AAAA" />
        <Field label="Tipo" value={type} onChangeText={setType} placeholder="Ex.: Ameaça" />
        <Field label="Descrição" value={description} onChangeText={setDescription} placeholder="Descrição fictícia para teste" multiline />
        <Field label="Gravidade (1 a 5)" value={severity} onChangeText={setSeverity} keyboardType="numeric" />
      </FormModal>
    </Screen>
  );
}

export function SupportPointsScreen({ navigation }) {
  const points = [
    { id: 'p1', name: 'Delegacia Especializada de Atendimento à Mulher', category: 'Segurança pública', detail: 'Confirme endereço, horário e telefone nos canais oficiais da sua cidade.' },
    { id: 'p2', name: 'Casa de acolhimento', category: 'Acolhimento', detail: 'Consulte a rede municipal de assistência social para encontrar um serviço verificado.' },
    { id: 'p3', name: 'CRAS / CREAS', category: 'Assistência social', detail: 'Verifique a unidade e as formas de atendimento no portal oficial do município.' },
  ];
  return (
    <Screen support>
      <Text style={{ color: COLORS.green, fontSize: 22, fontWeight: '900' }}>Pontos de apoio</Text>
      <Text style={{ color: COLORS.muted, fontSize: 13 }}>Referências gerais. Os endereços não estão cadastrados neste protótipo.</Text>
      {points.map((point) => (
        <Card key={point.id} style={{ borderColor: '#D5E8DA' }}>
          <Pill tone="green">{point.category}</Pill>
          <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{point.name}</Text>
          <Text style={{ color: COLORS.muted, fontSize: 12, lineHeight: 18 }}>{point.detail}</Text>
        </Card>
      ))}
      <Card>
        <Text style={{ color: COLORS.text, fontWeight: '900' }}>Canais nacionais</Text>
        <Text style={{ color: COLORS.text, fontSize: 13 }}>180 — Central de Atendimento à Mulher</Text>
        <Text style={{ color: COLORS.text, fontSize: 13 }}>190 — Polícia Militar em emergências</Text>
      </Card>
      <QuickExit navigation={navigation} />
    </Screen>
  );
}

export function SOSScreen({ navigation }) {
  const { sendDemoAlert } = useAppData();
  const [submitting, setSubmitting] = useState(false);
  const tryCall = async (number) => {
    try { await Linking.openURL(`tel:${number}`); }
    catch { Alert.alert('Telefone', `Use o discador do aparelho para ligar para ${number}.`); }
  };
  const sendAlert = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão necessária', 'Para a demonstração, autorize a localização do aparelho de testes. Nenhum dado é enviado à polícia.');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const result = await sendDemoAlert({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      Alert.alert('Alerta acadêmico registrado', `Evento #${result.id} enviado apenas à API local. Visualize em http://SEU-IP:3333/painel. Nenhuma autoridade foi notificada.`);
    } catch (err) { Alert.alert('Falha na simulação', err.message); }
    finally { setSubmitting(false); }
  };
  return (
    <Screen support>
      <Text style={{ color: COLORS.green, fontSize: 22, fontWeight: '900' }}>SOS — Demonstração</Text>
      <Text style={{ color: COLORS.muted, fontSize: 13 }}>Este protótipo não oferece atendimento real.</Text>
      <View style={{ marginTop: 14, borderRadius: 22, padding: 24, backgroundColor: COLORS.paleRed, borderColor: '#F0C2C2', borderWidth: 1, alignItems: 'center', gap: 12 }}>
        <Text style={{ color: COLORS.red, fontSize: 50, fontWeight: '900' }}>SOS</Text>
        <Text style={{ color: COLORS.text, fontWeight: '800', textAlign: 'center' }}>Acionamento simulado para a banca</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12, textAlign: 'center', lineHeight: 18 }}>Ao autorizar, envia data, hora e coordenadas do aparelho de testes para o painel local do projeto. Não envie dados reais de vítimas. Nenhum contato, polícia ou serviço oficial é avisado.</Text>
        <PrimaryButton title={submitting ? 'REGISTRANDO...' : 'ENVIAR ALERTA DE DEMONSTRAÇÃO'} tone="red" onPress={sendAlert} style={{ width: '100%' }} />
      </View>
      <PrimaryButton title="LIGAR PARA 180 — ATENDIMENTO À MULHER" tone="green" onPress={() => tryCall('180')} />
      <PrimaryButton title="LIGAR PARA 190 — EMERGÊNCIA" tone="red" onPress={() => tryCall('190')} />
      <QuickExit navigation={navigation} />
    </Screen>
  );
}

export function AboutSupportScreen({ navigation }) {
  return (
    <Screen support>
      <Text style={{ color: COLORS.green, fontSize: 22, fontWeight: '900' }}>Sobre o projeto</Text>
      <Card style={{ borderColor: '#D5E8DA' }}>
        <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>FitTrack — Projeto Integrador</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13, lineHeight: 20 }}>Aplicativo acadêmico de apoio camuflado em uma fachada de academia, desenvolvido para a disciplina de Desenvolvimento Móvel.</Text>
      </Card>
      <Card>
        <Text style={{ color: COLORS.text, fontWeight: '900' }}>Aviso ético</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13, lineHeight: 20 }}>Este aplicativo é um protótipo acadêmico. Não substitui atendimento policial, jurídico, psicológico ou de saúde. Os registros e contatos de demonstração são fictícios; não cadastre dados reais de vítimas.</Text>
      </Card>
      <QuickExit navigation={navigation} />
    </Screen>
  );
}
