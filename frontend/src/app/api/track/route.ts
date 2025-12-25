/**
 * Event Tracking API
 * 
 * Receives and stores all tracking events from the frontend.
 * Enables server-side analytics without relying solely on client-side tools.
 */

import { NextRequest, NextResponse } from 'next/server';
import { addEvent } from '@/lib/leadStorage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      event_type,
      page_path,
      session_id,
      properties,
      utm,
    } = body;
    
    // Validate required fields
    if (!event_type) {
      return NextResponse.json(
        { success: false, message: 'event_type is required' },
        { status: 400 }
      );
    }
    
    // Store the event
    const event = addEvent({
      event_type,
      page_path: page_path || '',
      session_id: session_id || '',
      properties: properties || {},
      utm_source: utm?.utm_source || '',
      utm_campaign: utm?.utm_campaign || '',
    });
    
    return NextResponse.json({
      success: true,
      event_id: event.id,
    });
    
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track event' },
      { status: 500 }
    );
  }
}

