import React, { useMemo, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getJobImage } from '../media'
import { useJobStore } from '../store/jobStore'

function Field({ label, multiline, value, onChangeText, placeholder }) {
 return (
 <View style={styles.fieldWrap}>
 <Text style={styles.fieldLabel}>{label}</Text>
 <TextInput multiline={multiline} numberOfLines={multiline ? 5 : 1} placeholder={placeholder} placeholderTextColor="#94A3B8" style={[styles.input, multiline && styles.textArea]} value={value} onChangeText={onChangeText} />
 </View>
 )
}

export default function JobScreen() {
 const { selectedJobDetails: job, actions, state, categoryColors } = useJobStore()
 const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', coverLetter: '' })
 const [resumeUploaded, setResumeUploaded] = useState(false)
 const application = state.applications[job?.id]
 const accentColor = useMemo(() => (job ? categoryColors[job.category] : '#2563EB'), [categoryColors, job])
 if (!job) return null
 const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }))
 const submit = () => actions.submitApplication(job.id, { ...form, resumeUploaded })

 return (
 <View style={styles.screen}>
 <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
 <TouchableOpacity onPress={actions.goHome} style={styles.backButton}><Text style={styles.backButtonText}>← Back to jobs</Text></TouchableOpacity>
 <View style={[styles.hero, { backgroundColor: accentColor }]}> 
 <Image source={{ uri: getJobImage(job.id) }} style={styles.heroImage} />
 <Text style={styles.heroCompany}>{job.company}</Text>
 <Text style={styles.heroTitle}>{job.title}</Text>
 <View style={styles.heroMetaRow}><Text style={styles.heroMeta}>{job.salary}</Text><Text style={styles.heroMeta}>•</Text><Text style={styles.heroMeta}>{job.location}</Text><Text style={styles.heroMeta}>•</Text><Text style={styles.heroMeta}>{job.employmentType}</Text></View>
 </View>
 <View style={styles.section}><Text style={styles.sectionTitle}>About the role</Text><Text style={styles.bodyText}>{job.description}</Text></View>
 <View style={styles.section}><Text style={styles.sectionTitle}>Requirements</Text>{job.requirements.map((item) => <Text key={item} style={styles.listItem}>• {item}</Text>)}</View>
 <View style={styles.section}><Text style={styles.sectionTitle}>Benefits</Text>{job.benefits.map((item) => <Text key={item} style={styles.listItem}>• {item}</Text>)}</View>
 <View style={styles.section}>
 <Text style={styles.sectionTitle}>Apply for this role</Text>
 <Field label="Name" placeholder="Your full name" value={form.name} onChangeText={(value) => updateField('name', value)} />
 <Field label="Email" placeholder="name@example.com" value={form.email} onChangeText={(value) => updateField('email', value)} />
 <Field label="Phone" placeholder="+61 400 000 000" value={form.phone} onChangeText={(value) => updateField('phone', value)} />
 <Field label="LinkedIn URL" placeholder="https://linkedin.com/in/you" value={form.linkedin} onChangeText={(value) => updateField('linkedin', value)} />
 <Field label="Cover Letter" placeholder="Why are you a great fit?" multiline value={form.coverLetter} onChangeText={(value) => updateField('coverLetter', value)} />
 <TouchableOpacity onPress={() => setResumeUploaded(true)} style={styles.resumeButton}><Text style={styles.resumeButtonText}>{resumeUploaded ? 'Resume attached ' : 'Upload Resume'}</Text></TouchableOpacity>
 <TouchableOpacity onPress={submit} style={styles.submitButton}><Text style={styles.submitButtonText}>{application ? 'Application Submitted' : 'Submit Application'}</Text></TouchableOpacity>
 {application && <View style={styles.successCard}><Text style={styles.successTitle}>Application received</Text><Text style={styles.successText}>Thanks {application.name || 'there'} — this demo can forward applications into alphinium-forms and ChatInstance via /widget/leads.</Text></View>}
 </View>
 </ScrollView>
 <View style={styles.stickyBar}><View><Text style={styles.stickyTitle}>{job.title}</Text><Text style={styles.stickyMeta}>{job.company} · {job.salary}</Text></View><TouchableOpacity onPress={submit} style={styles.stickyButton}><Text style={styles.stickyButtonText}>{application ? 'Submitted' : 'Apply Now'}</Text></TouchableOpacity></View>
 </View>
 )
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: '#F8FAFC' },
 content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
 backButton: { alignSelf: 'flex-start', marginBottom: 16, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: '#E2E8F0' },
 backButtonText: { color: '#0F172A', fontWeight: '700' },
 hero: { borderRadius: 26, padding: 22, overflow: 'hidden' },
 heroImage: { width: '100%', height: 200, borderRadius: 22, marginBottom: 16 },
 heroCompany: { color: '#DBEAFE', fontWeight: '700' },
 heroTitle: { marginTop: 8, fontSize: 28, lineHeight: 34, color: '#FFFFFF', fontWeight: '800' },
 heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
 heroMeta: { color: '#E0F2FE', fontWeight: '700' },
 section: { marginTop: 18, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, shadowColor: '#0F172A', shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
 sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
 bodyText: { color: '#334155', lineHeight: 22 },
 listItem: { color: '#334155', lineHeight: 24, marginBottom: 6 },
 fieldWrap: { marginBottom: 14 },
 fieldLabel: { color: '#334155', fontWeight: '700', marginBottom: 8 },
 input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, backgroundColor: '#F8FAFC', paddingHorizontal: 14, paddingVertical: 12, color: '#0F172A' },
 textArea: { minHeight: 120, textAlignVertical: 'top' },
 resumeButton: { borderRadius: 14, borderWidth: 1, borderColor: '#93C5FD', backgroundColor: '#EFF6FF', padding: 14, alignItems: 'center' },
 resumeButtonText: { color: '#1D4ED8', fontWeight: '700' },
 submitButton: { marginTop: 14, borderRadius: 14, backgroundColor: '#2563EB', padding: 16, alignItems: 'center' },
 submitButtonText: { color: '#FFFFFF', fontWeight: '800' },
 successCard: { marginTop: 16, borderRadius: 18, backgroundColor: '#DCFCE7', padding: 16 },
 successTitle: { color: '#166534', fontWeight: '800', marginBottom: 6 },
 successText: { color: '#166534', lineHeight: 20 },
 stickyBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
 stickyTitle: { fontWeight: '800', color: '#0F172A' },
 stickyMeta: { marginTop: 4, color: '#64748B' },
 stickyButton: { backgroundColor: '#2563EB', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14 },
 stickyButtonText: { color: '#FFFFFF', fontWeight: '800' },
})
