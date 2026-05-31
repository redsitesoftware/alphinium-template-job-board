import React, { useMemo } from 'react'
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getJobImage, JOB_BOARD_IMAGES } from '../media'
import { useJobStore } from '../store/jobStore'

const categories = ['All', 'Tech', 'Marketing', 'Design', 'Operations']
const locations = ['All', 'Remote', 'Sydney', 'Melbourne', 'Brisbane', 'Adelaide']

function Pill({ label, active, onPress }) {
 return <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text></Pressable>
}

function JobCard({ job, borderColor, onOpen }) {
 const isRemote = job.location === 'Remote'
 return (
 <TouchableOpacity onPress={onOpen} activeOpacity={0.92} style={[styles.card, job.featured && styles.featuredCard, { borderLeftColor: borderColor }]}> 
 <Image source={{ uri: getJobImage(job.id) }} style={styles.cardImage} />
 <View style={styles.cardHeader}>
 <View style={styles.companyRow}>
 <View style={styles.logoBubble}><Text style={styles.emoji}>{job.emoji}</Text></View>
 <View>
 <Text style={[styles.jobTitle, job.featured && styles.featuredText]}>{job.title}</Text>
 <Text style={[styles.companyText, job.featured && styles.featuredMuted]}>{job.company}</Text>
 </View>
 </View>
 {job.featured && <View style={styles.featuredBadge}><Text style={styles.featuredBadgeText}>Featured</Text></View>}
 </View>
 <View style={styles.metaRow}>
 <View style={[styles.locationBadge, isRemote && styles.remoteBadge]}><Text style={[styles.locationBadgeText, isRemote && styles.remoteBadgeText]}>{job.location}</Text></View>
 <Text style={[styles.salaryText, job.featured && styles.featuredText]}>{job.salary}</Text>
 </View>
 <View style={styles.cardFooter}><Text style={[styles.postedDate, job.featured && styles.featuredMuted]}>{job.postedDate}</Text><TouchableOpacity onPress={onOpen} style={styles.applyButton}><Text style={styles.applyButtonText}>Apply Now</Text></TouchableOpacity></View>
 </TouchableOpacity>
 )
}

export default function HomeScreen() {
 const { state, actions, categoryColors } = useJobStore()
 const filteredJobs = useMemo(() => state.jobs.filter((job) => (state.categoryFilter === 'All' || job.category === state.categoryFilter) && (state.locationFilter === 'All' || job.location === state.locationFilter)), [state.categoryFilter, state.jobs, state.locationFilter])

 return (
 <FlatList
 style={styles.screen}
 contentContainerStyle={styles.contentContainer}
 data={filteredJobs}
 keyExtractor={(item) => item.id}
 showsVerticalScrollIndicator={false}
 ListHeaderComponent={
 <View>
 <View style={styles.headerCard}>
 <Image source={{ uri: JOB_BOARD_IMAGES.hero }} style={styles.heroImage} />
 <View style={styles.header}>
 <View>
 <Text style={styles.logo}>Jobs</Text>
 <Text style={styles.subtitle}>Discover standout roles across tech, design, marketing, and operations.</Text>
 </View>
 <TouchableOpacity onPress={actions.openPostJob} style={styles.postButton}><Text style={styles.postButtonText}>Post a Job</Text></TouchableOpacity>
 </View>
 </View>
 <Text style={styles.sectionLabel}>Category</Text>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>{categories.map((category) => <Pill key={category} label={category} active={state.categoryFilter === category} onPress={() => actions.setCategoryFilter(category)} />)}</ScrollView>
 <Text style={styles.sectionLabel}>Location</Text>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>{locations.map((location) => <Pill key={location} label={location} active={state.locationFilter === location} onPress={() => actions.setLocationFilter(location)} />)}</ScrollView>
 <View style={styles.resultsRow}><Text style={styles.resultsText}>{filteredJobs.length} roles available</Text><Text style={styles.resultsHint}>Tap any card for the full application flow.</Text></View>
 </View>
 }
 renderItem={({ item }) => <JobCard job={item} borderColor={categoryColors[item.category]} onOpen={() => actions.openJob(item.id)} />}
 ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
 ListFooterComponent={<View style={styles.callout}><Text style={styles.calloutTitle}>alphinium-forms addon</Text><Text style={styles.calloutText}>Turn applications into structured leads and route them into ChatInstance at /widget/leads.</Text></View>}
 />
 )
}

const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: '#F8FAFC' },
 contentContainer: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },
 headerCard: { borderRadius: 28, overflow: 'hidden', backgroundColor: '#FFFFFF', marginBottom: 24, shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
 heroImage: { width: '100%', height: 220 },
 header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: 20 },
 logo: { fontSize: 32, fontWeight: '800', color: '#0F172A' },
 subtitle: { marginTop: 6, maxWidth: 420, color: '#475569', lineHeight: 20 },
 postButton: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14 },
 postButtonText: { color: '#FFFFFF', fontWeight: '700' },
 sectionLabel: { fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 10 },
 pillRow: { gap: 10, paddingBottom: 14 },
 pill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, backgroundColor: '#E2E8F0' },
 pillActive: { backgroundColor: '#DBEAFE' },
 pillText: { color: '#475569', fontWeight: '600' },
 pillTextActive: { color: '#2563EB' },
 resultsRow: { marginTop: 6, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' },
 resultsText: { fontWeight: '700', color: '#0F172A' },
 resultsHint: { color: '#64748B' },
 card: { borderLeftWidth: 5, borderRadius: 22, backgroundColor: '#FFFFFF', padding: 18, shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 3, overflow: 'hidden' },
 featuredCard: { backgroundColor: '#0F172A' },
 cardImage: { width: '100%', height: 160, borderRadius: 18, marginBottom: 16 },
 cardHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
 companyRow: { flexDirection: 'row', gap: 12, flex: 1 },
 logoBubble: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(37,99,235,0.12)', alignItems: 'center', justifyContent: 'center' },
 emoji: { fontSize: 24 },
 jobTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
 companyText: { marginTop: 4, color: '#64748B', fontWeight: '600' },
 featuredText: { color: '#FFFFFF' },
 featuredMuted: { color: '#CBD5E1' },
 featuredBadge: { alignSelf: 'flex-start', backgroundColor: '#FBBF24', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
 featuredBadgeText: { color: '#78350F', fontSize: 12, fontWeight: '800' },
 metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, gap: 12 },
 locationBadge: { borderRadius: 999, backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 6 },
 remoteBadge: { backgroundColor: '#DCFCE7' },
 locationBadgeText: { color: '#475569', fontWeight: '700' },
 remoteBadgeText: { color: '#15803D' },
 salaryText: { color: '#2563EB', fontWeight: '800' },
 cardFooter: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
 postedDate: { color: '#94A3B8', fontWeight: '600' },
 applyButton: { backgroundColor: '#2563EB', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
 applyButtonText: { color: '#FFFFFF', fontWeight: '700' },
 callout: { marginTop: 22, borderRadius: 20, backgroundColor: '#DBEAFE', padding: 18 },
 calloutTitle: { color: '#1D4ED8', fontSize: 16, fontWeight: '800' },
 calloutText: { marginTop: 8, color: '#1E3A8A', lineHeight: 21 },
})
