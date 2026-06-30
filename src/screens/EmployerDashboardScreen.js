import React, { useMemo, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useJobStore } from '../store/jobStore'

const STATUS_CONFIG = {
  submitted:   { label: 'New',         color: '#2563EB', bg: '#DBEAFE' },
  reviewing:   { label: 'Reviewing',   color: '#7C3AED', bg: '#EDE9FE' },
  shortlisted: { label: 'Shortlisted', color: '#059669', bg: '#D1FAE5' },
  interview:   { label: 'Interview',   color: '#D97706', bg: '#FEF3C7' },
  rejected:    { label: 'Rejected',    color: '#DC2626', bg: '#FEE2E2' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.submitted
  return (
    <View style={[s.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[s.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  )
}

function ApplicationCard({ application, jobTitle, onSetStatus }) {
  const [open, setOpen] = useState(false)
  return (
    <View style={s.appCard}>
      <TouchableOpacity style={s.appCardHeader} onPress={() => setOpen(!open)} activeOpacity={0.85}>
        <View style={s.appCardLeft}>
          <View style={s.avatar}><Text style={s.avatarText}>{(application.name || '?').charAt(0).toUpperCase()}</Text></View>
          <View>
            <Text style={s.appName}>{application.name || 'Anonymous'}</Text>
            <Text style={s.appMeta}>{application.email || ''} · {application.phone || ''}</Text>
            <Text style={s.appTime}>{application.submittedAt ? new Date(application.submittedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) : 'Recently'}</Text>
          </View>
        </View>
        <View style={s.appCardRight}>
          <StatusBadge status={application.status || 'submitted'} />
          <Text style={s.expandIcon}>{open ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {open && (
        <View style={s.appBody}>
          {application.linkedin ? <Text style={s.appDetail}>🔗 {application.linkedin}</Text> : null}
          {application.coverLetter ? (
            <View style={s.coverLetterBox}>
              <Text style={s.coverLetterLabel}>Cover Letter</Text>
              <Text style={s.coverLetterText}>{application.coverLetter}</Text>
            </View>
          ) : null}
          {application.resumeUploaded ? (
            <Text style={s.resumeTag}>📎 Resume attached</Text>
          ) : null}

          <Text style={s.moveLabel}>Move to:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.statusRow}>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <TouchableOpacity
                key={key}
                style={[s.statusBtn, { backgroundColor: cfg.bg }, (application.status || 'submitted') === key && s.statusBtnActive]}
                onPress={() => onSetStatus(key)}
              >
                <Text style={[s.statusBtnText, { color: cfg.color }]}>{cfg.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={s.callout}>
            <Text style={s.calloutTitle}>alphinium-forms</Text>
            <Text style={s.calloutText}>Route applications into ChatInstance /widget/leads and trigger automated follow-up sequences.</Text>
          </View>
        </View>
      )}
    </View>
  )
}

function JobApplicationsSection({ job, applications, onSetStatus }) {
  const [expanded, setExpanded] = useState(true)
  const count = applications.length
  if (count === 0) return null

  return (
    <View style={s.jobSection}>
      <TouchableOpacity style={s.jobSectionHeader} onPress={() => setExpanded(!expanded)} activeOpacity={0.85}>
        <View>
          <Text style={s.jobSectionTitle}>{job.title}</Text>
          <Text style={s.jobSectionMeta}>{job.company} · {job.location}</Text>
        </View>
        <View style={s.jobSectionRight}>
          <View style={s.countBadge}><Text style={s.countBadgeText}>{count}</Text></View>
          <Text style={s.expandIcon}>{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      {expanded && applications.map((app) => (
        <ApplicationCard
          key={app.applicantKey}
          application={app}
          jobTitle={job.title}
          onSetStatus={(status) => onSetStatus(app.applicantKey, status)}
        />
      ))}
    </View>
  )
}

export default function EmployerDashboardScreen() {
  const { state, actions } = useJobStore()

  const jobsWithApplications = useMemo(() => {
    const allJobs = [...state.postedJobs, ...state.jobs]
    return allJobs.map((job) => {
      const appEntry = state.applications[job.id]
      if (!appEntry) return { job, applications: [] }
      const appList = Array.isArray(appEntry) ? appEntry : [{ ...appEntry, applicantKey: job.id + '_0' }]
      return { job, applications: appList }
    }).filter((entry) => entry.applications.length > 0)
  }, [state.applications, state.postedJobs, state.jobs])

  const totalApplications = jobsWithApplications.reduce((sum, e) => sum + e.applications.length, 0)

  return (
    <View style={s.screen}>
      <View style={s.headerBar}>
        <TouchableOpacity onPress={actions.goHome} style={s.backBtn}><Text style={s.backBtnText}>← Jobs</Text></TouchableOpacity>
        <Text style={s.heading}>Employer Dashboard</Text>
        <TouchableOpacity onPress={actions.openPostJob} style={s.postBtn}><Text style={s.postBtnText}>+ Post Job</Text></TouchableOpacity>
      </View>

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statValue}>{state.postedJobs.length}</Text>
          <Text style={s.statLabel}>Active Listings</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statValue}>{totalApplications}</Text>
          <Text style={s.statLabel}>Applications</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statValue}>
            {Object.values(state.applications).filter((a) => !Array.isArray(a) ? a.status === 'shortlisted' : a.some((x) => x.status === 'shortlisted')).length}
          </Text>
          <Text style={s.statLabel}>Shortlisted</Text>
        </View>
      </View>

      {totalApplications === 0 ? (
        <View style={s.emptyState}>
          <Text style={s.emptyEmoji}>📭</Text>
          <Text style={s.emptyTitle}>No applications yet</Text>
          <Text style={s.emptyText}>Post a job listing to start receiving candidate applications. Applications submitted via job cards will appear here.</Text>
          <TouchableOpacity onPress={actions.openPostJob} style={s.emptyBtn}>
            <Text style={s.emptyBtnText}>Post a Job</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={jobsWithApplications}
          keyExtractor={(item) => item.job.id}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobApplicationsSection
              job={item.job}
              applications={item.applications}
              onSetStatus={(applicantKey, status) => actions.setApplicationStatus(item.job.id, applicantKey, status)}
            />
          )}
        />
      )}
    </View>
  )
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 52, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#E2E8F0' },
  backBtnText: { fontWeight: '700', color: '#0F172A' },
  heading: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  postBtn: { backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12 },
  postBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  statsRow: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  statCard: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 14, padding: 12, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: '#2563EB' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2, textAlign: 'center' },
  listContent: { padding: 16, gap: 16, paddingBottom: 40 },
  jobSection: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  jobSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#F8FAFC', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  jobSectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  jobSectionMeta: { color: '#64748B', fontSize: 13, marginTop: 2 },
  jobSectionRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  countBadge: { backgroundColor: '#DBEAFE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  countBadgeText: { color: '#2563EB', fontWeight: '700', fontSize: 13 },
  expandIcon: { color: '#94A3B8', fontSize: 12 },
  appCard: { borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  appCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  appCardLeft: { flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  appName: { fontWeight: '700', color: '#0F172A', fontSize: 15 },
  appMeta: { color: '#64748B', fontSize: 12, marginTop: 1 },
  appTime: { color: '#94A3B8', fontSize: 11, marginTop: 2 },
  appCardRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontWeight: '700', fontSize: 12 },
  appBody: { padding: 14, paddingTop: 0, gap: 10 },
  appDetail: { color: '#2563EB', fontSize: 13 },
  coverLetterBox: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 12 },
  coverLetterLabel: { fontWeight: '700', color: '#334155', fontSize: 12, marginBottom: 6 },
  coverLetterText: { color: '#475569', fontSize: 13, lineHeight: 20 },
  resumeTag: { color: '#059669', fontWeight: '600', fontSize: 13 },
  moveLabel: { fontWeight: '700', color: '#334155', fontSize: 13, marginTop: 4 },
  statusRow: { gap: 8, paddingVertical: 4 },
  statusBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999 },
  statusBtnActive: { borderWidth: 2, borderColor: 'currentColor' },
  statusBtnText: { fontWeight: '700', fontSize: 13 },
  callout: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 12, marginTop: 4 },
  calloutTitle: { fontWeight: '800', color: '#0F172A', fontSize: 13 },
  calloutText: { color: '#64748B', fontSize: 12, marginTop: 4, lineHeight: 18 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  emptyText: { color: '#64748B', textAlign: 'center', lineHeight: 22 },
  emptyBtn: { backgroundColor: '#2563EB', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
  emptyBtnText: { color: '#FFFFFF', fontWeight: '700' },
})
