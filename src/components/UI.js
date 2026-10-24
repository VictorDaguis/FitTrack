import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const COLORS = {
  navy: '#244D82',
  blue: '#3C70B5',
  paleBlue: '#EAF1FB',
  background: '#F4F7FB',
  text: '#1B2430',
  muted: '#687386',
  border: '#DCE3ED',
  green: '#2E8B57',
  paleGreen: '#EDF7F0',
  red: '#BC4B4B',
  paleRed: '#FFF0F0',
  white: '#FFFFFF',
};

export function Screen({ children, support = false, contentStyle }) {
  return (
    <SafeAreaView style={[styles.safe, support ? styles.supportBackground : null]} edges={support ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.content, contentStyle]} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function BrandHeader({ support = false, subtitle }) {
  return (
    <View style={styles.brandRow}>
      <View>
        <Text style={[styles.brandTitle, support ? styles.greenText : null]}>{support ? 'Área de Apoio' : 'FitTrack'}</Text>
        <Text style={styles.brandSubtitle}>{subtitle || (support ? 'Central segura de apoio' : 'Treino e progresso')}</Text>
      </View>
      {!support ? <View style={styles.avatar}><Text style={styles.avatarText}>V</Text></View> : <Text style={styles.shield}>🛡️</Text>}
    </View>
  );
}

export function SectionTitle({ children, right }) {
  return <View style={styles.sectionTitleRow}><Text style={styles.sectionTitle}>{children}</Text>{right}</View>;
}

export function Card({ children, style, onPress, accent }) {
  const Wrapper = onPress ? Pressable : View;
  return <Wrapper onPress={onPress} style={[styles.card, accent ? { borderLeftWidth: 4, borderLeftColor: accent } : null, style]}>{children}</Wrapper>;
}

export function PrimaryButton({ title, onPress, onPressIn, tone = 'blue', onLongPress, delayLongPress = 3000, style, compact = false }) {
  const backgroundColor = tone === 'green' ? COLORS.green : tone === 'red' ? COLORS.red : tone === 'light' ? COLORS.paleBlue : COLORS.blue;
  const color = tone === 'light' ? COLORS.navy : COLORS.white;
  return (
    <Pressable onPressIn={onPressIn} onPress={onPress} onLongPress={onLongPress} delayLongPress={delayLongPress} style={({ pressed }) => [styles.button, { backgroundColor }, compact ? styles.buttonCompact : null, pressed ? styles.pressed : null, style]}>
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryAction({ title, onPress, danger = false }) {
  return <Pressable onPress={onPress} style={styles.secondaryAction}><Text style={[styles.secondaryText, danger ? { color: COLORS.red } : null]}>{title}</Text></Pressable>;
}

export function Field({ label, value, onChangeText, placeholder, keyboardType, multiline = false }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor="#929BA8"
        keyboardType={keyboardType || 'default'}
        multiline={multiline}
        style={[styles.input, multiline ? styles.multiline : null]}
      />
    </View>
  );
}

export function FormModal({ visible, title, children, onCancel, onSave, saveTitle = 'SALVAR', tone = 'green' }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
          <View style={styles.modalActions}>
            <PrimaryButton title="CANCELAR" onPress={onCancel} tone="light" compact style={styles.modalButton} />
            <PrimaryButton title={saveTitle} onPress={onSave} tone={tone} compact style={styles.modalButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function EmptyState({ text }) {
  return <View style={styles.empty}><Text style={styles.emptyText}>{text}</Text></View>;
}

export function Pill({ children, tone = 'blue' }) {
  const bg = tone === 'green' ? '#D9F0E1' : tone === 'red' ? '#FDE0E0' : '#E5EDF9';
  const fg = tone === 'green' ? COLORS.green : tone === 'red' ? COLORS.red : COLORS.navy;
  return <View style={[styles.pill, { backgroundColor: bg }]}><Text style={[styles.pillText, { color: fg }]}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  supportBackground: { backgroundColor: '#F3F8F4' },
  content: { padding: 18, paddingBottom: 34, gap: 14 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  brandTitle: { color: COLORS.navy, fontSize: 27, fontWeight: '800', letterSpacing: 0.2 },
  greenText: { color: COLORS.green },
  brandSubtitle: { color: COLORS.muted, fontSize: 13, marginTop: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.blue, fontWeight: '800', fontSize: 17 },
  shield: { fontSize: 27 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 7 },
  sectionTitle: { color: COLORS.text, fontSize: 15, fontWeight: '800', letterSpacing: 0.4 },
  card: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 15, padding: 15, gap: 8 },
  button: { minHeight: 47, paddingHorizontal: 16, paddingVertical: 13, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  buttonCompact: { minHeight: 38, paddingVertical: 9, borderRadius: 9 },
  buttonText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.45, textAlign: 'center' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  secondaryAction: { paddingVertical: 7, paddingHorizontal: 4 },
  secondaryText: { color: COLORS.blue, fontSize: 12, fontWeight: '800' },
  fieldWrap: { marginBottom: 12, gap: 6 },
  fieldLabel: { color: COLORS.text, fontSize: 12, fontWeight: '700' },
  input: { minHeight: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, color: COLORS.text, backgroundColor: '#FAFBFD', fontSize: 14 },
  multiline: { minHeight: 82, textAlignVertical: 'top', paddingTop: 10 },
  modalBackdrop: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(10,20,35,0.46)', padding: 18 },
  modalCard: { maxHeight: '90%', backgroundColor: COLORS.white, borderRadius: 18, padding: 18 },
  modalTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 16 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  modalButton: { flex: 1 },
  empty: { padding: 20, borderRadius: 12, backgroundColor: '#EEF2F7' },
  emptyText: { color: COLORS.muted, textAlign: 'center', lineHeight: 20 },
  pill: { alignSelf: 'flex-start', borderRadius: 30, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 11, fontWeight: '800' },
});
