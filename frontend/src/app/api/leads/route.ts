/**
 * Leads Management API
 * 
 * Get, update, and manage leads.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLeads, updateLeadStatus, Lead } from '@/lib/leadStorage';

// Get all leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const statusParam = searchParams.get('status');
    const days = daysParam ? parseInt(daysParam) : 30;
    
    let leads = getLeads(days);
    
    // Filter by status if provided
    if (statusParam) {
      leads = leads.filter(l => l.status === statusParam);
    }
    
    // Sort by timestamp (newest first)
    leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json({
      success: true,
      data: {
        leads,
        count: leads.length,
      },
    });
    
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// Update lead status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'id and status are required' },
        { status: 400 }
      );
    }
    
    const validStatuses: Lead['status'][] = [
      'new', 'contacted', 'qualified', 'call_booked', 
      'call_completed', 'proposal_sent', 'closed_won', 'closed_lost'
    ];
    
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }
    
    const lead = updateLeadStatus(id, status);
    
    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: lead,
    });
    
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

