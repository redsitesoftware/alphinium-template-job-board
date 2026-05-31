import React, { useState } from 'react'
import {
 ScrollView,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from 'react-native'
import { useJobStore } from '../store/jobStore'

const categories = ['Tech', 'Marketing', 'Design', 'Operations']
const locations = ['Remote', 'Sydney', 'Melbourne', 'Brisbane', 'Adelaide']

function Chip({ label, active, onPress }) {
 return (
 <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
 <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
 </TouchableOpacity>
 )
}

function Field({ label, value, onChangeText, placeholder, multiline }) {
 return (
 <View style={styles.fieldWrap}>
 <Text style={styles.fieldLabel}>{label}</Text>
 <TextInput
 multiline={multiline}
 numberOfLines={multiline ? 5 : 1}
 placeholder={placeholder}
 placeholderTextColor="#94A3B8"
 style={[styles.input, multiline && styles.textArea]}
 value={value}
 onChangeText={onChangeText}
 />
 </View>
 )
}

export default function PostJobScreen() {
 const { actions } = useJobStore()
 const [posted, setPosted] = useState(false)
 const [form, setForm] = useState({
 company: '',
 title: '',
 category: 'Tech',
 location: 'Remote',
 salaryMin: '90',
 salaryMax: '120',
 description: '',
 })

 const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }))

 const submit = () => {
 actions.postJob(form)
 setPosted(true)
 }

 return (
 <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
 <TouchableOpacity onPress={actions.goHome} style={styles.backButton}>
 <Text style={styles.backButtonText}>← Back to jobs</Text>
 </TouchableOpacity>

 <Text style={styles.title}>Post a Job</Text>
 <Text style={styles.subtitle}>Launch a new role in minutes and capture applications with the alphinium-forms addon.</Text>

 <View style={styles.card}>
 <Field label="Company" placeholder="Acme Labs" value={form.company} onChangeText={(value) => updateField('company', value)} />
 <Field label="Role title" placeholder="Senior Product Designer" value={form.title} onChangeText={(value) => updateField('title', value)} />

 <Text style={styles.fieldLabel}>Category</Text>
 <View style={styles.chipRow}>
 {categories.map((category) => (
 <Chip key={category} label={category} active={form.category === category} onPress={() => updateField('category', category)} />
 ))}
 </View>

 <Text style={[styles.fieldLabel, { marginTop: 6 }]}>Location</Text>
 <View style={styles.chipRow}>
 {locations.map((location) => (
 <Chip key={location} label={location} active={form.location === location} onPress={() => updateField('location', location)} />
 ))}
 </View>

 <View style={styles.salaryRow}>
 <View style={{ flex: 1 }}>
 <Field label="Salary min (k)" placeholder="90" value={form.salaryMin} onChangeText={(value) => updateField('salaryMin', value)} />
 </View>
 <View style={{ width: 12 }} />
 <View style={{ flex: 1 }}>
 <Field label="Salary max (k)" placeholder="120" value={form.salaryMax} onChangeText={(value) => updateField('salaryMax', value)} />
 </View>
 </View>

 <Field label="Description" placeholder="Tell candidates about the role..." multiline value={form.description} onChangeText={(value) => updateField('description', value)} />

 <TouchableOpacity onPress={submit} style={styles.submitButton}>
 <Text style={styles.submitButtonText}>{posted ? 'Job posted!' : 'Submit job'}</Text>
 </TouchableOpacity>

 {posted && (
 <View style={styles.successCard}>
 <Text style={styles.successTitle}>Job posted!</Text>
 <Text style={styles.successText}>Your listing is now live on the board and ready to feed submissions into applications → /widget/leads.</Text>
 <TouchableOpacity onPress={actions.goHome} style={styles.successAction}>
 <Text style={styles.successActionText}>View all jobs</Text>
 </TouchableOpacity>
 </View>
 )}
 </View>

 <View style={styles.callout}>
 <Text style={styles.calloutTitle}>alphinium-forms addon showcase</Text>
 <Text style={styles.calloutText}>Use this flow to demonstrate job posting + lead capture in one polished, Expo-ready app.</Text>
 </View>
 </ScrollView>
 )
}

const styles = StyleSheet.create({
 screen: {
 flex: 1,
 backgroundColor: '#F8FAFC',
 },
 content: {
 paddingHorizontal: 20,
 paddingTop: 20,
 paddingBottom: 36,
 },
 backButton: {
 alignSelf: 'flex-start',
 paddingHorizontal: 12,
 paddingVertical: 10,
 borderRadius: 12,
 backgroundColor: '#E2E8F0',
 },
 backButtonText: {
 color: '#0F172A',
 fontWeight: '700',
 },
 title: {
 marginTop: 18,
 fontSize: 30,
 fontWeight: '800',
 color: '#0F172A',
 },
 subtitle: {
 marginTop: 8,
 color: '#475569',
 lineHeight: 21,
 marginBottom: 18,
 },
 card: {
 backgroundColor: '#FFFFFF',
 borderRadius: 24,
 padding: 18,
 shadowColor: '#0F172A',
 shadowOpacity: 0.06,
 shadowRadius: 18,
 shadowOffset: { width: 0, height: 10 },
 elevation: 3,
 },
 fieldWrap: {
 marginBottom: 14,
 },
 fieldLabel: {
 color: '#334155',
 fontWeight: '700',
 marginBottom: 8,
 },
 input: {
 borderWidth: 1,
 borderColor: '#CBD5E1',
 borderRadius: 14,
 backgroundColor: '#F8FAFC',
 paddingHorizontal: 14,
 paddingVertical: 12,
 color: '#0F172A',
 },
 textArea: {
 minHeight: 120,
 textAlignVertical: 'top',
 },
 chipRow: {
 flexDirection: 'row',
 gap: 10,
 flexWrap: 'wrap',
 marginBottom: 14,
 },
 chip: {
 borderRadius: 999,
 backgroundColor: '#E2E8F0',
 paddingHorizontal: 14,
 paddingVertical: 9,
 },
 chipActive: {
 backgroundColor: '#DBEAFE',
 },
 chipText: {
 color: '#475569',
 fontWeight: '700',
 },
 chipTextActive: {
 color: '#2563EB',
 },
 salaryRow: {
 flexDirection: 'row',
 alignItems: 'flex-start',
 },
 submitButton: {
 marginTop: 8,
 borderRadius: 14,
 backgroundColor: '#2563EB',
 padding: 16,
 alignItems: 'center',
 },
 submitButtonText: {
 color: '#FFFFFF',
 fontWeight: '800',
 },
 successCard: {
 marginTop: 16,
 borderRadius: 18,
 backgroundColor: '#DCFCE7',
 padding: 16,
 },
 successTitle: {
 color: '#166534',
 fontWeight: '800',
 marginBottom: 6,
 },
 successText: {
 color: '#166534',
 lineHeight: 20,
 },
 successAction: {
 marginTop: 12,
 alignSelf: 'flex-start',
 backgroundColor: '#16A34A',
 borderRadius: 999,
 paddingHorizontal: 14,
 paddingVertical: 10,
 },
 successActionText: {
 color: '#FFFFFF',
 fontWeight: '800',
 },
 callout: {
 marginTop: 18,
 borderRadius: 22,
 backgroundColor: '#DBEAFE',
 padding: 18,
 },
 calloutTitle: {
 color: '#1D4ED8',
 fontSize: 16,
 fontWeight: '800',
 },
 calloutText: {
 marginTop: 8,
 color: '#1E3A8A',
 lineHeight: 21,
 },
})
