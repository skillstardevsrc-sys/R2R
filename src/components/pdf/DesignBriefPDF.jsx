import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from '@react-pdf/renderer';
import { generateDesignSummary } from '../../utils/summaryGenerator';

// Executive Light Mode Single-Sheet Stylesheet
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingVertical: 18,
    paddingHorizontal: 22,
    fontFamily: 'Helvetica',
    fontSize: 7.5,
    lineHeight: 1.25,
  },
  
  // Header Banner
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 6,
    marginBottom: 6,
    borderBottom: '1.5 solid #0F172A',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerBadge: {
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: '#B45309',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 7.5,
    color: '#475569',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 7,
    color: '#64748B',
  },
  brandBadge: {
    backgroundColor: '#F1F5F9',
    border: '1 solid #CBD5E1',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderLeft: '2.5 solid #0F172A',
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    marginTop: 5,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionTag: {
    fontSize: 6,
    color: '#64748B',
    textTransform: 'uppercase',
  },

  // Grid system
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2.5,
  },
  col12: { width: '100%', paddingHorizontal: 2.5, marginBottom: 3.5 },
  col6: { width: '50%', paddingHorizontal: 2.5, marginBottom: 3.5 },
  col4: { width: '33.33%', paddingHorizontal: 2.5, marginBottom: 3.5 },
  col3: { width: '25%', paddingHorizontal: 2.5, marginBottom: 3.5 },

  card: {
    backgroundColor: '#FAFAFA',
    border: '1 solid #E2E8F0',
    borderRadius: 3.5,
    padding: 4.5,
  },
  cardTitle: {
    fontSize: 6,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 1.5,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  cardText: {
    fontSize: 7,
    color: '#334155',
    lineHeight: 1.2,
  },

  // Color Swatches
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  swatchBox: {
    width: 12,
    height: 12,
    borderRadius: 2.5,
    border: '1 solid #CBD5E1',
    marginRight: 4,
  },
  swatchHex: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  // Tags
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 1,
  },
  tag: {
    backgroundColor: '#F1F5F9',
    border: '1 solid #CBD5E1',
    borderRadius: 2.5,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    marginRight: 2.5,
    marginBottom: 2.5,
    fontSize: 6.5,
    color: '#1E293B',
    fontWeight: 'bold',
  },
  tagAvoid: {
    backgroundColor: '#FEF2F2',
    border: '1 solid #FCA5A5',
    borderRadius: 2.5,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    marginRight: 2.5,
    marginBottom: 2.5,
    fontSize: 6.5,
    color: '#991B1B',
    fontWeight: 'bold',
  },

  // Reference Item
  refCard: {
    backgroundColor: '#FFFFFF',
    border: '1 solid #E2E8F0',
    borderRadius: 3,
    padding: 3.5,
    marginBottom: 3,
  },
  refHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refDomain: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  refUrl: {
    fontSize: 6.5,
    color: '#2563EB',
    textDecoration: 'none',
  },

  // Executive Summary Box
  summaryBox: {
    backgroundColor: '#F8FAFC',
    border: '1 solid #CBD5E1',
    borderRadius: 3.5,
    padding: 5,
  },
  summaryText: {
    fontSize: 6.8,
    color: '#334155',
    lineHeight: 1.2,
    marginBottom: 2.5,
  },

  // Footer
  footer: {
    marginTop: 5,
    paddingTop: 3.5,
    borderTop: '1 solid #E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 6,
    color: '#94A3B8',
  },
});

export default function DesignBriefPDF({ state }) {
  const brandName = state.client?.brandName || 'Client Brand';
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const designSummary = generateDesignSummary(state);
  const references = state.references || [];
  const avoidList = state.avoid || [];

  return (
    <Document title={`${brandName} - Single Page Design Brief`} author="Website Style Planner">
      <Page size="A4" style={styles.page}>
        {/* HEADER BANNER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerBadge}>EXECUTIVE DISCOVERY BRIEF • SINGLE-PAGE SHEET</Text>
            <Text style={styles.headerTitle}>WEBSITE DESIGN SPECIFICATIONS</Text>
            <Text style={styles.headerSubtitle}>Visual Identity System & Architectural Direction</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.dateText}>Generated: {currentDate}</Text>
            <Text style={styles.brandBadge}>{brandName}</Text>
          </View>
        </View>

        {/* SECTION 1: CLIENT & BRAND PROFILE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>01 // Brand & Project Profile</Text>
          <Text style={styles.sectionTag}>Client Information</Text>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Brand / Company</Text>
              <Text style={styles.cardValue}>{brandName}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Contact Person</Text>
              <Text style={styles.cardValue}>{state.client?.contactPerson || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Category & Purpose</Text>
              <Text style={styles.cardValue}>
                {state.client?.businessCategory || 'Business'} • {state.client?.websitePurpose === 'Other' ? state.client?.customPurpose : state.client?.websitePurpose || 'Website'}
              </Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>WhatsApp / Contact</Text>
              <Text style={styles.cardValue}>{state.client?.whatsapp || 'N/A'}</Text>
            </View>
          </View>
          {state.client?.description ? (
            <View style={styles.col12}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Business Overview</Text>
                <Text style={styles.cardText}>{state.client.description}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* SECTION 2: VISUAL DIRECTION & BRAND PERSONALITY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>02 // Style Direction & Identity</Text>
          <Text style={styles.sectionTag}>Visual Archetype</Text>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.col4}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Primary Website Direction</Text>
              <Text style={styles.cardValue}>{state.direction?.websiteType || 'Modern Minimal'}</Text>
            </View>
          </View>
          <View style={styles.col4}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Website Theme</Text>
              <Text style={styles.cardValue}>{state.theme || 'Dark Cinematic'}</Text>
            </View>
          </View>
          <View style={styles.col4}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Typography System</Text>
              <Text style={styles.cardValue}>{state.typography?.heading || 'Manrope'} + {state.typography?.body || 'Inter'}</Text>
            </View>
          </View>
          <View style={styles.col12}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Selected Brand Personality Traits</Text>
              <View style={styles.tagList}>
                {state.personality && state.personality.length > 0 ? (
                  state.personality.map((trait, idx) => (
                    <Text key={idx} style={styles.tag}>★ {trait}</Text>
                  ))
                ) : (
                  <Text style={styles.cardText}>Balanced & Professional</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 3: COLOR SYSTEM TOKENS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>03 // Color System & Palette Tokens</Text>
          <Text style={styles.sectionTag}>Visual Palette</Text>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Background</Text>
              <View style={styles.swatchRow}>
                <View style={[styles.swatchBox, { backgroundColor: state.colors?.background || '#080808' }]} />
                <Text style={styles.swatchHex}>{state.colors?.background || '#080808'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Surface Card</Text>
              <View style={styles.swatchRow}>
                <View style={[styles.swatchBox, { backgroundColor: state.colors?.secondary || '#171717' }]} />
                <Text style={styles.swatchHex}>{state.colors?.secondary || '#171717'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Accent Highlight</Text>
              <View style={styles.swatchRow}>
                <View style={[styles.swatchBox, { backgroundColor: state.colors?.accent || '#D4AF37' }]} />
                <Text style={styles.swatchHex}>{state.colors?.accent || '#D4AF37'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Primary Brand</Text>
              <View style={styles.swatchRow}>
                <View style={[styles.swatchBox, { backgroundColor: state.colors?.primary || '#080808' }]} />
                <Text style={styles.swatchHex}>{state.colors?.primary || '#080808'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 4: UI ARCHITECTURE & COMPONENTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>04 // UI Architecture & Component Specs</Text>
          <Text style={styles.sectionTag}>Component Rules</Text>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Buttons & Cards</Text>
              <Text style={styles.cardValue}>{state.ui?.buttonStyle || 'Rounded'} / {state.ui?.cardStyle || 'Glass'}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Hero Structure</Text>
              <Text style={styles.cardValue}>{state.hero || 'Split Hero'}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Navigation System</Text>
              <Text style={styles.cardValue}>{state.navigation || 'Floating Island'}</Text>
            </View>
          </View>
          <View style={styles.col3}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Motion & Media</Text>
              <Text style={styles.cardValue}>{state.animation?.level || 'Modern'} • {state.imagery?.style || 'Photo'}</Text>
            </View>
          </View>
        </View>

        {/* SECTION 5: REFERENCES & ANTI-GOALS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>05 // Inspiration Benchmarks & Anti-Goals</Text>
          <Text style={styles.sectionTag}>Reference & Avoid</Text>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.col6}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Website References ({references.length})</Text>
              {references.length > 0 ? (
                references.slice(0, 3).map((ref, idx) => (
                  <View key={idx} style={styles.refCard}>
                    <View style={styles.refHeader}>
                      <Text style={styles.refDomain}>{ref.domain || ref.url}</Text>
                      {ref.likes && ref.likes.length > 0 ? (
                        <Text style={{ fontSize: 6, color: '#059669', fontWeight: 'bold' }}>✓ {ref.likes.join(', ')}</Text>
                      ) : null}
                    </View>
                    <Link src={ref.url} style={styles.refUrl}>{ref.url}</Link>
                    {ref.note ? <Text style={{ fontSize: 6, color: '#475569', fontStyle: 'italic', marginTop: 1 }}>"{ref.note}"</Text> : null}
                  </View>
                ))
              ) : (
                <Text style={styles.cardText}>No external benchmark websites added.</Text>
              )}
            </View>
          </View>
          <View style={styles.col6}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Strict Anti-Goals (Elements to Avoid)</Text>
              <View style={styles.tagList}>
                {avoidList.length > 0 ? (
                  avoidList.map((item, idx) => (
                    <Text key={idx} style={styles.tagAvoid}>✕ {item}</Text>
                  ))
                ) : (
                  <Text style={styles.cardText}>No specific anti-goals selected.</Text>
                )}
              </View>
              {state.additionalNotes ? (
                <View style={{ marginTop: 4, paddingTop: 3, borderTop: '1 solid #E2E8F0' }}>
                  <Text style={styles.cardTitle}>Client Notes</Text>
                  <Text style={styles.cardText}>{state.additionalNotes}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* SECTION 6: EXECUTIVE DESIGN SYNTHESIS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>06 // Executive Design Synthesis</Text>
          <Text style={styles.sectionTag}>Brief Summary</Text>
        </View>
        <View style={styles.summaryBox}>
          {designSummary.split('\n\n').slice(0, 2).map((para, idx) => (
            <Text key={idx} style={styles.summaryText}>{para}</Text>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Strictly Confidential • Prepared for {brandName}</Text>
          <Text style={styles.footerText}>Single-Sheet Executive Light PDF • Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  );
}
